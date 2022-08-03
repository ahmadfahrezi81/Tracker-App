const beforeUnloadListener = (event) => {
    event.preventDefault();
    return (event.returnValue = "Are you sure you want to exit?");
};

const nameInput = document.querySelector("#name");

nameInput.addEventListener("input", (event) => {
    if (event.target.value !== "") {
        addEventListener("beforeunload", beforeUnloadListener, {
            capture: true,
        });
    } else {
        removeEventListener("beforeunload", beforeUnloadListener, {
            capture: true,
        });
    }
});
