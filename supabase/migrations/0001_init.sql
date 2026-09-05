-- ===========================================================================
-- Farnborough Contracting Services — schema for enquiries, projects and
-- testimonials.
--
-- Apply to Supabase project acdpgarasgfhvupzsbxf (the same project the
-- tcooper-interiors site uses; tables here are prefixed fcs_ so the two
-- never collide).
--
-- How to apply: Supabase dashboard -> SQL Editor -> New query -> paste this
-- whole file -> Run. It is idempotent, so running it twice is safe.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Enquiries: written by the public forms, readable only by us.
-- ---------------------------------------------------------------------------
create table if not exists public.fcs_enquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  service     text,
  postcode    text,
  phone       text,
  urgency     text,
  name        text,
  email       text,
  message     text,
  page        text,
  source      text,
  status      text not null default 'new'
);

comment on table public.fcs_enquiries is
  'Website enquiries from farnboroughcontracting.com. Insert-only for anon.';

create index if not exists fcs_enquiries_created_idx
  on public.fcs_enquiries (created_at desc);
create index if not exists fcs_enquiries_status_idx
  on public.fcs_enquiries (status);

alter table public.fcs_enquiries enable row level security;

drop policy if exists "public can submit enquiries" on public.fcs_enquiries;
create policy "public can submit enquiries"
  on public.fcs_enquiries
  for insert
  to anon
  with check (true);

-- Intentionally NO select policy for anon. Enquiries are readable only from
-- the Supabase dashboard or with the service role key, never by site visitors.


-- ---------------------------------------------------------------------------
-- Projects: the Recent Work gallery. Add rows here and they appear on the
-- site with no code change. published defaults to false so a half-finished
-- entry never goes live by accident.
-- ---------------------------------------------------------------------------
create table if not exists public.fcs_projects (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  title       text not null,
  category    text not null,
  location    text,
  duration    text,
  detail      text,
  image_url   text,
  image_before_url text,
  published   boolean not null default false,
  sort_order  int not null default 0
);

comment on table public.fcs_projects is
  'Completed jobs shown on /projects/. Set published = true to make one live.';

create index if not exists fcs_projects_pub_idx
  on public.fcs_projects (published, sort_order);

alter table public.fcs_projects enable row level security;

drop policy if exists "anyone can read published projects" on public.fcs_projects;
create policy "anyone can read published projects"
  on public.fcs_projects
  for select
  to anon
  using (published = true);


-- ---------------------------------------------------------------------------
-- Testimonials: for reviews collected directly, alongside the Checkatrade
-- ones that are hard-coded into the site.
-- ---------------------------------------------------------------------------
create table if not exists public.fcs_testimonials (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  quote        text not null,
  where_from   text,
  job          text,
  score        text not null default '10/10',
  source       text not null default 'Checkatrade',
  review_date  text,
  published    boolean not null default false,
  sort_order   int not null default 0
);

comment on table public.fcs_testimonials is
  'Customer reviews. Only ever store reviews the customer actually wrote.';

alter table public.fcs_testimonials enable row level security;

drop policy if exists "anyone can read published testimonials" on public.fcs_testimonials;
create policy "anyone can read published testimonials"
  on public.fcs_testimonials
  for select
  to anon
  using (published = true);


-- ---------------------------------------------------------------------------
-- Seed the gallery with the fallback jobs already baked into the site, so
-- the database and the static fallback agree from day one. Replace the
-- detail and add image_url values as real photographs go up.
-- ---------------------------------------------------------------------------
insert into public.fcs_projects (title, category, location, duration, detail, published, sort_order)
values
  ('Collapsed clay drain replaced under a driveway', 'Drain repairs', 'Farnborough, GU14', '2 days',
   'Camera found a fully collapsed section under block paving. Paving lifted, pipe replaced in clay, blocks relaid so the repair is invisible.', false, 10),
  ('Root ingress cut out and full length lining', 'Drain repairs', 'Aldershot, GU11', '1 day',
   'Roots through three joints in a Victorian clay run. Cut out, descaled and lined end to end with no ground broken.', false, 20),
  ('Permeable block paved driveway', 'Driveways', 'Fleet, GU51', '4 days',
   'Old concrete broken out and taken away, dug to 250mm, Type 3 sub-base, permeable blocks. No planning application needed.', false, 30),
  ('Soakaway sized on a percolation test', 'Drainage', 'Cove, GU14', '1 day',
   'Previous soakaway flooded every winter. Trial pit dug, ground tested, replacement sized correctly and connected to the downpipes.', false, 40),
  ('Dropped kerb and vehicle crossing', 'Dropped kerbs', 'Farnborough, GU14', '2 days',
   'Hampshire application, Section 171 licence, kerbs lowered and footway reinstated to specification, then the driveway behind it.', false, 50),
  ('Pre-purchase CCTV survey', 'Surveys', 'Camberley, GU15', '2 hours',
   '1970s property on pitch fibre. Deformation found and reported, and the buyer renegotiated on the strength of the footage.', false, 60)
on conflict do nothing;


-- ---------------------------------------------------------------------------
-- Optional: enquiry email notifications.
--
-- The tcooper-interiors site already runs this pattern in the same project:
-- a database webhook on insert calls an edge function that sends through
-- Resend. To do the same here, create a webhook named
-- notify_on_new_fcs_enquiry on insert to public.fcs_enquiries pointing at an
-- edge function, and reuse the existing Resend key.
--
-- Until that is set up, read new enquiries in the dashboard:
--   select created_at, service, postcode, phone, urgency, message
--   from public.fcs_enquiries
--   where status = 'new'
--   order by created_at desc;
-- ---------------------------------------------------------------------------
