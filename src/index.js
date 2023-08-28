function formatTime(timestamp) {
  let date = new Date(timestamp);
  console.log(date);
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

function displayWeather(response) {
  console.log(response);
  document.querySelector("h1").innerHTML = response.data.city;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.daily[0].temperature.day
  );
  document.querySelector("#current-humidity").innerHTML = Math.round(
    response.data.daily[0].temperature.humidity
  );
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.daily[0].wind.speed
  );
  document.querySelector("#current-weather-description").innerHTML =
    response.data.daily[0].condition.description;
  document.querySelector("#current-time").innerHTML = formatTime(
    response.data.daily[0].time * 1000
  );
  document
    .querySelector("#current-icon")
    .setAttribute("src", response.data.daily[0].condition.icon_url);
  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.daily[0].condition.description);
}

let initialCity = "London";
let apiKey = "oab4e60e1041e5f64354360t2dfe8d11";
let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${initialCity}&key=${apiKey}&units=metric`;

axios.get(apiURL).then(displayWeather);
