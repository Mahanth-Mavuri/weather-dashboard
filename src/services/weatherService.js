/**
 * Service to fetch weather data from Open-Meteo APIs (Geocoding & Forecast)
 */

// Helper to convert wind degrees to direction (e.g. 180 -> S, 315 -> NW)
function getWindDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((degrees % 360) / 45) % 8;
  return directions[index];
}

// Helper to format date string into Day Name and Date (e.g. 'Tue', 'Sep 22')
function formatForecastDate(dateStr) {
  const dateObj = new Date(dateStr);
  const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const date = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return { day, date };
}

/**
 * Fetches current weather and 5-day forecast for a given city name.
 * @param {string} cityName - Name of the city to search.
 * @returns {Promise<Object>} Weather data object.
 */
export async function fetchWeatherData(cityName) {
  // Validate empty input
  if (!cityName || !cityName.trim()) {
    throw new Error('Please enter a valid city name.');
  }

  const cleanCity = cityName.trim();

  // 1. Geocode City Name -> Latitude & Longitude
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanCity)}&count=1&language=en&format=json`;

  let geoResponse;
  try {
    geoResponse = await fetch(geoUrl);
  } catch (networkError) {
    throw new Error('Network error: Unable to connect to weather service. Please check your internet connection.');
  }

  if (!geoResponse.ok) {
    throw new Error(`Geocoding server error (${geoResponse.status}). Please try again later.`);
  }

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`City "${cleanCity}" not found. Please check spelling and try again.`);
  }

  const location = geoData.results[0];
  const { latitude, longitude, name, country } = location;

  // 2. Fetch Weather Forecast Data from Open-Meteo
  const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  let weatherResponse;
  try {
    weatherResponse = await fetch(forecastUrl);
  } catch (networkError) {
    throw new Error('Network error: Failed to fetch weather details. Please try again.');
  }

  if (!weatherResponse.ok) {
    throw new Error(`Weather service error (${weatherResponse.status}). Please try again later.`);
  }

  const weatherData = await weatherResponse.json();
  const current = weatherData.current;
  const daily = weatherData.daily;

  // Format 5-day forecast (using next 5 days from daily arrays)
  const forecastList = [];
  const forecastDaysCount = Math.min(5, daily.time.length);
  for (let i = 0; i < forecastDaysCount; i++) {
    const { day, date } = formatForecastDate(daily.time[i]);
    forecastList.push({
      day,
      date,
      wmoCode: daily.weather_code[i],
      tempHigh: `${Math.round(daily.temperature_2m_max[i])}°C`,
      tempLow: `${Math.round(daily.temperature_2m_min[i])}°C`,
    });
  }

  // Format current date
  const now = new Date();
  const currentDateFormatted = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return {
    city: `${name}${country ? `, ${country}` : ''}`,
    date: currentDateFormatted,
    temperature: Math.round(current.temperature_2m),
    high: Math.round(daily.temperature_2m_max[0]),
    low: Math.round(daily.temperature_2m_min[0]),
    wmoCode: current.weather_code,
    humidity: current.relative_humidity_2m,
    windSpeed: `${Math.round(current.wind_speed_10m)} km/h`,
    windDirection: getWindDirection(current.wind_direction_10m),
    pressure: `${Math.round(current.surface_pressure)} hPa`,
    forecast: forecastList,
  };
}
