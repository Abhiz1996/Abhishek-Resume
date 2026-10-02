const campaigns = [
  {
    "id": "huddle",
    "title": "Huddle Global",
    "summary": "Huddle Global 2025: 2.9M+ reported impressions, 680+ posts, and 40+ press releases across the campaign.",
    "sections": [
      {
        "heading": "My role",
        "items": [
          "Social media and PR coordination, event coordination, and marketing."
        ]
      },
      {
        "heading": "Explore the campaign",
        "links": [
          {
            "label": "View Huddle Global Campaign",
            "url": "huddle-global.html"
          }
        ]
      }
    ]
  },
  {
    "id": "ecosystem",
    "title": "Kerala Startup Mission Initiatives",
    "summary": "Social media and PR connecting startup programmes with founders and the public.",
    "sections": [
      {
        "heading": "Campaign focus",
        "items": [
          "Grant outreach, women entrepreneurship, founder stories, and ecosystem communication."
        ]
      },
      {
        "heading": "Explore the work",
        "links": [
          {
            "label": "Open KSUM Initiatives page",
            "url": "ksum-initiatives.html"
          }
        ]
      }
    ]
  },
  {
    "id": "aham",
    "title": "Aham Builders",
    "summary": "Social media and brand communication during the company's early growth.",
    "sections": [
      {
        "heading": "My work",
        "items": [
          "Property campaigns, brochures, and digital creatives.",
          "Social content for buyers and investors."
        ]
      }
    ]
  },
  {
    "id": "reports",
    "title": "Newsletters & Reports",
    "summary": "Programme updates and startup stories, shaped into clear editorial content.",
    "sections": [
      {
        "heading": "My work",
        "items": [
          "Writing, editing, and organising newsletters and reports.",
          "Coordinating content and approvals for publication."
        ]
      },
      {
        "heading": "Read the work",
        "links": [
          {
            "label": "KSUM Magazine",
            "url": "https://magazine.startupmission.in/"
          }
        ]
      }
    ]
  }
];

const campaignTitle = document.querySelector("#campaign-title");
const campaignSummary = document.querySelector("#campaign-summary");
const campaignSections = document.querySelector("#campaign-sections");
const campaignDetailTabs = document.querySelector("#campaign-detail-tabs");

function renderCampaignDetailTabs() {
  campaignDetailTabs.innerHTML = "";

  campaigns.forEach((campaign, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "campaign-detail-tab";
    button.dataset.campaignId = campaign.id;
    button.setAttribute("aria-pressed", String(index === 0));
    button.textContent = campaign.title;

    if (index === 0) {
      button.classList.add("is-selected");
    }

    button.addEventListener("click", () => selectCampaign(campaign.id));
    campaignDetailTabs.appendChild(button);
  });
}

function renderCampaignDetails(campaign) {
  campaignTitle.textContent = campaign.title;
  campaignSummary.textContent = campaign.summary;
  campaignSections.innerHTML = "";

  campaign.sections.forEach((section) => {
    const block = document.createElement("article");
    block.className = "campaign-section-block";

    const title = document.createElement("h4");
    title.textContent = section.heading;

    block.appendChild(title);

    if (section.items) {
      const list = document.createElement("ul");
      section.items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        list.appendChild(listItem);
      });
      block.appendChild(list);
    }

    if (section.links) {
      const linksWrap = document.createElement("div");
      linksWrap.className = "campaign-links";

      section.links.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.className = "campaign-link";
        link.textContent = item.label;
        linksWrap.appendChild(link);
      });

      block.appendChild(linksWrap);
    }

    campaignSections.appendChild(block);
  });
}

function selectCampaign(campaignId) {
  const campaign = campaigns.find((item) => item.id === campaignId);
  if (!campaign) {
    return;
  }

  document.querySelectorAll(".campaign-detail-tab").forEach((tab) => {
    tab.classList.toggle("is-selected", tab.dataset.campaignId === campaignId);
    tab.setAttribute("aria-pressed", String(tab.dataset.campaignId === campaignId));
  });

  renderCampaignDetails(campaign);
}

function activateCurrentSection() {
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".site-nav a")];

  const activeSection = [...sections].reverse().find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 140;
  });

  links.forEach((link) => {
    const isActive = activeSection && link.getAttribute("href") === `#${activeSection.id}`;
    link.classList.toggle("is-active", Boolean(isActive));
  });
}

function initReveal() {
  if (window.matchMedia("(max-width: 1100px), (prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function initPointerGlow() {
  if (!window.matchMedia("(min-width: 1101px) and (hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.addEventListener(
    "pointermove",
    (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);

      const viewportWidth = window.innerWidth || 1;
      const opacity = Math.min(0.9, Math.max(0.28, event.clientX / viewportWidth));
      document.documentElement.style.setProperty("--grid-opacity", opacity.toFixed(2));
    },
    { passive: true }
  );
}

if (campaignDetailTabs) {
  renderCampaignDetailTabs();
  renderCampaignDetails(campaigns[0]);
}
initReveal();
initPointerGlow();
activateCurrentSection();

let scrollFramePending = false;
window.addEventListener("scroll", () => {
  if (scrollFramePending) return;
  scrollFramePending = true;
  requestAnimationFrame(() => {
    activateCurrentSection();
    scrollFramePending = false;
  });
}, { passive: true });

const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");
if (menuToggle && header) {
  header.classList.add("has-mobile-menu");
  const closeMenu = () => {
    header.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };
  menuToggle.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  header.querySelectorAll("nav a").forEach(link => link.addEventListener("click", closeMenu));
  header.addEventListener("keydown", event => {
    if (event.key === "Escape") { closeMenu(); menuToggle.focus(); }
  });
}
