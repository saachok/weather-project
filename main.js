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

const prepareCityConfig = async (cityName) => {
  const base = getWeatherURL(cityName);
  const data = await getWeatherData(base);

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

const citiesArray = [
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
    backgroundImage: "https://i.obozrevatel.com/news/2021/2/1/gettyimages-1084645228.jpg?size=1944x924"
  },
  {
    name: "Lviv",
    lat: 49.842957,
    long: 24.031111,
    backgroundImage: "https://cdnp.flypgs.com/files/Sehirler-long-tail/Lviv/lviv-sehir-meydan.jpg"
  },
  {
    name: "Kyiv",
    lat: 50.4546600,
    long: 30.5238000,
    backgroundImage: "https://cdn.britannica.com/19/194819-050-BED53A4E/Maidan-Nezalezhnosti-Kiev-Ukraine.jpg"
  },
  {
    name: "Odesa",
    lat: 46.482952,
    long: 30.712481,
    backgroundImage: "https://www.gmfus.org/sites/default/files/styles/watermark/public/2021-08/shutterstock_1095160991.jpg?itok=ucerHq92"
  },
  {
    name: "Berlin",
    lat: 52.520008,
    long: 13.404954,
    backgroundImage: "https://vsitury.com.ua/uploads/182/54049/1.jpg"
  },
  {
    name: "Rome",
    lat: 41.902782,
    long: 12.496366,
    backgroundImage: "https://cdn.sweetescape.com/images/cities/rome/cover/757d54f8-06d6-4c19-beef-410d5dfa33a6.jpg"
  },
  {
    name: "Amsterdam",
    lat: 52.379189,
    long: 4.899431,
    backgroundImage: "https://s9.travelask.ru/uploads/post/000/024/888/main_image/facebook-260d1e861e913e605f741673cf80b08f.jpg"
  },
  {
    name: "Prague",
    lat: 50.073658,
    long: 14.418540,
    backgroundImage: "https://micedata.s3.eu-central-1.amazonaws.com/MiceProjectData/Images/2020/3/31/135_821_6bdfbd01-dc37-4900-a663-bd7663cdabb1.jpg"
  },
  {
    name: "Warsaw",
    lat: 52.237049,
    long: 21.017532,
    backgroundImage: "https://travellgide.ru/wp-content/uploads/2019/05/1254899_xl-800x445.jpg"
  },
  {
    name: "New York",
    lat: 43.000000,
    long: -75.000000,
    backgroundImage: "https://lviv.com/wp-content/uploads/2017/11/New_York_NYC.jpg"
  },
  {
    name: "Mexico City",
    lat: 19.432608,
    long: -99.133209,
    backgroundImage: "https://www.roadaffair.com/wp-content/uploads/2020/11/cathedral-zocalo-square-mexico-city-shutterstock_1323912815.jpg"
  },
  {
    name: "Tokyo",
    lat: 35.652832,
    long: 139.839478,
    backgroundImage: "https://www.agoda.com/wp-content/uploads/2019/01/Tokyo-travel-tips_city-guides_Tokyo_Japan_people-at-shibuya-crossing.jpg"
  },
  {
    name: "Sydney",
    lat: -33.865143,
    long: 151.209900,
    backgroundImage: "https://www.wallpapers13.com/wp-content/uploads/2016/07/Sydney-Australia-Opera-House-HD-Wallpaper-Download-for-mobile.jpg"
  },
];

const getWeatherURL = (cityName) => {
  const cityConfig = cities[cityName];
  return `https://api.openweathermap.org/data/2.5/weather?lat=${cityConfig.lat}&lon=${cityConfig.long}&appid=${api}&units=metric`;
}

const showWeather = async (city) => {
  const cityConfig = await prepareCityConfig(city);
  updateHTMLWeatherInfo(cityConfig);
}

const showStartScreen = () => {

};

window.addEventListener("load", showStartScreen);