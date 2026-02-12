import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, Search, ArrowRight, Lock, Star, ChevronLeft, Award, Crown, CheckCircle, Clock, Users, ChefHat, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import { premiumRecipesData } from '../data/premiumRecipesData';

const OtherRecipes = () => {
    const { hasRole, userProfile, refetchUserProfile } = useAuth(); // Import useAuth
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // DEBUG & FORCE REFRESH: Log current access state and ensure fresh data
    React.useEffect(() => {
        console.log('OtherRecipes Mount - Access Check:', {
            apascoa: hasRole('apascoa'),
            userProfile
        });
        if (refetchUserProfile) refetchUserProfile();
    }, [hasRole, userProfile, refetchUserProfile]);

    // Helper to check access (includes Vitalício override)
    const canAccess = (role) => hasRole(role) || hasRole('avitalicio');

    // Premium Categories Data
    const premiumCategories = [
        {
            id: 'recheios',
            role: 'arecheios',
            title: 'Recheios sem Fogo',
            subtitle: 'Economize Gás e Tempo',
            count: 30,
            gradient: 'from-pink-500 to-rose-500',
            icon: '🧁',
            recipes: premiumRecipesData[1],
            checkoutLink: 'https://ggcheckout.com.br/checkout/v5/mM0t4BlhdCSCkJDBoW0j'
        },
        {
            id: 'pascoa',
            role: 'apascoa',
            title: 'Chocolate Páscoa',
            subtitle: 'Lucrabilidade Máxima',
            count: 30,
            gradient: 'from-amber-700 to-orange-900',
            icon: '🐰',
            recipes: premiumRecipesData[2],
            checkoutLink: 'https://ggcheckout.com.br/checkout/v5/QegxwpbL6EJJ1rVdWVYt'
        },
        {
            id: 'massa',
            role: 'amassa',
            title: 'Massa de Confeitaria',
            subtitle: 'Bases Profissionais',
            count: 30,
            gradient: 'from-yellow-400 to-amber-500',
            icon: '🎂',
            recipes: premiumRecipesData[3],
            checkoutLink: 'https://ggcheckout.com.br/checkout/v5/6SXgVsqh8MOaWEWmYD1Z'
        },
        {
            id: 'geladinho',
            role: 'ageladinho',
            title: 'Geladinho Gourmet',
            subtitle: 'Venda Todos os Dias',
            count: 30,
            gradient: 'from-blue-400 to-cyan-500',
            icon: '❄️',
            recipes: premiumRecipesData[4],
            checkoutLink: 'https://ggcheckout.com.br/checkout/v5/KCakDkIQWLzADmbC940i'
        },
        {
            id: 'palha',
            role: 'apalha',
            title: 'Palha Italiana',
            subtitle: 'Doce de Sucesso',
            count: 30,
            gradient: 'from-red-500 to-pink-600',
            icon: '🍫',
            recipes: premiumRecipesData[5],
            checkoutLink: 'https://ggcheckout.com.br/checkout/v5/rmmuVRGl3MI6mgmjHBDz'
        },
        {
            id: 'iogurte',
            role: 'iogurte',
            title: 'Iogurte Caseiro',
            subtitle: 'Saudável & Rentável',
            count: 30,
            gradient: 'from-purple-400 to-indigo-500',
            icon: '🥛',
            recipes: premiumRecipesData[6],
            checkoutLink: 'https://ggcheckout.com.br/checkout/v5/yWdMqsgygYpirmx40Lbt'
        },
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleBack = () => {
        if (selectedRecipe) {
            setSelectedRecipe(null);
        } else {
            setSelectedCategory(null);
        }
    };

    const handleUnlock = () => {
        if (selectedCategory && selectedCategory.checkoutLink) {
            window.open(selectedCategory.checkoutLink, '_blank');
        }
    };

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    // Check if category is unlocked using hasRole from context
    const isUnlocked = selectedCategory && canAccess(selectedCategory.role);

    if (!premiumRecipesData) {
        return <div className="p-10 text-white">Error: Premium Data Missing</div>
    }

    return (
        <Layout onBack={selectedCategory ? handleBack : undefined}>
            <div className="flex flex-col space-y-6 animate-fade-in pb-20">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            {selectedCategory ? selectedCategory.title : "Coleção Exclusiva"}
                        </h1>
                        <p className="text-white/60 text-sm">
                            {selectedCategory ? selectedCategory.subtitle : "Receitas profissionais de alta lucratividade"}
                        </p>
                    </div>
                </div>

                {!selectedCategory ? (
                    <>
                        {/* Hero Banner Sale */}
                        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-yellow-600 to-amber-600 shadow-2xl border border-yellow-400/30">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Crown size={120} className="text-white" />
                            </div>
                            <div className="relative z-10">
                                <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white mb-2 border border-white/20">
                                    MEMBRO ELITE
                                </span>
                                <h2 className="text-xl font-bold text-white mb-1">
                                    Desbloqueie todo o potencial
                                </h2>
                                <p className="text-white/80 text-sm mb-4 max-w-[80%]">
                                    Acesse +50 receitas premium testadas e aprovadas para faturar muito mais.
                                </p>
                                <button className="bg-white text-amber-700 font-bold py-2 px-4 rounded-xl text-sm shadow-lg active:scale-95 transition-transform flex items-center gap-2">
                                    <Award size={16} /> Ver Planos Disponíveis
                                </button>
                            </div>
                        </div>

                        {/* Premium Grid */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <BookOpen size={20} className="text-amber-400" />
                                Módulos Disponíveis
                            </h3>

                            <div className="grid grid-cols-1 gap-4">
                                {premiumCategories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        onClick={() => handleCategoryClick(cat)}
                                        className={`relative overflow-hidden rounded-2xl cursor-pointer group hover:scale-[1.02] transition-all duration-300 shadow-lg border border-white/5 hover:border-amber-400/50 ${canAccess(cat.role) ? '' : 'opacity-80 grayscale-[0.3]'}`}
                                    >
                                        {/* Background Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>

                                        {/* Pattern Overlay */}
                                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>

                                        <div className="relative p-5 flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-white/30 text-shadow">
                                                    {cat.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white drop-shadow-md">{cat.title}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] font-bold bg-black/20 px-2 py-0.5 rounded text-white/90 uppercase tracking-wide">
                                                            {cat.count} Aulas
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-black/20 p-2 rounded-full border border-white/10 group-hover:bg-white/20 transition-colors">
                                                {canAccess(cat.role) ? (
                                                    <CheckCircle size={18} className="text-white/80" />
                                                ) : (
                                                    <Lock size={18} className="text-white/80" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : !isUnlocked ? (
                    /* SALES VIEW (Locked) */
                    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-slide-up space-y-6">

                        {/* Hero Icon */}
                        <div className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-r ${selectedCategory.gradient} blur-2xl opacity-40 rounded-full`}></div>
                            <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-full border border-white/20 shadow-2xl ring-4 ring-white/5">
                                <span className="text-6xl drop-shadow-lg filter">{selectedCategory.icon}</span>
                                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-full border-4 border-gray-900 shadow-lg">
                                    <Lock size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Title & Pitch */}
                        <div className="text-center space-y-3 max-w-sm mx-auto">
                            <h2 className="text-3xl font-bold text-white tracking-tight">{selectedCategory.title}</h2>
                            <p className="text-lg text-white/60 font-medium">{selectedCategory.subtitle}</p>
                            <p className="text-sm text-white/40 leading-relaxed px-4">
                                Este módulo contém <span className="text-amber-400 font-bold">{selectedCategory.count} receitas exclusivas</span> selecionadas a dedo para você vender muito mais.
                            </p>
                        </div>

                        {/* Benefits List */}
                        <div className="bg-white/5 rounded-2xl p-6 w-full max-w-xs border border-white/10 space-y-4">
                            <div className="flex items-center gap-3 text-white/90">
                                <CheckCircle size={18} className="text-green-400 shrink-0" />
                                <span className="text-sm">Receitas 100% testadas</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/90">
                                <CheckCircle size={18} className="text-green-400 shrink-0" />
                                <span className="text-sm">Acesso Imediato e Vitalício</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/90">
                                <CheckCircle size={18} className="text-green-400 shrink-0" />
                                <span className="text-sm">Suporte direto</span>
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="w-full max-w-xs space-y-3">
                            <button
                                onClick={handleUnlock}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-green-900/40 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                            >
                                <span>Liberar Acesso Agora</span>
                                <ArrowRight size={18} className="text-green-100 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-center text-xs text-white/30 flex items-center justify-center gap-1">
                                <Lock size={10} /> Compra 100% Segura e Garantida
                            </p>
                        </div>

                        <button onClick={handleBack} className="text-white/40 text-sm hover:text-white transition-colors">
                            Voltar para galeria
                        </button>
                    </div>
                ) : (
                    /* UNLOCKED CONTENT VIEW (Recipe List) */
                    <div className="space-y-6 animate-slide-up">
                        {/* Header Card (Compact) */}
                        <div className={`p-6 rounded-2xl bg-gradient-to-br ${selectedCategory.gradient} text-white shadow-xl relative overflow-hidden border border-white/10`}>
                            <div className="absolute -right-4 -top-4 opacity-20">
                                <span className="text-9xl">{selectedCategory.icon}</span>
                            </div>
                            <div className="relative z-10 flex flex-col items-start gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">{selectedCategory.title}</h2>
                                    <p className="opacity-90">{selectedCategory.subtitle}</p>
                                </div>
                                <span className="text-xs bg-white text-black font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1 shadow-lg">
                                    <CheckCircle size={12} className="text-green-600" /> ACESSO LIBERADO
                                </span>
                            </div>
                        </div>

                        {/* Search in Category */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input
                                type="text"
                                placeholder={`Buscar em ${selectedCategory.title}...`}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                        </div>

                        {/* Clean List */}
                        <div className="space-y-3 pb-20">
                            {selectedCategory.recipes.map((recipe, index) => (
                                <div key={index}
                                    onClick={() => handleRecipeClick(recipe)}
                                    className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group active:scale-[0.99]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold shadow-inner border border-white/5 text-sm">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium group-hover:text-primary transition-colors">{recipe.name}</h3>
                                            <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
                                                <span>⏰ {recipe.time}</span>
                                                {/* REMOVED CHEF LUCAS LABEL */}
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRight size={18} className="text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

// ... imports
            import {createPortal} from 'react-dom';

            // ... inside component ...

            {/* Recipe Detail Modal - Rendered via Portal */}
            {selectedRecipe && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4 isolate">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedRecipe(null)}
                        aria-hidden="true"
                    />

                    {/* Modal Content */}
                    <div className="relative z-10 w-full max-w-md bg-[#1a1a1a] rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] flex flex-col animate-slide-up sm:animate-fade-in border border-white/10 shadow-2xl">

                        {/* Close Button */}
                        <div className="absolute top-4 right-4 z-20">
                            <button onClick={() => setSelectedRecipe(null)} className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform hover:bg-white/20">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar bg-[#1a1a1a]">
                            <h2 className="text-2xl font-bold mb-1 leading-tight text-white pr-12">{selectedRecipe.name}</h2>
                            <p className="text-sm text-white/40 mb-6 uppercase tracking-wider font-bold">{selectedCategory.title}</p>

                            <div className="flex gap-4 mb-8">
                                <div className="flex-1 bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                                    <Clock size={24} className="mx-auto mb-2 text-primary" />
                                    <span className="text-xs text-white/40 font-bold uppercase tracking-wider block mb-1">Tempo</span>
                                    <p className="font-bold text-lg text-white">{selectedRecipe.time}</p>
                                </div>
                                <div className="flex-1 bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                                    <Users size={24} className="mx-auto mb-2 text-primary" />
                                    <span className="text-xs text-white/40 font-bold uppercase tracking-wider block mb-1">Rende</span>
                                    <p className="font-bold text-lg text-white">{selectedRecipe.yield || "Indefinido"}</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {selectedRecipe.ingredients && (
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
                                )}

                                {selectedRecipe.prep && (
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </Layout>
    );
};

export default OtherRecipes;
