const campaigns = [
  {
    id: "huddle",
    label: "Flagship Event",
    title: "Huddle Global 2022-2025",
    summary:
      "Part of the marketing, social media and design leadership team for one of India's largest startup events, managing visibility, storytelling, recaps, and ecosystem-facing communication across multiple editions.",
    image: "assets/HCW09189.jpeg",
    imageClass: "",
    sections: [
      {
        heading: "Overview",
        items: [
          "Part of the marketing, social media and design leadership team for Huddle Global, one of India's largest startup events.",
          "Managed multi-channel campaign support for consecutive editions from 2022 through 2025.",
          "Built and executed campaigns combining digital and traditional marketing strategies."
        ]
      },
      {
        heading: "Role & Responsibilities",
        items: [
          "Led social media strategy and execution across platforms including LinkedIn, Instagram, and event communication channels.",
          "Managed content calendars, event storytelling, and publishing schedules with a focus on reach quality and messaging clarity.",
          "Worked with leadership and stakeholders to translate event initiatives into public communication.",
          "Created and managed visuals, reels, recap content, and promotional materials."
        ]
      },
      {
        heading: "Impact",
        items: [
          "Expanded event visibility across the startup ecosystem with sustained engagement.",
          "Strengthened positioning for Huddle Global as a premier startup networking platform.",
          "Supported communications for 1000+ startup participants across multiple events."
        ]
      },
      {
        heading: "Reference Videos",
        links: [
          {
            label: "Huddle Global 2025 Official Recap",
            url: "https://www.youtube.com/watch?v=EGpW3zKKbuw"
          },
          {
            label: "Huddle Global 2024 Mashup",
            url: "https://www.youtube.com/watch?v=SBy4iKOX-VI"
          },
          {
            label: "Huddle Global 2023 Highlights",
            url: "https://www.youtube.com/watch?v=VjLwFyD5HDE"
          }
        ]
      }
    ]
  },
  {
    id: "ecosystem",
    label: "Multi-Channel Initiative",
    title: "Keeraliyam & Ecosystem Initiatives",
    summary:
      "Planned and executed high-impact digital campaigns for flagship state-level initiatives across social, websites, newsletters, and reports.",
    image: "assets/mainbanner1.png",
    imageClass: "is-graphic",
    sections: [
      {
        heading: "Overview",
        items: [
          "Planned and executed campaigns for Keeraliyam, Entae Keralam, and Nava Keralam initiatives.",
          "Managed content across LinkedIn, Instagram, websites, newsletters, and reports.",
          "Balanced ecosystem storytelling with institutional communication standards."
        ]
      },
      {
        heading: "Campaign Strategy",
        items: [
          "Focused on reach quality, message clarity, and ecosystem visibility.",
          "Worked with leadership, program teams, and external stakeholders for communication consistency.",
          "Maintained government communication standards and brand alignment."
        ]
      },
      {
        heading: "Outcomes",
        items: [
          "Strengthened Kerala Startup Mission's visibility as a leader in innovation and digital governance.",
          "Delivered consistent brand-aligned communication across initiatives.",
          "Built sustained visibility for ecosystem programs across multiple audience segments."
        ]
      }
    ]
  },
  {
    id: "aham",
    label: "Brand Strategy",
    title: "Aham Builders Brand Growth",
    summary:
      "Led social media and brand communication for a real-estate growth-stage company through digital presence, creative collateral, and campaign support.",
    textMedia: "Brand building, property storytelling, and growth-stage visibility.",
    imageClass: "is-text",
    sections: [
      {
        heading: "Overview",
        items: [
          "Managed brand social media and digital presence during an early growth stage.",
          "Created brochures, digital creatives, and campaign content.",
          "Secured brand visibility through strategic content and media exposure."
        ]
      },
      {
        heading: "Deliverables",
        items: [
          "Developed brand-aligned social media strategy and content planning.",
          "Created marketing collateral and digital visuals.",
          "Executed targeted campaigns for property launches and audience acquisition."
        ]
      },
      {
        heading: "Results",
        items: [
          "Increased brand visibility in a competitive real estate market.",
          "Built a more professional and audience-facing digital presence.",
          "Supported business growth through sharper brand communication."
        ]
      }
    ]
  },
  {
    id: "reports",
    label: "Editorial Systems",
    title: "Newsletters & Reports",
    summary:
      "Managed editorial communication through newsletters, reports, and magazine-style publishing that extended the visibility and documentation of ecosystem work.",
    textMedia: "Newsletters, reports, and ecosystem storytelling.",
    imageClass: "is-text",
    sections: [
      {
        heading: "Overview",
        items: [
          "Supported ecosystem communication through structured newsletters, feature stories, reports, and digital editorial publishing.",
          "Translated programme activity, startup stories, and institutional updates into clearer audience-facing communication.",
          "Helped build consistency between public messaging, internal outputs, and external visibility assets."
        ]
      },
      {
        heading: "Key Responsibilities",
        items: [
          "Curated and packaged updates for newsletters, reports, and editorial releases.",
          "Worked on copy, structure, and readability for ecosystem-facing communication outputs.",
          "Aligned reporting-led communication with campaigns, websites, and stakeholder messaging."
        ]
      },
      {
        heading: "Reference Link",
        links: [
          {
            label: "Kerala Startup Mission Magazine",
            url: "https://magazine.startupmission.in/"
          }
        ]
      }
    ]
  }
];

const campaignGrid = document.querySelector("#campaign-grid");
const campaignTitle = document.querySelector("#campaign-title");
const campaignSummary = document.querySelector("#campaign-summary");
const campaignSections = document.querySelector("#campaign-sections");

function createCampaignMedia(campaign) {
  const media = document.createElement("div");
  media.className = `campaign-media ${campaign.imageClass || ""}`.trim();

  if (campaign.image) {
    const image = document.createElement("img");
    image.src = campaign.image;
    image.alt = campaign.title;
    media.appendChild(image);
  } else {
    const text = document.createElement("span");
    text.textContent = campaign.textMedia;
    media.appendChild(text);
  }

  return media;
}

function renderCampaignCards() {
  campaigns.forEach((campaign, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "campaign-card";
    button.dataset.campaignId = campaign.id;
    if (index === 0) {
      button.classList.add("is-selected");
    }

    const body = document.createElement("div");
    body.className = "campaign-card-body";
    body.innerHTML = `
      <span class="campaign-label">${campaign.label}</span>
      <h3>${campaign.title}</h3>
      <p>${campaign.summary}</p>
    `;

    button.appendChild(createCampaignMedia(campaign));
    button.appendChild(body);
    button.addEventListener("click", () => selectCampaign(campaign.id));
    campaignGrid.appendChild(button);
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

  document.querySelectorAll(".campaign-card").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.campaignId === campaignId);
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
    },
    { passive: true }
  );
}

renderCampaignCards();
renderCampaignDetails(campaigns[0]);
initReveal();
initPointerGlow();
activateCurrentSection();

window.addEventListener("scroll", activateCurrentSection, { passive: true });
