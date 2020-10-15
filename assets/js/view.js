const buildView = (data) => {
  const cardLoaderElement = document.querySelector(".card.card-loader");
  cardLoaderElement.classList.toggle('hide')

  const cardElement = document.querySelector(".card");
  cardElement.classList.toggle('hide')

  const weatherStatusElement = document.querySelector("#weather-status");
  weatherStatusElement.innerHTML = data.weatherStatus;

  const cityElement = document.querySelector("#city");
  cityElement.innerHTML = `in ${data.city}, ${data.country}`;

  const humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${data.humidity}%`;

  const temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${data.temperature} °C`;

  const windElement = document.querySelector("#wind");
  windElement.innerHTML = `${data.wind} Km/h`;

  const cardIconElement = document.querySelector("#card-icon");
  cardIconElement.src = `http://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`;
};

const buildViewWithErros = (message) => {
  const cardLoaderElement = document.querySelector(".card.card-loader");
  cardLoaderElement.classList.toggle('hide')

  const cardErrorElement = document.querySelector(".card.card-error");
  cardErrorElement.classList.toggle("hide");

  const errorDescriptionElement = document.querySelector(
    ".card.card-error .card-header h3"
  );

  errorDescriptionElement.innerHTML = message;
};


const buildTheme = (weatherData) => {
  const condition = weatherData.weatherArr[0].main || ''; 
  switch(condition) {
    case "Thunderstorm":
      document.body.style.backgroundColor = "#778ca3";
      document.getElementById("card-icon").style.backgroundColor = "#778ca3";
      break;
    case "Rain":
      document.body.style.backgroundColor = "#487eb0";
      document.getElementById("card-icon").style.backgroundColor = "#487eb0";
      break;
    case "Drizzle":
      document.body.style.backgroundColor = "#45aaf2";
      document.getElementById("card-icon").style.backgroundColor = "#45aaf2";
      break;
    case "Clouds":
      document.body.style.backgroundColor = "#d1d8e0";
      document.getElementById("card-icon").style.backgroundColor = "#d1d8e0";
      break;
    case "Snow":
      document.body.style.backgroundColor = "#dfe6e9";
      document.getElementById("card-icon").style.backgroundColor = "#dfe6e9";
      break;
    case "Clear":
      document.body.style.backgroundColor = "#2d98da";
      document.getElementById("card-icon").style.backgroundColor = "#2d98da";
      break;
    default:
      document.body.style.backgroundColor = "#314570";
      document.getElementById("card-icon").style.backgroundColor = "#314570";
  }
}


window.onload = async () => {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    (async () => {
      const response = await openWeatherApi.getByGeolocation(
        latitude,
        longitude
      );

      buildView(response);
      buildTheme(response);
    })();
  };

  const error = () => {
    buildViewWithErros("Unable to retrieve your location");
  };

  if (!navigator.geolocation) {
    buildViewWithErros("Geolocation is not supported by your browser");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};
