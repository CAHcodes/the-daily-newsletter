# Daily Morning Brief Email Delivery

You are delivering the Morning Brief after the canonical briefing data has already been refreshed.

## Goal

Create a polished Gmail draft addressed to the authenticated Gmail account owner using the latest generated subject and body files.

## Required inputs

Use these existing files:

- `C:\Users\caizahojel1\Documents\Codex\2026-04-28-i-am-an-extreamlly-busy-person\morning-brief\outputs\email\latest-email-subject.txt`
- `C:\Users\caizahojel1\Documents\Codex\2026-04-28-i-am-an-extreamlly-busy-person\morning-brief\outputs\email\latest-email.html`
- `C:\Users\caizahojel1\Documents\Codex\2026-04-28-i-am-an-extreamlly-busy-person\morning-brief\outputs\email\latest-email.md`

## Workflow

1. Confirm the briefing outputs were generated recently.
2. Read the subject, HTML email body, and markdown fallback files.
3. Prefer the HTML file as the draft body when it is clean and well-formed.
4. Fall back to the markdown file only if the HTML body is missing or malformed.
5. Use the Gmail connector to create a draft addressed to the authenticated user.
6. Use a clear subject line taken directly from `latest-email-subject.txt`.
7. Do not send the message automatically unless the user explicitly asks to switch from draft mode to send mode.

## Quality bar

- One draft per run
- No invented facts
- Keep the body clean and mobile-readable
- Preserve the wording generated from the latest briefing output
- Keep the HTML version interactive, with working article links and visual modules intact

After creating the draft, report the draft id and the edition date.
