(async () => {
    let categories = await (await fetch("/assets/data/projects.json")).json();

    document.getElementById("navbar-category-base-0").innerHTML = Object.entries(categories).map(i => `
    <div class="navbar-category-section">
        <div class="navbar-category-section-header">${i[0]}</div>
        ${Object.entries(i[1]).map(j => `
        <a href="/projects/${j[1].id}" class="navbar-category-section-item">
            <div class="navbar-category-section-item-icon-container">
                ${j[1].icon}
            </div>
            <div class="navbar-category-section-item-text-container">
                <div class="navbar-category-section-item-text-title">${j[0]}</div>
                <div class="navbar-category-section-item-text-description">${j[1].description}</div>
            </div>
        </a>
        `).join("")}
    </div>
    `).join("");
})();
