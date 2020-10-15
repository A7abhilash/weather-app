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

  const date_time = new Date(); // for now
  const current_hrs = date_time.getHours();

  let theme_color;

  switch(condition) {
    case "Thunderstorm":
      theme_color = "#778ca3"
      break;

    case "Rain":
      theme_color = "#487eb0";
      break;

    case "Drizzle":
      theme_color = "#45aaf2";
      break;

    case "Clouds":
      theme_color = "#d1d8e0";
      break;

    case "Snow":
      theme_color = "#dfe6e9";
      break;

    case "Clear":

      if(current_hrs > 0 && current_hrs <= 6){
        theme_color = "#192a56";
      }else if(current_hrs > 6 && current_hrs <= 12){
        theme_color = "#2d98da";
      }else if(current_hrs > 12 && current_hrs < 18){
        theme_color = "#ff7f50";
      }else{
        theme_color = "#192a56";
      }

      break;

    default:
      theme_color = "#314570";
  }

  document.body.style.backgroundColor = theme_color;
  document.getElementById("card-icon").style.backgroundColor = theme_color;
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
