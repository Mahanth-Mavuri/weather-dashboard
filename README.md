# Weather Dashboard 🌤️

A responsive weather dashboard built with **React** and the **Open-Meteo API**.

The application allows users to search for cities and view current weather conditions, a 5-day forecast, detailed weather information, and recent search history.

## 🌐 Live Demo

[🚀 View Live Demo](https://weather-dashboard-lemon-theta.vercel.app/)

## 💻 GitHub Repository

[📂 View Source Code](https://github.com/Mahanth-Mavuri/weather-dashboard)

---

## ✨ Features

- 🔍 Search weather by city
- 🌡️ Current weather information
- 📅 5-day weather forecast
- 💧 Temperature, humidity, and wind information
- 🌤️ Weather condition icons
- 🕘 Recent city search history
- ⏳ Loading state
- ⚠️ Error handling
- 📱 Responsive design for desktop, tablet, and mobile
- 💾 Search history stored using LocalStorage

---

## 🛠️ Tech Stack

### Frontend

- **React.js** — User interface
- **JavaScript** — Application logic
- **Vite** — Development and build tool
- **CSS** — Responsive styling

### APIs & Libraries

- **Open-Meteo API** — Weather and forecast data
- **Lucide Icons** — Weather and UI icons
- **LocalStorage** — Recent search history

### Tools

- **Git**
- **GitHub**
- **Vercel**

---

## 🏗️ How It Works

```text
┌──────────────────────────────────────────────┐
│                  User                        │
│          Searches for a city                 │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│             Open-Meteo Geocoding             │
│       Finds city latitude & longitude        │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              Open-Meteo Forecast             │
│     Retrieves current & forecast weather     │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              React Dashboard                 │
│  Temperature • Humidity • Wind • Forecast   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                 LocalStorage                 │
│           Saves recent searches              │
└──────────────────────────────────────────────┘
