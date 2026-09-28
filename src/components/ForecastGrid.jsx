import React from 'react';
import { Calendar, Droplets } from 'lucide-react';
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
          const precipProb = item.precipitationProbability ?? 0;

          return (
            <div key={index} className="forecast-card">
              <div className="forecast-header">
                <span className="forecast-day">{item.day}</span>
                <span className="forecast-date">{item.date}</span>
              </div>

              <div className="forecast-icon">
                <IconComponent size={38} style={{ color: weatherInfo.color }} />
              </div>

              <div className="forecast-condition">{weatherInfo.description}</div>

              <div className="forecast-temp-group">
                <span className="forecast-temp-max" title="Maximum Temperature">
                  {item.tempHigh}
                </span>
                <span className="forecast-temp-min" title="Minimum Temperature">
                  / {item.tempLow}
                </span>
              </div>

              <div className="forecast-precip-badge" title="Precipitation Probability">
                <Droplets size={13} className="precip-icon" />
                <span>{precipProb}% Precip</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
