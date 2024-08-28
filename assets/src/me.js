window.onload = async () => {
    let languages = ["de", "en", "es", "fi", "fr", "pl", "ru", "ua"];
    let supportedLanguages = navigator.languages.map(i => i.substring(0, 2))
        .filter(i => languages.includes(i));
    let language = localStorage.getItem("language") ?? [...supportedLanguages, "en"][0];

    try {
        window.lang = await (await fetch("/assets/i18n/me/" + language + ".json")).json();
    } catch (e) {
        console.error(e);

        try {
            window.lang = await (await fetch("/assets/i18n/me/en.json")).json();
        } catch (e) {
            console.error(e);
            window.lang = {};
        }
    }

    let root = document.getElementsByTagName("html")[0];

    root.innerHTML.match(/%(.*?)%/gm)?.map(i => {
        let stripped = i.substring(1, i.length - 1);
        root.innerHTML = root.innerHTML.replace(i, eval(stripped) ?? stripped);
    });

    document.title = lang.title;
    document.getElementById("loader").style.display = "none";
}
