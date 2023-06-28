let now = new Date();
let day = now.getDay();
let weekdays = [ 
  "Sunday",
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"
]
let date = now.getDate();
let month = now.getMonth();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]
let year = now.getFullYear();

let hours = now.getHours();
let minutes = now.getMinutes();
let time = `${(now.getHours()<10?'0':'')}${hours}:${(now.getMinutes()<10?'0':'')}${minutes}`

function showDate() {
  let currentDate = document.querySelector("#current-date")
  currentDate.innerHTML = (`${weekdays[day]} | ${time}`)
}
showDate()

function showCurrentTemp(response) {
  console.log(response)
  let currentTemp = Math.round(response.data.temperature.current);
  let temperature = document.querySelector("#temp-value");
  temperature.innerHTML = `${currentTemp}°C`;
  let h1 = document.querySelector("#current-location");
  h1.innerHTML = response.data.city;
  let weatherDescription = document.querySelector("#weather-description")
  weatherDescription.innerHTML  = `${response.data.condition.description}`
  let windSpeed = document.querySelector("#wind-speed")
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mp/h`
  let humidity = document.querySelector("#humidity")
  humidity.innerHTML = `${response.data.temperature.humidity}%`
 
}

function displayCurrentLocation(cityInput) {
 let units = `metric`
 let apiKey = `eof280024d498303t5b30f9fbaeb9677`
 let apiEndPoint = `https://api.shecodes.io/weather/v1/current`
 let apiUrl = `${apiEndPoint}?query=${cityInput.value}&key=${apiKey}&units=${units}`
 let h1 = document.querySelector("#current-location");
 h1.textContent = (`${cityInput.value}`);

 axios.get(apiUrl).then(showCurrentTemp);
}

function formSubmit(event) {
event.preventDefault();
let cityInput = document.querySelector("#location-search-input")
displayCurrentLocation(cityInput);
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

let currentLocationButton = document.querySelector("#current-location-button")
currentLocationButton.addEventListener("click", handleCurrentLocation)



// CELSIUS TO FAHRENHEIT CONVERSION
// function changeToFahrenheit(event) {
//   event.preventDefault();
//   tempValue.innerHTML = 66
// }
// function changeToCelsius(event) {
//   event.preventDefault();
//   tempValue.innerHTML = 19 
// }
// let tempValue = document.querySelector("#temp-value")

// let celsiusLink = document.querySelector("#celsius-link")
// celsiusLink.addEventListener("click", changeToCelsius)

// let fahrenheitLink = document.querySelector("#fahrenheit-link")
// fahrenheitLink.addEventListener("click", changeToFahrenheit)
