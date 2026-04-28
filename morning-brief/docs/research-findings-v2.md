# Morning Brief V2 Research Findings

This document summarizes the design and editorial principles guiding the V2 rebuild.

## Core conclusion

The best morning briefing is not a long digest and not a prettier email. It is a layered intelligence product:

- scan-first
- synthesis-first
- mobile-first
- depth on demand

## Newsletter and briefing patterns worth copying

### Smart Brevity

Axios argues that modern readers are overwhelmed, check messages constantly, and often spend only seconds scanning. The implication for this product is clear:

- lead with the point
- structure for scanning
- give context without bloat
- make every block finishable

References:

- [Axios HQ: Understanding Smart Brevity](https://help.axioshq.com/smart-brevity)
- [Axios: What is Smart Brevity](https://help.axios.com/hc/en-us/articles/36222626161435-What-is-the-Axios-Smart-Brevity-style)

### Bite-size daily editions

The Economist's Espresso emphasizes:

- five bite-size reads
- time-to-read cues
- audio support
- recurring modules such as world brief, quote, and chart

This supports a layered briefing model for a short commute.

References:

- [Espresso from The Economist](https://apps.apple.com/us/app/espresso-from-the-economist/id896628003)
- [The Economist Espresso launch context](https://www.prnewswire.com/news-releases/the-economist-offers-espresso-its-short-form-daily-news-app-free-for-students-worldwide-302236008.html)

### Business-news voice and framing

Morning Brew succeeds by being:

- concise
- non-boring
- easy to access
- business-relevant

This is useful as a tone and framing input, especially for business and market stories.

References:

- [Morning Brew welcome](https://www.morningbrew.com/welcome)
- [Morning Brew about](https://about.morningbrew.com/)

### Multi-source synthesis

Semafor's Signals model is especially relevant because it does not just summarize. It identifies the central facts, then layers context and differing interpretations from multiple trusted sources.

That is much closer to the target state for this project.

Reference:

- [Semafor Signals](https://www.semafor.com/article/02/05/2024/introducing-semafor-signals)

## ADHD and cognitive-load implications

The research-backed design takeaway is not "make it louder." It is "make it easier to encode and retrieve."

Working-memory burden matters. For this product, that means:

- fewer competing ideas per screen
- short blocks of text
- strong headings
- plain language
- visual separation
- summaries before detail
- clear progression from top-line to optional depth

References:

- [W3C: Understandable Content](https://www.w3.org/WAI/perspective-videos/understandable/)
- [W3C: Clear and Understandable Content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/)
- [PubMed: Reading and working memory in ADHD](https://pubmed.ncbi.nlm.nih.gov/29923160/)
- [PubMed: Working memory review in ADHD](https://pubmed.ncbi.nlm.nih.gov/34366803/)

## Email design implications

The email should be:

- single-column
- clearly hierarchical
- left-aligned for longer text
- high-contrast
- whitespace-heavy
- light on decorative imagery

Large visual flyers and cluttered multi-column blocks are visually attractive in theory but often worse in practice for scanning and mobile readability.

References:

- [NN/g: Marketing Email and Newsletter Design report snippet](https://media.nngroup.com/media/reports/free/Marketing_Email_and_Newsletter_Design_to_Increase_Conversion_and_Loyalty_6th_Edition.pdf)
- [Litmus accessibility guidance](https://www.litmus.com/blog/email-accessibility-for-designers-8-best-practices-you-should-follow)
- [Mailchimp: Layout and Purpose](https://templates.mailchimp.com/design/layout-and-purpose/)

## Product implication

Morning Brief V2 should become a three-layer intelligence system:

1. `60-second layer`: core thesis and signal board
2. `5-minute layer`: concise synthesized story cards
3. `15-minute layer`: optional deeper context, chart, and talking points

The current digest format is insufficient because it is article-centered instead of decision-centered.
