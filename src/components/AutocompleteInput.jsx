import React, { useState, useEffect, useRef } from 'react';
import { searchLocations } from '../services/amadeus';
import '../styles/Autocomplete.css';

export default function AutocompleteInput({ label, value, onChange, placeholder, inputRef, onSelectionComplete, defaultOptions = [] }) {
    const [query, setQuery] = useState(value);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2 && showSuggestions) {
                try {
                    const results = await searchLocations(query);
                    setSuggestions(results);
                } catch (error) {
                    console.error("Search failed", error);
                    setSuggestions([]);
                }
            } else if (showSuggestions && query.length === 0) {
                 setSuggestions(defaultOptions);
            } else {
                setSuggestions([]);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [query, showSuggestions, defaultOptions]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        setQuery(`${item.cityName} (${item.iataCode})`);
        onChange(item.iataCode); // Pass back only the IATA code to parent
        setShowSuggestions(false);
        if (onSelectionComplete) {
            onSelectionComplete();
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        setShowSuggestions(true);
        // If user clears input, clear parent value too
        if (e.target.value === '') onChange('');
    };

    const handleFocus = () => {
        setShowSuggestions(true);
        if (query.length === 0 && defaultOptions.length > 0) {
            setSuggestions(defaultOptions);
        }
    };

    return (
        <div className="form-group" ref={wrapperRef}>
            <label className="form-label">{label}</label>
            <div className="autocomplete-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    className="form-input"
                    value={query} // show friendly name
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                />

                {showSuggestions && suggestions.length > 0 && (
                    <div className="suggestions-list">
                        {suggestions.map((item, index) => (
                            <div key={index} className="suggestion-item" onClick={() => handleSelect(item)}>
                                <div className="suggestion-main">
                                    <span className="suggestion-city">{item.cityName}, {item.countryName}</span>
                                    <span className="suggestion-sub">{item.name}</span>
                                </div>
                                <span className="suggestion-code">{item.iataCode}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
