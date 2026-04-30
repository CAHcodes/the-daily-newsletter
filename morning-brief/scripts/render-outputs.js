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

function formatCoverageTopic(value) {
  return String(value || "markets")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" / ");
}

function joinOrFallback(items, fallback = "None listed") {
  return items && items.length > 0 ? items.join(", ") : fallback;
}

function buildMarkdown(data) {
  const dateLabel = formatDate(data.meta.generatedAt);
  const lines = [
    `# ${data.meta.productLabel} | ${dateLabel}`,
    "",
    data.thesis.summary,
    "",
    "## Top Of The Morning",
    "",
    `**${data.leadStory.headline}**`,
    "",
    data.leadStory.deck,
    "",
    `- **Why it leads:** ${data.leadStory.whyItLeads}`,
    `- **Why it matters:** ${data.leadStory.marketRead}`,
    `- **What to watch:** ${data.leadStory.watchToday}`,
  ];

  if (data.leadStory.link) {
    lines.push(`- **Open lead story:** ${data.leadStory.link}`);
  }

  lines.push("", "## Markets & Rates", "", data.marketDesk.summary, "");

  (data.marketDesk.tiles || []).forEach((tile) => {
    lines.push(`- **${tile.label}:** ${tile.value} (${tile.change}). ${tile.note}`);
  });

  if ((data.marketDesk.keyLines || []).length > 0) {
    lines.push("", "### Desk Take", "");
    data.marketDesk.keyLines.forEach((line) => {
      lines.push(`- **${line.label}:** ${line.text}`);
    });
  }

  lines.push("", "## Top Stories", "");

  (data.topStories.cards || []).forEach((card, index) => {
    lines.push(
      `### ${index + 1}. ${card.headline}`,
      "",
      `- **Topic:** ${formatCoverageTopic(card.coverageTopic)} | ${card.focusArea} | ${card.readTime}`,
      `- **Takeaway:** ${card.takeaway}`,
      `- **What changed:** ${card.whatChanged}`,
      `- **Why it matters:** ${card.whyItMatters}`,
      `- **Watch next:** ${card.watchToday}`,
      `- **Why smart people disagree:** ${card.disagreement}`,
    );

    if (card.primaryLink?.url) {
      lines.push(`- **Open article:** ${card.primaryLink.url}`);
    }

    lines.push("");
  });

  lines.push("## Top From The Sources", "");

  (data.sourceDesk.sections || []).forEach((section) => {
    lines.push(
      `- **${section.shortName}:** ${section.headline}`,
      `  ${section.summary}`,
      `  Open: ${section.url}`,
    );
  });

  lines.push("", "## From Your Inbox", "");

  (data.newsletterDesk.briefs || []).forEach((brief) => {
    lines.push(`### ${brief.name} | ${brief.freshnessLabel}`, "");
    lines.push(`**${brief.subject}**`);
    lines.push(brief.summary);
    lines.push("");
    (brief.signalLines || []).forEach((line) => lines.push(`- ${line}`));
    if (brief.displayUrl) {
      lines.push(`- Open in Gmail: ${brief.displayUrl}`);
    }
    lines.push("");
  });

  if (data.newsletterDesk.note) {
    lines.push(`Note: ${data.newsletterDesk.note}`, "");
  }

  lines.push(`Durable frame: ${data.footerPerspective.summary}`, "");
  return lines.join("\n");
}

