/* ==========================================================================
   Page bodies
   ========================================================================== */

import {
  site, stats, services, areas, reviews, projects, guides,
  quoteSteps, priceFactors, priceIncluded, priceExtra, badges,
} from "./data.mjs";
import {
  esc, icon, faqBlock, reviewCard, scoreBadge, ctaBand, quoteForm, stars,
} from "./templates.mjs";

const svcBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
const P = (s) => `<p>${s}</p>`;

/* ======================================================================== */
/* Home                                                                     */
/* ======================================================================== */
export function home() {
  const heroCards = services.slice(0, 6);
  return `
<section class="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <p class="eyebrow">Farnborough &middot; Hampshire &middot; Surrey &middot; Berkshire borders</p>
        <h1>Blocked drain? <em>We can be with you today.</em></h1>
        <p class="hero-sub">
          Family run drainage and groundworks, working out of Farnborough for ${esc(site.yearsTrading)}.
          We answer our own phone at any hour, we tell you the price before we start, and there is never a call-out fee.
        </p>

        <ul class="hero-badges">
          <li>${icon("clock")} Answered 24 hours, 365 days</li>
          <li>${icon("money")} No call-out fee, ever</li>
          <li>${icon("shield")} Fixed price before we start</li>
          <li>${icon("pin")} Farnborough based, not a call centre</li>
        </ul>

        <a class="hero-call" href="tel:${site.telHref}">
          ${icon("phone", "hc-ico")}
          <span><b>${site.tel}</b><small>Tap to call &mdash; a real person, any hour</small></span>
        </a>
        <div class="hero-alt">
          <a class="btn btn-ghost" href="https://wa.me/${site.whatsapp}" rel="noopener">${icon("wa")} WhatsApp a photo</a>
          <a class="btn btn-ghost" href="/prices/">How we quote</a>
        </div>

        <div class="hero-proof">
          <div class="stars">${stars(5)} <strong style="color:#fff">10 out of 10</strong></div>
          <p>&ldquo;Answered and was able to arrive on the same day, job was done quickly and efficiently, all round good experience.&rdquo;</p>
          <cite>GU14 Farnborough &middot; one of ${site.reviewCount} Checkatrade reviews, every one scored 10 out of 10</cite>
        </div>
      </div>

      <div class="quick-card">
        <div class="qc-head">
          <b>Get a fixed price</b>
          <span>Four questions, about a minute. We usually reply within the hour.</span>
        </div>
        <div class="qc-body">
          ${quoteForm({ id: "heroForm", compact: true })}
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="stats">
      ${stats.map((s) => `<div class="stat"><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`).join("")}
    </div>
  </div>
</section>

<section class="sec-tint">
  <div class="wrap">
    <p class="eyebrow">What we do</p>
    <h2>Drains and ground. Both ends of the same job.</h2>
    <p class="lede" style="margin-bottom:2rem">
      Most firms do drainage or they do groundworks. We do both, which is why we find the drain
      before we dig the footings rather than after, and why we can put your driveway back when
      the repair is finished.
    </p>
    <div class="grid grid-3">
      ${heroCards
        .map(
          (s) => `<a class="svc-card" href="/services/${s.slug}/">
        ${icon(s.icon, "svc-ico")}
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.summary)}</p>
        <span class="svc-from">${esc(s.from)}</span>
        <span class="svc-go">See what is included &rarr;</span>
      </a>`
        )
        .join("")}
    </div>
    <div class="btn-row" style="margin-top:1.5rem">
      <a class="btn btn-solid" href="/services/">All nine services</a>
      <a class="btn btn-ghost" href="/prices/">How we quote, and what changes a price</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid grid-2" style="gap:2.5rem;align-items:start">
      <div>
        <p class="eyebrow">The thing nobody else will tell you</p>
        <h2>Roughly half the drains we get called to are not the householder's to pay for.</h2>
        <p>
          Since October 2011 the lateral drain running from your boundary to the sewer belongs
          to your water company, and so does the sewer. They clear blockages in their own pipes
          free of charge. Plenty of firms will not mention that, because there is no invoice in it.
        </p>
        <p>
          We would rather tell you and keep you as a customer. Answer three questions and find out
          who you should be ringing.
        </p>
        <div class="btn-row">
          <a class="btn btn-solid" href="/guides/who-is-responsible-for-a-blocked-drain/">Read the full guide</a>
        </div>
      </div>
      <div class="tool" id="drainTool" data-tool="drain">
        <div class="tool-head">
          <b>Is it my drain?</b>
          <span>Three questions. No details needed, nothing sent anywhere.</span>
        </div>
        <div class="tool-body" id="drainToolBody">
          <noscript><p>Turn on JavaScript to use this, or read <a href="/guides/who-is-responsible-for-a-blocked-drain/">the guide</a> instead.</p></noscript>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec-dark">
  <div class="wrap">
    <p class="eyebrow">Why us and not the national firms</p>
    <h2>An 0800 number gets you a call centre. This one gets you the person holding the rods.</h2>
    <div class="grid grid-3" style="margin-top:2rem">
      <div>
        <h3>We tell you when it is not your bill</h3>
        <p class="lede" style="font-size:1rem">
          Roughly half the drains we get called to turn out to be the water company's
          responsibility, and they clear those free. We say so and we leave. It costs us the job,
          and it is why people ring us again. <a href="/guides/who-is-responsible-for-a-blocked-drain/">Here is how to tell</a>.
        </p>
      </div>
      <div>
        <h3>You pay when it is done</h3>
        <p class="lede" style="font-size:1rem">
          No deposit and nothing up front on driveways and groundworks. You walk the job with us,
          we put right anything you are not happy with, and then you pay.
        </p>
      </div>
      <div>
        <h3>We show you the cause</h3>
        <p class="lede" style="font-size:1rem">
          Every blockage we clear gets a camera down it afterwards, so you see what caused it instead
          of taking our word for it. If the pipe is sound we tell you that too.
        </p>
      </div>
    </div>
    <div class="btn-row" style="margin-top:2rem">
      <a class="btn btn-call" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
      <a class="btn btn-ghost" href="/about/">More about how we work</a>
    </div>
  </div>
</section>

<section class="sec-tint">
  <div class="wrap">
    <p class="eyebrow">What our customers say</p>
    <h2>${site.reviewCount} reviews on Checkatrade. Every one scored 10 out of 10.</h2>
    <p class="lede" style="margin-bottom:1.5rem">
      Not an average. Every single review on our profile is a ten. The four things customers
      mention over and over are that we came the same day, we quoted before we started, the bill
      matched the quote, and we left no mess.
    </p>
    <div style="margin-bottom:2rem">${scoreBadge()}</div>
    <div class="grid grid-3">${reviews.slice(0, 3).map(reviewCard).join("")}</div>
    <div class="btn-row" style="margin-top:1.5rem">
      <a class="btn btn-ghost" href="/reviews/">Read more reviews</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <p class="eyebrow">Recent work</p>
    <h2>Jobs we have finished, with what we found and what it took.</h2>
    <p class="lede" style="margin-bottom:2rem">
      No competitor within twenty miles publishes before and after work with the detail on it.
      Here is a sample.
    </p>
    <div class="proj-grid" id="projGrid" data-limit="6">
      ${projects.slice(0, 6).map(projCard).join("")}
    </div>
    <div class="btn-row" style="margin-top:1.5rem">
      <a class="btn btn-solid" href="/projects/">See all our work</a>
    </div>
  </div>
</section>

<section class="sec-tint">
  <div class="wrap">
    <p class="eyebrow">Areas we cover</p>
    <h2>Farnborough is home. We work out from here.</h2>
    <p class="lede" style="margin-bottom:1.75rem">
      Everything within roughly forty minutes of Farnborough, across three counties. Each town page
      covers what the drainage is actually like there and which council you are dealing with.
    </p>
    <div class="area-grid">
      ${areas
        .map(
          (a) => `<a class="area-link" href="/areas/${a.slug}/">
        <b>${esc(a.name)}</b><span>${esc(a.postcodes.join(" · "))}</span>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>

<section>
  <div class="wrap-narrow">
    <p class="eyebrow">Common questions</p>
    <h2>Questions people ask before they ring</h2>
    ${faqBlock(homeFaqsExport)}
  </div>
</section>

${ctaBand()}
`;
}

export const homeFaqsExport = [
  {
    q: "Do you really answer the phone at 3am?",
    a: "Yes. It is our own phone, not a call centre and not an answering service. You get the person who will be turning up. If we are already on a job we ring you straight back.",
  },
  {
    q: "Is there a call-out fee?",
    a: "No, at any hour, including weekends and bank holidays. There is no charge for coming out to look and no charge for quoting. You only pay if you go ahead with the work, at the price we agreed.",
  },
  {
    q: "How quickly can you get here?",
    a: "For an emergency we aim for the same day and often within a couple of hours across Farnborough, Aldershot, Fleet, Farnham and Camberley. Further out it depends on where we are, and we will tell you honestly rather than guess.",
  },
  {
    q: "How do I find out what my job will cost?",
    a: "Ring us and describe it, or send a photo on WhatsApp. Most drainage jobs we can price on the phone in a couple of minutes. Anything that needs seeing gets a free visit, at any hour, with no call-out fee and no obligation. Either way you get one itemised figure in writing with VAT already in it, before any work starts.",
  },
  {
    q: "Why are there no prices on the website?",
    a: "Because a headline figure on a website is not a price for your job, and we would rather not quote you something we then have to change. Two things move the cost of almost every job we do: what is actually wrong, and what is on top of it. Neither is knowable from a web page. What we will promise is that the quote is free, itemised, in writing, and that it does not move once you have accepted it.",
  },
  {
    q: "Do you take a deposit?",
    a: "Not on driveways, patios or groundworks. Nothing up front and nothing to pay until the job is finished and you have told us you are happy with it.",
  },
  {
    q: "Are you insured and registered?",
    a: "We hold public liability insurance, we are a member of the Federation of Small Businesses and we are registered with the Environment Agency as a waste carrier, so anything we take away comes with a proper waste transfer note. Ask us for the paperwork at any time.",
  },
];

/* ======================================================================== */
/* Shared cards                                                             */
/* ======================================================================== */
function projCard(p) {
  return `<article class="proj" data-cat="${esc(p.category)}">
  <div class="proj-media">
    <span class="proj-tag">${esc(p.category)}</span>
    <span class="ph">Photograph to follow</span>
  </div>
  <div class="proj-body">
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.detail)}</p>
    <div class="proj-meta"><span>${icon("pin")} <b>${esc(p.location)}</b></span><span>${esc(p.duration)}</span></div>
  </div>
