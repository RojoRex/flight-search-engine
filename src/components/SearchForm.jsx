import React, { useState } from 'react';
import { Search } from 'lucide-react';
import AutocompleteInput from './AutocompleteInput';
import '../styles/SearchForm.css';

const RECENT_SEARCHES = [
    { cityName: "San Francisco", countryName: "United States", name: "San Francisco Intl", iataCode: "SFO" },
    { cityName: "New York", countryName: "United States", name: "John F. Kennedy", iataCode: "JFK" },
    { cityName: "London", countryName: "United Kingdom", name: "Heathrow", iataCode: "LHR" },
];

const POPULAR_DESTINATIONS = [
    { cityName: "Tokyo", countryName: "Japan", name: "Haneda", iataCode: "HND" },
    { cityName: "Paris", countryName: "France", name: "Charles de Gaulle", iataCode: "CDG" },
    { cityName: "Dubai", countryName: "UAE", name: "Dubai Intl", iataCode: "DXB" },
    { cityName: "Singapore", countryName: "Singapore", name: "Changi", iataCode: "SIN" },
];

export default function SearchForm({ onSearch, loading }) {
    const [origin, setOrigin] = useState('JFK');
    const [destination, setDestination] = useState('LHR');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const destinationRef = React.useRef(null);
    const dateRef = React.useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ origin, destination, date });
    };

    return (
        <form className="search-form glass-panel" onSubmit={handleSubmit}>
            <AutocompleteInput
                label="From"
                value={origin}
                onChange={setOrigin}
                placeholder="City or Airport"
                onSelectionComplete={() => destinationRef.current?.focus()}
                defaultOptions={RECENT_SEARCHES}
            />

            <AutocompleteInput
                label="To"
                value={destination}
                onChange={setDestination}
                placeholder="City or Airport"
                inputRef={destinationRef}
                onSelectionComplete={() => dateRef.current?.showPicker ? dateRef.current.showPicker() : dateRef.current?.focus()}
                defaultOptions={POPULAR_DESTINATIONS}
            />

            <div className="form-group">
                <label className="form-label">Departure</label>
                <div className="relative">
                    <input
                        ref={dateRef}
                        type="date"
                        className="form-input"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>

            <button type="submit" className="btn-primary search-btn" disabled={loading}>
                {loading ? 'Searching...' : (
                    <>
                        <Search size={20} />
                        Search Flights
                    </>
                )}
            </button>
        </form>
    );
}
