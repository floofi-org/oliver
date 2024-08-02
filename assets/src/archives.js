async function getArchives() {
    let list = [];
    let oldLength = null;

    while (oldLength !== list.length) {
        oldLength = list.length;

        let dom = document.createElement("html");

        try {
            dom.innerHTML = await (await fetch("https://archives.floo.fi/cgit/?ofs=" + list.length)).text();
        } catch (e) {
            dom.innerHTML = await (await fetch("https://archives.equestria.dev/cgit/?ofs=" + list.length)).text();
        }

        list.push(...Array.from(dom.getElementsByClassName("toplevel-repo"))
            .map(i => [
                i.innerText,
                i.parentElement.children[1].innerText
                    .split(" - ")
                    .slice(0, i.parentElement.children[1].innerText.split(" - ").length - 1).join(" - "),
                i.parentElement.children[1].innerText
                    .split(" - ")
                    .slice(i.parentElement.children[1].innerText.split(" - ").length - 1).join(" - "),
                i.parentElement.children[3].innerText
            ])
        );
    }

    return list;
}
