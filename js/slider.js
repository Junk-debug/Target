import { getTimeOfDay } from "./greeting.js";

export const nextSlideButton = document.querySelector('.slide-next');
export const prevSlideButton = document.querySelector('.slide-prev');

let randomNum;

export function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function setRandomNum(min, max) {
    randomNum = getRandomNum(min, max);
}

export function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/Junk-debug/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${img.src}')`;
    };
}

export function slideNext() {
    randomNum++;
    if (randomNum > 20) {
        randomNum = 1;
    }
    setBg();
}

export function slidePrev() {
    randomNum--;
    if (randomNum < 1) {
        randomNum = 20;
    }
    setBg();
}
