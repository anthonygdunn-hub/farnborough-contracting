/* Verification: crawl every page, check links, a11y basics, schema, and
   capture screenshots at phone / tablet / desktop widths. */
import { chromium } from "playwright";
import { readdirSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = "http://127.0.0.1:8099";
const OUT = "/home/claude/fcs/.verify";
mkdirSync(OUT, { recursive: true });

// Collect every generated page path
function walk(dir, base = "") {
  let out = [];
  for (const e of readdirSync(dir)) {
    if (e === "node_modules" || e === ".git" || e === ".verify" || e === "build" || e === "assets" || e === "supabase") continue;
    const full = join(dir, e);
    if (statSync(full).isDirectory()) out = out.concat(walk(full, base + "/" + e));
    else if (e === "index.html") out.push((base || "") + "/");
    else if (e === "404.html") out.push("/404.html");
  }
  return out;
}
const paths = [...new Set(walk("/home/claude/fcs"))].sort();

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" }).catch(() => chromium.launch());
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" });

const report = { pages: [], brokenLinks: new Set(), consoleErrors: [], smallTargets: [], overflow: [], schemaErrors: [], missing: [] };
const seenLinks = new Map();

const page = await ctx.newPage();
page.on("console", (m) => {
  if (m.type() === "error" && !/favicon|apple-touch|supabase|jsdelivr|fonts\.g/i.test(m.text()))
    report.consoleErrors.push(page.url() + " :: " + m.text());
});
page.on("pageerror", (e) => report.consoleErrors.push(page.url() + " :: PAGEERROR " + e.message));

for (const p of paths) {
  const res = await page.goto(BASE + p, { waitUntil: "load" });
  const status = res ? res.status() : 0;

  const info = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    // horizontal overflow check
    const docW = document.documentElement.clientWidth;
    const wide = [...document.querySelectorAll("body *")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        if (cs.position === "fixed") return false;
        if (r.width === 0) return false;
        // allow elements that scroll internally
        let par = el.parentElement, scrolls = false;
        while (par) { const s = getComputedStyle(par).overflowX; if (s === "auto" || s === "scroll") { scrolls = true; break; } par = par.parentElement; }
        return !scrolls && r.right > docW + 2;
      })
      .slice(0, 4)
      .map((el) => el.tagName.toLowerCase() + "." + (el.className || "").toString().split(" ")[0] + " right=" + Math.round(el.getBoundingClientRect().right));

    // tap targets under 24px (WCAG 2.2 AA floor)
    const small = [...document.querySelectorAll("a, button, input, select, textarea, summary")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return false;
        // inline links inside prose text are exempt (SC 2.5.8 inline exception)
        if (el.tagName === "A" && el.closest("p, li, cite, blockquote")) return false;
        if (el.type === "radio" || el.type === "checkbox") return false;
        return r.width < 24 || r.height < 24;
      })
      .slice(0, 5)
      .map((el) => el.tagName.toLowerCase() + ' "' + (el.textContent || "").trim().slice(0, 24) + '" ' + Math.round(el.getBoundingClientRect().width) + "x" + Math.round(el.getBoundingClientRect().height));

    let schema = null, schemaErr = null;
    const ld = q('script[type="application/ld+json"]');
    try { schema = JSON.parse(ld.textContent); } catch (e) { schemaErr = e.message; }

    const imgsNoAlt = [...document.querySelectorAll("img:not([alt])")].length;
    const h1s = document.querySelectorAll("h1").length;

    return {
      title: document.title,
      titleLen: document.title.length,
      desc: (q('meta[name="description"]') || {}).content || "",
      canonical: (q('link[rel="canonical"]') || {}).href || "",
      robots: (q('meta[name="robots"]') || {}).content || "",
      h1s,
      lang: document.documentElement.lang,
      skip: !!q("a.skip"),
      callbar: !!q(".callbar"),
      telLinks: document.querySelectorAll('a[href^="tel:"]').length,
      forms: document.querySelectorAll("form").length,
      imgsNoAlt,
      wide,
      small,
      schemaTypes: schema ? (schema["@graph"] || []).map((n) => (Array.isArray(n["@type"]) ? n["@type"].join("+") : n["@type"])) : [],
      schemaErr,
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      textLen: document.body.innerText.length,
    };
  });

  if (info.wide.length) report.overflow.push({ p, wide: info.wide });
  if (info.small.length) report.smallTargets.push({ p, small: info.small });
  if (info.schemaErr) report.schemaErrors.push({ p, err: info.schemaErr });
  if (info.h1s !== 1) report.missing.push(`${p} has ${info.h1s} h1 elements`);
  if (info.titleLen > 65) report.missing.push(`${p} title is ${info.titleLen} chars: ${info.title}`);
  if (!info.desc) report.missing.push(`${p} has no meta description`);
  if (info.desc && info.desc.length > 165) report.missing.push(`${p} description is ${info.desc.length} chars`);
  if (info.imgsNoAlt) report.missing.push(`${p} has ${info.imgsNoAlt} img without alt`);
  if (!/index/.test(info.robots)) report.missing.push(`${p} robots meta: ${info.robots}`);

  for (const href of info.links) {
    if (!href || href.startsWith("#") || /^(mailto|tel|https?):/.test(href)) continue;
    seenLinks.set(href, (seenLinks.get(href) || 0) + 1);
  }

  report.pages.push({ p, status, ...info, links: undefined });
}

