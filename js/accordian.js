export function accordian() {
    const accordianHead = document.querySelectorAll(".accordian-item-head");

    accordianHead.forEach((accordianHead) => {
        accordianHead.addEventListener("click", () => {
            const accordianHeadActive = document.querySelector(
                ".accordian-item-head.active"
            );

            if (accordianHeadActive && accordianHeadActive !== accordianHead) {
                accordianHeadActive.classList.toggle("active");
                accordianHeadActive.nextElementSibling.style.maxHeight = 0;
                accordianHeadActive.lastElementChild.firstElementChild.style.transform =
                    "rotate(0deg)";
                accordianHeadActive.lastElementChild.lastElementChild.innerHTML =
                    "open";
            }

            accordianHead.classList.toggle("active");

            const accordianBody = accordianHead.nextElementSibling;

            if (accordianHead.classList.contains("active")) {
                accordianBody.style.maxHeight =
                    accordianBody.scrollHeight + "px";
                accordianHead.lastElementChild.firstElementChild.style.transform =
                    "rotate(180deg)";
                accordianHead.lastElementChild.lastElementChild.innerHTML =
                    "close";
            } else {
                accordianBody.style.maxHeight = 0;
                accordianHead.lastElementChild.firstElementChild.style.transform =
                    "rotate(0deg)";
                accordianHead.lastElementChild.lastElementChild.innerHTML =
                    "open";
            }
        });
    });
}
