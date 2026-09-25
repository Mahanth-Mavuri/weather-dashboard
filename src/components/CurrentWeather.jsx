import React from 'react';
import { MapPin, SunMedium } from 'lucide-react';
import { getWeatherInfo } from '../utils/wmoCodes';

export function CurrentWeather({ weatherData }) {
  const {
    city = 'San Francisco, US',
    date = 'Monday, Sep 21',
    temperature = 22,
    high = 25,
    low = 16,
    wmoCode = 1,
    unit = '°C',
  } = weatherData || {};

  const weatherInfo = getWeatherInfo(wmoCode);
  const WeatherIcon = weatherInfo.icon;

  return (
    <div className="glass-panel current-weather-card">
      <div className="weather-header">
        <div>
          <h2 className="location-title">
            <MapPin size={24} style={{ color: '#6366f1' }} />
            {city}
          </h2>
          <p className="location-date">{date}</p>
        </div>
        <div className="weather-status-pill">
          <SunMedium size={16} />
          Live Weather
        </div>
      </div>

      <div className="weather-body">
        <div className="temp-large">
          {temperature}{unit}
        </div>
        <div className="weather-condition-group">
          <div className="condition-name">{weatherInfo.description}</div>
          <div className="temp-range">
            High: {high}{unit} &bull; Low: {low}{unit}
          </div>
        </div>
        <div className="weather-hero-icon">
          <WeatherIcon size={90} style={{ color: weatherInfo.color }} />
        </div>
      </div>

      <div className="weather-footer-summary">
        <WeatherIcon size={16} style={{ color: weatherInfo.color }} />
        <span>Current Condition: {weatherInfo.description}</span>
      </div>
    </div>
  );
}
