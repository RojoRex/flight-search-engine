import React from 'react';
import '../styles/PriceGraph.css';

export default function PriceGraphSkeleton() {
    return (
        <div className="glass-panel graph-container animate-pulse">
            <div className="skeleton-text" style={{ width: 220, height: 24, marginBottom: 20 }}></div>
            <div className="skeleton" style={{ width: '100%', height: 300, borderRadius: 12 }}></div>
        </div>
    );
}
