const fs = require("fs");
const path = require("path");

const { buildBriefingData } = require("./lib/briefing-engine");

const projectRoot = path.resolve(__dirname, "..");
const stagingPath = path.join(projectRoot, "data", "staging", "story-candidates.json");
const rankingPath = path.join(projectRoot, "config", "ranking-weights.json");
const briefingDataPath = path.join(projectRoot, "app", "data", "briefing-data.js");
const compiledDebugPath = path.join(projectRoot, "data", "compiled", "briefing-debug.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeFile(targetPath, contents) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, contents, "utf8");
}

function toJsModule(data) {
  return `const MORNING_BRIEFING = ${JSON.stringify(data, null, 2)};\n\nif (typeof window !== "undefined") {\n  window.MORNING_BRIEFING = MORNING_BRIEFING;\n}\n\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = MORNING_BRIEFING;\n}\n`;
}

function main() {
  const staging = readJson(stagingPath);
  const ranking = readJson(rankingPath);
  const { briefing, compiledDebug } = buildBriefingData(staging, ranking);

  writeFile(briefingDataPath, toJsModule(briefing));
  writeFile(compiledDebugPath, `${JSON.stringify(compiledDebug, null, 2)}\n`);

  console.log(
    JSON.stringify(
      {
        edition: briefing.meta.editionLabel,
        selectedCards: briefing.essential.cards.length,
        selectedHeadlines: briefing.essential.cards.map((card) => card.headline),
      },
      null,
      2,
    ),
  );
}

main();
