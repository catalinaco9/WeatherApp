import { getForecastForEachDay } from "./api/forecast.js";
import {
  getCurrentWeatherByCity,
  getIconForCurrentWeather,
} from "./api/wheater.js";
import { getLocaleDateFromUnixTime } from "./utils/date.js";

const cityInput = document.querySelector(".main-content form input");
const searchButton = document.querySelector(".main-content form .search-btn");
const forecastButton = document.querySelector(
  ".main-content form .forecast-btn"
);
const weatherContainer = document.querySelector(
  ".main-content .weather-container"
);
const forecastContainer = document.querySelector(".forecast-container");

searchButton.addEventListener("click", showWeather);

async function showWeather(e) {
  e.preventDefault();
  weatherContainer.style.display = "block";

  const city = cityInput.value;
  const weather = await getCurrentWeatherByCity(city);

  const date = getLocaleDateFromUnixTime(weather.dt);
  const iconURL = getIconForCurrentWeather(weather);

  weatherContainer.innerHTML = `
   <div class="flex-row space-between">
      <div>
         <h3>${weather.name} ( ${date} )<h3>
         <p>Temperature: ${weather.main.temp}&deg;C</p>
         <p>Wind: ${weather.wind.speed}</p>
         <p>Humidity: ${weather.main.humidity}</p>
         <p>Min: ${weather.main.temp_max}</p>
         <p>Max: ${weather.main.temp_min}</p>
      </div>
      <div class="weather-icon">
         <img src=${iconURL} />
         <p>${weather.weather[0].description}</p>
      </div>
   </div>
   
   `;
}

forecastButton.addEventListener("click", showForecast);

async function showForecast(e) {
  e.preventDefault();
  const city = cityInput.value;
  const forecastByDayList = await getForecastForEachDay(city);

  const forecastByDayContainers = forecastByDayList
    .map(
      (forecast) =>
        `<div class="forecast-column">
					<h5>${forecast[0].dt_txt}</h5>
					${forecast
            .map((weather) => {
              const iconURL = getIconForCurrentWeather(weather);

              return `
									<div class="forecast-box">
										<div class="weather-icon">
											<img src=${iconURL} />
											<p>${weather.weather[0].description}</p>
										</div>
										<br>
										<p>${weather.dt_txt}</p>
										<p>Temperature: ${weather.main.temp}&deg;C</p>
										<p>Wind: ${weather.wind.speed}</p>
										<p>Humidity: ${weather.main.humidity}</p>
									</div>
								
							`;
            })
            .join("")}
				</div>
				`
    )
    .join("");

  forecastContainer.innerHTML = forecastByDayContainers;
}
