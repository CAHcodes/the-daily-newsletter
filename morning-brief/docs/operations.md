# Morning Brief Operations

## Daily workflow

1. Refresh `data/staging/story-candidates.json` with the current edition inputs.
2. Update `data/raw/gmail/latest-newsletters.json` and `data/raw/web/latest-reporting.json`.
3. Run `scripts/build-story-candidates-v2.js` with the bundled Node runtime.
4. Run `scripts/build-briefing-v2.js` with the bundled Node runtime.
5. Run `scripts/render-outputs.js` with the bundled Node runtime.
6. Confirm the generated files exist in `outputs/`.
7. Inspect `data/compiled/briefing-debug.json` if ranking needs a sanity check.
8. Read the delivery settings in `config/delivery-settings.json`.
9. Send the Gmail edition using the generated subject, HTML body, and text fallback files when the run is in send mode.
10. If `recipients` is configured, send the same edition to every listed address.

Current state:

- the legacy live-send workflow is paused while V2 is redesigned
- V2 requirements are defined in `docs/product-spec-v2.md`
- Gmail newsletter inputs are cataloged in `config/newsletter-inputs.json`
- Editorial classification and issue-shape rules live in `docs/newsletter-ingestion-playbook.md`
- Ranked-selection logic is defined in `config/ranking-weights.json`
- Standing reader and launch preferences live in `config/reader-profile.json`

## Editorial guardrails

- Lead with market and finance stories.
- Overweight public stocks, private companies, macro, AI, crypto, rates, and treasuries unless the reader profile changes.
- Cover world news second.
- Keep the total reading time around 15 to 20 minutes as one tight edition, not multiple stacked reading layers.
- Prefer recognized outlets.
- Stay concise and useful for a distracted reader.
- Meet the final version quality standard in `config/quality-standard.md`.
- Use Morning Brew-family inputs as synthesis inputs, not as the final product itself.
- Capture `topTopics`, `usefulSignals`, and `newsletterTone` when real editorial Brew issues arrive.
- Make every story card interactive, with a direct path to the primary article and a clear visual treatment.
- Prefer the HTML email edition for delivery when `html_body_source` is configured, and keep the markdown body as the fallback path.

## File safety

- Do not hand-edit files under `outputs/` unless doing a temporary emergency fix.
- Do not hand-edit `data/staging/story-candidates.json` during normal operation. Generate it from raw inputs instead.
- Do not hand-edit `app/data/briefing-data.js` during normal operation. Build it from staging instead.
- Do not change visual files during a normal news refresh.
- If the layout needs work, treat that as a separate design task.
