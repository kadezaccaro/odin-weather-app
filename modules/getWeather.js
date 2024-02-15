import { displayWeather } from "./weatherDisplay.js";

const WEATHER_API_KEY = "";
let loc = "New York";

export async function getWeather() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${loc}&days=7`
    );

    const weatherData = await response.json();

    displayWeather(weatherData);
  } catch (error) {
    alert(error);
  }
}
