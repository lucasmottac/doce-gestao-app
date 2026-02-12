import React, { useEffect, useState } from 'react';
import { useAchievements } from '../context/AchievementsContext';
import { X, Cookie, PartyPopper } from 'lucide-react';

const AchievementNotification = () => {
    const { newUnlock, clearNewUnlock } = useAchievements();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (newUnlock) {
            setIsVisible(true);
            // triggerConfetti(); // Removed to fix build error
        }
    }, [newUnlock]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            clearNewUnlock();
        }, 300); // Wait for animation
    };

    // const triggerConfetti = () => { ... } // Removed

    if (!newUnlock) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose}></div>

            <div className="relative bg-[#1a1a1a] border border-yellow-500/30 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl shadow-yellow-500/20 animate-bounce-in">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white"
                >
                    <X size={24} />
                </button>

                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/40 relative">
                    <Cookie size={48} className="text-white animate-spin-slow" />
                    <div className="absolute -top-2 -right-2 bg-white text-orange-600 rounded-full p-2 border-2 border-orange-600 transform rotate-12">
                        <PartyPopper size={20} />
                    </div>
                </div>

                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">
                    Nova Conquista!
                </h2>
                <div className="text-yellow-400 font-bold text-lg mb-1">{newUnlock.title}</div>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                    {newUnlock.description}
                </p>

                <button
                    onClick={handleClose}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    Resgatar Cookie
                </button>
            </div>
        </div>
    );
};

export default AchievementNotification;
