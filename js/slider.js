import { settings } from "./settings.js";
import { getRandomNum } from "./helper.js";
import translations from "./translate.js";

const nextSlideButton = document.querySelector(".slide-next");
const prevSlideButton = document.querySelector(".slide-prev");

let randomNum;

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours > 5 && hours < 12) {
    return "morning";
  } else if (hours > 11 && hours < 18) {
    return "afternoon";
  } else if (hours > 17 && hours < 24) {
    return "evening";
  } else {
    return "night";
  }
}

function setRandomNum(min, max) {
  randomNum = getRandomNum(min, max);
}

export async function setBg() {
  const img = new Image();

  const imageLink = await getImageLink();
  // const nextImageLink = await getImageLink();
  img.src = imageLink;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${img.src}')`;
  };
  img.onerror = () => {
    showBackgroundError();
  };
}

function showBackgroundError() {
  const errorDiv = document.querySelector(".background-error");
  const errorMessage =
    translations[settings.language].slider.networkErrorMessage;
  errorDiv.innerHTML = `<svg class="wifi-off-icon"></svg> ${errorMessage}`;
}

function slideNext() {
  randomNum++;
  if (randomNum > 20) {
    randomNum = 1;
  }
  setBg();
}

function slidePrev() {
  randomNum--;
  if (randomNum < 1) {
    randomNum = 20;
  }
  setBg();
}

async function getLinkFromUnsplash() {
  const unsplashUrl =
    "https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=97BROPl_UZvO5qc-w-C5bPcK0Bfu7goXFz-JbUrDKaU";
  const res = await fetch(unsplashUrl);
  const data = await res.json();
  return data.urls.regular;
}

async function getLinkFromFlickr() {
  const flickrUrl =
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6b2b5f35c8598701f64ac533d6f53d57&tags=nature&extras=url_l&format=json&nojsoncallback=1";
  const res = await fetch(flickrUrl);
  const data = await res.json();
  return data.photos.photo[randomNum].url_l;
}

function getLinkFromGithub() {
  const timeOfDay = getTimeOfDay();
  const bgNum = randomNum.toString().padStart(2, "0");
  return `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
}

async function getImageLink() {
  switch (settings.photoSource) {
    case "github":
      return getLinkFromGithub();
    case "unsplash":
      return await getLinkFromUnsplash();
    case "flickr":
      return await getLinkFromFlickr();
  }
}

function turnOnSlideClickListeners() {
  nextSlideButton.addEventListener("click", slideNext);
  prevSlideButton.addEventListener("click", slidePrev);
}

export function startSliderLogic() {
  setRandomNum(1, 20);
  setBg();
  turnOnSlideClickListeners();
}
