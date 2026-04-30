# Morning Brief Architecture

## Product shape

Morning Brief is moving from a simple digest into a layered morning intelligence system.

## Canonical source of truth

- `app/data/briefing-data.js`

This file is the only content artifact the daily refresh should edit directly.

## Current V2 schema

The canonical file is now organized into:

- `meta`
- `thesis`
- `scan`
- `essential`
- `edge`
- `sourceStack`
- `commuteRoute`
- `footerPerspective`

## V2 target pipeline

The intended V2 pipeline is:

1. ingest newsletter inputs from Gmail and top-tier reporting from the web
2. write normalized raw files into `data/raw/`
3. run `scripts/build-story-candidates-v2.js` to cluster overlapping stories and generate edition framing
4. write the structured candidates into `data/staging/story-candidates.json`
5. rank the clusters for signal and usefulness
6. synthesize one daily thesis and a small number of intelligence cards
7. render dashboard and email outputs
8. gate delivery through the quality standard

## Rendered experiences

- `app/index.html`
- `outputs/newsletter/latest-briefing.md`
- `outputs/email/latest-email.md`
- `outputs/email/latest-email.html`

The dashboard reads the canonical file in the browser. The newsletter and email outputs are generated from the same canonical file by `scripts/render-outputs.js`.

The email renderer now produces:

- a send-preferred HTML edition at `outputs/email/latest-email.html`
- a markdown fallback at `outputs/email/latest-email.md`

The automation should prefer the HTML edition when delivery settings include `html_body_source`.

Current note:

- the live send automation is paused during the V2 redesign so the product can be rebuilt to a higher standard before resuming delivery

## Folder responsibilities

- `app/`: the phone-friendly dashboard
- `automation/`: prompts and scheduling-facing instructions
- `config/`: stable editorial rules and source priorities
- `data/`: staged inputs and compiled debug artifacts
- `docs/`: operating documentation
- `outputs/`: generated briefing artifacts
- `scripts/`: local ingest, ranking, and render helpers

## Maintenance rule

Change content in one place first, then regenerate outputs. This keeps the dashboard and newsletter aligned and avoids drift.
