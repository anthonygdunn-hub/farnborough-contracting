/* ==========================================================================
   Farnborough Contracting Services — site content
   Single source of truth for every page the generator writes.

   Anything tagged CONFIRM in a comment needs sign-off from the business
   before the site goes live. See CONTENT-TO-CONFIRM.md.
   ========================================================================== */

export const site = {
  name: "Farnborough Contracting Services",
  shortName: "Farnborough Contracting",
  initials: "FCS",
  tagline: "Drainage & groundworks",
  domain: "www.farnboroughcontracting.com",
  origin: "https://www.farnboroughcontracting.com",

  tel: "01252 650804",
  telHref: "+441252650804",
  mobile: "07961 110539",
  mobileHref: "+447961110539",
  whatsapp: "447961110539",
  email: "info@farnboroughcontracting.co.uk",

  // Address is deliberately NOT published in full. Google's guidance for
  // service-area businesses is to hide a residential address, and
  // 30 Shakespeare Gardens is a home address. Town + outward postcode only.
  townCounty: "Farnborough, Hampshire",
  postcodeArea: "GU14",
  geo: { lat: 51.29222, lng: -0.75278 }, // CONFIRM: Farnborough town centre, fine for a service-area business

  // Verified on the Checkatrade profile, September 2026.
  reviewCount: 363,
  reviewSource: "Checkatrade",
  reviewUrl: "https://www.checkatrade.com/trades/farnboroughcontractingservices",

  yearsTrading: "over 20 years", // CONFIRM: current site says 20 years, a decade and 12 years in three places
  responsePromise: "We answer the phone ourselves, 24 hours a day, and aim to be with you the same day.",

  facebook: "https://www.facebook.com/farnboroughcontractingservices/",
  twitter: "https://x.com/FCSDrainage",

  envAgencyReg: "", // CONFIRM: upper or lower tier registration number, then publish it
};

/* --- Trust badges -------------------------------------------------------- */
export const badges = [
  "FSB member",
  "Environment Agency registered waste carrier",
  "Public liability insured",
  "No call-out fee",
  "24 hours, 365 days",
];

/* --- Headline stats ------------------------------------------------------ */
export const stats = [
  { n: "363", l: "Checkatrade reviews, every one scored 10 out of 10" },
  { n: "20+", l: "years working the drains and ground of north Hampshire" },
  { n: "Free", l: "call-outs and quotes, day or night, weekends included" },
  { n: "24/7", l: "answered by us, not a call centre" },
];

/* --- Services ------------------------------------------------------------
   from  — headline price used on cards and in schema
   icon  — key into the icon set in templates.mjs
   ------------------------------------------------------------------------ */
