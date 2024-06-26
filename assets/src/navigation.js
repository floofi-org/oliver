window.categoryNavigationItem = null;
window.categorySection = null;
window.lastPosition = -1;

Array.from(document.getElementsByClassName("navbar-navigation-item")).map(i => {
    i.onmouseenter = (e) => {
        if (document.getElementById("navbar").classList.contains("mobile-open")) return;
        if (e.target.getAttribute("data-category-id")) {
            let category = document.getElementById("navbar-category-base-" + e.target.getAttribute("data-category-id"));
            document.getElementById("navbar-category").style.width = category.clientWidth + "px";
            document.getElementById("navbar-category").style.height = category.clientHeight + "px";

            if (window.categoryNavigationItem) document.getElementById("navbar-category-outer").onmouseleave({
                _switching: true
            });

            category.classList.remove("hide");
            category.classList.add("show");
            window.categorySection = category;
        }

        document.getElementById("navbar-tabs").style.left = e.target.getBoundingClientRect().left + "px";
        document.getElementById("navbar-category-indicator").style.left = (e.target.getBoundingClientRect().left + e.target.clientWidth / 3) + "px";
        document.getElementById("navbar-tabs").style.width = e.target.clientWidth + "px";
        document.getElementById("navbar-tabs").style.opacity = "1";
        e.target.classList.add("open");
        window.categoryNavigationItem = e.target;
    };

    i.onmouseleave = (e) => {
        if (document.getElementById("navbar").classList.contains("mobile-open")) return;
        if (e.target.classList.contains("navbar-navigation-item-with-category")) return;
        e.target.classList.remove("open");
    }
});

document.getElementById("navbar-category-outer").onmouseleave = document.body.onmouseleave = (e) => {
    if (document.getElementById("navbar").classList.contains("mobile-open")) return;
    if (window.categoryNavigationItem) {
        window.categoryNavigationItem.classList.remove("open");
        window.categoryNavigationItem = null;
    }
    if (window.categorySection) {
        window.categorySection.classList.remove("show");
        Array.from(document.getElementsByClassName("navbar-category-base")).map(i => i.classList.remove("hide"));
        window.categorySection.classList.add("hide");
        window.categorySection = null;
    }
    if (!e._switching) document.getElementById("navbar-navigation").onmouseleave(e);
}

document.getElementById("navbar-navigation").onmousemove = (e) => {
    if (document.getElementById("navbar").classList.contains("mobile-open")) return;
    document.getElementById("navbar-category-outer").onmousemove(e);
    document.getElementById("navbar-category").style.transition = "width 150ms ease, height 150ms ease";
    document.getElementById("navbar-tabs").style.transition = "left 250ms ease, width 250ms ease, opacity 150ms ease";
    document.getElementById("navbar-category-indicator").style.transition = "left 250ms ease";
};

document.getElementById("navbar-navigation").onmouseleave = () => {
    if (document.getElementById("navbar").classList.contains("mobile-open")) return;
    if (window.categoryNavigationItem && window.categoryNavigationItem.classList.contains("navbar-navigation-item-with-category")) return;
    document.getElementById("navbar-tabs").style.opacity = "0";
    document.getElementById("navbar-tabs").style.transition = "opacity 150ms ease";
    document.getElementById("navbar-category").style.transition = "";
    document.getElementById("navbar-category-indicator").style.transition = "";
    document.getElementById("navbar-tabs").style.left = "0";
    document.getElementById("navbar-tabs").style.width = "0";
};

document.getElementById("navbar-category-outer").onmousemove = (e) => {
    if (document.getElementById("navbar").classList.contains("mobile-open")) return;
    if (window.lastPosition === -1) {
        window.lastPosition = e.clientX;
    }

    console.log(e.clientX - window.lastPosition);

    if (e.clientX - window.lastPosition < -2) {
        Array.from(document.getElementsByClassName("navbar-category-base")).map(i => i.classList.add("reverse"));
    } else if (e.clientX - window.lastPosition > 2) {
        Array.from(document.getElementsByClassName("navbar-category-base")).map(i => i.classList.remove("reverse"));
    }

    window.lastPosition = e.clientX;
}

document.getElementById("navbar-tabs").style.opacity = "0";
document.getElementById("navbar-tabs").style.transition = "opacity 150ms ease";
document.getElementById("navbar-tabs").style.left = "0";
document.getElementById("navbar-tabs").style.width = "0";

function mobileNavbar() {
    if (document.getElementById("navbar").classList.contains("mobile-open")) {
        document.getElementById("navbar").classList.remove("mobile-open");
    } else {
        document.getElementById("navbar").classList.add("mobile-open");
    }
}

window.onresize = () => {
    if (window.innerWidth > 900) {
        document.getElementById("navbar").classList.remove("mobile-open");
    }
}
