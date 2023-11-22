const url =
  "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

export const getCurrentWeatherByCity = async (city) => {
  const response = await fetch(`${url}${city}`);
  const weather = await response.json();

  return weather;
};

export const getIconForCurrentWeather = (weather) => {
  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

  return iconUrl;
};
