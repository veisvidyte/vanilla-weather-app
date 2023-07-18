function formatDate(timestamp) {
let now = new Date(timestamp * 1000);

let hours = now.getHours();
let minutes = now.getMinutes();

let weekdays = [ 
  "Sun",
  "Mon", 
  "Tue", 
  "Wed", 
  "Thu", 
  "Fri", 
  "Sat"
]

let day = now.getDay();
return `${weekdays[day]} ${(now.getHours()<10?"0":"")} ${hours}:${(now.getMinutes()<10?'0':'')}${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

  return weekdays[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
        <div class="col-2 week-forecast">
          <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
          <img
            src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
            alt=""
            class="week-forecast-images"
            width="30px"
          ></img>
        </div>
      `;
    }
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `eof280024d498303t5b30f9fbaeb9677`
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayForecast);
}

function showCurrentTemp(response) {
  celsiusTemperature = Math.round(response.data.temperature.current);
  let temperature = document.querySelector("#temp-value");
  let h1 = document.querySelector("#current-location");
  let weatherDescription = document.querySelector("#weather-description")
  let windSpeed = document.querySelector("#wind-speed")
  let humidity = document.querySelector("#humidity")
  let currentDate = document.querySelector("#current-date")
  let currentWeatherIcon = document.querySelector("#current-weather-icon")

  temperature.innerHTML = `${celsiusTemperature}`;
  h1.innerHTML = response.data.city;
  weatherDescription.innerHTML  = response.data.condition.description
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mp/h`
  humidity.innerHTML = `${response.data.temperature.humidity}%`
  currentDate.innerHTML = formatDate(response.data.time)
  currentWeatherIcon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
   currentWeatherIcon.setAttribute("alt", `${response.data.condition.description}`)

   getForecast(response.data.coordinates);
}

function displayCurrentLocation(cityInput) {
 let units = `metric`
 let apiKey = `eof280024d498303t5b30f9fbaeb9677`
 let apiEndPoint = `https://api.shecodes.io/weather/v1/current`
 let apiUrl = `${apiEndPoint}?query=${cityInput}&key=${apiKey}&units=${units}`
 let h1 = document.querySelector("#current-location");
 h1.textContent = (`${cityInput.value}`);

 axios.get(apiUrl).then(showCurrentTemp);
}

function formSubmit(event) {
event.preventDefault();
let cityInput = document.querySelector("#location-search-input")
displayCurrentLocation(cityInput.value);
}

let locationSearchForm = document.querySelector("#location-search-form")
locationSearchForm.addEventListener("submit", formSubmit)

function showUserCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `eof280024d498303t5b30f9fbaeb9677`; 
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`
  let h1 = document.querySelector("#current-location");
  h1.textContent = (`${postion}`);
  showCurrentTemp();
}

function showCityOnLoad() {
  let units = `metric`;
  let defaultCity = `London`
  let apiKey = `eof280024d498303t5b30f9fbaeb9677`;
  let apiEndPoint = `https://api.shecodes.io/weather/v1/current`;
  let apiUrl = `${apiEndPoint}?query=${defaultCity}&key=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showCurrentTemp);
}


function searchUserCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `metric`;
  let apiKey = `eof280024d498303t5b30f9fbaeb9677`;
  let apiEndPoint = `https://api.shecodes.io/weather/v1/current`;
  let apiUrl = `${apiEndPoint}?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function handleCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchUserCity)
}

function displayCelsiusTemp(event) {
  event.preventDefault();
 
  temperature.innerHTML = Math.round(celsiusTemperature)
}

let celsiusTemperature = null;

let temperature = document.querySelector("#temp-value")

let currentLocationButton = document.querySelector("#current-location-button")
currentLocationButton.addEventListener("click", handleCurrentLocation)

displayCurrentLocation("london")

displayForecast();

// function displayForecast(response) {
//   console.log(response.data.daily);
//   let forecast = response.data.daily;

//   let forecastElement = document.querySelector("#weather-forecast");

//   let forecastHTML = <div class="row">;
//   forecast.forEach(function(forecastDay, index)) {
//     if (index < 6) {
//       forecastHTML += 
//         <div class="col-2 week-forecast">
//           <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
//           <img
//             src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
//             alt=""
//             class="week-forecast-images"
//             width="30px"
//           ></img>
//           <div class="weather-forecast-temp">
//           <span class="weather-forecast-temp-max"> ${Math.round(forecastDay.temperature.maximum)} </span>
//           <span class="weather-forecast-temp-min"> ${Math.round(forecastDay.temperature.minimum)} </span>
//         </div>
//         </div>
//     };
// }
// forecastHTML += </div>;
//   forecastElement.innerHTML = forecastHTML;
// }

