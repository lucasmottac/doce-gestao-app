import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import BottomNav from './BottomNav';

const Layout = ({ children, onBack }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Pages that should NOT show the back button
    const noBackBtnRoutes = ['/login', '/dashboard', '/'];
    const showBackBtn = !noBackBtnRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen bg-background text-white pb-24">
            <div className="max-w-md mx-auto min-h-screen flex flex-col">

                {/* Global Back Button Header */}
                {showBackBtn && (
                    <div className="fixed top-0 left-0 w-full z-50 p-6 pointer-events-none max-w-md mx-auto left-0 right-0">
                        <button
                            onClick={() => onBack ? onBack() : navigate(-1)}
                            className="pointer-events-auto flex items-center gap-1 text-white/60 hover:text-white bg-black/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/5 transition-all active:scale-95"
                        >
                            <ChevronLeft size={20} />
                            <span className="text-xs font-medium">Voltar</span>
                        </button>
                    </div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 p-6 flex flex-col pt-12">
                    {children}
                </main>
            </div>
            <BottomNav />
        </div>
    );
};

export default Layout;
