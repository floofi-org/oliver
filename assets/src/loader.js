window.JsURL = URL;

function setInnerHTML(elm, html) {
    elm.innerHTML = html;

    Array.from(elm.querySelectorAll("script")).forEach((oldScriptEl) => {
        const newScriptEl = document.createElement("script");

        Array.from(oldScriptEl.attributes).forEach( attr => {
            newScriptEl.setAttribute(attr.name, attr.value)
        });

        const scriptText = document.createTextNode(oldScriptEl.innerHTML);
        newScriptEl.appendChild(scriptText);

        oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
    });
}

const redirects = {
    "/projects/archive": "/archives",
    "/network/status": "/contact",
    "/legal/license": "/legal/disclaimers",
    "/legal/notices": "/legal/disclaimers",
    "/legal/branding": "/credits"
}

async function loadPage(page) {
    if (redirects[page]) {
        page = redirects[page];
    }

    document.getElementById("navbar").classList.remove("fella-nav-mobile-open");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    window.temporaryPageData = {};
    if (page === "/") page = "/home";
    document.title = "Floofi";

    document.getElementById("navbar-inner-left").classList.add("navigating");
    document.getElementById("navbar-category-outer").onmouseleave({});
    startLoad();

    let originalPage = page;
    if (originalPage === "/home") originalPage = "/";
    if (page === "/projects-page") page = "/404";
    if (page.startsWith("/projects/")) page = "/projects-page";

    let res = await fetch("/pages/" + page.replaceAll("/", "--").replace(/^--/g, "") + ".html");
    if (location.pathname !== originalPage || new JsURL(location.href).searchParams.size > 0) window.history.pushState(null, null, originalPage);

    if (res.status === 200 && ((page === "/projects-page" && Object.values(projects)
        .map(i => Object.entries(i))
        .reduce((a, b) => [...a, ...b])
        .find(i => i[1]['id'] === location.pathname.split("/")[2])) || page !== "/projects-page")) {
        setInnerHTML(document.getElementById("page"), await res.text());
    } else if (res.status === 404 || page === "/projects-page") {
        await displayError(404);
        return;
    } else {
        await displayError(500);
        return;
    }

    processLinks();
    completeLoad();
    document.getElementById("loader").classList.add("fella-loader-ajax");
}

async function displayError(error) {
    let res = await fetch("/pages/" + error + ".html");
    setInnerHTML(document.getElementById("page"), await res.text());
    processLinks();
    document.getElementById("app").classList.add("loaded");
}

function processLinks() {
    let links = Array.from(document.querySelectorAll("a[href]"));

    for (let link of links) {
        link.onclick = async (e) => {
            e.preventDefault();

            let url = new JsURL(link.href);

            if (url.origin !== location.origin || url.pathname.endsWith(".txt")) {
                window.open(url.href);
            } else {
                window.queryState = url.searchParams;
                await loadPage(url.pathname);
            }
        }
    }
}

async function loadData() {
    try {
        window.version = await (await fetch("/assets/data/release.json")).json();
    } catch (e) {
        console.warn(e);
    }

    try {
        window.projects = await (await fetch("/assets/data/projects.json")).json();
    } catch (e) {
        console.warn(e);
    }
}

window.addEventListener('load', async () => {
    await loadData();
    showDebugInfo();
    processLinks();
    generateProjectsList();

    if (new JsURL(location.href).searchParams.size > 0) {
        window.queryState = new JsURL(location.href).searchParams;
    }

    await loadPage(location.pathname);

    setInterval(loadData, 30000);
});

window.onpopstate = async () => {
    if (new JsURL(location.href).searchParams.size > 0) {
        window.queryState = new JsURL(location.href).searchParams;
    }

    await loadPage(location.pathname);
}

document.getElementById("footer-inner-general-copyright-year").innerText = new Date().getUTCFullYear().toString();
