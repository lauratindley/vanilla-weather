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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
                <div class="weather-forecast-day">${day}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-night.png"
                  width="60"
                />
                <div class="forecast-temperatures">
                  <span class="forecast-max-temperature">18° </span>
                  <span class="forecast-min-temperature">12°</span>
                </div>
            </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
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
displayForecast();
