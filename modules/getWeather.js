import { prepareWeatherData } from "./prepareWeatherData.js";

const form = document.querySelector(".location-form");
const locationInput = document.querySelector(".location-input");
const errorMsg = document.querySelector(".error-message");
const loaderContainer = document.querySelector(".loader-container");

export async function getWeather(unit, location) {
  try {
    showLoadingAnimation();

    const response = await fetch("/.netlify/functions/fetchWeather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location }),
    });

    const weatherData = await response.json();
    prepareWeatherData(weatherData, unit);

    resetError();
  } catch (error) {
    handleError();
  } finally {
    hideLoadingAnimation();
  }
}

function showLoadingAnimation() {
  loaderContainer.classList.remove("hide-loader");
}

function hideLoadingAnimation() {
  loaderContainer.classList.add("hide-loader");
}

function handleError() {
  form.classList.add("error");
  locationInput.value = "";
  errorMsg.classList.remove("hide-error");
}

function resetError() {
  form.classList.remove("error");
  errorMsg.classList.add("hide-error");
}