export const services = [
  {
    slug: "blocked-drains",
    nav: "Blocked drains",
    title: "Blocked drain clearance",
    h1: "Blocked drain cleared today, usually within the hour",
    from: "Same day, no call-out fee",
    icon: "drain",
    summary:
      "Sinks, toilets, gullies, manholes and main runs. Rodded, jetted or cut clear, with the cause found rather than just pushed along.",
    lede:
      "Most blockages we go to are cleared inside the hour. You get a fixed price before we start, we find out what caused it, and we tell you straight if the pipe needs more than a clean. Ring us and we can usually price it on the phone.",
    intro: [
      "A blocked drain is not usually a mystery. It is fat and wipes in a kitchen run, roots in an old clay joint, a collapsed section under a driveway, or silt built up in a gully nobody has lifted for fifteen years. Clearing the water away is the easy part. Knowing which of those you are dealing with is what stops it happening again in three months.",
      "We carry rods, an electro-mechanical cutter and a high pressure jetter on the van, plus a camera. That means we can clear almost anything on the first visit and show you what was behind it before we leave.",
    ],
    includes: [
      "Fixed price agreed on the phone or on the doorstep, before any work starts",
      "No call-out fee, including evenings, weekends and bank holidays",
      "Rodding, electro-mechanical cutting or high pressure jetting as the job needs",
      "Camera check down the cleared run so you can see the cause",
      "Chambers lifted and put back, and the area left washed down",
      "A written note of what we found and what we would do next, if anything",
    ],
    excludes: [
      "Excavation or pipe replacement, quoted separately once we have seen the camera",
      "Drain lining or patch repairs, quoted separately",
      "Work on the public sewer, which is your water company's job and free to you",
    ],
    signs: [
      "Water standing in a sink, bath or shower, or draining away slowly",
      "Gurgling from a plughole when a nearby tap runs or a toilet flushes",
      "A toilet that rises then drops slowly, or will not clear",
      "Smell from a gully, manhole or outside drain",
      "Water lifting the manhole cover, or pooling on the drive after rain",
    ],
    steps: [
      { h: "Ring us and describe it", p: "We ask where the water is standing and which fittings are affected. That usually tells us whether it is one fitting or the whole run, and we can price it on the phone." },
      { h: "We give you a fixed price", p: "Before we set off. It does not change on the doorstep, and there is no call-out fee if you decide against it." },
      { h: "We clear it", p: "Rods first, jetter or cutter if the blockage needs it. Most jobs are done inside the hour." },
      { h: "We show you the cause", p: "Camera down the cleared run. If it is roots, a collapse or a bad joint you see it on screen, and you get a written note and a separate fixed price for the repair." },
    ],
    faqs: [
      {
        q: "How quickly can you get to me?",
        a: "We aim for the same day, and often within a couple of hours. We answer our own phone around the clock, so ringing at 2am gets you a person rather than an answering service.",
      },
      {
        q: "Do you charge a call-out fee?",
        a: "No. There is no charge for coming out and no charge for quoting, at any hour. You only pay the price we agreed if we do the work.",
      },
      {
        q: "Is the blocked drain my responsibility or the water company's?",
        a: "It depends where the blockage is. Pipes inside your boundary that only serve your property are yours. The lateral drain running out under the pavement, and the public sewer, belong to your water company and they clear those free of charge. We will tell you honestly which one you have, and we would rather send you to them than charge you for something you can get for nothing. Our guide walks through it.",
      },
      {
        q: "Will jetting damage my pipes?",
        a: "Not when the pressure is matched to the pipe. Old clay and pitch fibre need a different setting to modern plastic, which is why we camera first if there is any doubt. If a pipe is already broken, jetting will show that up rather than cause it.",
      },
      {
        q: "What if the drain blocks again?",
        a: "If it blocks again in the same place within 30 days and the cause was something we should have cleared, we come back and sort it at no charge. If the camera showed a structural fault that you chose not to have repaired, that is a different situation and we will have told you so at the time.",
      },
    ],
    related: ["cctv-drain-surveys", "drain-repairs", "maintenance-contracts"],
  },

  {
    slug: "cctv-drain-surveys",
    nav: "CCTV drain surveys",
    title: "CCTV drain surveys",
    h1: "CCTV drain surveys, with a written report you keep",
    from: "Report and footage included",
    icon: "camera",
    summary:
      "Pre-purchase surveys, insurance evidence and fault finding. You keep the video, the still images and a written report with the defects coded.",
    lede:
      "A survey is only worth having if you get the evidence. Every survey we do comes with the footage, still images of anything we find, and a written report you can hand to a solicitor, an insurer or another contractor.",
    intro: [
      "Plenty of firms will run a camera down your drain and tell you what they saw. That is not a survey, it is an opinion. What a buyer, a lender or an insurer needs is a record: where the pipe runs, what it is made of, what condition it is in, and where the defects are, measured from a fixed point.",
      "We survey the full run rather than the first accessible length, code what we find against the standard defect classifications, and give you the file. If the report says you need work, you are free to take it to anyone.",
    ],
    includes: [
      "Full CCTV walk of the drain runs, not just the first accessible length",
      "Written report with defects described, located and coded",
      "Still images of every defect found",
      "The video file, supplied to you to keep",
      "Chambers lifted, camera cleaned and chambers reinstated",
      "A fixed price quote for any remedial work, given on the day",
      "The survey fee credited against remedial work booked on the same visit",
    ],
    excludes: [
      "Excavating a buried inspection chamber nobody can find, quoted before we start",
      "Additional chambers beyond the first two on the property",
      "A supplement for a survey booked outside normal working hours",
      "Tracing and mapping a run to produce a scaled drainage plan, quoted separately",
    ],
    steps: [
      { h: "Tell us why you need it", p: "A house purchase, an insurance claim, a recurring blockage and a build over a sewer all need a slightly different survey. We ask first so the report answers the right question." },
      { h: "We survey the runs", p: "Chambers lifted, camera through the full length, foul and surface water where both are accessible. Usually an hour to two hours on a domestic property." },
      { h: "You get the evidence", p: "Video file, still images and a written report with the defects coded and located. Sent through the same day or the next working day." },
      { h: "You decide what happens next", p: "If there is work to do you get a fixed price on the day, and the survey fee comes off it if you book the work with us. If you would rather take the report elsewhere, that is fine, it is yours." },
    ],
    faqs: [
      {
        q: "Do I need a drain survey before buying a house?",
        a: "A standard valuation does not look at the drains at all, and a homebuyer survey will normally do no more than lift a cover and note that it exists. Drain repairs run from a few hundred pounds for a patch to five figures for a full replacement under a driveway, so on an older property it is one of the cheapest pieces of information you can buy before you exchange.",
      },
      {
        q: "What does the report actually tell me?",
        a: "Where the pipes run and what they are made of, the condition of each length, and every defect with its position and severity. Cracks, displaced joints, root ingress, scale, standing water, previous bad repairs and any connection into a drain that is not yours. Enough for a solicitor to raise an enquiry or an insurer to open a claim.",
      },
      {
        q: "How long does it take?",
        a: "A normal three or four bedroom house takes one to two hours on site. The report follows the same day or the next working day.",
      },
      {
        q: "Can you find where a drain runs if there are no plans?",
        a: "Yes. We use a sonde in the camera head and a locator above ground to trace the line and depth from the surface, and we can mark it out for you. That is what you need before anyone digs footings or lays a driveway.",
      },
      {
        q: "Is the survey fee wasted if you find nothing?",
        a: "You still have the report, and on a house purchase a clean report is exactly what you were paying to find out. If you buy the house and later need work, the report tells your contractor what they are dealing with.",
      },
    ],
    related: ["blocked-drains", "drain-repairs", "guides/homebuyer-drain-surveys"],
  },

  {
    slug: "drain-repairs",
    nav: "Drain repairs & lining",
    title: "Drain repairs and lining",
    h1: "Drain repairs, lining and patch work",
    from: "Quoted from camera evidence",
    icon: "repair",
    summary:
      "Cracked, displaced or root-damaged pipes put right. Patch liners and full length lining where we can, excavation where we must.",
    lede:
      "Not every broken drain needs the driveway taking up. Where the pipe is still in line we can line it from the inside. Where it has collapsed, we dig, and we put the surface back properly.",
    intro: [
      "The question with a damaged drain is always the same: can this be repaired from the inside, or does it have to come out? A camera survey answers it. A cracked or slightly displaced pipe that is still holding its line can usually be patched or lined without breaking ground, in a day, at a fraction of the cost of excavation.",
      "A pipe that has collapsed, dropped out of line or been crushed under a driveway has to be dug out and replaced. When that is the answer we say so, we tell you what the reinstatement will look like, and we quote it as one job so you are not left with a trench and a separate bill for the paving.",
    ],
    includes: [
      "Camera survey first, so the repair is chosen on evidence",
      "Patch liners for localised cracks and displaced joints",
      "Full length cured-in-place lining where the whole run is tired",
      "Root cutting and descaling before lining, so the liner sits properly",
      "Excavation and replacement in clay, plastic or concrete where lining will not do",
      "Reinstatement of paving, tarmac, concrete or turf as part of the same quote",
      "Post-repair camera check and footage of the finished pipe",
    ],
    excludes: [
      "Work on the public sewer or your water company's lateral drain",
      "Structural underpinning or work needing a structural engineer's design",
      "Build-over agreements with the water company, though we will tell you when one is needed",
    ],
    steps: [
      { h: "Survey", p: "We camera the run and locate the fault from the surface, so we know exactly where it is and how deep before anyone quotes." },
      { h: "Two prices where there is a choice", p: "Where both lining and excavation are possible you get both prices, with the pros and cons of each, and you choose." },
      { h: "The repair", p: "A patch is usually a half day with no ground broken. A dig depends on depth and what is over the top of it, and we tell you which days we will be there." },
      { h: "Proof it is fixed", p: "Camera down the repaired run, footage sent to you, and the surface put back so you cannot see where we were." },
    ],
    faqs: [
      {
        q: "Is drain lining as good as replacing the pipe?",
        a: "For a cracked, leaking or root-damaged pipe that is still in line, yes, and often better, because you get a continuous jointless liner with no joints for roots to get into. Lining cannot fix a pipe that has collapsed, dropped out of line or lost its shape. The camera tells us which you have.",
      },
      {
        q: "Will you have to dig up my driveway?",
        a: "Only if the pipe has to come out, and we will have shown you why on camera first. Where we do dig, the reinstatement is part of the quoted price, and block paving can usually be lifted and relaid so the repair is invisible.",
      },
      {
        q: "How long does a repair last?",
        a: "A properly installed liner has a design life comparable to a new pipe, measured in decades. A replacement run in modern plastic or clay is a new drain. Both are a permanent fix rather than a patch, which is the point of doing it on evidence rather than guesswork.",
      },
      {
        q: "Will my insurance cover it?",
        a: "Many buildings policies cover damage to underground drainage, and some cover the cost of finding it. What insurers want is evidence: dated footage, still images and a written report identifying the defect and its location. That is what our survey gives you, and we are happy to talk to your insurer or loss adjuster.",
      },
    ],
    related: ["cctv-drain-surveys", "blocked-drains", "drainage-installation"],
  },

  {
    slug: "drainage-installation",
    nav: "New drainage & soakaways",
    title: "New drainage and soakaways",
    h1: "New drainage, soakaways and surface water",
    from: "Tested and filmed on completion",
    icon: "pipe",
    summary:
      "New foul and surface water runs, soakaways, land drainage, gullies and connections. Set out and laid to Part H, with the levels right.",
    lede:
      "Drainage that works is mostly about falls, bedding and where the water is going to end up. We set out, dig, lay and test, and we tell you before we start where the water will go and what the ground will take.",
    intro: [
      "Most of the drainage problems we get called to were built in. A run laid too flat so solids drop out. A soakaway put in clay with no percolation test, so it fills in the first wet autumn and never empties. A downpipe plumbed into the foul system because it was the nearest hole in the ground.",
      "New work is the chance to get it right. We set out from the invert levels, lay to a fall that self-cleanses, bed and surround properly, and test before backfilling. Where surface water has to soak away we dig a trial pit and test the ground first, because the size of the soakaway depends on what the ground will actually take.",
    ],
    includes: [
      "Site visit, levels taken and the route set out before pricing",
      "Foul and surface water runs in clay or plastic, laid to the falls in Approved Document H",
      "Soakaways sized on a percolation test rather than a guess",
      "Land drainage and channel drainage for wet gardens and flooding driveways",
      "New gullies, inspection chambers and rodding access",
      "Connections into an existing private run or, where permitted, the public sewer",
      "Air or water test on completion, and camera footage of the finished run",
      "Muck away and reinstatement",
    ],
    excludes: [
      "Building control application fees and water company connection fees",
      "Septic tank and treatment plant supply and commissioning, quoted per job",
      "Build-over or build-near agreements with the water company, though we advise when one is needed",
    ],
    steps: [
      { h: "Survey and levels", p: "We find the existing runs, take levels and work out where the water can go. On a soakaway that means digging a trial pit and testing the ground." },
      { h: "Design and fixed price", p: "You get the route, the pipe size, the falls, the soakaway size and one price covering the whole job including reinstatement." },
      { h: "Installation", p: "Excavate, bed, lay, surround and backfill in the right order, with chambers and rodding access where they need to be." },
      { h: "Test and hand over", p: "Air or water test, camera footage, and a mark-up of where everything runs so you have it for the future." },
    ],
    faqs: [
      {
        q: "Do I need building regulations approval for new drainage?",
        a: "New drainage and alterations to existing drainage generally fall under Part H of the Building Regulations, and connecting to a public sewer needs the water company's agreement. On most domestic jobs we handle the practical side and tell you exactly which notifications are needed and who has to make them.",
      },
      {
        q: "Why did my last soakaway fail?",
        a: "Almost always because it was too small for the ground it was dug in, or it was dug in clay that will not percolate at all. A soakaway has to be sized from a percolation test and the area of hard surface draining to it. If the ground genuinely will not take water, the answer is an attenuation crate, a connection to a surface water sewer or a discharge to a watercourse, not a bigger hole full of stone.",
      },
      {
        q: "Can you drain a garden that floods?",
        a: "Usually. It depends whether the water is coming off a hard surface, sitting on clay with nowhere to go, or arriving from next door. We look at where it comes from before we suggest land drains, a channel and gully, a soakaway or a combination.",
      },
      {
        q: "Can rainwater go into the foul drain?",
        a: "It should not, and on separate drainage systems it is not permitted. It overloads the sewer and it is a common reason for drains backing up in heavy rain. If your downpipes have been plumbed into the foul run we will tell you and price separating them.",
      },
    ],
    related: ["groundworks", "drain-repairs", "guides/building-over-a-sewer"],
  },

  {
    slug: "driveways-patios",
    nav: "Driveways & patios",
    title: "Driveways and patios",
    h1: "Driveways and patios built on a proper base",
    from: "No deposit, pay when finished",
    icon: "paving",
    summary:
      "Block paving, permeable paving, tarmac, resin bound, gravel and concrete. Excavated to depth with a real sub-base, edged and haunched.",
    lede:
      "A driveway fails from the bottom up. We excavate to depth, lay and compact a proper sub-base, haunch the edges in concrete and get the falls right, then lay the surface you chose.",
    intro: [
      "Two driveways can look identical on the day they are finished and be completely different jobs. The difference is underneath: how deep it was dug, what went in the bottom, whether it was compacted in layers, and whether the edge courses were haunched properly. That is what decides whether it is still flat and tight in ten years or rutted and spreading in three.",
      "We quote the build-up, not just the blocks. You will see the excavation depth, the sub-base type and thickness, the laying course, the edge detail and how the water gets away, so you can compare our price against another one honestly.",
    ],
    includes: [
      "Excavation to depth and muck away, with the arisings taken under our waste carrier registration",
      "Compacted MOT Type 1 or Type 3 sub-base, laid and whacked in layers",
      "Edge restraints haunched in concrete, not butted against the soil",
      "Falls set away from the house and drainage designed in",
      "Block paving, permeable paving, tarmac, resin bound, gravel or concrete",
      "Channel drainage or a soakaway where the surface needs it",
      "Kiln dried sand, jointing and a final compaction",
      "Site left clean and swept",
    ],
    excludes: [
      "The dropped kerb or vehicle crossing itself, which is a separate council application, see our dropped kerbs page",
      "Planning applications, though we tell you when one is needed",
      "Retaining wall design where a structural engineer is required",
    ],
    steps: [
      { h: "Measure and talk it through", p: "We measure up, look at the levels, the existing surface and where the water currently goes, and talk through surfaces and cost per square metre." },
      { h: "A quote you can compare", p: "Written, itemised, with the excavation depth, sub-base spec, edge detail and drainage set out. Fixed, with no deposit taken." },
      { h: "The build", p: "Excavate, muck away, sub-base in compacted layers, edges haunched, laying course, then the surface. A typical domestic drive is three to five days." },
      { h: "Sign off, then pay", p: "You walk it with us and we put right anything you are not happy with before you pay." },
    ],
    faqs: [
      {
        q: "Do I need planning permission for a new driveway?",
        a: "Not if the surface is permeable, or if the rainwater is directed to a lawn, border or soakaway inside your own boundary, at any size. You do need permission for a traditional impermeable surface over five square metres at the front of the house that drains straight onto the road. Permeable block paving, gravel and porous asphalt all avoid the application, which is one reason we usually recommend them. Our guide sets out the rules.",
      },
      {
        q: "How deep should a driveway be dug out?",
        a: "For cars, we normally excavate around 250mm below finished level, giving roughly 150mm of compacted sub-base plus the laying course and the block. Soft ground, a poor sub-grade or vehicles heavier than a car need more, and a geotextile membrane. Anyone quoting to lay blocks on the existing surface is not building a driveway.",
      },
      {
        q: "Which surface lasts longest?",
        a: "Well laid block paving on a proper base is the most repairable, because you can lift and relay a section invisibly, and individual blocks can be swapped. Tarmac is the cheapest per square metre and quickest to lay. Resin bound looks the smartest and drains through, but it needs a sound base underneath, usually tarmac or concrete. We will give you honest cost and maintenance figures for each on your job.",
      },
      {
        q: "Do you take a deposit?",
        a: "No. You pay nothing up front, and nothing until the work is finished and you have told us you are happy with it.",
      },
      {
        q: "What happens to the old driveway?",
        a: "We break it out and take it away under our Environment Agency waste carrier registration, and you get a waste transfer note. It is included in the quoted price, not added afterwards.",
      },
    ],
    related: ["dropped-kerbs", "groundworks", "guides/permeable-driveways-planning"],
  },

  {
    slug: "groundworks",
    nav: "Groundworks",
    title: "Groundworks",
    h1: "Groundworks, bases and site preparation",
    from: "Priced from your drawings",
    icon: "digger",
    summary:
      "Footings, concrete bases, retaining walls, site clearance, muck away and drainage for extensions, garages, garden rooms and new builds.",
    lede:
      "The part of the job nobody sees and everything else depends on. Setting out, dig, muck away, drainage, bases and footings, done to the levels on the drawing.",
    intro: [
      "Groundworks is where a build is either set up to go smoothly or set up to go wrong. Footings in the wrong place, a base out of level, drainage not thought about until the slab is down, or a dig that turns out to be sitting over a sewer nobody checked for.",
      "We do the groundworks for extensions, garages, garden rooms, outbuildings and small developments across north Hampshire and west Surrey. Because we are a drainage firm as well, we find the existing runs before we dig rather than after, which is the single most common reason groundworks jobs stop.",
    ],
    includes: [
      "Setting out from drawings, and levels taken and recorded",
      "Site clearance, grubbing out and tree root removal",
      "Foundations and trench fill, dug and concreted to depth",
      "Reinforced concrete bases and oversites for garages and garden rooms",
      "Drainage runs, chambers and connections designed in from the start",
      "Retaining walls, sleeper walls and level changes",
      "Existing drain runs located and mapped before excavation",
      "Muck away under our own waste carrier registration",
    ],
    excludes: [
      "Structural engineer's design and building control fees",
      "Superstructure, brickwork above damp course and roofing",
      "Water company build-over agreements, though we identify when one is needed",
    ],
    steps: [
      { h: "Drawings and a site visit", p: "We look at the drawings, the access, the ground and the existing services. If there is any chance of a drain under the footprint we camera and trace it first." },
      { h: "Programme and price", p: "An itemised price and the number of days on site, so you know when the trades behind us can start." },
      { h: "Dig and concrete", p: "Set out, excavate, muck away, inspect, concrete. We deal with building control inspections at the right stages." },
      { h: "Drainage and hand over", p: "Runs laid and tested, levels checked against the drawing, and the site left ready for the next trade." },
    ],
    faqs: [
      {
        q: "Can you work from an architect's drawings?",
        a: "Yes. Send them over with the structural engineer's details if you have them and we will price from those. If there are no drawings yet we can still price the groundworks in principle, but the footing depths and reinforcement have to come from the engineer.",
      },
      {
        q: "What if there is a drain under my extension?",
        a: "It is common, and it is manageable, but it has to be found before you dig. Building over or within three metres of a public sewer normally needs a build-over agreement with the water company. We locate and camera the run first, tell you what you are dealing with and what consent is needed, and design the drainage around it. Our guide explains the process.",
      },
      {
        q: "Do you deal with building control?",
        a: "We work to the inspection stages and make sure the footings and drainage are ready and open when the inspector comes. The application itself is normally made by you or your architect, and we will tell you what needs notifying and when.",
      },
      {
        q: "How do you dispose of the spoil?",
        a: "We are registered with the Environment Agency as a waste carrier, so we take it away ourselves and you get a waste transfer note for your records. It is priced in the quote rather than added later as a skip charge.",
      },
    ],
    related: ["drainage-installation", "dropped-kerbs", "waste-removal"],
  },

  {
    slug: "dropped-kerbs",
    nav: "Dropped kerbs",
    title: "Dropped kerbs and vehicle crossings",
    h1: "Dropped kerbs in Hampshire and Surrey",
    from: "Licence and insurance held",
    icon: "kerb",
    summary:
      "Vehicle crossings built to the highway authority's specification, with the Section 171 licence and the £10m cover the council insists on.",
    lede:
      "Two counties, two completely different processes. We know both, we hold the insurance and licence Hampshire requires, and we tell you what it will cost before you pay the council anything.",
    intro: [
      "A dropped kerb sounds simple and the paperwork is anything but. In Hampshire you apply to the county council, you get approval, and then you appoint your own contractor, who must hold ten million pounds of public liability cover and take out a Section 171 road opening licence. Hampshire is explicit that a contractor working without that licence is doing so illegally. In Surrey you cannot choose freely at all: the county will only allow an approved contractor to do the work.",
      "We work across both counties and we will tell you honestly at the first phone call which process applies to you, what the council fees are, how long it takes and whether we can do the crossing itself or only the driveway behind it.",
    ],
    includes: [
      "Telling you which authority you are dealing with and what the real timescale is",
      "Help with the application and the specification the council will accept",
      "Public liability cover at the level the highway authority requires",
      "Section 171 road opening licence obtained before we break ground",
      "Kerbs lowered or crossing constructed to the authority's specification",
      "Utility apparatus checked and the companies notified where affected",
      "Footway reinstated to the council's specification and inspected",
      "The driveway behind the crossing built as one job if you want it",
    ],
    excludes: [
      "Council application fees, which are set by the authority and paid by you",
      "Planning permission, which is separate and needed for classified roads, listed buildings, flats and some other cases",
      "Utility company charges where their apparatus has to be moved",
    ],
    priceNote:
      "Council fees are set by the highway authority and change. Hampshire's application is £211.90, or £308.90 with the two week fast track. Surrey charges £80 for the initial assessment and a further £150 for the full application, £230 in total. All are non-refundable and none is paid to us.",
    steps: [
      { h: "We check which rules apply", p: "Hampshire County Council for Farnborough, Aldershot and the rest of Rushmoor. Surrey County Council for Camberley, Woking and Guildford. The processes are not alike." },
      { h: "Application", p: "We help you put in an application the council will accept first time, with the right specification. Hampshire responds within eight weeks, or two on fast track. Surrey sends an officer out within twenty working days." },
      { h: "Licence and insurance", p: "Once approval is granted we take out the Section 171 licence and provide the insurance certificate. Nothing is dug before that is in place." },
      { h: "Build and inspection", p: "Kerbs lowered, crossing constructed and footway reinstated to specification, then inspected by the authority." },
    ],
    faqs: [
      {
        q: "How much does a dropped kerb cost in total?",
        a: "Two parts, and only one of them is ours. The council fee, which is £211.90 in Hampshire or £230 in Surrey and goes to them, not to us. And the construction, which depends on the width, the levels, whether the footway has to be strengthened and whether any utility covers are in the way. We quote that free of charge, once approval is in place and the specification is known.",
      },
      {
        q: "How long does it take?",
        a: "In Hampshire, up to eight weeks for a standard application or two weeks on fast track, then the licence and the build. In Surrey, an officer visits within twenty working days for the first stage, and the second stage has to be started within six months of the first being approved. Realistically, plan for two to three months from first enquiry to a finished crossing.",
      },
      {
        q: "Do I need planning permission as well?",
        a: "Often, yes. It is required where the access is onto a classified road, for listed buildings and conservation areas, for flats and maisonettes, for multiple dwellings, and where permitted development rights have been removed. Surrey also requires it where a non-porous parking surface is proposed. We flag it at the first conversation because applying for the crossing without it wastes the fee.",
      },
      {
        q: "Can I use any contractor?",
        a: "In Hampshire, yes, but they must carry ten million pounds of public liability insurance and hold a Section 171 road opening licence. Hampshire does not keep a list of approved contractors and does not make recommendations. Surrey is the opposite: the work must be done by one of their approved contractors. Ask any contractor to show you the licence before they start.",
      },
    ],
    related: ["driveways-patios", "groundworks", "guides/dropped-kerbs-hampshire-surrey"],
  },

  {
    slug: "maintenance-contracts",
    nav: "Maintenance contracts",
    title: "Drainage maintenance contracts",
    h1: "Planned drainage maintenance for landlords, agents and businesses",
    from: "One invoice across all your sites",
    icon: "calendar",
    summary:
      "Scheduled jetting, gully and interceptor cleaning and CCTV inspection for letting agents, blocks of flats, pubs, care homes and councils.",
    lede:
      "One planned visit a year costs a fraction of one emergency at 6pm on a Friday with a kitchen out of use. We schedule it, do it and send you the paperwork.",
    intro: [
      "For anyone responsible for more than one property, drainage is a call you do not want to take. A blocked kitchen run in a rented flat, a flooding gully at a commercial unit, a grease trap in a pub kitchen that has not been touched since the last manager. All of them are avoidable and all of them cost more once they have gone wrong.",
      "We run planned maintenance for letting and managing agents, blocks of flats, pubs and restaurants, care homes, schools and local authority property across Hampshire, Surrey and the Berkshire borders. You get a schedule, a named contact, one invoice and the records you need for your own compliance file.",
    ],
    includes: [
      "A written schedule agreed for the year, per site",
      "High pressure jetting of kitchen and main runs",
      "Gully, interceptor and grease trap cleaning and emptying",
      "CCTV inspection on a rolling cycle so problems are found early",
      "Report and photographs after every visit, for your records",
      "Waste transfer notes for everything removed, kept for two years",
      "Priority response and agreed rates for anything urgent between visits",
      "One point of contact and consolidated invoicing across all your sites",
    ],
    excludes: [
      "Repairs found during a visit, quoted separately and fixed price",
      "Tanker work beyond the agreed volume",
    ],
    steps: [
      { h: "We look at your portfolio", p: "Which sites, what type of property, what has gone wrong historically and how often. Kitchens in flats need a different cycle to office gullies." },
      { h: "A schedule and a price", p: "Per site and per year, so you can budget it. No call-out fees between visits and agreed rates for anything urgent." },
      { h: "We turn up when we said", p: "Tenants notified where needed. Jetting, cleaning and inspection carried out, and the site left clean." },
      { h: "You get the paperwork", p: "Report, photographs and waste transfer notes after each visit, so your compliance file is complete without you chasing it." },
    ],
    faqs: [
      {
        q: "Who carries the duty of care for waste we remove?",
        a: "You do, as the waste producer, which is why it matters who takes it. You are required to check that your carrier is registered with the Environment Agency, and to keep a transfer note for every load leaving the premises for two years. We are registered, our registration is checkable on the public register, and we issue a compliant transfer note every time and keep our copies for two years.",
      },
      {
        q: "How often should drains be jetted?",
        a: "It depends entirely on use. A commercial kitchen or a pub may need quarterly. Flats with shared kitchen runs are usually twice a year. Offices, schools and most residential blocks are fine annually. We would rather set a cycle based on what your drains actually do than sell you visits you do not need.",
      },
      {
        q: "Can you cover multiple sites on one contract?",
        a: "Yes, and that is most of what we do. One schedule, one contact, one invoice, whether that is four flats in Farnborough or forty units across three counties.",
      },
      {
        q: "What happens if something blocks between visits?",
        a: "You ring us and we come, at the agreed contract rate with no call-out fee, and you go to the front of the queue ahead of one-off work.",
      },
    ],
    related: ["blocked-drains", "cctv-drain-surveys", "waste-removal"],
  },

  {
    slug: "waste-removal",
    nav: "Waste removal",
    title: "Waste removal and site clearance",
    h1: "Registered waste removal and site clearance",
    from: "Transfer note for every load",
    icon: "waste",
    summary:
      "Garden, builders and site waste cleared, loaded and taken away by a registered carrier, with a proper transfer note every time.",
    lede:
      "Cheaper than a skip on most jobs because you are not paying for a permit or the days it sits on the road, and we load it. Registered with the Environment Agency, with the paperwork to prove it.",
    intro: [
      "The bit of waste removal that matters is not the van, it is the registration. If your waste is fly-tipped after it leaves your property, the liability comes back to you as the person who produced it, and the defence is that you checked your carrier was registered and kept the transfer note. A man with a van and no paperwork is a risk you are carrying, not a saving.",
      "We are registered with the Environment Agency, we issue a compliant waste transfer note for every load, and we keep our copies for the two years the law requires. And because we are a groundworks firm, we can take the hardcore, soil and rubble that most van clearance operators will not touch.",
    ],
    includes: [
      "Loaded by us, so you do not have to fill anything yourself",
      "No skip permit, no road licence and no skip sitting outside for a week",
      "Garden waste, builders waste, soil, rubble, hardcore and concrete",
      "House and garage clearance, and single bulky items",
      "Environment Agency registered carrier, checkable on the public register",
      "A compliant waste transfer note for every load, copies kept two years",
      "Recycled and sorted at a licensed transfer station wherever possible",
      "Area swept up before we leave",
    ],
    excludes: [
      "Asbestos and other hazardous waste, which needs a licensed specialist and which we will point you to",
      "Fridges, freezers and tyres, which have their own disposal routes and charges",
      "Clinical waste and chemicals",
    ],
    steps: [
      { h: "Send us a photo", p: "The quickest way to a price. Message a picture of the pile on WhatsApp and we will tell you what it costs to take away." },
      { h: "Fixed price", p: "By volume, agreed before we come. No call-out fee and nothing added on the day." },
      { h: "We load and clear", p: "You do not need to be there for the loading if you would rather not be." },
      { h: "Paperwork", p: "Waste transfer note issued to you on the day, with our registration details on it." },
    ],
    faqs: [
      {
        q: "Is this cheaper than hiring a skip?",
        a: "On most domestic jobs, yes. With a skip you pay for the skip, a council permit if it goes on the road, and you fill it yourself. With us you pay for the volume we actually take, we load it, and there is nothing left on your driveway or the street.",
      },
      {
        q: "How do I know my waste is disposed of legally?",
        a: "Ask for the carrier's Environment Agency registration and check it on the public register, which anyone can search free. Then keep the waste transfer note. If waste with your name on it is later fly-tipped, that note and that check are your defence. We give you both without being asked.",
      },
      {
        q: "Can you take soil, rubble and concrete?",
        a: "Yes. Heavy inert waste is a normal part of groundworks for us, and we have the vehicles for it. Most general clearance firms will not take it or charge heavily to.",
      },
      {
        q: "Do I need to be there?",
        a: "Not if the waste is accessible and you have told us what is going. We will send you a photo of the cleared area and the transfer note.",
      },
    ],
    related: ["groundworks", "maintenance-contracts", "driveways-patios"],
  },
];

