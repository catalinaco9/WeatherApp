const url =
  "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

export const getForecastByCity = async (city) => {
  const response = await fetch(`${url}${city}`);
  const weather = await response.json();

  return weather;
};

export const getForecastForEachDay = async (city) => {
  const forecast = await getForecastByCity(city);

  const days = forecast.list.map((element) => element.dt_txt.split(" ")[0]);
  const uniqueDays = new Set(days);

  const forecastByDayList = [];
  uniqueDays.forEach((day) => {
    const forecastByDay = forecast.list.filter((element) =>
      element.dt_txt.includes(day)
    );
    forecastByDayList.push(forecastByDay);
  });

  return forecastByDayList;
};
