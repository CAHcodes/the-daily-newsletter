const briefing = window.MORNING_BRIEFING;

const byId = (id) => document.getElementById(id);

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
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

function formatAsOf(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

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

function clampPercent(value, maxValue) {
  const safeMax = maxValue > 0 ? maxValue : 1;
  return Math.max(8, Math.min(100, (Math.abs(value) / safeMax) * 100));
}

function directionClass(value) {
  return value === "down" ? "down" : "up";
}

function renderMarketTiles(items) {
  const root = byId("market-tiles");
  root.replaceChildren();

  items.forEach((item) => {
    const card = createElement("article", `market-tile market-tile-${directionClass(item.direction)}`);
    const top = createElement("div", "market-tile-top");
    top.append(
      createElement("p", "market-tile-label", item.label),
      createElement("p", "market-tile-change", item.change),
    );

    const value = createElement("p", "market-tile-value", item.value);
    const note = createElement("p", "market-tile-note", item.note);

    card.append(top, value, note);
    root.append(card);
  });
}

function renderHeatmap(items, sourceLabel) {
  const source = byId("heatmap-source");
  source.textContent = sourceLabel ? `Anchored to ${sourceLabel}.` : "";

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
    const valueSuffix = item.unit ? ` ${item.unit}` : "%";
    const valuePrefix = Number(item.value) > 0 ? "+" : "";
    value.textContent = `${valuePrefix}${item.value}${valueSuffix}`;

    row.append(label, track, value);
    root.append(row);
  });
}

function renderRiskRadar(items) {
  const root = byId("risk-radar");
  root.replaceChildren();

  (items || []).forEach((item) => {
    const row = createElement("article", "risk-row");
    const head = createElement("div", "risk-row-head");
    head.append(
      createElement("p", "risk-label", item.label),
      createElement("p", "risk-score", `${item.score}/100`),
    );

    const track = createElement("div", "risk-track");
    const fill = createElement("div", `risk-fill risk-fill-${item.tone || "steady"}`);
    fill.style.width = `${Math.max(10, Math.min(100, item.score || 0))}%`;
    track.append(fill);

    row.append(head, track, createElement("p", "risk-note", item.note));
    root.append(row);
  });
}

function renderPrivateRadar(data) {
  byId("private-radar-title").textContent = data.title || "";
  byId("private-radar-summary").textContent = data.summary || "";

  const metricsRoot = byId("private-radar-metrics");
  metricsRoot.replaceChildren();
  (data.metrics || []).forEach((metric) => {
    const card = createElement("div", "private-metric");
    card.append(
      createElement("p", "private-metric-label", metric.label),
      createElement("p", "private-metric-value", metric.value),
      createElement("p", "private-metric-note", metric.note),
    );
    metricsRoot.append(card);
  });

  const bulletsRoot = byId("private-radar-bullets");
  bulletsRoot.replaceChildren();
  (data.bullets || []).forEach((item) => {
    const bullet = createElement("p", "visual-bullet", item);
    bulletsRoot.append(bullet);
  });

  const linksRoot = byId("private-radar-links");
  linksRoot.replaceChildren();
  (data.links || []).forEach((linkData) => {
    const link = createElement("a", "story-link", linkData.label);
    link.href = linkData.url;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    linksRoot.append(link);
  });
}

function renderSourceMode(data) {
  byId("source-mode-headline").textContent = data.headline || "";
  byId("source-mode-summary").textContent = data.summary || "";
}

function renderChartGraphic(items) {
  const root = byId("chart-graphic");
  root.replaceChildren();
  const series = (items || []).slice(0, 5);
  const maxValue = Math.max(...series.map((item) => Math.abs(item.value || 0)), 1);

  series.forEach((item) => {
    const column = createElement("div", "chart-column");
    const value = createElement("span", `chart-column-value chart-column-value-${directionClass(item.direction)}`);
    const valuePrefix = Number(item.value) > 0 ? "+" : "";
    value.textContent = `${valuePrefix}${item.value}${item.unit ? ` ${item.unit}` : "%"}`;

    const barWrap = createElement("div", "chart-column-bar-wrap");
    const bar = createElement("div", `chart-column-bar chart-column-bar-${directionClass(item.direction)}`);
    bar.style.height = `${clampPercent(item.value || 0, maxValue)}%`;
    barWrap.append(bar);

    const label = createElement("span", "chart-column-label", item.label);
    column.append(value, barWrap, label);
    root.append(column);
  });
}

