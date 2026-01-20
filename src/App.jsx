import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import FilterBar from './components/FilterBar';
import FlightList from './components/FlightList';
import PriceGraph from './components/PriceGraph';
import Footer from './components/Footer';
import { searchFlightsAmadeus } from './services/amadeus';
import './App.css';

function App() {
  const [allFlights, setAllFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const [filters, setFilters] = useState({
    stops: [0, 1, 2],
    maxPrice: 2000,
    airlines: []
  });

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setSearched(true);
    try {
      const results = await searchFlightsAmadeus(searchParams);
      setAllFlights(results);

      // Reset max price based on new results
      const maxP = Math.max(...results.map(f => f.price), 1000);
      setFilters(prev => ({
        ...prev,
        maxPrice: Math.ceil(maxP + 100),
        airlines: [] // Reset airline filters on new search
      }));
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFlights = useMemo(() => {
    return allFlights.filter(flight => {
      // Filter by stops
      if (!filters.stops.includes(flight.stops)) return false;

      // Filter by price
      if (flight.price > filters.maxPrice) return false;

      // Filter by airline
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false;

      return true;
    });
  }, [allFlights, filters]);

  // Extract metadata for filters
  const availableAirlines = useMemo(() => {
    return [...new Set(allFlights.map(f => f.airline))].sort();
  }, [allFlights]);

  const maxPriceAvailable = useMemo(() => {
    return allFlights.length > 0 ? Math.max(...allFlights.map(f => f.price)) : 1000;
  }, [allFlights]);

  return (
    <div className="app-wrapper">
      <Header />

      <div className="container app-layout">
        <SearchForm onSearch={handleSearch} loading={loading} />

        {searched && (
          <div className="main-content">
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              maxPriceAvailable={Math.ceil(maxPriceAvailable)}
              airlines={availableAirlines}
            />

            <div className="results-column">
              <PriceGraph flights={filteredFlights} />
              <FlightList flights={filteredFlights} loading={loading} />
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
