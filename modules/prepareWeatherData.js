import { displayWeather } from "./weatherDisplay.js";

export function prepareWeatherData(weatherData, unit) {
  const preparedData = {
    current: {
      iconURL: weatherData.current.condition.icon,
      temp: weatherData.current[`temp_${unit}`],
      humidity: weatherData.current.humidity,
      windMph: weatherData.current.wind_mph,
      timeZone: weatherData.location.tz_id,
      tempUnit: unit,
    },
    forecast: {
      forecastday: weatherData.forecast.forecastday.map((day) => ({
        date: day.date,
        maxTemp: day.day[`maxtemp_${unit}`],
        minTemp: day.day[`mintemp_${unit}`],
        iconURL: day.day.condition.icon,
        avgHumidity: day.day.avghumidity,
        maxWindMph: day.day.maxwind_mph,
        chanceOfRain: day.day.daily_chance_of_rain,
      })),
    },
  };

  displayWeather(preparedData);
}
