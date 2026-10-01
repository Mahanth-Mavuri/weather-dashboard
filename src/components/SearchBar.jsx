import React, { useState } from 'react';
import { Search, MapPin, Loader2, History, Trash2 } from 'lucide-react';

export function SearchBar({ onSearch, isLoading, recentSearches = [], onClearHistory }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    } else {
      onSearch('');
    }
  };

  const popularCities = ['San Francisco', 'London', 'Tokyo', 'Sydney', 'New York'];

  return (
    <section className="glass-panel search-container" aria-label="City Search Section">
      <form onSubmit={handleSubmit} className="search-form" role="search">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" aria-hidden="true" />
          <input
            type="text"
            className="search-input"
            placeholder="Search city (e.g., Hyderabad, Tokyo, London)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            aria-label="Enter city name to search weather"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="search-btn"
          disabled={isLoading}
          aria-label={isLoading ? 'Searching weather...' : 'Submit city search'}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="spinner" aria-hidden="true" />
              Searching...
            </>
          ) : (
            <>
              <Search size={18} aria-hidden="true" />
              Search
            </>
          )}
        </button>
      </form>

      {/* Recent Searches Section */}
      {recentSearches.length > 0 && (
        <div className="quick-cities recent-cities-group">
          <div className="recent-cities-header">
            <span className="quick-cities-label" id="recent-cities-label">
              <History size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} aria-hidden="true" />
              Recent Searches:
            </span>
            <button
              type="button"
              className="clear-history-btn"
              onClick={onClearHistory}
              title="Clear search history"
              disabled={isLoading}
              aria-label="Clear all recent search history"
            >
              <Trash2 size={12} aria-hidden="true" /> Clear History
            </button>
          </div>
          <div className="chip-list" aria-labelledby="recent-cities-label">
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
                aria-label={`Search weather for ${city}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Cities Quick Chips */}
      <div className="quick-cities">
        <span className="quick-cities-label" id="popular-cities-label">Popular Cities:</span>
        <div className="chip-list" aria-labelledby="popular-cities-label">
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
              aria-label={`Search weather for popular city ${city}`}
            >
              <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} aria-hidden="true" />
              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
