#!/usr/bin/env node
const release = require('./assets/data/release.json');

release["timestamp"] = new Date().getTime();
release["build"] = release['build'].substring(0, 3) + (parseInt(release.build.substring(3)) + 1);

require('fs').writeFileSync("./assets/data/release.json", JSON.stringify(release, null, 2));
require('child_process').execSync("vercel --prod", { stdio: "inherit" });
