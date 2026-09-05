/* ==========================================================================
   Single-file clickable preview.

   Bundles every generated page into one self-contained HTML file with hash
   routing, so the whole site can be reviewed from a single URL before it is
   deployed. Not part of the live site.

   Run: node build/preview.mjs
   ========================================================================== */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* Collect the generated pages */
function walk(dir, base = "") {
  let out = [];
  for (const e of readdirSync(dir)) {
    if (["node_modules", ".git", ".verify", "build", "assets", "supabase"].includes(e)) continue;
    const full = join(dir, e);
    if (statSync(full).isDirectory()) out = out.concat(walk(full, base + "/" + e));
    else if (e === "index.html") out.push({ path: (base || "") + "/", file: full });
  }
  return out;
}

const pages = walk(ROOT).sort((a, b) => (a.path === "/" ? -1 : b.path === "/" ? 1 : a.path.localeCompare(b.path)));

const css = readFileSync(join(ROOT, "assets/css/site.css"), "utf8");
const js = readFileSync(join(ROOT, "assets/js/site.js"), "utf8");

/* Pull the pieces out of each built page */
const grab = (html, tag, attr = "") => {
  const re = new RegExp(`<${tag}${attr}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = html.match(re);
  return m ? m[1] : "";
};

const routes = {};
let shellHeader = "";
let shellFooter = "";
let shellCallbar = "";

for (const p of pages) {
  const html = readFileSync(p.file, "utf8");
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "";
  const main = grab(html, "main");
  const crumbs = (html.match(/<nav class="crumbs"[\s\S]*?<\/nav>/i) || [])[0] || "";
  routes[p.path] = { title, main, crumbs };

  if (!shellHeader) {
    shellHeader =
      (html.match(/<div class="topbar">[\s\S]*?<\/header>/i) || [])[0] || "";
    shellFooter = (html.match(/<footer class="site-foot">[\s\S]*?<\/footer>/i) || [])[0] || "";
    shellCallbar = (html.match(/<div class="callbar"[\s\S]*?<\/div>\s*<script/i) || [])[0]?.replace(/<script$/, "") || "";
  }
}

const nPages = Object.keys(routes).length;

const out = `<title>Farnborough Contracting Rebuild</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700&display=swap">
<style>
/* The live site is a single-theme client website: it must look the same for
   every visitor, so the palette is pinned rather than following the host
   theme. Every colour below is painted explicitly. */
:root { color-scheme: light; }
html, body { background: #ffffff; color: #14212e; }

${css}

/* --- Preview chrome, not part of the live site ------------------------- */
.pv-bar {
  position: sticky; top: 0; z-index: 300;
  background: #2b0a4d; color: #fff;
  font-family: var(--font-mono); font-size: .68rem; letter-spacing: .08em;
  text-transform: uppercase;
}
.pv-bar .pv-in { max-width: var(--wrap); margin: 0 auto; padding: .5rem var(--gut); display: flex; align-items: center; gap: .9rem; flex-wrap: wrap; }
.pv-bar b { color: #d9b3ff; font-weight: 600; }
.pv-bar select {
  font: inherit; text-transform: none; letter-spacing: 0;
  background: #fff; color: #2b0a4d; border: 0; border-radius: 3px;
  padding: .4rem .5rem; min-height: 34px; max-width: 100%;
}
.pv-note { background: #fff6df; border-bottom: 1px solid #e8d49a; font-size: .85rem; }
.pv-note p { max-width: var(--wrap); margin: 0 auto; padding: .7rem var(--gut); }
.site-head { top: 46px; }
</style>

<div class="pv-bar">
  <div class="pv-in">
    <span><b>Preview</b> &mdash; ${nPages} pages, not yet live</span>
    <label class="sr" for="pvJump">Jump to a page</label>
    <select id="pvJump"></select>
  </div>
</div>
<div class="pv-note">
  <p>
    This is a single-file preview of the whole site, so every link works.
    Two things behave differently here: the enquiry forms cannot reach the
    database from a preview page, so they fall back to opening an email, and
    the recent work photographs are still placeholders.
  </p>
</div>

<div id="pvShell">
${shellHeader}
<div id="pvCrumbs"></div>
<main id="main"></main>
${shellFooter}
${shellCallbar}
</div>

<script>window.FCS_SUPABASE={};</script>
<script>window.FCS_ROUTES=${JSON.stringify(routes)};</script>
<script>
${js}
</script>
<script>
(function () {
  var R = window.FCS_ROUTES;
  var main = document.getElementById("main");
  var crumbs = document.getElementById("pvCrumbs");
  var jump = document.getElementById("pvJump");

  var labels = {};
  Object.keys(R).forEach(function (p) {
    labels[p] = p === "/" ? "Home" : p.replace(/^\\/|\\/$/g, "").replace(/\\//g, " › ").replace(/-/g, " ");
  });
  Object.keys(R).forEach(function (p) {
    var o = document.createElement("option");
    o.value = p;
    o.textContent = labels[p];
    jump.appendChild(o);
  });

  function rewrite(root) {
    root.querySelectorAll('a[href^="/"]').forEach(function (a) {
      var h = a.getAttribute("href");
      if (h === "/sitemap.xml") { a.removeAttribute("href"); a.style.opacity = ".6"; return; }
      var base = h.split("#")[0];
      var frag = h.indexOf("#") > -1 ? h.slice(h.indexOf("#")) : "";
      if (R[base]) a.setAttribute("href", "#" + base + (frag ? frag.replace("#", "~") : ""));
      else { a.removeAttribute("href"); a.style.opacity = ".6"; a.title = "Not in this preview"; }
    });
  }

  function go(path, anchor) {
    var page = R[path] || R["/"];
    main.innerHTML = page.main;
    crumbs.innerHTML = page.crumbs;
    document.title = page.title;
    rewrite(main);
    rewrite(crumbs);
    jump.value = R[path] ? path : "/";
    if (window.FCS_BIND) window.FCS_BIND();
    // mark current in the persistent nav
    document.querySelectorAll("#mainNav a").forEach(function (a) {
      var h = (a.getAttribute("href") || "").replace(/^#/, "");
      if (h === path) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (anchor) {
      var t = document.getElementById(anchor);
      if (t && t.scrollIntoView) { t.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    }
    window.scrollTo(0, 0);
  }

  function fromHash() {
    var h = location.hash.replace(/^#/, "");
    var parts = h.split("~");
    go(parts[0] || "/", parts[1]);
  }

  jump.addEventListener("change", function () { location.hash = jump.value; });
  window.addEventListener("hashchange", fromHash);

  rewrite(document.getElementById("pvShell"));
  fromHash();
})();
</script>
`;

writeFileSync(join(ROOT, ".verify/preview.html"), out, "utf8");
console.log(`Preview written: ${nPages} pages, ${(Buffer.byteLength(out) / 1024).toFixed(0)} KB`);