function buildEmailMarkdown(data) {
  const dateLabel = formatDate(data.meta.generatedAt);
  const lines = [
    `${data.meta.productLabel} | ${dateLabel}`,
    "",
    data.thesis.summary,
    "",
    "Top of the morning",
    "",
    `${data.leadStory.headline}`,
    `${data.leadStory.deck}`,
    `Why it matters: ${data.leadStory.marketRead}`,
    `Watch: ${data.leadStory.watchToday}`,
  ];

  if (data.leadStory.link) {
    lines.push(`Open lead story: ${data.leadStory.link}`);
  }

  lines.push("", "Markets & rates", "");
  (data.marketDesk.tiles || []).slice(0, 6).forEach((tile) => {
    lines.push(`- ${tile.label}: ${tile.value} (${tile.change}) - ${tile.note}`);
  });

  lines.push("", "Top stories", "");
  (data.topStories.cards || []).forEach((card, index) => {
    lines.push(
      `${index + 1}. ${card.headline}`,
      `Takeaway: ${card.takeaway}`,
      `Why it matters: ${card.whyItMatters}`,
      `Watch: ${card.watchToday}`,
    );
    if (card.primaryLink?.url) {
      lines.push(`Open article: ${card.primaryLink.url}`);
    }
    lines.push("");
  });

  lines.push("Best from the sources", "");
  (data.sourceDesk.sections || []).forEach((section) => {
    lines.push(`- ${section.shortName}: ${section.headline}`);
  });

  lines.push("", "From your inbox", "");
  (data.newsletterDesk.briefs || []).forEach((brief) => {
    lines.push(`- ${brief.name}: ${brief.subject} (${brief.freshnessLabel})`);
  });

  if (publishingSettings.public_dashboard_url) {
    lines.push("", "Dashboard:", publishingSettings.public_dashboard_url);
  }

  lines.push("");
  return lines.join("\n");
}

