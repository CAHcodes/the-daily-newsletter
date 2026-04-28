# Publishing Plan

## GitHub Pages

The repository includes a GitHub Actions workflow that can publish the static dashboard from `morning-brief/app/` to GitHub Pages once the repository is pushed to GitHub.

## Gmail delivery

Email delivery is split from content refresh on purpose:

- content refresh updates the canonical data and generated files
- email delivery reads the generated subject and body files

This keeps the system easier to debug and prevents content generation logic from being mixed with mailbox operations.

## Premium-source posture

The system should continue to cite and prioritize major sources such as WSJ, Bloomberg, FT, CNBC, Reuters, and AP, but it should not store credentials in project files. Access should rely on the user's signed-in environment or connector context.
