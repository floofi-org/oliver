function generateProjectsList() {
    let categories = window.projects;

    document.getElementById("navbar-category-base-0").innerHTML = Object.entries(categories).map(i => `
    <div class="fella-nav-category-section">
        <div class="fella-nav-category-section-header">${i[0]}</div>
        ${Object.entries(i[1]).map(j => `
        <a href="/projects/${j[1].id}" class="fella-nav-category-section-item">
            <div class="fella-nav-category-section-item-icon-container">
                ${j[1].icon}
            </div>
            <div class="fella-nav-category-section-item-text-container">
                <div class="fella-nav-category-section-item-text-title">${j[0]}</div>
                <div class="fella-nav-category-section-item-text-description">${j[1].description}</div>
            </div>
        </a>
        `).join("")}
    </div>
    `).join("");

    processLinks();
    generateFooter();
}

function projectImageError() {
    document.getElementById("project-section-image-img").outerHTML = "";
}

function buildProjectPage(id) {
    let project = Object.values(projects)
        .map(i => Object.entries(i))
        .reduce((a, b) => [...a, ...b])
        .find(i => i[1]['id'] === id);
    document.title = project[0] + " – Floofi";

    document.getElementById("project-section-placeholder").innerHTML = `
        <section id="project-faunerie" class="project-section">
            <div id="project-section-text">
                <div id="project-section-text-content">
                    <div id="project-section-text-title" class="fella-headline">
                        ${project[0]}
                    </div>
                    <div id="project-section-text-description" class="fella-tagline">
                        ${project[1]['longDescription']}
                    </div>
                    <div id="project-section-text-buttons">
                        ${project[1]['link'] ? `
                            <a href="${project[1]['link']}" class="fella-btn fella-btn-primary fella-btn-cta fella-hero-cta">
                                ${project[1]['icon']}
                                <span class="fella-btn-cta-text">Get Started</span>
                            </a>
                            ${project[1]['source'] ? `
                                <a href="${project[1]['source']}" class="fella-btn fella-btn-secondary fella-btn-cta fella-hero-cta">
                                    <span class="fella-btn-cta-text">Source Code</span>
                                </a>
                            ` : ``}
                       ` : `
                            <a href="${project[1]['source']}" class="fella-btn fella-btn-primary fella-btn-cta fella-hero-cta">
                                ${project[1]['icon']}
                                <span class="fella-btn-cta-text">Source Code</span>
                            </a>
                        `}
                    </div>
                </div>
            </div>
            <div id="project-section-image">
                <div id="project-section-image-inner">
                    <img id="project-section-image-img" src="/assets/projects/${project[1]['id']}.webp" onerror="projectImageError();" alt="">
                </div>
            </div>
        </section>
    `;
}
