import React, { useState } from 'react';
import { Search, MapPin, Loader2, History, Trash2 } from 'lucide-react';

export function SearchBar({ onSearch, isLoading, recentSearches = [], onClearHistory }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
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
            placeholder="Search city (e.g., Hyderabad, Tokyo, London)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="search-btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 size={18} className="spinner" />
              Searching...
            </>
          ) : (
            <>
              <Search size={18} />
              Search
            </>
          )}
        </button>
      </form>

      {/* Recent Searches Section */}
      {recentSearches.length > 0 && (
        <div className="quick-cities recent-cities-group">
          <div className="recent-cities-header">
            <span className="quick-cities-label">
              <History size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              Recent Searches:
            </span>
            <button
              type="button"
              className="clear-history-btn"
              onClick={onClearHistory}
              title="Clear search history"
              disabled={isLoading}
            >
              <Trash2 size={12} /> Clear History
            </button>
          </div>
          <div className="chip-list">
            {recentSearches.map((city) => (
              <button
                key={city}
                type="button"
                className="city-chip recent-chip"
                disabled={isLoading}
                onClick={() => {
                  setQuery(city);
                  onSearch(city);
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Cities Quick Chips */}
      <div className="quick-cities">
        <span className="quick-cities-label">Popular Cities:</span>
        <div className="chip-list">
          {popularCities.map((city) => (
            <button
              key={city}
              type="button"
              className="city-chip"
              disabled={isLoading}
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
    </div>
  );
}
