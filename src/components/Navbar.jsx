import React from 'react';
import { CloudSun, Sparkles } from 'lucide-react';

export function Navbar() {
  return (
    <header className="glass-panel navbar">
      <div className="brand-container">
        <div className="brand-logo">
          <CloudSun size={26} />
        </div>
        <div>
          <h1 className="brand-title">SkyPulse</h1>
          <p className="brand-subtitle">Modern Weather Dashboard</p>
        </div>
      </div>

      <div className="nav-actions">
        <span className="badge-tag">
          <Sparkles size={14} /> UI Demo (Mock Data)
        </span>
      </div>
    </header>
  );
}
