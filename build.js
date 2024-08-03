#!/usr/bin/env node
const release = require('./assets/data/release.json');

release["timestamp"] = new Date().getTime();
release["build"] = (parseInt(release['build'].split(".")[0]) + 1) + "." + release['build'].split(".").slice(1).join(",");

require('fs').copyFileSync("./vercel.json", "./vercel.jso_");
const vercel = require("./vercel.json");
vercel['redirects'].push(
    {
        "source": "/me/(.*)",
        "missing": [
            {
                "type": "header",
                "key": "host",
                "value": "me.floo.fi"
            }
        ],
        "destination": "https://me.floo.fi"
    },
    {
        "source": "/me",
        "missing": [
            {
                "type": "header",
                "key": "host",
                "value": "me.floo.fi"
            }
        ],
        "destination": "https://me.floo.fi"
    });

require('fs').writeFileSync("./vercel.json", JSON.stringify(vercel, null, 2));
require('fs').writeFileSync("./assets/data/release.json", JSON.stringify(release, null, 2));
require('fs').copyFileSync("./vercel.jso_", "./vercel.json");
require('fs').unlinkSync("./vercel.jso_");
require('child_process').execSync("vercel --prod", { stdio: "inherit" });

require('child_process').execSync("git add -A");
require('child_process').execSync("git commit", { stdio: "inherit" });
require('child_process').execSync("git tag " + release["version"].split(" ")[0] + "." + release['build']);
require('child_process').execSync("git push origin " + release["version"].split(" ")[0] + "." + release['build']);
require('child_process').execSync("git push --all origin");
require('child_process').execSync("gh release create " + release["version"].split(" ")[0] + "." + release['build'] + " --generate-notes");
