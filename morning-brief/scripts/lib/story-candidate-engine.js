const { rankCandidates, selectCandidates } = require("./briefing-engine");

const NEWSLETTER_SOURCE_MAP = {
  "Morning Brief/Inputs/Morning Brew": "Morning Brew",
  "Morning Brief/Inputs/Brew Markets": "Brew Markets",
  "Morning Brief/Inputs/Tech Brew": "Tech Brew",
  "Morning Brief/Inputs/CFO Brew": "CFO Brew",
  "Morning Brief/Inputs/The Playbook": "The Playbook",
};

const SOURCE_NOTES = {
  Bloomberg: {
    tier: "Tier 1",
    role: "Primary reporting",
    note: "Macro framing, policy-week setup, and geopolitical-energy linkage.",
  },
  "The Wall Street Journal": {
    tier: "Tier 1",
    role: "Primary reporting",
    note: "Index behavior, leadership concentration, and market-texture context.",
  },
  "Financial Times": {
    tier: "Tier 1",
    role: "Primary reporting",
    note: "Global macro framing, Europe linkage, and policy-market transmission.",
  },
  CNBC: {
    tier: "Tier 1",
    role: "Primary reporting",
    note: "US market moves, executive commentary, and fast Wall Street context.",
  },
  Reuters: {
    tier: "Tier 1",
    role: "Primary reporting",
    note: "Fast factual updates on rates, oil, and world-risk developments.",
  },
  "Associated Press": {
    tier: "Tier 1",
    role: "Primary reporting",
    note: "Policy-relevant world and security coverage with clean factual grounding.",
  },
  "Morning Brew": {
    tier: "Tier 2",
    role: "Curated framing input",
    note: "Broad smart-professional angle detection and business-narrative simplification.",
  },
  "Brew Markets": {
    tier: "Tier 2",
    role: "Curated framing input",
    note: "Retail-market tone, investing angle detection, and sentiment framing.",
  },
  "Tech Brew": {
    tier: "Tier 2",
    role: "Curated framing input",
    note: "Technology business framing and AI-policy angle detection when relevant.",
  },
  "CFO Brew": {
    tier: "Tier 3",
    role: "Specialty framing input",
    note: "Corporate-finance and operator-level context when capital or margins matter.",
  },
  "The Playbook": {
    tier: "Tier 3",
    role: "Specialty framing input",
    note: "Personal-investing and wealth-building context when the consumer angle matters.",
  },
};

const NEWSLETTER_ALIGNMENT_RULES = {
  "Morning Brew": ["business", "economy", "market", "consumer", "policy", "work", "media"],
  "Brew Markets": ["market", "stocks", "investing", "portfolio", "rates", "yield", "trade"],
  "Tech Brew": ["ai", "tech", "software", "chips", "cloud", "code", "anthropic", "openai", "google", "amazon"],
  "CFO Brew": ["capex", "margin", "guidance", "financing", "valuation", "cash", "balance sheet", "spend", "m&a"],
  "The Playbook": ["portfolio", "wealth", "investing", "real estate", "consumer", "housing"],
};

