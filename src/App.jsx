import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherDetails } from './components/WeatherDetails';
import { ForecastGrid } from './components/ForecastGrid';
import { fetchWeatherData } from './services/weatherService';
import { AlertCircle, RefreshCw } from 'lucide-react';

const RECENT_SEARCHES_KEY = 'weather_recent_searches';

// Safe helper to read recent searches from localStorage
function loadRecentSearches() {
  try {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Failed to load recent searches from localStorage:', err);
  }
  return [];
}

// Safe helper to save recent searches to localStorage
function saveRecentSearches(searches) {
  try {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
  } catch (err) {
    console.warn('Failed to save recent searches to localStorage:', err);
  }
}

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCity, setLastSearchedCity] = useState('San Francisco');
  const [recentSearches, setRecentSearches] = useState(loadRecentSearches);

  // Async function with try/catch/finally to load weather data
  const loadWeather = async (cityName) => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch data via Open-Meteo API
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
      setLastSearchedCity(cityName);

      // Extract city name for recent history (e.g., "Hyderabad" from "Hyderabad, India")
      const savedCityName = data.city ? data.city.split(',')[0].trim() : cityName.trim();

      // Update recent searches list (max 5, no duplicates)
      setRecentSearches((prevHistory) => {
        const filtered = prevHistory.filter(
          (c) => c.toLowerCase() !== savedCityName.toLowerCase()
        );
        const updated = [savedCityName, ...filtered].slice(0, 5);
        saveRecentSearches(updated);
        return updated;
      });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear search history handler
  const handleClearHistory = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (err) {
      console.warn('Failed to remove recent searches from localStorage:', err);
    }
  };

  // Initial load on mount for default city
  useEffect(() => {
    loadWeather('San Francisco');
  }, []);

  const handleSearch = (searchedCity) => {
    loadWeather(searchedCity);
  };

  return (
    <div className="app-container">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Search Bar with Recent History */}
      <SearchBar
        onSearch={handleSearch}
        isLoading={isLoading}
        recentSearches={recentSearches}
        onClearHistory={handleClearHistory}
      />

      {/* Error Alert Message */}
      {error && (
        <div className="glass-panel error-banner" role="alert">
          <AlertCircle size={24} className="error-icon" />
          <div className="error-text">
            <strong>Weather Update Notice:</strong> {error}
          </div>
          <button
            className="retry-btn"
            onClick={() => loadWeather(lastSearchedCity || 'San Francisco')}
          >
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* Loading Indicator Spinner Overlay */}
      {isLoading && (
        <div className="glass-panel loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Fetching live weather from Open-Meteo...</p>
        </div>
      )}

      {/* 3. Main Dashboard Weather View */}
      {!isLoading && weatherData && (
        <>
          <main className="dashboard-grid">
            {/* Current Weather Card */}
            <CurrentWeather weatherData={weatherData} />

            {/* Detailed Metrics */}
            <WeatherDetails
              details={{
                humidity: weatherData.humidity,
                windSpeed: weatherData.windSpeed,
                windDirection: weatherData.windDirection,
                uvIndex: 'Moderate',
                visibility: weatherData.pressure || '1013 hPa',
              }}
            />
          </main>

          {/* 4. 5-Day Forecast Grid */}
          <ForecastGrid forecastList={weatherData.forecast} />
        </>
      )}

      {/* Footer */}
      <footer className="app-footer">
        SkyPulse Weather Dashboard &bull; Powered by <span>Open-Meteo API</span>
      </footer>
    </div>
  );
}
