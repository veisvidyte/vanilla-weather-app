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
  let currentTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp-value");
  let windSpeed = document.querySelector("#wind-speed")
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity")
  let sunrise = document.querySelector("#sunrise-time")
  let sunset = document.querySelector("#sunset-time")
  temperature.innerHTML = `${currentTemp}°C`;
  let h1 = document.querySelector("#current-location");
  h1.innerHTML = response.data.name;
 
}

function displayCurrentLocation(cityInput) {
 let units = `metric`
 let apiKey = `c346c49bd4b6e73b2c4880febce56480`
 let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`
 let apiUrl = `${apiEndPoint}?q=${cityInput.value}&appid=${apiKey}&units=${units}`
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
  let apiKey = `c346c49bd4b6e73b2c4880febce56480`;
  let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
  let h1 = document.querySelector("#current-location");
  h1.textContent = (`${postion}`);
  showCurrentTemp();
}

function searchUserCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `metric`;
  let apiKey = `c346c49bd4b6e73b2c4880febce56480`;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
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
