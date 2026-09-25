import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from 'lucide-react';

/**
 * Maps WMO (World Meteorological Organization) weather codes to human-readable text and icons.
 * Reference: Open-Meteo WMO Weather interpretation codes
 */
export const WMO_CODE_MAP = {
  0: { description: 'Clear Sky', icon: Sun, color: '#f59e0b' },
  1: { description: 'Mainly Clear', icon: CloudSun, color: '#f59e0b' },
  2: { description: 'Partly Cloudy', icon: CloudSun, color: '#94a3b8' },
  3: { description: 'Overcast', icon: Cloud, color: '#64748b' },
  45: { description: 'Foggy', icon: CloudFog, color: '#94a3b8' },
  48: { description: 'Depositing Rime Fog', icon: CloudFog, color: '#94a3b8' },
  51: { description: 'Light Drizzle', icon: CloudDrizzle, color: '#38bdf8' },
  53: { description: 'Moderate Drizzle', icon: CloudDrizzle, color: '#38bdf8' },
  55: { description: 'Dense Drizzle', icon: CloudDrizzle, color: '#38bdf8' },
  56: { description: 'Light Freezing Drizzle', icon: CloudSnow, color: '#cbd5e1' },
  57: { description: 'Dense Freezing Drizzle', icon: CloudSnow, color: '#cbd5e1' },
  61: { description: 'Slight Rain', icon: CloudRain, color: '#38bdf8' },
  63: { description: 'Moderate Rain', icon: CloudRain, color: '#0284c7' },
  65: { description: 'Heavy Rain', icon: CloudRain, color: '#0284c7' },
  66: { description: 'Light Freezing Rain', icon: CloudSnow, color: '#cbd5e1' },
  67: { description: 'Heavy Freezing Rain', icon: CloudSnow, color: '#cbd5e1' },
  71: { description: 'Slight Snow Fall', icon: CloudSnow, color: '#e2e8f0' },
  73: { description: 'Moderate Snow Fall', icon: CloudSnow, color: '#e2e8f0' },
  75: { description: 'Heavy Snow Fall', icon: CloudSnow, color: '#e2e8f0' },
  77: { description: 'Snow Grains', icon: CloudSnow, color: '#e2e8f0' },
  80: { description: 'Slight Rain Showers', icon: CloudRain, color: '#38bdf8' },
  81: { description: 'Moderate Rain Showers', icon: CloudRain, color: '#0284c7' },
  82: { description: 'Violent Rain Showers', icon: CloudRain, color: '#0284c7' },
  85: { description: 'Slight Snow Showers', icon: CloudSnow, color: '#e2e8f0' },
  86: { description: 'Heavy Snow Showers', icon: CloudSnow, color: '#e2e8f0' },
  95: { description: 'Thunderstorm', icon: CloudLightning, color: '#a855f7' },
  96: { description: 'Thunderstorm with Slight Hail', icon: CloudLightning, color: '#a855f7' },
  99: { description: 'Thunderstorm with Heavy Hail', icon: CloudLightning, color: '#a855f7' },
};

export function getWeatherInfo(wmoCode) {
  return WMO_CODE_MAP[wmoCode] || {
    description: 'Unknown Condition',
    icon: CloudSun,
    color: '#94a3b8',
  };
}