/* --- How we quote --------------------------------------------------------
   The site publishes no prices, matching the original site. Every job is
   quoted, free, before any work starts. What follows is the process and
   the things that actually move a price, which is more use to a customer
   than a headline figure they cannot rely on.
   ------------------------------------------------------------------------ */
export const quoteSteps = [
  {
    h: "Tell us what you need",
    p: "On the phone, on WhatsApp with a photo, or through the form. For most drainage jobs a two minute conversation is enough for us to price it there and then.",
  },
  {
    h: "We look, if the job needs looking at",
    p: "Driveways, groundworks and anything underground get a site visit. It is free, at any hour, and there is no call-out fee whether you go ahead or not.",
  },
  {
    h: "You get it in writing, itemised",
    p: "What is included, what is not, and one figure with VAT already in it. Only about a third of homeowners in the UK ever get an itemised written quote. You will.",
  },
  {
    h: "The price does not move",
    p: "If we arrive and it turns out to be a different job, we stop, explain, and give you a new price to accept or refuse. What we never do is carry on and put it on the bill.",
  },
];

/* What genuinely changes a quote, by service. Useful, and honest about the
   fact that a headline price cannot cover any of it. */
export const priceFactors = [
  {
    id: "drainage",
    title: "Blocked drains and drainage",
    intro: "Most blockages are a straightforward, predictable job and we can price them on the phone. What moves the figure:",
    rows: [
      ["How much is affected", "One sink is a small job. Every fitting in the house backing up means the main run, which takes longer and needs different kit."],
      ["Where the blockage is", "A gully by the back door is quick. A run under a driveway with no access at one end is not."],
      ["What caused it", "Fat and wipes come out with rods or a jetter. Roots need an electro-mechanical cutter. Scale needs descaling."],
      ["Whether the pipe is sound", "If the camera shows a crack or a collapse behind the blockage, that is a separate repair and a separate quote, and you decide."],
      ["The time of day", "Nothing. Same price at 2am on a Sunday as at 2pm on a Tuesday, and no call-out fee either way."],
    ],
  },
  {
    id: "surveys",
    title: "CCTV surveys and reports",
    intro: "A survey is priced on the size of the system and what the report has to prove.",
    rows: [
      ["How many chambers", "A small terrace with two chambers is quicker than a detached house with six and a separate surface water system."],
      ["Whether the covers can be found", "A chamber that has been paved or turfed over has to be located and dug out before anything can go down it."],
      ["What the report is for", "A report written for a solicitor or an insurer takes longer than a look to find one blockage, because everything has to be located and coded."],
      ["Whether you need the run mapped", "Tracing the line and depth from the surface and marking it out is extra work, and it is what you need before anyone digs."],
      ["Remedial work", "If you book the repair with us on the same visit, the survey fee comes off it in full."],
    ],
  },
  {
    id: "repairs",
    title: "Repairs and lining",
    intro: "We never quote a repair without seeing it on camera first, because guessing is how people end up paying for the wrong thing.",
    rows: [
      ["Lining or digging", "A cracked pipe still holding its line can usually be patched or lined with no ground broken, for a fraction of an excavation. A collapsed one cannot."],
      ["The length affected", "One bad joint is a patch. A tired run end to end is a full length liner, priced by the metre."],
      ["Depth", "The deeper the pipe, the more excavation, shoring and time, and it rises quickly."],
      ["What is on top of it", "Turf is easy. Block paving can be lifted and relaid invisibly. A concrete drive or a conservatory floor is a different job entirely."],
      ["Reinstatement", "Included in the quote, always. Putting the surface back is part of the repair, not an extra afterwards."],
    ],
  },
  {
    id: "surfacing",
    title: "Driveways, patios and groundworks",
    intro: "Priced per square metre once we have measured up and seen the levels. Two quotes that look the same on paper are often very different jobs underneath, so ask about all of these.",
    rows: [
      ["The area", "Measured on site, not estimated from a satellite photo."],
      ["The surface", "Gravel, tarmac, block paving, permeable block paving, resin bound and porcelain all sit at different rates, and we will give you the honest cost and maintenance trade-off for each."],
      ["Excavation depth and the sub-base", "This is the part that decides whether it is still flat in ten years. We quote the build-up, so you can compare it against anyone else's price."],
      ["What is there now", "Breaking out old concrete costs more to remove than lifting turf, and it is heavy inert waste."],
      ["Levels and drainage", "A slope needing retaining, or a surface needing channel drainage or a soakaway, adds work. So does getting the falls away from the house right."],
      ["Access", "Whether a machine and a lorry can get to it, or whether it has to be barrowed through a side gate."],
    ],
  },
  {
    id: "waste",
    title: "Waste removal and maintenance",
    intro: "Send a photo of the pile on WhatsApp and we will normally price it the same day.",
    rows: [
      ["Volume", "Priced by what we actually take, not by the size of a skip you have to fill yourself."],
      ["What it is", "Garden and general waste is straightforward. Soil, rubble, hardcore and concrete are heavy inert waste, which most van clearance firms will not touch and we will."],
      ["Access", "Whether we can back up to it or have to carry it out."],
      ["Maintenance contracts", "Priced per site and per year on the type of property and what has gone wrong there historically. A pub kitchen needs a different cycle to an office gully."],
    ],
  },
];

