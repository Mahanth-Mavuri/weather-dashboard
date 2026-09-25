import React from 'react';
import { Calendar } from 'lucide-react';
import { getWeatherInfo } from '../utils/wmoCodes';

export function ForecastGrid({ forecastList }) {
  if (!forecastList || forecastList.length === 0) {
    return null;
  }

  return (
    <section className="glass-panel forecast-section">
      <div className="section-title-group">
        <h3 className="section-title">
          <Calendar size={20} style={{ color: '#6366f1' }} />
          5-Day Weather Forecast
        </h3>
      </div>

      <div className="forecast-grid">
        {forecastList.map((item, index) => {
          const weatherInfo = getWeatherInfo(item.wmoCode);
          const IconComponent = weatherInfo.icon;

          return (
            <div key={index} className="forecast-card">
              <div className="forecast-day">{item.day}</div>
              <div className="forecast-date">{item.date}</div>
              <div className="forecast-icon">
                <IconComponent size={36} style={{ color: weatherInfo.color }} />
              </div>
              <div className="forecast-temp">
                {item.tempHigh}{' '}
                <span className="forecast-low">/ {item.tempLow}</span>
              </div>
              <div className="forecast-condition">{weatherInfo.description}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
