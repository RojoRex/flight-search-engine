import React from 'react';
import { ShieldCheck, Clock, CreditCard, Heart } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
    const features = [
        {
            icon: <ShieldCheck size={24} />,
            title: "Trusted Security",
            desc: "Your data is protected with state-of-the-art encryption standards. Book with peace of mind."
        },
        {
            icon: <Clock size={24} />,
            title: "Real-time Updates",
            desc: "Get instant notifications on price drops and schedule changes directly to your device."
        },
        {
            icon: <CreditCard size={24} />,
            title: "Transparent Pricing",
            desc: "No hidden fees. The price you see is the price you pay, guaranteed."
        },
        {
            icon: <Heart size={24} />,
            title: "24/7 Support",
            desc: "Our dedicated team is here to help you around the clock, wherever you are in the world."
        }
    ];

    return (
        <footer className="footer-section">
            <div className="mb-10 text-center">
                <h2 className="text-2xl font-bold mb-2 text-white">Why Travelers Choose Us</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    We combine cutting-edge technology with human-centric design to make your journey seamless from start to finish.
                </p>
            </div>

            <div className="features-grid">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-icon-wrapper">
                            {feature.icon}
                        </div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-desc">{feature.desc}</p>
                    </div>
                ))}
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} AirFinder. All rights reserved.</p>
            </div>
        </footer>
    );
}
