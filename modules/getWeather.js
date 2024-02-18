import { prepareWeatherData } from "./prepareWeatherData.js";

const WEATHER_API_KEY = "";
const form = document.querySelector(".location-form");
const locationInput = document.querySelector(".location-input");
const errorMsg = document.querySelector(".error-message");

export async function getWeather(unit, location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location})}&days=7`
    );

    const weatherData = await response.json();

    prepareWeatherData(weatherData, unit);

    resetError();
  } catch (error) {
    handleError();
  }
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
