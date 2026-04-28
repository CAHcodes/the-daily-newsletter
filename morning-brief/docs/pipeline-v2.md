# Morning Brief V2 Pipeline

## Goal

Turn many raw inputs into one high-signal morning intelligence brief without losing source traceability.

## Folder flow

### Raw

- `data/raw/gmail/latest-newsletters.json`
- `data/raw/web/latest-reporting.json`

These files preserve the raw inputs gathered from Gmail and the web before clustering.

### Staging

- `data/staging/story-candidates.json`
- `scripts/build-story-candidates-v2.js`
- `scripts/lib/story-candidate-engine.js`

This is the organized intake file for the daily edition.

It should contain:

- edition metadata
- briefing context
- source catalog
- clustered story candidates with explicit scores
- raw-source status so onboarding-only newsletter days stay visible

### Build

- `scripts/build-briefing-v2.js`
- `scripts/lib/briefing-engine.js`

These files:

- score candidates using `config/ranking-weights.json`
- enforce a balanced mix of market and world stories
- select the final cards
- generate the canonical dashboard data file
- write an audit artifact to `data/compiled/briefing-debug.json`

### Render

- `scripts/render-outputs.js`

This file converts the canonical data file into:

- dashboard data for the app
- markdown newsletter
- markdown email
- html email

## Daily flow

1. Read the latest Morning Brew-family emails from Gmail.
2. Filter out onboarding or non-editorial newsletter messages.
3. Gather same-day Tier 1 reporting from the web.
4. Write the raw source files in `data/raw/`.
5. Run `scripts/build-story-candidates-v2.js`.
6. Let the story-candidate engine cluster overlapping stories and generate the edition framing.
7. Write the structured candidate set to `data/staging/story-candidates.json`.
8. Run `scripts/build-briefing-v2.js`.
9. Run `scripts/render-outputs.js`.
10. Review the debug artifact if needed before resuming live send mode.

## Why this matters

This pipeline creates a real editorial system:

- raw inputs stay separate from the final brief
- ranking becomes explicit and auditable
- the generated edition is reproducible
- source framing and factual grounding are both preserved