function buildMarketTileHtml(items) {
  return (items || [])
    .map(
      (item) => `
        <div style="border:1px solid #d8d0c5;background:#fffdf9;padding:14px;">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#8a8278;font-weight:700;">${escapeHtml(item.label)}</div>
            <div style="font-size:13px;font-weight:700;color:${item.direction === "down" ? "#9a4a34" : "#23684a"};">${escapeHtml(item.change)}</div>
          </div>
          <div style="margin-top:12px;font-size:28px;font-weight:700;color:#1d1b18;">${escapeHtml(item.value)}</div>
          <div style="margin-top:8px;font-size:14px;line-height:1.55;color:#6a6259;">${escapeHtml(item.note)}</div>
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
        ? "linear-gradient(90deg,#f1d7cc,#9a4a34)"
        : "linear-gradient(90deg,#d6eadf,#4d7d63)";
      const prefix = Number(item.value) > 0 ? "+" : "";

      return `
        <div style="display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,1.5fr) auto;gap:10px;align-items:center;">
          <div>
            <div style="font-size:14px;font-weight:700;color:#1d1b18;">${escapeHtml(item.label)}</div>
            <div style="font-size:12px;color:#8a8278;">${escapeHtml(item.theme || "")}</div>
          </div>
          <div style="height:10px;border-radius:999px;background:#ece5db;overflow:hidden;">
            <div style="width:${width}%;height:100%;background:${color};"></div>
          </div>
          <div style="font-size:13px;font-weight:700;color:${item.direction === "down" ? "#9a4a34" : "#23684a"};">${escapeHtml(`${prefix}${item.value}${item.unit ? ` ${item.unit}` : "%"}`)}</div>
        </div>`;
    })
    .join("");
}

function buildSourceChips(items, background) {
  return (items || [])
    .map(
      (item) => `<span style="display:inline-flex;align-items:center;padding:7px 10px;border:1px solid #d8d0c5;background:${background};font-size:12px;color:#6a6259;">${escapeHtml(item)}</span>`,
    )
    .join("");
}

function buildStoryHtml(cards) {
  return (cards || [])
    .map((card, index) => `
      <article style="border:1px solid #d8d0c5;background:#fffdf9;padding:16px;margin-bottom:12px;">
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
          <span style="display:inline-flex;align-items:center;padding:7px 10px;border:1px solid #c5bcaf;background:#fbf4e2;font-size:12px;font-weight:700;color:#1d1b18;">${String(index + 1).padStart(2, "0")}</span>
          <span style="display:inline-flex;align-items:center;padding:7px 10px;border:1px solid #d8d0c5;background:#fffefb;font-size:12px;color:#6a6259;">${escapeHtml(formatCoverageTopic(card.coverageTopic))}</span>
          <span style="display:inline-flex;align-items:center;padding:7px 10px;border:1px solid #d8d0c5;background:#fffefb;font-size:12px;color:#6a6259;">${escapeHtml(card.readTime)}</span>
        </div>
        <h3 style="margin:0;font-family:Georgia,serif;font-size:28px;line-height:1.08;color:#1d1b18;">${escapeHtml(card.headline)}</h3>
        <p style="margin:10px 0 0;font-size:16px;line-height:1.65;color:#1d1b18;">${escapeHtml(card.takeaway)}</p>
        <div style="margin-top:14px;display:grid;gap:10px;">
          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#8a8278;font-weight:700;margin-bottom:4px;">What changed</div>
            <div style="font-size:14px;line-height:1.6;color:#6a6259;">${escapeHtml(card.whatChanged)}</div>
          </div>
          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#8a8278;font-weight:700;margin-bottom:4px;">Why it matters</div>
            <div style="font-size:14px;line-height:1.6;color:#6a6259;">${escapeHtml(card.whyItMatters)}</div>
          </div>
          <div>
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#8a8278;font-weight:700;margin-bottom:4px;">Watch next</div>
            <div style="font-size:14px;line-height:1.6;color:#6a6259;">${escapeHtml(card.watchToday)}</div>
          </div>
        </div>
        <div style="margin-top:14px;font-size:14px;line-height:1.6;color:#6a6259;"><strong style="color:#1d1b18;">Why smart people disagree:</strong> ${escapeHtml(card.disagreement)}</div>
        <div style="margin-top:14px;display:flex;flex-wrap:wrap;gap:8px;">
          ${buildSourceChips(card.sourceTrail?.primary || [], "#edf4fa")}
          ${buildSourceChips(card.sourceTrail?.framing || [], "#fffefb")}
        </div>
        ${
          card.primaryLink?.url
            ? `<div style="margin-top:14px;"><a href="${escapeHtml(card.primaryLink.url)}" style="display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:10px 14px;background:#1d1b18;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;">Open main article</a></div>`
            : ""
        }
      </article>`)
    .join("");
}

function buildSourceDeskHtml(sections) {
  return (sections || [])
    .map((section) => `
      <article style="border:1px solid #d8d0c5;background:#fffdf9;padding:16px;">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:start;flex-wrap:wrap;">
          <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6a6259;font-weight:700;">${escapeHtml(section.shortName || section.source)}</div>
          <div style="font-size:12px;color:#6a6259;border:1px solid #d8d0c5;padding:7px 10px;background:#fffefb;">${escapeHtml(formatCoverageTopic(section.coverageTopic))}</div>
        </div>
        <h3 style="margin:10px 0 0;font-family:Georgia,serif;font-size:24px;line-height:1.12;color:#1d1b18;">${escapeHtml(section.headline)}</h3>
        <p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:#1d1b18;">${escapeHtml(section.summary)}</p>
        <p style="margin:10px 0 0;font-size:14px;line-height:1.6;color:#6a6259;">${escapeHtml(section.note)}</p>
        ${
          section.url
            ? `<div style="margin-top:12px;"><a href="${escapeHtml(section.url)}" style="display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:9px 13px;border:1px solid #d8d0c5;background:#fffefb;color:#1d1b18;text-decoration:none;font-size:13px;font-weight:700;">Open at ${escapeHtml(section.shortName || section.source)}</a></div>`
            : ""
        }
      </article>`)
    .join("");
}

function buildNewsletterHtml(items) {
  return (items || [])
    .map((brief) => `
      <article style="border:1px solid #d8d0c5;background:#fffdf9;padding:16px;">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:start;flex-wrap:wrap;">
          <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#1d1b18;font-weight:700;">${escapeHtml(brief.name)}</div>
          <div style="font-size:12px;color:#6a6259;border:1px solid #d8d0c5;padding:7px 10px;background:#fffefb;">${escapeHtml(brief.freshnessLabel)}</div>
        </div>
        <h3 style="margin:10px 0 0;font-family:Georgia,serif;font-size:24px;line-height:1.12;color:#1d1b18;">${escapeHtml(brief.subject)}</h3>
        <p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:#1d1b18;">${escapeHtml(brief.summary)}</p>
        <div style="margin-top:12px;display:grid;gap:8px;">
          ${(brief.signalLines || [])
            .map(
              (line) => `
                <div style="display:grid;grid-template-columns:6px 1fr;gap:8px;align-items:start;">
                  <span style="display:block;width:6px;height:6px;margin-top:8px;border-radius:50%;background:#335c7d;"></span>
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#6a6259;">${escapeHtml(line)}</p>
                </div>`,
            )
            .join("")}
        </div>
        <p style="margin:12px 0 0;font-size:13px;line-height:1.55;color:#8a8278;">${escapeHtml(brief.arrivalNote || "")}</p>
        ${
          brief.displayUrl
            ? `<div style="margin-top:12px;"><a href="${escapeHtml(brief.displayUrl)}" style="display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:9px 13px;border:1px solid #d8d0c5;background:#fffefb;color:#1d1b18;text-decoration:none;font-size:13px;font-weight:700;">Open in Gmail</a></div>`
            : ""
        }
      </article>`)
    .join("");
}

function buildEmailHtml(data) {
  const dateLabel = formatDate(data.meta.generatedAt);
  const dashboardHtml = publishingSettings.public_dashboard_url
    ? `<p style="margin:18px 0 0;font-size:15px;"><a href="${escapeHtml(publishingSettings.public_dashboard_url)}" style="color:#1d1b18;text-decoration:none;font-weight:700;border-bottom:1px solid #1d1b18;">Open the dashboard</a></p>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(data.meta.productLabel)}</title>
</head>
<body style="margin:0;background:#f3eee6;font-family:Georgia,serif;color:#1d1b18;">
  <div style="padding:20px 12px;">
    <div style="max-width:760px;margin:0 auto;">
      <section style="border:1px solid #d8d0c5;background:#fffdf9;padding:22px;">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;border-bottom:1px solid #d8d0c5;padding-bottom:14px;">
          <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;">${escapeHtml(data.meta.productLabel)}</div>
          <div style="font-size:12px;color:#6a6259;">${escapeHtml(data.meta.editionLabel)}</div>
        </div>
        <h1 style="margin:18px 0 0;font-size:44px;line-height:1.02;font-weight:600;">${escapeHtml(data.meta.productLabel)}</h1>
        <p style="margin:12px 0 0;font-size:17px;line-height:1.7;color:#6a6259;font-family:'Segoe UI',Arial,sans-serif;">${escapeHtml(data.thesis.summary)}</p>
        <div style="margin-top:16px;font-size:14px;color:#6a6259;font-family:'Segoe UI',Arial,sans-serif;">${escapeHtml(dateLabel)} | ${escapeHtml(String(data.meta.estimatedReadMinutes))}-minute read | ${escapeHtml(data.meta.commuteMode)}</div>
        ${dashboardHtml}
      </section>

      <section style="margin-top:14px;border:1px solid #d8d0c5;background:#fffdf9;padding:18px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6a6259;font-weight:700;">Top Of The Morning</div>
        <h2 style="margin:10px 0 0;font-size:34px;line-height:1.06;">${escapeHtml(data.leadStory.headline)}</h2>
        <p style="margin:10px 0 0;font-size:16px;line-height:1.65;color:#1d1b18;font-family:'Segoe UI',Arial,sans-serif;">${escapeHtml(data.leadStory.deck)}</p>
        <div style="margin-top:14px;display:grid;gap:10px;font-family:'Segoe UI',Arial,sans-serif;">
          <div><strong>Why it leads:</strong> ${escapeHtml(data.leadStory.whyItLeads)}</div>
          <div><strong>Why it matters:</strong> ${escapeHtml(data.leadStory.marketRead)}</div>
          <div><strong>What to watch:</strong> ${escapeHtml(data.leadStory.watchToday)}</div>
        </div>
        ${
          data.leadStory.link
            ? `<div style="margin-top:14px;"><a href="${escapeHtml(data.leadStory.link)}" style="display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:10px 14px;background:#1d1b18;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;font-family:'Segoe UI',Arial,sans-serif;">Open lead story</a></div>`
            : ""
        }
      </section>

      <section style="margin-top:14px;border:1px solid #d8d0c5;background:#fffdf9;padding:18px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6a6259;font-weight:700;">Markets & Rates</div>
        <p style="margin:10px 0 0;font-size:15px;line-height:1.65;color:#6a6259;font-family:'Segoe UI',Arial,sans-serif;">${escapeHtml(data.marketDesk.summary)}</p>
        <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;">${buildMarketTileHtml(data.marketDesk.tiles || [])}</div>
        <div style="margin-top:14px;border:1px solid #d8d0c5;background:#fffdfa;padding:14px;">
          <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6a6259;font-weight:700;">Cross-Asset Board</div>
          <p style="margin:8px 0 0;font-size:13px;line-height:1.55;color:#8a8278;font-family:'Segoe UI',Arial,sans-serif;">Anchored to ${escapeHtml(data.marketDesk.sourceLabel || "today's market board")}.</p>
          <div style="margin-top:12px;display:grid;gap:10px;font-family:'Segoe UI',Arial,sans-serif;">${buildHeatmapHtml(data.marketDesk.heatmap || [])}</div>
        </div>
      </section>

      <section style="margin-top:14px;border:1px solid #d8d0c5;background:#fffdf9;padding:18px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6a6259;font-weight:700;">Top Stories</div>
        <div style="margin-top:14px;font-family:'Segoe UI',Arial,sans-serif;">${buildStoryHtml(data.topStories.cards || [])}</div>
      </section>

      <section style="margin-top:14px;border:1px solid #d8d0c5;background:#fffdf9;padding:18px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6a6259;font-weight:700;">Top From The Sources</div>
        <div style="margin-top:14px;display:grid;gap:10px;font-family:'Segoe UI',Arial,sans-serif;">${buildSourceDeskHtml(data.sourceDesk.sections || [])}</div>
      </section>

      <section style="margin-top:14px;border:1px solid #d8d0c5;background:#fffdf9;padding:18px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6a6259;font-weight:700;">From Your Inbox</div>
        <p style="margin:10px 0 0;font-size:15px;line-height:1.65;color:#6a6259;font-family:'Segoe UI',Arial,sans-serif;">${escapeHtml(data.newsletterDesk.note || "")}</p>
        <div style="margin-top:14px;display:grid;gap:10px;font-family:'Segoe UI',Arial,sans-serif;">${buildNewsletterHtml(data.newsletterDesk.briefs || [])}</div>
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
  const subject = `${briefing.meta.productLabel} | ${formatDate(briefing.meta.generatedAt)}`;
  writeFile(path.join("outputs", "newsletter", "latest-briefing.md"), buildMarkdown(briefing));
  writeFile(path.join("outputs", "email", "latest-email.md"), buildEmailMarkdown(briefing));
  writeFile(path.join("outputs", "email", "latest-email.html"), buildEmailHtml(briefing));
  writeFile(path.join("outputs", "email", "latest-email-subject.txt"), `${subject}\n`);
  console.log(`Rendered outputs for ${subject}`);
}

main();
