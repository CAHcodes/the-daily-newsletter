const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const briefing = require(path.join(projectRoot, "app", "data", "briefing-data.js"));
const publishingSettingsPath = path.join(projectRoot, "config", "publishing-settings.json");

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const publishingSettings = readJson(publishingSettingsPath, { public_dashboard_url: "" });

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(date);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function joinOrFallback(items, fallback = "None listed") {
  return items && items.length > 0 ? items.join(", ") : fallback;
}

function storyAccentColor(focusArea) {
  if (focusArea === "Macro") {
    return "#ffc56b";
  }

  if (focusArea === "World") {
    return "#73efc4";
  }

  if (focusArea === "Private Markets") {
    return "#ffa3d8";
  }

  return "#7cc7ff";
}

function signalCardStyle(status) {
  if (status === "hot") {
    return {
      border: "rgba(255, 197, 107, 0.34)",
      glow: "rgba(255, 125, 116, 0.12)",
    };
  }

  if (status === "steady") {
    return {
      border: "rgba(115, 239, 196, 0.32)",
      glow: "rgba(115, 239, 196, 0.11)",
    };
  }

  return {
    border: "rgba(124, 199, 255, 0.32)",
    glow: "rgba(124, 199, 255, 0.11)",
  };
}

function buildMarkdown(data) {
  const dateLabel = formatDate(data.meta.generatedAt);
  const lines = [
    `# Morning Brief | ${dateLabel}`,
    "",
    `**Daily thesis:** ${data.thesis.summary}`,
    "",
    "## Overnight Pulse",
    "",
    data.pulse?.intro || "",
    "",
  ];

  (data.pulse?.marketTiles || []).forEach((tile) => {
    lines.push(`- **${tile.label}:** ${tile.value} (${tile.change}). ${tile.note}`);
  });

  lines.push(
    "",
    `**Source mode:** ${data.pulse?.sourceMode?.headline || ""} ${data.pulse?.sourceMode?.summary || ""}`,
    "",
    `**Private market radar:** ${data.pulse?.privateRadar?.summary || ""}`,
    "",
    "## 60-Second Scan",
    "",
    `**Market mood:** ${data.thesis.marketMood.label}. ${data.thesis.marketMood.note}`,
    "",
    "### Top signals",
    "",
  );

  (data.scan.signals || []).forEach((signal) => {
    lines.push(`- **${signal.label}:** ${signal.value}. ${signal.note}`);
  });

  lines.push(
    "",
    `**Ignore the noise:** ${data.scan.ignoreNoise.title} ${data.scan.ignoreNoise.summary}`,
    "",
    "## 5-Minute Essential Brief",
    "",
    data.essential.intro,
    "",
  );

  (data.essential.cards || []).forEach((card, index) => {
    lines.push(
      `### ${index + 1}. ${card.headline}`,
      "",
      `- **Focus:** ${card.focusArea} | ${card.urgency} | ${card.readTime}`,
      `- **Takeaway:** ${card.takeaway}`,
      `- **What changed:** ${card.whatChanged}`,
      `- **Why it matters now:** ${card.whyItMatters}`,
      `- **Market impact:** ${card.marketImpact}`,
      `- **What smart people disagree on:** ${card.disagreement}`,
      `- **What to watch today:** ${card.watchToday}`,
    );

    if (card.sourceTrail?.primary?.length) {
      lines.push(`- **Primary reporting:** ${joinOrFallback(card.sourceTrail.primary)}`);
    }

    if (card.sourceTrail?.framing?.length) {
      lines.push(`- **Framing inputs:** ${joinOrFallback(card.sourceTrail.framing)}`);
    }

    if (card.newsletterSignalMatch?.source) {
      const hints = (card.newsletterSignalMatch.matchedHints || []).join(", ");
      lines.push(`- **Newsletter angle:** ${card.newsletterSignalMatch.source}${hints ? ` | ${hints}` : ""}`);
    }

    if (card.links && card.links.length > 0) {
      lines.push(`- **Source anchor:** ${card.links[0].url}`);
    }

    lines.push("");
  });

  lines.push(
    "## 15-Minute Edge Layer",
    "",
    `- **${data.edge.peerMiss.title}** ${data.edge.peerMiss.body}`,
    `- **${data.edge.sayInMeeting.title}** ${data.edge.sayInMeeting.body}`,
    `- **${data.edge.chartOfDay.title}** ${data.edge.chartOfDay.body} ${data.edge.chartOfDay.takeaway}`,
    `- **${data.edge.deepDive.title}** ${data.edge.deepDive.body} ${data.edge.deepDive.whyNow}`,
    "",
    "## Source note",
    "",
    `Primary reporting anchors: ${joinOrFallback((data.sourceStack || []).filter((item) => item.tier === "Tier 1").map((item) => item.name))}.`,
    `Framing inputs: ${joinOrFallback((data.sourceStack || []).filter((item) => item.tier !== "Tier 1").map((item) => item.name))}.`,
    "",
    `Durable frame: ${data.footerPerspective.summary}`,
    "",
  );

  return lines.join("\n");
}

