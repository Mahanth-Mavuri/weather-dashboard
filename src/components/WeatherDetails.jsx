import React from 'react';
import { Droplets, Wind, Sun, Eye } from 'lucide-react';

export function WeatherDetails({ details }) {
  const {
    humidity = 64,
    windSpeed = '14 km/h',
    windDirection = 'NW',
    uvIndex = '5 (Moderate)',
    visibility = '10 km'
  } = details || {};

  return (
    <div className="metrics-container">
      {/* Humidity Placeholder Card */}
      <div className="glass-panel metric-card">
        <div className="metric-card-header">
          <span>Humidity</span>
          <div className="metric-icon-box humidity-box">
            <Droplets size={20} />
          </div>
        </div>
        <div className="metric-value">{humidity}%</div>
        <div className="metric-progress-bar">
          <div
            className="metric-progress-fill"
            style={{ width: `${humidity}%`, background: 'var(--accent-cyan)' }}
          ></div>
        </div>
        <div className="metric-subtext">Comfortable range</div>
      </div>

      {/* Wind Speed Placeholder Card */}
      <div className="glass-panel metric-card">
        <div className="metric-card-header">
          <span>Wind Speed</span>
          <div className="metric-icon-box wind-box">
            <Wind size={20} />
          </div>
        </div>
        <div className="metric-value">{windSpeed}</div>
        <div className="metric-subtext">Direction: {windDirection}</div>
        <div className="metric-progress-bar">
          <div
            className="metric-progress-fill"
            style={{ width: '40%', background: 'var(--primary-accent)' }}
          ></div>
        </div>
      </div>

      {/* UV Index Placeholder Card */}
      <div className="glass-panel metric-card">
        <div className="metric-card-header">
          <span>UV Index</span>
          <div className="metric-icon-box uv-box">
            <Sun size={20} />
          </div>
        </div>
        <div className="metric-value">{uvIndex}</div>
        <div className="metric-subtext">Sun protection recommended</div>
        <div className="metric-progress-bar">
          <div
            className="metric-progress-fill"
            style={{ width: '50%', background: 'var(--accent-amber)' }}
          ></div>
        </div>
      </div>

      {/* Visibility Placeholder Card */}
      <div className="glass-panel metric-card">
        <div className="metric-card-header">
          <span>Visibility</span>
          <div className="metric-icon-box vis-box">
            <Eye size={20} />
          </div>
        </div>
        <div className="metric-value">{visibility}</div>
        <div className="metric-subtext">Clear view conditions</div>
        <div className="metric-progress-bar">
          <div
            className="metric-progress-fill"
            style={{ width: '90%', background: 'var(--accent-emerald)' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
