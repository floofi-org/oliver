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