function buildEmailMarkdown(data) {
  const dateLabel = formatDate(data.meta.generatedAt);
  const lines = [
    `Morning Brief | ${dateLabel}`,
    "",
    data.thesis.summary,
    "",
    `Lock this: ${data.thesis.edgeCallout.title} ${data.thesis.edgeCallout.note}`,
    "",
    "Overnight pulse",
    "",
  ];

  (data.pulse?.marketTiles || []).slice(0, 6).forEach((tile) => {
    lines.push(`- ${tile.label}: ${tile.value} (${tile.change}) - ${tile.note}`);
  });

  lines.push(
    "",
    `Private market radar: ${data.pulse?.privateRadar?.summary || ""}`,
    "",
    "60-second scan",
    "",
    `- Market mood: ${data.thesis.marketMood.label}`,
  );

  (data.scan.signals || []).slice(0, 5).forEach((signal) => {
    lines.push(`- ${signal.label}: ${signal.value} - ${signal.note}`);
  });

  lines.push("", `Ignore the noise: ${data.scan.ignoreNoise.summary}`, "", "5-minute essential brief", "");

  (data.essential.cards || []).forEach((card, index) => {
    lines.push(
      `${index + 1}. ${card.headline}`,
      `Focus: ${card.focusArea} | ${card.urgency} | ${card.readTime}`,
      `Takeaway: ${card.takeaway}`,
      `What changed: ${card.whatChanged}`,
      `Why it matters now: ${card.whyItMatters}`,
      `Market impact: ${card.marketImpact}`,
      `What smart people disagree on: ${card.disagreement}`,
      `Watch today: ${card.watchToday}`,
    );

    if (card.links && card.links.length > 0) {
      lines.push(`Source anchor: ${card.links[0].url}`);
    }

    if (card.newsletterSignalMatch?.source) {
      const hints = (card.newsletterSignalMatch.matchedHints || []).join(", ");
      lines.push(`Newsletter angle: ${card.newsletterSignalMatch.source}${hints ? ` | ${hints}` : ""}`);
    }

    lines.push("");
  });

  lines.push(
    "15-minute edge layer",
    "",
    `What your peers will miss: ${data.edge.peerMiss.body}`,
    `Say this in a meeting: ${data.edge.sayInMeeting.body}`,
    `Chart of the day: ${data.edge.chartOfDay.body} ${data.edge.chartOfDay.takeaway}`,
    `Durable frame: ${data.footerPerspective.summary}`,
  );

  if (publishingSettings.public_dashboard_url) {
    lines.push("", "Dashboard:", publishingSettings.public_dashboard_url);
  }

  lines.push("");
  return lines.join("\n");
}

function buildSignalHtml(signals) {
  return (signals || [])
    .map((signal) => {
      const style = signalCardStyle(signal.status);
      return `
        <div style="background:linear-gradient(180deg,#0f192d,#121f38);border:1px solid ${style.border};border-radius:18px;padding:14px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px ${style.glow};">
          <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#b6c5dd;margin-bottom:8px;">${escapeHtml(signal.label)}</div>
          <div style="font-size:20px;font-weight:700;color:#f8fbff;margin-bottom:6px;">${escapeHtml(signal.value)}</div>
          <div style="font-size:14px;line-height:1.5;color:#dbe6f6;">${escapeHtml(signal.note)}</div>
        </div>`;
    })
    .join("");
}

