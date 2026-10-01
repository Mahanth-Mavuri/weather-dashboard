import React from 'react';
import { CloudSun, Sparkles } from 'lucide-react';

export function Navbar() {
  return (
    <header className="glass-panel navbar" role="banner">
      <div className="brand-container">
        <div className="brand-logo" aria-hidden="true">
          <CloudSun size={26} />
        </div>
        <div>
          <h1 className="brand-title">SkyPulse</h1>
          <p className="brand-subtitle">Live Weather Dashboard</p>
        </div>
      </div>

      <div className="nav-actions">
        <span className="badge-tag" aria-label="Status: Live Open-Meteo Data">
          <Sparkles size={14} aria-hidden="true" /> Live Open-Meteo API
        </span>
      </div>
    </header>
  );
}
