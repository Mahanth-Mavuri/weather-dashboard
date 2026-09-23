import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Snowflake,
  CloudFog
} from 'lucide-react';

/**
 * Map WMO (World Meteorological Organization) weather interpretation codes to human readable descriptions & Lucide icons.
 * Reference: https://open-meteo.com/en/docs
 */
export function getWmoCondition(code) {
  switch (code) {
    case 0:
      return { condition: 'Clear Sky', icon: Sun, iconColor: '#f59e0b' };
    case 1:
      return { condition: 'Mainly Clear', icon: Sun, iconColor: '#f59e0b' };
    case 2:
      return { condition: 'Partly Cloudy', icon: CloudSun, iconColor: '#3b82f6' };
    case 3:
      return { condition: 'Overcast', icon: Cloud, iconColor: '#6b7280' };
    case 45:
    case 48:
      return { condition: 'Foggy', icon: CloudFog, iconColor: '#9ca3af' };
    case 51:
    case 53:
    case 55:
      return { condition: 'Drizzle', icon: CloudDrizzle, iconColor: '#06b6d4' };
    case 56:
    case 57:
      return { condition: 'Freezing Drizzle', icon: CloudDrizzle, iconColor: '#38bdf8' };
    case 61:
    case 63:
      return { condition: 'Slight Rain', icon: CloudRain, iconColor: '#3b82f6' };
    case 65:
      return { condition: 'Heavy Rain', icon: CloudRain, iconColor: '#1d4ed8' };
    case 66:
    case 67:
      return { condition: 'Freezing Rain', icon: CloudRain, iconColor: '#0284c7' };
    case 71:
    case 73:
    case 75:
    case 77:
      return { condition: 'Snowfall', icon: Snowflake, iconColor: '#e0f2fe' };
    case 80:
    case 81:
    case 82:
      return { condition: 'Rain Showers', icon: CloudRain, iconColor: '#2563eb' };
    case 85:
    case 86:
      return { condition: 'Snow Showers', icon: Snowflake, iconColor: '#bae6fd' };
    case 95:
    case 96:
    case 99:
      return { condition: 'Thunderstorm', icon: CloudLightning, iconColor: '#8b5cf6' };
    default:
      return { condition: 'Variable Weather', icon: CloudSun, iconColor: '#3b82f6' };
  }
}

/**
 * Step 1: Convert City Name -> Latitude & Longitude using Open-Meteo Geocoding API
 */
export async function getCoordinates(cityName) {
  const trimmedCity = cityName ? cityName.trim() : '';
  if (!trimmedCity) {
    throw new Error('Please enter a city name to search.');
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    trimmedCity
  )}&count=1&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding server error (Status ${response.status})`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error(`City "${trimmedCity}" was not found. Please check the spelling and try again.`);
    }

    const location = data.results[0];
    return {
      name: location.name,
      country: location.country || location.country_code || '',
      admin1: location.admin1 || '',
      latitude: location.latitude,
      longitude: location.longitude
    };
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Network error: Failed to connect to Open-Meteo Geocoding service.');
    }
    throw err;
  }
}

/**
 * Step 2: Fetch weather details using Latitude & Longitude from Open-Meteo Forecast API
 */
export async function fetchWeatherData(cityName) {
  // 1. Get coordinates for city
  const location = await getCoordinates(cityName);

  // 2. Fetch current weather and daily 5-day forecast
  const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) {
      throw new Error(`Weather service error (Status ${response.status})`);
    }

    const data = await response.json();

    const current = data.current || {};
    const daily = data.daily || {};

    // Map WMO code to condition text and icon
    const currentWmo = getWmoCondition(current.weather_code);

    // Format display title (e.g. "London, United Kingdom")
    const formattedLocation = location.country
      ? `${location.name}, ${location.country}`
      : location.name;

    // Current date string
    const today = new Date();
    const dateFormatted = today.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });

    // Extract 5-day forecast (excluding today or starting today)
    const forecastList = [];
    const dailyTimes = daily.time || [];
    const dailyCodes = daily.weather_code || [];
    const dailyMax = daily.temperature_2m_max || [];
    const dailyMin = daily.temperature_2m_min || [];

    for (let i = 0; i < Math.min(dailyTimes.length, 5); i++) {
      const forecastDate = new Date(dailyTimes[i] + 'T00:00:00');
      const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
      const dateStr = forecastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const wmoInfo = getWmoCondition(dailyCodes[i]);

      forecastList.push({
        day: dayName,
        date: dateStr,
        icon: wmoInfo.icon,
        iconColor: wmoInfo.iconColor,
        tempHigh: `${Math.round(dailyMax[i])}°C`,
        tempLow: `${Math.round(dailyMin[i])}°C`,
        condition: wmoInfo.condition
      });
    }

    // High & low for current day
    const currentHigh = dailyMax[0] !== undefined ? Math.round(dailyMax[0]) : Math.round(current.temperature_2m);
    const currentLow = dailyMin[0] !== undefined ? Math.round(dailyMin[0]) : Math.round(current.temperature_2m);

    return {
      city: formattedLocation,
      cityNameOnly: location.name,
      date: dateFormatted,
      temperature: Math.round(current.temperature_2m),
      high: currentHigh,
      low: currentLow,
      condition: currentWmo.condition,
      conditionIcon: currentWmo.icon,
      conditionIconColor: currentWmo.iconColor,
      description: `Live weather condition in ${location.name} is ${currentWmo.condition.toLowerCase()}.`,
      humidity: Math.round(current.relative_humidity_2m),
      windSpeed: `${Math.round(current.wind_speed_10m)} km/h`,
      windDirection: 'N/A',
      uvIndex: 'Moderate',
      visibility: '10 km',
      forecastList
    };
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Network error: Failed to connect to Open-Meteo Weather service.');
    }
    throw err;
  }
}