export const priceIncluded = [
  "Coming out to look at the job and quote it, at any hour",
  "The price we quote, itemised and in writing before anything starts",
  "VAT, included in the figure we quote you and never added afterwards",
  "Chambers lifted and reinstated, and the area washed down",
  "A camera check and a written note of what caused the problem",
  "Waste taken away under our own registration, with a transfer note",
  "Reinstating paving, tarmac or turf where we have dug",
];

export const priceExtra = [
  "Excavating a buried chamber nobody can find, agreed with you first",
  "Additional chambers beyond the first two on a survey",
  "Utility company charges where their apparatus has to be moved",
  "Council application fees for a dropped kerb, paid direct to the council",
  "Building control and water company fees on new drainage",
];

/* --- Areas ---------------------------------------------------------------
   Only towns we can say something genuinely local about get a page.
   ------------------------------------------------------------------------ */
export const areas = [
  {
    slug: "farnborough",
    name: "Farnborough",
    county: "Hampshire",
    postcodes: ["GU14"],
    council: "Rushmoor Borough Council",
    highways: "Hampshire County Council",
    drive: "we are based here",
    intro:
      "This is home. We work out of Farnborough and most weeks we are on jobs within a couple of miles of the office, from the Victorian terraces off Alexandra Road to the post-war estates around Cove and Southwood and the newer builds at Farnborough Business Park.",
    local: [
      "Older property in Farnborough is mostly on clay drainage, and the joints in clay are where roots get in. On the streets around Highgate Lane and Prospect Avenue, root ingress is the single most common thing our camera finds.",
      "A lot of Cove and Southwood sits on London Clay, which is why so many soakaways in this area were undersized and now fail every wet autumn. It is also why we always dig a trial pit and test before sizing a new one here rather than working off a standard detail.",
      "Post-war estate properties around Farnborough often have shared drainage running across several gardens. That changes who pays: since the 2011 transfer a lot of those shared runs are now the water company's responsibility, not yours, and we would rather tell you that than invoice you for it.",
      "Rushmoor Borough Council handles planning, but the highway authority for dropped kerbs and vehicle crossings in Farnborough is Hampshire County Council. Two different applications, and people regularly start with the wrong one.",
    ],
    landmarks: ["Cove", "Southwood", "North Camp", "Farnborough Park", "Hawley", "Farnborough Business Park"],
  },
  {
    slug: "aldershot",
    name: "Aldershot",
    county: "Hampshire",
    postcodes: ["GU11", "GU12"],
    council: "Rushmoor Borough Council",
    highways: "Hampshire County Council",
    drive: "10 minutes",
    intro:
      "Ten minutes down the road, and a town with drainage as old as its garrison. We work across Aldershot, North Town, Cargate and out towards Ash and Tongham most weeks.",
    local: [
      "Aldershot's Victorian garrison housing has some of the oldest drainage we see, including pitch fibre runs put in as repairs in the 1960s and 70s. Pitch fibre deforms and collapses with age, and it cannot be lined once it has lost its shape. If your property is that era, a camera survey before you buy is money well spent.",
      "Much of central Aldershot has shared drainage between terraced properties. Working out where your responsibility ends and your neighbour's or the water company's begins is half the job, and we do that before quoting rather than after.",
      "The ground around Aldershot varies sharply from sand to clay within a short distance, which matters for soakaways and for driveway sub-bases. We test rather than assume.",
      "Hampshire County Council is the highway authority here, so dropped kerbs follow the Hampshire process: £211.90 for a standard application, or £308.90 for the two week fast track, and your contractor needs a Section 171 licence and £10m public liability cover before touching the footway.",
    ],
    landmarks: ["North Town", "Cargate", "Ash", "Tongham", "Aldershot Garrison"],
  },
  {
    slug: "farnham",
    name: "Farnham",
    county: "Surrey",
    postcodes: ["GU9", "GU10"],
    council: "Waverley Borough Council",
    highways: "Surrey County Council",
    drive: "15 minutes",
    intro:
      "Georgian town centre, conservation areas, listed buildings and a lot of properties on private drainage out in the villages. Farnham needs a careful approach and a knowledge of who you have to ask.",
    local: [
      "Farnham has extensive conservation areas and a large number of listed buildings, which changes what you can do at the front of a property. A new driveway or a dropped kerb at a listed building or in a conservation area needs planning permission regardless of the surface, so the order you do things in matters.",
      "Out towards Tilford, Frensham and the Bourne, plenty of properties are on septic tanks and treatment plants rather than mains drainage. Since the general binding rules changed, a tank discharging straight to a watercourse has to be replaced or upgraded, and that catches people out at the point of sale.",
      "Farnham's older stock includes a lot of brick-built inspection chambers, which are prone to failed benching and root ingress at the joints. They can usually be repaired rather than replaced.",
      "Surrey County Council is the highway authority, and Surrey only permits approved contractors to build a vehicle crossing. The county charges £80 for the initial assessment and a further £150 for the full application. We will tell you honestly at the first call whether we can do the crossing itself or only the driveway behind it.",
    ],
    landmarks: ["Wrecclesham", "Rowledge", "The Bourne", "Tilford", "Frensham", "Badshot Lea"],
  },
  {
    slug: "fleet",
    name: "Fleet",
    county: "Hampshire",
    postcodes: ["GU51", "GU52"],
    council: "Hart District Council",
    highways: "Hampshire County Council",
    drive: "15 minutes",
    intro:
      "Fleet, Church Crookham, Elvetham Heath and Crookham Village. A mix of 1930s stock, heavy 1970s and 80s estate building and newer development, and each era brings its own drainage problems.",
    local: [
      "Elvetham Heath and the newer Fleet estates are on modern plastic drainage, usually with private pumping stations and attenuation serving groups of houses. Those systems are fine until they are not maintained, and responsibility for them is often unclear to residents. Some transferred to the water company by October 2016, some did not.",
      "1970s and 80s Fleet estates commonly used pitch fibre for drainage. It is the material we most often find deformed on camera in this postcode, and it is the reason a survey before purchase is worth more here than in many areas.",
      "Fleet's ground holds water in places, which is why we see so many flooding driveways and waterlogged gardens around Church Crookham. Usually the answer is channel drainage and a properly sized soakaway rather than more gravel.",
      "Hart District Council handles planning. Dropped kerbs go to Hampshire County Council, on the same fees and timescales as Farnborough.",
    ],
    landmarks: ["Church Crookham", "Elvetham Heath", "Crookham Village", "Ancells Farm", "Zebon Copse"],
  },
  {
    slug: "camberley",
    name: "Camberley",
    county: "Surrey",
    postcodes: ["GU15", "GU16", "GU17"],
    council: "Surrey Heath Borough Council",
    highways: "Surrey County Council",
    drive: "15 minutes",
    intro:
      "Camberley, Frimley, Old Dean, Mytchett and Deepcut. A regular patch for us, and several of our Checkatrade reviews come from GU15 and GU16.",
    local: [
      "Camberley sits largely on Bagshot Sands, which percolates well. That is good news for soakaways, and it is why properly sized soakaway drainage works here where it fails a few miles west on the clay. It also means sandy sub-grades that need compacting properly under a driveway or the surface will rut.",
      "The older stock around Camberley town centre and Frimley has clay drainage with the usual root problems, and a lot of it runs under later extensions and conservatories. That is where locating the run before anyone digs saves the most money.",
      "Deepcut and the former military land around Mytchett include properties on private and shared drainage systems where the records are poor. Tracing and mapping the runs is often the first job.",
      "Surrey County Council is the highway authority. Vehicle crossings in Camberley have to be built by a Surrey approved contractor, and the county charges £80 then £150 for the two application stages.",
    ],
    landmarks: ["Frimley", "Frimley Green", "Old Dean", "Mytchett", "Deepcut", "Yorktown"],
  },
  {
    slug: "guildford",
    name: "Guildford",
    county: "Surrey",
    postcodes: ["GU1", "GU2", "GU3", "GU4"],
    council: "Guildford Borough Council",
    highways: "Surrey County Council",
    drive: "25 minutes",
    intro:
      "The far end of our patch and worth the drive. Guildford has some of the most demanding drainage in the county, because of the chalk, the hills and the age of the buildings.",
    local: [
      "Guildford's steep gradients cut both ways. Surface water moves fast, which means gullies and channel drains take a hammering and silt up quickly, and it also means falls on foul runs are sometimes too steep, so the water outruns the solids and the pipe blocks from the bottom.",
      "The chalk of the Hog's Back and the North Downs makes for good soakaway ground in places and very poor ground in others, sometimes on the same street. We dig a trial pit and test rather than assume.",
      "Central Guildford's older and listed buildings have brick chambers and clay runs, often shared, and often not where the plans say. Tracing first is not optional.",
      "Surrey County Council is the highway authority, so vehicle crossings need a Surrey approved contractor and the two-stage £80 plus £150 application.",
    ],
    landmarks: ["Burpham", "Merrow", "Onslow Village", "Stoughton", "Shalford", "Worplesdon"],
  },
  {
    slug: "alton",
    name: "Alton",
    county: "Hampshire",
    postcodes: ["GU34"],
    council: "East Hampshire District Council",
    highways: "Hampshire County Council",
    drive: "25 minutes",
    intro:
      "Alton and the villages around it, where a good proportion of properties are on private drainage and the nearest mains sewer is a field away.",
    local: [
      "Around Alton, septic tanks, cesspools and package treatment plants are common. Since the general binding rules were tightened, a tank discharging directly to a watercourse must be replaced or upgraded, and it is usually a conveyancing solicitor who discovers this three weeks before completion. If you are selling, find out early.",
      "Private drainage means private responsibility. None of it transferred to the water company in 2011, because the transfer only covered pipes connected to the public sewerage system. Soakaway drainage, cesspools and septic tank systems stayed entirely with the owner.",
      "Alton's chalk and clay mix makes soakaway performance unpredictable, and it is the main reason surface water drainage in the surrounding villages has to be designed rather than copied.",
      "East Hampshire District Council handles planning, and Hampshire County Council the highways side.",
    ],
    landmarks: ["Holybourne", "Beech", "Bentley", "Four Marks", "Medstead"],
  },
  {
    slug: "bracknell",
    name: "Bracknell",
    county: "Berkshire",
    postcodes: ["RG12", "RG40", "RG42"],
    council: "Bracknell Forest Council",
    highways: "Bracknell Forest Council",
    drive: "25 minutes",
    intro:
      "The Berkshire edge of our patch. Bracknell, Crowthorne, Sandhurst and Wokingham are all comfortably within reach, and the new town drainage there has its own character.",
    local: [
      "Bracknell was built out as a new town from the 1950s onwards, which means large areas of drainage installed at the same time to the same standard and now reaching the same age together. Concrete and clay runs of that era commonly show joint displacement and infiltration on camera.",
      "New town estate layouts frequently put drainage runs across gardens and under garages rather than neatly along boundaries. Locating the run before an extension or a driveway goes in matters more here than almost anywhere else on our patch.",
      "Bracknell Forest is a unitary authority, so it is both the planning authority and the highway authority. That makes the dropped kerb process different again from Hampshire's and Surrey's, and it is worth checking before you plan a driveway.",
      "Surface water in Bracknell often runs to attenuation and balancing ponds rather than straight to a sewer, so a new hard surface may need attenuation designing in rather than a simple soakaway.",
    ],
    landmarks: ["Crowthorne", "Sandhurst", "Wokingham", "Binfield", "Warfield", "Easthampstead"],
  },
  {
    slug: "woking",
    name: "Woking",
    county: "Surrey",
    postcodes: ["GU21", "GU22", "GU23"],
    council: "Woking Borough Council",
    highways: "Surrey County Council",
    drive: "30 minutes",
    intro:
      "Woking, Horsell, Knaphill, Byfleet and Pyrford. We take drainage, survey and repair work here, and groundworks where the job is worth the travel.",
    local: [
      "Large parts of Woking are low lying and close to the Basingstoke Canal and the Wey, which means high water tables in places. A high water table changes everything about a soakaway: if the ground is already saturated it will not take surface water, and the answer is attenuation or a connection rather than a bigger hole.",
      "Woking's Edwardian and inter-war stock around Horsell and Mount Hermon has clay drainage with brick chambers, frequently shared between properties, and frequently not where anyone thinks.",
      "Byfleet and Pyrford have areas with a history of surface water flooding, so drainage for a new driveway or extension there needs designing with that in mind rather than assuming a soakaway will cope.",
      "Surrey County Council is the highway authority, so vehicle crossings need a Surrey approved contractor and the two-stage application.",
    ],
    landmarks: ["Horsell", "Knaphill", "Byfleet", "West Byfleet", "Pyrford", "Goldsworth Park"],
  },
  {
    slug: "basingstoke",
    name: "Basingstoke",
    county: "Hampshire",
    postcodes: ["RG21", "RG22", "RG24"],
    council: "Basingstoke and Deane Borough Council",
    highways: "Hampshire County Council",
    drive: "30 minutes",
    intro:
      "The western end of our patch. Basingstoke's rapid expansion from the 1960s left it with drainage of very distinct vintages, street by street.",
    local: [
      "Basingstoke expanded enormously from the 1960s under the town development scheme, so the drainage age tells you almost exactly when an estate was built. Pitch fibre in the 60s and 70s estates, concrete and clay in the earlier work, modern plastic in anything after the late 80s.",
      "Pitch fibre is the material we most often condemn on camera. It blisters and deforms rather than cracking, it cannot be lined once it has lost its shape, and it is very common in this postcode.",
      "Basingstoke sits on chalk, which generally percolates well for soakaways, but chalk also brings the risk of solution features and swallow holes. That is a reason to test rather than assume when sizing surface water drainage.",
      "Basingstoke and Deane handles planning, Hampshire County Council the highways. The Hampshire dropped kerb process and fees apply.",
    ],
    landmarks: ["Chineham", "Brighton Hill", "Old Basing", "Oakley", "Popley"],
  },
];

