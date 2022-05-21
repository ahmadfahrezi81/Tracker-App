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
