const searchInput = document.querySelector(".search-input");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherList = document.querySelector(".weather-list");
const locationBtn = document.querySelector(".location-btn");

const API_KEY = "a018a891d2264222a8380721252106";
const getWeatherIcon = (condition, isDay = true) => {
  const conditionLower = condition.toLowerCase();

  // Clear/Sunny conditions
  if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
    return "images/clear.svg";
  }

  // Cloudy conditions
  if (
    conditionLower.includes("cloudy") ||
    conditionLower.includes("overcast")
  ) {
    return "images/cloud.svg";
  }

  // Rain conditions
  if (
    conditionLower.includes("rain") ||
    conditionLower.includes("shower") ||
    conditionLower.includes("drizzle")
  ) {
    return "images/rain.svg";
  }

  // Storm conditions
  if (conditionLower.includes("thunder") || conditionLower.includes("storm")) {
    return "images/storm.svg";
  }

  // Snow conditions
  if (conditionLower.includes("snow") || conditionLower.includes("blizzard")) {
    return "images/snow.svg";
  }

  // Fog/Mist/Haze conditions
  if (
    conditionLower.includes("fog") ||
    conditionLower.includes("mist") ||
    conditionLower.includes("haze")
  ) {
    return "images/haze.svg";
  }

  // Default fallback
  return "images/cloud.svg";
};

const getWeatherDetails = async (API_URL) => {
  window.innerWidth <= 768 && searchInput.blur();

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);

    const temperature = data.current.temp_c;
    const description = data.current.condition.text;
    const locationName = data.location.name;
    const isDay = data.current.is_day === 1;

    const forecastData = data.forecast.forecastday[0].hour;

    const currentWeatherIcon = getWeatherIcon(description, isDay);
    currentWeatherDiv.querySelector(".weather-icon").src = currentWeatherIcon;

    currentWeatherDiv.querySelector(
      ".temperature"
    ).innerHTML = `${temperature}<span>&deg;C</span>`;

    currentWeatherDiv.querySelector(
      ".description"
    ).innerHTML = `${description}`;

    currentWeatherDiv.querySelector(
      ".location-name"
    ).textContent = `${locationName}`;

    weatherList.innerHTML = "";

    for (element of forecastData) {
      const forecastTemperature = element.temp_c;
      const forecastTime = element.time.slice(11);
      const forecastCondition = element.condition.text;
      const forecastIsDay = element.is_day === 1;

      const hourlyWeatherIcon = getWeatherIcon(
        forecastCondition,
        forecastIsDay
      );

      let weatherItem = document.createElement("li");
      weatherItem.innerHTML = `<p class="time">${forecastTime}</p>
              <img
                src="${hourlyWeatherIcon}"
                alt="${forecastCondition}"
                class="weather-icon"
              />
              <p class="temperature">${forecastTemperature}&deg;C</p>`;
      weatherItem.classList.add("weather-item");
      weatherList.appendChild(weatherItem);
    }

    searchInput.value = "";
  } catch (error) {
    console.log(error);
  }
};

const setupWeatherRequest = (cityName) => {
  const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}`;
  getWeatherDetails(API_URL);
};

searchInput.addEventListener("keyup", (e) => {
  const cityName = searchInput.value.trim();

  if (e.key == "Enter" && cityName) {
    setupWeatherRequest(cityName);
  }
});

locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}`;
      getWeatherDetails(API_URL);
    },
    (error) => {
      alert(
        "Location access denied. Please enable permission to use this feature."
      );
    }
  );
});
