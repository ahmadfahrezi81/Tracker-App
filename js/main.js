import { accordian } from "./accordian.js";
import { createBox } from "./create.js";

const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', ()=>{
    accordian();
    createBox();
    accordian();
})
