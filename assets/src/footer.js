function refreshStatus() {
    switch (window.statusData.code) {
        case 0:
        case 3:
            document.getElementById("footer-inner-general-status-text").innerText = "All systems normal.";
            document.getElementById("footer-inner-general-status-container").classList.remove("status-warning");
            document.getElementById("footer-inner-general-status-container").classList.remove("status-error");
            document.getElementById("footer-inner-general-status-container").classList.add("status-success");
            break;

        case 1:
            if (window.statusData['outages'].length > 1) {
                document.getElementById("footer-inner-general-status-text").innerText = window.statusData['outages'].length + " alerts.";
            } else {
                document.getElementById("footer-inner-general-status-text").innerText = "Temporary alert.";
            }
            document.getElementById("footer-inner-general-status-container").classList.add("status-warning");
            document.getElementById("footer-inner-general-status-container").classList.remove("status-error");
            document.getElementById("footer-inner-general-status-container").classList.remove("status-success");
            break;

        case 2:
            if (window.statusData['outages'].length > 1) {
                document.getElementById("footer-inner-general-status-text").innerText = window.statusData['outages'].length + " outages.";
            } else {
                document.getElementById("footer-inner-general-status-text").innerText = "Temporary outage.";
            }
            document.getElementById("footer-inner-general-status-container").classList.remove("status-warning");
            document.getElementById("footer-inner-general-status-container").classList.add("status-error");
            document.getElementById("footer-inner-general-status-container").classList.remove("status-success");
            break;
    }
}

function generateFooter() {
    document.getElementById("footer-inner-projects-items").innerHTML = Array.from(document.getElementById("navbar-category-base-0").children)
        .map(i => Array.from(i.children)).reduce((a, b) => [...a, ...b])
        .filter(i => !i.classList.contains("fella-nav-category-section-header"))
        .map(i => [i.href, i.children[1].children[0].innerText])
        .map(i => `
        <li class="fella-footer-item">
            <a href="${i[0]}">${i[1]}</a>
        </li>
        `).join("");

    document.getElementById("footer-inner-resources-items").innerHTML = Array.from(document.getElementById("navbar-category-base-1").children)
        .map(i => Array.from(i.children)).reduce((a, b) => [...a, ...b])
        .filter(i => !i.classList.contains("fella-nav-category-section-header"))
        .map(i => [i.href, i.children[1].children[0].innerText])
        .map(i => `
        <li class="fella-footer-item">
            <a href="${i[0]}">${i[1]}</a>
        </li>
        `).join("");

    document.getElementById("footer-inner-org-items").innerHTML = Array.from(document.getElementById("navbar").querySelectorAll("a[href]"))
        .filter(i => !i.classList.contains("fella-nav-category-section-item") && i.id !== "navbar-logo-link")
        .map(i => [i.href, i.innerText])
        .map(i => `
        <li class="fella-footer-item">
            <a href="${i[0]}">${i[1]}</a>
        </li>
        `).join("") + `
        <li class="fella-footer-item">
            <a href="/credits">Website Credits</a>
        </li>`;
}
