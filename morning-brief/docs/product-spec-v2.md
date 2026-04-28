# Morning Brief V2 Product Spec

## Product vision

Build the best personal morning intelligence brief possible for a busy, ambitious reader who wants a real informational edge before the workday begins.

The product should feel like:

- a sharp private brief from a top operator
- a mobile-native daily ritual
- a synthesis engine, not a recap engine

## User outcome

By the time the user arrives at work, they should be able to:

- explain the day's market and world-news narrative in plain English
- identify what matters and what does not
- sound more informed than peers who only skim headlines
- remember the key points without re-reading everything

## Design principles

### 1. Signal over volume

The product must never try to cover the whole internet. It should cover the minimum set of stories required to orient a high-performing professional.

### 2. Summary first, depth second

Every edition must be layered:

- instant scan
- short explanation
- optional deeper read

### 3. Business utility over generic news

Every story must answer:

- what changed
- why it matters
- why it matters now
- what to watch next

### 4. ADHD-friendly by design

This means:

- short chunks
- visual anchors
- obvious hierarchy
- consistent modules
- low working-memory burden

### 5. Synthesis over article summaries

The product should merge overlapping coverage into one intelligence card rather than listing similar articles one after another.

## V2 output architecture

### Layer 1: 60-second scan

This is the first screen and first section of the email.

Contents:

- one-sentence daily thesis
- market mood meter
- top five signals
- one line on what to ignore

### Layer 2: 5-minute essential brief

This is the core product.

Contents:

- 5 to 7 synthesized cards
- each card centered on one story cluster
- each card includes:
  - `what happened`
  - `why it matters`
  - `market impact`
  - `what smart people disagree on`
  - `what to watch today`

### Layer 3: 15-minute edge layer

This is optional depth for the commute or after arrival.

Contents:

- one chart of the day
- one "what your peers will miss" section
- one "say this in a meeting" section
- one optional deep dive

## Core modules

### Daily thesis

The single most important framing sentence in the edition.

### Signal board

A compact visual board with:

- macro
- markets
- geopolitics
- technology
- policy

Each item should be tagged by urgency and confidence.

### Synthesized intelligence cards

Each card should represent one story cluster, not one article.

### Skip list

A recurring module labeled something like:

- `Not worth your time`
- `Ignore the noise`

This prevents overwhelm and increases trust.

### Peer edge

A recurring module labeled something like:

- `What your peers will miss`
- `The smarter read`

This is where contrarian but grounded framing belongs.

## Editorial system

### Source hierarchy

#### Tier 1: Primary reporting and trusted reference

- Bloomberg
- WSJ
- FT
- CNBC
- Reuters
- AP

#### Tier 2: Curated framing inputs

- Morning Brew
- Brew Markets
- Tech Brew

#### Tier 3: Optional specialty inputs

- CFO Brew
- The Playbook

### How Morning Brew-family inputs should be used

Morning Brew-family newsletters are not the final truth source. They are valuable because they:

- highlight what a smart mainstream business audience is paying attention to
- surface strong framing angles
- reveal which stories are already being made legible for busy professionals
- help identify culture, sentiment, and retail-investor angles

Use them for:

- framing
- prioritization
- trend detection
- narrative comparison

Do not use them as the sole factual basis for important claims when a Tier 1 source is available.

Operational note:

- the morning edition should use the latest available issue from each Brew-family label
- `Morning Brew` is a same-morning input when available
- `Tech Brew` and `Brew Markets` are likely to be prior-afternoon inputs for a 7:30 AM edition

## Story-selection model

Each potential story cluster should be scored on:

- market relevance
- world relevance
- novelty
- decision usefulness
- likely peer awareness
- memorability

The final edition should bias toward stories with both high importance and high explanatory leverage.

## Email design spec

The email should not be the whole product. It should be the best entry point into the product.

### Required traits

- single-column
- strong top headline
- bold section dividers
- short blocks of text
- left-aligned copy
- clean contrast
- one chart or graphic with actual information value

### Avoid

- giant text walls
- decorative filler images
- tiny thumbnail grids
- too many colors
- too many modules competing at once

## Dashboard design spec

The dashboard should become the premium experience.

### Visual direction

- editorial but energetic
- colorful without chaos
- high contrast
- obvious reading path
- glanceable first screen

### Key interactions

- tap to expand a card
- tap to show source trail
- tap to show disagreement or alternate take
- tap to save a story for later

## Automation pipeline

### Phase 1: Ingest

- read Morning Brew-family emails from Gmail labels
- gather Tier 1 web reporting from trusted publishers

### Phase 2: Cluster

- group overlapping stories
- collapse duplicates
- identify dominant theme and minority view

### Phase 3: Rank

- score for importance and usefulness
- select the minimum viable set for the edition

### Phase 4: Synthesize

- write the thesis
- write signal board
- write intelligence cards
- write skip list
- write peer-edge section

### Phase 5: Render

- dashboard data
- email markdown
- email html
- optional audio script later

### Phase 6: Gate

Do not send unless:

- the edition reads like synthesis, not recap
- there is a clear thesis
- there are no placeholders
- the user would plausibly feel more informed than a generic newsletter reader

## Success criteria

Morning Brief V2 is successful when the user can say:

- "I actually remember what mattered."
- "I know what to say in conversations."
- "I got signal faster than everyone else."
- "This feels like an edge, not homework."
