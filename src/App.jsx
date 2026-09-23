import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherDetails } from './components/WeatherDetails';
import { ForecastGrid } from './components/ForecastGrid';
import { fetchWeatherData } from './services/weatherApi';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function App() {
  const [city, setCity] = useState('San Francisco');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = async (targetCity) => {
    if (!targetCity || !targetCity.trim()) {
      setError('Please enter a city name before searching.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(targetCity);
      setWeatherData(data);
      setCity(data.cityNameOnly || targetCity);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching weather data.');
    } finally {
      setLoading(false);
    }
  };

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

      {/* 2. City Search Bar */}
      <SearchBar onSearch={handleSearch} isLoading={loading} />

      {/* Error Alert Message */}
      {error && (
        <div className="glass-panel error-banner">
          <AlertCircle size={20} className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State or Dashboard Content */}
      {loading ? (
        <div className="glass-panel loading-container">
          <Loader2 size={40} className="spinner" />
          <p>Fetching real-time weather from Open-Meteo...</p>
        </div>
      ) : weatherData ? (
        <>
          {/* 3. Dashboard Core Layout */}
          <main className="dashboard-grid">
            {/* Current Weather Section */}
            <CurrentWeather weatherData={weatherData} />

            {/* Detailed Metrics (Humidity, Wind, UV, Visibility) */}
            <WeatherDetails
              details={{
                humidity: weatherData.humidity,
                windSpeed: weatherData.windSpeed,
                windDirection: weatherData.windDirection,
                uvIndex: weatherData.uvIndex,
                visibility: weatherData.visibility
              }}
            />
          </main>

          {/* 4. 5-Day Forecast Grid */}
          <ForecastGrid forecastList={weatherData.forecastList} />
        </>
      ) : null}

      {/* Footer */}
      <footer className="app-footer">
        SkyPulse Weather Dashboard &bull; Powered by <span>Open-Meteo API</span>
      </footer>
    </div>
  );
}
