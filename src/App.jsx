import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherDetails } from './components/WeatherDetails';
import { ForecastGrid } from './components/ForecastGrid';
import { fetchWeatherData } from './services/weatherService';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCity, setLastSearchedCity] = useState('San Francisco');

  // Async function with try/catch/finally to load weather data
  const loadWeather = async (cityName) => {
    // 1. Reset state & set loading
    setIsLoading(true);
    setError(null);

    try {
      // 2. Fetch data via Open-Meteo API (handles geocoding + weather forecast)
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
      setLastSearchedCity(cityName);
    } catch (err) {
      // 3. Catch errors (empty input, invalid city, network failure)
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      // 4. Always turn off loading state when request finishes
      setIsLoading(false);
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

      {/* 2. Search Bar */}
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

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
