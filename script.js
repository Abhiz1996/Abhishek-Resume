const campaigns = [
  {
    id: "huddle",
    label: "Flagship Event",
    title: "Huddle Global 2022-2025",
    summary:
      "Part of the marketing, social media and design leadership team for one of India's largest startup events, managing multi-channel visibility across multiple editions.",
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
          "Led social media strategy and execution across platforms including LinkedIn and Instagram.",
          "Managed content calendars and publishing schedules with a focus on reach quality and messaging clarity.",
          "Worked with leadership and stakeholders to translate event initiatives into public communication.",
          "Created and managed visuals, reels, and promotional materials."
        ]
      },
      {
        heading: "Impact",
        items: [
          "Expanded event visibility across the startup ecosystem with sustained engagement.",
          "Strengthened positioning for Huddle Global as a premier startup networking platform.",
          "Supported communications for 1000+ startup participants across multiple events."
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
    id: "dopamine",
    label: "Media Production",
    title: "Dopamine Advertisements Campaigns",
    summary:
      "Supported commercial and campaign production from story shaping to post-production with a focus on message clarity and narrative quality.",
    textMedia: "Script editing, production support, and commercial storytelling.",
    imageClass: "is-text",
    sections: [
      {
        heading: "Overview",
        items: [
          "Assisted in storyboard creation, scriptwriting, and editing for ad campaigns.",
          "Supported production teams during shoots and post-production workflows.",
          "Contributed to creative direction and narrative clarity for commercials."
        ]
      },
      {
        heading: "Key Responsibilities",
        items: [
          "Collaborated on script development and creative conceptualisation.",
          "Provided editorial support for campaign narratives and messaging.",
          "Assisted in production planning and on-set coordination."
        ]
      },
      {
        heading: "Skills Developed",
        items: [
          "Scriptwriting and narrative development for visual media.",
          "Understanding of video production workflows.",
          "Collaboration with creative and technical teams."
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

    const list = document.createElement("ul");
    section.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.appendChild(listItem);
    });

    block.appendChild(title);
    block.appendChild(list);
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

renderCampaignCards();
renderCampaignDetails(campaigns[0]);
initReveal();
activateCurrentSection();

window.addEventListener("scroll", activateCurrentSection, { passive: true });
