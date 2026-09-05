/* ==========================================================================
   Static site generator.
   Run: node build/build.mjs
   Writes plain HTML into the repo root, ready for GitHub Pages.
   ========================================================================== */

import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { site, services, areas, guides, seo, areaSeo } from "./data.mjs";
import { layout, serviceSchema, faqSchema } from "./templates.mjs";
import * as pg from "./pages.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const written = [];

function write(path, html) {
  const rel = path === "/" ? "index.html" : path.replace(/^\/|\/$/g, "") + "/index.html";
  const full = join(ROOT, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html, "utf8");
  written.push({ path, rel, bytes: Buffer.byteLength(html) });
}

function writeRaw(name, content) {
  writeFileSync(join(ROOT, name), content, "utf8");
  written.push({ path: "/" + name, rel: name, bytes: Buffer.byteLength(content) });
}

const HOME = { label: "Home", href: "/" };

/* Titles and descriptions come from the checked table in data.mjs, and the
   build refuses to finish if any of them drift past the length Google will
   actually display. */
const problems = [];
function meta(path, fallback) {
  const m = seo[path] || fallback;
  if (!m) { problems.push(`no seo entry for ${path}`); return { t: "", d: "" }; }
  if (m.t.length > 62) problems.push(`title ${m.t.length} chars on ${path}: ${m.t}`);
  if (m.d.length > 158) problems.push(`description ${m.d.length} chars on ${path}`);
  return m;
}

/* --- Clean previously generated directories ----------------------------- */
for (const d of ["services", "areas", "guides", "prices", "projects", "reviews", "about", "contact", "quote", "privacy"]) {
  const p = join(ROOT, d);
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
}

/* --- Home ---------------------------------------------------------------- */
write(
  "/",
  layout({
    title: meta("/").t,
    description: meta("/").d,
    path: "/",
    current: "/",
    body: pg.home(),
    schema: [faqSchema(pg.homeFaqsExport)].filter(Boolean),
    needsSupabase: true,
  })
);

/* --- Services ------------------------------------------------------------ */
write(
  "/services/",
  layout({
    title: meta("/services/").t,
    description: meta("/services/").d,
    path: "/services/",
    current: "/services/",
    trail: [HOME, { label: "Services" }],
    body: pg.servicesHub(),
    needsSupabase: true,
  })
);

for (const s of services) {
  write(
    `/services/${s.slug}/`,
    layout({
      title: meta(`/services/${s.slug}/`).t,
      description: meta(`/services/${s.slug}/`).d,
      path: `/services/${s.slug}/`,
      current: `/services/${s.slug}/`,
      trail: [HOME, { label: "Services", href: "/services/" }, { label: s.title }],
      body: pg.servicePage(s),
      schema: [serviceSchema(s), faqSchema(s.faqs)].filter(Boolean),
      needsSupabase: true,
    })
  );
}

/* --- Prices -------------------------------------------------------------- */
write(
  "/prices/",
  layout({
    title: meta("/prices/").t,
    description: meta("/prices/").d,
    path: "/prices/",
    current: "/prices/",
    trail: [HOME, { label: "How we quote" }],
    body: pg.pricesPage(),
    schema: [faqSchema(pg.priceFaqsExport)].filter(Boolean),
    needsSupabase: true,
  })
);

/* --- Projects, reviews --------------------------------------------------- */
write(
  "/projects/",
  layout({
    title: meta("/projects/").t,
    description: meta("/projects/").d,
    path: "/projects/",
    current: "/projects/",
    trail: [HOME, { label: "Recent work" }],
    body: pg.projectsPage(),
    needsSupabase: true,
  })
);

write(
  "/reviews/",
  layout({
    title: meta("/reviews/").t,
    description: meta("/reviews/").d,
    path: "/reviews/",
    current: "/reviews/",
    trail: [HOME, { label: "Reviews" }],
    body: pg.reviewsPage(),
    needsSupabase: true,
  })
);

/* --- Areas --------------------------------------------------------------- */
write(
  "/areas/",
  layout({
    title: meta("/areas/").t,
    description: meta("/areas/").d,
    path: "/areas/",
    current: "/areas/",
    trail: [HOME, { label: "Areas" }],
    body: pg.areasHub(),
    needsSupabase: true,
  })
);