</article>`;
}

/* ======================================================================== */
/* Services hub                                                             */
/* ======================================================================== */
export function servicesHub() {
  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Services</p>
    <h1>Nine things we do, and exactly what is included</h1>
    <p class="lede">
      Drainage and groundworks under one roof. Every page below sets out what is included in the
      price, what is not, and how the job runs, so you know what you are buying before you ring.
    </p>
    <div class="btn-row">
      <a class="btn btn-call" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
      <a class="btn btn-ghost" href="/prices/">How we quote</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid grid-3">
      ${services
        .map(
          (s) => `<a class="svc-card" href="/services/${s.slug}/">
        ${icon(s.icon, "svc-ico")}
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.summary)}</p>
        <span class="svc-from">${esc(s.from)}</span>
        <span class="svc-go">What is included &rarr;</span>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>

${ctaBand()}
`;
}

/* ======================================================================== */
/* Service page                                                             */
/* ======================================================================== */
export function servicePage(s) {
  const rel = (s.related || [])
    .map((slug) => {
      if (slug.startsWith("guides/")) {
        const g = guides.find((x) => `guides/${x.slug}` === slug);
        return g ? `<a class="svc-card" href="/guides/${g.slug}/">${icon("shield", "svc-ico")}<h3>${esc(g.nav)}</h3><p>${esc(g.summary)}</p><span class="svc-go">Read the guide &rarr;</span></a>` : "";
      }
      const r = svcBySlug[slug];
      return r
        ? `<a class="svc-card" href="/services/${r.slug}/">${icon(r.icon, "svc-ico")}<h3>${esc(r.title)}</h3><p>${esc(r.summary)}</p><span class="svc-from">${esc(r.from)}</span><span class="svc-go">More &rarr;</span></a>`
        : "";
    })
    .filter(Boolean)
    .join("");

  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">${esc(s.title)}</p>
    <h1>${esc(s.h1)}</h1>
    <p class="lede">${esc(s.lede)}</p>
    <div class="btn-row">
      <a class="btn btn-call btn-lg" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
      <a class="btn btn-ghost" href="/quote/">Get a fixed price</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid grid-2" style="gap:2.5rem;align-items:start">
      <div class="prose">
        ${s.intro.map(P).join("")}
        ${
          s.signs
            ? `<h2>Signs you have one</h2><ul class="ticks">${s.signs.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`
            : ""
        }
        <h2>What is included in the price</h2>
        <ul class="ticks">${s.includes.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        <h2>What is not included</h2>
        <p>
          Any of these is quoted separately and agreed with you first. Nothing gets added to a bill
          without a conversation.
        </p>
        <ul class="crosses">${s.excludes.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        ${s.priceNote ? `<div class="callout is-info"><h4>About the council fees</h4><p>${esc(s.priceNote)}</p></div>` : ""}
      </div>
      <div>
        <div class="card" style="margin-bottom:1.25rem">
          <h3>Get this priced</h3>
          <p style="margin-bottom:1rem">Four questions and we will come back to you, usually inside the hour.</p>
          ${quoteForm({ id: `svcForm-${s.slug}`, compact: true })}
        </div>
        ${scoreBadge()}
        <div class="callout" style="margin-top:1.25rem">
          <h4>No call-out fee, at any hour</h4>
          <p style="margin:0">
            Coming out to look and giving you a price is free, day or night, weekends and bank holidays
            included. There is no supplement for out of hours work either.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec-tint">
  <div class="wrap">
    <p class="eyebrow">How it works</p>
    <h2>Four steps, no surprises</h2>
    <ol class="num-steps grid grid-2" style="margin-top:1.75rem">
      ${s.steps.map((st) => `<li><h3>${esc(st.h)}</h3><p>${esc(st.p)}</p></li>`).join("")}
    </ol>
  </div>
</section>

<section>
  <div class="wrap-narrow">
    <p class="eyebrow">Questions</p>
    <h2>${esc(s.title)}: your questions answered</h2>
    ${faqBlock(s.faqs)}
  </div>
</section>

<section class="sec-tint">
  <div class="wrap">
    <p class="eyebrow">Where we do this</p>
    <h2>${esc(s.title)} across Hampshire, Surrey and the Berkshire borders</h2>
    <div class="area-grid" style="margin-top:1.5rem">
      ${areas.map((a) => `<a class="area-link" href="/areas/${a.slug}/"><b>${esc(a.name)}</b><span>${esc(a.postcodes.join(" · "))}</span></a>`).join("")}
    </div>
  </div>
</section>

${
  rel
    ? `<section>
  <div class="wrap">
    <p class="eyebrow">Related</p>
    <h2>You might also need</h2>
    <div class="grid grid-3">${rel}</div>
  </div>
</section>`
    : ""
}

${ctaBand()}
`;
}

