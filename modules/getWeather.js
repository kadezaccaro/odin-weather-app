import { prepareWeatherData } from "./prepareWeatherData.js";

const WEATHER_API_KEY = "";
const form = document.querySelector(".location-form");
const locationInput = document.querySelector(".location-input");

export async function getWeather(unit, location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location})}&days=7`
    );

    const weatherData = await response.json();

    prepareWeatherData(weatherData, unit);

    form.classList.remove("error");
  } catch (error) {
    console.error(error);
    form.classList.add("error");
    locationInput.value = "";
  }
}