const PLAYBOOKS = [
  {
    id: "policy-earnings-collision",
    keywords: ["earnings", "central bank", "megacap", "blockbuster week", "policy week"],
    bucket: "market",
    focusArea: "Markets",
    urgency: "Must know",
    readTime: "75 sec",
    tags: ["Macro", "Megacaps", "Narrative risk"],
    build(cluster, context) {
      const lead = cluster.primary;
      return {
        id: cluster.id,
        bucket: cluster.bucket,
        focusArea: "Markets",
        urgency: "Must know",
        readTime: "75 sec",
        headline: "Policy week and megacap earnings are hitting the market at the same time.",
        takeaway:
          "This is not a normal wait-for-the-Fed tape. Macro and micro risk are arriving together, which means the market has fewer places to hide if confidence slips.",
        whatChanged: `${lead.source} framed the week as a collision between central-bank decisions and heavyweight earnings, compressing a lot of narrative risk into a very short window.`,
        whyItMatters:
          "The market is not dealing with one driver. It is balancing policy, valuation, leadership concentration, and earnings credibility all at once.",
        marketImpact:
          "If results are merely fine, the rally can stay intact. If one of the major leadership pillars wobbles, downside can travel faster than the calm tape suggests.",
        disagreement:
          "Bulls read the setup as proof that demand for quality and AI leadership can absorb bad news. Bears think the calm mostly reflects concentration and pre-positioning, not broad conviction.",
        watchToday:
          "Any pre-earnings tone shift, futures sensitivity to macro headlines, and whether cyclicals participate instead of just tagging along.",
        signal: {
          label: "Megacap Pressure",
          value: "Macro week meets earnings week",
          note: "Policy decisions and leadership-name results are landing on top of each other.",
          status: "hot",
        },
        primaryReporting: cluster.primarySources,
        framingInputs: pickFramingSources(context.newsletters, ["Brew Markets", "Morning Brew", "Tech Brew"]),
        tags: ["Macro", "Megacaps", "Narrative risk"],
        links: buildLinks(cluster.articles, "the policy-plus-earnings collision"),
        evidence: buildEvidence(cluster),
        scores: {
          marketRelevance: 10,
          worldRelevance: 4,
          novelty: 8,
          decisionUsefulness: 10,
          peerEdge: 9,
          memorability: 8,
          confidence: confidenceScore(cluster, 8),
          timeSensitivity: 10,
        },
      };
    },
  },
  {
    id: "boj-split",
    keywords: ["boj", "bank of japan", "yen", "hold rates", "6-3 split", "hold was less dovish"],
    bucket: "market",
    focusArea: "Markets",
    urgency: "High signal",
    readTime: "65 sec",
    tags: ["BOJ", "Rates", "Global yields"],
    build(cluster, context) {
      return {
        id: cluster.id,
        bucket: cluster.bucket,
        focusArea: "Markets",
        urgency: "High signal",
        readTime: "65 sec",
        headline: "The BOJ hold was less dovish than the headline implied.",
        takeaway:
          "Most people will remember the hold. The better edge is remembering the split vote, because it says the global inflation story still has teeth.",
        whatChanged:
          "Reuters noted that the Bank of Japan held rates, but the split vote showed more internal tension than a simple pause would suggest.",
        whyItMatters:
          "A divided BOJ matters because it can ripple through the yen, global yield expectations, and the broader debate over how finished the tightening cycle really is.",
        marketImpact:
          "A less-dovish BOJ keeps duration-sensitive trades more fragile and makes any clean global disinflation narrative harder to trust blindly.",
        disagreement:
          "Some investors will treat this as a technical footnote because the policy rate did not move. Others will treat the split as a useful reminder that inflation pressure is not fully domesticated.",
        watchToday:
          "Yen reaction, bond-market sensitivity, and whether other central-bank commentary reinforces or softens the same message.",
        signal: {
          label: "Policy Signal",
          value: "BOJ split on the hold",
          note: "The headline was a pause. The subtext was still hawkish.",
          status: "watch",
        },
        primaryReporting: cluster.primarySources,
        framingInputs: pickFramingSources(context.newsletters, ["Brew Markets", "Morning Brew"]),
        tags: ["BOJ", "Rates", "Global yields"],
        links: buildLinks(cluster.articles, "the BOJ split"),
        evidence: buildEvidence(cluster),
        scores: {
          marketRelevance: 9,
          worldRelevance: 4,
          novelty: 7,
          decisionUsefulness: 9,
          peerEdge: 9,
          memorability: 8,
          confidence: confidenceScore(cluster, 8),
          timeSensitivity: 9,
        },
      };
    },
  },
  {
    id: "oil-macro-bridge",
    keywords: ["oil", "crude", "hormuz", "middle east", "energy", "iran"],
    bucket: "market",
    focusArea: "Macro",
    urgency: "Must know",
    readTime: "70 sec",
    tags: ["Oil", "Inflation", "Hormuz"],
    build(cluster, context) {
      return {
        id: cluster.id,
        bucket: cluster.bucket,
        focusArea: "Macro",
        urgency: "Must know",
        readTime: "70 sec",
        headline: "Oil is doing more macro work than the index headline suggests.",
        takeaway:
          "Right now energy is not a side story. It is the hinge that connects world news, inflation nerves, and what central banks may or may not feel comfortable saying next.",
        whatChanged:
          "Multiple reports kept crude and regional shipping risk near the center of the macro setup while equities tried to stay composed.",
        whyItMatters:
          "If oil stays elevated into a central-bank-heavy week, the market has less room to keep pretending disinflation is automatic.",
        marketImpact:
          "Energy can stay bid, long-duration assets get more fragile, and any rate-sensitive growth trade becomes harder to defend at rich valuations.",
        disagreement:
          "Optimists think each diplomatic headline can cap crude quickly. Skeptics think shipping risk keeps a sticky premium in the system even when the news flow cools temporarily.",
        watchToday:
          "Brent behavior, Hormuz diplomacy, and whether yields react more to crude than to central-bank messaging.",
        signal: {
          label: "Oil Variable",
          value: inferOilSignalValue(cluster.articles),
          note: "Energy is still the bridge between geopolitics and inflation fear.",
          status: "hot",
        },
        primaryReporting: cluster.primarySources,
        framingInputs: pickFramingSources(context.newsletters, ["Morning Brew", "Brew Markets"]),
        tags: ["Oil", "Inflation", "Hormuz"],
        links: buildLinks(cluster.articles, "oil and the macro setup"),
        evidence: buildEvidence(cluster),
        scores: {
          marketRelevance: 10,
          worldRelevance: 8,
          novelty: 7,
          decisionUsefulness: 10,
          peerEdge: 10,
          memorability: 9,
          confidence: confidenceScore(cluster, 7),
          timeSensitivity: 10,
        },
      };
    },
  },
  {
    id: "breadth-fragility",
    keywords: ["breadth", "record", "record highs", "nasdaq", "s&p", "dow", "leadership", "index highs"],
    bucket: "market",
    focusArea: "Markets",
    urgency: "Useful edge",
    readTime: "60 sec",
    tags: ["Breadth", "Leadership", "S&P 500"],
    build(cluster, context) {
      const lead = cluster.primary;
      return {
        id: cluster.id,
        bucket: cluster.bucket,
        focusArea: "Markets",
        urgency: "Useful edge",
        readTime: "60 sec",
        headline: "Fresh index highs are still masking thinner leadership than the headline implies.",
        takeaway:
          "The market can look healthy at the index level while becoming more fragile underneath. That distinction matters more than the celebratory headline.",
        whatChanged: `${lead.source} market coverage pointed to strong index-level performance led by a relatively small set of dominant names.`,
        whyItMatters:
          "When headline strength outruns breadth, the market can feel more stable than it really is. That reduces the margin for disappointment.",
        marketImpact:
          "If leadership broadens, bulls gain a sturdier foundation. If it narrows further, any pullback can feel sudden and disproportionately sharp.",
        disagreement:
          "Some investors see concentration as a natural feature of an AI-led cycle. Others see it as a warning that passive index strength is hiding weaker internals.",
        watchToday:
          "Breadth, equal-weight performance, and whether non-megacap sectors confirm the move instead of just watching it happen.",
        signal: {
          label: "Index Reality",
          value: "Records with thinner breadth",
          note: "The index story looks cleaner than the market internals do.",
          status: "watch",
        },
        primaryReporting: cluster.primarySources,
        framingInputs: pickFramingSources(context.newsletters, ["Brew Markets", "Morning Brew"]),
        tags: ["Breadth", "Leadership", "S&P 500"],
        links: buildLinks(cluster.articles, "market breadth"),
        evidence: buildEvidence(cluster),
        scores: {
          marketRelevance: 9,
          worldRelevance: 2,
          novelty: 6,
          decisionUsefulness: 9,
          peerEdge: 8,
          memorability: 9,
          confidence: confidenceScore(cluster, 7),
          timeSensitivity: 8,
        },
      };
    },
  },
  {
    id: "anthropic-capex-signal",
    keywords: ["anthropic", "google", "amazon", "valuation", "claude code", "compute capacity", "cloud", "private company"],
    bucket: "market",
    focusArea: "Private Markets",
    urgency: "High signal",
    readTime: "70 sec",
    tags: ["Private markets", "AI capex", "Cloud demand"],
    build(cluster, context) {
      return {
        id: cluster.id,
        bucket: cluster.bucket,
        focusArea: "Private Markets",
        urgency: "High signal",
        readTime: "70 sec",
        headline: "Anthropic's funding round matters because private capital is now steering public capex expectations.",
        takeaway:
          "This is no longer just a startup valuation headline. It is a read-through into cloud demand, compute scarcity, and how aggressively big platforms are willing to subsidize the AI race.",
        whatChanged:
          "Reuters and Bloomberg both framed Google's latest Anthropic commitment as strategically important, landing just after Amazon's own fresh backing and turning one private-company financing story into a broader infrastructure signal.",
        whyItMatters:
          "When private AI funding reaches this scale, it stops being niche venture gossip and starts shaping how investors think about data centers, cloud spend, chip demand, and competitive endurance.",
        marketImpact:
          "This supports the public-market capex complex around cloud, networking, and compute, but it also keeps pressure on margins and raises the bar for every other AI contender.",
        disagreement:
          "Bulls see this as confirmation that enterprise AI demand is real enough to justify massive balance-sheet support. Skeptics see it as another sign that the leaders may be buying growth at a price the rest of the market cannot sustain.",
        watchToday:
          "Any read-through for cloud and semiconductor names, plus whether investors treat the deal as demand confirmation or as another warning that the AI race is becoming capital-intensive fast.",
        signal: {
          label: "Private Radar",
          value: "Anthropic is becoming infrastructure",
          note: "The private-company story is now leaking directly into public capex narratives.",
          status: "steady",
        },
        primaryReporting: cluster.primarySources,
        framingInputs: pickFramingSources(context.newsletters, ["Tech Brew", "Morning Brew", "CFO Brew"]),
        tags: ["Private markets", "AI capex", "Cloud demand"],
        links: buildLinks(cluster.articles, "Anthropic's capital signal"),
        evidence: buildEvidence(cluster),
        scores: {
          marketRelevance: 9,
          worldRelevance: 1,
          novelty: 10,
          decisionUsefulness: 9,
          peerEdge: 10,
          memorability: 8,
          confidence: confidenceScore(cluster, 8),
          timeSensitivity: 8,
        },
      };
    },
  },
  {
    id: "lebanon-risk-premium",
    keywords: ["lebanon", "evacuation", "buffer zone", "ceasefire", "southern lebanon"],
    bucket: "world",
    focusArea: "World",
    urgency: "High signal",
    readTime: "60 sec",
    tags: ["Lebanon", "Geopolitics", "Risk premium"],
    build(cluster, context) {
      return {
        id: cluster.id,
        bucket: cluster.bucket,
        focusArea: "World",
        urgency: "High signal",
        readTime: "60 sec",
        headline: "Lebanon is the reminder that the Middle East risk premium never really left.",
        takeaway:
          "Markets can ignore flare-ups for a while, but the region is still doing real work through oil, shipping, and risk appetite.",
        whatChanged:
          "Reuters reported renewed evacuation orders in southern Lebanon, reinforcing how brittle the ceasefire picture remains and how quickly the region can move back into the foreground.",
        whyItMatters:
          "This is not separate from markets. It sits underneath energy pricing, inflation expectations, and the question of how much geopolitical calm the rally is assuming.",
        marketImpact:
          "The cleaner the escalation risk looks, the more investors keep paying up for energy resilience and geopolitical hedges rather than full risk-on confidence.",
        disagreement:
          "Some traders treat these headlines as background noise unless the conflict broadens. Others think repeated flare-ups make a true normalization story harder to believe.",
        watchToday:
          "Whether the story widens beyond local flare-ups and whether markets price it through oil or ignore it again.",
        signal: {
          label: "World Risk",
          value: "Lebanon ceasefire still brittle",
          note: "The regional risk premium never really left the system.",
          status: "steady",
        },
        primaryReporting: cluster.primarySources,
        framingInputs: pickFramingSources(context.newsletters, ["Morning Brew", "Brew Markets"]),
        tags: ["Lebanon", "Geopolitics", "Risk premium"],
        links: buildLinks(cluster.articles, "southern Lebanon risk"),
        evidence: buildEvidence(cluster),
        scores: {
          marketRelevance: 8,
          worldRelevance: 9,
          novelty: 7,
          decisionUsefulness: 9,
          peerEdge: 8,
          memorability: 8,
          confidence: confidenceScore(cluster, 7),
          timeSensitivity: 9,
        },
      };
    },
  },
  {
    id: "mexico-policy-spillover",
    keywords: ["cartel", "jalisco", "mexico", "border", "cross-border", "security"],
    bucket: "world",
    focusArea: "World",
    urgency: "Useful edge",
    readTime: "55 sec",
    tags: ["Mexico", "Policy spillover", "Security"],
    build(cluster, context) {
      return {
        id: cluster.id,
        bucket: cluster.bucket,
        focusArea: "World",
        urgency: "Useful edge",
        readTime: "55 sec",
        headline: "Cross-border security stories can become macro-political stories faster than people expect.",
        takeaway:
          "Many investors ignore stories like this at first. The edge is recognizing when a security headline is likely to feed directly into policy rhetoric and business climate.",
        whatChanged:
          "Associated Press reported the capture of a top Jalisco cartel figure in Mexico, a story that can quickly migrate from crime coverage into border, fentanyl, and bilateral-policy narratives.",
        whyItMatters:
          "Security stories that harden policy rhetoric can shape trade mood, border politics, and the operating backdrop leaders have to navigate even without an immediate market jolt.",
        marketImpact:
          "The direct market effect is usually muted, but the policy spillover can matter if it sharpens political positioning or reframes the cross-border conversation.",
        disagreement:
          "Most market participants will ignore it unless political actors amplify it. Policy watchers tend to treat it as an early signal for sharper rhetoric later.",
        watchToday:
          "Whether US political figures or security officials elevate the story beyond crime coverage.",
        signal: {
          label: "Policy Spillover",
          value: "Security news can turn macro-political fast",
          note: "Ignore the first-order headline and watch who amplifies it.",
          status: "watch",
        },
        primaryReporting: cluster.primarySources,
        framingInputs: pickFramingSources(context.newsletters, ["Morning Brew", "CFO Brew"]),
        tags: ["Mexico", "Policy spillover", "Security"],
        links: buildLinks(cluster.articles, "the Jalisco cartel arrest"),
        evidence: buildEvidence(cluster),
        scores: {
          marketRelevance: 4,
          worldRelevance: 8,
          novelty: 8,
          decisionUsefulness: 7,
          peerEdge: 9,
          memorability: 7,
          confidence: confidenceScore(cluster, 7),
          timeSensitivity: 7,
        },
      };
    },
  },
  {
    id: "uk-us-diplomatic-theater",
    keywords: ["king charles", "uk-us", "congress", "washington", "allied", "diplomatic"],
    bucket: "world",
    focusArea: "World",
    urgency: "Context",
    readTime: "50 sec",
    tags: ["Diplomacy", "UK-US", "Policy tone"],
    build(cluster, context) {
      return {
        id: cluster.id,
        bucket: cluster.bucket,
        focusArea: "World",
        urgency: "Context",
        readTime: "50 sec",
        headline: "The UK-US diplomatic theater matters because symbolic alignment can become policy alignment.",
        takeaway:
          "A ceremonial visit does not move markets on its own, but it can matter if it stabilizes expectations around allied coordination when the geopolitical backdrop is already tense.",
        whatChanged:
          "Associated Press framed King Charles III's Washington visit and address to Congress as an effort to emphasize continuity in the UK-US relationship.",
        whyItMatters:
          "When geopolitical coordination is in focus, symbolic reassurance can reduce uncertainty around trade, security alignment, and allied posture.",
        marketImpact:
          "The direct market effect is limited, but the broader diplomatic tone can shape how investors think about policy coordination during a risk-heavy week.",
        disagreement:
          "Some people dismiss this as pure symbolism. Others see symbolism as useful when policy relationships need visible reinforcement.",
        watchToday:
          "Any concrete policy or trade messaging that turns the symbolism into something more actionable.",
        signal: {
          label: "Diplomatic Signal",
          value: "Allied symbolism is back in focus",
          note: "Soft power matters more when the hard backdrop is unstable.",
          status: "steady",
        },
        primaryReporting: cluster.primarySources,
        framingInputs: pickFramingSources(context.newsletters, ["Morning Brew"]),
        tags: ["Diplomacy", "UK-US", "Policy tone"],
        links: buildLinks(cluster.articles, "the UK-US visit"),
        evidence: buildEvidence(cluster),
        scores: {
          marketRelevance: 3,
          worldRelevance: 7,
          novelty: 5,
          decisionUsefulness: 5,
          peerEdge: 5,
          memorability: 6,
          confidence: confidenceScore(cluster, 7),
          timeSensitivity: 6,
        },
      };
    },
  },
];

