
import React from 'react';

const AdBanner = ({ variant = 'leaderboard', className = '' }) => {
    // Standard IAB sizes
    // Standard IAB sizes with Responsive classes
    const sizes = {
        leaderboard: 'h-[50px] md:h-[90px] w-full max-w-[320px] md:max-w-[728px]', // Mobile Banner -> Leaderboard
        rectangle: 'h-[250px] w-[300px]',
        sidebar: 'hidden md:flex h-[600px] w-[160px]' // Hide skyscraper on mobile
    };

    return (
        <div className={`flex flex-col items-center justify-center my-6 ${className}`}>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Advertisement</div>
            <div className={`${sizes[variant] || sizes.leaderboard} bg-gray-100 border border-gray-200 border-dashed rounded flex flex-col items-center justify-center relative overflow-hidden group hover:bg-gray-50 transition-colors`}>

                {/* Placeholder Visuals (Mock Ad) */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-400 to-transparent"></div>

                <span className="font-semibold text-gray-400 z-10 text-[10px] md:text-base">Google Ad Space</span>
                <span className="text-[8px] md:text-xs text-gray-300 z-10">{variant === 'rectangle' ? '300x250' : 'Responsive'}</span>

                {/* Hover Effect to simulate clickable ad */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-[9px] rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More
                </div>
            </div>
        </div>
    );
};

export default AdBanner;
