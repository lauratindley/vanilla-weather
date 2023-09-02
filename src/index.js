function formatTime(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    " Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", " Sat"];
  let day = days[date.getDay()];
  return `${day}`;
}

function displayForecast(response) {
  let days = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  days.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
                <div class="weather-forecast-day">${formatDays(
                  forecastDays.time
                )}</div>
                <img
                  src=${forecastDays.condition.icon_url}
                  width="60"
                />
                <div class="forecast-temperatures">
                  <span class="forecast-max-temperature">${Math.round(
                    forecastDays.temperature.maximum
                  )}° </span>
                  <span class="forecast-min-temperature">${Math.round(
                    forecastDays.temperature.minimum
                  )}°</span>
                </div>
            </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "oab4e60e1041e5f64354360t2dfe8d11";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.city;

  celsiusTemp = Math.round(response.data.temperature.current);
  document.querySelector("#current-temperature").innerHTML = celsiusTemp;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  document.querySelector("#current-humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-weather-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#current-time").innerHTML = formatTime(
    response.data.time * 1000
  );
  document
    .querySelector("#current-icon")
    .setAttribute("src", response.data.condition.icon_url);
  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.condition.description);

  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "oab4e60e1041e5f64354360t2dfe8d11";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  search(cityInput.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheitTemp = Math.round(celsiusTemp * (9 / 5) + 32);
  document.querySelector("#current-temperature").innerHTML = fahrenheitTemp;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#current-temperature").innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("London");
