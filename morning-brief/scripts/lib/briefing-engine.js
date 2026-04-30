function safeNumber(value) {
  return Number.isFinite(value) ? value : 0;
}

function scoreCandidate(candidate, weights) {
  const scores = candidate.scores || {};
  let total = 0;

  Object.entries(weights).forEach(([key, weight]) => {
    total += safeNumber(scores[key]) * weight;
  });

  return Number(total.toFixed(2));
}

function rankCandidates(candidates, rankingConfig) {
  return candidates
    .map((candidate) => ({
      ...candidate,
      engineScore: scoreCandidate(candidate, rankingConfig.weights || {}),
    }))
    .sort((a, b) => b.engineScore - a.engineScore);
}

function takeTopByBucket(ranked, bucket, count, selectedIds) {
  const chosen = [];

  ranked.forEach((candidate) => {
    if (chosen.length >= count) {
      return;
    }

    if (candidate.bucket === bucket && !selectedIds.has(candidate.id)) {
      chosen.push(candidate);
      selectedIds.add(candidate.id);
    }
  });

  return chosen;
}

function takeTopByField(ranked, field, value, count, selectedIds) {
  const chosen = [];

  ranked.forEach((candidate) => {
    if (chosen.length >= count) {
      return;
    }

    if (candidate[field] === value && !selectedIds.has(candidate.id)) {
      chosen.push(candidate);
      selectedIds.add(candidate.id);
    }
  });

  return chosen;
}

function countSelectedByField(selected, field, value) {
  return selected.filter((candidate) => candidate[field] === value).length;
}

function fillRemaining(ranked, desiredCards, selectedIds) {
  const chosen = [];

  ranked.forEach((candidate) => {
    if (chosen.length >= desiredCards) {
      return;
    }

    if (!selectedIds.has(candidate.id)) {
      chosen.push(candidate);
      selectedIds.add(candidate.id);
    }
  });

  return chosen;
}

function selectCandidates(ranked, rankingConfig) {
  const selectedIds = new Set();
  const selected = [];
  const minimumByTopic = rankingConfig.minimumByTopic || {};
  const minimumByBucket = rankingConfig.minimumByBucket || {};

  Object.entries(minimumByTopic).forEach(([topic, count]) => {
    const existing = countSelectedByField(selected, "coverageTopic", topic);
    const needed = Math.max(0, count - existing);
    selected.push(...takeTopByField(ranked, "coverageTopic", topic, needed, selectedIds));
  });

  Object.entries(minimumByBucket).forEach(([bucket, count]) => {
    const existing = countSelectedByField(selected, "bucket", bucket);
    const needed = Math.max(0, count - existing);
    selected.push(...takeTopByBucket(ranked, bucket, needed, selectedIds));
  });

  const remainingCount = Math.max(0, (rankingConfig.desiredCards || 6) - selected.length);
  selected.push(...fillRemaining(ranked, remainingCount, selectedIds));

  return selected
    .sort((a, b) => b.engineScore - a.engineScore)
    .slice(0, rankingConfig.desiredCards || 6);
}

function uniqueValues(items) {
  return [...new Set((items || []).filter(Boolean))];
}

function buildSourceFocus(selected, sourceFocusCount) {
  const primary = [];
  const framing = [];

  selected.forEach((candidate) => {
    primary.push(...(candidate.primaryReporting || []));
    framing.push(...(candidate.framingInputs || []));
  });

  return uniqueValues([...primary, ...framing]).slice(0, sourceFocusCount);
}

function buildSignalBoard(ranked, signalCount) {
  return ranked
    .filter((candidate) => candidate.signal)
    .slice(0, signalCount)
    .map((candidate) => candidate.signal);
}

function buildSourceStack(sourceCatalog, selected) {
  const usedSources = new Set();

  selected.forEach((candidate) => {
    (candidate.primaryReporting || []).forEach((source) => usedSources.add(source));
    (candidate.framingInputs || []).forEach((source) => usedSources.add(source));
  });

  return (sourceCatalog || []).filter((source) => usedSources.has(source.name));
}

