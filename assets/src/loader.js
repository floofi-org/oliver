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

async function loadPage(page) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    window.temporaryPageData = {};
    if (page === "/") page = "/home";
    document.title = "Floofi";

    document.getElementById("navbar-inner-left").classList.add("navigating");
    document.getElementById("navbar-category-outer").onmouseleave({});
    document.getElementById("app").classList.remove("loaded");

    let originalPage = page;
    if (originalPage === "/home") originalPage = "/";
    if (page === "/projects-page") page = "/404";
    if (page.startsWith("/projects/")) page = "/projects-page";

    let res = await fetch("/pages/" + page.replaceAll("/", "--").replace(/^--/g, "") + ".html");
    if (location.pathname !== originalPage) window.history.pushState(null, null, originalPage);

    if (res.status === 200 && ((page === "/projects-page" && Object.values(projects)
        .map(i => Object.entries(i))
        .reduce((a, b) => [...a, ...b])
        .find(i => i[1]['id'] === location.pathname.split("/")[2])) || page !== "/projects-page")) {
        setInnerHTML(document.getElementById("page"), await res.text());
    } else if (res.status === 404 || page === "/projects-page") {
        let res = await fetch("/pages/404.html");
        setInnerHTML(document.getElementById("page"), await res.text());
    } else {
        let res = await fetch("/pages/500.html");
        setInnerHTML(document.getElementById("page"), await res.text());
    }

    processLinks();
    refreshStatus();
    document.getElementById("app").classList.add("loaded");
}

function processLinks() {
    let links = Array.from(document.querySelectorAll("a[href]"));

    for (let link of links) {
        link.onclick = async (e) => {
            e.preventDefault();

            let url = new URL(link.href);

            if (url.origin !== location.origin) {
                window.open(url.href);
            } else {
                await loadPage(url.pathname);
            }
        }
    }
}

async function loadData() {
    window.version = await (await fetch("/assets/data/release.json")).json();
    window.projects = await (await fetch("/assets/data/projects.json")).json();
    window.statusData = await (await fetch("https://d6gd1hq6b89h1s1v.public.blob.vercel-storage.com/public/api.json")).json();
}

window.onload = async () => {
    await loadData();
    showDebugInfo();
    processLinks();
    generateProjectsList();
    loadNavigation();
    await loadPage(location.pathname);

    setInterval(loadData, 30000);
}

window.onpopstate = async () => {
    await loadPage(location.pathname);
}

document.getElementById("footer-inner-general-copyright-year").innerText = new Date().getUTCFullYear().toString();