/* ======================================================================== */
/* How we quote                                                             */
/* ======================================================================== */
export function pricesPage() {
  const factorTable = (g) => `
<h2 id="${g.id}">${esc(g.title)}</h2>
<p>${esc(g.intro)}</p>
<div class="table-scroll">
  <table class="tbl">
    <thead><tr><th scope="col">What we look at</th><th scope="col">Why it changes the job</th></tr></thead>
    <tbody>
      ${g.rows
        .map(
          ([k, v]) => `<tr>
        <th scope="row">${esc(k)}</th>
        <td>${esc(v)}</td>
      </tr>`
        )
        .join("")}
    </tbody>
  </table>
</div>`;

  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">How we quote</p>
    <h1>Every job is quoted free, in writing, before anything starts</h1>
    <p class="lede">
      We do not publish a price list, because a figure on a web page is not a price for your job.
      What we will promise is that looking costs nothing, the quote is itemised with VAT already in
      it, and once you have accepted it the price does not move.
    </p>
    <div class="btn-row">
      <a class="btn btn-call btn-lg" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
      <a class="btn btn-ghost" href="/quote/">Get a free quote</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid grid-2" style="gap:2.5rem;align-items:start">
      <div>
        <p class="eyebrow">Our four promises on price</p>
        <h2>Only about a third of homeowners in the UK ever get an itemised written quote. You will.</h2>
        <p>
          That statistic is the reason so few people trust trades, and it is the thing we have built
          the way we work around. Nothing on this list is unusual. It is just rarer than it should be.
        </p>
        <ul class="ticks">
          <li><strong>Free to ask, free to look.</strong> No call-out fee and no charge for quoting, at any hour, weekends and bank holidays included</li>
          <li><strong>Itemised and in writing.</strong> What is included, what is not, and one figure with VAT already in it</li>
          <li><strong>The price does not move.</strong> If the job turns out to be a different job we stop and re-quote rather than adding it to the bill</li>
          <li><strong>No deposit on driveways, patios or groundworks.</strong> Nothing to pay until the work is finished and you have told us you are happy with it</li>
        </ul>
      </div>
      <div class="card">
        <h3>Get your job priced</h3>
        <p style="margin-bottom:1rem">
          Four questions. Most drainage jobs we can price on the phone in a couple of minutes.
        </p>
        ${quoteForm({ id: "priceForm", compact: true })}
      </div>
    </div>
  </div>
</section>

<section class="sec-tint">
  <div class="wrap">
    <p class="eyebrow">The process</p>
    <h2>From your first call to a figure you can rely on</h2>
    <ol class="num-steps grid grid-2" style="margin-top:1.75rem">
      ${quoteSteps.map((st) => `<li><h3>${esc(st.h)}</h3><p>${esc(st.p)}</p></li>`).join("")}
    </ol>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="callout is-good">
      <h3>Six questions to ask any contractor before you compare two quotes</h3>
      <p>
        This is worth more to you than a headline price, because it is where a cheaper quote usually
        goes. Ask us the same questions and hold us to the answers.
      </p>
      <ol style="margin:0 0 0 1.2rem">
        <li>Is that figure including VAT, or will twenty per cent be added later?</li>
        <li>Is there a call-out fee, and is there a supplement for evenings or weekends?</li>
        <li>Is taking the waste away included, and will I get a waste transfer note for it?</li>
        <li>On a drain, is a camera check afterwards included so I can see what caused it?</li>
        <li>On a dig, is putting the paving, tarmac or turf back included in that price?</li>
        <li>On a driveway, how deep are you excavating and what sub-base are you laying?</li>
      </ol>
    </div>

    <nav aria-label="Sections" class="filters" style="margin:2rem 0 1.5rem">
      ${priceFactors.map((g) => `<a class="btn btn-ghost btn-sm" href="#${g.id}">${esc(g.title)}</a>`).join("")}
    </nav>

    <div class="prose">
      <h2 style="border:0;padding-top:0">What actually changes the cost of a job</h2>
      <p>
        Rather than a price we cannot stand behind, here is the honest version: the things we look at
        on each type of work, and why each one moves the figure. It is the same list we work through
        when we price your job.
      </p>
      ${priceFactors.map(factorTable).join("")}
    </div>
  </div>
</section>

<section class="sec-tint">
  <div class="wrap">
    <div class="grid grid-2" style="gap:2.5rem">
      <div>
        <p class="eyebrow">Always included</p>
        <h2>In the quote, not added afterwards</h2>
        <ul class="ticks">${priceIncluded.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
      <div>
        <p class="eyebrow">Quoted separately</p>
        <h2>Only these, and only after we have asked you</h2>
        <ul class="crosses">${priceExtra.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        <p class="form-note">
          Nothing on this list ever appears on an invoice without a conversation first.
        </p>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap-narrow">
    <p class="eyebrow">Questions about price</p>
    <h2>What people ask before they ring</h2>
    ${faqBlock(priceFaqsExport)}
  </div>
</section>

${ctaBand({
  h: "Want your actual job priced?",
  p: "Ring us and describe it, or send a photo on WhatsApp. Most jobs we can price on the phone in a couple of minutes, and it costs nothing to ask.",
})}
`;
}

export const priceFaqsExport = [
  {
    q: "Why are there no prices on your website?",
    a: "Because a figure on a web page is not a price for your job. Two things move the cost of almost everything we do: what is actually wrong, and what is on top of it. Neither is knowable from a website, and we would rather not quote you something we then have to change. Ring us and you will have a real figure in a couple of minutes.",
  },
  {
    q: "Is the quote free?",
    a: "Yes, always. There is no call-out fee and no charge for coming out to look, at any hour, including weekends and bank holidays. You only pay if you go ahead with the work.",
  },
  {
    q: "Do your quotes include VAT?",
    a: "Yes. Every figure we give you has VAT in it already. We think quoting a householder excluding VAT is a way of looking twenty per cent cheaper than you are.",
  },
  {
    q: "Will the price change once you get here?",
    a: "No. The price we agree before we set off is the price you pay. If we get there and the job turns out to be a different job, we stop, explain, and give you a new price to accept or refuse. We never carry on and put it on the bill.",
  },
  {
    q: "Do you charge more at night or at weekends?",
    a: "No. Same price at 2am on a Sunday as at 2pm on a Tuesday, and no call-out fee either way. The one exception is a CCTV survey booked outside working hours, which carries a supplement because that is planned work rather than an emergency, and we tell you about it when you book.",
  },
  {
    q: "Can you price it over the phone?",
    a: "Most drainage jobs, yes. Blockages, surveys and waste removal we can usually price in a two minute conversation, or from a photo on WhatsApp. Driveways, groundworks and anything underground need a look first, and that visit is free.",
  },
  {
    q: "How do your prices compare with a national firm?",
    a: "Cheaper, on the evidence of our own customers. One review says it plainly: much cheaper than a big national company we used previously. We have no call centre, no franchise fee and no marketing budget to cover.",
  },
  {
    q: "Do you take payment up front?",
    a: "No deposit on driveways, patios or groundworks, and nothing to pay until the work is finished and you have told us you are satisfied with it. On smaller drainage jobs we take payment on the day, once the work is done.",
  },
];

/* ======================================================================== */
/* Projects                                                                 */
/* ======================================================================== */
export function projectsPage() {
  const cats = [...new Set(projects.map((p) => p.category))];
  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Recent work</p>
    <h1>Jobs we have finished, and what was actually wrong</h1>
    <p class="lede">
      Not a stock photo gallery. Each one says where it was, what the camera or the dig found,
      what we did about it and how long it took.
    </p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="filters" id="projFilters" role="group" aria-label="Filter work by type">
      <button type="button" data-filter="all" aria-pressed="true">Everything</button>
      ${cats.map((c) => `<button type="button" data-filter="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join("")}
    </div>
    <div class="proj-grid" id="projGrid">
      ${projects.map(projCard).join("")}
    </div>
    <p class="form-note" style="margin-top:1.5rem">
      More jobs are added as we finish them. If you would like to see work of a particular type,
      or speak to a customer we have done something similar for, just ask.
    </p>
  </div>
</section>

${ctaBand({
  h: "Want a job like one of these priced?",
  p: "Ring us, or send a photo on WhatsApp and we will tell you what it takes and what it costs.",
})}
`;
}

/* ======================================================================== */
/* Reviews                                                                  */
/* ======================================================================== */
export function reviewsPage() {
  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Reviews</p>
    <h1>${site.reviewCount} reviews. Every single one scored 10 out of 10.</h1>
    <p class="lede">
      That is not an average with the bad ones pulling it down. Go through the profile and every
      review on it is a ten. Here are some of them, word for word, with the postcode and the date.
    </p>
    <div class="btn-row">
      <a class="btn btn-ghost" href="${site.reviewUrl}" rel="noopener nofollow">See them all on Checkatrade</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div style="margin-bottom:2rem">${scoreBadge()}</div>
    <div class="grid grid-3">${reviews.map(reviewCard).join("")}</div>

    <div class="callout is-info" style="margin-top:2.5rem">
      <h3>The same four things come up every time</h3>
      <p style="margin-bottom:.6rem">Read enough of them and a pattern appears. Customers mention:</p>
      <ul class="ticks" style="margin-bottom:0">
        <li>We came the same day, including on Saturdays</li>
        <li>We gave a price before starting</li>
        <li>The bill matched the quote</li>
        <li>We left no mess</li>
      </ul>
    </div>

    <div class="callout" style="margin-top:1.5rem">
      <h3>Where these come from</h3>
      <p style="margin-bottom:0">
        Reviews are quoted from our Checkatrade profile and are shown exactly as the customer wrote
        them, spelling included. We do not write our own reviews, we do not curate which ones appear
        on Checkatrade, and we do not put a review score into this page's code to try to get stars
        in Google search results, because Google's own rules do not allow a business to do that.
        Go and read them at source.
      </p>
    </div>
  </div>
</section>

${ctaBand()}
`;
}

/* ======================================================================== */
/* Areas                                                                    */
/* ======================================================================== */
export function areasHub() {
  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Areas we cover</p>
    <h1>Hampshire, Surrey and the Berkshire borders, worked from Farnborough</h1>
    <p class="lede">
      Ten town pages, and each one says something true about that town: what the drainage is made of,
      what the ground does, which council you apply to and what it costs. Not the same page with the
      name swapped.
    </p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid grid-2">
      ${areas
        .map(
          (a) => `<a class="svc-card" href="/areas/${a.slug}/">
        ${icon("pin", "svc-ico")}
        <h3>${esc(a.name)}</h3>
        <p>${esc(a.intro.slice(0, 165))}&hellip;</p>
        <ul class="pc-list">${a.postcodes.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <span class="svc-go">${esc(a.county)} &middot; ${esc(a.drive)} away &rarr;</span>
      </a>`
        )
        .join("")}
    </div>
    <div class="callout" style="margin-top:2rem">
      <h3>Not on the list?</h3>
      <p style="margin-bottom:0">
        Ring us anyway. We go further than these ten towns for planned work and surveys, and we will
        tell you straight away if you are outside sensible reach rather than turning up late and
        charging you for the mileage.
      </p>
    </div>
  </div>
</section>

${ctaBand()}
`;
}

export function areaPage(a) {
  const otherAreas = areas.filter((x) => x.slug !== a.slug);
  const localReviews = reviews.filter((r) => r.where.includes(a.name) || a.postcodes.some((p) => r.where.includes(p)));
  const shown = localReviews.length ? localReviews : reviews.slice(0, 2);

  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">${esc(a.county)} &middot; ${esc(a.postcodes.join(", "))}</p>
    <h1>Drainage and groundworks in ${esc(a.name)}</h1>
    <p class="lede">${esc(a.intro)}</p>
    <div class="btn-row">
      <a class="btn btn-call btn-lg" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
      <a class="btn btn-ghost" href="/quote/">Get a fixed price</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid grid-2" style="gap:2.5rem;align-items:start">
      <div class="prose">
        <h2>What we know about the drains in ${esc(a.name)}</h2>
        ${a.local.map(P).join("")}

        <h2>Who you deal with locally</h2>
        <div class="table-scroll">
          <table class="tbl">
            <tbody>
              <tr><th scope="row">Planning authority</th><td>${esc(a.council)}</td></tr>
              <tr><th scope="row">Highway authority for dropped kerbs</th><td>${esc(a.highways)}</td></tr>
              <tr><th scope="row">Postcodes we cover here</th><td>${esc(a.postcodes.join(", "))}</td></tr>
              <tr><th scope="row">From our base in Farnborough</th><td>${esc(a.drive)}</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Areas within ${esc(a.name)} we are in regularly: ${esc(a.landmarks.join(", "))}.
        </p>
      </div>
      <div>
        <div class="card" style="margin-bottom:1.25rem">
          <h3>Get a price in ${esc(a.name)}</h3>
          <p style="margin-bottom:1rem">Four questions. We usually come back inside the hour.</p>
          ${quoteForm({ id: `areaForm-${a.slug}`, compact: true })}
        </div>
        ${scoreBadge()}
      </div>
    </div>
  </div>
</section>

<section class="sec-tint">
  <div class="wrap">
    <p class="eyebrow">What we do in ${esc(a.name)}</p>
    <h2>All nine services, ${esc(a.drive === "we are based here" ? "on our doorstep" : `${a.drive} from base`)}</h2>
    <div class="grid grid-3" style="margin-top:1.5rem">
      ${services
        .map(
          (s) => `<a class="svc-card" href="/services/${s.slug}/">
        ${icon(s.icon, "svc-ico")}
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.summary)}</p>
        <span class="svc-from">${esc(s.from)}</span>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <p class="eyebrow">Customers near ${esc(a.name)}</p>
    <h2>${localReviews.length ? `What people in ${esc(a.name)} said` : "What our customers say"}</h2>
    <div class="grid grid-3" style="margin-top:1.5rem">${shown.slice(0, 3).map(reviewCard).join("")}</div>
  </div>
</section>

<section class="sec-tint">
  <div class="wrap">
    <p class="eyebrow">Nearby</p>
    <h2>Other towns we cover</h2>
    <div class="area-grid" style="margin-top:1.25rem">
      ${otherAreas.map((x) => `<a class="area-link" href="/areas/${x.slug}/"><b>${esc(x.name)}</b><span>${esc(x.postcodes.join(" · "))}</span></a>`).join("")}
    </div>
  </div>
</section>

${ctaBand({
  h: `Need someone in ${a.name} today?`,
  p: "Ring us and speak to the person who will be doing the job. No call-out fee, and a fixed price before we start.",
})}
`;
}

/* ======================================================================== */
/* Guides                                                                   */
/* ======================================================================== */
export function guidesHub() {
  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Guides and advice</p>
    <h1>The things we wish people knew before they rang a contractor</h1>
    <p class="lede">
      Written from doing the work, not from reading someone else's website. Including the guide that
      tells you when a blocked drain is not your bill to pay.
    </p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid grid-2">
      ${guides
        .map(
          (g) => `<a class="svc-card" href="/guides/${g.slug}/">
        ${icon("shield", "svc-ico")}
        <h3>${esc(g.title)}</h3>
        <p>${esc(g.summary)}</p>
        <span class="svc-from">${g.readMins} min read &middot; updated ${esc(g.updated)}</span>
        <span class="svc-go">Read it &rarr;</span>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>

${ctaBand()}
`;
}

export function guidePage(g) {
  const body = guideBodies[g.slug] || "";
  const others = guides.filter((x) => x.slug !== g.slug);
  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Guide &middot; updated ${esc(g.updated)} &middot; ${g.readMins} min read</p>
    <h1>${esc(g.h1)}</h1>
    <p class="lede">${esc(g.summary)}</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid grid-2" style="gap:2.5rem;align-items:start">
      <div class="prose">
        <div class="byline">
          <span class="av" aria-hidden="true">${site.initials}</span>
          <span>
            Written by the Farnborough Contracting Services team.<br>
            ${esc(site.yearsTrading)} on the drains and ground of north Hampshire and west Surrey.
          </span>
        </div>
        ${body}

        <h2>Questions people ask</h2>
        ${faqBlock(g.faqs)}

        <h2>Where this comes from</h2>
        <p>
          The rules, fees and figures on this page are taken from the sources below. Fees change,
          so check the current figure before you send anyone money.
        </p>
        <ul>
          ${g.sources.map((s) => `<li><a href="${s.u}" rel="noopener nofollow">${esc(s.t)}</a></li>`).join("")}
        </ul>
        <p class="form-note">
          This is general information about how the rules work, not advice on your particular
          property. If something here matters to a purchase or a dispute, get it checked on your
          own facts.
        </p>
      </div>

      <div>
        <div class="card" style="margin-bottom:1.25rem">
          <h3>Rather just ask us?</h3>
          <p style="margin-bottom:1rem">
            No call-out fee and no charge for a conversation. If the answer is that you should be
            ringing your water company instead of us, we will tell you that.
          </p>
          <a class="btn btn-call btn-wide btn-lg" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
          <a class="btn btn-ghost btn-wide" style="margin-top:.6rem" href="/quote/">Get a fixed price</a>
        </div>
        ${scoreBadge()}
        <div class="card" style="margin-top:1.25rem">
          <h3>Other guides</h3>
          <ul class="ticks" style="margin:0">
            ${others.map((o) => `<li><a href="/guides/${o.slug}/">${esc(o.nav)}</a></li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaBand()}
