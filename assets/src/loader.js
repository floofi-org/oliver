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

    let res = await fetch("/pages" + page + ".html");
    if (page === "/home") page = "/";
    if (location.pathname !== page) window.history.pushState(null, null, page);

    if (res.status === 200) {
        setInnerHTML(document.getElementById("page"), await res.text());
    } else if (res.status === 404) {
        let res = await fetch("/pages/404.html");
        setInnerHTML(document.getElementById("page"), await res.text());
    } else {
        let res = await fetch("/pages/500.html");
        setInnerHTML(document.getElementById("page"), await res.text());
    }

    processLinks();
    refreshStatus().then(() => {});
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

window.onload = async () => {
    processLinks();
    await loadPage(location.pathname);
}

window.onpopstate = async () => {
    await loadPage(location.pathname);
}

document.getElementById("footer-inner-general-copyright-year").innerText = new Date().getUTCFullYear().toString();
