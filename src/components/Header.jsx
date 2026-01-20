import React from 'react';
import { Plane, Menu, Grid, Bell, Globe, Hotel, Map, Compass } from 'lucide-react';
import '../styles/Header.css';

export default function Header() {
    return (
        <header className="header-container">
            <div className="header-left">
                <button className="menu-trigger" aria-label="Menu">
                    <Menu size={24} />
                </button>
                <a href="/" className="logo-link">
                    <span className="logo-brand">Air<span className="logo-finder">Finder</span></span>
                </a>
            </div>

            <nav className="header-center">
                <a href="#" className="nav-tab"><Compass size={18} /><span>Travel</span></a>
                <a href="#" className="nav-tab"><Globe size={18} /><span>Explore</span></a>
                <a href="#" className="nav-tab active"><Plane size={18} /><span>Flights</span></a>
                <a href="#" className="nav-tab"><Hotel size={18} /><span>Hotels</span></a>
                <a href="#" className="nav-tab"><Map size={18} /><span>Tracked prices</span></a>
            </nav>

            <div className="header-right">
                <button className="icon-btn" title="Notifications">
                    <Bell size={20} />
                </button>
                <button className="icon-btn" title="Apps">
                    <Grid size={20} />
                </button>
                <div className="profile-circle" title="Google Account"></div>
            </div>
        </header>
    );
}