function buildSourceChipHtml(items, emptyLabel) {
  if (!items || items.length === 0) {
    return emptyLabel
      ? `<span style="display:inline-flex;align-items:center;border:1px solid rgba(255,255,255,0.08);border-radius:999px;padding:8px 12px;font-size:12px;color:#b6c5dd;background:rgba(255,255,255,0.03);">${escapeHtml(emptyLabel)}</span>`
      : "";
  }

  return items
    .map(
      (item) => `<span style="display:inline-flex;align-items:center;border:1px solid rgba(255,255,255,0.08);border-radius:999px;padding:8px 12px;font-size:12px;color:#eaf1fb;background:rgba(255,255,255,0.03);">${escapeHtml(item)}</span>`,
    )
    .join("");
}

function buildRouteHtml(items) {
  return (items || [])
    .slice(0, 3)
    .map(
      (item) => `
        <div style="border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:14px;background:rgba(255,255,255,0.03);">
          <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7cc7ff;font-weight:700;margin-bottom:8px;">${escapeHtml(item.label)}</div>
          <div style="font-size:16px;font-weight:700;color:#f8fbff;margin-bottom:8px;">${escapeHtml(item.title)}</div>
          <div style="font-size:14px;line-height:1.55;color:#dbe6f6;">${escapeHtml(item.note)}</div>
        </div>`,
    )
    .join("");
}

function buildPulseTileHtml(items) {
  return (items || [])
    .map(
      (item) => `
        <div style="border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:14px;background:linear-gradient(180deg,rgba(10,23,40,0.92),rgba(18,28,44,0.92));">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:10px;">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#b6c5dd;font-weight:700;">${escapeHtml(item.label)}</div>
            <div style="font-size:13px;font-weight:700;color:${item.direction === "down" ? "#7cc7ff" : "#73efc4"};">${escapeHtml(item.change)}</div>
          </div>
          <div style="font-size:28px;font-weight:700;color:#f8fbff;line-height:1;">${escapeHtml(item.value)}</div>
          <div style="margin-top:10px;font-size:14px;line-height:1.55;color:#dbe6f6;">${escapeHtml(item.note)}</div>
        </div>`,
    )
    .join("");
}

function buildHeatmapHtml(items) {
  const series = items || [];
  const maxValue = Math.max(...series.map((item) => Math.abs(item.value || 0)), 1);

  return series
    .map((item) => {
      const width = Math.max(10, Math.min(100, (Math.abs(item.value || 0) / maxValue) * 100));
      const color = item.direction === "down"
        ? "linear-gradient(90deg,rgba(115,239,196,0.7),rgba(124,199,255,0.92))"
        : "linear-gradient(90deg,rgba(255,197,107,0.7),rgba(255,125,116,0.92))";
      const prefix = Number(item.value) > 0 ? "+" : "";
      const suffix = item.unit ? ` ${item.unit}` : "%";

      return `
        <div style="display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,1.5fr) auto;gap:10px;align-items:center;">
          <div>
            <div style="font-size:14px;font-weight:700;color:#f8fbff;">${escapeHtml(item.label)}</div>
            <div style="font-size:12px;color:#b6c5dd;">${escapeHtml(item.theme || "")}</div>
          </div>
          <div style="height:12px;border-radius:999px;background:rgba(255,255,255,0.06);overflow:hidden;">
            <div style="width:${width}%;height:100%;border-radius:999px;background:${color};"></div>
          </div>
          <div style="font-size:13px;font-weight:700;color:${item.direction === "down" ? "#7cc7ff" : "#ffc56b"};">${escapeHtml(`${prefix}${item.value}${suffix}`)}</div>
        </div>`;
    })
    .join("");
}

