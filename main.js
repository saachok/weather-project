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

  container.style.backgroundImage = `url(${backgroundImage})`;
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

const getWeatherURL = (cityName) => {
  const cityConfig = cities.find((element) => { return element.name === cityName });                                                                                                                            // 1
  return `https://api.openweathermap.org/data/2.5/weather?lat=${cityConfig.lat}&lon=${cityConfig.long}&appid=${api}&units=metric`;
}

const prepareCityConfig = async (cityName) => {
  const base = getWeatherURL(cityName);
  const data = await getWeatherData(base);

  const { temp } = data.main;
  const place = data.name;
  const { description, icon } = data.weather[0];
  const { sunrise, sunset } = data.sys;

  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const fahrenheit = convertToFahrenheit(temp);
  const sunriseGMT = convertEpochTimeToGMT(sunrise);
  const sunsetGMT = convertEpochTimeToGMT(sunset);


  const backgroundImage = cities.find((element) => { return element.name === cityName }).backgroundImage;

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

const cities = [ // {a: 1}, {}, {}
  {
    name: "Ternivka",
    lat: 48.51779890,
    long: 36.07869000,
    backgroundImage: "https://i.ytimg.com/vi/u8sehjoAx5Y/maxresdefault.jpg"
  },
  {
    name: "Pavlohrad",
    lat: 48.516667,
    long: 35.866667,
    backgroundImage: "https://pavlogradmrada.dp.gov.ua/wp-content/uploads/2019/03/111-1.jpg"
  },
  {
    name: "Dnipro",
    lat: 48.450001,
    long: 34.983334,
    backgroundImage: "https://cdn.theculturetrip.com/wp-content/uploads/2018/02/34711225831_954477fb4c_k.jpg"
  },
  {
    name: "Lviv",
    lat: 49.842957,
    long: 24.031111,
    backgroundImage: "https://wallpapercave.com/wp/wp8910482.jpg",
  },
  {
    name: "Kyiv",
    lat: 50.4546600,
    long: 30.5238000,
    backgroundImage: "https://wallpaperaccess.com/full/1999952.jpg"
  },
  {
    name: "Odesa",
    lat: 46.482952,
    long: 30.712481,
    backgroundImage: "https://prawwwda.com/images/prawda/milana/2021/obsheje/odessa_0.jpg"
  },
  {
    name: "Berlin",
    lat: 52.520008,
    long: 13.404954,
    backgroundImage: "https://planetofhotels.com/guide/sites/default/files/styles/paragraph__live_banner__lb_image__1880bp/public/live_banner/berlin.jpg"
  },
  {
    name: "Rome",
    lat: 41.902782,
    long: 12.496366,
    backgroundImage: "https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateRome_Hero_shutterstock789412159.jpg"
  },
  {
    name: "Amsterdam",
    lat: 52.379189,
    long: 4.899431,
    backgroundImage: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iwcknWNa0.9c/v1/-1x-1.jpg"
  },
  {
    name: "Prague",
    lat: 50.073658,
    long: 14.418540,
    backgroundImage: "https://670379-2197025-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2019/12/Safestay-Prague-Mustek-1.jpg"
  },
  {
    name: "Warsaw",
    lat: 52.237049,
    long: 21.017532,
    backgroundImage: "https://travelermaster.com/wp-content/uploads/2021/09/elijah-g-oOHHxQ65dFE-unsplash.jpg"
  },
  {
    name: "New York",
    lat: 43.000000,
    long: -75.000000,
    backgroundImage: "https://adijuhpalace.ru/800/600/https/worldstrides.com/wp-content/uploads/2015/07/iStock_000040849990_Large.jpg"
  },
  {
    name: "Mexico City",
    lat: 19.432608,
    long: -99.133209,
    backgroundImage: "https://www.travels-mexico.com/wp-content/uploads/mexico-city.jpeg"
  },
  {
    name: "Tokyo",
    lat: 35.652832,
    long: 139.839478,
    backgroundImage: "https://cms.finnair.com/resource/blob/720604/0511bb2bc91953d4ef3506d00933819b/tokyo-main-data.jpg"
  },
  {
    name: "Sydney",
    lat: -33.865143,
    long: 151.209900,
    backgroundImage: "https://homeiswhereyourbagis.com/wp-content/uploads/2019/11/Sydney-Opera-und-CBD-Skyline.jpg"
  },
];

const showWeather = async (city) => {
  const cityConfig = await prepareCityConfig(city);
  updateHTMLWeatherInfo(cityConfig);
}

const showStartScreen = () => {
  showWeather("Lviv");
};

window.addEventListener("load", showStartScreen);