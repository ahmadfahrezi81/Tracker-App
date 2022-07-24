import { start, pause, reset, addingTime, reducingTime } from "./stopwatch.js";
import { txtDownload, expandTxtArea, shrinkTxtArea } from "./textarea.js";

const generateButton = document.querySelector("#generate");
const container = document.querySelector("#main-container");

let count = 0;

export function createBox() {
    const input = document.querySelector("#inputText");

    // if 'Task Name' is empty
    if (isEmptyOrSpaces()) {
        const errMsgBox = document.querySelector("#errMsgBox");
        const closeErrMsg = document.querySelector("#errCloseButton");

        errMsg.innerHTML = `Please give your 'Task' a name and 'start task' ⌛`;
        errMsgBox.style.visibility = "visible";

        closeErrMsg.addEventListener("click", () => {
            errMsg.innerHTML = "";
            errMsgBox.style.visibility = "hidden";
        });
    } else {
        //create task and its features
        const accordianItem = document.createElement("div");
        accordianItem.classList.add("accordian-item");
        accordianItem.setAttribute("data-id", count);
        accordianItem.innerHTML = `
                <div class="accordian-item-head">
                    <div class="circle-emoji" data-id="${count}">🔎</div>
                    <div class="item-head-display" data-id="${count}">
                        <h1>${input.value}</h1>
                        <p>time tracked: <span class="saved" data-id="${count}">00:00:00</span> <span class="circle"></p> 
                    </div>
                    <div class="item-head-toggle">
                        <i class="fas fa-caret-down item-head-arrow"></i>
                        <p>open</p>  
                    </div>    
                </div>
                <div class="accordian-item-body">
                    <div class="accordian-body-display">
                        <div class="item-body-stopwatch">
                            <span class="display" data-id="${count}">00:00:00</span>
                            <div class="stopwatch-buttons">
                                <button class='playPauseButton' data-id="${count}">start</button>
                                <button class='resetButton' data-id="${count}">save</button>
                            </div>
                        </div>
                        <div class="item-body-textarea">
                            <div class="textarea-overlay txtarea-overlay-hidden" data-id="${count}">
                                <h1 data-id="${count}" class="textarea-overlay-title textarea-overlay-title-hidden">${input.value} | notes</h1>
                                <textarea class="textarea" data-id="text-val${count}" cols="55" rows="8" placeholder="📄 Write notes here"
                                onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'    '+v.substring(e);this.selectionStart=this.selectionEnd=s+4;return false;}"
                                ></textarea>
                                <button class="exp-btn" data-id="${count}"><i class="fa-solid fa-maximize"></i></button>
                                <button class="shrk-btn btn-hidden" data-id="${count}"><i class="fa-solid fa-minimize"></i></button>
                                <button class="dwn-btn" data-id="${count}"><i class="fa-solid fa-download"></i></button>
                            </div>
                            
                        </div>
                    </div>
                    <div class="delete">
                        <i title="Please don't delete me"class="fas fa-trash delete-icon" data-id="${count}"></i>
                    </div>
                </div>`;
        container.prepend(accordianItem);

        //clear the text input (task name)
        input.value = "";

        //remove the message text
        document.querySelector("#instructionWhenNoTask").style.display = "none";

        //this is testing the local storage
        if (typeof Storage !== "undefined") {
            // Store
            localStorage.setItem("stopwatch_name", input.value);
        }

        allStuff();
    }
}

//----------------Testing---------------------
function emojiPicker(count) {
    const emojiCircle = document.querySelector(
        `.circle-emoji[data-id="${count}"]`
    );
    let chosenEmoji = "🔎";

    emojiCircle.addEventListener("mouseenter", () => {
        const emojiMenu = document.createElement("div");
        emojiMenu.classList.add("emoji-menu");
        emojiMenu.innerHTML = `
            <div>👨‍💼<span>Work</span></div>
            <div>📚<span>Homework</span></div>
            <div>💻<span>Code</span></div>
            <div>🏀<span>Exercise</span></div>
            <div>🎮<span>Break</span></div>
            <div>🧹<span>Chore</span></div>
        `;

        emojiCircle.append(emojiMenu);

        [...emojiMenu.children].forEach((e) => {
            e.addEventListener("mouseover", () => {
                // console.log(e.firstChild);
                // console.log(emojiCircle.firstChild.textContent);
                emojiCircle.firstChild.textContent = e.firstChild.textContent;
                chosenEmoji = e.firstChild.textContent;
            });
            e.addEventListener("click", () => {
                emojiMenu.remove(); //remove the emojiMenu when it is clicked
            });
        });
    });

    emojiCircle.addEventListener("mouseleave", () => {
        emojiCircle.innerHTML = chosenEmoji;
    });
}
//----------------Testing Until here----------

function isEmptyOrSpaces() {
    const input = document.querySelector("#inputText");

    return (
        input.value.length === 0 ||
        input.value == null ||
        input.value.trim() === ""
    );
}

function stopwatch(count) {
    let display = document.querySelector(`.display[data-id="${count}"]`);
    let playPauseButton = document.querySelector(
        `.playPauseButton[data-id="${count}"]`
    );
    let savedDisplay = document.querySelector(`.saved[data-id="${count}"]`);
    let resetButton = document.querySelector(
        `.resetButton[data-id="${count}"]`
    );

    playPauseButton.addEventListener("click", () => {
        display.classList.toggle("active");

        if (display.classList.contains("active")) {
            display.style.backgroundColor = "#ffc2c2"; // red commit background
            playPauseButton.style.backgroundColor = "#F44B59"; // red button
            playPauseButton.innerHTML = "pause";
            savedDisplay.nextElementSibling.style.backgroundColor = "#F44B59"; //red square marker
            start(display, count);
        } else {
            display.style.backgroundColor = "#c7ffc2"; // green commit background
            playPauseButton.style.backgroundColor = "#59F44B"; // green button
            playPauseButton.innerHTML = "start";
            savedDisplay.nextElementSibling.style.backgroundColor = "#59F44B"; //green square marker
            pause(count);
        }
    });
    resetButton.addEventListener("click", () => {
        if (display.classList.contains("active")) {
            playPauseButton.style.backgroundColor = "#59F44B"; // green button
            playPauseButton.innerHTML = "start";
            savedDisplay.nextElementSibling.style.backgroundColor = "#59F44B"; //green square marker
            display.classList.toggle("active");
        }
        reset(display, savedDisplay, count);
        display.style.backgroundColor = "#fffec2"; // yellow commit background
    });
}