/* --- Reviews -------------------------------------------------------------
   Verbatim from the Checkatrade profile, September 2026. Do not edit the
   quote text. Every review on the profile scored 10 out of 10.
   ------------------------------------------------------------------------ */
export const reviews = [
  {
    quote:
      "Answered and was able to arrive on the same day, job was done quickly and efficiently, all round good experience. Recommended.",
    where: "GU14, Farnborough",
    date: "31 May 2024",
    job: "Unblocking an external drain",
    score: "10/10",
  },
  {
    quote:
      "Excellent service. Contacted quickly after job posted. Arrived at time expected. Work carried out at price quoted. Would use again in future if had the need.",
    where: "GU14, Farnborough",
    date: "10 May 2024",
    job: "Lowering a manhole cover in a garden",
    score: "10/10",
  },
  {
    quote:
      "Steve was very friendly and professional and left no mess. I wouldnt hesitate to call him again or to recommend him to anyone who needs a drain unblocking!",
    where: "GU47, Sandhurst",
    date: "30 March 2024",
    job: "Unblocking a drain",
    score: "10/10",
  },
  {
    quote:
      "Called on Saturday morning with a blocked drain. Steve was round early afternoon on the same day and cleared it without any problems or mess.",
    where: "GU15, Camberley",
    date: "26 August 2023",
    job: "Clearing a blocked drain",
    score: "10/10",
  },
  {
    quote:
      "Steve is very knowledgeable about drainage/water/sewage systems and we would certainly use his services again if the need arose.",
    where: "GU52, Fleet",
    date: "7 June 2023",
    job: "Clearing debris from a drain and replacing the cover",
    score: "10/10",
  },
  {
    quote:
      "Brilliant service sorting our blocked drains. Came out the same day, friendly and polite and very reasonably priced (much cheaper than a big national company we used previously).",
    where: "Farnborough",
    date: "Google review",
    job: "Blocked drains",
    score: "5/5",
    source: "Google",
  },
];

