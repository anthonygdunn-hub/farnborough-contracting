/* ==========================================================================
   Layout, components and structured data
   ========================================================================== */

import { site, nav, badges, supabase } from "./data.mjs";

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* --- Icons (inline, no requests) ---------------------------------------- */
const I = {
  phone: `<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z"/>`,
  tick: `<path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  clock: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  pin: `<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" fill="currentColor"/>`,
  star: `<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>`,
  shield: `<path d="M12 3l7 3v6c0 4.4-3 8.1-7 9-4-.9-7-4.6-7-9V6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  money: `<rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>`,
  wa: `<path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.1 14c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.2a11 11 0 0 1-5.6-5c-.4-.7-.5-1.4-.4-1.9.1-.5.7-1.4 1.3-1.6.2-.1.5 0 .7.4l.7 1.6c.1.2.1.4 0 .6l-.4.6c-.1.2-.2.4 0 .7a8 8 0 0 0 2.9 2.6c.3.1.5.1.7-.1l.6-.6c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.4.4.6z"/>`,
  drain: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 9h12M6 12h12M6 15h12M9 6v12M12 6v12M15 6v12" stroke="currentColor" stroke-width="1.6" fill="none"/>`,
  camera: `<path d="M3 8a2 2 0 0 1 2-2h3l1.5-2h5L16 6h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12.5" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/>`,
  repair: `<path d="m14 6 4-4 4 4-4 4-2-2-6.5 6.5 2 2-4 4-4-4 4-4 2 2L16 8z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>`,
  pipe: `<path d="M3 8h8a4 4 0 0 1 4 4v9" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="2" y="5" width="4" height="6" fill="none" stroke="currentColor" stroke-width="2"/><rect x="12" y="18" width="6" height="4" fill="none" stroke="currentColor" stroke-width="2"/>`,
  paving: `<path d="M3 6h7v5H3zM14 6h7v5h-7zM3 14h7v5H3zM14 14h7v5h-7z" fill="none" stroke="currentColor" stroke-width="2"/>`,
  digger: `<path d="M3 18h11v-3H3zM6 15V9h4l3 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m13 13 5-6 3 2-4 6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="6" cy="20" r="1.6" fill="currentColor"/><circle cx="11.5" cy="20" r="1.6" fill="currentColor"/>`,
  kerb: `<path d="M2 17h20M2 13h8l3-4h9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M2 20h20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 3"/>`,
  calendar: `<rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 10h18M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="2"/><path d="m9 15 2 2 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  waste: `<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`,
};

export const icon = (name, cls = "") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${I[name] || I.tick}</svg>`;

export const stars = (n = 5) => `<span aria-hidden="true">${"★".repeat(n)}</span>`;

/* --- Header ------------------------------------------------------------- */
function navHtml(current) {
  return nav
    .map((item) => {
      const isCur = current === item.href;
      if (!item.sub) {
        return `<li><a href="${item.href}"${isCur ? ' aria-current="page"' : ""}>${esc(item.label)}</a></li>`;
      }
      const subs = item.sub
        .map(
          (s) =>
            `<li><a href="${s.href}"${current === s.href ? ' aria-current="page"' : ""}>${esc(s.label)}</a></li>`
        )
        .join("");
      return `<li class="has-sub"><a href="${item.href}"${isCur ? ' aria-current="page"' : ""}>${esc(
        item.label
      )}</a><ul class="sub">${subs}</ul></li>`;
    })
    .join("");
}

function header(current) {
  return `
<div class="topbar">
  <div class="wrap">
    <span><b>24 hours, 365 days</b> <span class="topbar-hide">&mdash; we answer our own phone</span></span>
    <span class="topbar-hide"><b>No call-out fee</b> &mdash; ever</span>
    <span class="topbar-hide"><b>${site.reviewCount}</b> reviews, all 10/10</span>
  </div>
</div>
<header class="site-head">
  <div class="wrap head-in">
    <a class="brand" href="/">
      <span class="brand-mark" aria-hidden="true">${site.initials}</span>
      <span class="brand-txt"><b>Farnborough Contracting</b><span>${esc(site.tagline)}</span></span>
    </a>
    <a class="head-call" href="tel:${site.telHref}">
      <span>${site.tel}<small>Call us, any hour</small></span>
    </a>
    <a class="btn btn-call btn-sm head-cta" href="/quote/">Get a fixed price</a>
    <button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="mainNav" aria-label="Open the menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      <span>Menu</span>
    </button>
    <nav class="main-nav" id="mainNav" aria-label="Main">
      <ul>${navHtml(current)}</ul>
    </nav>
  </div>
</header>`;
}

/* --- Sticky call bar ---------------------------------------------------- */
const callbar = `
<div class="callbar" role="group" aria-label="Contact us">
  <a class="cb-call" href="tel:${site.telHref}">${site.tel}<small>Tap to call, 24 hours</small></a>
  <a class="cb-wa" href="https://wa.me/${site.whatsapp}" rel="noopener">WhatsApp<small>Send a photo</small></a>
  <a class="cb-quote" href="/quote/">Quote<small>2 minutes</small></a>
</div>`;

/* --- Footer ------------------------------------------------------------- */
function footer() {
  const svc = [
    ["Blocked drains", "/services/blocked-drains/"],
    ["CCTV drain surveys", "/services/cctv-drain-surveys/"],
    ["Drain repairs & lining", "/services/drain-repairs/"],
    ["New drainage & soakaways", "/services/drainage-installation/"],
    ["Maintenance contracts", "/services/maintenance-contracts/"],
  ];
  const svc2 = [
    ["Groundworks", "/services/groundworks/"],
    ["Driveways & patios", "/services/driveways-patios/"],
    ["Dropped kerbs", "/services/dropped-kerbs/"],
    ["Waste removal", "/services/waste-removal/"],
    ["Prices", "/prices/"],
  ];
  const li = (a) => a.map(([l, h]) => `<li><a href="${h}">${esc(l)}</a></li>`).join("");
  return `
<footer class="site-foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <b>Farnborough Contracting Services</b>
        <p>Family run drainage and groundworks, based in Farnborough and working across Hampshire, Surrey and the Berkshire borders.</p>
        <a class="foot-tel" href="tel:${site.telHref}">${site.tel}</a>
        <address>
          Mobile <a href="tel:${site.mobileHref}">${site.mobile}</a><br>
          <a href="mailto:${site.email}">${site.email}</a><br>
          ${esc(site.townCounty)} ${site.postcodeArea}
        </address>
        <ul class="foot-badges">${badges.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </div>
      <div><h2>Drainage</h2><ul>${li(svc)}</ul></div>
      <div><h2>Groundworks</h2><ul>${li(svc2)}</ul></div>
      <div>
        <h2>Company</h2>
        <ul>
          <li><a href="/about/">About us</a></li>
          <li><a href="/reviews/">Reviews</a></li>
          <li><a href="/projects/">Recent work</a></li>
          <li><a href="/areas/">Areas we cover</a></li>
          <li><a href="/guides/">Guides &amp; advice</a></li>
          <li><a href="/contact/">Contact</a></li>
          <li><a href="${site.reviewUrl}" rel="noopener nofollow">${site.reviewCount} Checkatrade reviews</a></li>
          <li><a href="${site.facebook}" rel="noopener nofollow">Facebook</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-base">
      <p>&copy; <span id="year">2026</span> Farnborough Contracting Services. All rights reserved.</p>
      <nav aria-label="Legal">
        <a href="/privacy/">Privacy</a>
        <a href="/sitemap.xml">Sitemap</a>
      </nav>
    </div>
  </div>
</footer>`;
}

/* --- Breadcrumbs -------------------------------------------------------- */
export function crumbs(trail) {
  if (!trail || !trail.length) return "";
  const items = trail
    .map((c, i) =>
      i === trail.length - 1
        ? `<li aria-current="page">${esc(c.label)}</li>`
        : `<li><a href="${c.href}">${esc(c.label)}</a></li>`
    )
    .join("");
  return `<nav class="crumbs" aria-label="Breadcrumb"><div class="wrap"><ol>${items}</ol></div></nav>`;
}

function crumbSchema(trail) {
  if (!trail || trail.length < 2) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: site.origin + c.href } : {}),
    })),
  };
}

