
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Circle, Play, Pause, RotateCcw, Timer, ChefHat, ArrowRight } from 'lucide-react';

const RecipeActiveMode = ({ recipe, onClose }) => {
    const [activeTab, setActiveTab] = useState('ingredients'); // 'ingredients' or 'prep'
    const [checkedIngredients, setCheckedIngredients] = useState({});
    const [completedSteps, setCompletedSteps] = useState({});

    // Timer state
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0); // in seconds
    const [initialTime, setInitialTime] = useState(0);

    const toggleIngredient = (index) => {
        setCheckedIngredients(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const toggleStep = (index) => {
        setCompletedSteps(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const ingredientsProgress = (Object.values(checkedIngredients).filter(Boolean).length / recipe.ingredients.length) * 100;
    const prepProgress = (Object.values(completedSteps).filter(Boolean).length / recipe.prep.length) * 100;

    // Smart Timer Detection
    const startTimer = (durationMinutes) => {
        const seconds = durationMinutes * 60;
        setTimeLeft(seconds);
        setInitialTime(seconds);
        setTimerActive(true);
    };

    useEffect(() => {
        let interval = null;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && timerActive) {
            setTimerActive(false);
            // Could add sound here
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 z-[70] flex justify-center pointer-events-none">
            <div className="w-full max-w-md bg-[#121212] flex flex-col animate-fade-in pointer-events-auto shadow-2xl h-full border-x border-white/5 relative">
                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between bg-black/20 backdrop-blur-md border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse-slow">
                            <ChefHat size={20} />
                        </div>
                        <div>
                            <h2 className="font-bold text-white text-lg leading-tight">Modo Cozinha</h2>
                            <p className="text-xs text-white/50">{recipe.title}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <X size={20} className="text-white/70" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-white/5 w-full">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500 ease-out"
                        style={{ width: `${(ingredientsProgress + prepProgress) / 2}%` }}
                    ></div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-6 pb-32 custom-scrollbar">

                    {/* Mode Switcher */}
                    <div className="flex p-1 bg-white/5 rounded-xl mb-8 border border-white/5">
                        <button
                            onClick={() => setActiveTab('ingredients')}
                            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'ingredients' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white/60'}`}
                        >
                            <CheckCircle size={16} />
                            Ingredientes ({Math.round(ingredientsProgress)}%)
                        </button>
                        <button
                            onClick={() => setActiveTab('prep')}
                            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'prep' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white/60'}`}
                        >
                            <Play size={16} />
                            Preparo ({Math.round(prepProgress)}%)
                        </button>
                    </div>

                    {activeTab === 'ingredients' ? (
                        <div className="space-y-3">
                            {recipe.ingredients.map((ing, i) => (
                                <div
                                    key={i}
                                    onClick={() => toggleIngredient(i)}
                                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 group ${checkedIngredients[i] ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checkedIngredients[i] ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/20 group-hover:border-primary'}`}>
                                        {checkedIngredients[i] && <CheckCircle size={14} />}
                                    </div>
                                    <span className={`flex-1 font-medium transition-colors ${checkedIngredients[i] ? 'text-emerald-400 line-through opacity-70' : 'text-white/90'}`}>
                                        {ing}
                                    </span>
                                </div>
                            ))}
                            {ingredientsProgress === 100 && (
                                <button
                                    onClick={() => setActiveTab('prep')}
                                    className="w-full mt-6 py-4 bg-primary text-black font-bold rounded-xl animate-bounce-in flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                                >
                                    Ir para o Preparo <ArrowRight size={20} />
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {recipe.prep.map((step, i) => {
                                // Detect time in step text (e.g. "15 min")
                                const timeMatch = step.match(/(\d+)\s*(min|minutos)/);
                                const minutes = timeMatch ? parseInt(timeMatch[1]) : 0;

                                return (
                                    <div
                                        key={i}
                                        className={`relative p-6 rounded-2xl border transition-all ${completedSteps[i] ? 'bg-white/5 border-white/5 opacity-60' : 'bg-white/10 border-white/10'}`}
                                    >
                                        <div className="flex gap-4">
                                            <div
                                                onClick={() => toggleStep(i)}
                                                className={`mt-1 shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${completedSteps[i] ? 'bg-emerald-500 border-emerald-500 text-black' : 'bg-black/40 border-primary text-primary'}`}
                                            >
                                                {completedSteps[i] ? <CheckCircle size={18} /> : <span className="font-bold text-sm">{i + 1}</span>}
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-lg leading-relaxed ${completedSteps[i] ? 'text-white/50' : 'text-white/90'}`}>
                                                    {step.replace(/^\d+\.\s/, '')}
                                                </p>

                                                {/* Timer Button if time detected */}
                                                {minutes > 0 && !completedSteps[i] && (
                                                    <div className="mt-4">
                                                        <button
                                                            onClick={() => startTimer(minutes)}
                                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2 text-sm text-primary font-bold transition-colors"
                                                        >
                                                            <Timer size={16} />
                                                            Iniciar Timer ({minutes} min)
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Sticky Timer Footer */}
                {(timerActive || timeLeft > 0) && (
                    <div className="absolute bottom-6 left-6 right-6 bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/80 flex items-center justify-between animate-slide-up">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${timeLeft === 0 ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-primary/20 text-primary'}`}>
                                <Timer size={20} />
                            </div>
                            <div>
                                <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider block">Cronômetro</span>
                                <span className={`text-2xl font-mono font-bold ${timeLeft === 0 ? 'text-red-400' : 'text-white'}`}>
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setTimerActive(!timerActive)}
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            >
                                {timerActive ? <Pause size={20} /> : <Play size={20} />}
                            </button>
                            <button
                                onClick={() => setTimerActive(false) || setTimeLeft(0)}
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors hover:rotate-180 duration-500"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeActiveMode;
