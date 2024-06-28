window.scrollHooks = [];

window.onscroll = () => {
    updateScroll();
}

function updateScroll() {
    if (window.scrollY === 0) {
        document.getElementById("navbar").classList.add("no-border");
    } else {
        document.getElementById("navbar").classList.remove("no-border");
    }

    for (let name of scrollHooks) {
        if (name in window.temporaryPageData) {
            window.temporaryPageData[name]();
        }
    }
}
