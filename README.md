# farnboroughcontracting.com

The website for Farnborough Contracting Services, drainage and groundworks
contractors in Farnborough, Hampshire.

Hand-built static HTML, CSS and JavaScript, generated from a single content
file, with a Supabase backend for enquiries and the work gallery. No
framework, no build dependencies, no tracking scripts.

36 pages. The home page is four requests and about 93 KB, with zero
cumulative layout shift.

---

## How it works

The site is **generated**, not hand-edited. Everything a person would want to
change lives in `build/data.mjs`: the services, the towns, the guides, the
reviews, the contact details and the SEO titles. Running the generator writes
the HTML.

```bash
node build/build.mjs
```

That is the whole build. Node 18 or later, no `npm install`.

`.github/workflows/deploy.yml` runs the same command on every push to `main`
and publishes the result to GitHub Pages, so the generated HTML is not
committed. Edit the content, push, and the live site follows about a minute
later.

### Making a change

| To change | Edit |
|---|---|
| Any page copy, a service, a town, a review | `build/data.mjs` |
| A page's title or meta description | the `seo` table in `build/data.mjs` |
| Page layout or a component | `build/pages.mjs`, `build/templates.mjs` |
| Colours, type, spacing | `assets/css/site.css` |
| The drain tool, forms, filters | `assets/js/site.js` |

The build refuses to finish if a page title goes over 62 characters or a meta
description over 158, so they cannot silently drift past what Google shows.

### Checking it before you push

```bash
npm i -D playwright
python3 -m http.server 8099    # in another terminal
node build/verify.mjs
```

Crawls all 36 pages and reports broken links, horizontal overflow at 390px,
tap targets under 24px, WCAG AA contrast failures, oversized titles, missing
descriptions and JSON-LD that will not parse, then writes screenshots to
`.verify/`.

```bash
node build/preview.mjs
```

Bundles the whole site into one self-contained HTML file with working links,
for sending to someone for review.

---

## Structure

```
/                                   home
/services/                          hub + 9 service pages
/prices/                            how we quote, and what changes a price
/projects/                          recent work, filterable
/reviews/                           customer reviews
/areas/                             hub + 10 town pages
/guides/                            hub + 5 long-form guides
/about/  /contact/  /quote/  /privacy/
404.html  sitemap.xml  robots.txt   all generated
```

Town pages are deliberately limited to ten, each with real local substance:
what the drainage in that town is made of, what the ground does, which council
you apply to for what. **Do not generate a service-by-town matrix.** Nine
services times ten towns is ninety near-identical pages, which is Google's own
definition of doorway abuse.

The five guides are the authority content and are the pages most likely to
earn links: who is responsible for a blocked drain, dropped kerbs in Hampshire
and Surrey, homebuyer drain surveys, driveways and planning permission, and
building over a sewer.

---

## Deployment

### Pages source

Settings → Pages → Source: **GitHub Actions**. Once, and it is already set.
The custom domain comes from the `CNAME` file the build writes, so it is
picked up on the first deploy. Tick **Enforce HTTPS** once the certificate has
been issued.

### DNS

```
www   CNAME   anthonygdunn-hub.github.io

@     A       185.199.108.153
@     A       185.199.109.153
@     A       185.199.110.153
@     A       185.199.111.153
```

Add the AAAA records too if the DNS host supports them.

### What the workflow publishes

Only the generated site. The generator, the Supabase migration and the
markdown docs are stripped before the artifact is packed, and the workflow
asserts they are gone and `index.html` is present rather than trusting the
delete. It also refuses to deploy a build of fewer than 30 pages, so a broken
content file cannot take the site down.

---

## Supabase

Apply `supabase/migrations/0001_init.sql` in the Supabase SQL Editor. It is
idempotent, so running it twice is safe.

Three tables, all with row level security:

- `fcs_enquiries` — insert only for anonymous visitors, with no select policy,
  so enquiries are readable from the dashboard and nowhere else
- `fcs_projects` — the work gallery, readable only where `published = true`
- `fcs_testimonials` — reviews, readable only where `published = true`

Only the publishable key is in the front end. If Supabase is unreachable the
enquiry forms fall back to opening the visitor's email client with the details
filled in, so an enquiry is never silently lost.

### Adding work to the gallery

Insert a row and set `published = true`. Upload the photograph to Supabase
Storage in the `gallery` bucket under an `fcs/` prefix and use its public URL.
Resize to about 1200px wide first; the markup already sets width and height so
adding images will not cause layout shift.

```sql
insert into public.fcs_projects
  (title, category, location, duration, detail, image_url, published, sort_order)
values
  ('Collapsed drain replaced under a patio', 'Drain repairs', 'Fleet, GU51', '2 days',
   'Camera found a collapsed section under the slabs. Pipe replaced, slabs relaid.',
   'https://acdpgarasgfhvupzsbxf.supabase.co/storage/v1/object/public/gallery/fcs/job-01.jpg',
   true, 10);
```

Categories that match the filter buttons: Drain repairs, Driveways, Drainage,
Dropped kerbs, Surveys, Groundworks, Maintenance.

### Reading enquiries

```sql
select created_at, service, postcode, phone, urgency, message
from public.fcs_enquiries
where status = 'new'
order by created_at desc;
```

---

## Accessibility and performance

Verified in a real browser at 390px, 820px and 1440px:

- WCAG 2.2 AA contrast on every text element across all 36 pages
- No tap target under 24px outside inline sentence text (SC 2.5.8), with
  primary controls built to 48px and above
- No horizontal overflow at 390px; wide tables scroll inside their own
  container
- Skip link, visible focus rings, one `h1` per page, labelled form fields,
  `aria-live` status messages, `prefers-reduced-motion` respected
- The interactive tools and the forms all degrade to working HTML with
  JavaScript disabled

## Structured data

`LocalBusiness` typed as `["LocalBusiness","Plumber","GeneralContractor"]`
with `areaServed`, `openingHoursSpecification`, `geo` and `sameAs`, plus
`Service` on service pages, `FAQPage` where there are questions, `Article` on
guides and `BreadcrumbList` throughout.

**Deliberately no `aggregateRating`.** Google does not show review stars for a
business marking up reviews about itself, and pulling a third-party score into
your own schema is against its guidance. The reviews are on the page to
persuade a reader, with a link out to the source. Anyone offering to "get you
star ratings" using review schema on your own site is selling something that
does not work.
