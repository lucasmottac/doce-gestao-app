import AchievementNotification from './AchievementNotification';
import BottomNav from './BottomNav';

const Layout = ({ children, onBack }) => {
    // ... (existing code)

    return (
        <div className="min-h-screen bg-background text-white pb-24">
            <AchievementNotification />
            <div className="max-w-md mx-auto min-h-screen flex flex-col">

                {/* Global Back Button Header */}
                {/* ... */}

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
