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
export function txtDownload() {
    document.getElementById("dwn-btn").addEventListener(
        "click",
        () => {
            // Generate download of hello.txt file with some content
            let text = document.getElementById("text-val").value;
            let filename = prompt("Enter file name to download: ");

            if (filename !== null) {
                download(filename + ".txt", text);
            }
        },
        false
    );
}

export function expandTxtArea() {
    const expButton = document.getElementById("exp-btn");
    const shrkButton = document.getElementById("shrk-btn");
    const dwnButton = document.getElementById("dwn-btn");

    if (expButton != null) {
        expButton.addEventListener(
            "click",
            () => {
                document.getElementById("test-overlay").classList.add("show");
                document
                    .getElementById("test-overlay")
                    .classList.remove("hidden");
                expButton.classList.add("btn-hidden");
                shrkButton.classList.remove("btn-hidden");
                dwnButton.classList.add("dwn-btn-big");
                document.querySelector(
                    ".textarea-overlay-title"
                ).style.display = "block";
                document.querySelector(".textarea").style.cssText =
                    "padding: 15px 6% 15px 20px; font-size: 1.2em;";
            },
            false
        );
    }
}

export function shrinkTxtArea() {
    const shrkButton = document.getElementById("shrk-btn");
    const expButton = document.getElementById("exp-btn");
    const dwnButton = document.getElementById("dwn-btn");

    if (shrkButton != null) {
        shrkButton.addEventListener(
            "click",
            () => {
                document.getElementById("test-overlay").classList.add("hidden");
                document
                    .getElementById("test-overlay")
                    .classList.remove("show");
                shrkButton.classList.add("btn-hidden");
                expButton.classList.remove("btn-hidden");
                dwnButton.classList.remove("dwn-btn-big");
                document.querySelector(
                    ".textarea-overlay-title"
                ).style.display = "none";
                document.querySelector(".textarea").style.cssText =
                    "padding: 10px 8% 10px 10px; font-size: 1em;";
            },
            false
        );
    }
}
