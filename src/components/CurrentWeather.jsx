import React from 'react';
import { MapPin, SunMedium, Clock } from 'lucide-react';
import { getWeatherInfo } from '../utils/wmoCodes';

export function CurrentWeather({ weatherData }) {
  const {
    city = 'San Francisco, US',
    date = 'Monday, Sep 21',
    lastUpdated,
    temperature = 22,
    high = 25,
    low = 16,
    wmoCode = 1,
    unit = '°C',
  } = weatherData || {};

  const weatherInfo = getWeatherInfo(wmoCode);
  const WeatherIcon = weatherInfo.icon;

  return (
    <article className="glass-panel current-weather-card" aria-label={`Current weather for ${city}`}>
      <div className="weather-header">
        <div>
          <h2 className="location-title">
            <MapPin size={24} style={{ color: '#6366f1' }} aria-hidden="true" />
            {city}
          </h2>
          <p className="location-date">
            {date}
            {lastUpdated && (
              <span className="last-updated-tag" aria-label={`Last updated at ${lastUpdated}`}>
                <Clock size={12} style={{ display: 'inline', marginLeft: '8px', marginRight: '3px' }} aria-hidden="true" />
                Updated at {lastUpdated}
              </span>
            )}
          </p>
        </div>
        <div className="weather-status-pill" aria-label="Live weather status">
          <SunMedium size={16} aria-hidden="true" />
          Live Weather
        </div>
      </div>

      <div className="weather-body">
        <div className="temp-large" aria-label={`Current temperature ${temperature} degrees Celsius`}>
          {temperature}{unit}
        </div>
        <div className="weather-condition-group">
          <div className="condition-name">{weatherInfo.description}</div>
          <div className="temp-range">
            High: {high}{unit} &bull; Low: {low}{unit}
          </div>
        </div>
        <div className="weather-hero-icon" aria-hidden="true">
          <WeatherIcon size={90} style={{ color: weatherInfo.color }} />
        </div>
      </div>

      <div className="weather-footer-summary">
        <WeatherIcon size={16} style={{ color: weatherInfo.color }} aria-hidden="true" />
        <span>Current Condition: {weatherInfo.description}</span>
      </div>
    </article>
  );
}