function buildEssentialCards(selected) {
  return selected.map((candidate) => ({
    id: candidate.id,
    coverageTopic: candidate.coverageTopic || "",
    focusArea: candidate.focusArea,
    urgency: candidate.urgency,
    readTime: candidate.readTime,
    headline: candidate.headline,
    takeaway: candidate.takeaway,
    whatChanged: candidate.whatChanged,
    whyItMatters: candidate.whyItMatters,
    marketImpact: candidate.marketImpact,
    disagreement: candidate.disagreement,
    watchToday: candidate.watchToday,
    tags: candidate.tags || [],
    sourceTrail: {
      primary: candidate.primaryReporting || [],
      framing: candidate.framingInputs || [],
    },
    newsletterSignalMatch: candidate.newsletterSignalMatch || null,
    links: candidate.links || [],
    primaryLink: candidate.links?.[0] || null,
    visual: candidate.visual || null,
    evidence: candidate.evidence || [],
    engineScore: candidate.engineScore,
  }));
}

function buildCompiledDebug(ranked, selected) {
  return {
    generatedAt: new Date().toISOString(),
    rankedCandidates: ranked.map((candidate) => ({
      id: candidate.id,
      headline: candidate.headline,
      bucket: candidate.bucket,
      coverageTopic: candidate.coverageTopic || "",
      engineScore: candidate.engineScore,
      newsletterSignalMatch: candidate.newsletterSignalMatch || null,
    })),
    selectedCandidates: selected.map((candidate) => ({
      id: candidate.id,
      headline: candidate.headline,
      bucket: candidate.bucket,
      coverageTopic: candidate.coverageTopic || "",
      engineScore: candidate.engineScore,
      newsletterSignalMatch: candidate.newsletterSignalMatch || null,
    })),
  };
}

function shortSourceName(source) {
  const labels = {
    "The Wall Street Journal": "WSJ",
    "Associated Press": "AP",
    "Financial Times": "FT",
  };

  return labels[source] || source;
}

function buildLeadStory(selected, thesis) {
  const card = selected[0];

  if (!card) {
    return {
      headline: thesis?.headline || "No lead story loaded.",
      deck: thesis?.summary || "",
      whyItLeads: "",
      marketRead: "",
      watchToday: "",
      focusArea: "",
      coverageTopic: "",
      sourceLabel: "",
      sourceTrail: { primary: [], framing: [] },
      visual: { points: [] },
      link: "",
      readTime: "",
    };
  }

  return {
    headline: card.headline,
    deck: card.takeaway,
    whyItLeads: card.whatChanged,
    marketRead: card.whyItMatters,
    watchToday: card.watchToday,
    focusArea: card.focusArea,
    coverageTopic: card.coverageTopic,
    sourceLabel: shortSourceName(card.primaryReporting?.[0] || ""),
    sourceTrail: {
      primary: card.primaryReporting || [],
      framing: card.framingInputs || [],
    },
    visual: card.visual || { points: [] },
    link: card.links?.[0]?.url || "",
    readTime: card.readTime,
  };
}

function buildMarketDesk(context, selected, thesis) {
  const oilCard = selected.find((candidate) => candidate.id === "oil-macro-bridge");
  const ratesCard = selected.find((candidate) => candidate.coverageTopic === "economy-rates");
  const aiCard = selected.find((candidate) => candidate.coverageTopic === "ai-tech");
  const privateRadar = context.pulse?.privateRadar || {};

  return {
    title: "Markets & Rates",
    intro: "A quick board before the longer read.",
    summary: thesis?.marketMood?.note || "",
    asOf: context.pulse?.asOf || "",
    sourceLabel: context.pulse?.sourceLabel || "",
    tiles: context.pulse?.marketTiles || [],
    heatmap: context.pulse?.heatmap || [],
    keyLines: [
      oilCard
        ? {
            label: "Energy",
            text: oilCard.takeaway,
            url: oilCard.links?.[0]?.url || "",
          }
        : null,
      ratesCard
        ? {
            label: "Rates",
            text: ratesCard.takeaway,
            url: ratesCard.links?.[0]?.url || "",
          }
        : null,
      aiCard
        ? {
            label: "AI & Private Markets",
            text: privateRadar.summary || aiCard.takeaway,
            url: privateRadar.links?.[0]?.url || aiCard.links?.[0]?.url || "",
          }
        : null,
    ].filter(Boolean),
  };
}

