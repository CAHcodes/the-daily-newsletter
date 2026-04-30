# Morning Brief

This is a commute-first daily news product for a busy reader who wants a high-signal, ADHD-friendly briefing every morning.

## Organized structure

```text
morning-brief/
|-- app/
|   |-- assets/
|   |-- data/
|   `-- index.html
|-- automation/
|   `-- prompts/
|-- config/
|-- data/
|   |-- raw/
|   |-- compiled/
|   `-- staging/
|-- docs/
|-- outputs/
|   |-- email/
|   `-- newsletter/
`-- scripts/
```

## What is already built

- A mobile-first dashboard at `app/index.html`
- A canonical briefing data file at `app/data/briefing-data.js`
- Generated newsletter and email outputs under `outputs/`
- Reusable automation prompts under `automation/prompts/`
- Delivery configuration under `config/`
- A staging and compiled data pipeline under `data/`
- A raw-source capture layer under `data/raw/`
- A V2 product spec and research notes under `docs/`
- A GitHub Pages workflow under `.github/workflows/`
- A standing reader preference profile at `config/reader-profile.json`

## Why this approach

The system is intentionally simple and tidy:

- It opens instantly
- It keeps one clear source of truth
- The automation updates content first, then renders outputs
- It is ready for GitHub Pages and Gmail delivery

## How to open it

Open `app/index.html` in your browser.

## How the daily system works

1. Update raw source files in `data/raw/`
2. Run `scripts/build-story-candidates-v2.js`
3. Run `scripts/build-briefing-v2.js`
4. Run `scripts/render-outputs.js`
5. Read the new files in `outputs/`
6. Check `data/compiled/briefing-debug.json` if you want ranking visibility
7. Optionally draft or send the email delivery

## Delivery model

- Dashboard: `app/index.html`
- Newsletter markdown: `outputs/newsletter/latest-briefing.md`
- Email HTML: `outputs/email/latest-email.html`
- Email markdown fallback: `outputs/email/latest-email.md`

## Best next upgrades

### 1. Turn on GitHub publishing

Push the repo and enable GitHub Pages so the dashboard becomes a phone-friendly web app.

### 2. Turn on Gmail delivery mode

The system is configured for `send` mode and targets `chris.aiza17@gmail.com`, but live delivery is currently paused during the V2 redesign.

### 3. Add premium-source depth carefully

Use the signed-in environment for WSJ and Bloomberg access, but never store account credentials in the project.

## V2 direction

The next implementation phase should follow:

- `docs/research-findings-v2.md`
- `docs/product-spec-v2.md`
- `config/newsletter-inputs.json`
- `docs/pipeline-v2.md`
- `automation/prompts/daily-ingest-v2.md`
- `docs/newsletter-ingestion-playbook.md`

## Current launch profile

- Repo name: `The Daily Newsletter`
- Repo visibility: `public`
- Domain mode: `default`
- Design lead: `Codex chooses`
- Go-live behavior: `activate now`
- Editorial priority: `markets first`
- Geography mix: `balanced`
- Preferred premium sources: `WSJ`, `Bloomberg`, `FT`, `CNBC`, `Morning Brew`, `Tech Brew`, `CFO Brew`

## Important note on Brew-family inputs

The Morning Brew-family newsletters are now wired as true raw inputs, but the system only treats them as active framing sources once editorial issues arrive.

If Gmail only contains onboarding or welcome emails, the raw ingest stage records that plainly and the final brief falls back to Tier 1 reporting only.
