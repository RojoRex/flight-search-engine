import React from 'react';
import { format } from 'date-fns';
import '../styles/FlightCard.css';

export default function FlightCard({ flight }) {
    const formatTime = (isoString) => format(new Date(isoString), 'HH:mm');

    const durationStr = `${Math.floor(flight.durationMinutes / 60)}h ${flight.durationMinutes % 60}m`;

    return (
        <div className="flight-card glass-panel">
            <div className="airline-section">
                <div className="airline-logo">
                    {flight.airlineCode}
                </div>
                <div className="mt-2 text-xs text-slate-400 font-medium text-center">{flight.airline}</div>
            </div>

            <div className="flight-info">
                <div className="route-info">
                    <div className="time-loc">
                        <span className="time">{formatTime(flight.departureTime)}</span>
                        <span className="airport">{flight.origin}</span>
                    </div>

                    <div className="duration-stops">
                        <span className="duration-text">{durationStr}</span>
                        <div className="duration-line"></div>
                        <span className="duration-text text-indigo-300">
                            {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                        </span>
                    </div>

                    <div className="time-loc" style={{ textAlign: 'right' }}>
                        <span className="time">{formatTime(flight.arrivalTime)}</span>
                        <span className="airport">{flight.destination}</span>
                    </div>
                </div>
            </div>

            <div className="price-section">
                <div className="price">${flight.price}</div>
                <button className="select-btn">Select</button>
            </div>
        </div>
    );
}