/* --- Projects ------------------------------------------------------------
   These are the seven real jobs listed on farnboroughcontracting.co.uk,
   with that site's own descriptions. Four are council contracts, which is
   the strongest credibility signal the business has and was not being used
   anywhere on the old .com site.

   Photographs exist on the .co.uk site at
   /img/recent-projects/<slug>/img/<slug>-NN.jpg but could not be copied
   across automatically. Add image_url to a row in Supabase, or drop files
   into assets/img/work/ and set image_url to /assets/img/work/<file>.
   ------------------------------------------------------------------------ */
export const projects = [
  {
    title: "Tarmac overlay on a St Georges Hill property",
    category: "Driveways",
    location: "Weybridge, Surrey",
    duration: "Private client",
    detail: "Tarmac overlay project on a property at St Georges Hill, one of the larger private estates in Surrey.",
  },
  {
    title: "Tarmac overlay works at St Johns Lye",
    category: "Driveways",
    location: "Woking, Surrey",
    duration: "Council contract",
    detail: "Tarmac overlay works carried out at St Johns Lye under contract to the local council in Woking.",
  },
  {
    title: "Manhole renewal for a homeowner",
    category: "Drainage",
    location: "Yateley, Hampshire",
    duration: "Domestic",
    detail: "Existing manhole taken out and renewed for a private homeowner in Yateley.",
  },
  {
    title: "Drainage and tarmac work for the council",
    category: "Drainage",
    location: "Woking, Surrey",
    duration: "Council contract",
    detail: "Combined drainage and tarmac work carried out for the local council in Woking.",
  },
  {
    title: "Tarmac work for the council",
    category: "Driveways",
    location: "Woking, Surrey",
    duration: "Council contract",
    detail: "Tarmac surfacing carried out under contract to the local council in Woking.",
  },
  {
    title: "Knee high fencing at Knaphill",
    category: "Groundworks",
    location: "Knaphill, Woking",
    duration: "Council contract",
    detail: "Knee high timber fencing installed along a roadside verge at Knaphill for the local council in Woking.",
  },
  {
    title: "Pedestrian railings installed",
    category: "Groundworks",
    location: "Farnborough, Hampshire",
    duration: "Install",
    detail: "Galvanised pedestrian guard railings supplied and installed on a footway in Farnborough.",
  },
];

