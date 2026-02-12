import React, { useState } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import { useFinancials } from '../context/FinancialsContext';
import { recipesData } from '../data/recipes';
import { DollarSign, TrendingUp, ShoppingBag, Plus, Calendar, Trash2, Search } from 'lucide-react';

const Financials = () => {
    const { sales, summary, loading, deleteSale, addSale } = useFinancials();
    const [showAddModal, setShowAddModal] = useState(false);

    // Simple Add Modal Component
    const AddSaleModal = ({ onClose }) => {
        const [formData, setFormData] = useState({
            product_name: '',
            price: '',
            cost: '',
            quantity: '1',
            date: new Date().toISOString().split('T')[0] // Default to today
        });

        const handleProductChange = (e) => {
            setFormData({ ...formData, product_name: e.target.value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            const price = parseFloat(formData.price) || 0;
            const cost = parseFloat(formData.cost) || 0;
            const qty = parseInt(formData.quantity) || 1;

            const saleDate = new Date(formData.date);
            const now = new Date();
            saleDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

            const result = await addSale({
                product_name: formData.product_name,
                price_per_unit: price.toFixed(2),
                quantity: qty,
                cost_per_unit: cost.toFixed(2),
                total_amount: (price * qty).toFixed(2),
                profit: ((price - cost) * qty).toFixed(2),
                payment_method: 'cash',
                sale_date: saleDate.toISOString()
            });

            if (result && result.success) {
                onClose();
            } else {
                console.error("Sale Error:", result?.error);
                alert(`Erro ao registrar venda: ${result?.error?.message || JSON.stringify(result?.error) || "Verifique sua conexão"}`);
            }
        };

        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
                <GlassCard className="relative w-full max-w-sm !bg-[#1a1a1a] border-white/10 p-6 animate-bounce-in">
                    <h2 className="text-xl font-bold text-white mb-4">Nova Venda</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs text-white/60 uppercase font-bold block mb-1">Nome do Produto</label>
                            <input
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary placeholder-white/30"
                                placeholder="Ex: Cookie Tradicional"
                                value={formData.product_name}
                                onChange={handleProductChange}
                            />
                        </div>

                        <div className="flex gap-4">
                            <div>
                                <label className="text-xs text-white/60 uppercase font-bold block mb-1">Preço (R$)</label>
                                <input
                                    type="number" step="0.01" required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-white/60 uppercase font-bold block mb-1">Custo (R$)</label>
                                <input
                                    type="number" step="0.01"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                    placeholder="0.00"
                                    value={formData.cost}
                                    onChange={e => setFormData({ ...formData, cost: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-xs text-white/60 uppercase font-bold block mb-1">Qtd.</label>
                                <input
                                    type="number" min="1" required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                    value={formData.quantity}
                                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                />
                            </div>
                            <div className="flex-[2]">
                                <label className="text-xs text-white/60 uppercase font-bold block mb-1">Data</label>
                                <input
                                    type="date" required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl mt-2 shadow-lg shadow-emerald-500/20">
                            Confirmar Venda
                        </button>
                    </form>
                </GlassCard>
            </div>
        )
    }

    return (
        <Layout>
            <header className="mb-8 mt-4">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">
                    Minhas <span className="text-emerald-400">Vendas</span> 🤑
                </h1>
                <p className="text-white/60 font-light text-sm">Gerencie seu império de cookies.</p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <GlassCard className="!bg-emerald-500/10 !border-emerald-500/20 p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={16} className="text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-200 uppercase">Lucro</span>
                    </div>
                    <p className="text-2xl font-black text-white">R$ {(summary?.profit || 0).toFixed(2)}</p>
                </GlassCard>
                <GlassCard className="!bg-blue-500/10 !border-blue-500/20 p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <DollarSign size={16} className="text-blue-400" />
                        <span className="text-xs font-bold text-blue-200 uppercase">Vendas</span>
                    </div>
                    <p className="text-2xl font-black text-white">R$ {(summary?.revenue || 0).toFixed(2)}</p>
                </GlassCard>
            </div>

            <button
                onClick={() => setShowAddModal(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-2xl mb-8 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
                <Plus size={20} />
                Registrar Nova Venda
            </button>

            {/* Sales List */}
            <div className="mb-24">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Extrato Recente</h3>
                    <span className="text-xs text-white/40">{summary.count} registros</span>
                </div>

                <div className="space-y-3">
                    {loading ? (
                        <p className="text-center text-white/40 py-8 animate-pulse">Carregando transações...</p>
                    ) : sales.length === 0 ? (
                        <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/5 border-dashed flex flex-col items-center justify-center">
                            <ShoppingBag size={48} className="mx-auto text-white/10 mb-4" />
                            <p className="text-white/60 font-medium mb-1">Comece a Faturar!</p>
                            <p className="text-white/30 text-xs mb-6 max-w-[200px]">Registre sua primeira venda para ver o dinheiro entrar.</p>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                            >
                                Registrar Venda Agora
                            </button>
                        </div>
                    ) : (
                        sales.map((sale) => {
                            // Find matching recipe image if possible
                            const recipe = recipesData.find(r => r.title === sale.product_name);
                            const image = recipe?.image;

                            return (
                                <div key={sale.id} className="group bg-white/5 border border-white/5 hover:border-emerald-500/30 rounded-2xl p-4 flex justify-between items-center transition-all hover:bg-white/10">
                                    <div className="flex items-center gap-3">
                                        {/* Thumbnail */}
                                        <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center overflow-hidden border border-white/10">
                                            {image ? (
                                                <img src={image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <ShoppingBag size={16} className="text-white/30" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm line-clamp-1">{sale.product_name}</h4>
                                            <div className="flex items-center gap-2 text-[11px] text-white/50">
                                                <span>{new Date(sale.sale_date).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span className="bg-white/10 px-1.5 py-0.5 rounded text-white/70">{sale.quantity} un</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-3">
                                        <div>
                                            <span className="block font-bold text-emerald-400 text-sm">+ R$ {(parseFloat(sale.total_amount) || 0).toFixed(2)}</span>
                                            {(sale.profit > 0) && (
                                                <span className="text-[10px] text-emerald-500/50 font-medium">
                                                    L: R$ {(parseFloat(sale.profit) || 0).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (confirm('Apagar esta venda?')) deleteSale(sale.id);
                                            }}
                                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 text-white/20 hover:text-red-500 flex items-center justify-center transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Floating Action Button */}


            {showAddModal && <AddSaleModal onClose={() => setShowAddModal(false)} />}
        </Layout>
    );
};

export default Financials;