function disableButton() {
    const accordianItem = document.querySelectorAll(".accordian-item");

    // "Task" account max length 🚀🚀
    if (accordianItem.length > 7) {
        generateButton.disabled = true;
        generateButton.style.cssText = `background: lightgrey; cursor: not-allowed;`;
    } else {
        generateButton.disabled = false;
        generateButton.style.cssText = `background: white; cursor: pointer;`;
    }
}

function deleteaccordianItem(count) {
    let accordianItem = document.querySelector(
        `.accordian-item[data-id="${count}"]`
    );
    let deleteIcon = document.querySelector(`.delete-icon[data-id="${count}"]`);
    let display = document.querySelector(`.display[data-id="${count}"]`);
    let savedDisplay = document.querySelector(`.saved[data-id="${count}"]`);

    deleteIcon.addEventListener("click", () => {
        let shouldDelete = confirm("Do you want to delete this task?");

        if (shouldDelete) {
            accordianItem.remove();
            disableButton();
            reset(display, savedDisplay, count);
        }

        //if there is no more children then delete
        if (container.childElementCount === 1) {
            //print the instruction again if all 'task' is deleted
            document.querySelector("#instructionWhenNoTask").style.display =
                "block";
        }
    });
}

function allStuff() {
    stopwatch(count);

    //This is to disable the button on top if it exceed max currently (7)
    disableButton();

    //This is to delete the accordian item
    deleteaccordianItem(count);

    //Randomly assign color to the item head display
    randomColorGenerator();

    rightClickMenu(count);

    //start text download
    txtDownload(count);

    //Textarea
    expandTxtArea(count);
    shrinkTxtArea(count);

    //----------------Testing---------------------
    emojiPicker(count);
    //----------------Testing Until here----------

    count++;
}

function randomColorGenerator() {
    let itemHeadDisplay = document.querySelector(".item-head-display");

    let colorArr = [255, 210]; //this is predetermined
    let randnum = Math.floor(Math.random() * 55 + 200); //this is to get a value between 190 to 255
    colorArr.push(randnum);

    colorArr = shuffle(colorArr);

    itemHeadDisplay.style.backgroundColor = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
}

// I got this shuffle method from the internet, currently used for randomizing color
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

// ----------- Edited Until here ---------------- 🍀🍀🍀
let timeInPrompt = "01:00:00";

function rightClickMenu(count) {
    let itemHeadDisplay = document.querySelector(
        `.item-head-display[data-id="${count}"]`
    );

    let textareaOverlayTitle = document.querySelector(
        `.textarea-overlay-title[data-id="${count}"]`
    );

    //experiment right menu
    document
        .querySelector(".item-head-display")
        .addEventListener("contextmenu", (e) => {
            e.preventDefault();
            let menu = document.createElement("div");
            menu.className = "unselectable";
            menu.id = "ctxmenu";
            menu.style = `top:${e.y}px;left:${e.x}px`;
            menu.onmouseleave = () => (menu.outerHTML = "");

            menu.innerHTML = `
                    <h4><i class="fa-solid fa-hourglass"> Menu</i><span>${itemHeadDisplay.firstElementChild.innerHTML}</span></h4>
                    <p id="subTime">Reduce</p>
                    <p id="addTime">Add</p>
                    <p id="rename">Rename</p>`;
            document.body.appendChild(menu);

            document.querySelector("#rename").addEventListener("click", () => {
                let newName = prompt("Enter new name for your task: ");

                if (!isEmptyOrSpaces()) {
                    //rename on the itemHeadDisplay
                    itemHeadDisplay.firstElementChild.innerHTML = newName; //fix this a little

                    //rename on the H1 overlay
                    textareaOverlayTitle.innerHTML = newName;
                } else {
                    alert("Task name cannot be empty");
                }
            });

            document.querySelector("#addTime").addEventListener("click", () => {
                let addedTime = prompt(
                    "Input your time in the following format (HH:MM:SS): ",
                    timeInPrompt
                );

                if (addedTime !== null) {
                    let temp;

                    temp = addedTime.split(":");

                    if (checkPattern(temp)) {
                        addingTime(count, temp);
                        timeInPrompt = addedTime;
                    } else {
                        alert("Wrong input. Try again!");
                    }
                }
            });

            document.querySelector("#subTime").addEventListener("click", () => {
                let addedTime = prompt(
                    "Input your time in the following format (HH:MM:SS): ",
                    timeInPrompt
                );

                if (addedTime !== null) {
                    let temp;

                    temp = addedTime.split(":");

                    if (checkPattern(temp)) {
                        reducingTime(count, temp);
                        timeInPrompt = addedTime;
                    } else {
                        alert("Wrong input. Try again!");
                    }
                }
            });
        });
}

function checkPattern(temp) {
    return (
        temp.length === 3 &&
        temp.every(
            (e) =>
                parseInt(e) <= 60 &&
                parseInt(e) >= 0 &&
                e.length === 2 &&
                !isNaN(e)
        )
    );
}