`;
}

/* --- Guide long-form bodies --------------------------------------------- */
const guideBodies = {
  "who-is-responsible-for-a-blocked-drain": `
<p>
  This is the first thing worth establishing, before you ring anybody, because it decides whether
  the job costs you a few hundred pounds or nothing at all. A lot of drainage firms will not raise
  it. We would rather you knew.
</p>

<div class="callout is-good">
  <h3>The short version</h3>
  <p style="margin-bottom:0">
    Pipes inside your boundary that serve only your property are yours. The pipe running from your
    boundary to the sewer, and the sewer itself, belong to your water company, and they clear
    blockages in their own pipes free of charge. If your blockage is out at the boundary or beyond,
    ring them first, not us.
  </p>
</div>

<h2>The three kinds of pipe, and why the words matter</h2>
<p>
  Everyone calls all of it &ldquo;the drains&rdquo;, but there are three distinct things and they
  have three different owners.
</p>
<div class="table-scroll">
  <table class="tbl">
    <thead><tr><th scope="col">What it is</th><th scope="col">Where it runs</th><th scope="col">Whose it is</th></tr></thead>
    <tbody>
      <tr><th scope="row">A drain</th><td>Inside your boundary, taking waste from your building and anything belonging to it, such as a garage</td><td>Yours</td></tr>
      <tr><th scope="row">A lateral drain</th><td>From your boundary to the sewer, usually under the pavement or road</td><td>Your water company</td></tr>
      <tr><th scope="row">A public sewer</th><td>Collecting from several properties, normally under the road</td><td>Your water company</td></tr>
    </tbody>
  </table>
</div>
<p>
  Citizens Advice puts it the same way: a drain takes water and waste from a building and other
  buildings belonging with it; a lateral drain is a length of pipe carrying wastewater away from
  your property to a sewer, usually located outside your property boundary; and a public sewer
  collects wastewater from several buildings' drains and is maintained by the water company.
</p>

<h2>What changed in 2011, and why it matters more than people realise</h2>
<p>
  This is the part that catches people out, including some contractors. On 1 October 2011, private
  sewers and lateral drains that were connected to the public sewerage system transferred to the
  water and sewerage companies. Pipes that used to be a homeowner's problem, and shared runs that
  used to be a row between neighbours, became the water company's responsibility overnight.
</p>
<p>
  Two details make a practical difference. First, the transfer happened <strong>regardless of
  condition</strong>. A pipe did not have to be in good order to transfer, so the fact that your
  shared run is in a poor state does not mean it stayed private. Second, private pumping stations
  followed later, on a separate timetable, transferring by October 2016.
</p>
<p>
  What did <em>not</em> transfer:
</p>
<ul>
  <li>pipes inside your boundary serving only your own property</li>
  <li>wholly private systems that do not drain to the public sewerage system, so cesspools, septic tanks and soakaway drainage</li>
  <li>surface water sewers draining to a soakaway or a watercourse rather than a public sewer</li>
  <li>railway sewers, and sewers on Crown land unless the owner opted in</li>
</ul>
<p>
  There is a further wrinkle worth knowing if you are trying to establish what you own. When the
  transfer happened, notices went out to owners without plans attached, because there was no
  comprehensive mapping of private sewers and lateral drains. Your water company will give you a
  sewer map on request, and it is required to, but the map may simply not show a pipe that
  transferred. That is why locating a run with a camera and a sonde is often the only way to settle
  an argument about it.
</p>

<h2>Working out which one you have, without paying anyone</h2>
<p>
  You can usually get there yourself with a cover key and ten minutes.
</p>
<ol>
  <li>
    <strong>Find out what is affected.</strong> One sink or one toilet, and nothing else, is almost
    always a blockage in that fitting's own pipework, inside your property. Every waste fitting in
    the house backing up at once points to the main run further downstream.
  </li>
  <li>
    <strong>Lift the covers, starting closest to the house.</strong> An empty chamber means the
    blockage is upstream of it, towards the house. A chamber standing full means the blockage is
    downstream of it, away from the house.
  </li>
  <li>
    <strong>Keep going towards the boundary.</strong> Work outwards chamber by chamber. The last
    chamber that is empty and the first one that is full tell you which length the blockage is in.
  </li>
  <li>
    <strong>If the full one is the last chamber before the boundary,</strong> or if the pavement
    chamber outside your gate is surcharged, you are almost certainly looking at a lateral drain or
    the sewer. That is your water company's, and free.
  </li>
  <li>
    <strong>If neighbours have the same problem at the same time,</strong> that is a strong sign it
    is a shared run or the public sewer rather than your own pipework.
  </li>
</ol>

<div class="callout">
  <h3>Ring your water company first if any of these are true</h3>
  <p style="margin-bottom:0">
    The chamber at your boundary or in the pavement is full; sewage is coming up outside rather than
    inside; more than one property is affected at once; or you have no idea and there is a chamber in
    the road. They will attend, and if it turns out to be your pipework they will tell you, and you
    have lost nothing but the wait.
  </p>
</div>

<h2>Shared drains between neighbours</h2>
<p>
  Terraced and semi-detached streets across Farnborough, Aldershot and Farnham are full of runs
  that serve several houses. Where such a run is genuinely still private, everyone it serves is
  jointly responsible for the cost of maintaining it, which in practice means agreeing a split
  before the work starts rather than after.
</p>
<p>
  Before you get into that conversation, check with your water company whether the run transferred
  in 2011. A lot of shared drainage did. It is a short phone call and it can turn a four-way
  argument about a five hundred pound bill into a free visit from the sewerage undertaker.
</p>
<p>
  If a drain is being so badly neglected that it is a nuisance or a health risk, your local
  authority's environmental health team has powers to require it to be put right. That is a last
  resort, but it exists.
</p>

<h2>What about septic tanks and treatment plants?</h2>
<p>
  Entirely yours. Private drainage that does not connect to the public sewerage system did not
  transfer in 2011 and never will. If you are out in the villages around Alton, Farnham or Bentley,
  that probably means your whole system, from the house to the drainage field, is your
  responsibility to maintain, empty and eventually upgrade.
</p>

