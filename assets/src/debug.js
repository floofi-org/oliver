(async () => {
    if (location.hostname === "floo.fi") return;
    document.body.insertAdjacentHTML("beforeend", '<div id="debug"></div>')
    window.userAgent = new UAParser(navigator.userAgent);

    window.version = await (await fetch("/assets/data/release.json")).json();
    document.getElementById("debug").innerText = "Floofi Codename \"Oliver\"\n" +
        (location.hostname === "localhost" ?
            "Development Environment\n" +
            "Target Ver. " + window.version.version + " (" + window.version.build + ")"
            :
            "Version " + window.version.version + " (" + window.version.build + ")\n" +
            new Date(window.version.timestamp).toISOString()) + "\n" +
        window.userAgent.getBrowser().name + " " + window.userAgent.getBrowser().version + " (" + window.userAgent.getOS().name + ")";
})();
