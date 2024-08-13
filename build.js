#!/usr/bin/env node
const release = require('./assets/data/release.json');

release["timestamp"] = new Date().getTime();
release["build"] = (parseInt(release['build'].split(".")[0]) + 1) + "." + release['build'].split(".").slice(1).join(",");

require('fs').writeFileSync("./assets/data/release.json", JSON.stringify(release, null, 2));

require('child_process').execSync("git add -A");
require('child_process').execSync("git commit", { stdio: "inherit" });
require('child_process').execSync("git tag " + release["version"].split(" ")[0] + "." + release['build']);
require('child_process').execSync("git push origin " + release["version"].split(" ")[0] + "." + release['build']);
require('child_process').execSync("git push --all origin");
require('child_process').execSync("gh release create " + release["version"].split(" ")[0] + "." + release['build'] + " --generate-notes");

require('child_process').execSync("vercel --prod", { stdio: "inherit" });
require('child_process').execSync("vercel --prod", { stdio: "inherit", cwd: "./shortener" });
