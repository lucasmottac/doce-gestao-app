import React from 'react';
import { useRecipeProgress } from '../context/RecipeProgressContext';
import { ChefHat, Trophy } from 'lucide-react';

const CookieProgressBar = () => {
    const { progressPercentage, completedCount, totalRecipes } = useRecipeProgress();

    // Determine level/title based on progress
    let title = "Aprendiz de Confeiteira";
    let message = "Continue assando para evoluir!";

    if (progressPercentage >= 20) { title = "Confeiteira Junior"; message = "Você está pegando o jeito!"; }
    if (progressPercentage >= 50) { title = "Chef de Cookies"; message = "Metade do caminho já foi!"; }
    if (progressPercentage >= 80) { title = "Mestre Cookieiro"; message = "Quase lá, falta pouco!"; }
    if (progressPercentage === 100) { title = "Lenda dos Cookies"; message = "Você zerou o catálogo!"; }

    return (
        <div className="bg-gradient-to-br from-orange-900/40 to-black/60 border border-orange-500/20 rounded-2xl p-5 mb-6 relative overflow-hidden backdrop-blur-md">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mt-10 -mr-10"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${progressPercentage === 100 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-orange-500/20 text-orange-500'}`}>
                            {progressPercentage === 100 ? <Trophy size={20} /> : <ChefHat size={20} />}
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm leading-tight">{title}</h3>
                            <p className="text-white/40 text-xs">{message}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-black text-white">{progressPercentage}%</span>
                        <span className="text-[10px] text-white/30 font-bold uppercase block -mt-1">Concluído</span>
                    </div>
                </div>

                {/* Progress Bar Container */}
                <div className="h-4 bg-white/5 rounded-full relative">
                    {/* Active Bar */}
                    <div
                        className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${progressPercentage}%` }}
                    >
                        {/* Cookie Head on the bar */}
                        {progressPercentage > 0 && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-[#d2691e] border-2 border-orange-900 rounded-full shadow-lg flex items-center justify-center z-20">
                                <div className="w-1 h-1 bg-black/40 rounded-full absolute top-1.5 left-1.5"></div>
                                <div className="w-1 h-1 bg-black/40 rounded-full absolute top-3 right-2"></div>
                                <div className="w-1 h-1 bg-black/40 rounded-full absolute bottom-1.5 left-2.5"></div>
                            </div>
                        )}
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                    </div>
                </div>

                <div className="flex justify-between mt-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    <span>{completedCount} de {totalRecipes} Receitas</span>
                    <span>Nível {Math.floor(progressPercentage / 20) + 1}</span>
                </div>
            </div>
        </div>
    );
};

export default CookieProgressBar;