function renderPulse(pulse) {
  byId("pulse-intro").textContent = pulse.intro || "";
  renderMarketTiles(pulse.marketTiles || []);
  renderHeatmap(pulse.heatmap || [], pulse.sourceLabel || "");
  renderRiskRadar(pulse.riskRadar || []);
  renderPrivateRadar(pulse.privateRadar || {});
  renderSourceMode(pulse.sourceMode || {});
  renderChartGraphic(pulse.heatmap || []);
}

function renderSignals(items) {
  const root = byId("signal-board");
  root.replaceChildren();

  items.forEach((item) => {
    const card = createElement("article", `signal-card signal-${item.status || "watch"}`);
    card.append(
      createElement("p", "signal-label", item.label),
      createElement("p", "signal-value", item.value),
      createElement("p", "signal-note", item.note),
    );
    root.append(card);
  });
}

function renderSourceFocus(items) {
  const root = byId("source-focus");
  root.replaceChildren();

  items.forEach((item) => {
    root.append(createElement("span", "source-pill", item));
  });
}

function renderEssentialCards(items) {
  const root = byId("essential-cards");
  root.replaceChildren();

  items.forEach((card, index) => {
    const article = createElement("article", `story-card-v2 story-${slugifyValue(card.focusArea)}`);

    const meta = createElement("div", "story-meta");
    meta.append(
      createElement("span", "story-category", card.focusArea),
      createElement("span", "story-urgency", card.urgency),
      createElement("span", "story-readtime", card.readTime),
    );

    const heading = createElement("div", "story-heading");
    const rank = createElement("div", "story-rank", String(index + 1).padStart(2, "0"));
    const titleGroup = createElement("div", "story-title-group");
    const headline = createElement("h3", "story-headline", card.headline);
    const takeaway = createElement("p", "story-takeaway", card.takeaway);
    titleGroup.append(headline, takeaway);
    heading.append(rank, titleGroup);

    const snapshot = createElement("div", "story-snapshot");
    snapshot.append(
      createElement("p", "story-snapshot-label", "Why this card matters"),
      createElement("p", "story-snapshot-copy", card.whatChanged),
    );

    const factGrid = createElement("div", "fact-grid");
    [
      ["Why it matters", card.whyItMatters],
      ["Market impact", card.marketImpact],
      ["Disagreement", card.disagreement],
      ["Watch today", card.watchToday],
    ].forEach(([label, value]) => {
      const block = createElement("div", "fact-block");
      block.append(
        createElement("p", "fact-label", label),
        createElement("p", "fact-copy", value),
      );
      factGrid.append(block);
    });

    const tagRow = createElement("div", "tag-row");
    (card.tags || []).forEach((tag) => {
      tagRow.append(createElement("span", "tag", tag));
    });

    const details = createElement("details", "story-details");
    const summary = createElement("summary", "story-details-summary", "Sources and links");
    const detailsBody = createElement("div", "story-details-body");
    const hasPrimary = (card.sourceTrail?.primary || []).length > 0;
    const hasFraming = (card.sourceTrail?.framing || []).length > 0;

    if (hasPrimary) {
      const primary = createElement("p", "trail-copy");
      primary.innerHTML = `<strong>Primary reporting:</strong> ${(card.sourceTrail?.primary || []).join(", ")}`;
      detailsBody.append(primary);
    }

    if (hasFraming) {
      const framing = createElement("p", "trail-copy");
      framing.innerHTML = `<strong>Framing inputs:</strong> ${(card.sourceTrail?.framing || []).join(", ")}`;
      detailsBody.append(framing);
    }

    if (card.newsletterSignalMatch?.source) {
      const signal = createElement("p", "trail-copy");
      const hints = (card.newsletterSignalMatch.matchedHints || []).join(", ");
      signal.innerHTML = `<strong>Newsletter angle:</strong> ${card.newsletterSignalMatch.source}${hints ? ` | ${hints}` : ""}`;
      detailsBody.append(signal);
    }

    const links = createElement("div", "story-links");
    (card.links || []).forEach((linkData) => {
      const link = createElement("a", "story-link", linkData.label);
      link.href = linkData.url;
      link.target = "_blank";
      link.rel = "noreferrer noopener";
      links.append(link);
    });

    if ((card.links || []).length > 0) {
      detailsBody.append(links);
    }
    if (detailsBody.childElementCount > 0) {
      details.append(summary, detailsBody);
    }

    article.append(meta, heading, snapshot, factGrid, tagRow);
    if (detailsBody.childElementCount > 0) {
      article.append(details);
    }
    root.append(article);
  });
}

