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

function displayForecast() {
  let forecast = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let forecastDays = [
  "Wed", 
  "Thu", 
  "Fri", 
  "Sat", 
  "Sun", 
  "Mon"
  ]
  forecastDays.forEach(function(day) {
     forecastHTML = forecastHTML + 
  `
            <div class ="col-2 week-forecast">
                <div class ="weather-forecast-date">${day}</div>
                <img
                  src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/087/236/original/cloudy.png?1687856689"
                  alt="Partially cloudy"
                  class="week-forecast-images"
                  width="30px"
                />
                <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-max"> 22 </span>
                <span class="weather-forecast-temp-min"> 18 </span>
              </div>
            </div>
          </div>
        </div>
  `;
  })
  forecastHTML = `</div>`;
  forecast.innerHTML = forecastHTML;
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

  celsiusLink.classList.add("active")
  fahrenheitLink.classList.remove("active")
 
  temperature.innerHTML = Math.round(celsiusTemperature)
}

function displayFahrenheitTemp(event) {
  event.preventDefault();

  fahrenheitLink.classList.add("active")
  celsiusLink.classList.remove("active")

  let fahrenheitTemp = ((celsiusTemperature * 9/5) + 32 )
  temperature.innerHTML = Math.round(fahrenheitTemp)
}

let celsiusTemperature = null;


let temperature = document.querySelector("#temp-value")

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsiusTemp)

let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemp)


let currentLocationButton = document.querySelector("#current-location-button")
currentLocationButton.addEventListener("click", handleCurrentLocation)

displayCurrentLocation("london")

displayForecast();
