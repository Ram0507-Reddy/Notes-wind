
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, Play } from 'lucide-react';

const InterstitialAd = ({ onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(5);
    const [canSkip, setCanSkip] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanSkip(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
        >
            <div className="w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl relative">

                {/* Header / Timer */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sponsored</span>

                    {canSkip ? (
                        <button
                            onClick={onComplete}
                            className="flex items-center gap-2 px-4 py-1.5 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-colors animate-pulse"
                        >
                            Skip to Content <Play className="w-3 h-3 fill-current" />
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Skip in {timeLeft}s
                        </div>
                    )}
                </div>

                {/* Ad Content Placeholder */}
                <div className="h-[300px] bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white p-8 text-center relative overflow-hidden">
                    {/* Decorative Circles */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>

                    <h2 className="text-3xl font-black mb-4 relative z-10">Unlock Your Coding Potential!</h2>
                    <p className="text-white/90 mb-8 relative z-10">Master Full-Stack Development with 50% OFF Pro Courses.</p>
                    <button className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg shadow-lg hover:scale-105 transition-transform relative z-10">
                        Claim Offer
                    </button>

                    <div className="absolute bottom-2 right-2 text-[8px] opacity-40">Ad Choice &gt;</div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 text-center">
                    <p className="text-xs text-gray-400">
                        Your content is loading in the background...
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default InterstitialAd;
