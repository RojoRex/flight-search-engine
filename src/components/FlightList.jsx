import React from 'react';
import FlightCard from './FlightCard';

export default function FlightList({ flights, loading }) {
    if (loading) {
        return (
            <div className="flex flex-col gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="glass-panel h-32 animate-pulse bg-slate-800/50" />
                ))}
            </div>
        );
    }

    if (!flights || flights.length === 0) {
        return (
            <div className="text-center py-12 text-slate-400">
                <p className="text-lg">No flights found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {flights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    );
}
