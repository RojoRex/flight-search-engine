import React from 'react';
import '../styles/FlightCard.css';

export default function FlightCardSkeleton() {
    return (
        <div className="flight-card glass-panel animate-pulse">
            <div className="airline-section">
                <div className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%' }}></div>
                <div className="skeleton-text" style={{ width: 60, marginTop: 12, height: 12 }}></div>
            </div>

            <div className="flight-info">
                <div className="route-info">
                    <div className="time-loc">
                        <div className="skeleton-text" style={{ width: 60, height: 24 }}></div>
                        <div className="skeleton-text" style={{ width: 40, height: 16 }}></div>
                    </div>

                    <div className="duration-stops" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <div className="skeleton-text" style={{ width: 60, height: 14 }}></div>
                        <div className="skeleton" style={{ width: '80%', height: 2, margin: '8px 0' }}></div>
                        <div className="skeleton-text" style={{ width: 50, height: 14 }}></div>
                    </div>

                    <div className="time-loc" style={{ textAlign: 'right', alignItems: 'flex-end' }}>
                        <div className="skeleton-text" style={{ width: 60, height: 24 }}></div>
                        <div className="skeleton-text" style={{ width: 40, height: 16 }}></div>
                    </div>
                </div>
            </div>

            <div className="price-section">
                <div className="skeleton-text" style={{ width: 80, height: 32 }}></div>
                <div className="skeleton" style={{ width: 100, height: 40, borderRadius: '16px' }}></div>
            </div>
        </div>
    );
}