function buildRiskRadarHtml(items) {
  return (items || [])
    .map((item) => {
      const color = item.tone === "hot"
        ? "linear-gradient(90deg,rgba(255,125,116,0.76),rgba(255,197,107,0.96))"
        : item.tone === "watch"
          ? "linear-gradient(90deg,rgba(124,199,255,0.76),rgba(255,197,107,0.92))"
          : "linear-gradient(90deg,rgba(115,239,196,0.76),rgba(124,199,255,0.92))";

      return `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:8px;">
            <div style="font-size:14px;font-weight:700;color:#f8fbff;">${escapeHtml(item.label)}</div>
            <div style="font-size:12px;color:#b6c5dd;font-weight:700;">${escapeHtml(`${item.score}/100`)}</div>
          </div>
          <div style="height:12px;border-radius:999px;background:rgba(255,255,255,0.06);overflow:hidden;">
            <div style="width:${Math.max(10, Math.min(100, item.score || 0))}%;height:100%;border-radius:999px;background:${color};"></div>
          </div>
          <div style="margin-top:8px;font-size:13px;line-height:1.55;color:#dbe6f6;">${escapeHtml(item.note)}</div>
        </div>`;
    })
    .join("");
}

function buildPrivateRadarHtml(data) {
  const metrics = (data.metrics || [])
    .map(
      (item) => `
        <div style="border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;background:rgba(255,255,255,0.04);">
          <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#b6c5dd;font-weight:700;">${escapeHtml(item.label)}</div>
          <div style="margin-top:8px;font-size:22px;font-weight:700;color:#f8fbff;">${escapeHtml(item.value)}</div>
          <div style="margin-top:8px;font-size:13px;line-height:1.5;color:#dbe6f6;">${escapeHtml(item.note)}</div>
        </div>`,
    )
    .join("");

  const bullets = (data.bullets || [])
    .map(
      (item) => `<div style="font-size:14px;line-height:1.6;color:#dbe6f6;padding-left:14px;position:relative;"><span style="position:absolute;left:0;top:8px;width:7px;height:7px;border-radius:50%;background:#ffa3d8;"></span>${escapeHtml(item)}</div>`,
    )
    .join("");

  const links = (data.links || [])
    .map(
      (item) => `<a href="${escapeHtml(item.url)}" style="color:#d8ff57;text-decoration:none;font-weight:700;">${escapeHtml(item.label)}</a>`,
    )
    .join(" &nbsp; ");

  return `
    <div style="font-size:18px;font-weight:700;color:#f8fbff;margin-bottom:10px;">${escapeHtml(data.title || "")}</div>
    <div style="font-size:14px;line-height:1.6;color:#dbe6f6;">${escapeHtml(data.summary || "")}</div>
    <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;">${metrics}</div>
    <div style="margin-top:14px;display:grid;gap:10px;">${bullets}</div>
    ${links ? `<div style="margin-top:14px;font-size:14px;">${links}</div>` : ""}`;
}

