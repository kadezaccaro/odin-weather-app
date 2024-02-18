const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const { location } = JSON.parse(event.body);
  const API_KEY = process.env.WEATHER_API_KEY;
  const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather data" }),
    };
  }
};
