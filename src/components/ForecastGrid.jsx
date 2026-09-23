import React from 'react';
import { Calendar, Sun, CloudSun, CloudRain, CloudLightning, CloudDrizzle } from 'lucide-react';

export function ForecastGrid({ forecastList }) {
  // Default 5-Day Forecast mock data
  const defaultForecast = [
    { day: 'Tue', date: 'Sep 22', icon: Sun, tempHigh: '24°C', tempLow: '15°C', condition: 'Sunny' },
    { day: 'Wed', date: 'Sep 23', icon: CloudSun, tempHigh: '22°C', tempLow: '14°C', condition: 'Partly Cloudy' },
    { day: 'Thu', date: 'Sep 24', icon: CloudRain, tempHigh: '19°C', tempLow: '12°C', condition: 'Light Rain' },
    { day: 'Fri', date: 'Sep 25', icon: CloudLightning, tempHigh: '18°C', tempLow: '11°C', condition: 'Thunderstorm' },
    { day: 'Sat', date: 'Sep 26', icon: CloudSun, tempHigh: '21°C', tempLow: '13°C', condition: 'Clearing Up' },
  ];

  const items = forecastList || defaultForecast;

  return (
    <section className="glass-panel forecast-section">
      <div className="section-title-group">
        <h3 className="section-title">
          <Calendar size={20} style={{ color: '#6366f1' }} />
          5-Day Weather Forecast
        </h3>
      </div>

      <div className="forecast-grid">
        {items.map((item, index) => {
          const IconComponent = item.icon || Sun;
          return (
            <div key={index} className="forecast-card">
              <div className="forecast-day">{item.day}</div>
              <div className="forecast-date">{item.date}</div>
              <div className="forecast-icon">
                <IconComponent size={36} style={{ color: '#f59e0b' }} />
              </div>
              <div className="forecast-temp">
                {item.tempHigh}{' '}
                <span className="forecast-low">/ {item.tempLow}</span>
              </div>
              <div className="forecast-condition">{item.condition}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