/* --- Structured data ----------------------------------------------------
   LocalBusiness with no aggregateRating: Google does not show review stars
   for a business marking up reviews about itself, and aggregating a
   third-party score into your own schema is against its guidance.
   ------------------------------------------------------------------------ */
export function businessSchema() {
  return {
    "@type": ["LocalBusiness", "Plumber", "GeneralContractor"],
    "@id": site.origin + "/#business",
    name: site.name,
    url: site.origin + "/",
    telephone: "+44 1252 650804",
    email: site.email,
    description:
      "Family run drainage and groundworks contractor based in Farnborough, covering Hampshire, Surrey and the Berkshire borders. Blocked drains, CCTV surveys, drain repairs, driveways, groundworks, dropped kerbs and registered waste removal. 24 hours, no call-out fee.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Farnborough",
      addressRegion: "Hampshire",
      postalCode: "GU14",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Hampshire" },
      { "@type": "AdministrativeArea", name: "Surrey" },
      { "@type": "AdministrativeArea", name: "Berkshire" },
      ...["Farnborough", "Aldershot", "Farnham", "Fleet", "Camberley", "Guildford", "Alton", "Bracknell", "Woking", "Basingstoke"].map(
        (n) => ({ "@type": "City", name: n })
      ),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00:00",
        closes: "23:59:59",
      },
    ],
    sameAs: [site.reviewUrl, site.facebook, site.twitter],
    priceRange: "££",
    currenciesAccepted: "GBP",
    knowsLanguage: "en-GB",
  };
}

