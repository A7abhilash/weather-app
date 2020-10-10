const openWeatherApi = (() => {
  const apiKey = "933615b5cb39349ef12366a6fa2c75c3";

  const baseUrl = "http://api.openweathermap.org/data";

  const getByGeolocation = async (latitude, longitude) => {
    const response = await fetch(
      `${baseUrl}/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    );

    const data = await response.json();

    const [{ description, icon }] = data.weather;

    return {
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      temperature: data.main.temp,
      weatherStatus: description,
      weatherIcon: icon
    };
  };

  return {
    getByGeolocation,
  };
})();
