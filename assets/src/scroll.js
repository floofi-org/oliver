window.scrollHooks = [];

window.onscroll = () => {
    updateScroll();
}

function updateScroll() {
    if (window.scrollY === 0) {
        document.getElementById("navbar").classList.add("fella-nav-no-border");
        document.getElementById("mobile-navbar").classList.add("fella-nav-no-border");
    } else {
        document.getElementById("navbar").classList.remove("fella-nav-no-border");
        document.getElementById("mobile-navbar").classList.remove("fella-nav-no-border");
    }

    for (let name of scrollHooks) {
        if (name in window.temporaryPageData) {
            window.temporaryPageData[name]();
        }
    }
}
