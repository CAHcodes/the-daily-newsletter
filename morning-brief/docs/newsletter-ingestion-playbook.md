# Newsletter Ingestion Playbook

## Goal

Keep Gmail newsletter inputs useful for synthesis without letting onboarding mail or noise contaminate the briefing.

## Classification

- `onboarding`: welcome emails, subscription confirmations, inbox-placement instructions, what-to-expect explainers
- `editorial`: real content editions that contain the day's stories, analysis, or market framing

## Minimum fields for each issue

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

## What to capture from a real editorial issue

- `summary`: 1 to 2 sentences on the issue's actual content
- `usefulSignals`: why the issue matters for the morning brief
- `topTopics`: 3 to 6 short phrases such as `AI capex`, `consumer slowdown`, `Treasury yields`
- `newsletterTone`: the kind of framing the issue brings

## Why this matters

The briefing engine can use active editorial issues to:

- confirm which themes are gaining mainstream attention
- add source-specific framing context
- boost relevant stories when Tech Brew, CFO Brew, or Morning Brew strongly align with them

## Current status

As of April 28, 2026, the Gmail inputs available for the Brew-family labels are still onboarding messages, not true editorial editions.
