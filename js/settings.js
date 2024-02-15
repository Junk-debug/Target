import { onKeyDownEvent } from "./audio.js";

export const settings = {
    language: "en",
    photoSource: "github",
    blocks: ["time", "date", "greeting-container", "quote-container", "weather", "player", "todo-list"],
    /* set: function (property, newValue) {
        if (this[property] !== newValue) {
            this[property] = newValue;
        }
    } */
};

const settingsButton = document.querySelector(".settings-button");
export const popUpContainer = document.querySelector(".settings-container");
export const closeButton = document.querySelector(".settings-close");
const settingsDiv = document.querySelector(".settings-container .settings");

let isPopUpOpened = false;

function openPopUp() {
    popUpContainer.classList.add("open");
    settingsButton.classList.add("active");
    isPopUpOpened = true;
    updateHotKeys();
}

function closePopUp() {
    popUpContainer.classList.remove("open");
    settingsButton.classList.remove("active");
    isPopUpOpened = false;
    updateHotKeys();
}

function addPopUpOpenListeners() {
    settingsButton.addEventListener("click", openPopUp)
}

function addPopUpCloseListeners() {
    closeButton.addEventListener("click", closePopUp)

    window.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            closePopUp();
        }
    })

    settingsDiv.addEventListener('click', event => {
        event._isClickWithInModal = true;
    });

    popUpContainer.addEventListener('click', event => {
        if (event._isClickWithInModal) return;
        closePopUp();
    });
}

function updateHotKeys() {
    if (!isPopUpOpened) {
        document.addEventListener("keydown", onKeyDownEvent);
    } else {
        document.removeEventListener("keydown", onKeyDownEvent);
    }
}

export function startSettingsLogic() {
    updateHotKeys();
    addPopUpOpenListeners();
    addPopUpCloseListeners();
}

const checkboxes = document.querySelectorAll("input[name='toShow']");

function getSelectedCheckboxes() {
    const selectedChekboxes = []
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            selectedChekboxes.push(checkbox.value);
        }
    }
    return selectedChekboxes;
}

function setSelectedCheckboxes() {
    const checkboxesToSelect = settings.blocks;
    for (let checkbox of checkboxes) {
        checkbox.checked = false;
        if (checkboxesToSelect.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    }
}

const selectedLanguage = document.querySelector("select[name='language']");
const selectedPhotoSource = document.querySelector("select[name='photo']");

function setSelectElements() {
    selectedLanguage.value = settings.language;
    selectedPhotoSource.value = settings.photoSource;
}

export function setSettings() {
    const blocks = getSelectedCheckboxes();
    const obj = {
        blocks: blocks,
        language: selectedLanguage.value,
        photoSource: selectedPhotoSource.value
    }

    let isLanguageSettingChanged = true;
    if (obj.language == settings.language) {
        isLanguageSettingChanged = false;
    }

    settings.blocks = blocks;
    settings.language = selectedLanguage.value;
    settings.photoSource = selectedPhotoSource.value;

    return isLanguageSettingChanged;
}



export function updateUISettings() {
    setSelectedCheckboxes();
    setSelectElements();
}





// todo: add settings menu translation