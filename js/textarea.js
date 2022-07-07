function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

//start download
export function txtDownload(dataID) {
    const dwnButton = document.querySelector(`.dwn-btn[data-id="${dataID}"]`);

    dwnButton.addEventListener(
        "click",
        () => {
            // Generate download of hello.txt file with some content
            let text = document.querySelector(
                `.textarea[data-id = "text-val${dataID}"]`
            ).value;
            let filename = prompt("Enter file name to download: ");

            if (filename !== null) {
                download(filename + ".txt", text);
            }
        },
        false
    );
}

export function expandTxtArea(dataID) {
    const expButton = document.querySelector(`.exp-btn[data-id="${dataID}"]`);
    const shrkButton = document.querySelector(`.shrk-btn[data-id="${dataID}"]`);
    const dwnButton = document.querySelector(`.dwn-btn[data-id="${dataID}"]`);
    const textareaOverlay = document.querySelector(
        `.textarea-overlay[data-id="${dataID}"]`
    );

    if (expButton != null) {
        expButton.addEventListener(
            "click",
            () => {
                textareaOverlay.classList.add("txtarea-overlay-show");
                textareaOverlay.classList.remove("txtarea-overlay-hidden");
                expButton.classList.add("btn-hidden");
                shrkButton.classList.remove("btn-hidden");
                dwnButton.classList.remove("dwn-btn");
                dwnButton.classList.add("dwn-btn-big");
                document
                    .querySelector(
                        `.textarea-overlay-title[data-id="${dataID}"]`
                    )
                    .classList.remove("textarea-overlay-title-hidden");
                document.querySelector(
                    `.textarea[data-id="text-val${dataID}"]`
                ).style.cssText =
                    "padding: 15px 50px 15px 20px; font-size: 1.2em;";
            },
            false
        );
    }
}

export function shrinkTxtArea(dataID) {
    const expButton = document.querySelector(`.exp-btn[data-id="${dataID}"]`);
    const shrkButton = document.querySelector(`.shrk-btn[data-id="${dataID}"]`);
    const dwnButton = document.querySelector(`.dwn-btn[data-id="${dataID}"]`);
    const textareaOverlay = document.querySelector(
        `.textarea-overlay[data-id="${dataID}"]`
    );

    if (shrkButton != null) {
        shrkButton.addEventListener(
            "click",
            () => {
                textareaOverlay.classList.remove("txtarea-overlay-show");
                textareaOverlay.classList.add("txtarea-overlay-hidden");
                shrkButton.classList.add("btn-hidden");
                expButton.classList.remove("btn-hidden");
                dwnButton.classList.add("dwn-btn");
                dwnButton.classList.remove("dwn-btn-big");
                document
                    .querySelector(
                        `.textarea-overlay-title[data-id="${dataID}"]`
                    )
                    .classList.add("textarea-overlay-title-hidden");
                document.querySelector(
                    `.textarea[data-id="text-val${dataID}"]`
                ).style.cssText =
                    "padding: 10px 40px 10px 10px; font-size: 1.0em;";
            },
            false
        );
    }
}

export function renameInExpandedOverlay(newName) {}
