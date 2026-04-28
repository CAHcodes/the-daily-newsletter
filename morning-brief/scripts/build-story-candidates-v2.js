const fs = require("fs");
const path = require("path");

const { buildStagingFromRaw } = require("./lib/story-candidate-engine");

const projectRoot = path.resolve(__dirname, "..");
const newsletterConfigPath = path.join(projectRoot, "config", "newsletter-inputs.json");
const rankingPath = path.join(projectRoot, "config", "ranking-weights.json");
const gmailRawPath = path.join(projectRoot, "data", "raw", "gmail", "latest-newsletters.json");
const webRawPath = path.join(projectRoot, "data", "raw", "web", "latest-reporting.json");
const stagingPath = path.join(projectRoot, "data", "staging", "story-candidates.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeFile(targetPath, contents) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, contents, "utf8");
}

function main() {
  const newsletterConfig = readJson(newsletterConfigPath);
  const rankingConfig = readJson(rankingPath);
  const gmailRaw = readJson(gmailRawPath);
  const webRaw = readJson(webRawPath);

  const staging = buildStagingFromRaw({
    newsletterConfig,
    gmailRaw,
    webRaw,
    rankingConfig,
    now: new Date(),
  });

  writeFile(stagingPath, `${JSON.stringify(staging, null, 2)}\n`);

  console.log(
    JSON.stringify(
      {
        edition: staging.edition.editionLabel,
        candidateCount: staging.candidates.length,
        candidates: staging.candidates.map((candidate) => candidate.headline),
        activeFramingInputs: staging.rawStatus.activeFramingInputs,
      },
      null,
      2,
    ),
  );
}

main();
