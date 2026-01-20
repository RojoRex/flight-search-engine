import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';
import '../styles/PriceGraph.css';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="glass-panel p-2 text-xs border border-slate-700 shadow-xl" style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)' }}>
                <p className="font-bold text-white mb-1">{data.airline}</p>
                <p className="text-slate-300">Price: <span className="text-indigo-400 font-bold">${data.price}</span></p>
                <p className="text-slate-300">Duration: {Math.floor(data.durationMinutes / 60)}h {data.durationMinutes % 60}m</p>
            </div>
        );
    }
    return null;
};

export default function PriceGraph({ flights }) {
    if (!flights || flights.length === 0) return null;

    return (
        <div className="glass-panel graph-container">
            <div className="graph-title">Price vs Duration</div>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <XAxis
                        type="number"
                        dataKey="durationMinutes"
                        name="Duration"
                        unit="m"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: '#334155' }}
                        label={{ value: 'Duration (min)', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }}
                    />
                    <YAxis
                        type="number"
                        dataKey="price"
                        name="Price"
                        unit="$"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: '#334155' }}
                    />
                    <ZAxis type="number" range={[50, 400]} />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Flights" data={flights} fill="#6366f1">
                        {flights.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.stops === 0 ? '#38bdf8' : '#6366f1'} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}
