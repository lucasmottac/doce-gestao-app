import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import { Clock, Users, X, ChevronRight, Calculator, Star, Leaf, ChefHat, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recipesData } from '../data/recipes';
import RecipeActiveMode from '../components/RecipeActiveMode';

const Recipes = () => {
    const navigate = useNavigate();
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [activeTab, setActiveTab] = useState('traditional');
    const [isCooking, setIsCooking] = useState(false);

    const filteredRecipes = useMemo(() => {
        return recipesData.filter(r => r.category === activeTab);
    }, [activeTab]);

    const openRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        setIsCooking(false);
    };
    const closeRecipe = () => {
        setSelectedRecipe(null);
        setIsCooking(false);
    };

    const tabs = [
        { id: 'traditional', label: 'Tradicionais', icon: ChefHat, color: 'text-orange-400' },
        { id: 'gourmet', label: 'Gourmet', icon: Star, color: 'text-purple-400' },
        { id: 'special', label: 'Especiais', icon: Leaf, color: 'text-green-400' }
    ];

    return (
        <Layout onBack={selectedRecipe ? closeRecipe : undefined}>
            <header className="mb-6">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Catálogo de Receitas</h1>
                <p className="text-white/60 text-sm">Escolha sua categoria favorita.</p>
            </header>

            {/* Tabs */}
            <div className="flex p-1 mb-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all relative
                            ${activeTab === tab.id ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}
                        `}
                    >
                        <tab.icon size={16} className={activeTab === tab.id ? tab.color : ''} />
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary mx-auto"></span>
                        )}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pb-0 mb-24 animate-fade-in">
                {filteredRecipes.map((recipe) => (
                    <GlassCard
                        key={recipe.id}
                        onClick={() => openRecipe(recipe)}
                        className="p-0 !rounded-[2rem] group border-0 shadow-none bg-transparent hover:!bg-transparent cursor-pointer"
                    >
                        <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] relative shadow-2xl shadow-black/40">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>

                            <div className="absolute bottom-0 left-0 w-full p-4">
                                <h3 className="font-bold text-sm leading-tight mb-2 drop-shadow-md text-white/90 line-clamp-2 min-h-[2.5em]">
                                    {recipe.title.replace('Cookie ', '')}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg text-white/80 border border-white/5 flex items-center gap-1">
                                        <Clock size={10} /> {recipe.time}
                                    </span>
                                    <span className="text-[10px] font-bold bg-emerald-500/20 backdrop-blur-md px-2 py-1 rounded-lg text-emerald-400 border border-emerald-500/20">
                                        R$ {recipe.cost}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* Recipe Modal */}
            {selectedRecipe && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeRecipe}></div>
                    <div className="relative w-full max-w-md bg-[#1a1a1a] rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] flex flex-col animate-slide-up sm:animate-fade-in border border-white/10">

                        {/* Header Image */}
                        <div className="h-56 relative shrink-0">
                            <img src={selectedRecipe.image} className="w-full h-full object-cover" alt={selectedRecipe.title} />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
                            <button onClick={closeRecipe} className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <h2 className="text-2xl font-bold mb-1 leading-tight">{selectedRecipe.title}</h2>
                            <p className="text-sm text-white/40 mb-6 uppercase tracking-wider font-bold">{tabs.find(t => t.id === selectedRecipe.category)?.label}</p>

                            <div className="flex gap-4 mb-8">
                                <div className="flex-1 bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                                    <Clock size={24} className="mx-auto mb-2 text-primary" />
                                    <span className="text-xs text-white/40 font-bold uppercase tracking-wider block mb-1">Tempo</span>
                                    <p className="font-bold text-lg">{selectedRecipe.time}</p>
                                </div>
                                <div className="flex-1 bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                                    <Users size={24} className="mx-auto mb-2 text-primary" />
                                    <span className="text-xs text-white/40 font-bold uppercase tracking-wider block mb-1">Rende</span>
                                    <p className="font-bold text-lg">{selectedRecipe.yield}</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white/90">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                            <ChefHat size={16} />
                                        </div>
                                        Ingredientes
                                    </h3>
                                    <ul className="space-y-3 text-sm text-white/70">
                                        {selectedRecipe.ingredients.map((ing, i) => (
                                            <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></div>
                                                {ing}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white/90">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                            <Star size={16} />
                                        </div>
                                        Modo de Preparo
                                    </h3>
                                    <div className="space-y-4 text-sm text-white/70 leading-relaxed font-light">
                                        {selectedRecipe.prep.map((step, i) => (
                                            <p key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                                <strong className="text-primary block mb-1">Passo {i + 1}</strong>
                                                {step.replace(/^\d+\.\s/, '')}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsCooking(true)}
                                className="w-full mt-6 mb-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-900/20 active:scale-[0.98] animate-bounce-in"
                            >
                                <PlayCircle size={20} />
                                Iniciar Modo Cozinha
                            </button>

                            <button
                                onClick={() => navigate('/calculator')}
                                className="w-full bg-white/5 hover:bg-white/10 text-white/70 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                            >
                                <Calculator size={18} />
                                Calcular Lucro
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Active Cooking Mode Overlay */}
            {isCooking && selectedRecipe && (
                <RecipeActiveMode
                    recipe={selectedRecipe}
                    onClose={() => setIsCooking(false)}
                />
            )}
        </Layout>
    );
};

export default Recipes;
