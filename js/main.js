import { accordian } from "./accordian.js";
import { createBox, dateOnSide } from "./create.js";

dateOnSide();

const generateButton = document.querySelector("#generate");
generateButton.addEventListener("click", () => {
    accordian();
    createBox();
    accordian();
});
