import { onKeyDownEvent } from "./audio.js";
import { adjustSelectWidth } from "./helper.js";
import translations from "./translate.js";

console.log(translations);

export const settings = {
  language: "en",
  photoSource: "github",
  blocks: [
    "time",
    "date",
    "greeting-container",
    "quote-container",
    "weather",
    "player",
    "todo-list-open-button",
  ],
  showSeconds: false,
  set: function (property, newValue) {
    if (this[property] !== newValue) {
      this[property] = newValue;
    }
  },
};

const settingsButton = document.querySelector(".settings-button");
export const popUpContainer = document.querySelector(".settings-container");
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

function addPopUpListeners() {
  settingsButton.addEventListener("click", () => {
    if (isPopUpOpened) {
      closePopUp();
    } else {
      openPopUp();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
      closePopUp();
    }
  });

  settingsDiv.addEventListener("click", (event) => {
    event._isClickWithInModal = true;
  });

  popUpContainer.addEventListener("click", (event) => {
    if (event._isClickWithInModal) return;
    closePopUp();
  });
}

const textInputs = document.querySelectorAll("input[type='text']");

export function updateHotKeys() {
  const contentEditable = document.querySelectorAll("[contenteditable]");
  let isOnFocus = false;
  for (let input of textInputs) {
    if (document.activeElement === input) {
      isOnFocus = true;
    }
  }
  for (let span of contentEditable) {
    if (document.activeElement === span) {
      isOnFocus = true;
    }
  }
  if (isPopUpOpened || isOnFocus) {
    document.removeEventListener("keydown", onKeyDownEvent);
  } else {
    document.addEventListener("keydown", onKeyDownEvent);
  }
}

function addHotKeysListeners() {
  for (let input of textInputs) {
    input.addEventListener("focus", updateHotKeys);
    input.addEventListener("blur", updateHotKeys);
  }
}

const checkboxes = document.querySelectorAll("input[name='toShow']");

function getSelectedCheckboxes() {
  const selectedChekboxes = [];
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

export const languageSelect = document.querySelector("select[name='language']");
const photoSelectEl = document.querySelector("select[name='photo']");
const showSecondsToggler = document.querySelector("input[name='showSeconds']");

function setSelectElements() {
  languageSelect.value = settings.language;
  photoSelectEl.value = settings.photoSource;
  showSecondsToggler.checked = settings.showSeconds;
}

function translateSettingsUI() {
  const photoSelectLabel = settingsDiv.querySelector(".settings-photo span");

  const languageSelectLabel = settingsDiv.querySelector(
    ".settings-language span"
  );
  const languageOptions = settingsDiv.querySelectorAll(
    ".settings-language select option"
  );
  const optionTranslations =
    translations[settings.language].settings.languageSelectOptionsTranslation;

  const visibleElementsCaption = settingsDiv.querySelector(
    ".settings-hide caption"
  );
  const visibleElementsTranslation =
    translations[settings.language].settings.visibleElementsTranslation;

  const visibleElementsLabels = settingsDiv.querySelectorAll(
    ".settings-hide .label"
  );

  const timeLabel = settingsDiv.querySelector(".settings-time caption");

  const showSecondsLabel = settingsDiv.querySelector(".settings-time .label");

  timeLabel.textContent =
    translations[settings.language].settings.timeFormatLabelTranslation;
  showSecondsLabel.textContent =
    translations[settings.language].settings.timeFormatTranslation;

  languageSelectLabel.textContent =
    translations[settings.language].settings.languageSelectLabelTranslation;

  for (let i = 0; i < languageOptions.length; i++) {
    languageOptions[i].textContent = optionTranslations[i];
  }

  photoSelectLabel.textContent =
    translations[settings.language].settings.photoSelectLabelTranslation;

  visibleElementsCaption.textContent =
    translations[settings.language].settings.visibleElementsLabelTranslation;

  for (let i = 0; i < visibleElementsLabels.length; i++) {
    visibleElementsLabels[i].textContent = visibleElementsTranslation[i];
  }
}

export function setSettings() {
  settings.set("blocks", getSelectedCheckboxes());
  settings.set("language", languageSelect.value);
  settings.set("photoSource", photoSelectEl.value);
  settings.set("showSeconds", !!showSecondsToggler.checked);
}

export function updateSettingsUI() {
  translateSettingsUI();
  setSelectedCheckboxes();
  setSelectElements();
}

export function startSettingsLogic() {
  adjustSelectWidth.apply(languageSelect);
  languageSelect.addEventListener("change", adjustSelectWidth);
  updateHotKeys();
  addHotKeysListeners();
  addPopUpListeners();
}
