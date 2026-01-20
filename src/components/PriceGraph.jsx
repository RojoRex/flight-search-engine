import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { format } from 'date-fns';
import PriceGraphSkeleton from './PriceGraphSkeleton';
import '../styles/PriceGraph.css';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="glass-panel p-3 text-xs border border-slate-700 shadow-xl" style={{ backgroundColor: 'rgba(32, 33, 36, 0.95)' }}>
                <p className="font-bold text-white mb-1">{format(new Date(data.departureTime), 'hh:mm a')}</p>
                <p className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>${data.price}</p>
                <p className="text-slate-400 mt-1">{data.airline}</p>
                <p className="text-slate-500">{Math.floor(data.durationMinutes / 60)}h {data.durationMinutes % 60}m</p>
            </div>
        );
    }
    return null;
};

export default function PriceGraph({ flights, loading }) {
    if (loading) return <PriceGraphSkeleton />;
    if (!flights || flights.length === 0) return null;

    // Process data for the line graph: Sort by departure time
    const graphData = useMemo(() => {
        return [...flights]
            .sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime))
            .map(f => ({
                ...f,
                timeLabel: format(new Date(f.departureTime), 'HH:mm'),
                timestamp: new Date(f.departureTime).getTime()
            }));
    }, [flights]);

    return (
        <div className="glass-panel graph-container">
            <div className="graph-title">Price Trend (by Departure Time)</div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={graphData}
                    margin={{ top: 50, right: 30, bottom: 20, left: 10 }}
                >
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3c4043" opacity={0.3} vertical={false} />
                    <XAxis
                        dataKey="timeLabel"
                        tick={{ fill: '#9aa0a6', fontSize: 11 }}
                        tickLine={false}
                        axisLine={{ stroke: '#3c4043' }}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tick={{ fill: '#9aa0a6', fontSize: 11 }}
                        tickLine={false}
                        axisLine={{ stroke: '#3c4043' }}
                        unit="$"
                        width={40}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke="var(--color-primary)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