for (const a of areas) {
  write(
    `/areas/${a.slug}/`,
    layout({
      title: meta(`/areas/${a.slug}/`, areaSeo(a)).t,
      description: meta(`/areas/${a.slug}/`, areaSeo(a)).d,
      path: `/areas/${a.slug}/`,
      current: `/areas/${a.slug}/`,
      trail: [HOME, { label: "Areas", href: "/areas/" }, { label: a.name }],
      body: pg.areaPage(a),
      needsSupabase: true,
    })
  );
}

/* --- Guides -------------------------------------------------------------- */
write(
  "/guides/",
  layout({
    title: meta("/guides/").t,
    description: meta("/guides/").d,
    path: "/guides/",
    current: "/guides/",
    trail: [HOME, { label: "Guides" }],
    body: pg.guidesHub(),
    needsSupabase: true,
  })
);

for (const g of guides) {
  write(
    `/guides/${g.slug}/`,
    layout({
      title: meta(`/guides/${g.slug}/`).t,
      description: meta(`/guides/${g.slug}/`).d,
      path: `/guides/${g.slug}/`,
      current: `/guides/${g.slug}/`,
      trail: [HOME, { label: "Guides", href: "/guides/" }, { label: g.nav }],
      body: pg.guidePage(g),
      schema: [
        faqSchema(g.faqs),
        {
          "@type": "Article",
          headline: g.title,
          description: g.summary,
          author: { "@id": site.origin + "/#business" },
          publisher: { "@id": site.origin + "/#business" },
          mainEntityOfPage: site.origin + `/guides/${g.slug}/`,
          inLanguage: "en-GB",
        },
      ].filter(Boolean),
      ogType: "article",
      needsSupabase: true,
    })
  );
}

/* --- About, contact, quote, privacy ------------------------------------- */
write(
  "/about/",
  layout({
    title: meta("/about/").t,
    description: meta("/about/").d,
    path: "/about/",
    current: "/about/",
    trail: [HOME, { label: "About" }],
    body: pg.aboutPage(),
    needsSupabase: true,
  })
);

write(
  "/contact/",
  layout({
    title: meta("/contact/").t,
    description: meta("/contact/").d,
    path: "/contact/",
    current: "/contact/",
    trail: [HOME, { label: "Contact" }],
    body: pg.contactPage(),
    schema: [{ "@type": "ContactPage", name: "Contact Farnborough Contracting Services" }],
    needsSupabase: true,
  })
);

write(
  "/quote/",
  layout({
    title: meta("/quote/").t,
    description: meta("/quote/").d,
    path: "/quote/",
    current: "/quote/",
    trail: [HOME, { label: "Get a free quote" }],
    body: pg.quotePage(),
    needsSupabase: true,
  })
);

write(
  "/privacy/",
  layout({
    title: meta("/privacy/").t,
    description: meta("/privacy/").d,
    path: "/privacy/",
    trail: [HOME, { label: "Privacy" }],
    body: pg.privacyPage(),
  })
);

/* --- 404 ----------------------------------------------------------------- */
writeRaw(
  "404.html",
  layout({
    title: meta("/404.html").t,
    description: meta("/404.html").d,
    path: "/404.html",
    body: pg.notFound(),
  })
);

/* --- robots, sitemap, CNAME --------------------------------------------- */
const urls = written
  .filter((w) => w.rel.endsWith("index.html"))
  .map((w) => w.path);

const priority = (p) =>
  p === "/" ? "1.0" : p === "/prices/" || p.startsWith("/services/") ? "0.9" : p.startsWith("/areas/") || p.startsWith("/guides/") ? "0.8" : "0.7";

const today = new Date().toISOString().slice(0, 10);

writeRaw(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${site.origin}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority(u)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`
);

writeRaw(
  "robots.txt",
  `# Farnborough Contracting Services
User-agent: *
Allow: /

Sitemap: ${site.origin}/sitemap.xml
`
);

writeRaw("CNAME", "www.farnboroughcontracting.com\n");

writeRaw(
  ".nojekyll",
  ""
);

if (problems.length) {
  console.error("\nMETADATA PROBLEMS:");
  problems.forEach((p) => console.error("  " + p));
  process.exitCode = 1;
} 
console.log(`Built ${written.length} files.`);
for (const w of written) {
  console.log(`  ${String(Math.round(w.bytes / 1024)).padStart(4)} KB  ${w.rel}`);
}