function buildStoryHtml(cards) {
  return (cards || [])
    .map((card, index) => {
      const accent = storyAccentColor(card.focusArea);
      const framingBlock =
        card.sourceTrail?.framing?.length > 0
          ? `<div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;">${buildSourceChipHtml(card.sourceTrail.framing, "")}</div>`
          : "";
      const sourceLink =
        card.links && card.links.length > 0
          ? `<a href="${escapeHtml(card.links[0].url)}" style="color:#d8ff57;text-decoration:none;font-weight:700;">Source anchor</a>`
          : "";
      const newsletterAngle =
        card.newsletterSignalMatch?.source
          ? `<div style="margin-top:12px;font-size:13px;line-height:1.55;color:#dbe6f6;"><strong>Newsletter angle:</strong> ${escapeHtml(card.newsletterSignalMatch.source)}${
              (card.newsletterSignalMatch.matchedHints || []).length > 0
                ? ` | ${escapeHtml(card.newsletterSignalMatch.matchedHints.join(", "))}`
                : ""
            }</div>`
          : "";

      return `
        <article style="background:#12213b;border:1px solid rgba(255,255,255,0.08);border-left:4px solid ${accent};border-radius:22px;padding:18px;margin-bottom:14px;">
          <div style="display:flex;align-items:flex-start;gap:14px;">
            <div style="width:46px;height:46px;border-radius:14px;background:linear-gradient(145deg,rgba(255,255,255,0.11),rgba(255,255,255,0.03));border:1px solid rgba(255,255,255,0.08);display:grid;place-items:center;font-size:17px;font-weight:700;color:#f8fbff;flex:none;">${index + 1}</div>
            <div style="min-width:0;flex:1;">
              <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#b6c5dd;margin-bottom:10px;">${escapeHtml(card.focusArea)} | ${escapeHtml(card.urgency)} | ${escapeHtml(card.readTime)}</div>
              <h3 style="margin:0 0 10px;font-size:24px;line-height:1.12;color:#f8fbff;">${escapeHtml(card.headline)}</h3>
              <p style="margin:0;font-size:16px;line-height:1.65;color:#f8fbff;"><strong>Takeaway:</strong> ${escapeHtml(card.takeaway)}</p>
            </div>
          </div>

          <div style="margin-top:14px;border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:14px;background:linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#d8ff57;font-weight:700;margin-bottom:8px;">Why this card matters</div>
            <div style="font-size:15px;line-height:1.6;color:#f8fbff;">${escapeHtml(card.whatChanged)}</div>
          </div>

          <div style="margin-top:12px;display:grid;gap:10px;">
            <div style="border-left:3px solid #7cc7ff;border-radius:14px;padding:12px 12px 12px 14px;background:rgba(255,255,255,0.025);">
              <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7cc7ff;font-weight:700;margin-bottom:6px;">Why now</div>
              <div style="font-size:15px;line-height:1.58;color:#f8fbff;">${escapeHtml(card.whyItMatters)}</div>
            </div>
            <div style="border-left:3px solid #ffc56b;border-radius:14px;padding:12px 12px 12px 14px;background:rgba(255,255,255,0.025);">
              <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#ffc56b;font-weight:700;margin-bottom:6px;">Market impact</div>
              <div style="font-size:15px;line-height:1.58;color:#f8fbff;">${escapeHtml(card.marketImpact)}</div>
            </div>
            <div style="border-left:3px solid #73efc4;border-radius:14px;padding:12px 12px 12px 14px;background:rgba(255,255,255,0.025);">
              <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#73efc4;font-weight:700;margin-bottom:6px;">Watch today</div>
              <div style="font-size:15px;line-height:1.58;color:#f8fbff;">${escapeHtml(card.watchToday)}</div>
            </div>
          </div>

          <div style="margin-top:12px;font-size:14px;line-height:1.6;color:#dbe6f6;"><strong>What smart people disagree on:</strong> ${escapeHtml(card.disagreement)}</div>
          <div style="margin-top:14px;display:flex;flex-wrap:wrap;gap:8px;">${buildSourceChipHtml(card.sourceTrail?.primary || [], "Tier 1 reporting only")}</div>
          ${framingBlock}
          ${newsletterAngle}
          ${
            sourceLink
              ? `<p style="margin:14px 0 0;font-size:14px;line-height:1.5;color:#b6c5dd;">${sourceLink}</p>`
              : ""
          }
        </article>`;
    })
    .join("");
}

