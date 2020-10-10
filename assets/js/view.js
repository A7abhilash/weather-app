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