export function serviceSchema(svc) {
  return {
    "@type": "Service",
    name: svc.title,
    serviceType: svc.title,
    description: svc.summary,
    url: `${site.origin}/services/${svc.slug}/`,
    provider: { "@id": site.origin + "/#business" },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Hampshire" },
      { "@type": "AdministrativeArea", name: "Surrey" },
      { "@type": "AdministrativeArea", name: "Berkshire" },
    ],
  };
}

export function faqSchema(faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* --- Components --------------------------------------------------------- */
export function faqBlock(faqs, { open = 0 } = {}) {
  if (!faqs || !faqs.length) return "";
  return `<div class="faq">${faqs
    .map(
      (f, i) => `<details${i === open ? " open" : ""}>
      <summary>${esc(f.q)}</summary>
      <div class="faq-a"><p>${esc(f.a)}</p></div>
    </details>`
    )
    .join("")}</div>`;
}

export function reviewCard(r) {
  return `<article class="rev-card">
  <div class="rv-score"><b>${esc(r.score)}</b><span>${stars(5)}</span></div>
  <blockquote>&ldquo;${esc(r.quote)}&rdquo;</blockquote>
  <footer><b>${esc(r.where)}</b> &middot; ${esc(r.job)} &middot; ${esc(r.date)}${
    r.source ? ` &middot; ${esc(r.source)}` : " &middot; Checkatrade"
  }</footer>
</article>`;
}

export function scoreBadge() {
  return `<a class="score-badge" href="${site.reviewUrl}" rel="noopener nofollow">
  <b>10<span style="font-size:.55em">/10</span></b>
  <span><em>${site.reviewCount} reviews on Checkatrade</em>Every single one scored 10 out of 10</span>
</a>`;
}

export function ctaBand({
  h = "Blocked drain, or a job you want priced properly?",
  p = "Ring us and speak to the person who will be doing the work. Twenty four hours a day, no call-out fee, and a fixed price before anything starts.",
} = {}) {
  return `<section class="cta-band">
  <div class="wrap cta-in">
    <div>
      <h2>${esc(h)}</h2>
      <p>${esc(p)}</p>
    </div>
    <div class="btn-row">
      <a class="btn btn-call btn-wide btn-lg" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
      <a class="btn btn-ghost btn-wide" href="/quote/">Get a fixed price online</a>
    </div>
  </div>
</section>`;
}

export function quoteForm({ id = "quoteForm", compact = false } = {}) {
  const chips = [
    "Blocked drain",
    "Smell or slow drain",
    "Drain survey",
    "Drain repair",
    "Driveway or patio",
    "Groundworks",
    "Dropped kerb",
    "Waste removal",
    "Something else",
  ];
  return `<form class="form-grid" id="${id}" novalidate>
  <fieldset>
    <legend class="fieldset-lbl">What do you need? <span class="req" aria-hidden="true">*</span></legend>
    <div class="chips">
      ${chips
        .map(
          (c, i) => `<label class="chip"><input type="radio" name="service" value="${esc(c)}"${
            i === 0 ? " required" : ""
          }><span>${esc(c)}</span></label>`
        )
        .join("")}
    </div>
  </fieldset>

  <div class="field">
    <label for="${id}-pc">Postcode <span class="req" aria-hidden="true">*</span></label>
    <span class="hint">So we can tell you how soon we can be there.</span>
    <input type="text" id="${id}-pc" name="postcode" autocomplete="postal-code" required maxlength="10" placeholder="GU14 9QT">
  </div>

  <div class="field">
    <label for="${id}-phone">Phone number <span class="req" aria-hidden="true">*</span></label>
    <input type="tel" id="${id}-phone" name="phone" autocomplete="tel" required inputmode="tel" placeholder="07000 000000">
  </div>

  <div class="field">
    <label for="${id}-when">When do you need someone?</label>
    <select id="${id}-when" name="urgency">
      <option value="Now, it is an emergency">Now, it is an emergency</option>
      <option value="Today if possible" selected>Today if possible</option>
      <option value="This week">This week</option>
      <option value="Just after a price for now">Just after a price for now</option>
    </select>
  </div>
${
  compact
    ? ""
    : `
  <div class="field">
    <label for="${id}-name">Your name</label>
    <input type="text" id="${id}-name" name="name" autocomplete="name">
  </div>

  <div class="field">
    <label for="${id}-email">Email</label>
    <span class="hint">Only if you would rather we emailed than rang.</span>
    <input type="email" id="${id}-email" name="email" autocomplete="email">
  </div>

  <div class="field">
    <label for="${id}-msg">Anything else that would help?</label>
    <span class="hint">Which sink or toilet, how long it has been like it, how big the driveway is. Whatever you know.</span>
    <textarea id="${id}-msg" name="message" rows="4"></textarea>
  </div>`
}
  <div>
    <button class="btn btn-call btn-wide btn-lg" type="submit">Get my fixed price</button>
    <p class="form-note" style="margin-top:.7rem">
      No call-out fee, no obligation and no pushy follow-up. We usually reply within the hour.
      Prefer to talk? <a href="tel:${site.telHref}">${site.tel}</a>, any hour.
    </p>
  </div>
  <div class="form-msg" id="${id}-msg-box" role="status" aria-live="polite"></div>
</form>`;
}

/* --- Page shell --------------------------------------------------------- */
export function layout({
  title,
  description,
  path,
  body,
  schema = [],
  trail = null,
  current = null,
  bodyClass = "",
  needsSupabase = false,
  ogType = "website",
}) {
  const url = site.origin + path;
  const graph = [businessSchema(), ...schema, crumbSchema(trail)].filter(Boolean);
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });

  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0f1c29">
<meta name="format-detection" content="telephone=yes">

<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700&display=swap">
<link rel="stylesheet" href="/assets/css/site.css">

<script type="application/ld+json">${jsonLd}</script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Skip to content</a>
${header(current)}
${trail ? crumbs(trail) : ""}
<main id="main">
${body}
</main>
${footer()}
${callbar}
${
  needsSupabase
    ? `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js" defer></script>`
    : ""
}
<script>window.FCS_SUPABASE=${JSON.stringify(supabase)};</script>
<script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}
