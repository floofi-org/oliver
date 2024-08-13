window.onload = async () => {
    let languages = ["en", "fr"];
    let language = localStorage.getItem("language") ?? [...navigator.languages.filter(i => languages.includes(i)), "en"][0];

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

    document.getElementsByTagName("html")[0].innerHTML.match(/%(.*?)%/gm)?.map(i => {
        document.getElementsByTagName("html")[0].innerHTML =
            document.getElementsByTagName("html")[0].innerHTML.replace(i, eval(i.substring(1, i.length - 1)) ?? i.substring(1, i.length - 1));
    });

    document.title = lang.title;
    document.getElementById("loader").style.display = "none";
}
