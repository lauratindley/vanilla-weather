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
}

let initialCity = "London";
let apiKey = "oab4e60e1041e5f64354360t2dfe8d11";
let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${initialCity}&key=${apiKey}&units=metric`;

axios.get(apiURL).then(displayWeather);
