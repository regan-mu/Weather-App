const axios = require("axios").default
import "./CSS/styles.css";
import locIcon from "./map.png"
import searchIco from "./search.png"
import weatherIco from "./weather.png"

const weather = document.querySelector("#weather-data");
const description = document.querySelector("#description");
const temperature = document.querySelector("#temp");
const tempFeel = document.querySelector("#temp-feel");
const humidity = document.querySelector("#hum");
const pressure = document.querySelector("#atm-pressure");
const direction = document.querySelector("#wind-dir");
const wind = document.querySelector("#wind-sp");
const visibility = document.querySelector("#visible");
const errorDisplay = document.querySelector("#error");
const locationIcon = document.querySelector(".location-icon");
const cityName = document.querySelector(".city-name");
const weatherIcon = document.querySelector(".weather-icon");
locationIcon.src = locIcon;
const searchBtn =document.querySelector(".search-icon");
const mainIcon =document.querySelector(".main-icon");
mainIcon.src=weatherIco;
searchBtn.src=searchIco;




const handleData = (response, location) => {
  const responseData = response.data;
  weather.textContent = responseData.weather[0].main;
  description.textContent = responseData.weather[0].description;
  temperature.textContent = `${responseData.main.temp} °C`;
  tempFeel.textContent = `${responseData.main.feels_like} °C`;
  humidity.textContent = `${responseData.main.humidity}%`;
  pressure.textContent = `${responseData.main.pressure} hPa`;
  direction.textContent = `${responseData.wind.deg} Degrees`;
  wind.textContent = `${responseData.wind.speed} M/s`;
  visibility.textContent = `${responseData.visibility / 1000} Km`;
  cityName.textContent = `${location}, ${responseData.sys.country}`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${responseData.weather[0].icon}@2x.png`

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