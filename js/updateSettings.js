import {
  updateSettingsUI,
  settings,
  setSettings,
  languageSelect,
} from "./settings.js";
import { setBg } from "./slider.js";
import { getWeather, inputCity } from "./weather.js";
import { setQuote } from "./quotes.js";
import { updateVisibleElements } from "./hide.js";
import { inputName } from "./greeting.js";
import { adjustSelectWidth, adjustWidth } from "./helper.js";
import { updateTranslations, groupSelect } from "./todo.js";
import translations from "./translate.js";

export function applySettings() {
  // settings
  updateSettingsUI();
  // visible elements
  updateVisibleElements();
  // photosource
  setBg();
  // translation
  inputCity.value =
    translations[settings.language].weather.startCityTranslation;
  getWeather();
  // update inputs translations
  inputCity.placeholder =
    translations[settings.language].weather.cityPlaceholderTranslation;
  inputName.placeholder =
    translations[settings.language].greeting.namePlaceholderTranslation;
  // update quote language
  setQuote();
  // todo translations
  updateTranslations();
  // adjust width
  adjustWidth.apply(inputName);
  adjustSelectWidth.apply(groupSelect);
  adjustSelectWidth.apply(languageSelect);
  // date is translated automatically
}

const settingsDiv = document.querySelector(".settings-container .settings");

settingsDiv.addEventListener("input", () => {
  setSettings();
  applySettings();
});
