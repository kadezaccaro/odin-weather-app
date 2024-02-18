import { getWeather } from "./modules/getWeather.js";

const locationInput = document.querySelector(".location-input");
const toggleBtn = document.querySelector(".toggle-btn");
const form = document.querySelector(".location-form");

// Set initial values
initialize();

function initialize() {
  setInitialLocationInput();
  initializeLocalStorage();
  updateWeather();
  setUpEventListeners();
}

function setInitialLocationInput() {
  const storedLocation = localStorage.getItem("location");
  if (storedLocation) {
    locationInput.value = storedLocation;
  }
}

function initializeLocalStorage() {
  if (!localStorage.getItem("location")) {
    localStorage.setItem("location", locationInput.value);
  }

  if (!localStorage.getItem("unit")) {
    localStorage.setItem("unit", "f");
  }
}

function updateWeather() {
  const unit = localStorage.getItem("unit");
  const location = localStorage.getItem("location");
  getWeather(unit, location);
}

function toggleUnit() {
  const currentUnit = localStorage.getItem("unit") === "f" ? "c" : "f";
  toggleBtn.textContent = currentUnit === "f" ? "°F" : "°C";
  localStorage.setItem("unit", currentUnit);
  updateWeather();
}

function handleFormSubmit(event) {
  event.preventDefault();
  localStorage.setItem("location", locationInput.value);
  updateWeather();
}

function setUpEventListeners() {
  toggleBtn.addEventListener("click", toggleUnit);
  form.addEventListener("submit", handleFormSubmit);
}
