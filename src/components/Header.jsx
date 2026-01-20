import React from 'react';
import { Plane, Bell, Menu } from 'lucide-react';
import '../styles/Header.css';

export default function Header() {
    return (
        <header className="header-container">
            <a href="#" className="logo-wrapper">
                <div className="logo-icon">
                    <Plane className="text-white w-6 h-6" fill="currentColor" />
                </div>
                <span className="logo-text">
                    Air<span style={{ color: 'var(--color-primary)' }}>Finder</span>
                </span>
            </a>

            <nav className="main-nav">
                <a href="#" className="nav-link active">Explore</a>
                <a href="#" className="nav-link">Flights</a>
                <a href="#" className="nav-link">Hotels</a>
                <a href="#" className="nav-link">Packages</a>
            </nav>

            <div className="header-actions">
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    <Bell size={20} />
                </button>
                <button className="btn-secondary hidden sm:block">My Trips</button>
                <div className="user-avatar" title="User Profile"></div>
                <button className="md:hidden text-slate-300">
                    <Menu size={24} />
                </button>
            </div>
        </header>
    );
}