<h2>So when should you ring us?</h2>
<p>
  When the blockage is inside your boundary and serves only you, which is most kitchen and bathroom
  blockages, most gully and manhole blockages close to the house, and anything where the camera
  shows a defect in your own pipework. Also when you want to know which of these you have and
  nobody will give you a straight answer.
</p>
<p>
  We will tell you if it is not ours to fix. It costs us a call-out we were not going to be paid for
  either way, and it is the reason people ring us again.
</p>`,

  "dropped-kerbs-hampshire-surrey": `
<p>
  A dropped kerb is a small piece of construction wrapped in a surprising amount of process. The
  process is also completely different depending on which side of the county boundary you live on,
  and the application fees are non-refundable, so getting it wrong is expensive.
</p>

<div class="callout is-warn">
  <h3>The single most important difference</h3>
  <p style="margin-bottom:0">
    In <strong>Hampshire</strong> you appoint your own contractor, but they must hold £10 million
    public liability insurance and a Section 171 road opening licence. In <strong>Surrey</strong> you
    cannot choose: the county will only permit one of its own approved contractors to build the
    crossing. Ask any contractor which county you are in and what licence they hold before you pay
    anybody anything.
  </p>
</div>

<h2>Which authority you are dealing with</h2>
<p>
  The council that grants planning permission is often not the council that owns the road. That
  trips up more people than any other part of this.
</p>
<div class="table-scroll">
  <table class="tbl">
    <thead><tr><th scope="col">Where you are</th><th scope="col">Planning</th><th scope="col">The road, and the crossing</th></tr></thead>
    <tbody>
      <tr><th scope="row">Farnborough, Aldershot</th><td>Rushmoor Borough Council</td><td>Hampshire County Council</td></tr>
      <tr><th scope="row">Fleet, Church Crookham</th><td>Hart District Council</td><td>Hampshire County Council</td></tr>
      <tr><th scope="row">Alton and villages</th><td>East Hampshire District Council</td><td>Hampshire County Council</td></tr>
      <tr><th scope="row">Camberley, Frimley</th><td>Surrey Heath Borough Council</td><td>Surrey County Council</td></tr>
      <tr><th scope="row">Farnham</th><td>Waverley Borough Council</td><td>Surrey County Council</td></tr>
      <tr><th scope="row">Woking, Guildford</th><td>Woking or Guildford Borough Council</td><td>Surrey County Council</td></tr>
      <tr><th scope="row">Bracknell, Crowthorne, Sandhurst</th><td>Bracknell Forest Council</td><td>Bracknell Forest Council</td></tr>
    </tbody>
  </table>
</div>

<h2>Hampshire: the process and the real numbers</h2>
<p>
  Hampshire County Council administers vehicle crossings for Farnborough, Aldershot, Fleet, Alton
  and the rest of the county.
</p>
<ul>
  <li><strong>Who applies:</strong> the property owner. If you are a tenant you need written permission from your landlord or housing association first.</li>
  <li><strong>Fee:</strong> £211.90 for a standard application, non-refundable. Fast Track adds £97, so £308.90. There is no VAT, because it is a non-business service.</li>
  <li><strong>Timescale:</strong> a response within 8 weeks as standard, or guaranteed within 2 weeks, that is 10 working days, on Fast Track.</li>
  <li><strong>How long approval lasts:</strong> 12 months from the date of the approval letter, so do not apply years ahead of doing the work.</li>
  <li><strong>The contractor:</strong> yours to choose. Hampshire does not keep a list of approved contractors and does not make recommendations.</li>
  <li><strong>What the contractor must hold:</strong> £10 million public liability insurance and a Section 171 road opening licence. Hampshire is blunt about it, warning that a contractor proceeding without that licence would be doing so illegally.</li>
  <li><strong>Utilities:</strong> the applicant is responsible for liaising with any utility company whose apparatus is affected. If there is a stopcock, a gas cover or a telecoms chamber in the footway, that becomes part of the job.</li>
</ul>

<h2>Surrey: a different process entirely</h2>
<p>
  Surrey County Council runs a two-stage application and controls who does the work.
</p>
<ul>
  <li><strong>Stage one:</strong> £80 for an initial assessment, non-refundable. A Local Highways Officer visits within 20 working days to assess the site and mark it out.</li>
  <li><strong>Stage two:</strong> a further £150 for the full application, so £230 in total, also non-refundable. Stage two must be started within 6 months of stage one being approved.</li>
  <li><strong>Contractor:</strong> you must use one of Surrey's approved contractors. This is not a preference, it is a condition.</li>
  <li><strong>Construction cost:</strong> Surrey puts the building works at around £1,500 on average, varying with size, gradient, utility adjustments, street furniture and any traffic control needed.</li>
  <li><strong>Re-marking:</strong> £80 if you need the site marked out again, non-refundable.</li>
  <li><strong>The council's role:</strong> Surrey contacts the utility companies itself and manages the works with your chosen contractor, then inspects, and lab-samples some installations.</li>
  <li><strong>If refused:</strong> declined applications are reviewed within 10 working days.</li>
</ul>

<h2>When you also need planning permission</h2>
<p>
  Planning is separate from the crossing application, and it has to be in place first. Applying for
  the crossing without it wastes the fee. You will normally need it where:
</p>
<ul>
  <li>the access is onto a classified road, meaning an A, B or C road</li>
  <li>the property is listed, or in a conservation area</li>
  <li>the property is a flat or maisonette, or in multiple occupancy</li>
  <li>the application covers multiple dwellings, or commercial premises</li>
  <li>permitted development rights have been removed, which happens on some newer estates</li>
  <li>in Surrey, where you propose a non-porous parking surface</li>
</ul>
<p>
  That last one links the two halves of the job together. If you are planning the driveway behind the
  crossing in impermeable block paving or concrete, you may need planning permission for the surface
  as well. Choose a permeable surface and you avoid that application entirely, at any size. Our guide
  on <a href="/guides/permeable-driveways-planning/">driveways and planning</a> sets out why.
</p>

<h2>What it all adds up to, and how long it takes</h2>
<p>
  Two separate costs, and it is worth keeping them separate in your head, because only one of them
  is ours.
</p>
<div class="table-scroll">
  <table class="tbl">
    <thead><tr><th scope="col">Cost</th><th scope="col">Hampshire</th><th scope="col">Surrey</th></tr></thead>
    <tbody>
      <tr><th scope="row">Council application, paid to them</th><td class="price">£211.90</td><td class="price">£230</td></tr>
      <tr><th scope="row">Faster option, paid to them</th><td class="price">£308.90</td><td>not offered</td></tr>
      <tr><th scope="row">Construction, paid to your contractor</th><td>Quoted free, once the specification is known</td><td>Surrey puts its own average at around £1,500</td></tr>
      <tr><th scope="row">Realistic total time, enquiry to finished crossing</th><td>2 to 3 months</td><td>2 to 4 months</td></tr>
    </tbody>
  </table>
</div>

<h2>Five questions to ask any contractor before you hire them</h2>
<ol>
  <li>Which highway authority is my road, and have you done crossings for them before?</li>
  <li>Can I see your public liability certificate, and is the cover at least £10 million?</li>
  <li>Will you take out the Section 171 road opening licence, and can I see it before you start?</li>
  <li>In Surrey: are you on the county's approved contractor list?</li>
  <li>Is reinstating the footway to the council's specification included in your price?</li>
</ol>
<p>
  Any contractor who is vague about the licence is telling you something important. Ring us and we
  will tell you which process applies to your address, what it will cost, and whether we can do the
  crossing itself or only the driveway behind it. We would rather say so up front than take a
  deposit and disappoint you.
</p>`,

  "homebuyer-drain-surveys": `
<p>
  Here is something most buyers do not find out until it is too late. When you pay for a survey on
  a house, nobody looks at the drains. A mortgage valuation does not consider them at all. A level 2
  homebuyer survey will typically do no more than lift a cover, note that a chamber exists and
  recommend further investigation. The pipes themselves, which are the expensive part, go
  uninspected.
</p>

<div class="callout is-info">
  <h3>Why this is the cheapest information you can buy</h3>
  <p style="margin-bottom:0">
    A patch repair to a cracked drain is a few hundred pounds. Replacing a collapsed run under a
    block paved driveway, with the paving lifted and relaid, is thousands. Replacing the whole
    system on an older property gets into five figures. A survey is a very small fraction of any of
    those, and it is the only way to find out which one you are buying.
  </p>
</div>

<h2>When it is worth doing, and when it is not</h2>
<p>
  We would not tell you to survey the drains on a five year old house with a plastic system and
  plans in the file. On these, we would:
</p>
<ul>
  <li><strong>Anything built before about 1990.</strong> Clay before roughly 1970, pitch fibre through the 1960s and 70s, concrete in places. All three fail in their own way and all three are common across this patch.</li>
  <li><strong>Anything with a pitch fibre run.</strong> It blisters and deforms rather than cracking cleanly, and once it has lost its shape it cannot be lined, only replaced. It is very common in 1960s and 70s estates in Basingstoke, Fleet and Camberley.</li>
  <li><strong>Anything with an extension, conservatory or driveway over the drain run.</strong> Both because the pipe may have been damaged when it was built, and because getting to it later means taking the surface up.</li>
  <li><strong>Anything with mature trees close to the run.</strong> Roots find clay joints. It is the single most common defect our camera finds locally.</li>
  <li><strong>Anything on private drainage.</strong> A septic tank or treatment plant is a system you are buying outright, with its own compliance obligations, and it needs assessing as such.</li>
  <li><strong>Anything where the neighbours share the run.</strong> You want to know what you are joining before you exchange.</li>
</ul>