// Check every internal link resolves
for (const href of seenLinks.keys()) {
  const r = await page.request.get(BASE + href).catch(() => null);
  if (!r || r.status() >= 400) report.brokenLinks.add(`${href} -> ${r ? r.status() : "ERR"}`);
}

// Screenshots
const shots = [
  ["phone", 390, 844, ["/", "/prices/", "/services/blocked-drains/", "/areas/farnborough/", "/guides/who-is-responsible-for-a-blocked-drain/"]],
  ["desktop", 1440, 1000, ["/", "/prices/", "/services/blocked-drains/", "/projects/", "/reviews/"]],
  ["tablet", 820, 1180, ["/", "/services/"]],
];
for (const [label, w, h, list] of shots) {
  const c = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const pp = await c.newPage();
  for (const path of list) {
    await pp.goto(BASE + path, { waitUntil: "load" });
    await pp.waitForTimeout(700);
    const name = label + "_" + (path === "/" ? "home" : path.replace(/\//g, "-").replace(/^-|-$/g, "")) + ".png";
    await pp.screenshot({ path: join(OUT, name), fullPage: false });
  }
  await c.close();
}

// Mobile nav open state
const nav = await ctx.newPage();
await nav.goto(BASE + "/");
await nav.click("#navToggle");
await nav.waitForTimeout(400);
await nav.screenshot({ path: join(OUT, "phone_nav-open.png") });
const navOK = await nav.evaluate(() => document.querySelectorAll("#mainNav.open a").length);

// Interactive tool
const tool = await ctx.newPage();
await tool.goto(BASE + "/");
await tool.waitForTimeout(500);
await tool.click('#drainToolBody button[data-go="boundary"]');
await tool.waitForTimeout(300);
const toolResult = await tool.evaluate(() => (document.querySelector(".tool-result h3") || {}).textContent || "NONE");
await tool.locator("#drainTool").screenshot({ path: join(OUT, "tool-result.png") }).catch(() => {});

// No published prices anywhere: every remaining currency figure must be a
// third-party council fee or insurance requirement, not our own pricing.
const OURS = /£\s?\d[\d,.]*\s?(?:\/m|per metre|\/year|\/yr)?/g;
const ALLOWED = new Set(["£211.90", "£308.90", "£230", "£150", "£97", "£80", "£10", "£1,500", "£6,895", "£5"]);
const priceHits = [];
for (const p of paths) {
  await page.goto(BASE + p, { waitUntil: "load" });
  const txt = await page.evaluate(() => document.body.innerText);
  for (const m of txt.match(OURS) || []) {
    const clean = m.trim().replace(/[.,;:]+$/, "");
    if (!ALLOWED.has(clean)) priceHits.push(p + " :: " + clean);
  }
}

// Project filter
const filt = await ctx.newPage();
await filt.goto(BASE + "/projects/");
await filt.waitForTimeout(300);
const before = await filt.locator(".proj:visible").count();
await filt.click('button[data-filter="Drain repairs"]');
await filt.waitForTimeout(200);
const after = await filt.locator(".proj:visible").count();

// Form validation (no Supabase reachable here, so we only test client-side guard)
const frm = await ctx.newPage();
await frm.goto(BASE + "/quote/");
await frm.waitForTimeout(300);
await frm.click("#mainQuote button[type=submit]");
await frm.waitForTimeout(300);
const formGuard = await frm.evaluate(() => {
  const b = document.getElementById("mainQuote-msg-box");
  return { shown: b.classList.contains("show"), cls: b.className, text: b.textContent.slice(0, 80) };
});

writeFileSync(join(OUT, "report.json"), JSON.stringify({ ...report, brokenLinks: [...report.brokenLinks] }, null, 2));

console.log("=== PAGES CRAWLED:", report.pages.length);
console.log("=== NON-200:", report.pages.filter((p) => p.status !== 200).map((p) => p.p + " " + p.status).join(", ") || "none");
console.log("=== BROKEN INTERNAL LINKS:", [...report.brokenLinks].join("\n  ") || "none");
console.log("=== CONSOLE / PAGE ERRORS:", report.consoleErrors.slice(0, 10).join("\n  ") || "none");
console.log("=== HORIZONTAL OVERFLOW (390px):", JSON.stringify(report.overflow, null, 1) || "none");
console.log("=== TAP TARGETS < 24px:", JSON.stringify(report.smallTargets, null, 1) || "none");
console.log("=== SCHEMA PARSE ERRORS:", JSON.stringify(report.schemaErrors) || "none");
console.log("=== META / HEADING ISSUES:");
report.missing.forEach((m) => console.log("  " + m));
console.log("=== SCHEMA TYPES on home:", report.pages.find((p) => p.p === "/").schemaTypes.join(", "));
console.log("=== tel: links on home:", report.pages.find((p) => p.p === "/").telLinks);
console.log("=== nav links when open:", navOK);
console.log("=== drain tool result:", toolResult);
console.log("=== unexpected price figures:", priceHits.length ? [...new Set(priceHits)].join(", ") : "none");
console.log("=== project filter: visible before", before, "after", after);
console.log("=== empty form guard:", JSON.stringify(formGuard));
console.log("=== shortest page text length:", Math.min(...report.pages.map((p) => p.textLen)));

await browser.close();
