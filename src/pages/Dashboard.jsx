import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import { Sparkles, Copy, Lightbulb, TrendingUp, Calculator, ChefHat, DollarSign, MapPin, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const Dashboard = () => {
    const navigate = useNavigate();

    // Simple state for Quick Simulator Widget
    const { user } = useAuth();
    const [simGoal, setSimGoal] = useState(3000);
    const [simPrice, setSimPrice] = useState(12);
    const cookiesNeeded = Math.ceil(simGoal / simPrice);

    // Load initial goal
    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('sales_goal')
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setSimGoal(data.sales_goal);
                }
            };
            fetchProfile();
        }
    }, [user]);

    // Save goal when it changes (Debounced ideally, but onBlur for simplicity here)
    const handleGoalChange = async (e) => {
        const newGoal = e.target.value;
        setSimGoal(newGoal);
    };

    const saveGoal = async () => {
        if (user) {
            await supabase
                .from('profiles')
                .upsert({ id: user.id, sales_goal: simGoal });
        }
    };

    return (
        <Layout>
            <header className="mb-8 mt-4 animate-float">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Olá, <span className="text-primary-glow">Chef! 👩‍🍳</span>
                    </h1>
                </div>
                <p className="text-white/60 font-light">Vamos bater a meta de hoje?</p>
            </header>

            {/* HERO REDESIGNED: Catálogo de Receitas */}
            <section className="mb-10">
                <div
                    onClick={() => navigate('/recipes')}
                    className="relative w-full h-[280px] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl shadow-primary/20 transition-all duration-500 hover:shadow-primary/40 hover:-translate-y-1 border border-white/10"
                >
                    {/* Background Image with Zoom Effect */}
                    <div className="absolute inset-0 bg-black">
                        <img
                            src="/cookie_gourmet_nutella_v2_1770264134971.png"
                            alt="Cookies Gourmet"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                    </div>

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <div className="absolute top-6 left-6">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Destaque do Mês</span>
                            </div>
                        </div>

                        <div className="max-w-[80%] relative z-10">
                            <h2 className="text-4xl font-black text-white leading-[0.9] mb-3 drop-shadow-lg">
                                RECEITAS <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-glow to-primary">SECRETAS</span>
                            </h2>
                            <p className="text-white/80 text-sm font-medium mb-4 line-clamp-2">
                                Acesse o catálogo completo com 66 receitas testadas e aprovadas para venda.
                            </p>

                            <div className="flex items-center gap-4">
                                <button className="bg-primary hover:bg-primary-glow text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2 group-hover:gap-3">
                                    Ver Catálogo <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Widgets Stack (Full Width) */}
            <div className="flex flex-col gap-6 mb-12">

                {/* Simulador de Lucro Card */}
                <GlassCard className="!bg-gradient-to-br !from-emerald-900/10 !to-black/60 border-emerald-500/10 hover:border-emerald-500/30 transition-all p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-emerald-500/10 rounded-lg">
                                <Calculator className="text-emerald-400" size={20} />
                            </div>
                            <h3 className="font-bold text-white uppercase tracking-wider text-xs">Simulador de Meta</h3>
                        </div>

                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <label className="text-[10px] text-emerald-400/70 font-bold uppercase mb-1 block">Meta (R$)</label>
                                <input
                                    type="number"
                                    value={simGoal}
                                    onChange={handleGoalChange}
                                    onBlur={saveGoal}
                                    className="bg-transparent text-3xl font-black text-white w-28 focus:outline-none placeholder-white/20"
                                />
                            </div>
                            <div className="text-right">
                                <label className="text-[10px] text-white/40 font-bold uppercase mb-1 block">Preço (R$)</label>
                                <input
                                    type="number"
                                    value={simPrice}
                                    onChange={(e) => setSimPrice(e.target.value)}
                                    className="bg-transparent text-xl font-bold text-white/80 w-16 text-right focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5">
                            <div>
                                <span className="text-xs text-white/40 block mb-0.5">Sua meta:</span>
                                <span className="text-xl font-bold text-white">{cookiesNeeded} <span className="text-sm font-normal text-white/40">unidades</span></span>
                            </div>
                            <button onClick={() => navigate('/calculator')} className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:scale-110 transition-transform">
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </GlassCard>

                {/* Onde Vender Card */}
                <GlassCard
                    onClick={() => navigate('/strategies')}
                    className="!bg-gradient-to-br !from-purple-900/10 !to-black/60 border-purple-500/10 hover:border-purple-500/30 transition-all p-6 cursor-pointer group relative overflow-hidden"
                >
                    <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-purple-900/20 to-transparent opacity-50"></div>

                    <div className="relative z-10 flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <MapPin className="text-purple-400" size={20} />
                                </div>
                                <h3 className="font-bold text-white uppercase tracking-wider text-xs">Estratégias</h3>
                                <span className="bg-purple-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ml-2">Novo</span>
                            </div>
                            <h3 className="text-xl font-bold text-white leading-tight">Onde Vender?</h3>
                            <p className="text-white/60 text-xs">Descubra os melhores canais para vender.</p>
                        </div>

                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                            <ArrowRight size={20} className="text-purple-400 group-hover:text-white" />
                        </div>
                    </div>
                </GlassCard>
            </div>

            <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4 ml-1">Menu Rápido</h3>
            <div className="grid grid-cols-2 gap-3 mb-24">
                <GlassCard onClick={() => navigate('/first-sale')} className="flex flex-col items-center justify-center py-6 gap-2 group !bg-white/5 hover:!bg-white/10 cursor-pointer !rounded-2xl">
                    <Sparkles size={24} className="text-yellow-400" />
                    <span className="font-bold text-xs text-center">Início</span>
                </GlassCard>
                <GlassCard onClick={() => navigate('/sales-kit')} className="flex flex-col items-center justify-center py-6 gap-2 group !bg-white/5 hover:!bg-white/10 cursor-pointer !rounded-2xl">
                    <Copy size={24} className="text-blue-400" />
                    <span className="font-bold text-xs text-center">Scripts</span>
                </GlassCard>
                <GlassCard onClick={() => navigate('/recipes')} className="flex flex-col items-center justify-center py-6 gap-2 group !bg-white/5 hover:!bg-white/10 cursor-pointer !rounded-2xl">
                    <ChefHat size={24} className="text-pink-400" />
                    <span className="font-bold text-xs text-center">Receitas</span>
                </GlassCard>
                <GlassCard onClick={() => navigate('/golden-tips')} className="flex flex-col items-center justify-center py-6 gap-2 group !bg-white/5 hover:!bg-white/10 cursor-pointer !rounded-2xl">
                    <Lightbulb size={24} className="text-amber-400" />
                    <span className="font-bold text-xs text-center">Dicas</span>
                </GlassCard>
            </div>
        </Layout>
    );
};

export default Dashboard;
