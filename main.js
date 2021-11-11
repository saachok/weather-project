function showCity(evt, CityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  // document.getElementById(CityName).style.display = "block";
  evt.currentTarget.className += " active";
  showWeather(CityName);
}

const api = '0f439455f87b7694c081f3e1754f42a0';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

const container = document.querySelector('.container');

const updateHTMLWeatherInfo = ({ iconUrl, place, description, temp, fahrenheit, sunriseGMT, sunsetGMT, backgroundImage }) => {
  // Interacting with DOM to show data
  iconImg.src = iconUrl;
  loc.textContent = `${place}`;
  desc.textContent = `${description}`;
  tempC.textContent = `${temp.toFixed(2)} °C`;
  tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
  sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
  sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;

  container.style.background = `url(${backgroundImage})`;
}

const convertToFahrenheit = (temp) => {
  return (temp * 9) / 5 + 32;
}

const convertEpochTimeToGMT = (timestamp) => {
  return new Date(timestamp * 1000);
}

const getWeatherData = async (base) => {
  const response = await fetch(base)
  return response.json();
}

const prepareCityConfig = async (cityName) => {
  const base = getWeatherURL(cityName);
  const data = await getWeatherData(base);

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

  const backgroundImage = cities[cityName].backgroundImage;


  return {
    temp: temp,
    place: place,
    description: description,
    iconUrl: iconUrl,
    sunriseGMT: sunriseGMT,
    sunsetGMT: sunsetGMT,
    fahrenheit: fahrenheit,
    backgroundImage: backgroundImage
  }
}

const cities = {
  "Ternivka": {
    lat: 48.51779890,
    long: 36.07869000,
    backgroundImage: "https://oblrada.dp.gov.ua/wp-content/uploads/2016/08/ternovka.jpg"
  },
  "Pavlohrad": {
    lat: 48.516667,
    long: 35.866667,
    backgroundImage: "black"
  },
  "Dnipro": {
    lat: 48.450001,
    long: 34.983334,
    backgroundImage: "pink"
  },
  "Lviv": {
    lat: 49.842957,
    long: 24.031111,
    backgroundImage: "purple"
  },
  "Kyiv": {
    lat: 50.4546600,
    long: 30.5238000,
    backgroundImage: "yellow"
  },
  "Odesa": {
    lat: 46.482952,
    long: 30.712481,
    backgroundImage: "white"
  }
}

const getWeatherURL = (cityName) => {
  const cityConfig = cities[cityName];
  return `https://api.openweathermap.org/data/2.5/weather?lat=${cityConfig.lat}&lon=${cityConfig.long}&appid=${api}&units=metric`;
}

const showWeather = async (city) => {
  const cityConfig = await prepareCityConfig(city);
  console.log(cityConfig);
  updateHTMLWeatherInfo(cityConfig);
}