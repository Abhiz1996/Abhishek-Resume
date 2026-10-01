const campaigns = [
  {
    "id": "huddle",
    "title": "Huddle Global",
    "summary": "I help lead social media, marketing, and event storytelling for Huddle Global.",
    "sections": [
      {
        "heading": "My role",
        "items": [
          "I plan content, coordinate coverage, and publish event stories with the team."
        ]
      },
      {
        "heading": "Explore the campaign",
        "links": [
          {
            "label": "View Huddle Global case study",
            "url": "huddle-global.html"
          }
        ]
      }
    ]
  },
  {
    "id": "ecosystem",
    "title": "Ecosystem Initiatives",
    "summary": "I connect KSUM programmes with founders and the public through social media and PR.",
    "sections": [
      {
        "heading": "My work",
        "items": [
          "I plan campaigns for ecosystem initiatives, innovation grants, and founder outreach.",
          "I coordinate content across social channels, press, and editorial publications."
        ]
      },
      {
        "heading": "From my presentation",
        "items": [
          "The innovation grant campaign recorded 778,797 unique users reached on Facebook and Instagram.",
          "TechXpedition promoted opportunities for women entrepreneurs across India.",
          "These are historical campaign results from my award presentation."
        ]
      },
      {
        "heading": "Presentation",
        "links": [
          {
            "label": "View my e-Governance award presentation (PDF)",
            "url": "assets/ksum-egovernance-presentation.pdf"
          },
          {
            "label": "Preview the innovation grant campaign",
            "url": "assets/ecosystem-grants.png"
          }
        ]
      }
    ]
  },
  {
    "id": "aham",
    "title": "Aham Builders",
    "summary": "I managed social media and brand communication during the company's early growth.",
    "sections": [
      {
        "heading": "My work",
        "items": [
          "I created property campaigns, brochures, and digital creatives.",
          "I planned social content for buyers and investors."
        ]
      }
    ]
  },
  {
    "id": "reports",
    "title": "Newsletters & Reports",
    "summary": "I turn programme updates and startup stories into clear editorial content.",
    "sections": [
      {
        "heading": "My work",
        "items": [
          "I write, edit, and organise newsletters and reports.",
          "I coordinate content and approvals for publication."
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

  const activeSection = sections.findLast((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 140;
  });

  links.forEach((link) => {
    const isActive = activeSection && link.getAttribute("href") === `#${activeSection.id}`;
    link.classList.toggle("is-active", Boolean(isActive));
  });
}

function initReveal() {
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

window.addEventListener("scroll", activateCurrentSection, { passive: true });