function buildSourceDesk(selected) {
  const preferredSources = [
    "Bloomberg",
    "The Wall Street Journal",
    "Reuters",
    "Associated Press",
    "Financial Times",
    "CNBC",
  ];
  const usedCandidateIds = new Set();

  const sections = preferredSources
    .map((source) => {
      let candidate = selected.find(
        (item) => !usedCandidateIds.has(item.id) && (item.primaryReporting || []).includes(source),
      );

      if (!candidate) {
        candidate = selected.find((item) => (item.primaryReporting || []).includes(source));
      }

      if (!candidate) {
        return null;
      }

      usedCandidateIds.add(candidate.id);
      const evidence = (candidate.evidence || []).find((item) => item.source === source);
      return {
        source,
        shortName: shortSourceName(source),
        headline: evidence?.headline || candidate.headline,
        summary: candidate.takeaway,
        note: candidate.whyItMatters,
        relatedHeadline: candidate.headline,
        coverageTopic: candidate.coverageTopic,
        url: evidence?.url || candidate.links?.[0]?.url || "",
      };
    })
    .filter(Boolean);

  return {
    title: "Top From the Sources",
    intro: "One useful click from each major desk.",
    sections,
  };
}

function buildNewsletterDesk(context) {
  return {
    title: "From Your Inbox",
    intro: "Short summaries of the newsletters already sitting in Gmail.",
    note: context.newsletterDeskNote || "",
    briefs: context.newsletterBriefs || [],
  };
}

function buildBriefingData(staging, rankingConfig) {
  const ranked = rankCandidates(staging.candidates || [], rankingConfig);
  const selected = selectCandidates(ranked, rankingConfig);
  const context = staging.briefingContext || {};
  const edition = staging.edition || {};
  const essentialCards = buildEssentialCards(selected);

  const briefing = {
    meta: {
      productLabel: edition.productLabel,
      editionLabel: edition.editionLabel,
      generatedAt: edition.generatedAt,
      estimatedReadMinutes: edition.estimatedReadMinutes,
      commuteMode: edition.commuteMode,
      tone: edition.tone,
      sourceFocus: buildSourceFocus(selected, rankingConfig.sourceFocusCount || 6),
    },
    thesis: context.thesis,
    pulse: context.pulse || {
      intro: "",
      asOf: "",
      sourceLabel: "",
      marketTiles: [],
      heatmap: [],
      riskRadar: [],
      privateRadar: {
        title: "",
        summary: "",
        metrics: [],
        bullets: [],
        links: [],
      },
      sourceMode: {
        headline: "",
        summary: "",
      },
    },
    scan: {
      intro: context.scan?.intro || "",
      signals: buildSignalBoard(ranked, rankingConfig.signalCount || 5),
      ignoreNoise: context.scan?.ignoreNoise || { title: "", summary: "" },
    },
    essential: {
      intro: context.essentialIntro || "",
      cards: essentialCards,
    },
    leadStory: buildLeadStory(selected, context.thesis || {}),
    marketDesk: buildMarketDesk(context, selected, context.thesis || {}),
    topStories: {
      title: "Top Stories",
      intro: context.essentialIntro || "",
      cards: essentialCards,
    },
    sourceDesk: buildSourceDesk(selected),
    newsletterDesk: buildNewsletterDesk(context),
    edge: context.edge,
    sourceStack: buildSourceStack(context.sourceCatalog || [], selected),
    commuteRoute: context.commuteRoute || [],
    footerPerspective: context.footerPerspective || { title: "", summary: "" },
  };

  return {
    briefing,
    compiledDebug: buildCompiledDebug(ranked, selected),
  };
}

module.exports = {
  buildBriefingData,
  rankCandidates,
  selectCandidates,
};