function renderEdge(edge) {
  byId("peer-miss-title").textContent = edge.peerMiss.title;
  byId("peer-miss-body").textContent = edge.peerMiss.body;

  byId("meeting-line-title").textContent = edge.sayInMeeting.title;
  byId("meeting-line-body").textContent = edge.sayInMeeting.body;

  byId("chart-title").textContent = edge.chartOfDay.title;
  byId("chart-body").textContent = edge.chartOfDay.body;
  byId("chart-takeaway").textContent = edge.chartOfDay.takeaway;

  byId("deep-dive-title").textContent = edge.deepDive.title;
  byId("deep-dive-body").textContent = edge.deepDive.body;
  byId("deep-dive-why").textContent = edge.deepDive.whyNow;
  const deepDiveLink = byId("deep-dive-link");
  if (edge.deepDive.link) {
    deepDiveLink.href = edge.deepDive.link;
    deepDiveLink.hidden = false;
  } else {
    deepDiveLink.hidden = true;
  }
}

function renderCommuteRoute(items) {
  const root = byId("commute-route");
  root.replaceChildren();

  items.forEach((item) => {
    const row = createElement("article", "route-card");
    row.append(
      createElement("p", "route-label", item.label),
      createElement("h3", "route-title", item.title),
      createElement("p", "route-copy", item.note),
    );
    root.append(row);
  });
}

function renderSourceStack(items) {
  const root = byId("source-stack");
  root.replaceChildren();

  items.forEach((item) => {
    const card = createElement("article", "stack-card");
    const top = createElement("div", "stack-top");
    top.append(
      createElement("h3", "stack-name", item.name),
      createElement("span", "stack-tier", item.tier),
    );
    card.append(
      top,
      createElement("p", "stack-role", item.role),
      createElement("p", "stack-note", item.note),
    );
    root.append(card);
  });
}

function renderHero(data) {
  byId("product-label").textContent = data.meta.productLabel;
  byId("brief-title").textContent = data.thesis.headline;
  byId("brief-summary").textContent = data.thesis.summary;
  byId("edition-label").textContent = data.meta.editionLabel;
  byId("generated-at").textContent = formatGeneratedAt(data.meta.generatedAt);
  byId("read-time").textContent = `${data.meta.estimatedReadMinutes}-minute read`;
  byId("commute-mode").textContent = data.meta.commuteMode;
  byId("market-mood").textContent = data.thesis.marketMood.label;
  byId("market-mood-note").textContent = data.thesis.marketMood.note;
  byId("edge-title").textContent = data.thesis.edgeCallout.title;
  byId("edge-note").textContent = data.thesis.edgeCallout.note;
}

function renderClosing(footerPerspective) {
  byId("closing-title").textContent = footerPerspective.title;
  byId("closing-summary").textContent = footerPerspective.summary;
}

function setActiveQuickNav() {
  const links = Array.from(document.querySelectorAll(".quick-nav-link"));
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
      const isActive = target.id === activeId;
      link.classList.toggle("quick-nav-link-active", isActive);
      link.setAttribute("aria-current", isActive ? "true" : "false");
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
  renderHero(data);
  renderPulse(data.pulse || {});
  byId("scan-intro").textContent = data.scan.intro;
  byId("ignore-noise-title").textContent = data.scan.ignoreNoise.title;
  byId("ignore-noise-summary").textContent = data.scan.ignoreNoise.summary;
  byId("essential-intro").textContent = data.essential.intro;

  renderSignals(data.scan.signals || []);
  renderSourceFocus(data.meta.sourceFocus || []);
  renderEssentialCards(data.essential.cards || []);
  renderEdge(data.edge);
  renderCommuteRoute(data.commuteRoute || []);
  renderSourceStack(data.sourceStack || []);
  renderClosing(data.footerPerspective);
  setActiveQuickNav();
}

if (!briefing) {
  byId("brief-title").textContent = "Briefing data missing";
  byId("brief-summary").textContent = "Run the daily refresh workflow to populate this dashboard.";
} else {
  renderBriefing(briefing);
}
