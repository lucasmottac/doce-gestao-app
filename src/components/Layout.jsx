import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AchievementNotification from './AchievementNotification';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Pages where the back button should NOT appear
    const hideBackButtonRoutes = ['/dashboard', '/login', '/'];
    const showBackButton = !hideBackButtonRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen bg-background text-white pb-24">
            <AchievementNotification />
            <div className="max-w-md mx-auto min-h-screen flex flex-col">

                {/* Global Back Button Header */}
                {showBackButton && (
                    <div className="px-6 pt-6 -mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors text-white/80 active:scale-95"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    </div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 p-6 flex flex-col pt-8">
                    {children}
                </main>
            </div>
            <BottomNav />
        </div>
    );
};

export default Layout;