function uniqueValues(items) {
  return [...new Set((items || []).filter(Boolean))];
}

function normalizeText(value) {
  return repairText(String(value || ""))
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function repairText(value) {
  if (typeof value !== "string") {
    return value;
  }

  if (!/[Ãâð]/.test(value)) {
    return value;
  }

  try {
    return Buffer.from(value, "latin1").toString("utf8");
  } catch (error) {
    return value;
  }
}

function formatEditionLabel(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  }).format(date);
}

function confidenceScore(cluster, base) {
  return Math.min(10, base + Math.min(2, cluster.primarySources.length - 1));
}

function buildEvidence(cluster) {
  return cluster.articles.map((article) => ({
    source: article.source,
    headline: article.headline,
    url: article.url,
    publishedDate: article.publishedDate,
    editorialUse: article.editorialUse,
  }));
}

function pickFramingSources(newsletters, preferredOrder) {
  return preferredOrder.filter((source) => newsletters.active.includes(source));
}

function buildIssueHintText(issue) {
  return normalizeText(
    [
      issue.subject,
      issue.summary,
      issue.newsletterTone,
      ...(issue.usefulSignals || []),
      ...(issue.topTopics || []),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function buildCandidateHintText(candidate, cluster) {
  return normalizeText(
    [
      candidate.headline,
      candidate.takeaway,
      candidate.whatChanged,
      candidate.whyItMatters,
      candidate.marketImpact,
      ...(candidate.tags || []),
      ...cluster.articles.map((article) => [article.headline, article.editorialUse, article.summary].join(" ")),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function issueKeywordScore(issueName, candidateText) {
  const keywords = NEWSLETTER_ALIGNMENT_RULES[issueName] || [];
  let score = 0;

  keywords.forEach((keyword) => {
    if (candidateText.includes(normalizeText(keyword))) {
      score += 2;
    }
  });

  return Math.min(8, score);
}

function issuePhraseScore(issue, candidateText) {
  const phrases = uniqueValues([...(issue.topTopics || []), ...(issue.usefulSignals || [])]);
  let score = 0;
  const matchedHints = [];

  phrases.forEach((phrase) => {
    const normalized = normalizeText(phrase);
    if (normalized.length >= 4 && candidateText.includes(normalized)) {
      score += 2;
      matchedHints.push(phrase);
    }
  });

  return {
    score: Math.min(8, score),
    matchedHints,
  };
}

function newsletterAlignment(candidate, cluster, newsletters) {
  const activeIssues = newsletters.activeIssues || [];
  if (activeIssues.length === 0) {
    return {
      score: 0,
      match: null,
    };
  }

  const candidateText = buildCandidateHintText(candidate, cluster);
  let best = {
    score: 0,
    match: null,
  };

  activeIssues.forEach((issue) => {
    const issueText = buildIssueHintText(issue);
    const phraseResult = issuePhraseScore(issue, candidateText);
    let score = phraseResult.score + issueKeywordScore(issue.name, candidateText);

    if (issueText && candidateText.includes(issueText) && issueText.length > 18) {
      score += 2;
    }

    if (issue.name === "Morning Brew" && (candidate.bucket === "market" || candidate.bucket === "world")) {
      score += 1;
    }

    if (issue.name === "Brew Markets" && candidate.bucket === "market") {
      score += 2;
    }

    score = Math.min(10, score);

    if (score > best.score) {
      best = {
        score,
        match: {
          source: issue.name,
          subject: issue.subject,
          matchedHints: phraseResult.matchedHints.slice(0, 3),
        },
      };
    }
  });

  return best;
}

function applyNewsletterSignal(candidate, cluster, newsletters) {
  const alignment = newsletterAlignment(candidate, cluster, newsletters);
  const next = {
    ...candidate,
    scores: {
      ...(candidate.scores || {}),
      newsletterAlignment: alignment.score,
    },
  };

  if (alignment.match) {
    next.newsletterSignalMatch = alignment.match;
  }

  return next;
}

function buildLinks(articles, angle) {
  return articles.map((article) => ({
    label: `${article.source} on ${angle}`,
    url: article.url,
  }));
}

function inferOilSignalValue(articles) {
  const articleText = normalizeText(
    articles
      .map((article) => [article.headline, article.summary].filter(Boolean).join(" "))
      .join(" "),
  );

  if (articleText.includes("brent") && articleText.includes("108")) {
    return "Brent above $108";
  }

  if (articleText.includes("hormuz")) {
    return "Hormuz risk still in the tape";
  }

  return "Crude still carrying risk";
}

function scoreThemeMatch(article, playbook) {
  const haystack = normalizeText(
    [article.headline, article.editorialUse, article.summary, article.source].filter(Boolean).join(" "),
  );

  return playbook.keywords.reduce(
    (total, keyword) => total + (haystack.includes(normalizeText(keyword)) ? 1 : 0),
    0,
  );
}

function classifyArticle(article) {
  let bestPlaybook = null;
  let bestScore = 0;

  PLAYBOOKS.forEach((playbook) => {
    const matchScore = scoreThemeMatch(article, playbook);
    if (matchScore > bestScore) {
      bestScore = matchScore;
      bestPlaybook = playbook;
    }
  });

  if (!bestPlaybook || bestScore === 0) {
    return {
      id: `generic-${slugify(article.editorialUse || article.headline || article.id)}`,
      bucket: article.bucket || "market",
      playbook: null,
    };
  }

  return {
    id: bestPlaybook.id,
    bucket: bestPlaybook.bucket,
    playbook: bestPlaybook,
  };
}

function slugify(value) {
  return normalizeText(value).replace(/\s+/g, "-");
}

function parseNewsletterState(newsletterConfig, gmailRaw) {
  const configured = (newsletterConfig.gmail_labels || []).map((item) => ({
    name: NEWSLETTER_SOURCE_MAP[item.label] || item.label,
    label: item.label,
    role: item.role,
    expectedArrivalWindow: item.expected_arrival_window,
    tier: item.tier,
  }));

  const rawNewsletters = (gmailRaw.newsletters || []).map((newsletter) => {
    const name = NEWSLETTER_SOURCE_MAP[newsletter.label] || newsletter.label;
    return {
      name,
      label: newsletter.label,
      sender: newsletter.sender,
      subject: repairText(newsletter.subject),
      summary: repairText(newsletter.summary),
      usefulSignals: (newsletter.usefulSignals || []).map(repairText),
      topTopics: (newsletter.topTopics || []).map(repairText),
      isOnboardingIssue: Boolean(newsletter.isOnboardingIssue),
      issueType: repairText(newsletter.issueType || (newsletter.isOnboardingIssue ? "onboarding" : "editorial")),
      issueDateLabel: repairText(newsletter.issueDateLabel || ""),
      newsletterTone: repairText(newsletter.newsletterTone || ""),
      editorialConfidence: Number.isFinite(newsletter.editorialConfidence)
        ? newsletter.editorialConfidence
        : (newsletter.isOnboardingIssue ? 0 : 0.6),
      displayUrl: newsletter.displayUrl,
      emailTs: newsletter.emailTs,
    };
  });

  const available = uniqueValues(rawNewsletters.map((item) => item.name));
  const active = uniqueValues(
    rawNewsletters.filter((item) => !item.isOnboardingIssue).map((item) => item.name),
  );
  const activeIssues = rawNewsletters.filter((item) => !item.isOnboardingIssue);

  return {
    configured,
    issues: rawNewsletters,
    available,
    active,
    activeIssues,
  };
}

function buildSourceCatalog(newsletterConfig, newsletters) {
  const orderedSources = [
    ...(newsletterConfig.primary_reporting_sources || []),
    ...newsletters.configured.map((item) => item.name),
  ];

  return uniqueValues(orderedSources)
    .map((name) => ({
      name,
      ...(SOURCE_NOTES[name] || {
        tier: "Tier 3",
        role: "Source",
        note: "Configured source.",
      }),
    }))
    .sort((a, b) => tierWeight(a.tier) - tierWeight(b.tier));
}

function tierWeight(value) {
  if (value === "Tier 1") {
    return 1;
  }
  if (value === "Tier 2") {
    return 2;
  }
  return 3;
}

function clusterArticles(webRaw) {
  const grouped = new Map();

  (webRaw.articles || []).forEach((article) => {
    const normalizedArticle = {
      ...article,
      headline: repairText(article.headline),
      summary: repairText(article.summary),
      editorialUse: repairText(article.editorialUse),
    };
    const classification = classifyArticle(normalizedArticle);
    if (!grouped.has(classification.id)) {
      grouped.set(classification.id, {
        id: classification.id,
        bucket: classification.bucket,
        playbook: classification.playbook,
        articles: [],
      });
    }

    grouped.get(classification.id).articles.push(normalizedArticle);
  });

  return [...grouped.values()].map((cluster) => {
    const primarySources = uniqueValues(cluster.articles.map((article) => article.source));
    return {
      ...cluster,
      primary: cluster.articles[0],
      primarySources,
    };
  });
}

function buildGenericCandidate(cluster, context) {
  const lead = cluster.primary;
  const focusArea = cluster.bucket === "world" ? "World" : "Markets";
  const framingInputs = cluster.bucket === "world"
    ? pickFramingSources(context.newsletters, ["Morning Brew", "Tech Brew"])
    : pickFramingSources(context.newsletters, ["Brew Markets", "Morning Brew", "Tech Brew"]);

  return {
    id: cluster.id,
    bucket: cluster.bucket,
    focusArea,
    urgency: cluster.bucket === "world" ? "High signal" : "Useful edge",
    readTime: "55 sec",
    headline: lead.editorialUse || lead.headline,
    takeaway: lead.summary,
    whatChanged: `${lead.source} reported that ${toLowerLead(lead.summary)}`,
    whyItMatters:
      focusArea === "World"
        ? "The edge is spotting how a world story can migrate into policy, energy, or business risk before it becomes consensus."
        : "The edge is understanding how this changes the day’s risk map instead of just knowing the headline.",
    marketImpact:
      focusArea === "World"
        ? "The direct market effect may stay muted at first, but the second-order policy and sentiment effects are what matter."
        : "If this theme strengthens, it can move positioning faster than a calm headline tape would suggest.",
    disagreement:
      focusArea === "World"
        ? "Some readers will treat it as isolated news flow. Others will treat it as an early clue about broader policy or geopolitical direction."
        : "Some investors will treat this as noise. Others will treat it as a useful clue about what the market is underpricing.",
    watchToday:
      focusArea === "World"
        ? "Who amplifies the story, what adjacent risk assets do, and whether it starts changing the broader conversation."
        : "Whether follow-through shows up in rates, commodities, sector leadership, or management commentary.",
    signal: {
      label: focusArea === "World" ? "World Signal" : "Market Signal",
      value: shortenSignalValue(lead.editorialUse || lead.headline),
      note: lead.summary,
      status: focusArea === "World" ? "steady" : "watch",
    },
    primaryReporting: cluster.primarySources,
    framingInputs,
    tags: uniqueValues(
      [focusArea]
        .concat((lead.editorialUse || "").split(/[\s/,+-]+/).slice(0, 2))
        .filter(Boolean),
    ),
    links: buildLinks(cluster.articles, "the story"),
    evidence: buildEvidence(cluster),
    scores: buildGenericScores(cluster),
  };
}

function toLowerLead(value) {
  const cleaned = repairText(value || "").trim();
  if (!cleaned) {
    return "the story remains important.";
  }

  return cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
}

function shortenSignalValue(value) {
  const cleaned = repairText(value || "").replace(/[:.].*$/, "").trim();
  return cleaned.length > 48 ? `${cleaned.slice(0, 45).trim()}...` : cleaned;
}

function buildGenericScores(cluster) {
  const isWorld = cluster.bucket === "world";
  return {
    marketRelevance: isWorld ? 5 : 8,
    worldRelevance: isWorld ? 8 : 4,
    novelty: 6,
    decisionUsefulness: 7,
    peerEdge: 6,
    memorability: 6,
    confidence: confidenceScore(cluster, 6),
    timeSensitivity: 7,
  };
}

function normalizeTopicKey(value) {
  return normalizeText(value).replace(/\s+/g, "-");
}

function classifyCoverageTopic(candidate, cluster) {
  const presetTopics = {
    "oil-macro-bridge": "economy-rates",
    "boj-split": "economy-rates",
    "policy-earnings-collision": "business",
    "breadth-fragility": "markets",
    "anthropic-capex-signal": "ai-tech",
    "lebanon-risk-premium": "politics-world",
    "mexico-policy-spillover": "politics-world",
  };

  if (presetTopics[candidate.id]) {
    return presetTopics[candidate.id];
  }

  const haystack = normalizeText(
    [
      candidate.focusArea,
      candidate.headline,
      candidate.takeaway,
      candidate.whatChanged,
      candidate.tags?.join(" "),
      cluster.primary?.headline,
      cluster.primary?.summary,
    ].filter(Boolean).join(" "),
  );

  if (/(ai|tech|software|chip|cloud|code|anthropic|openai|google|amazon)/.test(haystack)) {
    return "ai-tech";
  }

  if (/(rate|yield|inflation|economy|economic|gdp|fed|boj|treasury|bond|macro)/.test(haystack)) {
    return "economy-rates";
  }

  if (/(politic|policy|border|military|security|war|lebanon|iran|mexico|world)/.test(haystack)) {
    return "politics-world";
  }

  if (/(earnings|business|company|consumer|margin|guidance|deal|valuation|profit|bank)/.test(haystack)) {
    return "business";
  }

  return "markets";
}

function pickTile(snapshot, id, fallbackLabel) {
  const tile = (snapshot?.tiles || []).find((item) => item.id === id);
  if (!tile) {
    return null;
  }

  return {
    label: fallbackLabel || tile.label,
    value: tile.change || tile.value,
    tone: tile.direction === "down" ? "cool" : "warm",
  };
}

function buildVisualPointsFromMetrics(metrics, limit = 3) {
  return (metrics || []).slice(0, limit).map((metric, index) => ({
    label: metric.label,
    value: metric.value,
    tone: index === 0 ? "warm" : "cool",
  }));
}

function formatCoverageTopic(topic) {
  return String(topic || "markets")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" & ");
}

function buildStoryVisual(candidate, cluster, webRaw, coverageTopic) {
  const pulse = webRaw.marketSnapshot || {};
  const privateRadar = webRaw.privateMarketRadar || {};
  const defaultVisual = {
    palette: cluster.bucket === "world" ? "mint" : "sky",
    eyebrow: formatCoverageTopic(coverageTopic),
    title: candidate.takeaway,
    summary: "Tap through to open the source article.",
    points: (candidate.tags || []).slice(0, 3).map((tag, index) => ({
      label: `Signal ${index + 1}`,
      value: tag,
      tone: index === 0 ? "warm" : "cool",
    })),
  };

  if (candidate.id === "oil-macro-bridge") {
    return {
      palette: "amber",
      eyebrow: "Economy & Rates",
      title: "Energy is driving the inflation conversation again.",
      summary: "Oil, shipping risk, and yields are moving together underneath the tape.",
      points: [
        pickTile(pulse, "brent", "Brent"),
        pickTile(pulse, "wti", "WTI"),
        pickTile(pulse, "us10y", "US 10Y"),
      ].filter(Boolean),
    };
  }

  if (candidate.id === "policy-earnings-collision") {
    return {
      palette: "sky",
      eyebrow: "Business",
      title: "Macro week and megacap week are now the same story.",
      summary: "The market has to process policy, earnings, and valuation pressure at once.",
      points: [
        { label: "Setup", value: "Fed + earnings", tone: "warm" },
        { label: "Pressure", value: "Narrative compression", tone: "cool" },
        { label: "Risk", value: "Leadership wobble", tone: "cool" },
      ],
    };
  }

  if (candidate.id === "anthropic-capex-signal") {
    return {
      palette: "rose",
      eyebrow: "AI & Tech",
      title: "Private AI capital is becoming public capex signal.",
      summary: "This is a cloud, compute, and business-model story now.",
      points: buildVisualPointsFromMetrics(privateRadar.metrics, 3),
    };
  }

  if (candidate.id === "boj-split") {
    return {
      palette: "mint",
      eyebrow: "Economy & Rates",
      title: "The hold mattered less than the split behind it.",
      summary: "The more useful read is that policy tension is still alive in rates.",
      points: [
        { label: "BOJ vote", value: "6-3 split", tone: "cool" },
        pickTile(pulse, "us10y", "US 10Y"),
        { label: "Readthrough", value: "Hawkish subtext", tone: "warm" },
      ].filter(Boolean),
    };
  }

  if (candidate.id === "breadth-fragility") {
    return {
      palette: "sky",
      eyebrow: "Markets",
      title: "Index highs still do not equal broad participation.",
      summary: "The tape looks cleaner from far away than it does underneath.",
      points: [
        pickTile(pulse, "sp500", "S&P 500"),
        pickTile(pulse, "nasdaq", "Nasdaq"),
        { label: "Breadth", value: "Still narrow", tone: "cool" },
      ].filter(Boolean),
    };
  }

  if (candidate.id === "lebanon-risk-premium") {
    return {
      palette: "mint",
      eyebrow: "Politics & World",
      title: "Regional tension is still leaking into the market story.",
      summary: "This is geopolitics with direct oil, shipping, and risk-premium consequences.",
      points: [
        { label: "Ceasefire", value: "Still brittle", tone: "cool" },
        pickTile(pulse, "brent", "Brent"),
        { label: "Risk", value: "Premium alive", tone: "warm" },
      ].filter(Boolean),
    };
  }

  if (candidate.id === "mexico-policy-spillover") {
    return {
      palette: "mint",
      eyebrow: "Politics & World",
      title: "Security headlines can turn policy-relevant very quickly.",
      summary: "This matters when the political narrative starts outrunning the original event.",
      points: [
        { label: "Signal", value: "Border rhetoric", tone: "cool" },
        { label: "Spillover", value: "Policy risk", tone: "warm" },
        { label: "Watch", value: "Who amplifies it", tone: "cool" },
      ],
    };
  }

  return defaultVisual;
}

function buildCandidatesFromClusters(clusters, newsletters, webRaw) {
  return clusters.map((cluster) => {
    const context = { newsletters };
    const candidate = cluster.playbook
      ? cluster.playbook.build(cluster, context)
      : buildGenericCandidate(cluster, context);
    const withSignal = applyNewsletterSignal(candidate, cluster, newsletters);
    const coverageTopic = classifyCoverageTopic(withSignal, cluster);
    return {
      ...withSignal,
      coverageTopic,
      visual: buildStoryVisual(withSignal, cluster, webRaw, coverageTopic),
    };
  });
}

function buildMarketMood(selected) {
  const ids = new Set(selected.map((candidate) => candidate.id));
  if (ids.has("oil-macro-bridge") || ids.has("breadth-fragility")) {
    return {
      label: "Amber | Calm indexes, stressed undercurrents",
      note: "Record highs can coexist with hidden fragility for a while. Energy, breadth, and policy tone are the pressure points to watch.",
    };
  }

  return {
    label: "Green-amber | Constructive tape, selective stress",
    note: "The market still wants to be optimistic, but the quality of that optimism matters more than the headline level.",
  };
}

function buildMarketPulse(webRaw) {
  return {
    intro: "Start with the numbers before the narratives.",
    asOf: webRaw.marketSnapshot?.asOf || "",
    sourceLabel: webRaw.marketSnapshot?.sourceLabel || "",
    marketTiles: webRaw.marketSnapshot?.tiles || [],
    heatmap: webRaw.marketSnapshot?.heatmap || [],
  };
}

function buildRiskRadar(selected, webRaw) {
  const ids = new Set(selected.map((candidate) => candidate.id));
  const oilTile = (webRaw.marketSnapshot?.tiles || []).find((tile) => tile.id === "brent");
  const ratesTile = (webRaw.marketSnapshot?.tiles || []).find((tile) => tile.id === "us10y");
  const privateRadar = webRaw.privateMarketRadar || {};

  return [
    {
      label: "Energy Stress",
      score: ids.has("oil-macro-bridge") ? 88 : 62,
      tone: "hot",
      note: oilTile
        ? `${oilTile.value} ${oilTile.change} keeps the inflation bridge alive.`
        : "Oil is still the cleanest macro connector."
    },
    {
      label: "Policy Squeeze",
      score: ids.has("boj-split") || ids.has("policy-earnings-collision") ? 78 : 58,
      tone: "watch",
      note: ratesTile
        ? `${ratesTile.value} with Fed and BOJ pressure in the background.`
        : "Central-bank tone and rates are still sharing the wheel."
    },
    {
      label: "Leadership Fragility",
      score: ids.has("breadth-fragility") ? 74 : 55,
      tone: "steady",
      note: ids.has("breadth-fragility")
        ? "Index calm still depends on a smaller group of leaders than the headline implies."
        : "Check whether participation is broad or just loud."
    },
    {
      label: "AI Capital Race",
      score: ids.has("anthropic-capex-signal") ? 82 : 57,
      tone: "steady",
      note: privateRadar.summary
        ? privateRadar.summary
        : "Private AI financing is starting to shape public-market capex assumptions."
    },
  ];
}

function buildSourceMode(newsletters) {
  if ((newsletters.activeIssues || []).length > 0) {
    const issueLabels = newsletters.activeIssues
      .slice(0, 3)
      .map((issue) => `${issue.name}: ${issue.subject}`);
    return {
      headline: "Tier 1 reporting plus active newsletter framing.",
      summary: `Active editorial issues today: ${issueLabels.join(" | ")}.`,
    };
  }

  const available = uniqueValues((newsletters.issues || []).map((item) => item.name));
  if (available.length > 0) {
    return {
      headline: "Tier 1 reporting is carrying today's edition.",
      summary:
        "The Brew-family emails currently in Gmail are still welcome or onboarding notes, so they are helping with voice and structure but not driving today's story selection.",
    };
  }

  return {
    headline: "Primary reporting only.",
    summary: "No newsletter framing inputs were available, so the brief is leaning entirely on primary reporting today.",
  };
}

function buildPrivateRadar(webRaw) {
  return webRaw.privateMarketRadar || {
    title: "Private market radar unavailable.",
    summary: "No private-company signal was loaded into today's raw reporting file.",
    metrics: [],
    bullets: [],
    links: [],
  };
}

function buildThesis(selected) {
  const ids = new Set(selected.map((candidate) => candidate.id));
  const hasOil = ids.has("oil-macro-bridge");
  const hasBreadth = ids.has("breadth-fragility");
  const hasBoj = ids.has("boj-split");

  let headline =
    "This morning is about where the calm headline and the real risk map stop matching perfectly.";
  let summary =
    "The cleanest way to read the day is to focus on the small number of forces doing the real work underneath the surface, then ignore the decorative noise around them.";

  if (hasOil && hasBreadth && hasBoj) {
    headline =
      "This market still looks calm on the surface, but energy risk, central-bank tension, and narrow leadership are doing the real work underneath.";
    summary =
      "The edge is not knowing more headlines. It is seeing how energy, policy, and concentration risk connect before that connection becomes obvious to everyone else.";
  } else if (hasOil && hasBreadth) {
    headline =
      "This morning is really about a rally that still depends on calm oil and narrow leadership staying cooperative.";
    summary =
      "The market wants to stay bullish, but it is outsourcing more stress than the headline suggests to energy, concentration, and the hope that nothing broadens from here.";
  } else if (hasBoj) {
    headline =
      "The headline pause in global policy is cleaner than the underlying message from rates and risk assets.";
    summary =
      "The better read this morning is to watch the details inside policy signals and market structure, not just the top-line headlines.";
  }

  return {
    headline,
    summary,
    marketMood: buildMarketMood(selected),
    edgeCallout: {
      title: `Remember ${buildMemoryHook(selected)}.`,
      note: "If you remember the connectors instead of the headlines, the rest of the day gets easier to decode.",
    },
  };
}

function buildMemoryHook(selected) {
  const hooks = [];

  selected.forEach((candidate) => {
    if (candidate.id === "oil-macro-bridge") {
      hooks.push("oil");
    }
    if (candidate.id === "breadth-fragility") {
      hooks.push("breadth");
    }
    if (candidate.id === "boj-split") {
      hooks.push("the BOJ split");
    }
    if (candidate.id === "anthropic-capex-signal") {
      hooks.push("Anthropic capital");
    }
  });

  if (hooks.length === 0) {
    return "the risk map";
  }

  if (hooks.length === 1) {
    return hooks[0];
  }

  if (hooks.length === 2) {
    return `${hooks[0]} and ${hooks[1]}`;
  }

  return `${hooks[0]}, ${hooks[1]}, and ${hooks[2]}`;
}

function buildIgnoreNoise(selected) {
  const ids = new Set(selected.map((candidate) => candidate.id));
  if (ids.has("breadth-fragility")) {
    return {
      title: "Do not confuse fresh highs with broad conviction.",
      summary:
        "The easiest mistake this morning is to read strong index prints as broad risk appetite. The better read is to check how much weight a narrow set of leaders is still carrying.",
    };
  }

  if (ids.has("oil-macro-bridge")) {
    return {
      title: "Do not let a single diplomatic headline erase the energy story.",
      summary:
        "Short-term relief headlines can calm screens for a few minutes. The more durable question is whether the underlying shipping and inflation risk has actually left the system.",
    };
  }

  return {
    title: "Do not mistake activity for clarity.",
    summary:
      "Busy mornings create a lot of motion. The better edge is to keep returning to the two or three forces that matter most.",
  };
}

function buildPeerMiss(selected) {
  const ids = new Set(selected.map((candidate) => candidate.id));
  if (ids.has("oil-macro-bridge")) {
    return {
      title: "The real bridge story is energy, not the loudest macro headline.",
      body:
        "A lot of people will narrate the day around central banks or a single earnings print. The more useful frame is that energy is connecting geopolitics, inflation risk, and equity fragility underneath almost everything else.",
    };
  }

  if (ids.has("breadth-fragility")) {
    return {
      title: "The cleaner the index headline looks, the more you should check the internals.",
      body:
        "Peers often stop at the headline level. The advantage is knowing whether the move is broad, rented from a handful of leaders, or being quietly challenged underneath.",
    };
  }

  return {
    title: "The edge is in the second-order effect, not the first headline.",
    body:
      "The best morning read is not the loudest story. It is the story most likely to spill into rates, energy, policy, or leadership concentration later in the day.",
  }
}

function buildMeetingLine(selected) {
  const ids = new Set(selected.map((candidate) => candidate.id));
  if (ids.has("oil-macro-bridge") && ids.has("breadth-fragility")) {
    return {
      title: "Use this line.",
      body:
        "The market is not ignoring risk; it is temporarily outsourcing that risk to oil, yields, and a narrow group of index leaders.",
    };
  }

  if (ids.has("boj-split")) {
    return {
      title: "Use this line.",
      body:
        "The top-line hold mattered less than the split behind it, because that is where the useful signal about the inflation backdrop lives.",
    };
  }

  return {
    title: "Use this line.",
    body:
      "The useful edge this morning is not the headline itself. It is how quickly that headline can spill into the broader risk conversation.",
  };
}

function buildChartOfDay(selected) {
  const ids = new Set(selected.map((candidate) => candidate.id));
  if (ids.has("breadth-fragility")) {
    return {
      title: "Index highs versus breadth health.",
      body:
        "Compare fresh cap-weighted highs with equal-weight participation. If the index keeps climbing while breadth stalls, the rally is stronger on paper than underneath.",
      takeaway:
        "The chart is not about being bearish. It is about knowing whether optimism is broad or rented from a handful of names.",
    };
  }

  if (ids.has("oil-macro-bridge")) {
    return {
      title: "Crude versus rates sensitivity.",
      body:
        "Track whether oil or central-bank commentary is doing more work in yields and growth-heavy leadership. That tells you which narrative the market actually trusts.",
      takeaway:
        "The point is to see which variable is really setting the tone instead of assuming the loudest headline is in charge.",
    };
  }

  return {
    title: "Leadership versus everything else.",
    body:
      "Compare the strongest headline winner with the rest of the field. The gap often tells you more about durability than the index itself.",
    takeaway:
      "The chart helps separate a real broadening move from a rally that still depends on very few names or themes.",
  };
}

function buildDeepDive(selected) {
  const priorityOrder = ["boj-split", "oil-macro-bridge", "policy-earnings-collision", "mexico-policy-spillover"];
  const chosen = priorityOrder
    .map((id) => selected.find((candidate) => candidate.id === id))
    .find(Boolean);

  if (!chosen) {
    return {
      title: "Why the secondary detail matters more than the headline.",
      body:
        "The best optional deep dive today is the detail that looked small at first glance but changes how the whole risk map feels after you sit with it.",
      whyNow:
        "That is usually the difference between sounding updated and sounding genuinely sharp.",
      link: selected[0]?.links?.[0]?.url || "",
    };
  }

  if (chosen.id === "boj-split") {
    return {
      title: "Why the BOJ split matters more than the hold.",
      body:
        "Most people will remember the pause. The more durable takeaway is that a split vote says the global inflation conversation is still unsettled.",
      whyNow:
        "That is exactly the kind of second-order detail that helps you sound informed instead of just updated.",
      link: chosen.links?.[0]?.url || "",
    };
  }

  if (chosen.id === "oil-macro-bridge") {
    return {
      title: "Why oil is the connector theme.",
      body:
        "Energy is what turns a regional headline into an inflation question, a rates question, and then a valuation question for the rest of the tape.",
      whyNow:
        "If you miss that bridge, the day feels random when it is actually much more connected.",
      link: chosen.links?.[0]?.url || "",
    };
  }

  if (chosen.id === "policy-earnings-collision") {
    return {
      title: "Why policy plus earnings is a nastier mix than either one alone.",
      body:
        "The problem is not that both events matter. It is that each one can change how investors interpret the other in real time.",
      whyNow:
        "That kind of compressed narrative risk is exactly where calm tapes can break quickly.",
      link: chosen.links?.[0]?.url || "",
    };
  }

  return {
    title: "Why the spillover can matter more than the original story.",
    body:
      "Some stories deserve attention less for the initial headline than for the political or business framing they create after other actors pick them up.",
    whyNow:
      "Those spillovers are often where the real edge sits for busy readers.",
    link: chosen.links?.[0]?.url || "",
  };
}

function buildCommuteRoute() {
  return [
    {
      label: "0-1 min",
      title: "Lock the thesis.",
      note: "Read the hero and the signal board first. If you remember only one thing, remember the connectors instead of the isolated headlines.",
    },
    {
      label: "1-7 min",
      title: "Work the essential cards.",
      note: "Move through the cards in order. They are ranked to give you the best return on attention while your brain is freshest.",
    },
    {
      label: "7-12 min",
      title: "Steal the edge layer.",
      note: "Read the peers-miss card and the meeting line so you leave with language, not just information.",
    },
    {
      label: "12-16 min",
      title: "Choose one deeper angle.",
      note: "If you still have time, use the chart and deep-dive prompts to decide what deserves follow-up after you get to work.",
    },
  ];
}

function buildFooterPerspective(selected) {
  const ids = new Set(selected.map((candidate) => candidate.id));
  if (ids.has("oil-macro-bridge") && ids.has("breadth-fragility")) {
    return {
      title:
        "The durable frame is that the market still wants to be bullish, but it is paying more hidden rent than the headline makes obvious.",
      summary:
        "That rent is being paid through energy, narrow leadership, and a world backdrop that keeps threatening to become more expensive. If you carry that frame into the day, most of the noise gets easier to sort.",
    };
  }

  return {
    title:
      "The durable frame is that this morning is less about headline volume and more about which few forces are truly setting the terms of risk.",
    summary:
      "If you keep coming back to the core drivers instead of every update around them, you will sound clearer and think faster than people who only skimmed the surface.",
    };
}

function buildBriefingContext(selected, sourceCatalog, newsletters, webRaw) {
  return {
    thesis: buildThesis(selected),
    pulse: {
      ...buildMarketPulse(webRaw),
      riskRadar: buildRiskRadar(selected, webRaw),
      privateRadar: buildPrivateRadar(webRaw),
      sourceMode: buildSourceMode(newsletters),
    },
    scan: {
      intro: "Start with the pulse, then read the six strongest stories in order.",
      ignoreNoise: buildIgnoreNoise(selected),
    },
    essentialIntro:
      "This is one tight daily edition. Read the pulse first, then work the story cards top to bottom for a full 15 to 20 minute briefing.",
    edge: {
      peerMiss: buildPeerMiss(selected),
      sayInMeeting: buildMeetingLine(selected),
      chartOfDay: buildChartOfDay(selected),
      deepDive: buildDeepDive(selected),
    },
    commuteRoute: buildCommuteRoute(),
    footerPerspective: buildFooterPerspective(selected),
    sourceCatalog,
  };
}

function buildEdition(now, candidates) {
  const date = now instanceof Date ? now : new Date(now);
  return {
    productLabel: "Morning Intelligence Brief",
    editionLabel: formatEditionLabel(date),
    generatedAt: date.toISOString(),
    estimatedReadMinutes: Math.max(15, Math.min(20, 8 + (candidates.length * 1.5))),
    commuteMode: "20-minute subway ride",
    tone: "Signal first, depth on demand, built for a distracted morning brain.",
  };
}

function buildStagingFromRaw({ newsletterConfig, gmailRaw, webRaw, rankingConfig, now = new Date() }) {
  const newsletters = parseNewsletterState(newsletterConfig, gmailRaw);
  const sourceCatalog = buildSourceCatalog(newsletterConfig, newsletters);
  const clusters = clusterArticles(webRaw);
  const candidates = buildCandidatesFromClusters(clusters, newsletters, webRaw);
  const ranked = rankCandidates(candidates, rankingConfig);
  const selected = selectCandidates(ranked, rankingConfig);

  return {
    edition: buildEdition(now, selected),
    briefingContext: buildBriefingContext(selected, sourceCatalog, newsletters, webRaw),
    candidates,
    rawStatus: {
      gmailGeneratedAt: gmailRaw.generatedAt || "",
      webGeneratedAt: webRaw.generatedAt || "",
      activeFramingInputs: newsletters.active,
      availableFramingInputs: newsletters.available,
      onboardingOnlySources: newsletters.issues
        .filter((issue) => issue.isOnboardingIssue)
        .map((issue) => issue.name),
    },
  };
}

module.exports = {
  buildStagingFromRaw,
  repairText,
};
