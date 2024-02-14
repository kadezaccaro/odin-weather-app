const h1 = document.querySelector("h1");
let loc = "New York";
const WEATHER_API_KEY = "";

async function getWeather() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${loc}&days=7`
    );

    const weatherData = await response.json();

    console.log(weatherData);

    displayWeather(weatherData);
  } catch (error) {
    console.log(error);
  }
}

getWeather();

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   loc = locationInput.value;
//   h1.textContent = `${loc}`;
//   getWeather();
// });

function displayWeather(weatherData) {
  // Remove today from the forecast
  const forecast = weatherData.forecast.forecastday.slice(1);

  createCurrentCard(weatherData);

  forecast.forEach((day) => {
    createForecastCards(day);
  });
}

function createCurrentCard(weatherData) {
  const current = weatherData.current;
  const todaysForecast = weatherData.forecast.forecastday[0];

  const card = document.createElement("div");
  card.classList.add("weather-card", "current-card");
  card.innerHTML = `
    <div class="card-header">
      <img class="icon" src="${current.condition.icon}"
        alt="Weather condition icon" />
      <p class="day">${formatDate(todaysForecast.date)} (Today)</p>
    </div>
    <span class="temp">${current.temp_f}<span class="deg">°F</span></span>
    <div class="forecast-info-container">
      <div class="forecast-info">
        <p class="precip">Chance of Rain</p>
        <p class="val">${todaysForecast.day.daily_chance_of_rain}%</p>
      </div>
      <div class="forecast-info">
        <p class="humid">Humidity</p>
        <p class="val">${current.humidity}%</p>
      </div>
      <div class="forecast-info">
        <p class="wind">Wind</p>
        <p class="val">${current.wind_mph} mph</p>
      </div>
    </div>
  `;

  const weatherSection = document.querySelector(".weather");
  weatherSection.appendChild(card);
}

function createForecastCards(day) {
  const card = document.createElement("div");
  card.classList.add("weather-card", "future-card");
  card.innerHTML = `
  <div class="card-header">
    <img class="icon" src="${day.day.condition.icon}"
      alt="Weather condition icon" />
    <p class="day">${formatDate(day.date)}</p>
  </div>
    <div class="min-max-temp">
      <span class="high-label">H</span>
      <span>${day.day.maxtemp_f}°</span>
      <span class="low-label">L</span>
      <span>${day.day.mintemp_f}°</span>
    </div>
    <div class="forecast-info-container">
      <div class="forecast-info">
        <p class="precip">Chance of Rain</p>
        <p class="val">${day.day.daily_chance_of_rain}%</p>
      </div>
      <div class="forecast-info">
        <p class="humid">Humidity</p>
        <p class="val">${day.day.avghumidity}%</p>
      </div>
      <div class="forecast-info">
        <p class="wind">Wind</p>
        <p class="val">${day.day.maxwind_mph} mph</p>
      </div>
    </div>
  `;

  const weatherSection = document.querySelector(".weather");
  weatherSection.appendChild(card);
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00Z");
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleDateString("en-US", options);
}
