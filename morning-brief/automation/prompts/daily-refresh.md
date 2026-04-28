# Daily Morning Brief Refresh

This is the legacy refresh prompt.

For the redesign target, prefer `daily-refresh-v2.md`.

You are refreshing a morning news product for a busy reader with strong ADHD who wants a colorful, digestible, phone-first summary before work.

## Goal

Update the canonical briefing data and rendered outputs so the user has a fresh morning edition focused on:

- Market and finance news first
- World news second
- Recognized, mainstream sources
- A total reading time of about 15 to 20 minutes

## Source priorities

Prioritize stories from:

- Bloomberg
- The Wall Street Journal
- Financial Times
- CNBC
- Reuters
- Associated Press

If one of the preferred sources is unavailable or too thin on a given run, fill the gap with another major outlet and note that choice briefly in the markdown newsletter.

## Canonical input to update

- `C:\Users\caizahojel1\Documents\Codex\2026-04-28-i-am-an-extreamlly-busy-person\morning-brief\app\data\briefing-data.js`

Do not change layout files unless the user explicitly asks for a redesign.

## Rendered outputs to regenerate

After updating the canonical data file, regenerate these outputs by running the render script:

- `C:\Users\caizahojel1\Documents\Codex\2026-04-28-i-am-an-extreamlly-busy-person\morning-brief\outputs\newsletter\latest-briefing.md`
- `C:\Users\caizahojel1\Documents\Codex\2026-04-28-i-am-an-extreamlly-busy-person\morning-brief\outputs\email\latest-email.md`
- `C:\Users\caizahojel1\Documents\Codex\2026-04-28-i-am-an-extreamlly-busy-person\morning-brief\outputs\email\latest-email.html`
- `C:\Users\caizahojel1\Documents\Codex\2026-04-28-i-am-an-extreamlly-busy-person\morning-brief\outputs\email\latest-email-subject.txt`

Use the bundled Node runtime from workspace dependencies to run:

- `morning-brief/scripts/render-outputs.js`

## Delivery mode

This system is in production send mode.

After the outputs are regenerated and pass the quality checklist below:

1. Read `C:\Users\caizahojel1\Documents\Codex\2026-04-28-i-am-an-extreamlly-busy-person\morning-brief\outputs\email\latest-email-subject.txt`
2. Read `C:\Users\caizahojel1\Documents\Codex\2026-04-28-i-am-an-extreamlly-busy-person\morning-brief\outputs\email\latest-email.md`
3. Send the edition with the Gmail connector to `chris.aiza17@gmail.com`
4. Use the subject exactly as written in the subject file
5. Send only one email per run

## Workflow

1. Use web search and open the underlying pages for current, same-day news.
2. Select about 6 to 8 total stories.
3. Include at least 3 market or finance stories.
4. Include at least 3 world or geopolitics stories.
5. Deduplicate similar coverage.
6. Prefer direct source links over aggregators when possible.
7. Use precise dates in summaries when helpful.
8. When an insight is inferred from a headline or teaser rather than fully reported in the source snippet, make that inference conservative.

## Writing style

- Punchy, compact, and easy to scan
- Clear enough for a distracted morning brain
- No jargon unless it adds value
- Every story needs a short `why it matters`
- Keep each story card around 60 to 100 words total across summary and why-it-matters

## `briefing-data.js` structure

Keep the existing object shape:

- `meta`
- `topLine`
- `quickTake`
- `commutePlan`
- `sections`
- `watchlist`
- `closingPerspective`

### Section rules

- `sections[0]` should be markets or finance
- `sections[1]` should be world news
- Optional `sections[2]` can be surprise themes, policy, technology, or weekend reading

### Story rules

Each story should include:

- `source`
- `intensity`
- `readTime`
- `headline`
- `summary`
- `whyItMatters`
- `tags`
- `link`

## Markdown newsletter format

The render script should produce `latest-briefing.md` with:

- A title line with the edition date
- A one-paragraph top summary
- `Markets`
- `World`
- `Watchlist`
- `Source note`

Keep it readable on mobile and under roughly 700 words.

## Quality bar

- No invented facts
- No vague filler
- No wall of text
- If the news mix is unusually thin, say so plainly instead of padding

## Final version quality standard

Before sending, confirm all of the following:

- At least 6 total stories are included
- At least 3 stories are finance or markets focused
- At least 3 stories are world or geopolitics focused
- The top line clearly explains the morning's main theme
- Each story has a concrete `why it matters`
- The sources are recognized and worth trusting
- The total output feels readable in about 15 to 20 minutes
- The language is compact, polished, and free of encoding glitches or placeholder text
- The email body reads cleanly on mobile without giant paragraphs
- No credentials or private account details appear anywhere in the output

After updating the data file and regenerating outputs, leave a short run summary describing what changed.
