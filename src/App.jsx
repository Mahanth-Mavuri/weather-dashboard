import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherDetails } from './components/WeatherDetails';
import { ForecastGrid } from './components/ForecastGrid';

export default function App() {
  // Simple state for city search and current weather demonstration
  const [city, setCity] = useState('San Francisco');

  // Placeholder data dictionary for quick city selection simulation
  const cityMockData = {
    'San Francisco': {
      city: 'San Francisco, US',
      date: 'Monday, Sep 21',
      temperature: 22,
      high: 25,
      low: 16,
      condition: 'Partly Cloudy',
      description: 'Mild breeze with pleasant sunshine throughout the day.',
      humidity: 64,
      windSpeed: '14 km/h',
      windDirection: 'NW',
      uvIndex: '5 (Moderate)',
      visibility: '10 km'
    },
    'London': {
      city: 'London, UK',
      date: 'Monday, Sep 21',
      temperature: 17,
      high: 19,
      low: 12,
      condition: 'Light Rain',
      description: 'Occasional light showers expected with cool winds.',
      humidity: 82,
      windSpeed: '22 km/h',
      windDirection: 'SW',
      uvIndex: '3 (Low)',
      visibility: '8 km'
    },
    'Tokyo': {
      city: 'Tokyo, JP',
      date: 'Monday, Sep 21',
      temperature: 26,
      high: 28,
      low: 21,
      condition: 'Sunny',
      description: 'Clear blue skies with warm sunshine and gentle breeze.',
      humidity: 55,
      windSpeed: '10 km/h',
      windDirection: 'NE',
      uvIndex: '7 (High)',
      visibility: '12 km'
    },
    'Sydney': {
      city: 'Sydney, AU',
      date: 'Monday, Sep 21',
      temperature: 20,
      high: 23,
      low: 15,
      condition: 'Mostly Sunny',
      description: 'Pleasant spring weather with low chances of precipitation.',
      humidity: 58,
      windSpeed: '18 km/h',
      windDirection: 'SE',
      uvIndex: '6 (High)',
      visibility: '10 km'
    },
    'New York': {
      city: 'New York, US',
      date: 'Monday, Sep 21',
      temperature: 24,
      high: 27,
      low: 18,
      condition: 'Clear Sky',
      description: 'Bright sunshine with mild comfortable humidity levels.',
      humidity: 50,
      windSpeed: '12 km/h',
      windDirection: 'W',
      uvIndex: '6 (High)',
      visibility: '10 km'
    }
  };

  // Get data for current city or fallback dynamically
  const activeWeatherData = cityMockData[city] || {
    city: `${city}, Global`,
    date: 'Monday, Sep 21',
    temperature: 23,
    high: 26,
    low: 17,
    condition: 'Partly Cloudy',
    description: `Current simulated weather conditions for ${city}.`,
    humidity: 60,
    windSpeed: '15 km/h',
    windDirection: 'N',
    uvIndex: '5 (Moderate)',
    visibility: '10 km'
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <div className="app-container">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. City Search Bar */}
      <SearchBar onSearch={handleSearch} currentCity={city} />

      {/* 3. Dashboard Core Layout */}
      <main className="dashboard-grid">
        {/* Current Weather Section */}
        <CurrentWeather weatherData={activeWeatherData} />

        {/* Detailed Metrics (Humidity, Wind, UV, Visibility) */}
        <WeatherDetails
          details={{
            humidity: activeWeatherData.humidity,
            windSpeed: activeWeatherData.windSpeed,
            windDirection: activeWeatherData.windDirection,
            uvIndex: activeWeatherData.uvIndex,
            visibility: activeWeatherData.visibility
          }}
        />
      </main>

      {/* 4. 5-Day Forecast Grid */}
      <ForecastGrid />

      {/* Footer */}
      <footer className="app-footer">
        SkyPulse Weather Dashboard &bull; Designed with <span>React & Vite</span>
      </footer>
    </div>
  );
}
