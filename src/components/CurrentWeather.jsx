import React from 'react';
import { MapPin, Sun, CloudSun, CloudRain, SunMedium } from 'lucide-react';

export function CurrentWeather({ weatherData }) {
  const {
    city = 'San Francisco, US',
    date = 'Monday, Sep 21',
    temperature = 22,
    high = 25,
    low = 16,
    condition = 'Partly Cloudy',
    description = 'Mild breeze with pleasant sunshine',
    unit = '°C'
  } = weatherData || {};

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
          {condition}
        </div>
      </div>

      <div className="weather-body">
        <div className="temp-large">
          {temperature}{unit}
        </div>
        <div className="weather-condition-group">
          <div className="condition-name">{condition}</div>
          <div className="temp-range">
            High: {high}{unit} &bull; Low: {low}{unit}
          </div>
        </div>
        <div className="weather-hero-icon">
          <CloudSun size={90} />
        </div>
      </div>

      <div className="weather-footer-summary">
        <Sun size={16} style={{ color: '#f59e0b' }} />
        <span>Today's Outlook: {description}</span>
      </div>
    </div>
  );
}