/* --- Guides --------------------------------------------------------------
   Authority content. Substance drawn from GOV.UK, Citizens Advice,
   Hampshire County Council, Surrey County Council and the Environment
   Agency. Sources are listed on each page.
   ------------------------------------------------------------------------ */
export const guides = [
  {
    slug: "who-is-responsible-for-a-blocked-drain",
    nav: "Who pays for a blocked drain?",
    title: "Who is responsible for a blocked drain?",
    h1: "Is that blocked drain yours, your neighbours' or the water company's?",
    summary:
      "Half the drains we are called to are not the householder's responsibility at all. Here is how to work out whose it is before you pay anyone, including us.",
    updated: "September 2026",
    readMins: 7,
    sources: [
      { t: "Citizens Advice: who is responsible for repairing drains and sewers", u: "https://www.citizensadvice.org.uk/consumer/water/sewerage/who-is-responsible-for-repairing-drains-and-sewers/" },
      { t: "The Water Industry (Schemes for Adoption of Private Sewers) Regulations 2011", u: "https://www.legislation.gov.uk/ukdsi/2011/9780111510933" },
    ],
    faqs: [
      { q: "Who is responsible for a blocked drain in the UK?", a: "You are responsible for the drains inside your property boundary that serve only your property. Your water company is responsible for the lateral drain, which runs from your boundary to the public sewer, and for the public sewer itself. Water companies clear blockages in their own pipes free of charge." },
      { q: "Do water companies clear blocked drains for free?", a: "Yes, where the blockage is in a lateral drain or a public sewer, which they own and maintain. They will not clear a blockage inside your boundary that serves only your property." },
      { q: "What changed in 2011?", a: "On 1 October 2011 private sewers and lateral drains that were connected to the public sewerage system transferred to the water and sewerage companies, regardless of their condition. Pipes within a property's boundary serving only that property did not transfer, and neither did septic tanks, cesspools or soakaway drainage." },
      { q: "Who pays if a drain is shared with neighbours?", a: "If it is a private shared drain that did not transfer, all the owners it serves are jointly responsible for the cost of maintaining it. Many shared runs did transfer in 2011, so check with your water company before agreeing to split a bill." },
    ],
  },
  {
    slug: "dropped-kerbs-hampshire-surrey",
    nav: "Dropped kerbs explained",
    title: "Dropped kerbs in Hampshire and Surrey",
    h1: "Dropped kerbs in Hampshire and Surrey: the two processes, the real fees and the licence to ask for",
    summary:
      "Hampshire lets you choose your contractor but insists on a licence and £10m of cover. Surrey will only allow its own approved contractors. Getting this wrong costs a non-refundable fee.",
    updated: "September 2026",
    readMins: 8,
    sources: [
      { t: "Hampshire County Council: dropped kerbs and vehicular access", u: "https://www.hants.gov.uk/transport/parking/droppedkerbs" },
      { t: "Hampshire County Council: dropped kerb specifications", u: "https://www.hants.gov.uk/transport/parking/droppedkerbs/specifications" },
      { t: "Surrey County Council: vehicle crossovers and dropped kerbs", u: "https://www.surreycc.gov.uk/roads-and-transport/permits-and-licences/vehicle-crossovers-or-dropped-kerbs" },
    ],
    faqs: [
      { q: "How much does a dropped kerb cost in Hampshire?", a: "Hampshire County Council charges £211.90 for a standard application, non-refundable, with a response within eight weeks. The Fast Track option adds £97, so £308.90 in total, and is guaranteed within two weeks. Construction is separate and depends on the width and the site." },
      { q: "How much does a dropped kerb cost in Surrey?", a: "Surrey County Council charges £80 for the stage one initial assessment and a further £150 for the stage two full application, £230 in total, both non-refundable. Surrey puts average construction cost at around £1,500, varying with size, gradient, utilities and traffic control." },
      { q: "Can I use my own contractor for a dropped kerb?", a: "In Hampshire, yes, but they must hold £10 million public liability insurance and a Section 171 road opening licence. Hampshire warns that a contractor proceeding without that licence would be working illegally. In Surrey you must use one of the council's approved contractors." },
      { q: "Do I need planning permission for a dropped kerb?", a: "It is required where the access is onto a classified A, B or C road, for listed buildings and conservation areas, and for flats, maisonettes and multi-occupancy dwellings. Surrey also requires it where you propose a non-porous parking surface. Planning has to be in place before the crossing is approved." },
    ],
  },
  {
    slug: "homebuyer-drain-surveys",
    nav: "Homebuyer drain surveys",
    title: "Homebuyer drain surveys",
    h1: "Nobody looks at the drains when you buy a house. That is the point of a drain survey.",
    summary:
      "A valuation does not look at drainage and a homebuyer survey barely does. On an older property a drain survey is the cheapest way to find a five figure problem before you exchange.",
    updated: "September 2026",
    readMins: 7,
    sources: [
      { t: "Citizens Advice: who is responsible for repairing drains and sewers", u: "https://www.citizensadvice.org.uk/consumer/water/sewerage/who-is-responsible-for-repairing-drains-and-sewers/" },
      { t: "Planning Portal: Approved Document H, drainage and waste disposal", u: "https://www.planningportal.co.uk/applications/building-control-applications/building-control/approved-documents/part-h-drainage-and-waste-disposal/approved-document-h/" },
    ],
    faqs: [
      { q: "Is a drain survey worth it when buying a house?", a: "On any property built before about 1990, or with an extension, a conservatory or a driveway over the drain run, yes. A valuation does not inspect drainage at all and a level 2 homebuyer survey will normally only lift a cover and note it exists. Drain repairs run from a few hundred pounds to five figures, so the survey is a small fraction of the risk it covers." },
      { q: "How much does a homebuyer drain survey cost?", a: "Ring us and we will price it for the property, because it depends on how many chambers there are and whether there is a separate surface water system. Whatever the figure, it always includes the video file, the still images and a written report with every defect located and coded, and we tell you before we start rather than after." },
      { q: "Who pays for a drain survey, the buyer or the seller?", a: "Normally the buyer, as part of their own due diligence, because the buyer is the one carrying the risk. A seller who suspects a problem sometimes commissions one first to avoid a renegotiation late in the process." },
      { q: "What if the survey finds a problem?", a: "You have dated evidence with the defect located and coded, which is what you need either to renegotiate the price, to ask the seller to fix it before completion, or to walk away. It is also what an insurer wants if the damage turns out to be covered." },
    ],
  },
  {
    slug: "permeable-driveways-planning",
    nav: "Driveways and planning",
    title: "Driveways, permeable surfaces and planning permission",
    h1: "Why a permeable driveway needs no planning application, at any size",
    summary:
      "Since October 2008 a traditional impermeable front driveway over five square metres needs permission. A permeable one does not, whatever its size. That is worth knowing before you choose a surface.",
    updated: "September 2026",
    readMins: 6,
    sources: [
      { t: "GOV.UK: guidance on the permeable surfacing of front gardens", u: "https://www.gov.uk/government/publications/permeable-surfacing-of-front-gardens-guidance/guidance-on-the-permeable-surfacing-of-front-gardens" },
      { t: "Planning Portal: Approved Document H, drainage and waste disposal", u: "https://www.planningportal.co.uk/applications/building-control-applications/building-control/approved-documents/part-h-drainage-and-waste-disposal/approved-document-h/" },
    ],
    faqs: [
      { q: "Do I need planning permission for a driveway?", a: "Not if the surface is permeable, such as gravel, permeable block paving or porous asphalt, or if the rainwater is directed to a lawn, border or soakaway within your own boundary. Size is irrelevant in that case. You do need permission for a traditional impermeable surface over five square metres at the front of a house where water runs off onto the road." },
      { q: "What counts as a permeable surface?", a: "Government guidance names gravel, permeable concrete block paving and porous asphalt. Directing the rainwater to a permeable area such as a lawn, a border or a soakaway also satisfies the rules, even where the surface itself is not permeable." },
      { q: "Does permeable paving work on clay?", a: "It needs help. On clay the water cannot soak away quickly, so a permeable surface has to drain to a properly sized soakaway, an attenuation crate or, as a last resort, a connection to a drain. Government guidance specifically notes that clay soils may need connection to roof water drainage." },
      { q: "Is permeable paving more expensive?", a: "The blocks and the open-graded sub-base do cost more per square metre than standard block paving. Against that you avoid a planning application and its fee entirely, at any size, you avoid the puddle and the sheet of ice at the low point, and you are not sending your surface water onto the highway. We will price both on your job so you can see the difference." },
    ],
  },
  {
    slug: "building-over-a-sewer",
    nav: "Building over a sewer",
    title: "Building over or near a sewer",
    h1: "The drain under your extension: what a build-over agreement is and when you need one",
    summary:
      "Building over or within three metres of a public sewer normally needs the water company's agreement. Finding that out after the footings are dug is one of the most expensive mistakes in domestic building.",
    updated: "September 2026",
    readMins: 6,
    sources: [
      { t: "Planning Portal: Approved Document H, drainage and waste disposal", u: "https://www.planningportal.co.uk/applications/building-control-applications/building-control/approved-documents/part-h-drainage-and-waste-disposal/approved-document-h/" },
      { t: "Approved Document H (2015 edition)", u: "https://assets.publishing.service.gov.uk/media/5a80cf9ded915d74e33fc8ae/BR_PDF_AD_H_2015.pdf" },
      { t: "The Water Industry (Schemes for Adoption of Private Sewers) Regulations 2011", u: "https://www.legislation.gov.uk/ukdsi/2011/9780111510933" },
    ],
    faqs: [
      { q: "Do I need permission to build over a drain?", a: "If the pipe is a public sewer or a lateral drain, which since 2011 includes many runs that used to be private, you normally need a build-over or build-near agreement from your water company before you start. Part H of the Building Regulations covers building over existing sewers, including maintaining access and protecting the pipe from settlement." },
      { q: "How do I find out if there is a sewer under my garden?", a: "Ask your water company for a sewer map, which they are required to make available. Maps are incomplete for pipes that transferred in 2011, because owners were never given plans, so the reliable method is a CCTV survey with a sonde traced from the surface. That gives you the line and the depth." },
      { q: "What happens if I build over a sewer without an agreement?", a: "The water company can require the work to be altered or removed, it can create problems on sale because a solicitor will raise it, and it can invalidate parts of a building control sign-off. It is far cheaper to locate the pipe and apply before the footings are set out." },
      { q: "Can an extension be built over a drain at all?", a: "Usually yes, with the right design. Options include diverting the run outside the footprint, bridging the pipe with a lintel so the load does not bear on it, or rebuilding a chamber with access maintained. What is not acceptable is burying an inspection chamber under a floor with no access to it." },
    ],
  },
];

