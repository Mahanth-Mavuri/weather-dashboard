import React from 'react';
import { Droplets, Wind, Sun, Gauge } from 'lucide-react';

export function WeatherDetails({ details }) {
  const {
    humidity = 64,
    windSpeed = '14 km/h',
    windDirection = 'NW',
    uvIndex = 'Moderate',
    visibility = '1013 hPa'
  } = details || {};

  return (
    <section className="metrics-container" aria-label="Detailed Weather Metrics">
      {/* Humidity Card */}
      <div className="glass-panel metric-card" aria-label={`Humidity: ${humidity} percent`}>
        <div className="metric-card-header">
          <span>Humidity</span>
          <div className="metric-icon-box humidity-box" aria-hidden="true">
            <Droplets size={20} />
          </div>
        </div>
        <div className="metric-value">{humidity}%</div>
        <div className="metric-progress-bar" role="progressbar" aria-valuenow={humidity} aria-valuemin="0" aria-valuemax="100">
          <div
            className="metric-progress-fill"
            style={{ width: `${Math.min(100, Math.max(0, humidity))}%`, background: 'var(--accent-cyan)' }}
          ></div>
        </div>
        <div className="metric-subtext">Comfort level indicator</div>
      </div>

      {/* Wind Speed Card */}
      <div className="glass-panel metric-card" aria-label={`Wind speed: ${windSpeed}, direction ${windDirection}`}>
        <div className="metric-card-header">
          <span>Wind Speed</span>
          <div className="metric-icon-box wind-box" aria-hidden="true">
            <Wind size={20} />
          </div>
        </div>
        <div className="metric-value">{windSpeed}</div>
        <div className="metric-subtext">Direction: {windDirection}</div>
        <div className="metric-progress-bar" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
          <div
            className="metric-progress-fill"
            style={{ width: '45%', background: 'var(--primary-accent)' }}
          ></div>
        </div>
      </div>

      {/* UV / Solar Radiation Card */}
      <div className="glass-panel metric-card" aria-label={`UV Index: ${uvIndex}`}>
        <div className="metric-card-header">
          <span>UV Outlook</span>
          <div className="metric-icon-box uv-box" aria-hidden="true">
            <Sun size={20} />
          </div>
        </div>
        <div className="metric-value">{uvIndex}</div>
        <div className="metric-subtext">Sun protection status</div>
        <div className="metric-progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
          <div
            className="metric-progress-fill"
            style={{ width: '50%', background: 'var(--accent-amber)' }}
          ></div>
        </div>
      </div>

      {/* Surface Pressure Card */}
      <div className="glass-panel metric-card" aria-label={`Surface Pressure: ${visibility}`}>
        <div className="metric-card-header">
          <span>Air Pressure</span>
          <div className="metric-icon-box vis-box" aria-hidden="true">
            <Gauge size={20} />
          </div>
        </div>
        <div className="metric-value">{visibility}</div>
        <div className="metric-subtext">Barometric pressure</div>
        <div className="metric-progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
          <div
            className="metric-progress-fill"
            style={{ width: '85%', background: 'var(--accent-emerald)' }}
          ></div>
        </div>
      </div>
    </section>
  );
}
