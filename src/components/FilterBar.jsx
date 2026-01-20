import React from 'react';
import { Filter, DollarSign, Clock, X } from 'lucide-react';
import '../styles/FilterBar.css';

export default function FilterBar({ filters, setFilters, maxPriceAvailable, airlines }) {

    // Helper to determine if a filter is active
    const activeStops = filters.stops.length < 3;
    const isPriceActive = filters.maxPrice < (maxPriceAvailable || 1000);
    const activeAirlines = filters.airlines.length > 0;

    const hasActiveFilters = activeStops || isPriceActive || activeAirlines;

    const handleStopChange = (stopCount) => {
        const currentStops = filters.stops;
        const newStops = currentStops.includes(stopCount)
            ? currentStops.filter(s => s !== stopCount)
            : [...currentStops, stopCount];

        setFilters({ ...filters, stops: newStops });
    };

    const handleAirlineChange = (airlineName) => {
        const currentAirlines = filters.airlines;
        const newAirlines = currentAirlines.includes(airlineName)
            ? currentAirlines.filter(a => a !== airlineName)
            : [...currentAirlines, airlineName];

        setFilters({ ...filters, airlines: newAirlines });
    };

    const clearFilter = (type, value) => {
        if (type === 'price') {
            setFilters({ ...filters, maxPrice: maxPriceAvailable || 1000 });
        } else if (type === 'stop') {
            // Removing a "stop" filter implies enabling it? No, chips usually show what is "On".
            // Actually, if I have "Non-stop" selected (and others unselected), clicking 'x' should probably reset stops to all?
            // Or if I have "Non-stop" valid, cleaning it means... removing it?
            // User Request: "Active filter chips (Non-stop ×)". This usually means "Non-stop is allowed".
            // If I click X, it means "Remove Non-stop restriction"? Or "Remove Non-stop from allowed list"?
            // If "Non-stop" is the only thing selected, and I click X, I likely want to return to "All".
            // Let's implement simpler: "Clear All" clears everything. 
            // Chips: if logic is "Show what is SELECTED/ALLOWED".
            // If [0] is selected. Chip says "Non-stop". Clicking X -> should it remove 0 from allowed? Then we have [] (nothing allowed). That's bad.
            // Usually filters are additive or subtractive. Here they are Allow Lists.
            // If I have [0], clicking X on "Non-stop" would arguably remove it, leaving empty. 
            // Maybe these chips just act as "Reset this specific filter category" or "Remove this specific selection".
            // Let's stick to "Clear All" for the big button.
            // For chips:
            // If I click X on "Non-stop", I uncheck it.
            handleStopChange(value);
        } else if (type === 'airline') {
            handleAirlineChange(value);
        }
    };

    const resetFiles = () => {
        setFilters({
            stops: [0, 1, 2],
            maxPrice: maxPriceAvailable || 1000,
            airlines: []
        });
    };

    return (
        <div className="filter-sidebar">
            <div className="flex items-center justify-between mb-6 text-indigo-400">
                <div className="flex items-center gap-2">
                    <Filter size={18} />
                    <span className="font-semibold uppercase tracking-wider text-xs">Filters</span>
                </div>
                {hasActiveFilters && (
                    <button onClick={resetFiles} className="text-xs hover:text-white transition-colors">
                        Clear all
                    </button>
                )}
            </div>

            {/* Active Filter Chips */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {activeStops && filters.stops.map(stop => (
                        <div key={stop} className="glass-panel px-2 py-1 flex items-center gap-1 text-xs text-indigo-200">
                            <span>{stop === 0 ? 'Non-stop' : `${stop} Stop${stop > 1 ? 's' : ''}`}</span>
                            <button onClick={() => clearFilter('stop', stop)} className="hover:text-white"><X size={12} /></button>
                        </div>
                    ))}
                    {isPriceActive && (
                        <div className="glass-panel px-2 py-1 flex items-center gap-1 text-xs text-indigo-200">
                            <span>&lt; ${filters.maxPrice}</span>
                            <button onClick={() => clearFilter('price')} className="hover:text-white"><X size={12} /></button>
                        </div>
                    )}
                    {activeAirlines && filters.airlines.map(airline => (
                        <div key={airline} className="glass-panel px-2 py-1 flex items-center gap-1 text-xs text-indigo-200">
                            <span>{airline}</span>
                            <button onClick={() => clearFilter('airline', airline)} className="hover:text-white"><X size={12} /></button>
                        </div>
                    ))}
                </div>
            )}

            <div className="filter-section">
                <div className="filter-title">
                    <Clock size={16} /> Stops
                </div>
                <div className="checkbox-group">
                    {[0, 1, 2].map(stop => (
                        <label key={stop} className="checkbox-label">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={filters.stops.includes(stop)}
                                onChange={() => handleStopChange(stop)}
                            />
                            <div className="custom-checkbox">
                                {filters.stops.includes(stop) && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            {stop === 0 ? 'Non-stop' : `${stop} Stop${stop > 1 ? 's' : ''}`}
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <div className="filter-title">
                    <DollarSign size={16} /> Max Price: ${filters.maxPrice}
                </div>
                <input
                    type="range"
                    min="100"
                    max={maxPriceAvailable || 1000}
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                    className="range-input"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>$100</span>
                    <span>${maxPriceAvailable || 1000}</span>
                </div>
            </div>

            {airlines.length > 0 && (
                <div className="filter-section">
                    <div className="filter-title">Airlines</div>
                    <div className="checkbox-group">
                        {airlines.map(airline => (
                            <label key={airline} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={filters.airlines.includes(airline)}
                                    onChange={() => handleAirlineChange(airline)}
                                />
                                <div className="custom-checkbox">
                                    {filters.airlines.includes(airline) &&
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    }
                                </div>
                                {airline}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
