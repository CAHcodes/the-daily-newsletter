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

function formatDeltaValue(value, unit) {
  const amount = Number(value || 0);
  const decimals = unit ? 1 : 2;
  const prefix = amount > 0 ? "+" : "";

  return `${prefix}${amount.toFixed(decimals)}${unit ? ` ${unit}` : "%"}`;
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

function renderBarChart(items) {
  const wrap = createElement("div", "graphic-bars");
  const maxValue = Math.max(...(items || []).map((item) => Math.abs(Number(item.value) || 0)), 1);

  (items || []).forEach((item) => {
    const row = createElement("div", "graphic-bar-row");
    const label = createElement("span", "graphic-bar-label", item.label);
    const track = createElement("div", "graphic-bar-track");
    const fill = createElement("div", `graphic-bar-fill graphic-bar-fill-${item.tone || "cool"}`);
    fill.style.width = `${clampPercent(Number(item.value) || 0, maxValue)}%`;
    track.append(fill);
    const value = createElement("span", "graphic-bar-value", item.display || "");
    row.append(label, track, value);
    wrap.append(row);
  });

  return wrap;
}

function renderTimeline(items) {
  const wrap = createElement("div", "graphic-timeline");

  (items || []).forEach((item, index) => {
    const row = createElement("div", "graphic-timeline-item");
    row.append(
      createElement("span", "graphic-timeline-step", String(index + 1).padStart(2, "0")),
      createElement("span", "graphic-timeline-label", item.label),
      createElement("span", "graphic-timeline-detail", item.detail),
    );
    wrap.append(row);
  });

  return wrap;
}

function renderFactBoard(items) {
  const wrap = createElement("div", "graphic-facts");

  (items || []).forEach((item) => {
    const card = createElement("div", "graphic-fact-card");
    card.append(
      createElement("p", "graphic-fact-label", item.label),
      createElement("p", "graphic-fact-detail", item.detail),
    );
    wrap.append(card);
  });

  return wrap;
}

function renderRouteMap(items) {
  const wrap = createElement("div", "graphic-route");

  (items || []).forEach((item, index) => {
    const row = createElement("div", "graphic-route-item");
    row.append(
      createElement("span", "graphic-route-dot", ""),
      createElement("span", "graphic-route-label", item.label),
      createElement("span", "graphic-route-detail", item.detail),
    );
    wrap.append(row);

    if (index < items.length - 1) {
      wrap.append(createElement("div", "graphic-route-connector", ""));
    }
  });

  return wrap;
}

function renderTopicStack(items) {
  const wrap = createElement("div", "graphic-topic-stack");

  (items || []).forEach((item) => {
    const row = createElement("div", "graphic-topic-item");
    row.append(
      createElement("span", "graphic-topic-rank", item.label),
      createElement("span", "graphic-topic-detail", item.detail),
    );
    wrap.append(row);
  });

  return wrap;
}

function renderGraphicPanel(graphic, palette) {
  const node = createElement("div", `figure-graphic figure-graphic-${palette || "paper"}`);
  const kind = graphic?.type || "fact-board";

  if (kind === "bar-chart") {
    node.append(renderBarChart(graphic.items || []));
  } else if (kind === "timeline") {
    node.append(renderTimeline(graphic.items || []));
  } else if (kind === "route-map") {
    node.append(renderRouteMap(graphic.items || []));
  } else if (kind === "topic-stack") {
    node.append(renderTopicStack(graphic.items || []));
  } else {
    node.append(renderFactBoard(graphic?.items || []));
  }

  if (graphic?.sourceCaption) {
    node.append(createElement("p", "graphic-caption", graphic.sourceCaption));
  }

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
    renderGraphicPanel(visual.graphic, visual.palette || "paper"),
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
    value.textContent = formatDeltaValue(item.value, item.unit);

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
    renderGraphicPanel(card.visual?.graphic, card.visual?.palette || "paper"),
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
      renderGraphicPanel(brief.graphic, brief.palette || "paper"),
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