<h2>What you should get for your money</h2>
<p>
  This is where surveys differ enormously, and where price comparison is misleading. Some firms will
  run a camera down, tell you verbally what they saw, and call that a survey. That is an opinion. It
  is not evidence and it is no use to a solicitor.
</p>
<p>What a survey worth paying for delivers:</p>
<ul class="ticks">
  <li>The <strong>full length</strong> of the runs walked with the camera, not just the first accessible section</li>
  <li>A <strong>written report</strong> with each defect described, located by distance from a known point, and coded against the standard sewer condition classifications</li>
  <li><strong>Still images</strong> of every defect, so a third party can see what you are describing</li>
  <li>The <strong>video file</strong> handed over to you, to keep and to show anyone</li>
  <li>Both <strong>foul and surface water</strong> systems where they are accessible</li>
  <li>A note of any <strong>connection that is not yours</strong>, or any sign that a neighbour is connected into your run</li>
  <li>A <strong>fixed price for remedial work</strong>, so the report has a number attached rather than a worry</li>
</ul>
<p>
  Coded defects matter more than they sound. A report saying &ldquo;some cracking noted&rdquo; is
  worth very little in a negotiation. A report locating a fracture at 8.4 metres from the rear
  chamber, with a still image and a severity grade, is a document your solicitor can raise an
  enquiry on and your seller has to respond to.
</p>

<h2>Using the report in the purchase</h2>
<p>
  Once you have evidence you have three routes, and you should decide which one you want before you
  commission the survey.
</p>
<ol>
  <li>
    <strong>Reduce the price.</strong> The strongest position, because you hold a dated report with a
    contractor's fixed price for the repair attached. It is difficult to argue with a number.
  </li>
  <li>
    <strong>Ask the seller to fix it before completion.</strong> Cleaner, but slower, and you are
    relying on their choice of contractor and their appetite for doing it properly rather than
    cheaply. Ask for the post-repair footage.
  </li>
  <li>
    <strong>Walk away.</strong> Rare, and normally only where the drainage problem is a symptom of
    something bigger, such as subsidence, or where the run is under a structure that would have to
    come down to reach it.
  </li>
</ol>

<h2>Two things the report might tell you that are good news</h2>
<p>
  Not every defect is your problem, and this is where the 2011 sewer transfer becomes relevant to a
  house purchase. If the damaged length turns out to be a lateral drain, beyond your boundary, it is
  the water company's to maintain rather than the buyer's. A survey that establishes that has just
  saved you from paying for somebody else's pipe. Our guide on
  <a href="/guides/who-is-responsible-for-a-blocked-drain/">who is responsible for a blocked drain</a>
  explains how the line is drawn.
</p>
<p>
  The second is insurance. Many buildings policies cover damage to underground drainage, and some
  cover the cost of tracing it. Insurers want dated footage, still images and a report identifying
  and locating the defect. If you have that from before you exchanged, you are in a much better
  position later.
</p>

<h2>What it costs, and what happens next</h2>
<p>
  Ring us with the address and we will price it for that property, because the figure depends on how
  many chambers there are and whether there is a separate surface water system. You get the price
  before we start rather than after, and there is no charge for the conversation.
</p>
<p>
  A normal three or four bedroom house takes one to two hours on site, and the report follows the
  same day or the next working day, written to be read by a solicitor or a lender. If there is
  remedial work you get a fixed price for it on the day, and if you book that work with us the
  survey fee comes off it in full.
</p>
<p>
  And if you would rather take the report to another contractor for the repair, that is entirely
  fine. It is your report, and it is written to be useful to whoever ends up doing the work.
</p>`,

  "permeable-driveways-planning": `
<p>
  This is the single most useful thing to know before you choose a driveway surface, and most people
  find out about it after they have already paid a deposit on the wrong one.
</p>

<div class="callout is-good">
  <h3>The rule in one paragraph</h3>
  <p style="margin-bottom:0">
    Since 1 October 2008 you have needed planning permission to lay a traditional impermeable
    driveway of more than five square metres at the front of a house, where the rainwater runs off
    onto the road. A permeable surface needs no permission <strong>at any size</strong>. So does an
    impermeable surface where the water is directed to a lawn, a border or a soakaway inside your own
    boundary.
  </p>
</div>

<h2>Why the rule exists</h2>
<p>
  Front gardens across the country were paved over through the 1990s and 2000s, and every one of
  them turned a patch of ground that soaked up rain into a hard surface that shed it straight into
  the road and then into the drains. Enough of them together overloads surface water sewers and
  contributes to flash flooding. The 2008 change to permitted development rights was the response.
</p>
<p>
  It is worth understanding the logic, because it tells you how to satisfy the rule rather than just
  comply with it. What the rule cares about is where the water ends up. Keep the rain on your own
  land and you are outside the requirement. Send it to the highway and you need permission.
</p>

<h2>What counts as permeable</h2>
<p>
  Government guidance names three surfaces specifically:
</p>
<ul>
  <li><strong>Gravel.</strong> Cheapest, drains freely, needs edging and a grid or membrane to stop it migrating and rutting.</li>
  <li><strong>Permeable concrete block paving.</strong> Looks like normal block paving. The difference is wider joints filled with a clean angular grit, and an open-graded sub-base underneath that stores and releases water rather than shedding it.</li>
  <li><strong>Porous asphalt.</strong> Tarmac with an open structure. Less common domestically but it works.</li>
</ul>
<p>
  Resin bound is porous and drains through as well, though it needs a sound base beneath it, usually
  tarmac or concrete, and the permeability of the whole build-up is what matters rather than just the
  top layer. Resin <em>bonded</em>, which is a different thing, is a scatter of stone over a
  sealed surface and does not drain.
</p>

<h2>The other route: keep the water on your land</h2>
<p>
  You can lay a completely impermeable surface, any size, without permission, so long as the
  rainwater goes somewhere on your own property rather than onto the road. Government guidance sets
  out the options and specifically says methods can be combined:
</p>
<ul>
  <li>fall the surface to a <strong>lawn or border</strong> so it drains naturally</li>
  <li><strong>soak it away</strong> into the ground, in a properly sized soakaway</li>
  <li><strong>harvest it</strong>, into a tank or butts for storage and reuse</li>
  <li>as a <strong>last resort</strong>, connect to a drain, which is the least favoured option and may need consent</li>
</ul>
<p>
  In practice on a clay site we usually end up with a combination: a permeable surface plus a
  soakaway sized on a percolation test, because the surface can only pass water as fast as the
  ground beneath will accept it. Government guidance makes exactly this point, noting that clay
  soils may need a connection to roof water drainage.
</p>

<h2>What this means on the ground in our patch</h2>
<p>
  Geology decides the design, and it changes sharply within a few miles here.
</p>
<div class="table-scroll">
  <table class="tbl">
    <thead><tr><th scope="col">Where</th><th scope="col">Ground</th><th scope="col">What that means for a driveway</th></tr></thead>
    <tbody>
      <tr><th scope="row">Camberley, Frimley, Bagshot</th><td>Bagshot Sands</td><td>Percolates well. Permeable paving over a soakaway works properly. Compact the sandy sub-grade thoroughly or the surface will rut.</td></tr>
      <tr><th scope="row">Cove, Southwood, parts of Farnborough</th><td>London Clay</td><td>Poor percolation. Permeable surface plus a soakaway sized from a real test, or attenuation crates. This is why so many soakaways here fail in a wet autumn.</td></tr>
      <tr><th scope="row">Guildford, Hog's Back, Alton</th><td>Chalk, variable</td><td>Often good, sometimes very poor on the same street. Test rather than assume. Watch for solution features in chalk.</td></tr>
      <tr><th scope="row">Woking, Byfleet</th><td>Low lying, high water table in places</td><td>A saturated ground will not accept surface water at all. Attenuation or a connection rather than a soakaway.</td></tr>
    </tbody>
  </table>
</div>

<h2>When you need permission whatever the surface</h2>
<p>
  The five square metre rule is not the only thing that can catch you. Permission is needed
  regardless of permeability where:
</p>
<ul>
  <li>the property is <strong>listed</strong>, or in a <strong>conservation area</strong>, which covers a lot of central Farnham</li>
  <li><strong>permitted development rights have been removed</strong>, common on newer estates and easy to miss</li>
  <li>the property is a <strong>flat or maisonette</strong> rather than a house</li>
  <li>you are also forming a <strong>new access onto a classified road</strong>, which is a highways matter as well</li>
</ul>
<p>
  And the driveway is only half the job if you need a dropped kerb to get onto it. That is a separate
  application to a different authority, on a different timescale, and it is worth reading
  <a href="/guides/dropped-kerbs-hampshire-surrey/">how dropped kerbs work in Hampshire and Surrey</a>
  before you plan the sequence.
</p>

<h2>Is permeable worth the extra?</h2>
<p>
  It does cost more per square metre. Permeable blocks are a different product, and the sub-base
  underneath them is an open-graded stone that stores water rather than shedding it, so there is more
  material in the ground. We will price both specifications on your own driveway so you can see the
  difference on your job rather than a national average.
</p>
<p>What the extra buys you:</p>
<ul class="ticks">
  <li>No planning application, and no application fee, at any size</li>
  <li>No puddle at the low point, and no sheet of ice there in January</li>
  <li>No water running across the pavement, which is what annoys neighbours and councils</li>
  <li>Less load on a surface water system that in some of these towns is already at its limit</li>
</ul>
<p>
  There is one honest caveat. Permeable paving needs its joints kept clean. Silt and leaf litter
  gradually clog the surface, and it wants brushing and an occasional vacuum sweep to keep working.
  It is a small maintenance job, but it is not zero, and anyone who tells you otherwise is selling.
</p>