function buildEmailHtml(data) {
  const dateLabel = formatDate(data.meta.generatedAt);
  const signalHtml = buildSignalHtml(data.scan.signals);
  const storyHtml = buildStoryHtml(data.essential.cards);
  const routeHtml = buildRouteHtml(data.commuteRoute);
  const pulseTileHtml = buildPulseTileHtml(data.pulse?.marketTiles || []);
  const heatmapHtml = buildHeatmapHtml(data.pulse?.heatmap || []);
  const riskRadarHtml = buildRiskRadarHtml(data.pulse?.riskRadar || []);
  const privateRadarHtml = buildPrivateRadarHtml(data.pulse?.privateRadar || {});
  const activeFraming = (data.sourceStack || []).filter((item) => item.tier !== "Tier 1").map((item) => item.name);
  const primarySources = (data.sourceStack || []).filter((item) => item.tier === "Tier 1").map((item) => item.name);

  const dashboardHtml = publishingSettings.public_dashboard_url
    ? `<p style="margin:18px 0 0;font-size:15px;"><a href="${escapeHtml(publishingSettings.public_dashboard_url)}" style="color:#d8ff57;text-decoration:none;font-weight:700;">Open the dashboard</a></p>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Morning Brief</title>
</head>
<body style="margin:0;background:#08101b;font-family:'Segoe UI',Arial,sans-serif;color:#f8fbff;">
  <div style="background:linear-gradient(180deg,#08101b 0%,#0f2041 100%);padding:24px 12px;">
    <div style="max-width:720px;margin:0 auto;">
      <section style="background:linear-gradient(145deg,rgba(216,255,87,0.14),rgba(124,199,255,0.12));border:1px solid rgba(255,255,255,0.1);border-radius:28px;padding:24px 20px;margin-bottom:18px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#d8ff57;font-weight:700;margin-bottom:10px;">Morning Intelligence Brief</div>
        <h1 style="margin:0 0 12px;font-size:34px;line-height:1.02;">${escapeHtml(data.thesis.headline)}</h1>
        <p style="margin:0 0 12px;font-size:16px;line-height:1.65;color:#dbe6f6;">${escapeHtml(data.thesis.summary)}</p>
        <div style="font-size:13px;color:#b6c5dd;">${escapeHtml(dateLabel)} | ${escapeHtml(String(data.meta.estimatedReadMinutes))}-minute read | ${escapeHtml(data.meta.commuteMode)}</div>
        <div style="margin-top:16px;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:14px;background:rgba(5,10,18,0.28);">
          <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#ffc56b;font-weight:700;margin-bottom:8px;">Lock this in</div>
          <div style="font-size:18px;font-weight:700;line-height:1.35;color:#f8fbff;margin-bottom:6px;">${escapeHtml(data.thesis.edgeCallout.title)}</div>
          <div style="font-size:14px;line-height:1.55;color:#dbe6f6;">${escapeHtml(data.thesis.edgeCallout.note)}</div>
        </div>
      </section>

      <section style="background:#101a2d;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:18px;margin-bottom:18px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#73efc4;font-weight:700;margin-bottom:10px;">Overnight pulse</div>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#dbe6f6;">${escapeHtml(data.pulse?.intro || "")}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">${pulseTileHtml}</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:14px;">
          <div style="border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:14px;background:rgba(255,255,255,0.03);">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7cc7ff;font-weight:700;margin-bottom:8px;">Cross-asset heat</div>
            <div style="font-size:13px;line-height:1.5;color:#b6c5dd;margin-bottom:12px;">${escapeHtml(data.pulse?.sourceLabel || "")}</div>
            <div style="display:grid;gap:10px;">${heatmapHtml}</div>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:14px;background:rgba(255,255,255,0.03);">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#ffc56b;font-weight:700;margin-bottom:8px;">Risk radar</div>
            ${riskRadarHtml}
          </div>
        </div>
      </section>

      <section style="background:#101a2d;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:18px;margin-bottom:18px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#ffa3d8;font-weight:700;margin-bottom:10px;">Private market radar</div>
        ${privateRadarHtml}
      </section>

      <section style="background:#101a2d;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:18px;margin-bottom:18px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#ffc56b;font-weight:700;margin-bottom:10px;">60-second scan</div>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#f8fbff;"><strong>Market mood:</strong> ${escapeHtml(data.thesis.marketMood.label)}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;">${signalHtml}</div>
        <div style="margin-top:14px;display:grid;gap:12px;">
          <div style="border:1px solid rgba(255,125,116,0.18);border-radius:18px;padding:14px;background:linear-gradient(180deg,rgba(36,16,16,0.9),rgba(17,27,44,0.9));">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#ffb3ad;font-weight:700;margin-bottom:8px;">Ignore the noise</div>
            <div style="font-size:15px;line-height:1.6;color:#dbe6f6;">${escapeHtml(data.scan.ignoreNoise.summary)}</div>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:14px;background:rgba(255,255,255,0.03);">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7cc7ff;font-weight:700;margin-bottom:8px;">Source mode today</div>
            <div style="font-size:14px;line-height:1.6;color:#f8fbff;margin-bottom:6px;"><strong>${escapeHtml(data.pulse?.sourceMode?.headline || "")}</strong></div>
            <div style="font-size:14px;line-height:1.6;color:#dbe6f6;margin-bottom:6px;">${escapeHtml(data.pulse?.sourceMode?.summary || "")}</div>
            <div style="font-size:14px;line-height:1.6;color:#dbe6f6;"><strong>Primary anchors:</strong> ${escapeHtml(joinOrFallback(primarySources))}</div>
            <div style="font-size:14px;line-height:1.6;color:#dbe6f6;margin-top:6px;"><strong>Active framing inputs:</strong> ${escapeHtml(joinOrFallback(activeFraming, "No editorial newsletter issue available yet"))}</div>
          </div>
        </div>
      </section>

      <section style="background:#101a2d;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:18px;margin-bottom:18px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7cc7ff;font-weight:700;margin-bottom:10px;">Commute route</div>
        <div style="display:grid;gap:10px;">${routeHtml}</div>
      </section>

      ${storyHtml}

      <section style="background:#101a2d;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:18px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#ffa3d8;font-weight:700;margin-bottom:10px;">15-minute edge layer</div>
        <div style="display:grid;gap:10px;">
          <div style="border:1px solid rgba(216,255,87,0.16);border-radius:18px;padding:14px;background:linear-gradient(180deg,rgba(17,30,8,0.92),rgba(17,27,42,0.94));">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#d8ff57;font-weight:700;margin-bottom:8px;">What your peers will miss</div>
            <div style="font-size:15px;line-height:1.6;color:#dbe6f6;"><strong>${escapeHtml(data.edge.peerMiss.title)}</strong> ${escapeHtml(data.edge.peerMiss.body)}</div>
          </div>
          <div style="border:1px solid rgba(255,197,107,0.16);border-radius:18px;padding:14px;background:linear-gradient(180deg,rgba(40,28,11,0.92),rgba(18,28,44,0.94));">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#ffc56b;font-weight:700;margin-bottom:8px;">Say this in a meeting</div>
            <div style="font-size:16px;line-height:1.6;color:#f8fbff;">${escapeHtml(data.edge.sayInMeeting.body)}</div>
          </div>
          <div style="border:1px solid rgba(124,199,255,0.16);border-radius:18px;padding:14px;background:linear-gradient(180deg,rgba(10,25,40,0.92),rgba(18,28,44,0.94));">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7cc7ff;font-weight:700;margin-bottom:8px;">Chart of the day</div>
            <div style="font-size:15px;line-height:1.6;color:#dbe6f6;"><strong>${escapeHtml(data.edge.chartOfDay.title)}</strong> ${escapeHtml(data.edge.chartOfDay.body)} ${escapeHtml(data.edge.chartOfDay.takeaway)}</div>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:14px;background:rgba(255,255,255,0.03);">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#b6c5dd;font-weight:700;margin-bottom:8px;">Durable frame</div>
            <div style="font-size:15px;line-height:1.6;color:#f8fbff;">${escapeHtml(data.footerPerspective.summary)}</div>
          </div>
        </div>
        ${dashboardHtml}
      </section>
    </div>
  </div>
</body>
</html>`;
}

function writeFile(relativePath, contents) {
  const target = path.join(projectRoot, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents, "utf8");
}

function main() {
  const subject = `Morning Brief | ${formatDate(briefing.meta.generatedAt)}`;
  writeFile(path.join("outputs", "newsletter", "latest-briefing.md"), buildMarkdown(briefing));
  writeFile(path.join("outputs", "email", "latest-email.md"), buildEmailMarkdown(briefing));
  writeFile(path.join("outputs", "email", "latest-email.html"), buildEmailHtml(briefing));
  writeFile(path.join("outputs", "email", "latest-email-subject.txt"), `${subject}\n`);
  console.log(`Rendered outputs for ${subject}`);
}

main();
