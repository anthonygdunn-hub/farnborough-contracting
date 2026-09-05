/* ==========================================================================
   Farnborough Contracting Services — site behaviour
   No framework. Everything degrades to working HTML if this file fails.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.FCS_SUPABASE || {};

  /* --- Footer year ------------------------------------------------------ */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* --- Mobile nav ------------------------------------------------------- */
  var toggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (toggle && mainNav) {
    toggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close the menu" : "Open the menu");
    });
    mainNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        mainNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* --- Supabase client (lazy, optional) --------------------------------- */
  var _client = null;
  function client() {
    if (_client) return _client;
    if (!window.supabase || !cfg.url || !cfg.anonKey) return null;
    try {
      _client = window.supabase.createClient(cfg.url, cfg.anonKey);
    } catch (err) {
      return null;
    }
    return _client;
  }

  /* --- Enquiry forms ---------------------------------------------------- */
  function showMsg(box, kind, html) {
    if (!box) return;
    box.className = "form-msg show " + kind;
    box.innerHTML = html;
  }

  function validate(form) {
    var ok = true;
    var firstBad = null;
    form.querySelectorAll("[required]").forEach(function (el) {
      var bad = false;
      if (el.type === "radio") {
        bad = !form.querySelector('input[name="' + el.name + '"]:checked');
      } else {
        bad = !el.value.trim();
      }
      if (bad) {
        ok = false;
        el.setAttribute("aria-invalid", "true");
        if (!firstBad) firstBad = el;
      } else {
        el.removeAttribute("aria-invalid");
      }
    });
    if (firstBad && firstBad.focus) firstBad.focus();
    return ok;
  }

  function wireForm(form) {
    var box = document.getElementById(form.id + "-msg-box");
    var btn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validate(form)) {
        showMsg(
          box,
          "err",
          "Please fill in what you need, your postcode and a phone number so we can get back to you."
        );
        return;
      }

      var fd = new FormData(form);
      var payload = {
        service: fd.get("service") || null,
        postcode: (fd.get("postcode") || "").toString().trim().toUpperCase() || null,
        phone: (fd.get("phone") || "").toString().trim() || null,
        urgency: fd.get("urgency") || null,
        name: (fd.get("name") || "").toString().trim() || null,
        email: (fd.get("email") || "").toString().trim() || null,
        message: (fd.get("message") || "").toString().trim() || null,
        page: location.pathname,
        source: form.id,
      };

      var originalLabel = btn ? btn.textContent : "";
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending…";
      }

      function done(okMsg) {
        showMsg(box, "ok", okMsg);
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalLabel;
        }
        if (box && box.scrollIntoView) box.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }

      function failed() {
        showMsg(
          box,
          "err",
          'Sorry, that did not send. Please ring us on <a href="tel:+441252650804">01252 650804</a> ' +
            'or email <a href="mailto:info@farnboroughcontracting.co.uk">info@farnboroughcontracting.co.uk</a> ' +
            "and we will pick it up straight away."
        );
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalLabel;
        }
      }

      var sb = client();
      if (!sb) {
        // Supabase script blocked or not loaded: fall back to a mailto so the
        // enquiry is never simply lost.
        var body = Object.keys(payload)
          .filter(function (k) {
            return payload[k];
          })
          .map(function (k) {
            return k + ": " + payload[k];
          })
          .join("\n");
        window.location.href =
          "mailto:info@farnboroughcontracting.co.uk?subject=" +
          encodeURIComponent("Website enquiry: " + (payload.service || "general")) +
          "&body=" +
          encodeURIComponent(body);
        done("Opening your email app so you can send this to us directly.");
        return;
      }

      sb.from("fcs_enquiries")
        .insert([payload])
        .then(function (res) {
          if (res.error) {
            failed();
            return;
          }
          done(
            "<strong>Thanks, we have got that.</strong> We will ring you on " +
              (payload.phone ? payload.phone.replace(/[<>&]/g, "") : "the number you gave") +
              ", usually within the hour. If it is urgent, ring us on " +
              '<a href="tel:+441252650804">01252 650804</a> and we will get moving now.'
          );
        })
        .catch(failed);
    });
  }

  // bound in bindPage()

  /* --- Is it my drain? tool -------------------------------------------- */
  var TOOL = {
    start: {
      q: "Where is the water standing or backing up?",
      opts: [
        { t: "One sink, bath, shower or toilet inside the house", go: "inside" },
        { t: "Several fittings inside the house at once", go: "several" },
        { t: "An outside gully, manhole or drain in my garden or drive", go: "outside" },
        { t: "The chamber at my boundary, or one in the pavement or road", go: "boundary" },
      ],
    },
    inside: {
      r: "yours",
      h: "This one is almost certainly yours, and it is a straightforward job",
      p: "When a single fitting is affected and everything else drains normally, the blockage is in that fitting's own pipework inside your property. That is our work, and it is the cheapest thing we do.",
      price: "Fixed price agreed before we start, and no call-out fee.",
      cta: "call",
    },
    several: {
      q: "Are any of your neighbours having the same problem at the same time?",
      opts: [
        { t: "Yes, or I think so", go: "shared" },
        { t: "No, just us", go: "yours-main" },
        { t: "I do not know", go: "checkfirst" },
      ],
    },
    outside: {
      q: "Lift the covers, working from the house outwards. Which chamber is the last empty one?",
      opts: [
        { t: "The chambers near the house are full", go: "yours-main" },
        { t: "The chambers near the house are empty, the one nearer the boundary is full", go: "boundary" },
        { t: "I cannot find or lift the covers", go: "checkfirst" },
      ],
    },
    boundary: {
      r: "theirs",
      h: "Ring your water company before you ring us. This is very likely theirs, and free",
      p: "A surcharged chamber at your boundary, in the pavement or in the road points to the lateral drain or the public sewer. Since October 2011 both belong to your water and sewerage company, and they clear blockages in their own pipes at no charge to you. Ring them first. If they attend and tell you the problem is in your own pipework, ring us and we will pick it up.",
      price: "Free of charge from your water company.",
      cta: "guide",
    },
    shared: {
      r: "maybe",
      h: "Probably a shared run, and there is a good chance it is not yours to pay for",
      p: "Several properties affected at once points to a shared run or the public sewer. A great many shared drains transferred to the water companies in October 2011, regardless of what condition they were in, so before you agree to split a bill with neighbours, ring your water company and ask whether that run transferred. It is a short call and it can turn a shared bill into a free visit.",
      price: "Often free. Check with your water company before splitting a bill.",
      cta: "guide",
    },
    "yours-main": {
      r: "yours",
      h: "This looks like your main run, inside your boundary",
      p: "Everything backing up at once, with the chambers near the house full and no neighbours affected, points to a blockage in your own main run between the house and the boundary. That is ours to clear, and worth a camera afterwards to find out what caused it.",
      price: "Fixed price agreed before we start, with a camera check after.",
      cta: "call",
    },
    checkfirst: {
      r: "maybe",
      h: "We will find out for you, and it costs nothing to ask",
      p: "Not knowing is completely normal, and it is not something you should have to work out on your own. Ring us and describe what you can see. We can usually tell from the phone call whose pipe it is, and if it turns out to be your water company's we will tell you to ring them instead of us. There is no charge for that conversation and no call-out fee if we come and look.",
      price: "No call-out fee and no charge for the conversation, at any hour.",
      cta: "call",
    },
  };

  function renderTool(key, host) {
    var node = TOOL[key];
    if (!node) return;
    var total = 3;

    if (node.q) {
      host.innerHTML =
        '<p class="tool-progress">Question ' +
        (key === "start" ? 1 : 2) +
        " of up to " +
        total +
        "</p>" +
        '<p class="tool-q">' +
        node.q +
        "</p>" +
        '<div class="tool-opts">' +
        node.opts
          .map(function (o) {
            return '<button type="button" data-go="' + o.go + '">' + o.t + "</button>";
          })
          .join("") +
        "</div>";
      host.querySelectorAll("button[data-go]").forEach(function (b) {
        b.addEventListener("click", function () {
          renderTool(b.getAttribute("data-go"), host);
        });
      });
      return;
    }

    var tone = node.r === "yours" ? "is-good" : node.r === "theirs" ? "is-info" : "";
    var cta =
      node.cta === "guide"
        ? '<a class="btn btn-ghost btn-wide" href="/guides/who-is-responsible-for-a-blocked-drain/">Read how the rules work</a>' +
          '<a class="btn btn-call btn-wide" style="margin-top:.6rem" href="tel:+441252650804">Or ring us anyway: 01252 650804</a>'
        : '<a class="btn btn-call btn-wide btn-lg" href="tel:+441252650804">Call 01252 650804</a>' +
          '<a class="btn btn-ghost btn-wide" style="margin-top:.6rem" href="/quote/">Get a fixed price online</a>';

    host.innerHTML =
      '<div class="tool-result">' +
      '<div class="callout ' +
      tone +
      '" style="margin-top:0">' +
      "<h3>" +
      node.h +
      "</h3>" +
      "<p>" +
      node.p +
      "</p>" +
      '<p style="margin-bottom:0"><strong>' +
      node.price +
      "</strong></p>" +
      "</div>" +
      cta +
      '<div class="tool-reset"><button type="button" class="btn btn-ghost btn-sm" id="toolReset">Start again</button></div>' +
      "</div>";

    var reset = document.getElementById("toolReset");
    if (reset) reset.addEventListener("click", function () { renderTool("start", host); });
  }

  // bound in bindPage()

  /* --- Project filters -------------------------------------------------- */
  function bindFilters() {
    var filters = document.getElementById("projFilters");
    var grid = document.getElementById("projGrid");
    if (!(filters && grid)) return;
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-filter]");
      if (!b) return;
      var f = b.getAttribute("data-filter");
      filters.querySelectorAll("button[data-filter]").forEach(function (x) {
        x.setAttribute("aria-pressed", String(x === b));
      });
      grid.querySelectorAll(".proj").forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-cat") === f;
        card.hidden = !show;
      });
    });
  }

  /* --- Projects and testimonials from Supabase -------------------------
     The page already contains fallback content rendered at build time, so
     this only replaces it if the database returns rows. That keeps the
     Largest Contentful Paint fast and the page useful with JS disabled.
     -------------------------------------------------------------------- */
  function loadProjects() {
    var host = document.getElementById("projGrid");
    if (!host) return;
    var sb = client();
    if (!sb) return;
    var limit = parseInt(host.getAttribute("data-limit") || "60", 10);

    sb.from("fcs_projects")
      .select("title,category,location,duration,detail,image_url")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .limit(limit)
      .then(function (res) {
        if (res.error || !res.data || !res.data.length) return;
        host.innerHTML = res.data
          .map(function (p) {
            var hasImg = !!p.image_url;
            var media = hasImg
              ? '<div class="proj-media"><span class="proj-tag">' + (p.category || "") + '</span>' +
                '<img src="' + p.image_url + '" alt="' + (p.title || "").replace(/"/g, "&quot;") + '" loading="lazy" width="800" height="600"></div>'
              : "";
            return (
              '<article class="proj' + (hasImg ? "" : " proj-text") + '" data-cat="' + (p.category || "") + '">' +
              media +
              '<div class="proj-body">' +
              (hasImg ? "" : '<span class="proj-cat">' + (p.category || "") + "</span>") +
              "<h3>" + (p.title || "") + "</h3>" +
              "<p>" + (p.detail || "") + "</p>" +
              '<div class="proj-meta"><span><b>' + (p.location || "") + "</b></span><span>" + (p.duration || "") + "</span></div>" +
              "</div></article>"
            );
          })
          .join("");
      })
      .catch(function () {});
  }

  /* --- Bind everything that belongs to the current page ------------------
     Split out so a single-file preview build can re-run it after swapping
     the page content, and so the live site can call it once on load.
     -------------------------------------------------------------------- */
  function bindPage() {
    document.querySelectorAll("form.form-grid").forEach(function (f) {
      if (f.dataset.bound) return;
      f.dataset.bound = "1";
      wireForm(f);
    });
    var toolHost = document.getElementById("drainToolBody");
    if (toolHost && !toolHost.dataset.bound) {
      toolHost.dataset.bound = "1";
      renderTool("start", toolHost);
    }
    bindFilters();
    loadProjects();
  }

  window.FCS_BIND = bindPage;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindPage);
  } else {
    bindPage();
  }
})();
