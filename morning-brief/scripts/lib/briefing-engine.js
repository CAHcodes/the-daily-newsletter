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
  return [...new Set(items.filter(Boolean))];
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

function buildBriefingData(staging, rankingConfig) {
  const ranked = rankCandidates(staging.candidates || [], rankingConfig);
  const selected = selectCandidates(ranked, rankingConfig);
  const context = staging.briefingContext || {};
  const edition = staging.edition || {};

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
      cards: buildEssentialCards(selected),
    },
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
