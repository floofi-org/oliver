function showDebugInfo() {
    document.getElementById("footer-inner-general-version").innerText = "Version " + window.version.version + "." + window.version.build;
    if (location.hostname === "floo.fi" || location.hostname === "dev.floo.fi") return;

    document.body.insertAdjacentHTML("beforeend", '<div id="debug"></div>')
    document.getElementById("debug").innerText = "Floofi Codename \"Oliver\"\n" +
        (location.hostname === "localhost" ?
            "Development Environment\n" +
            "Target Ver. " + window.version.version + "." + window.version.build + ""
            :
            "Version " + window.version.version + "." + window.version.build + "\n" +
            new Date(window.version.timestamp).toISOString()) + "\n" +
        (navigator.userAgent.includes(" Firefox/") ? "Firefox" : (navigator.userAgent.includes(" Chrome/") ? "Chrome" : (navigator.userAgent.includes(" Safari/") ? "Safari" : "Unknown"))) +
        " " +
        navigator.userAgent.replace(/.*? (?:Firefox|Chrome|Safari)\/([\d.-]*).*/gm, "$1") +
        " (" + (navigator.platform ?? navigator.userAgentData?.platform ?? "<unknown>") + ")";
}
