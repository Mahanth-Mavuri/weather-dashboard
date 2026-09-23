import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export function SearchBar({ onSearch, currentCity }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const popularCities = ['San Francisco', 'London', 'Tokyo', 'Sydney', 'New York'];

  return (
    <div className="glass-panel search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search city (e.g., London, Tokyo, New York)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="search-btn">
          <Search size={18} />
          Search
        </button>
      </form>

      <div className="quick-cities">
        <span className="quick-cities-label">Popular Cities:</span>
        {popularCities.map((city) => (
          <button
            key={city}
            type="button"
            className="city-chip"
            onClick={() => {
              setQuery(city);
              onSearch(city);
            }}
          >
            <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
