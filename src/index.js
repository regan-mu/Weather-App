const axios = require("axios").default
import "./CSS/styles.css";
import locIcon from "./map.png"

const weather = document.querySelector("#weather-data");
const description = document.querySelector("#description");
const temperature = document.querySelector("#temp");
const tempFeel = document.querySelector("#temp-feel");
const maxTemp = document.querySelector("#temp-max");
const minTemp = document.querySelector("#temp-min");
const humidity = document.querySelector("#hum");
const pressure = document.querySelector("#atm-pressure");
const errorDisplay = document.querySelector("#error");
const locationIcon = document.querySelector(".location-icon");
const cityName = document.querySelector(".city-name");
const weatherIcon = document.querySelector(".weather-icon");
locationIcon.src = locIcon;



const handleData = (response, location) => {
  const responseData = response.data;
  weather.textContent = responseData.weather[0].main;
  description.textContent = responseData.weather[0].description;
  temperature.textContent = `${responseData.main.temp} °C`;
  tempFeel.textContent = `Feels like: ${responseData.main.feels_like} °C`;
  maxTemp.textContent = `Maximum: ${responseData.main.temp_max} °C`;
  minTemp.textContent = `Minimum: ${responseData.main.temp_min} °C`;
  humidity.textContent = `${responseData.main.humidity}%`;
  pressure.textContent = `${responseData.main.pressure} hPa`;
  cityName.textContent = location;
  weatherIcon.src = `http://openweathermap.org/img/wn/${responseData.weather[0].icon}@2x.png`

  // Hide the error bar if it exists
  if (errorDisplay.classList.contains("show-error")) {
    errorDisplay.classList.remove("show-error");
  }
}

const handleError = error => {
  if (error) {
    errorDisplay.classList.add("show-error");
    errorDisplay.textContent = error.response.data.message;
  }
}

const getData = location => {
axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: location,
      appid: "e906e9c6c886731630294632556c0dcf",
      units: "metric"
    }
  })
  .then(function (response) {
    handleData(response, location);
    console.log(response.data)
  })
  .catch(function (error) {
    handleError(error);
  });
}
getData("Nairobi");


// Handle Form Data
const form = document.querySelector(".city-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = e.target.city.value;
  getData(city);
  e.target.city.value = "";
})