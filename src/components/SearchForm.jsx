import React, { useState } from 'react';
import { Search } from 'lucide-react';
import AutocompleteInput from './AutocompleteInput';
import '../styles/SearchForm.css';

export default function SearchForm({ onSearch, loading }) {
    const [origin, setOrigin] = useState('JFK');
    const [destination, setDestination] = useState('LHR');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

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
            />

            <AutocompleteInput
                label="To"
                value={destination}
                onChange={setDestination}
                placeholder="City or Airport"
            />

            <div className="form-group">
                <label className="form-label">Departure</label>
                <div className="relative">
                    <input
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
