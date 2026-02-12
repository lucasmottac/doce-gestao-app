import { Home, ChefHat, Calculator, BookOpen, User, Trophy, DollarSign } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Home', path: '/dashboard' },
        { icon: ChefHat, label: 'Receitas', path: '/recipes' },
        { icon: BookOpen, label: 'Outras', path: '/other-recipes' },
        { icon: DollarSign, label: 'Vendas', path: '/financials' },
        { icon: Calculator, label: 'Calc', path: '/calculator' },
        { icon: Trophy, label: 'Conquistas', path: '/achievements' },
        { icon: User, label: 'Perfil', path: '/profile' },
    ];

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[420px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full py-3 px-6 shadow-2xl shadow-black/50 z-50 flex justify-between items-center ring-1 ring-white/5">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-white/40 hover:text-white/70'
                            }`}
                    >
                        {isActive && (
                            <span className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse"></span>
                        )}
                        <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />

                        {isActive && (
                            <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"></span>
                        )}
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNav;