<div class="callout">
  <h3>One thing to check before publishing your plans anywhere</h3>
  <p style="margin-bottom:0">
    The rules above come from government guidance on permeable surfacing of front gardens, which
    dates from the 2008 change. The underlying permitted development order has since been replaced,
    so if you need the exact legal class reference for a planning application, get it confirmed with
    your local planning authority rather than relying on any website, including this one. The
    practical rule, permeable is fine and impermeable over five square metres draining to the road is
    not, is what matters for choosing a surface.
  </p>
</div>`,

  "building-over-a-sewer": `
<p>
  Of all the ways a domestic extension goes wrong, this is the one that costs the most and is the
  easiest to avoid. There is a pipe under the footprint. Nobody checked. The footings are dug, or
  worse, concreted, and then somebody notices the chamber that used to be in the middle of the lawn.
</p>

<div class="callout is-warn">
  <h3>The rule of thumb</h3>
  <p style="margin-bottom:0">
    If you are building over, or within roughly three metres of, a public sewer or a lateral drain,
    you normally need a build-over or build-near agreement from your water company <strong>before you
    start</strong>. And since the 2011 transfer, a great many pipes that everyone assumes are private
    are now public.
  </p>
</div>

<h2>Why this catches so many people out</h2>
<p>
  Two reasons, and they compound each other.
</p>
<p>
  The first is the 2011 transfer. Private sewers and lateral drains connected to the public system
  became the water company's property. That means the run crossing your garden, which your neighbour
  also uses, and which everyone has always treated as a private matter between the two of you, may
  well be a public sewer now. Building over a private drain that serves only you is a building
  control matter. Building over a public sewer is a water company matter, with a formal agreement and
  a fee.
</p>
<p>
  The second is that the maps are incomplete. Your water company must make sewer records available on
  request, and it will. But the pipes that transferred in 2011 were transferred without plans,
  because no comprehensive mapping of private sewers and lateral drains existed. Owners received
  notices with no plans attached. So a clean sewer map is not proof that there is nothing under your
  extension. It only proves that nothing is recorded there.
</p>

<h2>Finding out what is actually there</h2>
<p>
  In the right order, cheapest first.
</p>
<ol>
  <li>
    <strong>Ask for the sewer map.</strong> Free or nearly so, and it tells you about recorded public
    sewers. Treat an empty map as inconclusive rather than as an all clear.
  </li>
  <li>
    <strong>Lift every cover on the property</strong> and work out the direction of flow. Two chambers
    and a direction gets you most of the way to knowing where the run goes.
  </li>
  <li>
    <strong>Camera and trace it.</strong> A camera with a sonde in the head, and a locator above
    ground, gives you the line and the depth from the surface, and we can mark it out on the ground in
    paint. This is the only method that tells you what is under the footprint rather than what is
    recorded as being under it. On any extension where a chamber is anywhere near the footprint, it
    is worth doing before the drawings are finalised, not after.
  </li>
</ol>

<h2>What Part H actually requires</h2>
<p>
  Building over existing sewers is dealt with in Approved Document H, the drainage and waste disposal
  part of the Building Regulations, in the 2015 edition which came into force on 1 October 2015. H4
  covers building over existing sewers specifically, and its concerns are practical rather than
  bureaucratic:
</p>
<ul>
  <li><strong>Risk from failure of the sewer.</strong> If the pipe fails under your new floor, what happens to the building, and can it be got at?</li>
  <li><strong>Maintaining access.</strong> Somebody has to be able to rod, jet and inspect the run in future. Burying an inspection chamber under a solid floor with no access is not acceptable.</li>
  <li><strong>Protection during construction.</strong> A pipe survives being built over. It often does not survive a machine bucket or a load of hardcore tipped on it.</li>
  <li><strong>Preventing settlement damage.</strong> The new structure must not transfer its load onto the pipe, which is what lintels and bridging details are for.</li>
</ul>
<p>
  The other parts of H are worth knowing exist if you are doing anything with drainage: H1 foul
  drainage, H2 wastewater treatment and cesspools, H3 rainwater drainage, H5 separate systems and H6
  solid waste storage.
</p>

<h2>The engineering options, and roughly what each involves</h2>
<div class="table-scroll">
  <table class="tbl">
    <thead><tr><th scope="col">Option</th><th scope="col">When it works</th><th scope="col">What it involves</th></tr></thead>
    <tbody>
      <tr><th scope="row">Divert the run</th><td>Where there is space outside the footprint and the levels allow</td><td>New pipework laid around the extension, new chamber, old run capped. Often the cleanest answer, and it removes the problem permanently.</td></tr>
      <tr><th scope="row">Bridge it with a lintel</th><td>Where the pipe crosses the line of a wall</td><td>The footing is bridged over the pipe so the load bears either side rather than on the pipe. Usually needs the engineer's detail.</td></tr>
      <tr><th scope="row">Deepen the footing</th><td>Where the pipe is shallow and the footing can go below it</td><td>Footing taken down past the invert so the load is transferred below the pipe. Cost rises quickly with depth.</td></tr>
      <tr><th scope="row">Rebuild the chamber with access</th><td>Where a chamber ends up inside the footprint and cannot be moved</td><td>Chamber rebuilt, often with a double sealed cover inside the building, so access is retained. Acceptable, but always the last choice.</td></tr>
      <tr><th scope="row">Encase or replace the pipe</th><td>Where the existing pipe is old and would be hard to reach later</td><td>Replace the length under the footprint in modern pipe, sometimes concrete encased, before building over it.</td></tr>
    </tbody>
  </table>
</div>

<h2>What happens if you build over without an agreement</h2>
<p>
  Nothing, for a while. Then one of three things.
</p>
<p>
  The water company finds out and requires the work to be altered, or in the worst case removed.
  Or your building control sign-off runs into trouble because the drainage element cannot be
  certified. Or, most commonly, it surfaces years later when you sell, a solicitor raises it, and
  your buyer's lender wants an indemnity or a retrospective agreement before completion, at the
  worst possible moment in a chain.
</p>
<p>
  The cost of applying before you start is a fee and a few weeks in the programme. The cost of
  sorting it out afterwards is measured in cancelled trades and, occasionally, in concrete coming
  back out.
</p>

<h2>How we handle it</h2>
<p>
  On any groundworks job where there is a chamber anywhere near the footprint, we camera and trace
  the run before we set out, and we mark the line and depth on the ground. If it turns out to be a
  public sewer or a lateral drain, we tell you what consent is needed, we design the drainage around
  it, and we programme the work so the pipe is protected while we are on site. It is an hour or two
  at the start of the job that regularly saves weeks.
</p>
<p>
  If you have drawings and there is a chamber on the site plan, send them over. We will tell you
  whether you have a problem before anybody digs.
