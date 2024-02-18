import { getTimeAndStartClock, formatDate } from "./timeUtils.js";

export function displayWeather(preparedData) {
  const forecast = preparedData.forecast.forecastday.slice(1);
  const timeZone = preparedData.current.timeZone;

  const weatherSection = document.querySelector(".weather");
  weatherSection.innerHTML = "";

  createClock();
  getTimeAndStartClock(timeZone);

  createCurrentCard(preparedData);

  forecast.forEach((day) => {
    createForecastCards(day);
  });
}

function createClock() {
  const clock = document.createElement("div");
  clock.classList.add("clock", "weather-card");

  appendToWeatherSection(clock);
}

function createCurrentCard(preparedData) {
  const current = preparedData.current;
  const forecast = preparedData.forecast;
  const todaysForecast = forecast.forecastday[0];

  const card = document.createElement("div");
  card.classList.add("weather-card", "current-card");
  card.innerHTML = `
    <div class="card-header">
      <img class="icon" src="${current.iconURL}"
        alt="Weather condition icon" />
      <p class="day">${formatDate(todaysForecast.date)} (Today)</p>
    </div>
    <span class="temp">
      ${current.temp}<span class="temp-unit">°${current.tempUnit}
      </span>
    </span>
    <div class="forecast-info-container">
      <div class="forecast-info">
        <p class="precip">Chance of Rain</p>
        <p class="val">${todaysForecast.chanceOfRain}%</p>
      </div>
      <div class="forecast-info">
        <p class="humid">Humidity</p>
        <p class="val">${current.humidity}%</p>
      </div>
      <div class="forecast-info">
        <p class="wind">Wind</p>
        <p class="val">${current.windMph} mph</p>
      </div>
    </div>
  `;

  appendToWeatherSection(card);
}

function createForecastCards(day) {
  const card = document.createElement("div");
  card.classList.add("weather-card", "future-card");
  card.innerHTML = `
  <div class="card-header">
    <img class="icon" src="${day.iconURL}"
      alt="Weather condition icon" />
    <p class="day">${formatDate(day.date)}</p>
  </div>
    <div class="min-max-temp">
      <span class="high-label">H</span>
      <span>${day.maxTemp}°</span>
      <span class="low-label">L</span>
      <span>${day.minTemp}°</span>
    </div>
    <div class="forecast-info-container">
      <div class="forecast-info">
        <p class="precip">Chance of Rain</p>
        <p class="val">${day.chanceOfRain}%</p>
      </div>
      <div class="forecast-info">
        <p class="humid">Humidity</p>
        <p class="val">${day.avgHumidity}%</p>
      </div>
      <div class="forecast-info">
        <p class="wind">Wind</p>
        <p class="val">${day.maxWindMph} mph</p>
      </div>
    </div>
  `;

  appendToWeatherSection(card);
}

function appendToWeatherSection(card) {
  const weatherSection = document.querySelector(".weather");
  weatherSection.appendChild(card);
}
