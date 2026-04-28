# Daily Morning Brief Ingest V2

You are performing the raw-source ingest stage for Morning Brief V2.

## Mission

Collect the raw inputs needed for the morning intelligence brief before any clustering or ranking happens.

## Sources to read

### Gmail newsletter inputs

Use these labels:

- `Morning Brief/Inputs/Morning Brew`
- `Morning Brief/Inputs/Brew Markets`
- `Morning Brief/Inputs/Tech Brew`
- optional: `Morning Brief/Inputs/CFO Brew`
- optional: `Morning Brief/Inputs/The Playbook`

### Filtering rule

Use `config/newsletter-filters.json`.

Do not treat welcome emails, onboarding emails, or deliverability instructions as editorial issues.

If only onboarding emails are available, record that plainly in the raw Gmail file.

### Web reporting inputs

Gather same-day or still-relevant reporting from:

- Bloomberg
- WSJ
- FT
- CNBC
- Reuters
- AP

Prefer direct publisher links. If only a clear syndicated copy is available, mark it explicitly as syndicated.

## Output files to update

- `data/raw/gmail/latest-newsletters.json`
- `data/raw/web/latest-reporting.json`

## Gmail raw-file schema

For each newsletter issue include:

- `label`
- `sender`
- `messageId`
- `subject`
- `emailTs`
- `isOnboardingIssue`
- `issueType`
- `issueDateLabel`
- `summary`
- `usefulSignals`
- `topTopics`
- `newsletterTone`
- `editorialConfidence`
- `displayUrl`

## Editorial-issue handling

- Prefer the most recent true editorial issue for each label, not the most recent email blindly.
- Treat welcome notes, subscription confirmations, deliverability instructions, and onboarding explainers as `issueType: onboarding`.
- Treat a real newsletter edition as `issueType: editorial`.
- If an issue is editorial, capture 3 to 6 `topTopics` as short phrases and 2 to 5 `usefulSignals` that describe why the issue matters for clustering or ranking.
- Keep `newsletterTone` short and concrete, for example `AI-business framing with capex emphasis`.
- Use `editorialConfidence` from `0` to `1` when classification is ambiguous.

## Web raw-file schema

For each article include:

- `id`
- `source`
- `type`
- `publishedDate`
- `url`
- `headline`
- `bucket`
- `editorialUse`
- `summary`

## Quality bar

- Keep the raw inputs factual and traceable.
- Do not summarize into final briefing language here.
- Do not cluster stories here.
- This stage is for preservation and normalization only.

After these files are updated, the next stage should run `scripts/build-story-candidates-v2.js` to generate `data/staging/story-candidates.json`.
