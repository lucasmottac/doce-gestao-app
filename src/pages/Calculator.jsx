import React, { useState } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import { RefreshCw, AlertCircle, Package, Truck, Flame, PlusCircle, Receipt, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const Calculator = () => {
    // Inputs
    const [yieldAmount, setYieldAmount] = useState('12');
    const [ingredientsCost, setIngredientsCost] = useState('');
    const [packagingCost, setPackagingCost] = useState('');
    const [deliveryCost, setDeliveryCost] = useState('');
    const [gasCost, setGasCost] = useState('');
    const [otherCost, setOtherCost] = useState('');         // New Input
    const [profitMargin, setProfitMargin] = useState('200');

    // Safe Calculations
    const getValues = () => {
        const yieldVal = parseFloat(yieldAmount) || 1;
        const ingTotal = parseFloat(ingredientsCost) || 0;
        const packTotal = parseFloat(packagingCost) || 0;
        const deliveryTotal = parseFloat(deliveryCost) || 0;
        const gasTotal = parseFloat(gasCost) || 0;
        const otherTotal = parseFloat(otherCost) || 0;
        const margin = parseFloat(profitMargin) || 0;

        const effectiveYield = yieldVal > 0 ? yieldVal : 1;

        // Costs per Unit
        const unitDoughCost = ingTotal / effectiveYield;
        const unitPackCost = packTotal / effectiveYield;
        const unitGasCost = gasTotal / effectiveYield;
        const unitDeliveryCost = deliveryTotal / effectiveYield;
        const unitOtherCost = otherTotal / effectiveYield;

        // Total Unit Base Cost
        const totalUnitCost = unitDoughCost + unitPackCost + unitGasCost + unitDeliveryCost + unitOtherCost;

        // Pricing
        const suggestedPrice = totalUnitCost * (1 + margin / 100);
        const profit = suggestedPrice - totalUnitCost;

    };

    const { unitDoughCost, unitPackCost, unitGasCost, unitDeliveryCost, unitOtherCost, totalUnitCost, suggestedPrice, profit, margin } = getValues();

    const { user } = useAuth();
    const [saving, setSaving] = useState(false);

    const saveCalculation = async () => {
        if (!user) return;
        setSaving(true);

        try {
            const { error } = await supabase
                .from('saved_calculations')
                .insert({
                    user_id: user.id,
                    recipe_name: 'Cálculo Rápido', // Could add a name input later
                    yield_amount: parseFloat(yieldAmount),
                    ingredients_cost: parseFloat(ingredientsCost),
                    total_cost: totalUnitCost,
                    suggested_price: suggestedPrice,
                    profit_margin: parseFloat(profitMargin)
                });

            if (error) throw error;
            alert('Cálculo salvo com sucesso!');
        } catch (error) {
            console.error('Error saving:', error);
            alert('Erro ao salvar cálculo.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Layout>
            <header className="mb-8 mt-4 animate-float">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2 leading-tight">
                    Calculadora <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">Profissional</span> 💰
                </h1>
                <div className="flex justify-between items-end">
                    <p className="text-white/60 text-sm font-light">Precificação completa, sem achismos.</p>
                    <button
                        onClick={saveCalculation}
                        disabled={saving}
                        className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors border border-emerald-500/20"
                    >
                        <Save size={14} />
                        {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </header>

            <GlassCard className="mb-8 !border-emerald-500/20">
                <div className="space-y-6">
                    {/* Rendimento */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-white/80 mb-2 uppercase tracking-wider">
                            <RefreshCw size={14} className="text-emerald-400" /> Rendimento da Receita (un)
                        </label>
                        <input
                            type="number"
                            value={yieldAmount}
                            onChange={(e) => setYieldAmount(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none transition-all text-lg font-mono"
                            placeholder="Ex: 12"
                        />
                    </div>

                    <div className="h-px bg-white/5 w-full"></div>

                    {/* Custos da Receita */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-white/80 mb-2 uppercase tracking-wider">Custo Ingredientes (Total)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">R$</span>
                                <input
                                    type="number"
                                    value={ingredientsCost}
                                    onChange={(e) => setIngredientsCost(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none transition-all font-mono"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-[10px] font-bold text-white/80 mb-2 uppercase tracking-wider">
                                <Package size={12} className="text-blue-400" /> Embalagem (Total)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-bold text-sm">R$</span>
                                <input
                                    type="number"
                                    value={packagingCost}
                                    onChange={(e) => setPackagingCost(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-8 pr-3 text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none transition-all font-mono text-sm"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-[10px] font-bold text-white/80 mb-2 uppercase tracking-wider">
                                <Flame size={12} className="text-orange-400" /> Gás/Luz (Estimado)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-bold text-sm">R$</span>
                                <input
                                    type="number"
                                    value={gasCost}
                                    onChange={(e) => setGasCost(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-8 pr-3 text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none transition-all font-mono text-sm"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-[10px] font-bold text-white/80 mb-2 uppercase tracking-wider">
                                <Truck size={12} className="text-purple-400" /> Taxa Entrega
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-bold text-sm">R$</span>
                                <input
                                    type="number"
                                    value={deliveryCost}
                                    onChange={(e) => setDeliveryCost(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-8 pr-3 text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none transition-all font-mono text-sm"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-[10px] font-bold text-white/80 mb-2 uppercase tracking-wider">
                                <PlusCircle size={12} className="text-pink-400" /> Outros
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-bold text-sm">R$</span>
                                <input
                                    type="number"
                                    value={otherCost}
                                    onChange={(e) => setOtherCost(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-8 pr-3 text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none transition-all font-mono text-sm"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Margem Slider */}
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-xs font-bold text-white/80 uppercase tracking-wider">Margem de Lucro</label>
                            <span className="text-emerald-400 font-mono font-bold text-lg">{profitMargin}%</span>
                        </div>
                        <input
                            type="range"
                            min="50" max="400" step="10"
                            value={profitMargin}
                            onChange={(e) => setProfitMargin(e.target.value)}
                            className="w-full accent-emerald-500 h-2 bg-black/40 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-white/30 mt-2 font-mono">
                            <span>Mínima (50%)</span>
                            <span>Saudável (200%)</span>
                            <span>Grife (300%+)</span>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Resultado Final */}
            <div className="space-y-4 mb-24">

                {/* Cost Breakdown Visual */}
                <GlassCard className="!bg-white/5 border border-white/10 p-5">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
                        <Receipt size={16} className="text-white/60" />
                        <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Composição do Custo (Un)</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/80 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/20"></div> Massa do Cookie</span>
                            <span className="font-mono text-white/90">R$ {unitDoughCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-blue-200/80 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Embalagem</span>
                            <span className="font-mono text-blue-200/90">R$ {unitPackCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-orange-200/80 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-400"></div> Gás & Energia</span>
                            <span className="font-mono text-orange-200/90">R$ {unitGasCost.toFixed(2)}</span>
                        </div>
                        {(unitDeliveryCost > 0 || unitOtherCost > 0) && (
                            <div className="flex justify-between text-sm">
                                <span className="text-purple-200/80 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div> Taxas & Outros</span>
                                <span className="font-mono text-purple-200/90">R$ {(unitDeliveryCost + unitOtherCost).toFixed(2)}</span>
                            </div>
                        )}

                        <div className="pt-3 border-t border-dashed border-white/10 flex justify-between items-center mt-2">
                            <span className="text-xs font-bold text-white/50 uppercase">Custo Total / Unidade</span>
                            <span className="font-mono text-xl font-bold text-red-300">R$ {totalUnitCost.toFixed(2)}</span>
                        </div>
                    </div>
                </GlassCard>

                <div className="grid grid-cols-2 gap-4">
                    <GlassCard className="!bg-emerald-500/20 !border-emerald-500/30 flex flex-col justify-center items-center text-center py-6 min-h-[140px]">
                        <span className="text-xs text-emerald-200 font-bold uppercase tracking-widest mb-2">Preço Sugerido</span>
                        <span className="text-3xl font-black text-white drop-shadow-lg">
                            R$ {suggestedPrice.toFixed(2)}
                        </span>
                    </GlassCard>

                    <GlassCard className="!bg-white/5 !border-white/10 flex flex-col justify-center items-center text-center py-6 min-h-[140px]">
                        <span className="text-xs text-white/40 font-bold uppercase tracking-widest mb-2">Seu Lucro Líquido</span>
                        <span className="text-2xl font-bold text-green-400">
                            R$ {profit.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-white/30 mt-1">por unidade</span>
                    </GlassCard>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3 items-start">
                    <AlertCircle className="text-blue-400 shrink-0 mt-0.5" size={18} />
                    <p className="text-xs text-blue-200/90 leading-relaxed">
                        <strong>Controle Total:</strong> Agora você sabe exatamente quanto custa cada centavo do seu cookie, incluindo embalagem e gás. Isso evita prejuízos invisíveis!
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Calculator;
