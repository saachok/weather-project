function showCity(evt, CityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(CityName).style.display = "block";
  evt.currentTarget.className += " active";
}

const api = '0f439455f87b7694c081f3e1754f42a0';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

const updateHTMLWeatherInfo = ({ iconUrl, place, description, temp, fahrenheit, sunriseGMT, sunsetGMT }) => {
  // Interacting with DOM to show data
  iconImg.src = iconUrl;
  loc.textContent = `${place}`;
  desc.textContent = `${description}`;
  tempC.textContent = `${temp.toFixed(2)} °C`;
  tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
  sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
  sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
}

const convertToFahrenheit = (temp) => {
  return (temp * 9) / 5 + 32;
}

const convertEpochTimeToGMT = (timestamp) => {
  return new Date(timestamp * 1000);
}

const getWeatherData = (base) => {
  // Using fetch to get data
  fetch(base)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Fetched data", data);
      const { temp } = data.main;
      const place = data.name;
      const { description, icon } = data.weather[0];
      const { sunrise, sunset } = data.sys;

      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const fahrenheit = convertToFahrenheit(temp);

      // Converting Epoch(Unix) time to GMT
      const sunriseGMT = convertEpochTimeToGMT(sunrise);
      const sunsetGMT = convertEpochTimeToGMT(sunset);

      updateHTMLWeatherInfo({ iconUrl, place, description, temp, fahrenheit, sunriseGMT, sunsetGMT });
    });
}

const getCordinatesAndShowWeather = () => {
  let long;
  let lat;
  // Accessing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
      getWeatherData(base);
    });
  }
}

window.addEventListener('load', getCordinatesAndShowWeather);