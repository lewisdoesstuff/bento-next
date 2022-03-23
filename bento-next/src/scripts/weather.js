import { config } from '../../config';

export const weatherPromise = getWeather();

var tempUnit = config.tempUnit;

const kelvin = 273.15;
const key = config.weatherKey;

async function setPosition() {
  let pos;
  if (!config.trackLocation || !navigator.geolocation) {
    if (config.trackLocation) {
      console.error('Geolocation not available');
    }
    pos = { lat: config.defaultLatitude, lon: config.defaultLongitude };
  }

  pos = new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude.toFixed(3),
          lon: pos.coords.longitude.toFixed(3),
        });
      },
      () => {
        resolve({ lat: config.defaultLatitude, lon: config.defaultLongitude });
      }
    );
  });
  return pos;
}

async function getWeather() {
  const position = await setPosition();
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&lang=${config.language}&appid=${key}`;

  let response = await fetch(api).catch((err) => {
    console.log(err);
  });
  let data = await response.json();

  let celsius = Math.floor(data.main.temp - kelvin);
  return {
    description: data.weather[0].description,
    iconId: data.weather[0].icon,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    temperature: tempUnit == 'C' ? celsius : (celsius * 9) / 5 + 32,
  };
}
