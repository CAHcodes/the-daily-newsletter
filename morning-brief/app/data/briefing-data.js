const MORNING_BRIEFING = {
  "meta": {
    "productLabel": "The Daily Newsletter",
    "editionLabel": "Wednesday, September 9",
    "generatedAt": "2026-09-09T20:30:00.000Z",
    "estimatedReadMinutes": 7,
    "commuteMode": "20-minute subway ride",
    "tone": "Signal first, depth on demand, built for a distracted morning brain.",
    "sourceFocus": [
      "Associated Press",
      "Reuters",
      "Bureau of Labor Statistics",
      "Freddie Mac",
      "Morning Brief editorial desk",
      "Morning Brew"
    ]
  },
  "thesis": {
    "headline": "This morning is about where the calm headline and the real risk map stop matching perfectly.",
    "summary": "The cleanest way to read the day is to focus on the small number of forces doing the real work underneath the surface, then ignore the decorative noise around them.",
    "marketMood": {
      "label": "Amber | Calm indexes, stressed undercurrents",
      "note": "A clean rebound can coexist with hidden fragility for a while. Energy, leadership concentration, and policy tone are the pressure points to watch."
    },
    "edgeCallout": {
      "title": "Remember oil.",
      "note": "If you remember the connectors instead of the headlines, the rest of the day gets easier to decode."
    }
  },
  "pulse": {
    "intro": "Start with the numbers before the narratives.",
    "asOf": "2026-09-09T13:53:00-04:00",
    "sourceLabel": "AP and Reuters intraday reporting; unsupported fields are explicit coverage gaps.",
    "marketTiles": [
      {
        "id": "spx",
        "label": "S&P 500",
        "value": "coverage gap",
        "change": "lower intraday",
        "changeValue": -0.1,
        "direction": "down",
        "note": "AP reported stocks lower intraday without an accessible verified index level or percentage."
      },
      {
        "id": "nasdaq",
        "label": "Nasdaq",
        "value": "coverage gap",
        "change": "lower intraday",
        "changeValue": -0.1,
        "direction": "down",
        "note": "AP reported stocks lower intraday without an accessible verified index level or percentage."
      },
      {
        "id": "us2y",
        "label": "US 2Y",
        "value": "coverage gap",
        "change": "—",
        "changeValue": 0,
        "direction": "flat",
        "note": "No current verified 2-year yield in the source set."
      },
      {
        "id": "us10y",
        "label": "US 10Y",
        "value": "4.837%",
        "change": "+3.26 bps",
        "changeValue": 3.26,
        "changeUnit": "bp",
        "direction": "up",
        "note": "Reuters reported 4.837% at 1:53 PM ET, the highest since November 2023."
      },
      {
        "id": "dxy",
        "label": "DXY",
        "value": "coverage gap",
        "change": "—",
        "changeValue": 0,
        "direction": "flat",
        "note": "No current verified DXY quote in the source set."
      },
      {
        "id": "brent",
        "label": "Brent",
        "value": "$100.27",
        "change": "+2.4%",
        "changeValue": 2.4,
        "direction": "up",
        "note": "Reuters reported $100.27 at 1:53 PM ET."
      },
      {
        "id": "gold",
        "label": "Gold",
        "value": "coverage gap",
        "change": "—",
        "changeValue": 0,
        "direction": "flat",
        "note": "No current verified gold quote."
      },
      {
        "id": "bitcoin",
        "label": "Bitcoin",
        "value": "coverage gap",
        "change": "—",
        "changeValue": 0,
        "direction": "flat",
        "note": "No current verified Bitcoin quote."
      },
      {
        "id": "vix",
        "label": "VIX",
        "value": "coverage gap",
        "change": "—",
        "changeValue": 0,
        "direction": "flat",
        "note": "No current verified VIX quote."
      }
    ],
    "heatmap": [
      {
        "label": "US 10Y",
        "value": 3.26,
        "direction": "up",
        "theme": "Rates",
        "unit": "bp"
      },
      {
        "label": "Brent",
        "value": 2.4,
        "direction": "up",
        "theme": "Energy",
        "unit": "%"
      }
    ],
    "riskRadar": [
      {
        "label": "Energy Stress",
        "score": 88,
        "tone": "hot",
        "note": "$100.27 +2.4% keeps the inflation bridge alive."
      },
      {
        "label": "Policy Squeeze",
        "score": 58,
        "tone": "watch",
        "note": "4.837% keeps rates sensitive to Fed tone even after oil relief."
      },
      {
        "label": "Leadership Fragility",
        "score": 55,
        "tone": "steady",
        "note": "Check whether participation is broad or just loud."
      },
      {
        "label": "AI Capital Race",
        "score": 57,
        "tone": "steady",
        "note": "Private AI financing is starting to shape public-market capex assumptions."
      }
    ],
    "privateRadar": {
      "title": "Private market radar unavailable.",
      "summary": "No private-company signal was loaded into today's raw reporting file.",
      "metrics": [],
      "bullets": [],
      "links": []
    },
    "sourceMode": {
      "headline": "Tier 1 reporting plus active newsletter framing.",
      "summary": "Active editorial issues today: Morning Brew: Heated survivalry | Brew Markets: Apple wants fold, hard cash | Tech Brew: A search bar for DNA."
    }
  },
  "scan": {
    "intro": "Start with the pulse, then read the six strongest stories in order.",
    "signals": [
      {
        "label": "Oil Variable",
        "value": "Crude still carrying risk",
        "note": "Energy is still the bridge between geopolitics and inflation fear.",
        "status": "hot"
      },
      {
        "label": "Market Signal",
        "value": "Apple's foldable hardware launch is a technol...",
        "note": "AP reported Apple unveiled a foldable iPhone called Duo alongside updates to iPhone, Apple Watch, and AirPods under new CEO John Ternus.",
        "status": "watch"
      },
      {
        "label": "Market Signal",
        "value": "A dated housing baseline, not a fresh standal...",
        "note": "Freddie Mac's latest weekly reading put the 30-year fixed mortgage rate at 6.71%; the next update is Thursday.",
        "status": "watch"
      },
      {
        "label": "World Signal",
        "value": "A distinct global-policy risk whose next sign...",
        "note": "AP reported Ukraine's president pressed international partners for a tougher response to escalating Russian attacks on civilian areas.",
        "status": "steady"
      },
      {
        "label": "Market Signal",
        "value": "Use a gap block instead of transaction filler",
        "note": "No material M&A, IPO pricing, funding, or private-credit event was established; PitchBook enrichment was unavailable.",
        "status": "watch"
      }
    ],
    "ignoreNoise": {
      "title": "Do not let a single diplomatic headline erase the energy story.",
      "summary": "Short-term relief headlines can calm screens for a few minutes. The more durable question is whether the underlying shipping and inflation risk has actually left the system."
    }
  },
  "essential": {
    "intro": "This is one tight daily edition. Read the pulse first, then work the ranked story cards for a finishable 6 to 8 minute briefing.",
    "cards": [
      {
        "id": "oil-macro-bridge",
        "coverageTopic": "economy-rates",
        "focusArea": "Macro",
        "urgency": "Must know",
        "readTime": "70 sec",
        "headline": "Oil is doing more macro work than the index headline suggests.",
        "takeaway": "Right now energy is not a side story. It is the hinge that connects world news, inflation nerves, and what central banks may or may not feel comfortable saying next.",
        "whatChanged": "Multiple reports kept crude and regional shipping risk near the center of the macro setup while equities tried to stay composed.",
        "whyItMatters": "If oil stays elevated into a central-bank-heavy week, the market has less room to keep pretending disinflation is automatic.",
        "marketImpact": "Energy can stay bid, long-duration assets get more fragile, and any rate-sensitive growth trade becomes harder to defend at rich valuations.",
        "disagreement": "Optimists think each diplomatic headline can cap crude quickly. Skeptics think shipping risk keeps a sticky premium in the system even when the news flow cools temporarily.",
        "watchToday": "Brent, Treasury yields, and Thursday's 8:30 AM ET PPI release; a cooler inflation print is the next clean falsifier for the oil-driven rates squeeze.",
        "tags": [
          "Oil",
          "Inflation",
          "Hormuz"
        ],
        "sourceTrail": {
          "primary": [
            "Associated Press",
            "Reuters",
            "Bureau of Labor Statistics"
          ],
          "framing": [
            "Morning Brew",
            "Brew Markets"
          ]
        },
        "newsletterSignalMatch": {
          "source": "Brew Markets",
          "subject": "Apple wants fold, hard cash",
          "matchedHints": [
            "rates"
          ]
        },
        "links": [
          {
            "label": "Associated Press on oil and the macro setup",
            "url": "https://apnews.com/article/d1284eb72934a3b076c14449bc087fbd"
          },
          {
            "label": "Reuters on oil and the macro setup",
            "url": "https://www.marketscreener.com/news/oil-treasury-yields-turn-higher-as-stocks-falter-ce785bd9d088f321"
          },
          {
            "label": "Bureau of Labor Statistics on oil and the macro setup",
            "url": "https://www.bls.gov/schedule/2026/09_sched_list.htm"
          }
        ],
        "primaryLink": {
          "label": "Associated Press on oil and the macro setup",
          "url": "https://apnews.com/article/d1284eb72934a3b076c14449bc087fbd"
        },
        "visual": {
          "palette": "amber",
          "eyebrow": "Economy & Rates",
          "title": "Energy is driving the inflation conversation again.",
          "summary": "Oil, shipping risk, and yields are moving together underneath the tape.",
          "graphic": {
            "type": "bar-chart",
            "sourceCaption": "Recreated from Associated Press + Reuters + Bureau of Labor Statistics.",
            "items": [
              {
                "label": "Brent",
                "value": 2.4,
                "display": "+2.4%",
                "tone": "warm"
              },
              {
                "label": "US 10Y",
                "value": 3.26,
                "display": "+3.26 bps",
                "tone": "warm"
              }
            ]
          },
          "points": [
            {
              "label": "Brent",
              "value": "+2.4%",
              "rawValue": "$100.27",
              "tone": "warm"
            },
            {
              "label": "US 10Y",
              "value": "+3.26 bps",
              "rawValue": "4.837%",
              "tone": "warm"
            }
          ]
        },
        "evidence": [
          {
            "source": "Associated Press",
            "headline": "Stocks fall as oil jumps above $100 after Iran war escalates",
            "url": "https://apnews.com/article/d1284eb72934a3b076c14449bc087fbd",
            "publishedDate": "2026-09-09",
            "editorialUse": "Oil is tightening financial conditions, pressuring equities, and complicating the Fed decision."
          },
          {
            "source": "Reuters",
            "headline": "Oil and Treasury yields turn higher as stocks falter",
            "url": "https://www.marketscreener.com/news/oil-treasury-yields-turn-higher-as-stocks-falter-ce785bd9d088f321",
            "publishedDate": "2026-09-09",
            "editorialUse": "Timestamped cross-asset facts and the divided policy setup."
          },
          {
            "source": "Bureau of Labor Statistics",
            "headline": "PPI Thursday and CPI Friday define the inflation calendar",
            "url": "https://www.bls.gov/schedule/2026/09_sched_list.htm",
            "publishedDate": "2026-09-09",
            "editorialUse": "The inflation sequence is the next falsifier for the oil-and-rates thesis."
          }
        ],
        "engineScore": 81
      },
      {
        "id": "generic-apple-s-foldable-hardware-launch-is-a-technology-premium-demand-and-new-ceo-execution-test",
        "coverageTopic": "ai-tech",
        "focusArea": "Markets",
        "urgency": "Useful edge",
        "readTime": "55 sec",
        "headline": "Apple's foldable hardware launch is a technology, premium-demand, and new-CEO execution test.",
        "takeaway": "AP reported Apple unveiled a foldable iPhone called Duo alongside updates to iPhone, Apple Watch, and AirPods under new CEO John Ternus.",
        "whatChanged": "The fresh update was apple unveiled its first foldable iPhone, called Duo, on September 9.",
        "whyItMatters": "Apple's first foldable is a test of premium-device demand, product mix, and execution under its new CEO; the launch alone does not prove an earnings reset.",
        "marketImpact": "If this theme strengthens, it can move positioning faster than a calm headline tape would suggest.",
        "disagreement": "Some investors will treat this as noise. Others will treat it as a useful clue about what the market is underpricing.",
        "watchToday": "Watch Apple shares, supplier read-through, preorder timing, and disclosed pricing; sustained mix and unit demand matter more than launch-day attention.",
        "tags": [
          "Markets",
          "Apple's",
          "foldable"
        ],
        "sourceTrail": {
          "primary": [
            "Associated Press",
            "Reuters"
          ],
          "framing": [
            "Brew Markets",
            "Morning Brew",
            "Tech Brew"
          ]
        },
        "newsletterSignalMatch": {
          "source": "Tech Brew",
          "subject": "A search bar for DNA",
          "matchedHints": []
        },
        "links": [
          {
            "label": "Associated Press on the story",
            "url": "https://apnews.com/article/fd35312e6d894d5f3b055b3d62f22cd2"
          },
          {
            "label": "Reuters on the story",
            "url": "https://www.investing.com/news/stock-market-news/apple-expected-to-unveil-first-folding-phone-with-new-ceo-ternus-in-command-4893058"
          }
        ],
        "primaryLink": {
          "label": "Associated Press on the story",
          "url": "https://apnews.com/article/fd35312e6d894d5f3b055b3d62f22cd2"
        },
        "visual": {
          "palette": "sky",
          "eyebrow": "Ai & Tech",
          "title": "AP reported Apple unveiled a foldable iPhone called Duo alongside updates to iPhone, Apple Watch, and AirPods under new CEO John Ternus.",
          "summary": "Tap through to open the source article.",
          "graphic": {
            "type": "fact-board",
            "sourceCaption": "Recreated from Associated Press + Reuters.",
            "items": [
              {
                "label": "Signal",
                "detail": "Markets"
              },
              {
                "label": "Signal",
                "detail": "Apple's"
              },
              {
                "label": "Signal",
                "detail": "foldable"
              }
            ]
          },
          "points": [
            {
              "label": "Signal 1",
              "value": "Markets",
              "tone": "warm"
            },
            {
              "label": "Signal 2",
              "value": "Apple's",
              "tone": "cool"
            },
            {
              "label": "Signal 3",
              "value": "foldable",
              "tone": "cool"
            }
          ]
        },
        "evidence": [
          {
            "source": "Associated Press",
            "headline": "Apple unveils iPhone Duo, its first foldable model",
            "url": "https://apnews.com/article/fd35312e6d894d5f3b055b3d62f22cd2",
            "publishedDate": "2026-09-09",
            "editorialUse": "Apple's foldable hardware launch is a technology, premium-demand, and new-CEO execution test."
          },
          {
            "source": "Reuters",
            "headline": "Apple's foldable launch puts new CEO and premium demand in focus",
            "url": "https://www.investing.com/news/stock-market-news/apple-expected-to-unveil-first-folding-phone-with-new-ceo-ternus-in-command-4893058",
            "publishedDate": "2026-09-09",
            "editorialUse": "Apple's foldable hardware launch is a technology, premium-demand, and new-CEO execution test."
          }
        ],
        "engineScore": 55.3
      },
      {
        "id": "generic-a-dated-housing-baseline-not-a-fresh-standalone-story",
        "coverageTopic": "economy-rates",
        "focusArea": "Markets",
        "urgency": "Useful edge",
        "readTime": "55 sec",
        "headline": "A dated housing baseline, not a fresh standalone story.",
        "takeaway": "Freddie Mac's latest weekly reading put the 30-year fixed mortgage rate at 6.71%; the next update is Thursday.",
        "whatChanged": "The fresh update was the 30-year fixed mortgage rate averaged 6.71% for the week of September 3.",
        "whyItMatters": "Mortgage rates near 6.7% keep affordability tight, so housing still reads as a higher-for-longer rates story instead of a clean recovery story.",
        "marketImpact": "If this theme strengthens, it can move positioning faster than a calm headline tape would suggest.",
        "disagreement": "Some investors will treat this as noise. Others will treat it as a useful clue about what the market is underpricing.",
        "watchToday": "Watch mortgage-rate direction, homebuilder sentiment, and whether supply gains start to matter more than financing pressure.",
        "tags": [
          "Markets",
          "A",
          "dated"
        ],
        "sourceTrail": {
          "primary": [
            "Freddie Mac"
          ],
          "framing": [
            "Brew Markets",
            "Morning Brew",
            "Tech Brew"
          ]
        },
        "newsletterSignalMatch": {
          "source": "Brew Markets",
          "subject": "Apple wants fold, hard cash",
          "matchedHints": [
            "rates"
          ]
        },
        "links": [
          {
            "label": "Freddie Mac on the story",
            "url": "https://www.freddiemac.com/pmms"
          }
        ],
        "primaryLink": {
          "label": "Freddie Mac on the story",
          "url": "https://www.freddiemac.com/pmms"
        },
        "visual": {
          "palette": "sky",
          "eyebrow": "Economy & Rates",
          "title": "Freddie Mac's latest weekly reading put the 30-year fixed mortgage rate at 6.71%; the next update is Thursday.",
          "summary": "Tap through to open the source article.",
          "graphic": {
            "type": "fact-board",
            "sourceCaption": "Recreated from Freddie Mac.",
            "items": [
              {
                "label": "Signal",
                "detail": "Markets"
              },
              {
                "label": "Signal",
                "detail": "A"
              },
              {
                "label": "Signal",
                "detail": "dated"
              }
            ]
          },
          "points": [
            {
              "label": "Signal 1",
              "value": "Markets",
              "tone": "warm"
            },
            {
              "label": "Signal 2",
              "value": "A",
              "tone": "cool"
            },
            {
              "label": "Signal 3",
              "value": "dated",
              "tone": "cool"
            }
          ]
        },
        "evidence": [
          {
            "source": "Freddie Mac",
            "headline": "Mortgage rates remain the verified housing constraint",
            "url": "https://www.freddiemac.com/pmms",
            "publishedDate": "2026-09-03",
            "editorialUse": "A dated housing baseline, not a fresh standalone story."
          }
        ],
        "engineScore": 55.3
      },
      {
        "id": "generic-a-distinct-global-policy-risk-whose-next-signal-is-allied-action-not-market-price-alone",
        "coverageTopic": "politics-world",
        "focusArea": "World",
        "urgency": "High signal",
        "readTime": "55 sec",
        "headline": "A distinct global-policy risk whose next signal is allied action, not market price alone.",
        "takeaway": "AP reported Ukraine's president pressed international partners for a tougher response to escalating Russian attacks on civilian areas.",
        "whatChanged": "The fresh update was president Volodymyr Zelenskyy urged stronger international pressure on Russia on September 9.",
        "whyItMatters": "World stories matter when they start changing the policy, supply-chain, or risk backdrop that investors have to price.",
        "marketImpact": "The direct market effect may stay muted at first, but the second-order policy and sentiment effects are what matter.",
        "disagreement": "Some readers will treat it as isolated news flow. Others will treat it as an early clue about broader policy or geopolitical direction.",
        "watchToday": "Watch who amplifies the story next and whether it starts changing the wider policy or risk conversation.",
        "tags": [
          "World",
          "A",
          "distinct"
        ],
        "sourceTrail": {
          "primary": [
            "Associated Press"
          ],
          "framing": [
            "Morning Brew",
            "Tech Brew"
          ]
        },
        "newsletterSignalMatch": {
          "source": "Morning Brew",
          "subject": "Heated survivalry",
          "matchedHints": []
        },
        "links": [
          {
            "label": "Associated Press on the story",
            "url": "https://apnews.com/article/6670c99dcc9ed149a2bd9c0deac455cf"
          }
        ],
        "primaryLink": {
          "label": "Associated Press on the story",
          "url": "https://apnews.com/article/6670c99dcc9ed149a2bd9c0deac455cf"
        },
        "visual": {
          "palette": "mint",
          "eyebrow": "Politics & World",
          "title": "World stories matter when they start changing the policy map.",
          "summary": "The direct move can look small at first. The real question is what gets repriced next.",
          "graphic": {
            "type": "fact-board",
            "sourceCaption": "Recreated from Associated Press.",
            "items": [
              {
                "label": "Theme",
                "detail": "A"
              },
              {
                "label": "Market link",
                "detail": "Policy and risk sentiment"
              },
              {
                "label": "Watch",
                "detail": "Who amplifies it next"
              }
            ]
          },
          "points": [
            {
              "label": "Theme",
              "value": "A",
              "tone": "warm"
            },
            {
              "label": "Readthrough",
              "value": "Policy spillover",
              "tone": "cool"
            },
            {
              "label": "Watch",
              "value": "Narrative shift",
              "tone": "cool"
            }
          ]
        },
        "evidence": [
          {
            "source": "Associated Press",
            "headline": "Zelenskyy urges more pressure on Russia after civilian deaths",
            "url": "https://apnews.com/article/6670c99dcc9ed149a2bd9c0deac455cf",
            "publishedDate": "2026-09-09",
            "editorialUse": "A distinct global-policy risk whose next signal is allied action, not market price alone."
          }
        ],
        "engineScore": 54.8
      },
      {
        "id": "generic-use-a-gap-block-instead-of-transaction-filler",
        "coverageTopic": "markets",
        "focusArea": "Markets",
        "urgency": "Useful edge",
        "readTime": "55 sec",
        "headline": "Use a gap block instead of transaction filler.",
        "takeaway": "No material M&A, IPO pricing, funding, or private-credit event was established; PitchBook enrichment was unavailable.",
        "whatChanged": "The fresh update was no authenticated PitchBook route was available.",
        "whyItMatters": "The more useful read is what this changes in the day's setup for investors and operators, not just the headline itself.",
        "marketImpact": "If this theme strengthens, it can move positioning faster than a calm headline tape would suggest.",
        "disagreement": "Some investors will treat this as noise. Others will treat it as a useful clue about what the market is underpricing.",
        "watchToday": "Watch for follow-through in prices, sector leadership, and management commentary rather than assuming the first headline got the story right.",
        "tags": [
          "Markets",
          "Use",
          "a"
        ],
        "sourceTrail": {
          "primary": [
            "Morning Brief editorial desk"
          ],
          "framing": [
            "Brew Markets",
            "Morning Brew",
            "Tech Brew"
          ]
        },
        "newsletterSignalMatch": {
          "source": "CFO Brew",
          "subject": "Power moves",
          "matchedHints": [
            "pricing"
          ]
        },
        "links": [
          {
            "label": "Morning Brief editorial desk on the story",
            "url": "https://www.sec.gov/edgar/search/"
          }
        ],
        "primaryLink": {
          "label": "Morning Brief editorial desk on the story",
          "url": "https://www.sec.gov/edgar/search/"
        },
        "visual": {
          "palette": "sky",
          "eyebrow": "Markets",
          "title": "No material M&A, IPO pricing, funding, or private-credit event was established; PitchBook enrichment was unavailable.",
          "summary": "Tap through to open the source article.",
          "graphic": {
            "type": "fact-board",
            "sourceCaption": "Recreated from Morning Brief editorial desk.",
            "items": [
              {
                "label": "Signal",
                "detail": "Markets"
              },
              {
                "label": "Signal",
                "detail": "Use"
              },
              {
                "label": "Signal",
                "detail": "a"
              }
            ]
          },
          "points": [
            {
              "label": "Signal 1",
              "value": "Markets",
              "tone": "warm"
            },
            {
              "label": "Signal 2",
              "value": "Use",
              "tone": "cool"
            },
            {
              "label": "Signal 3",
              "value": "a",
              "tone": "cool"
            }
          ]
        },
        "evidence": [
          {
            "source": "Morning Brief editorial desk",
            "headline": "Private markets and deals remain a transparent coverage gap",
            "url": "https://www.sec.gov/edgar/search/",
            "publishedDate": "2026-09-09",
            "editorialUse": "Use a gap block instead of transaction filler."
          }
        ],
        "engineScore": 54.4
      },
      {
        "id": "generic-a-real-estate-capital-signal-linking-industrial-parks-and-infrastructure-to-north-american-supply-chains",
        "coverageTopic": "ai-tech",
        "focusArea": "Markets",
        "urgency": "Useful edge",
        "readTime": "55 sec",
        "headline": "A real-estate-capital signal linking industrial parks and infrastructure to North American supply chains.",
        "takeaway": "Reuters reported BIVA's chief said Mexican FIBRAs could finance industrial parks, logistics assets, and AI-related infrastructure.",
        "whatChanged": "The fresh update was BIVA CEO Maria Ariza said Mexican FIBRAs can finance industrial parks, logistics assets, and infrastructure.",
        "whyItMatters": "The capital-markets question is whether manufacturing and AI-infrastructure demand can translate into durable occupancy, rents, and investable project pipelines for Mexican FIBRAs.",
        "marketImpact": "If this theme strengthens, it can move positioning faster than a calm headline tape would suggest.",
        "disagreement": "Some investors will treat this as noise. Others will treat it as a useful clue about what the market is underpricing.",
        "watchToday": "Watch for named projects, financing commitments, tenant demand, and follow-through from Mexico Investment Week rather than treating an exchange executive's thesis as completed investment.",
        "tags": [
          "Markets",
          "A",
          "real"
        ],
        "sourceTrail": {
          "primary": [
            "Reuters"
          ],
          "framing": [
            "Brew Markets",
            "Morning Brew",
            "Tech Brew"
          ]
        },
        "newsletterSignalMatch": {
          "source": "Morning Brew",
          "subject": "Heated survivalry",
          "matchedHints": []
        },
        "links": [
          {
            "label": "Reuters on the story",
            "url": "https://www.marketscreener.com/news/mexico-s-reits-poised-to-benefit-from-manufacturing-ai-boom-exchange-chief-says-ce785bd9df88f722"
          }
        ],
        "primaryLink": {
          "label": "Reuters on the story",
          "url": "https://www.marketscreener.com/news/mexico-s-reits-poised-to-benefit-from-manufacturing-ai-boom-exchange-chief-says-ce785bd9df88f722"
        },
        "visual": {
          "palette": "sky",
          "eyebrow": "Ai & Tech",
          "title": "Reuters reported BIVA's chief said Mexican FIBRAs could finance industrial parks, logistics assets, and AI-related infrastructure.",
          "summary": "Tap through to open the source article.",
          "graphic": {
            "type": "fact-board",
            "sourceCaption": "Recreated from Reuters.",
            "items": [
              {
                "label": "Signal",
                "detail": "Markets"
              },
              {
                "label": "Signal",
                "detail": "A"
              },
              {
                "label": "Signal",
                "detail": "real"
              }
            ]
          },
          "points": [
            {
              "label": "Signal 1",
              "value": "Markets",
              "tone": "warm"
            },
            {
              "label": "Signal 2",
              "value": "A",
              "tone": "cool"
            },
            {
              "label": "Signal 3",
              "value": "real",
              "tone": "cool"
            }
          ]
        },
        "evidence": [
          {
            "source": "Reuters",
            "headline": "Mexico REITs pitch manufacturing and AI-infrastructure growth",
            "url": "https://www.marketscreener.com/news/mexico-s-reits-poised-to-benefit-from-manufacturing-ai-boom-exchange-chief-says-ce785bd9df88f722",
            "publishedDate": "2026-09-09",
            "editorialUse": "A real-estate-capital signal linking industrial parks and infrastructure to North American supply chains."
          }
        ],
        "engineScore": 53.5
      }
    ]
  },
  "leadStory": {
    "headline": "Oil is doing more macro work than the index headline suggests.",
    "deck": "Right now energy is not a side story. It is the hinge that connects world news, inflation nerves, and what central banks may or may not feel comfortable saying next.",
    "whyItLeads": "Multiple reports kept crude and regional shipping risk near the center of the macro setup while equities tried to stay composed.",
    "marketRead": "If oil stays elevated into a central-bank-heavy week, the market has less room to keep pretending disinflation is automatic.",
    "watchToday": "Brent, Treasury yields, and Thursday's 8:30 AM ET PPI release; a cooler inflation print is the next clean falsifier for the oil-driven rates squeeze.",
    "focusArea": "Macro",
    "coverageTopic": "economy-rates",
    "sourceLabel": "AP",
    "sourceTrail": {
      "primary": [
        "Associated Press",
        "Reuters",
        "Bureau of Labor Statistics"
      ],
      "framing": [
        "Morning Brew",
        "Brew Markets"
      ]
    },
    "visual": {
      "palette": "amber",
      "eyebrow": "Economy & Rates",
      "title": "Energy is driving the inflation conversation again.",
      "summary": "Oil, shipping risk, and yields are moving together underneath the tape.",
      "graphic": {
        "type": "bar-chart",
        "sourceCaption": "Recreated from Associated Press + Reuters + Bureau of Labor Statistics.",
        "items": [
          {
            "label": "Brent",
            "value": 2.4,
            "display": "+2.4%",
            "tone": "warm"
          },
          {
            "label": "US 10Y",
            "value": 3.26,
            "display": "+3.26 bps",
            "tone": "warm"
          }
        ]
      },
      "points": [
        {
          "label": "Brent",
          "value": "+2.4%",
          "rawValue": "$100.27",
          "tone": "warm"
        },
        {
          "label": "US 10Y",
          "value": "+3.26 bps",
          "rawValue": "4.837%",
          "tone": "warm"
        }
      ]
    },
    "link": "https://apnews.com/article/d1284eb72934a3b076c14449bc087fbd",
    "readTime": "70 sec"
  },
  "marketDesk": {
    "title": "Markets & Rates",
    "intro": "A quick board before the longer read.",
    "summary": "A clean rebound can coexist with hidden fragility for a while. Energy, leadership concentration, and policy tone are the pressure points to watch.",
    "asOf": "2026-09-09T13:53:00-04:00",
    "sourceLabel": "AP and Reuters intraday reporting; unsupported fields are explicit coverage gaps.",
    "tiles": [
      {
        "id": "spx",
        "label": "S&P 500",
        "value": "coverage gap",
        "change": "lower intraday",
        "changeValue": -0.1,
        "direction": "down",
        "note": "AP reported stocks lower intraday without an accessible verified index level or percentage."
      },
      {
        "id": "nasdaq",
        "label": "Nasdaq",
        "value": "coverage gap",
        "change": "lower intraday",
        "changeValue": -0.1,
        "direction": "down",
        "note": "AP reported stocks lower intraday without an accessible verified index level or percentage."
      },
      {
        "id": "us2y",
        "label": "US 2Y",
        "value": "coverage gap",
        "change": "—",
        "changeValue": 0,
        "direction": "flat",
        "note": "No current verified 2-year yield in the source set."
      },
      {
        "id": "us10y",
        "label": "US 10Y",
        "value": "4.837%",
        "change": "+3.26 bps",
        "changeValue": 3.26,
        "changeUnit": "bp",
        "direction": "up",
        "note": "Reuters reported 4.837% at 1:53 PM ET, the highest since November 2023."
      },
      {
        "id": "dxy",
        "label": "DXY",
        "value": "coverage gap",
        "change": "—",
        "changeValue": 0,
        "direction": "flat",
        "note": "No current verified DXY quote in the source set."
      },
      {
        "id": "brent",
        "label": "Brent",
        "value": "$100.27",
        "change": "+2.4%",
        "changeValue": 2.4,
        "direction": "up",
        "note": "Reuters reported $100.27 at 1:53 PM ET."
      },
      {
        "id": "gold",
        "label": "Gold",
        "value": "coverage gap",
        "change": "—",
        "changeValue": 0,
        "direction": "flat",
        "note": "No current verified gold quote."
      },
      {
        "id": "bitcoin",
        "label": "Bitcoin",
        "value": "coverage gap",
        "change": "—",
        "changeValue": 0,
        "direction": "flat",
        "note": "No current verified Bitcoin quote."
      },
      {
        "id": "vix",
        "label": "VIX",
        "value": "coverage gap",
        "change": "—",
        "changeValue": 0,
        "direction": "flat",
        "note": "No current verified VIX quote."
      }
    ],
    "heatmap": [
      {
        "label": "US 10Y",
        "value": 3.26,
        "direction": "up",
        "theme": "Rates",
        "unit": "bp"
      },
      {
        "label": "Brent",
        "value": 2.4,
        "direction": "up",
        "theme": "Energy",
        "unit": "%"
      }
    ],
    "keyLines": [
      {
        "label": "Energy",
        "text": "Right now energy is not a side story. It is the hinge that connects world news, inflation nerves, and what central banks may or may not feel comfortable saying next.",
        "url": "https://apnews.com/article/d1284eb72934a3b076c14449bc087fbd"
      },
      {
        "label": "Rates",
        "text": "Right now energy is not a side story. It is the hinge that connects world news, inflation nerves, and what central banks may or may not feel comfortable saying next.",
        "url": "https://apnews.com/article/d1284eb72934a3b076c14449bc087fbd"
      },
      {
        "label": "AI & Private Markets",
        "text": "No private-company signal was loaded into today's raw reporting file.",
        "url": "https://apnews.com/article/fd35312e6d894d5f3b055b3d62f22cd2"
      }
    ]
  },
  "topStories": {
    "title": "Top Stories",
    "intro": "This is one tight daily edition. Read the pulse first, then work the ranked story cards for a finishable 6 to 8 minute briefing.",
    "cards": [
      {
        "id": "oil-macro-bridge",
        "coverageTopic": "economy-rates",
        "focusArea": "Macro",
        "urgency": "Must know",
        "readTime": "70 sec",
        "headline": "Oil is doing more macro work than the index headline suggests.",
        "takeaway": "Right now energy is not a side story. It is the hinge that connects world news, inflation nerves, and what central banks may or may not feel comfortable saying next.",
        "whatChanged": "Multiple reports kept crude and regional shipping risk near the center of the macro setup while equities tried to stay composed.",
        "whyItMatters": "If oil stays elevated into a central-bank-heavy week, the market has less room to keep pretending disinflation is automatic.",
        "marketImpact": "Energy can stay bid, long-duration assets get more fragile, and any rate-sensitive growth trade becomes harder to defend at rich valuations.",
        "disagreement": "Optimists think each diplomatic headline can cap crude quickly. Skeptics think shipping risk keeps a sticky premium in the system even when the news flow cools temporarily.",
        "watchToday": "Brent, Treasury yields, and Thursday's 8:30 AM ET PPI release; a cooler inflation print is the next clean falsifier for the oil-driven rates squeeze.",
        "tags": [
          "Oil",
          "Inflation",
          "Hormuz"
        ],
        "sourceTrail": {
          "primary": [
            "Associated Press",
            "Reuters",
            "Bureau of Labor Statistics"
          ],
          "framing": [
            "Morning Brew",
            "Brew Markets"
          ]
        },
        "newsletterSignalMatch": {
          "source": "Brew Markets",
          "subject": "Apple wants fold, hard cash",
          "matchedHints": [
            "rates"
          ]
        },
        "links": [
          {
            "label": "Associated Press on oil and the macro setup",
            "url": "https://apnews.com/article/d1284eb72934a3b076c14449bc087fbd"
          },
          {
            "label": "Reuters on oil and the macro setup",
            "url": "https://www.marketscreener.com/news/oil-treasury-yields-turn-higher-as-stocks-falter-ce785bd9d088f321"
          },
          {
            "label": "Bureau of Labor Statistics on oil and the macro setup",
            "url": "https://www.bls.gov/schedule/2026/09_sched_list.htm"
          }
        ],
        "primaryLink": {
          "label": "Associated Press on oil and the macro setup",
          "url": "https://apnews.com/article/d1284eb72934a3b076c14449bc087fbd"
        },
        "visual": {
          "palette": "amber",
          "eyebrow": "Economy & Rates",
          "title": "Energy is driving the inflation conversation again.",
          "summary": "Oil, shipping risk, and yields are moving together underneath the tape.",
          "graphic": {
            "type": "bar-chart",
            "sourceCaption": "Recreated from Associated Press + Reuters + Bureau of Labor Statistics.",
            "items": [
              {
                "label": "Brent",
                "value": 2.4,
                "display": "+2.4%",
                "tone": "warm"
              },
              {
                "label": "US 10Y",
                "value": 3.26,
                "display": "+3.26 bps",
                "tone": "warm"
              }
            ]
          },
          "points": [
            {
              "label": "Brent",
              "value": "+2.4%",
              "rawValue": "$100.27",
              "tone": "warm"
            },
            {
              "label": "US 10Y",
              "value": "+3.26 bps",
              "rawValue": "4.837%",
              "tone": "warm"
            }
          ]
        },
        "evidence": [
          {
            "source": "Associated Press",
            "headline": "Stocks fall as oil jumps above $100 after Iran war escalates",
            "url": "https://apnews.com/article/d1284eb72934a3b076c14449bc087fbd",
            "publishedDate": "2026-09-09",
            "editorialUse": "Oil is tightening financial conditions, pressuring equities, and complicating the Fed decision."
          },
          {
            "source": "Reuters",
            "headline": "Oil and Treasury yields turn higher as stocks falter",
            "url": "https://www.marketscreener.com/news/oil-treasury-yields-turn-higher-as-stocks-falter-ce785bd9d088f321",
            "publishedDate": "2026-09-09",
            "editorialUse": "Timestamped cross-asset facts and the divided policy setup."
          },
          {
            "source": "Bureau of Labor Statistics",
            "headline": "PPI Thursday and CPI Friday define the inflation calendar",
            "url": "https://www.bls.gov/schedule/2026/09_sched_list.htm",
            "publishedDate": "2026-09-09",
            "editorialUse": "The inflation sequence is the next falsifier for the oil-and-rates thesis."
          }
        ],
        "engineScore": 81
      },
      {
        "id": "generic-apple-s-foldable-hardware-launch-is-a-technology-premium-demand-and-new-ceo-execution-test",
        "coverageTopic": "ai-tech",
        "focusArea": "Markets",
        "urgency": "Useful edge",
        "readTime": "55 sec",
        "headline": "Apple's foldable hardware launch is a technology, premium-demand, and new-CEO execution test.",
        "takeaway": "AP reported Apple unveiled a foldable iPhone called Duo alongside updates to iPhone, Apple Watch, and AirPods under new CEO John Ternus.",
        "whatChanged": "The fresh update was apple unveiled its first foldable iPhone, called Duo, on September 9.",
        "whyItMatters": "Apple's first foldable is a test of premium-device demand, product mix, and execution under its new CEO; the launch alone does not prove an earnings reset.",
        "marketImpact": "If this theme strengthens, it can move positioning faster than a calm headline tape would suggest.",
        "disagreement": "Some investors will treat this as noise. Others will treat it as a useful clue about what the market is underpricing.",
        "watchToday": "Watch Apple shares, supplier read-through, preorder timing, and disclosed pricing; sustained mix and unit demand matter more than launch-day attention.",
        "tags": [
          "Markets",
          "Apple's",
          "foldable"
        ],
        "sourceTrail": {
          "primary": [
            "Associated Press",
            "Reuters"
          ],
          "framing": [
            "Brew Markets",
            "Morning Brew",
            "Tech Brew"
          ]
        },
        "newsletterSignalMatch": {
          "source": "Tech Brew",
          "subject": "A search bar for DNA",
          "matchedHints": []
        },
        "links": [
          {
            "label": "Associated Press on the story",
            "url": "https://apnews.com/article/fd35312e6d894d5f3b055b3d62f22cd2"
          },
          {
            "label": "Reuters on the story",
            "url": "https://www.investing.com/news/stock-market-news/apple-expected-to-unveil-first-folding-phone-with-new-ceo-ternus-in-command-4893058"
          }
        ],
        "primaryLink": {
          "label": "Associated Press on the story",
          "url": "https://apnews.com/article/fd35312e6d894d5f3b055b3d62f22cd2"
        },
        "visual": {
          "palette": "sky",
          "eyebrow": "Ai & Tech",
          "title": "AP reported Apple unveiled a foldable iPhone called Duo alongside updates to iPhone, Apple Watch, and AirPods under new CEO John Ternus.",
          "summary": "Tap through to open the source article.",
          "graphic": {
            "type": "fact-board",
            "sourceCaption": "Recreated from Associated Press + Reuters.",
            "items": [
              {
                "label": "Signal",
                "detail": "Markets"
              },
              {
                "label": "Signal",
                "detail": "Apple's"
              },
              {
                "label": "Signal",
                "detail": "foldable"
              }
            ]
          },
          "points": [
            {
              "label": "Signal 1",
              "value": "Markets",
              "tone": "warm"
            },
            {
              "label": "Signal 2",
              "value": "Apple's",
              "tone": "cool"
            },
            {
              "label": "Signal 3",
              "value": "foldable",
              "tone": "cool"
            }
          ]
        },
        "evidence": [
          {
            "source": "Associated Press",
            "headline": "Apple unveils iPhone Duo, its first foldable model",
            "url": "https://apnews.com/article/fd35312e6d894d5f3b055b3d62f22cd2",
            "publishedDate": "2026-09-09",
            "editorialUse": "Apple's foldable hardware launch is a technology, premium-demand, and new-CEO execution test."
          },
          {
            "source": "Reuters",
            "headline": "Apple's foldable launch puts new CEO and premium demand in focus",
            "url": "https://www.investing.com/news/stock-market-news/apple-expected-to-unveil-first-folding-phone-with-new-ceo-ternus-in-command-4893058",
            "publishedDate": "2026-09-09",
            "editorialUse": "Apple's foldable hardware launch is a technology, premium-demand, and new-CEO execution test."
          }
        ],
        "engineScore": 55.3
      },
      {
        "id": "generic-a-dated-housing-baseline-not-a-fresh-standalone-story",
        "coverageTopic": "economy-rates",
        "focusArea": "Markets",
        "urgency": "Useful edge",
        "readTime": "55 sec",
        "headline": "A dated housing baseline, not a fresh standalone story.",
        "takeaway": "Freddie Mac's latest weekly reading put the 30-year fixed mortgage rate at 6.71%; the next update is Thursday.",
        "whatChanged": "The fresh update was the 30-year fixed mortgage rate averaged 6.71% for the week of September 3.",
        "whyItMatters": "Mortgage rates near 6.7% keep affordability tight, so housing still reads as a higher-for-longer rates story instead of a clean recovery story.",
        "marketImpact": "If this theme strengthens, it can move positioning faster than a calm headline tape would suggest.",
        "disagreement": "Some investors will treat this as noise. Others will treat it as a useful clue about what the market is underpricing.",
        "watchToday": "Watch mortgage-rate direction, homebuilder sentiment, and whether supply gains start to matter more than financing pressure.",
        "tags": [
          "Markets",
          "A",
          "dated"
        ],
        "sourceTrail": {
          "primary": [
            "Freddie Mac"
          ],
          "framing": [
            "Brew Markets",
            "Morning Brew",
            "Tech Brew"
          ]
        },
        "newsletterSignalMatch": {
          "source": "Brew Markets",
          "subject": "Apple wants fold, hard cash",
          "matchedHints": [
            "rates"
          ]
        },
        "links": [
          {
            "label": "Freddie Mac on the story",
            "url": "https://www.freddiemac.com/pmms"
          }
        ],
        "primaryLink": {
          "label": "Freddie Mac on the story",
          "url": "https://www.freddiemac.com/pmms"
        },
        "visual": {
          "palette": "sky",
          "eyebrow": "Economy & Rates",
          "title": "Freddie Mac's latest weekly reading put the 30-year fixed mortgage rate at 6.71%; the next update is Thursday.",
          "summary": "Tap through to open the source article.",
          "graphic": {
            "type": "fact-board",
            "sourceCaption": "Recreated from Freddie Mac.",
            "items": [
              {
                "label": "Signal",
                "detail": "Markets"
              },
              {
                "label": "Signal",
                "detail": "A"
              },
              {
                "label": "Signal",
                "detail": "dated"
              }
            ]
          },
          "points": [
            {
              "label": "Signal 1",
              "value": "Markets",
              "tone": "warm"
            },
            {
              "label": "Signal 2",
              "value": "A",
              "tone": "cool"
            },
            {
              "label": "Signal 3",
              "value": "dated",
              "tone": "cool"
            }
          ]
        },
        "evidence": [
          {
            "source": "Freddie Mac",
            "headline": "Mortgage rates remain the verified housing constraint",
            "url": "https://www.freddiemac.com/pmms",
            "publishedDate": "2026-09-03",
            "editorialUse": "A dated housing baseline, not a fresh standalone story."
          }
        ],
        "engineScore": 55.3
      },
      {
        "id": "generic-a-distinct-global-policy-risk-whose-next-signal-is-allied-action-not-market-price-alone",
        "coverageTopic": "politics-world",
        "focusArea": "World",
        "urgency": "High signal",
        "readTime": "55 sec",
        "headline": "A distinct global-policy risk whose next signal is allied action, not market price alone.",
        "takeaway": "AP reported Ukraine's president pressed international partners for a tougher response to escalating Russian attacks on civilian areas.",
        "whatChanged": "The fresh update was president Volodymyr Zelenskyy urged stronger international pressure on Russia on September 9.",
        "whyItMatters": "World stories matter when they start changing the policy, supply-chain, or risk backdrop that investors have to price.",
        "marketImpact": "The direct market effect may stay muted at first, but the second-order policy and sentiment effects are what matter.",
        "disagreement": "Some readers will treat it as isolated news flow. Others will treat it as an early clue about broader policy or geopolitical direction.",
        "watchToday": "Watch who amplifies the story next and whether it starts changing the wider policy or risk conversation.",
        "tags": [
          "World",
          "A",
          "distinct"
        ],
        "sourceTrail": {
          "primary": [
            "Associated Press"
          ],
          "framing": [
            "Morning Brew",
            "Tech Brew"
          ]
        },
        "newsletterSignalMatch": {
          "source": "Morning Brew",
          "subject": "Heated survivalry",
          "matchedHints": []
        },
        "links": [
          {
            "label": "Associated Press on the story",
            "url": "https://apnews.com/article/6670c99dcc9ed149a2bd9c0deac455cf"
          }
        ],
        "primaryLink": {
          "label": "Associated Press on the story",
          "url": "https://apnews.com/article/6670c99dcc9ed149a2bd9c0deac455cf"
        },
        "visual": {
          "palette": "mint",
          "eyebrow": "Politics & World",
          "title": "World stories matter when they start changing the policy map.",
          "summary": "The direct move can look small at first. The real question is what gets repriced next.",
          "graphic": {
            "type": "fact-board",
            "sourceCaption": "Recreated from Associated Press.",
            "items": [
              {
                "label": "Theme",
                "detail": "A"
              },
              {
                "label": "Market link",
                "detail": "Policy and risk sentiment"
              },
              {
                "label": "Watch",
                "detail": "Who amplifies it next"
              }
            ]
          },
          "points": [
            {
              "label": "Theme",
              "value": "A",
              "tone": "warm"
            },
            {
              "label": "Readthrough",
              "value": "Policy spillover",
              "tone": "cool"
            },
            {
              "label": "Watch",
              "value": "Narrative shift",
              "tone": "cool"
            }
          ]
        },
        "evidence": [
          {
            "source": "Associated Press",
            "headline": "Zelenskyy urges more pressure on Russia after civilian deaths",
            "url": "https://apnews.com/article/6670c99dcc9ed149a2bd9c0deac455cf",
            "publishedDate": "2026-09-09",
            "editorialUse": "A distinct global-policy risk whose next signal is allied action, not market price alone."
          }
        ],
        "engineScore": 54.8
      },
      {
        "id": "generic-use-a-gap-block-instead-of-transaction-filler",
        "coverageTopic": "markets",
        "focusArea": "Markets",
        "urgency": "Useful edge",
        "readTime": "55 sec",
        "headline": "Use a gap block instead of transaction filler.",
        "takeaway": "No material M&A, IPO pricing, funding, or private-credit event was established; PitchBook enrichment was unavailable.",
        "whatChanged": "The fresh update was no authenticated PitchBook route was available.",
        "whyItMatters": "The more useful read is what this changes in the day's setup for investors and operators, not just the headline itself.",
        "marketImpact": "If this theme strengthens, it can move positioning faster than a calm headline tape would suggest.",
        "disagreement": "Some investors will treat this as noise. Others will treat it as a useful clue about what the market is underpricing.",
        "watchToday": "Watch for follow-through in prices, sector leadership, and management commentary rather than assuming the first headline got the story right.",
        "tags": [
          "Markets",
          "Use",
          "a"
        ],
        "sourceTrail": {
          "primary": [
            "Morning Brief editorial desk"
          ],
          "framing": [
            "Brew Markets",
            "Morning Brew",
            "Tech Brew"
          ]
        },
        "newsletterSignalMatch": {
          "source": "CFO Brew",
          "subject": "Power moves",
          "matchedHints": [
            "pricing"
          ]
        },
        "links": [
          {
            "label": "Morning Brief editorial desk on the story",
            "url": "https://www.sec.gov/edgar/search/"
          }
        ],
        "primaryLink": {
          "label": "Morning Brief editorial desk on the story",
          "url": "https://www.sec.gov/edgar/search/"
        },
        "visual": {
          "palette": "sky",
          "eyebrow": "Markets",
          "title": "No material M&A, IPO pricing, funding, or private-credit event was established; PitchBook enrichment was unavailable.",
          "summary": "Tap through to open the source article.",
          "graphic": {
            "type": "fact-board",
            "sourceCaption": "Recreated from Morning Brief editorial desk.",
            "items": [
              {
                "label": "Signal",
                "detail": "Markets"
              },
              {
                "label": "Signal",
                "detail": "Use"
              },
              {
                "label": "Signal",
                "detail": "a"
              }
            ]
          },
          "points": [
            {
              "label": "Signal 1",
              "value": "Markets",
              "tone": "warm"
            },
            {
              "label": "Signal 2",
              "value": "Use",
              "tone": "cool"
            },
            {
              "label": "Signal 3",
              "value": "a",
              "tone": "cool"
            }
          ]
        },
        "evidence": [
          {
            "source": "Morning Brief editorial desk",
            "headline": "Private markets and deals remain a transparent coverage gap",
            "url": "https://www.sec.gov/edgar/search/",
            "publishedDate": "2026-09-09",
            "editorialUse": "Use a gap block instead of transaction filler."
          }
        ],
        "engineScore": 54.4
      },
      {
        "id": "generic-a-real-estate-capital-signal-linking-industrial-parks-and-infrastructure-to-north-american-supply-chains",
        "coverageTopic": "ai-tech",
        "focusArea": "Markets",
        "urgency": "Useful edge",
        "readTime": "55 sec",
        "headline": "A real-estate-capital signal linking industrial parks and infrastructure to North American supply chains.",
        "takeaway": "Reuters reported BIVA's chief said Mexican FIBRAs could finance industrial parks, logistics assets, and AI-related infrastructure.",
        "whatChanged": "The fresh update was BIVA CEO Maria Ariza said Mexican FIBRAs can finance industrial parks, logistics assets, and infrastructure.",
        "whyItMatters": "The capital-markets question is whether manufacturing and AI-infrastructure demand can translate into durable occupancy, rents, and investable project pipelines for Mexican FIBRAs.",
        "marketImpact": "If this theme strengthens, it can move positioning faster than a calm headline tape would suggest.",
        "disagreement": "Some investors will treat this as noise. Others will treat it as a useful clue about what the market is underpricing.",
        "watchToday": "Watch for named projects, financing commitments, tenant demand, and follow-through from Mexico Investment Week rather than treating an exchange executive's thesis as completed investment.",
        "tags": [
          "Markets",
          "A",
          "real"
        ],
        "sourceTrail": {
          "primary": [
            "Reuters"
          ],
          "framing": [
            "Brew Markets",
            "Morning Brew",
            "Tech Brew"
          ]
        },
        "newsletterSignalMatch": {
          "source": "Morning Brew",
          "subject": "Heated survivalry",
          "matchedHints": []
        },
        "links": [
          {
            "label": "Reuters on the story",
            "url": "https://www.marketscreener.com/news/mexico-s-reits-poised-to-benefit-from-manufacturing-ai-boom-exchange-chief-says-ce785bd9df88f722"
          }
        ],
        "primaryLink": {
          "label": "Reuters on the story",
          "url": "https://www.marketscreener.com/news/mexico-s-reits-poised-to-benefit-from-manufacturing-ai-boom-exchange-chief-says-ce785bd9df88f722"
        },
        "visual": {
          "palette": "sky",
          "eyebrow": "Ai & Tech",
          "title": "Reuters reported BIVA's chief said Mexican FIBRAs could finance industrial parks, logistics assets, and AI-related infrastructure.",
          "summary": "Tap through to open the source article.",
          "graphic": {
            "type": "fact-board",
            "sourceCaption": "Recreated from Reuters.",
            "items": [
              {
                "label": "Signal",
                "detail": "Markets"
              },
              {
                "label": "Signal",
                "detail": "A"
              },
              {
                "label": "Signal",
                "detail": "real"
              }
            ]
          },
          "points": [
            {
              "label": "Signal 1",
              "value": "Markets",
              "tone": "warm"
            },
            {
              "label": "Signal 2",
              "value": "A",
              "tone": "cool"
            },
            {
              "label": "Signal 3",
              "value": "real",
              "tone": "cool"
            }
          ]
        },
        "evidence": [
          {
            "source": "Reuters",
            "headline": "Mexico REITs pitch manufacturing and AI-infrastructure growth",
            "url": "https://www.marketscreener.com/news/mexico-s-reits-poised-to-benefit-from-manufacturing-ai-boom-exchange-chief-says-ce785bd9df88f722",
            "publishedDate": "2026-09-09",
            "editorialUse": "A real-estate-capital signal linking industrial parks and infrastructure to North American supply chains."
          }
        ],
        "engineScore": 53.5
      }
    ]
  },
  "sourceDesk": {
    "title": "Top From the Sources",
    "intro": "One useful click from each major desk.",
    "sections": [
      {
        "source": "Reuters",
        "shortName": "Reuters",
        "headline": "Oil and Treasury yields turn higher as stocks falter",
        "summary": "Right now energy is not a side story. It is the hinge that connects world news, inflation nerves, and what central banks may or may not feel comfortable saying next.",
        "note": "If oil stays elevated into a central-bank-heavy week, the market has less room to keep pretending disinflation is automatic.",
        "relatedHeadline": "Oil is doing more macro work than the index headline suggests.",
        "coverageTopic": "economy-rates",
        "url": "https://www.marketscreener.com/news/oil-treasury-yields-turn-higher-as-stocks-falter-ce785bd9d088f321"
      },
      {
        "source": "Associated Press",
        "shortName": "AP",
        "headline": "Apple unveils iPhone Duo, its first foldable model",
        "summary": "AP reported Apple unveiled a foldable iPhone called Duo alongside updates to iPhone, Apple Watch, and AirPods under new CEO John Ternus.",
        "note": "Apple's first foldable is a test of premium-device demand, product mix, and execution under its new CEO; the launch alone does not prove an earnings reset.",
        "relatedHeadline": "Apple's foldable hardware launch is a technology, premium-demand, and new-CEO execution test.",
        "coverageTopic": "ai-tech",
        "url": "https://apnews.com/article/fd35312e6d894d5f3b055b3d62f22cd2"
      }
    ]
  },
  "newsletterDesk": {
    "title": "From Your Inbox",
    "intro": "Short summaries of the newsletters already sitting in Gmail.",
    "note": "If a newsletter has not arrived yet by refresh time, this section automatically falls back to the latest editorial issue.",
    "briefs": [
      {
        "name": "Morning Brew",
        "label": "Morning Brief/Inputs/Morning Brew",
        "subject": "Heated survivalry",
        "summary": "Morning Brew organized its edition around stale business framing, with the clearest through-line being that do not use this stale issue to drive ranking..",
        "whyItMatters": "Do not use this stale issue to drive ranking.",
        "marketRead": "Broad business framing",
        "whatToSteal": "Latest true editorial issue remains stale; the later break notice was rejected.",
        "signalLines": [
          "Do not use this stale issue to drive ranking."
        ],
        "topTopics": [
          "stale business framing"
        ],
        "tone": "Broad business framing",
        "palette": "gold",
        "graphic": {
          "type": "topic-stack",
          "sourceCaption": "Recreated from the latest Morning Brew issue in Gmail.",
          "items": [
            {
              "label": "01",
              "detail": "stale business framing"
            }
          ]
        },
        "visualPoints": [
          {
            "label": "Lead",
            "value": "stale business framing",
            "tone": "warm"
          }
        ],
        "displayUrl": "https://mail.google.com/mail/#all/19e731241d6f5c2c",
        "issueDateLabel": "Friday, May 29, 2026",
        "freshnessLabel": "Latest available",
        "arrivalNote": "Today's edition had not landed at refresh time, so this falls back to the latest editorial issue in Gmail."
      },
      {
        "name": "Brew Markets",
        "label": "Morning Brief/Inputs/Brew Markets",
        "subject": "Apple wants fold, hard cash",
        "summary": "Brew Markets organized its edition around Apple foldable iPhone, Treasury market, and rates, with the clearest through-line being that apple's foldable launch is the verified company catalyst..",
        "whyItMatters": "Apple's foldable launch is the verified company catalyst.",
        "marketRead": "Higher long yields and Treasury operations remain part of the macro setup.",
        "whatToSteal": "Framed Apple's foldable launch and the Treasury market as the day's investor conversation.",
        "signalLines": [
          "Apple's foldable launch is the verified company catalyst.",
          "Higher long yields and Treasury operations remain part of the macro setup."
        ],
        "topTopics": [
          "Apple foldable iPhone",
          "Treasury market",
          "rates"
        ],
        "tone": "Retail-market framing",
        "palette": "blue",
        "graphic": {
          "type": "topic-stack",
          "sourceCaption": "Recreated from the latest Brew Markets issue in Gmail.",
          "items": [
            {
              "label": "01",
              "detail": "Apple foldable iPhone"
            },
            {
              "label": "02",
              "detail": "Treasury market"
            },
            {
              "label": "03",
              "detail": "rates"
            }
          ]
        },
        "visualPoints": [
          {
            "label": "Lead",
            "value": "Apple foldable iPhone",
            "tone": "warm"
          },
          {
            "label": "Angle",
            "value": "Treasury market",
            "tone": "cool"
          },
          {
            "label": "Watch",
            "value": "rates",
            "tone": "cool"
          }
        ],
        "displayUrl": "https://mail.google.com/mail/#all/1a087cf6be8da696",
        "issueDateLabel": "Wednesday, September 9, 2026",
        "freshnessLabel": "Latest available",
        "arrivalNote": "Today's edition had not landed at refresh time, so this falls back to the latest editorial issue in Gmail."
      },
      {
        "name": "Tech Brew",
        "label": "Morning Brief/Inputs/Tech Brew",
        "subject": "A search bar for DNA",
        "summary": "Tech Brew organized its edition around genomics search, Apple foldable iPhone, and consumer hardware, with the clearest through-line being that use Apple as the primary verified technology event..",
        "whyItMatters": "Use Apple as the primary verified technology event.",
        "marketRead": "Genomics tooling did not clear the primary-source and materiality bar for this edition.",
        "whatToSteal": "Focused on genomics search tools and Apple's first foldable phone.",
        "signalLines": [
          "Use Apple as the primary verified technology event.",
          "Genomics tooling did not clear the primary-source and materiality bar for this edition."
        ],
        "topTopics": [
          "genomics search",
          "Apple foldable iPhone",
          "consumer hardware"
        ],
        "tone": "Technology-product framing",
        "palette": "rose",
        "graphic": {
          "type": "topic-stack",
          "sourceCaption": "Recreated from the latest Tech Brew issue in Gmail.",
          "items": [
            {
              "label": "01",
              "detail": "genomics search"
            },
            {
              "label": "02",
              "detail": "Apple foldable iPhone"
            },
            {
              "label": "03",
              "detail": "consumer hardware"
            }
          ]
        },
        "visualPoints": [
          {
            "label": "Lead",
            "value": "genomics search",
            "tone": "warm"
          },
          {
            "label": "Angle",
            "value": "Apple foldable iPhone",
            "tone": "cool"
          },
          {
            "label": "Watch",
            "value": "consumer hardware",
            "tone": "cool"
          }
        ],
        "displayUrl": "https://mail.google.com/mail/#all/1a0875e0599bde09",
        "issueDateLabel": "Wednesday, September 9, 2026",
        "freshnessLabel": "Latest available",
        "arrivalNote": "Today's edition had not landed at refresh time, so this falls back to the latest editorial issue in Gmail."
      },
      {
        "name": "CFO Brew",
        "label": "Morning Brief/Inputs/CFO Brew",
        "subject": "Power moves",
        "summary": "CFO Brew organized its edition around energy costs, corporate margins, and pricing, with the clearest through-line being that oil above $100 matters through margins, pricing, and working capital..",
        "whyItMatters": "Oil above $100 matters through margins, pricing, and working capital.",
        "marketRead": "Energy is a cross-sector earnings risk, not only a commodity story.",
        "whatToSteal": "Framed escalating energy costs as an operating and margin issue for finance leaders.",
        "signalLines": [
          "Oil above $100 matters through margins, pricing, and working capital.",
          "Energy is a cross-sector earnings risk, not only a commodity story."
        ],
        "topTopics": [
          "energy costs",
          "corporate margins",
          "pricing"
        ],
        "tone": "Operator-finance framing",
        "palette": "sage",
        "graphic": {
          "type": "topic-stack",
          "sourceCaption": "Recreated from the latest CFO Brew issue in Gmail.",
          "items": [
            {
              "label": "01",
              "detail": "energy costs"
            },
            {
              "label": "02",
              "detail": "corporate margins"
            },
            {
              "label": "03",
              "detail": "pricing"
            }
          ]
        },
        "visualPoints": [
          {
            "label": "Lead",
            "value": "energy costs",
            "tone": "warm"
          },
          {
            "label": "Angle",
            "value": "corporate margins",
            "tone": "cool"
          },
          {
            "label": "Watch",
            "value": "pricing",
            "tone": "cool"
          }
        ],
        "displayUrl": "https://mail.google.com/mail/#all/1a086e1c583383a4",
        "issueDateLabel": "Wednesday, September 9, 2026",
        "freshnessLabel": "Latest available",
        "arrivalNote": "Today's edition had not landed at refresh time, so this falls back to the latest editorial issue in Gmail."
      },
      {
        "name": "The Playbook",
        "label": "Morning Brief/Inputs/The Playbook",
        "subject": "Old school, new digs",
        "summary": "The Playbook organized its edition around adaptive reuse, renters, and housing, with the clearest through-line being that adaptive reuse is a niche supply story..",
        "whyItMatters": "Adaptive reuse is a niche supply story.",
        "marketRead": "Use Freddie Mac and verified capital-markets reporting for current housing facts.",
        "whatToSteal": "Covered adaptive reuse and renter demand; useful only as real-estate framing.",
        "signalLines": [
          "Adaptive reuse is a niche supply story.",
          "Use Freddie Mac and verified capital-markets reporting for current housing facts."
        ],
        "topTopics": [
          "adaptive reuse",
          "renters",
          "housing"
        ],
        "tone": "Practical real-estate framing",
        "palette": "paper",
        "graphic": {
          "type": "topic-stack",
          "sourceCaption": "Recreated from the latest The Playbook issue in Gmail.",
          "items": [
            {
              "label": "01",
              "detail": "adaptive reuse"
            },
            {
              "label": "02",
              "detail": "renters"
            },
            {
              "label": "03",
              "detail": "housing"
            }
          ]
        },
        "visualPoints": [
          {
            "label": "Lead",
            "value": "adaptive reuse",
            "tone": "warm"
          },
          {
            "label": "Angle",
            "value": "renters",
            "tone": "cool"
          },
          {
            "label": "Watch",
            "value": "housing",
            "tone": "cool"
          }
        ],
        "displayUrl": "https://mail.google.com/mail/#all/1a06c819e5ed6f97",
        "issueDateLabel": "Friday, September 4, 2026",
        "freshnessLabel": "Latest available",
        "arrivalNote": "Today's edition had not landed at refresh time, so this falls back to the latest editorial issue in Gmail."
      }
    ]
  },
  "edge": {
    "peerMiss": {
      "title": "The real bridge story is energy, not the loudest macro headline.",
      "body": "A lot of people will narrate the day around central banks or a single earnings print. The more useful frame is that energy is connecting geopolitics, inflation risk, and equity fragility underneath almost everything else."
    },
    "sayInMeeting": {
      "title": "Use this line.",
      "body": "The useful edge this morning is not the headline itself. It is how quickly that headline can spill into the broader risk conversation."
    },
    "chartOfDay": {
      "title": "Crude versus rates sensitivity.",
      "body": "Track whether oil or central-bank commentary is doing more work in yields and growth-heavy leadership. That tells you which narrative the market actually trusts.",
      "takeaway": "The point is to see which variable is really setting the tone instead of assuming the loudest headline is in charge."
    },
    "deepDive": {
      "title": "Why oil is the connector theme.",
      "body": "Energy is what turns a regional headline into an inflation question, a rates question, and then a valuation question for the rest of the tape.",
      "whyNow": "If you miss that bridge, the day feels random when it is actually much more connected.",
      "link": "https://apnews.com/article/d1284eb72934a3b076c14449bc087fbd"
    }
  },
  "sourceStack": [
    {
      "name": "Reuters",
      "tier": "Tier 1",
      "role": "Primary reporting",
      "note": "Fast factual updates on rates, oil, and world-risk developments."
    },
    {
      "name": "Associated Press",
      "tier": "Tier 1",
      "role": "Primary reporting",
      "note": "Policy-relevant world and security coverage with clean factual grounding."
    },
    {
      "name": "Morning Brew",
      "tier": "Tier 2",
      "role": "Curated framing input",
      "note": "Broad smart-professional angle detection and business-narrative simplification."
    },
    {
      "name": "Tech Brew",
      "tier": "Tier 2",
      "role": "Curated framing input",
      "note": "Technology business framing and AI-policy angle detection when relevant."
    },
    {
      "name": "Brew Markets",
      "tier": "Tier 2",
      "role": "Curated framing input",
      "note": "Retail-market tone, investing angle detection, and sentiment framing."
    }
  ],
  "commuteRoute": [
    {
      "label": "0-1 min",
      "title": "Lock the thesis.",
      "note": "Read the hero and the signal board first. If you remember only one thing, remember the connectors instead of the isolated headlines."
    },
    {
      "label": "1-7 min",
      "title": "Work the essential cards.",
      "note": "Move through the cards in order. They are ranked to give you the best return on attention while your brain is freshest."
    },
    {
      "label": "7-12 min",
      "title": "Steal the edge layer.",
      "note": "Read the peers-miss card and the meeting line so you leave with language, not just information."
    },
    {
      "label": "12-16 min",
      "title": "Choose one deeper angle.",
      "note": "If you still have time, use the chart and deep-dive prompts to decide what deserves follow-up after you get to work."
    }
  ],
  "footerPerspective": {
    "title": "The durable frame is that this morning is less about headline volume and more about which few forces are truly setting the terms of risk.",
    "summary": "If you keep coming back to the core drivers instead of every update around them, you will sound clearer and think faster than people who only skimmed the surface."
  }
};

if (typeof window !== "undefined") {
  window.MORNING_BRIEFING = MORNING_BRIEFING;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = MORNING_BRIEFING;
}
