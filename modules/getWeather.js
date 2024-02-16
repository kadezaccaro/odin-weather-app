import { displayWeather } from "./weatherDisplay.js";

const WEATHER_API_KEY = "";
const form = document.querySelector(".location-form");
const locInput = document.querySelector(".location-input");
let locVal = locInput.value;

export async function getWeather() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${locVal}&days=7`
    );

    const weatherData = await response.json();

    displayWeather(weatherData);
  } catch (error) {
    alert(error);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  locVal = locInput.value;
  getWeather();
});
