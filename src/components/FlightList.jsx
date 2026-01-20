import React from 'react';
import FlightCard from './FlightCard';
import FlightCardSkeleton from './FlightCardSkeleton';

export default function FlightList({ flights, loading }) {
    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1, 2, 3].map(i => (
                    <FlightCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!flights || flights.length === 0) {
        return (
            <div className="glass-panel text-center py-12 px-6 flex flex-col items-center justify-center">
                <div className="bg-slate-800/50 p-4 rounded-full mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate-500"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Flights Found</h3>
                <p className="text-slate-400 max-w-sm mx-auto mb-6">
                    We couldn't find any flights matching your specific criteria. Try adjusting your filters or search for different dates.
                </p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {flights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    );
}
