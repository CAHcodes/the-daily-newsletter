# Raw Inputs

This folder stores the raw source layer that sits upstream of clustered story candidates.

## Purpose

Keep the original inputs separate from:

- clustered candidate stories
- ranking decisions
- final rendered briefing outputs

## Subfolders

- `gmail/`: newsletter inputs read from Gmail
- `web/`: reporting inputs gathered from the web

## Rules

- Preserve source metadata and timestamps.
- Mark onboarding or non-editorial newsletter emails explicitly.
- Mark syndicated reporting when the direct publisher URL is unavailable.
- Do not overwrite staging or canonical briefing files with raw source material.