</p>`,
};

/* ======================================================================== */
/* About                                                                    */
/* ======================================================================== */
export function aboutPage() {
  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">About us</p>
    <h1>A family firm in Farnborough, on the drains and ground of three counties</h1>
    <p class="lede">
      No call centre, no franchise, no 0800 number. When you ring, you get the person who will be
      standing in your garden, and that is deliberate.
    </p>
    <div class="btn-row">
      <a class="btn btn-call btn-lg" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
      <a class="btn btn-ghost" href="/reviews/">${site.reviewCount} reviews</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid grid-2" style="gap:2.5rem;align-items:start">
      <div class="prose">
        <h2>Who we are</h2>
        <p>
          Farnborough Contracting Services is a family run drainage and groundworks business based in
          Farnborough. We have been working in this part of Hampshire for ${esc(site.yearsTrading)},
          for private homeowners, flats, landlords and letting agents, businesses and local councils.
        </p>
        <p>
          We are small on purpose. The person who answers the phone is the person who prices the job
          and, on most jobs, the person who does it. That means nothing gets lost between a call
          handler, a scheduler and a subcontractor, and it means when we say we will be there, we know
          whether we can be.
        </p>

        <h2>How we work, and why</h2>
        <p>
          Only about half of homeowners in the UK say they trust the trades they hire, and only around
          a third get an itemised written quote. Those two numbers are related. We have built the way
          we work around fixing the second one.
        </p>
        <h3>We publish our prices</h3>
        <p>
          Almost nobody in this trade does. We have looked at eleven drainage, driveway and
          groundworks firms working the same towns as us, and exactly one puts a price on its website.
          Several promise &ldquo;fixed pricing&rdquo; and then ask you to fill in a form to find out
          what it is. <a href="/prices/">Ours are on the site</a>, with VAT in every figure.
        </p>
        <h3>We quote before we start, in writing, and we stick to it</h3>
        <p>
          If we arrive and the job is not the job you described, we stop, explain and give you a new
          price to accept or turn down. What we do not do is carry on and put it on the bill.
        </p>
        <h3>You pay when it is finished</h3>
        <p>
          No deposit on driveways, patios or groundworks. You walk the job with us, we put right
          anything you are not happy with, and then you pay.
        </p>
        <h3>We show you the evidence</h3>
        <p>
          Every blockage we clear gets a camera down it afterwards, and you see what caused it. Every
          survey comes with the footage and the stills. Every repair gets filmed when it is done. You
          should not have to take a contractor's word for what is underground.
        </p>
        <h3>We tell you when it is not your bill</h3>
        <p>
          Roughly half the drains we are called out to turn out to be the water company's
          responsibility rather than the householder's, and they clear those free. We say so and we
          leave. It costs us the job and it is the reason people ring us again, and recommend us.
        </p>

        <h2>What we are registered and insured for</h2>
        <ul class="ticks">
          <li>Public liability insurance, certificate available on request</li>
          <li>Member of the Federation of Small Businesses</li>
          <li>Registered with the Environment Agency as a waste carrier, so anything we take away comes with a compliant waste transfer note, and we keep our copies for the two years the law requires</li>
          <li>£10 million public liability cover and a Section 171 road opening licence for highway works, which is what Hampshire County Council requires before anyone touches a footway</li>
        </ul>
        <div class="callout is-info">
          <h4>Check us, do not just take our word for it</h4>
          <p style="margin-bottom:0">
            You can search the Environment Agency's public register of waste carriers free, and you
            should, for any firm you let take waste off your property. If waste with your name on it
            is later fly-tipped, the duty of care comes back to you as the producer, and having
            checked your carrier and kept the transfer note is your defence. Ask us for our
            registration number and check it.
          </p>
        </div>

        <h2>What we do not do</h2>
        <p>
          We would rather tell you than waste your time. We do not do asbestos removal, hazardous
          waste, gas work, or anything needing a structural engineer's design, though we work
          alongside engineers regularly. We do not sell maintenance plans nobody needs. And we do not
          take on work so far away that we cannot get back if something needs putting right.
        </p>
      </div>

      <div>
        <div class="card" style="margin-bottom:1.25rem">
          <h3>Talk to us</h3>
          <p style="margin-bottom:1rem">Any hour, no call-out fee, no obligation.</p>
          <a class="btn btn-call btn-wide btn-lg" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
          <a class="btn btn-ghost btn-wide" style="margin-top:.6rem" href="https://wa.me/${site.whatsapp}" rel="noopener">${icon("wa")} WhatsApp a photo</a>
          <a class="btn btn-ghost btn-wide" style="margin-top:.6rem" href="/quote/">Get a fixed price</a>
        </div>
        ${scoreBadge()}
        <div class="card" style="margin-top:1.25rem">
          <h3>The short version</h3>
          <ul class="ticks" style="margin:0">
            ${badges.map((b) => `<li>${esc(b)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec-tint">
  <div class="wrap">
    <div class="stats">
      ${stats.map((s) => `<div class="stat"><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`).join("")}
    </div>
  </div>
</section>

${ctaBand()}
`;
}

/* ======================================================================== */
/* Contact                                                                  */
/* ======================================================================== */
export function contactPage() {
  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Contact</p>
    <h1>Ring us. A person answers, whatever time it is.</h1>
    <p class="lede">
      Not an answering service and not a call centre. If we are down a hole when you ring, we will
      call you straight back.
    </p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid grid-2" style="gap:2.5rem;align-items:start">
      <div>
        <div class="card" style="margin-bottom:1.25rem">
          <h3>Phone, best for anything urgent</h3>
          <p>Answered 24 hours a day, 365 days a year. No call-out fee at any hour.</p>
          <a class="btn btn-call btn-wide btn-lg" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
          <a class="btn btn-ghost btn-wide" style="margin-top:.6rem" href="tel:${site.mobileHref}">Mobile: ${site.mobile}</a>
        </div>

        <div class="card" style="margin-bottom:1.25rem">
          <h3>WhatsApp, best for a price on a visible job</h3>
          <p>
            Send a photo of the drain, the driveway or the pile of waste and we will normally come
            back with a price the same day. Quicker than describing it.
          </p>
          <a class="btn btn-ghost btn-wide" href="https://wa.me/${site.whatsapp}" rel="noopener">${icon("wa")} Message ${site.mobile}</a>
        </div>

        <div class="card">
          <h3>Email</h3>
          <p>Fine for surveys, quotes, contracts and anything with paperwork attached.</p>
          <a class="btn btn-ghost btn-wide" href="mailto:${site.email}">${site.email}</a>
        </div>

        <div class="callout" style="margin-top:1.25rem">
          <h4>Where we are</h4>
          <p>
            We are based in <strong>${esc(site.townCounty)} ${site.postcodeArea}</strong> and work across
            Hampshire, Surrey and the Berkshire borders. We are a mobile business rather than a shop,
            so we come to you rather than the other way round.
          </p>
          <p style="margin-bottom:0">
            <a href="/areas/">See the towns we cover</a>, or just ring and ask.
          </p>
        </div>
      </div>

      <div>
        <div class="card">
          <h3>Or send us the details</h3>
          <p style="margin-bottom:1.25rem">
            Everything marked with an asterisk we need. Everything else just helps us give you a
            better price first time. We usually reply within the hour.
          </p>
          ${quoteForm({ id: "contactForm" })}
        </div>
      </div>
    </div>
  </div>
</section>

${ctaBand()}
`;
}

/* ======================================================================== */
/* Quote                                                                    */
/* ======================================================================== */
export function quotePage() {
  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Get a fixed price</p>
    <h1>Tell us what you need. We will come back with a price, not a sales call.</h1>
    <p class="lede">
      Four questions are all we need to get started. No call-out fee, no obligation, and no
      chasing you afterwards if you decide against it.
    </p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid grid-2" style="gap:2.5rem;align-items:start">
      <div class="card">
        ${quoteForm({ id: "mainQuote" })}
      </div>
      <div>
        <div class="callout is-good">
          <h3>If it is urgent, ring instead</h3>
          <p>
            A form is fine for a driveway or a survey. If you have water where water should not be,
            pick up the phone and we can be on the way while you are still describing it.
          </p>
          <a class="btn btn-call btn-wide btn-lg" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
        </div>

        <div class="card" style="margin-top:1.25rem">
          <h3>What happens after you send this</h3>
          <ol class="num-steps" style="margin-top:1rem">
            <li><h3>We read it and ring you</h3><p>Usually within the hour. If it came in overnight, first thing.</p></li>
            <li><h3>We price it</h3><p>On the phone where we can, on a visit where the job needs seeing. The visit is free.</p></li>
            <li><h3>You get it in writing</h3><p>Itemised, fixed, with what is included and what is not.</p></li>
            <li><h3>You decide</h3><p>And if the answer is no, that is the end of it. We do not chase.</p></li>
          </ol>
        </div>

        <div class="card" style="margin-top:1.25rem">
          <h3>Already know roughly what you want?</h3>
          <ul class="ticks" style="margin:0">
            <li><a href="/prices/">How we quote</a>, and what changes a price</li>
            <li><a href="/prices/#surfacing">What we look at on a driveway</a></li>
            <li><a href="/guides/who-is-responsible-for-a-blocked-drain/">Check whether the drain is even yours</a></li>
          </ul>
        </div>
        ${scoreBadge()}
      </div>
    </div>
  </div>
</section>
`;
}

/* ======================================================================== */
/* Privacy                                                                  */
/* ======================================================================== */
export function privacyPage() {
  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Privacy</p>
    <h1>What we do with your details</h1>
    <p class="lede">Short, because we do very little with them.</p>
  </div>
</section>
<section>
  <div class="wrap-narrow prose">
    <h2>What we collect</h2>
    <p>
      If you fill in a form on this site we collect what you type into it: the type of work you need,
      your postcode, your phone number, when you need someone, and optionally your name, email
      address and a description of the job. Nothing else.
    </p>
    <h2>Why we collect it</h2>
    <p>
      To reply to you and price your job. That is the only reason. We do not sell it, share it with
      other contractors or lead generation companies, or add you to a mailing list.
    </p>
    <h2>Where it is stored</h2>
    <p>
      Form submissions are stored in a database hosted by Supabase and are readable only by us. They
      are not visible to other visitors to this site.
    </p>
    <h2>How long we keep it</h2>
    <p>
      Enquiries that do not turn into work are deleted within twelve months. Records relating to work
      we have carried out are kept for six years, because we are required to keep business records,
      and because a guarantee is not much use if we have thrown away the job details.
    </p>
    <h2>Cookies and tracking</h2>
    <p>
      This site sets no advertising or tracking cookies, and there is no third party tracking script
      on it. That is why you are not being asked to accept anything.
    </p>
    <h2>Your rights</h2>
    <p>
      You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Email
      <a href="mailto:${site.email}">${site.email}</a> or ring <a href="tel:${site.telHref}">${site.tel}</a>
      and we will sort it out. If you are not happy with how we have handled your data you can
      complain to the Information Commissioner's Office at ico.org.uk.
    </p>
    <h2>Waste transfer notes</h2>
    <p>
      Where we remove waste we are required to keep a copy of the transfer note for two years, and
      that note includes the address the waste came from. We keep those for the two years and no
      longer.
    </p>
  </div>
</section>
`;
}

/* ======================================================================== */
/* 404                                                                      */
/* ======================================================================== */
export function notFound() {
  return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Page not found</p>
    <h1>That page is not here</h1>
    <p class="lede">
      It may have moved, or the link may be wrong. Either way, here is everything you might have
      been looking for. Or just ring us, which is quicker.
    </p>
    <div class="btn-row">
      <a class="btn btn-call btn-lg" href="tel:${site.telHref}">${icon("phone")} ${site.tel}</a>
      <a class="btn btn-ghost" href="/">Back to the home page</a>
    </div>
  </div>
</section>
<section>
  <div class="wrap">
    <h2>Services</h2>
    <div class="grid grid-3" style="margin-bottom:2.5rem">
      ${services
        .map(
          (s) => `<a class="svc-card" href="/services/${s.slug}/">${icon(s.icon, "svc-ico")}<h3>${esc(s.title)}</h3><span class="svc-from">${esc(s.from)}</span></a>`
        )
        .join("")}
    </div>
    <h2>Areas</h2>
    <div class="area-grid" style="margin-bottom:2.5rem">
      ${areas.map((a) => `<a class="area-link" href="/areas/${a.slug}/"><b>${esc(a.name)}</b><span>${esc(a.postcodes.join(" · "))}</span></a>`).join("")}
    </div>
    <h2>Everything else</h2>
    <ul class="ticks">
      <li><a href="/prices/">Prices</a></li>
      <li><a href="/projects/">Recent work</a></li>
      <li><a href="/reviews/">Reviews</a></li>
      <li><a href="/guides/">Guides and advice</a></li>
      <li><a href="/about/">About us</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul>
  </div>
</section>
`;
}
