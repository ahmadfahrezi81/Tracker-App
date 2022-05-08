// Convert time to a format of hours, minutes, seconds, and milliseconds
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    // let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

let startTime = [];
let elapsedTime = [];
let timerInterval = [];
let timeSaved = [];
let totalTimeSaved = 0;

export function start(displayName, num) {
    let display = document.querySelector(displayName);

    if (display.innerHTML === "00:00:00") {
        elapsedTime[num] = 0;
    }

    startTime[num] = Date.now() - elapsedTime[num];
    timerInterval[num] = setInterval(function printTime() {
        elapsedTime[num] = Date.now() - startTime[num];
        document.querySelector(displayName).innerHTML = timeToString(
            elapsedTime[num]
        );
        // console.log(elapsedTime);

        //check if timer is on every 1 sec
        isAlive();
    }, 1000);
}

export function pause(num) {
    clearInterval(timerInterval[num]);

    //check if alive for icon
    isAlive();
}

export function reset(displayName, savedDisplayName, num) {
    let display = document.querySelector(displayName);
    let savedDisplay = document.querySelector(savedDisplayName);
    let totalSaveDisplay = document.querySelector("#totalSaved");

    clearInterval(timerInterval[num]);

    if (display) {
        display.innerHTML = "00:00:00";
    }

    if (savedDisplay) {
        if (
            savedDisplay.innerHTML === "00:00:00" &&
            elapsedTime[num] === undefined
        ) {
            elapsedTime[num] = 0;
            timeSaved[num] = 0;
        } else if (savedDisplay.innerHTML === "00:00:00") {
            timeSaved[num] = 0;
        }
        timeSaved[num] += elapsedTime[num];
        savedDisplay.innerHTML = timeToString(timeSaved[num]);

        //total time saved (at the top)
        totalTimeSaved += elapsedTime[num];
        totalSaveDisplay.innerHTML = timeToString(totalTimeSaved);
    }

    elapsedTime[num] = 0;
    //check if alive
    isAlive();
}

//change icon when pause or play for all below this line
const changeFavicon = (link) => {
    let $favicon = document.querySelector('link[rel="icon"]');
    // If a <link rel="icon"> element already exists,
    // change its href to the given link.
    if ($favicon !== null) {
        $favicon.href = link;
        // Otherwise, create a new element and append it to <head>.
    } else {
        $favicon = document.createElement("link");
        $favicon.rel = "icon";
        $favicon.href = link;
        document.head.appendChild($favicon);
    }
};

function isAlive() {
    if (elapsedTime > tempElapsedArray) {
        changeFavicon("image/timer2.png");
    } else {
        changeFavicon("image/timer.png");
    }
    tempElapsedArray = [...elapsedTime];
}

let tempElapsedArray = [...elapsedTime];
