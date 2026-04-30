const briefing = window.MORNING_BRIEFING;

const byId = (id) => document.getElementById(id);

function createElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
}

function createAnchor(className, text, href) {
  const node = document.createElement("a");
  node.className = className;
  node.textContent = text;
  node.href = href;
  node.target = "_blank";
  node.rel = "noreferrer noopener";
  return node;
}

function slugifyValue(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatGeneratedAt(value) {
  if (!value) {
    return "Fresh edition";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function joinOrFallback(items, fallback = "Source mix loading") {
  return items && items.length > 0 ? items.join(", ") : fallback;
}

function formatCoverageTopic(value) {
  return String(value || "markets")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" / ");
}

function clampPercent(value, maxValue) {
  const safeMax = maxValue > 0 ? maxValue : 1;
  return Math.max(10, Math.min(100, (Math.abs(value) / safeMax) * 100));
}

function directionClass(value) {
  return value === "down" ? "down" : "up";
}

function renderStatPoints(points, className = "stat-grid") {
  const wrap = createElement("div", className);

  (points || []).slice(0, 3).forEach((point) => {
    const card = createElement("div", `stat-card stat-card-${point.tone || "cool"}`);
    card.append(
      createElement("p", "stat-label", point.label),
      createElement("p", "stat-value", point.value),
    );
    wrap.append(card);
  });

  return wrap;
}

function graphicPalette(palette) {
  const palettes = {
    gold: {
      fill: "#f7e5b8",
      accent: "#b58b34",
      accentSoft: "#d8c27a",
      ink: "#6e5619",
    },
    blue: {
      fill: "#dceaf5",
      accent: "#335c7d",
      accentSoft: "#7ba3c3",
      ink: "#28465f",
    },
    rose: {
      fill: "#f3dce4",
      accent: "#8d4f64",
      accentSoft: "#c28ea0",
      ink: "#6f3c4d",
    },
    sage: {
      fill: "#dce9df",
      accent: "#4f6d5d",
      accentSoft: "#8bac98",
      ink: "#40584b",
    },
    paper: {
      fill: "#ece4d8",
      accent: "#7d7265",
      accentSoft: "#c9bbac",
      ink: "#61584f",
    },
  };

  return palettes[palette] || palettes.paper;
}

function graphicTypeFromTopic(topic) {
  if (topic === "economy-rates") {
    return "rates";
  }
  if (topic === "ai-tech") {
    return "network";
  }
  if (topic === "politics-world") {
    return "map";
  }
  if (topic === "business") {
    return "ledger";
  }

  return "market";
}

function buildGraphicMarkup(type, palette) {
  const colors = graphicPalette(palette);

  if (type === "rates") {
    return `
      <svg class="figure-svg" viewBox="0 0 260 150" aria-hidden="true">
        <rect x="18" y="16" width="224" height="118" rx="16" fill="${colors.fill}" opacity="0.75"></rect>
        <path d="M28 106 C60 92, 88 96, 118 74 S172 56, 232 38" fill="none" stroke="${colors.accent}" stroke-width="5" stroke-linecap="round"></path>
        <path d="M28 116 C58 108, 92 110, 124 92 S176 80, 232 70" fill="none" stroke="${colors.accentSoft}" stroke-width="3" stroke-linecap="round"></path>
        <circle cx="118" cy="74" r="6" fill="${colors.ink}"></circle>
        <circle cx="176" cy="56" r="6" fill="${colors.accent}"></circle>
        <rect x="38" y="84" width="18" height="38" rx="6" fill="${colors.accentSoft}"></rect>
        <rect x="70" y="70" width="18" height="52" rx="6" fill="${colors.accent}"></rect>
        <rect x="102" y="58" width="18" height="64" rx="6" fill="${colors.ink}"></rect>
      </svg>`;
  }

  if (type === "network") {
    return `
      <svg class="figure-svg" viewBox="0 0 260 150" aria-hidden="true">
        <rect x="18" y="16" width="224" height="118" rx="16" fill="${colors.fill}" opacity="0.75"></rect>
        <rect x="106" y="48" width="48" height="48" rx="12" fill="${colors.accent}"></rect>
        <rect x="116" y="58" width="28" height="28" rx="8" fill="${colors.fill}"></rect>
        <path d="M68 48 L106 72 M154 72 L194 42 M70 110 L106 82 M154 82 L196 108" stroke="${colors.ink}" stroke-width="4" stroke-linecap="round"></path>
        <circle cx="68" cy="48" r="10" fill="${colors.accentSoft}"></circle>
        <circle cx="194" cy="42" r="10" fill="${colors.ink}"></circle>
        <circle cx="70" cy="110" r="10" fill="${colors.accent}"></circle>
        <circle cx="196" cy="108" r="10" fill="${colors.accentSoft}"></circle>
      </svg>`;
  }

  if (type === "map") {
    return `
      <svg class="figure-svg" viewBox="0 0 260 150" aria-hidden="true">
        <rect x="18" y="16" width="224" height="118" rx="16" fill="${colors.fill}" opacity="0.75"></rect>
        <path d="M44 90 C60 54, 92 40, 122 52 C142 30, 184 34, 206 62 C216 74, 214 98, 194 106 C168 116, 146 102, 124 108 C92 116, 60 112, 44 90 Z" fill="none" stroke="${colors.accent}" stroke-width="4"></path>
        <path d="M78 90 C112 70, 144 66, 178 74" fill="none" stroke="${colors.accentSoft}" stroke-width="3" stroke-dasharray="7 7"></path>
        <circle cx="82" cy="88" r="7" fill="${colors.ink}"></circle>
        <circle cx="178" cy="74" r="7" fill="${colors.accent}"></circle>
        <path d="M88 84 C112 54, 150 48, 172 68" fill="none" stroke="${colors.ink}" stroke-width="3" stroke-linecap="round"></path>
      </svg>`;
  }

  if (type === "ledger") {
    return `
      <svg class="figure-svg" viewBox="0 0 260 150" aria-hidden="true">
        <rect x="18" y="16" width="224" height="118" rx="16" fill="${colors.fill}" opacity="0.75"></rect>
        <rect x="40" y="36" width="180" height="78" rx="12" fill="#fffdfa" stroke="${colors.accentSoft}" stroke-width="2"></rect>
        <line x1="56" y1="58" x2="204" y2="58" stroke="${colors.accentSoft}" stroke-width="2"></line>
        <line x1="56" y1="78" x2="204" y2="78" stroke="${colors.accentSoft}" stroke-width="2"></line>
        <line x1="56" y1="98" x2="204" y2="98" stroke="${colors.accentSoft}" stroke-width="2"></line>
        <rect x="56" y="50" width="42" height="12" rx="6" fill="${colors.accent}"></rect>
        <rect x="56" y="70" width="72" height="12" rx="6" fill="${colors.accentSoft}"></rect>
        <rect x="56" y="90" width="54" height="12" rx="6" fill="${colors.ink}"></rect>
        <circle cx="190" cy="76" r="16" fill="${colors.fill}" stroke="${colors.accent}" stroke-width="3"></circle>
        <path d="M182 76 L188 82 L200 68" fill="none" stroke="${colors.accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>`;
  }

  if (type === "newsletter") {
    return `
      <svg class="figure-svg" viewBox="0 0 260 150" aria-hidden="true">
        <rect x="18" y="16" width="224" height="118" rx="16" fill="${colors.fill}" opacity="0.75"></rect>
        <rect x="42" y="34" width="164" height="82" rx="12" fill="#fffdfa" stroke="${colors.accentSoft}" stroke-width="2"></rect>
        <rect x="58" y="50" width="56" height="10" rx="5" fill="${colors.accent}"></rect>
        <rect x="58" y="70" width="118" height="10" rx="5" fill="${colors.accentSoft}"></rect>
        <rect x="58" y="90" width="88" height="10" rx="5" fill="${colors.ink}"></rect>
        <circle cx="198" cy="52" r="10" fill="${colors.accent}"></circle>
        <circle cx="198" cy="78" r="10" fill="${colors.accentSoft}"></circle>
        <circle cx="198" cy="104" r="10" fill="${colors.ink}"></circle>
      </svg>`;
  }

  return `
    <svg class="figure-svg" viewBox="0 0 260 150" aria-hidden="true">
      <rect x="18" y="16" width="224" height="118" rx="16" fill="${colors.fill}" opacity="0.75"></rect>
      <path d="M30 104 C58 96, 86 66, 118 70 S176 106, 230 48" fill="none" stroke="${colors.accent}" stroke-width="5" stroke-linecap="round"></path>
      <path d="M30 116 L230 116" stroke="${colors.accentSoft}" stroke-width="2"></path>
      <circle cx="86" cy="66" r="6" fill="${colors.ink}"></circle>
      <circle cx="176" cy="106" r="6" fill="${colors.accentSoft}"></circle>
      <circle cx="230" cy="48" r="6" fill="${colors.accent}"></circle>
    </svg>`;
}

function renderGraphicPanel(type, palette) {
  const node = createElement("div", `figure-graphic figure-graphic-${palette || "paper"}`);
  node.innerHTML = buildGraphicMarkup(type, palette || "paper");
  return node;
}

function renderMasthead(data) {
  byId("product-label").textContent = data.meta.productLabel || "The Daily Newsletter";
  byId("edition-label").textContent = data.meta.editionLabel || "Morning edition";
  byId("brief-title").textContent = data.meta.productLabel || "The Daily Newsletter";
  byId("brief-summary").textContent = data.thesis?.summary || "";
  byId("generated-at").textContent = formatGeneratedAt(data.meta.generatedAt);
  byId("read-time").textContent = `${data.meta.estimatedReadMinutes}-minute read`;
  byId("commute-mode").textContent = data.meta.commuteMode || "";
  byId("source-focus").textContent = joinOrFallback(data.meta.sourceFocus || []);
}

function renderLeadStory(data) {
  const root = byId("lead-story");
  root.replaceChildren();

  const visual = data.visual || {};
  const copy = createElement("div", "lead-copy");
  const meta = createElement("div", "story-meta-row");
  meta.append(
    createElement("span", "meta-pill", formatCoverageTopic(data.coverageTopic || data.focusArea)),
    createElement("span", "meta-pill", data.focusArea || ""),
    createElement("span", "meta-pill", data.readTime || ""),
    createElement("span", "meta-pill", data.sourceLabel || ""),
  );

  copy.append(
    meta,
    createElement("h3", "lead-headline", data.headline || ""),
    createElement("p", "lead-deck", data.deck || ""),
  );

  const keyLines = createElement("div", "lead-lines");
  [
    ["Why it leads", data.whyItLeads],
    ["Why it matters", data.marketRead],
    ["What to watch", data.watchToday],
  ].forEach(([label, value]) => {
    if (!value) {
      return;
    }
    const row = createElement("div", "story-line");
    row.append(
      createElement("p", "story-line-label", label),
      createElement("p", "story-line-copy", value),
    );
    keyLines.append(row);
  });
  copy.append(keyLines);

  const actions = createElement("div", "story-actions");
  if (data.link) {
    actions.append(createAnchor("story-action story-action-primary", "Open lead story", data.link));
  }
  copy.append(actions);

  const figure = createElement("aside", `lead-figure lead-figure-${visual.palette || "sky"}`);
  figure.append(
    createElement("p", "subsection-label", visual.eyebrow || "Morning view"),
    createElement("h4", "figure-title", visual.title || data.deck || data.headline || ""),
    createElement("p", "figure-summary", visual.summary || ""),
    renderGraphicPanel(graphicTypeFromTopic(data.coverageTopic), visual.palette || "paper"),
    renderStatPoints(visual.points || []),
  );

  root.append(copy, figure);
}

function renderMarketTiles(items) {
  const root = byId("market-tiles");
  root.replaceChildren();

  (items || []).forEach((item) => {
    const tile = createElement("article", `market-tile market-tile-${directionClass(item.direction)}`);
    const top = createElement("div", "market-tile-top");
    top.append(
      createElement("p", "market-tile-label", item.label),
      createElement("p", "market-tile-change", item.change),
    );

    tile.append(
      top,
      createElement("p", "market-tile-value", item.value),
      createElement("p", "market-tile-note", item.note),
    );
    root.append(tile);
  });
}

function renderHeatmap(items, sourceLabel) {
  byId("heatmap-source").textContent = sourceLabel ? `Anchored to ${sourceLabel}.` : "";
  const root = byId("heatmap-chart");
  root.replaceChildren();

  const maxValue = Math.max(...(items || []).map((item) => Math.abs(item.value || 0)), 1);

  (items || []).forEach((item) => {
    const row = createElement("div", "heatmap-row");
    const label = createElement("div", "heatmap-label");
    label.append(
      createElement("span", "heatmap-name", item.label),
      createElement("span", "heatmap-theme", item.theme || ""),
    );

    const track = createElement("div", "heatmap-track");
    const fill = createElement("div", `heatmap-fill heatmap-fill-${directionClass(item.direction)}`);
    fill.style.width = `${clampPercent(item.value || 0, maxValue)}%`;
    track.append(fill);

    const value = createElement("div", `heatmap-value heatmap-value-${directionClass(item.direction)}`);
    const prefix = Number(item.value) > 0 ? "+" : "";
    value.textContent = `${prefix}${item.value}${item.unit ? ` ${item.unit}` : "%"}`;

    row.append(label, track, value);
    root.append(row);
  });
}

function renderMarketDesk(data) {
  byId("market-intro").textContent = data.intro || "";
  byId("market-summary").textContent = data.summary || "";
  renderMarketTiles(data.tiles || []);
  renderHeatmap(data.heatmap || [], data.sourceLabel || "");

  const root = byId("market-key-lines");
  root.replaceChildren();

  (data.keyLines || []).forEach((line) => {
    const item = createElement("article", "market-note");
    item.append(
      createElement("p", "market-note-label", line.label),
      createElement("p", "market-note-copy", line.text),
    );
    if (line.url) {
      item.append(createAnchor("text-link", "Read more", line.url));
    }
    root.append(item);
  });
}

function renderStoryCard(card, index) {
  const article = createElement("article", `story-card story-${slugifyValue(card.focusArea)}`);
  const main = createElement("div", "story-main");
  const copy = createElement("div", "story-copy");
  const figure = createElement("aside", `story-figure story-figure-${card.visual?.palette || "sky"}`);

  const meta = createElement("div", "story-meta-row");
  meta.append(
    createElement("span", "meta-rank", String(index + 1).padStart(2, "0")),
    createElement("span", "meta-pill", formatCoverageTopic(card.coverageTopic)),
    createElement("span", "meta-pill", card.urgency),
    createElement("span", "meta-pill", card.readTime),
  );

  copy.append(
    meta,
    createElement("h3", "story-headline", card.headline),
    createElement("p", "story-deck", card.takeaway),
  );

  [
    ["What changed", card.whatChanged],
    ["Why it matters", card.whyItMatters],
    ["Watch next", card.watchToday],
  ].forEach(([label, value]) => {
    if (!value) {
      return;
    }
    const line = createElement("div", "story-line");
    line.append(
      createElement("p", "story-line-label", label),
      createElement("p", "story-line-copy", value),
    );
    copy.append(line);
  });

  const details = createElement("details", "story-details");
  const summary = createElement("summary", "story-details-summary", "Why smart people disagree");
  const disagreement = createElement("p", "story-details-copy", card.disagreement || "");
  details.append(summary, disagreement);
  copy.append(details);

  const actions = createElement("div", "story-actions");
  if (card.primaryLink?.url) {
    actions.append(createAnchor("story-action story-action-primary", "Open main article", card.primaryLink.url));
  }
  (card.links || []).slice(1, 3).forEach((linkData) => {
    actions.append(createAnchor("story-action story-action-secondary", linkData.label, linkData.url));
  });
  copy.append(actions);

  figure.append(
    createElement("p", "subsection-label", card.visual?.eyebrow || card.focusArea),
    createElement("h4", "figure-title", card.visual?.title || card.headline),
    createElement("p", "figure-summary", card.visual?.summary || ""),
    renderGraphicPanel(graphicTypeFromTopic(card.coverageTopic), card.visual?.palette || "paper"),
    renderStatPoints(card.visual?.points || []),
  );

  const sourceRow = createElement("div", "source-chip-row");
  (card.sourceTrail?.primary || []).forEach((source) => {
    sourceRow.append(createElement("span", "source-chip source-chip-primary", source));
  });
  (card.sourceTrail?.framing || []).forEach((source) => {
    sourceRow.append(createElement("span", "source-chip", source));
  });

  main.append(copy, figure);
  article.append(main);
  if (sourceRow.childElementCount > 0) {
    article.append(sourceRow);
  }
  return article;
}

function renderTopStories(items, intro) {
  byId("essential-intro").textContent = intro || "";
  const root = byId("top-stories-list");
  root.replaceChildren();
  (items || []).forEach((card, index) => root.append(renderStoryCard(card, index)));
}

function renderSourceDesk(data) {
  byId("source-desk-intro").textContent = data.intro || "";
  const root = byId("source-desk-grid");
  root.replaceChildren();

  (data.sections || []).forEach((section) => {
    const card = createElement("article", "source-card");
    const top = createElement("div", "source-card-top");
    top.append(
      createElement("p", "source-card-name", section.shortName || section.source),
      createElement("span", "meta-pill", formatCoverageTopic(section.coverageTopic)),
    );

    card.append(
      top,
      createElement("h3", "source-card-headline", section.headline),
      createElement("p", "source-card-summary", section.summary),
      createElement("p", "source-card-note", section.note),
    );

    if (section.url) {
      card.append(createAnchor("text-link", `Open at ${section.shortName || section.source}`, section.url));
    }
    root.append(card);
  });
}

function renderNewsletterBriefs(data) {
  byId("newsletter-desk-intro").textContent = data.intro || "";
  byId("newsletter-desk-note").textContent = data.note || "";

  const root = byId("newsletter-briefs");
  root.replaceChildren();

  (data.briefs || []).forEach((brief) => {
    const card = createElement("article", "newsletter-card");
    const top = createElement("div", "newsletter-card-top");
    top.append(
      createElement("p", "newsletter-name", brief.name),
      createElement("span", "meta-pill", brief.freshnessLabel),
    );

    const body = createElement("div", "newsletter-body");
    const copy = createElement("div", "newsletter-copy");
    copy.append(
      createElement("h3", "newsletter-subject", brief.subject),
      createElement("p", "newsletter-summary", brief.summary),
    );

    [
      ["Why it mattered", brief.whyItMatters],
      ["Market read", brief.marketRead],
      ["What to steal", brief.whatToSteal],
    ].forEach(([label, value]) => {
      if (!value) {
        return;
      }
      const row = createElement("div", "story-line");
      row.append(
        createElement("p", "story-line-label", label),
        createElement("p", "story-line-copy", value),
      );
      copy.append(row);
    });

    const topics = createElement("div", "topic-chip-row");
    (brief.topTopics || []).forEach((topic) => {
      topics.append(createElement("span", "topic-chip", topic));
    });
    if (topics.childElementCount > 0) {
      copy.append(topics);
    }

    copy.append(createElement("p", "newsletter-arrival-note", brief.arrivalNote || ""));

    if (brief.displayUrl) {
      copy.append(createAnchor("text-link", "Open in Gmail", brief.displayUrl));
    }

    const figure = createElement("aside", `newsletter-figure newsletter-figure-${brief.palette || "paper"}`);
    figure.append(
      createElement("p", "subsection-label", `${brief.name} visual`),
      renderGraphicPanel("newsletter", brief.palette || "paper"),
      renderStatPoints(brief.visualPoints || []),
    );

    body.append(copy, figure);
    card.append(top, body);
    root.append(card);
  });
}

function setActiveSectionNav() {
  const links = Array.from(document.querySelectorAll(".section-nav-link"));
  const sections = links
    .map((link) => {
      const target = document.querySelector(link.getAttribute("href"));
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (sections.length === 0) {
    return;
  }

  const markActive = (activeId) => {
    sections.forEach(({ link, target }) => {
      const active = target.id === activeId;
      link.classList.toggle("section-nav-link-active", active);
      link.setAttribute("aria-current", active ? "true" : "false");
    });
  };

  markActive(sections[0].target.id);

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (visible?.target?.id) {
        markActive(visible.target.id);
      }
    },
    {
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0.2, 0.45, 0.7],
    },
  );

  sections.forEach(({ target }) => observer.observe(target));
}

function renderBriefing(data) {
  renderMasthead(data);
  renderLeadStory(data.leadStory || {});
  renderMarketDesk(data.marketDesk || {});
  renderTopStories(data.topStories?.cards || [], data.topStories?.intro || "");
  renderSourceDesk(data.sourceDesk || {});
  renderNewsletterBriefs(data.newsletterDesk || {});
  setActiveSectionNav();
}

if (!briefing) {
  byId("brief-summary").textContent = "Run the daily refresh workflow to populate this dashboard.";
} else {
  renderBriefing(briefing);
}
