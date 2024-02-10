const h1 = document.querySelector("h1");
const form = document.querySelector("form");
const locationInput = document.querySelector("#location");
const apiKey = "";
let loc = "New York";
const temp = document.querySelector(".temp");
const humid = document.querySelector(".humid");

h1.textContent = `Weather for ${loc}`;

async function getWeather() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${loc}`
    );

    const weatherData = await response.json();

    console.log(weatherData);

    temp.textContent = weatherData.current.temp_f;
    humid.textContent = weatherData.current.humidity;
  } catch (error) {
    alert(error);
  }
}

getWeather();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  loc = locationInput.value;
  h1.textContent = `Weather for ${loc}`;
  getWeather();
});
