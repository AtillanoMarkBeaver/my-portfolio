(function () {
  "use strict";

  /* ---------- EDIT THESE ----------
     Leave a value as "" to keep it hidden or marked as a placeholder. */
  const CONFIG = {
    email: "",      // e.g. "you@example.com"
    linkedin: "",   // full URL, e.g. "https://www.linkedin.com/in/your-profile"
    github: "",     // full URL, e.g. "https://github.com/your-username"
    location: "",   // e.g. "Batangas, Philippines"
    resume: "assets/documents/Mark_Beaver_C_Atillano_Resume.pdf"
  };

  /* Add more projects by copying an object into this list. */
  const PROJECTS = [
    {
      featured: true,
      title: "LTO Payroll Management System",
      description: "A payroll management system developed to support payroll-related administrative workflows, employee records, and payroll processing.",
      tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "XAMPP"],
      image: "assets/images/lto-payroll-project.svg", // use a sanitized screenshot or mock data only
      github: "",  // optional repository URL
      demo: "",    // optional live demo URL (a demo with mock data only)
      details: {
        overview: "[Add a short overview of the system.]",
        need: "[Describe the problem or need the system addressed.]",
        features: ["[Add a key feature]", "[Add another key feature]"],
        tech: "PHP, MySQL, HTML, CSS, JavaScript, XAMPP",
        role: "[Describe your role and what you personally contributed.]",
        lessons: "[Add what you learned from building it.]"
      }
    }
  ];

  const $ = (sel, root) => (root || document).querySelector(sel);
  const make = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  };
  const textNode = (value) => {
    const span = make("span", value.startsWith("[") ? "placeholder" : "", value);
    return span;
  };
  const link = (label, href) => {
    const a = make("a", "", label);
    a.href = href;
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    return a;
  };
  const isUrl = (v) => /^https?:\/\//i.test(v);

  /* Footer year */
  $("#year").textContent = new Date().getFullYear();

  /* Mobile navigation */
  const toggle = $(".nav-toggle");
  const nav = $("#site-nav");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.tagName === "A") setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* Highlight the current section in the nav */
  const links = [...nav.querySelectorAll("a")];
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.setAttribute("aria-current", String(a.hash === "#" + en.target.id)));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    links.forEach((a) => { const s = $(a.hash); if (s) io.observe(s); });
    /* The last section is short, so mark Contact active when the page bottom is reached */
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        links.forEach((a) => a.setAttribute("aria-current", String(a.hash === "#contact")));
      }
    }, { passive: true });
  }

  /* Social links (only shown when a real URL is supplied) */
  const socials = [["LinkedIn", CONFIG.linkedin], ["GitHub", CONFIG.github]].filter(([, u]) => isUrl(u));
  ["#hero-links", "#footer-links"].forEach((sel) => {
    const ul = $(sel);
    socials.forEach(([name, url]) => { const li = make("li"); li.appendChild(link(name, url)); ul.appendChild(li); });
  });

  /* Contact */
  const contact = $("#contact-list");
  const row = (label, value, href) => {
    const li = make("li");
    li.appendChild(make("b", "", label));
    if (value) li.appendChild(href ? link(value, href) : make("span", "", value));
    else li.appendChild(textNode("[Not added yet]"));
    contact.appendChild(li);
  };
  row("Email", CONFIG.email, CONFIG.email && "mailto:" + CONFIG.email);
  row("LinkedIn", isUrl(CONFIG.linkedin) ? CONFIG.linkedin : "", CONFIG.linkedin);
  row("GitHub", isUrl(CONFIG.github) ? CONFIG.github : "", CONFIG.github);
  if (CONFIG.location) row("Location", CONFIG.location);

  /* Resume: show the button only if the PDF exists */
  const resumeBtn = $("#resume-btn");
  resumeBtn.href = CONFIG.resume;
  fetch(CONFIG.resume, { method: "HEAD" })
    .then((r) => { if (r.ok) resumeBtn.hidden = false; })
    .catch(() => {});

  /* Image fallback */
  const applyFallback = (img) => {
    const box = make("div", "fallback", (img.dataset.fallback || "Image") + " placeholder");
    img.replaceWith(box);
  };
  const watchImage = (img) => {
    img.addEventListener("error", () => applyFallback(img));
    if (img.complete && img.naturalWidth === 0) applyFallback(img);
  };
  document.querySelectorAll("img[data-fallback]").forEach(watchImage);

  /* Projects */
  const list = $("#project-list");
  const dialog = $("#project-dialog");

  const notice = () => make("p", "notice",
    "Portfolio demonstration only. The production system belongs to a government office, is not publicly available, and no real employee or payroll data is shown here.");

  function openDetails(p) {
    $("#dlg-title").textContent = p.title;
    const body = $("#dlg-body");
    body.replaceChildren(notice());
    const sections = [
      ["Project overview", p.details.overview],
      ["Problem or need addressed", p.details.need],
      ["Key features", p.details.features],
      ["Technologies used", p.details.tech],
      ["My role and contributions", p.details.role],
      ["Lessons learned", p.details.lessons]
    ];
    sections.forEach(([label, val]) => {
      body.appendChild(make("h4", "", label));
      if (Array.isArray(val)) {
        const ul = make("ul");
        val.forEach((v) => { const li = make("li"); li.appendChild(textNode(v)); ul.appendChild(li); });
        body.appendChild(ul);
      } else if (label === "Technologies used" && !val.startsWith("[")) {
        const ul = make("ul", "tags");
        val.split(",").forEach((t) => ul.appendChild(make("li", "", t.trim())));
        body.appendChild(ul);
      } else {
        const para = make("p"); para.appendChild(textNode(val)); body.appendChild(para);
      }
    });
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
  }

  PROJECTS.forEach((p) => {
    const card = make("article", "card" + (p.featured ? " featured" : ""));
    const fig = make("figure", "shot");
    const img = make("img");
    img.src = p.image; img.alt = p.title + " screenshot (placeholder, use sanitized or mock data only)";
    img.width = 640; img.height = 400; img.dataset.fallback = "Project screenshot";
    fig.appendChild(img); watchImage(img);

    const info = make("div");
    if (p.featured) info.appendChild(make("p", "badge", "Featured project"));
    info.appendChild(make("h3", "", p.title));
    info.appendChild(make("p", "", p.description));
    const tags = make("ul", "tags");
    p.tags.forEach((t) => tags.appendChild(make("li", "", t)));
    info.appendChild(tags);
    if (p.featured) info.appendChild(make("p", "note", "Portfolio demonstration. The production system is internal and not publicly available."));

    const actions = make("div", "actions");
    const btn = make("button", "btn btn-primary", "View details");
    btn.type = "button";
    btn.addEventListener("click", () => openDetails(p));
    actions.appendChild(btn);
    if (isUrl(p.github)) actions.appendChild(link("GitHub repository", p.github));
    if (isUrl(p.demo)) actions.appendChild(link("Live demo", p.demo));
    info.appendChild(actions);

    card.append(fig, info);
    list.appendChild(card);
  });
  list.appendChild(make("div", "card empty", "More projects will be added here."));

  /* Dialog close: button, backdrop click */
  $(".dlg-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
})();