/* --- Navigation ---------------------------------------------------------- */
export const nav = [
  { label: "Drainage", href: "/services/", sub: [
    { label: "Blocked drains", href: "/services/blocked-drains/" },
    { label: "CCTV drain surveys", href: "/services/cctv-drain-surveys/" },
    { label: "Drain repairs & lining", href: "/services/drain-repairs/" },
    { label: "New drainage & soakaways", href: "/services/drainage-installation/" },
    { label: "Maintenance contracts", href: "/services/maintenance-contracts/" },
  ]},
  { label: "Groundworks", href: "/services/groundworks/", sub: [
    { label: "Groundworks & bases", href: "/services/groundworks/" },
    { label: "Driveways & patios", href: "/services/driveways-patios/" },
    { label: "Dropped kerbs", href: "/services/dropped-kerbs/" },
    { label: "Waste removal", href: "/services/waste-removal/" },
  ]},
  { label: "How we quote", href: "/prices/" },
  { label: "Our work", href: "/projects/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Areas", href: "/areas/" },
  { label: "Guides", href: "/guides/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

/* --- Supabase ------------------------------------------------------------
   Publishable (anon) key. Safe client side: RLS allows insert only on
   enquiries and read only on published testimonials and projects.
   Same project as Tony's other sites, tables prefixed fcs_.
   ------------------------------------------------------------------------ */
export const supabase = {
  url: "https://acdpgarasgfhvupzsbxf.supabase.co",
  anonKey: "sb_publishable_OWTVpDyadL1lITnCp4gfAQ_EZxVHldY",
};

/* --- SEO titles and descriptions ----------------------------------------
   Kept here rather than generated, so every one can be checked against
   the practical limits: about 60 characters of title and 155 of
   description before Google truncates them in results.
   ------------------------------------------------------------------------ */
export const seo = {
  "/": {
    t: "Blocked Drains & Groundworks, Farnborough | FCS",
    d: "Blocked drains, CCTV surveys, driveways and groundworks. Farnborough based, answered 24 hours, no call-out fee, free quotes. 363 reviews, all 10/10.",
  },
  "/services/": {
    t: "Drainage & Groundworks Services | FCS Farnborough",
    d: "Nine drainage and groundworks services, and what is included in each. Blocked drains, CCTV surveys, repairs, driveways, dropped kerbs and waste removal.",
  },
  "/prices/": {
    t: "How We Quote | Free Fixed Quotes | FCS Farnborough",
    d: "Free quotes at any hour, no call-out fee, itemised in writing with VAT included, and the price does not move. What actually changes the cost of a job.",
  },
  "/projects/": {
    t: "Recent Work: Drains, Driveways & Groundworks | FCS",
    d: "Real jobs across Hampshire, Surrey and Berkshire, with what the camera or the dig found, what we did about it and how long it took.",
  },
  "/reviews/": {
    t: "363 Reviews, Every One 10 out of 10 | FCS Farnborough",
    d: "363 reviews on Checkatrade and every single one scored 10 out of 10. Read them word for word, with the postcode and the date, then check the source.",
  },
  "/areas/": {
    t: "Areas We Cover: Hampshire, Surrey & Berkshire | FCS",
    d: "Drainage and groundworks across Farnborough, Aldershot, Fleet, Farnham, Camberley, Guildford, Alton, Bracknell, Woking and Basingstoke.",
  },
  "/guides/": {
    t: "Drainage & Groundworks Guides | FCS Farnborough",
    d: "Straight answers on who pays for a blocked drain, dropped kerbs, homebuyer drain surveys, driveway planning rules and building over a sewer.",
  },
  "/about/": {
    t: "About Us: A Family Firm in Farnborough | FCS",
    d: "Family run drainage and groundworks in Farnborough. Published prices, no deposits, camera evidence on every job, and no call centre in the middle.",
  },
  "/contact/": {
    t: "Contact Us | 01252 650804, Answered 24 Hours | FCS",
    d: "Ring 01252 650804 and a person answers, whatever time it is. WhatsApp a photo for a quick price. No call-out fee at any hour.",
  },
  "/quote/": {
    t: "Get a Fixed Price | FCS Farnborough",
    d: "Tell us what you need and we come back with a fixed price, usually within the hour. No call-out fee, no obligation, and no chasing afterwards.",
  },
  "/privacy/": {
    t: "Privacy | FCS Farnborough",
    d: "What we do with the details you send us. Short, because we do very little with them, and there is no tracking on this site.",
  },
  "/404.html": {
    t: "Page Not Found | FCS Farnborough",
    d: "That page is not here. Everything we do is listed below, or ring 01252 650804 and we will point you at it.",
  },

  "/services/blocked-drains/": {
    t: "Blocked Drain Cleared Today | Farnborough & Hampshire",
    d: "Sinks, toilets, gullies and main runs cleared, usually within the hour. Fixed price agreed before we start, no call-out fee, and a camera check after.",
  },
  "/services/cctv-drain-surveys/": {
    t: "CCTV Drain Surveys, Report Included | Farnborough",
    d: "You keep the video, the still images and a written report with every defect located and coded. Survey fee credited in full against any repair you book.",
  },
  "/services/drain-repairs/": {
    t: "Drain Repairs & Lining | Farnborough & Hampshire",
    d: "Cracked, displaced and root-damaged pipes lined from the inside where we can, excavated where we must. Reinstatement included in the price.",
  },
  "/services/drainage-installation/": {
    t: "New Drainage & Soakaways, Laid to Part H | FCS",
    d: "Foul and surface water runs, soakaways sized on a real percolation test, land drainage and connections. Tested and filmed before we backfill.",
  },
  "/services/driveways-patios/": {
    t: "Driveways & Patios, Built to Last | Farnborough",
    d: "Excavated to depth, compacted sub-base, edges haunched in concrete. Block paving, permeable, tarmac, resin and gravel. No deposit, free quotes.",
  },
  "/services/groundworks/": {
    t: "Groundworks, Bases & Site Prep | Farnborough",
    d: "Footings, concrete bases, retaining walls and site clearance for extensions and garden rooms. We find the drain before we dig, not after.",
  },
  "/services/dropped-kerbs/": {
    t: "Dropped Kerbs in Hampshire & Surrey | FCS",
    d: "Two counties, two processes. We hold the £10m cover and the Section 171 licence Hampshire requires, and we tell you the real fees up front.",
  },
  "/services/maintenance-contracts/": {
    t: "Drainage Maintenance Contracts | Hampshire & Surrey",
    d: "Planned jetting, gully and grease trap cleaning and CCTV for landlords, agents, pubs and care homes. One schedule, one contact, one invoice.",
  },
  "/services/waste-removal/": {
    t: "Registered Waste Removal & Clearance | Farnborough",
    d: "Loaded by us, cheaper than a skip on most jobs, and taken by an Environment Agency registered carrier with a proper transfer note every time.",
  },

  "/guides/who-is-responsible-for-a-blocked-drain/": {
    t: "Who Pays for a Blocked Drain? | FCS Farnborough",
    d: "Half the drains we are called to are the water company's, not yours, and they clear those free. How to work out which you have before paying anyone.",
  },
  "/guides/dropped-kerbs-hampshire-surrey/": {
    t: "Dropped Kerbs in Hampshire & Surrey Explained | FCS",
    d: "Hampshire lets you pick your contractor but demands a Section 171 licence. Surrey allows only approved contractors. The real fees and timescales.",
  },
  "/guides/homebuyer-drain-surveys/": {
    t: "Homebuyer Drain Surveys: Are They Worth It? | FCS",
    d: "A valuation ignores the drains and a homebuyer survey barely looks. On an older house a drain survey can find a five figure problem before you exchange.",
  },
  "/guides/permeable-driveways-planning/": {
    t: "Driveways & Planning Permission: the 5m² Rule | FCS",
    d: "A permeable driveway needs no planning application at any size. An impermeable one over five square metres draining to the road does. Why that matters.",
  },
  "/guides/building-over-a-sewer/": {
    t: "Building Over a Sewer: Build-Over Agreements | FCS",
    d: "Building over or within three metres of a public sewer normally needs your water company's agreement. Finding out after the footings is expensive.",
  },
};

export const areaSeo = (a) => ({
  t: `Drainage & Groundworks in ${a.name}, ${a.county} | FCS`,
  d: `Blocked drains, CCTV surveys, repairs, driveways and groundworks in ${a.name} (${a.postcodes[0]}). Farnborough based. 24 hours, no call-out fee.`,
});
