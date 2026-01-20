import React from 'react';
import { Filter, DollarSign, Clock } from 'lucide-react';
import '../styles/FilterBar.css';

export default function FilterBar({ filters, setFilters, maxPriceAvailable, airlines }) {
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

    return (
        <div className="filter-sidebar">
            <div className="flex items-center gap-2 mb-6 text-indigo-400">
                <Filter size={18} />
                <span className="font-semibold uppercase tracking-wider text-xs">Filters</span>
            </div>

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
                                    checked={filters.airlines.length === 0 || filters.airlines.includes(airline)}
                                    onChange={() => handleAirlineChange(airline)}
                                />
                                <div className="custom-checkbox">
                                    {(filters.airlines.length === 0 || filters.airlines.includes(airline)) &&
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
