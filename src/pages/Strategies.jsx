import React, { useState } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import { TrendingUp, Truck, Briefcase, Coffee, Calendar, Gift, ChevronDown, Megaphone, Store, Star, PlusCircle } from 'lucide-react';

const Strategies = () => {
    const [openStrategy, setOpenStrategy] = useState(0);

    const toggleStrategy = (index) => setOpenStrategy(openStrategy === index ? null : index);

    const strategies = [
        {
            icon: Truck,
            title: "O Dia da Entrega Grátis",
            subtitle: "Domine um bairro por vez",
            color: "text-green-400",
            bg: "bg-green-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Entregar picado todo dia é caro e cansativo. Crie um evento semanal.</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="font-bold text-white mb-2">🚀 Como executar:</p>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>1. Escolha um dia (ex: Quinta-feira) e um bairro específico.</li>
                            <li>2. Anuncie: "Quinta-feira é dia de Frete Grátis no bairro [Bairro]!".</li>
                            <li>3. Acumule todos os pedidos e faça uma rota única.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            icon: Coffee,
            title: "Parceria com Cafeterias",
            subtitle: "Venda recorrente (B2B)",
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">O dono da cafeteria quer vender, mas não quer ter o trabalho de produzir doces.</p>
                    <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-white/90">
                        <p className="mb-2"><strong>🤝 A Proposta Irresistível:</strong></p>
                        <p className="text-sm italic">"Eu deixo 10 cookies aqui em consignação. O que vender, a gente racha o lucro. O que não vender, eu recolho. Risco zero pra você."</p>
                    </div>
                    <p className="text-xs text-amber-200">Dica: Leve cookies "mini" para dar de degustação no balcão.</p>
                </div>
            )
        },
        {
            icon: Briefcase,
            title: "Corporativo e Lembrancinhas",
            subtitle: "Onde está o dinheiro grosso",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Empresas gastam muito com mimos para funcionários e clientes. Um pedido pode valer por um mês inteiro de vendas.</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="font-bold text-white mb-2">👔 Quem abordar:</p>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>• Salões de Beleza (Dia da Mulher, Natal).</li>
                            <li>• Consultórios Médicos/Odontológicos.</li>
                            <li>• Imobiliárias (presente de chaves).</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            icon: Calendar,
            title: "Clube da Assinatura",
            subtitle: "Previsibilidade de caixa",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Transforme clientes eventuais em fixos.</p>
                    <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-white/90">
                        <p className="font-bold mb-1">📦 O "Cookie Box":</p>
                        <p className="text-sm opacity-80">Por R$ X/mês, o cliente recebe 4 cookies toda sexta-feira. Cobrança automática no PIX.</p>
                    </div>
                </div>
            )
        },
        {
            icon: Gift,
            title: "Kits Presenteáveis",
            subtitle: "Aumente o ticket médio",
            color: "text-pink-400",
            bg: "bg-pink-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Cookie sozinho é lanche. Cookie na caixa bonita é presente.</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>• Tenha sempre fitas e adesivos bonitos.</li>
                            <li>• Crie combos: "Caixa Love" (2 Red Velvet + Bilhete).</li>
                            <li>• Em datas comemorativas, dobre o preço só pela embalagem temática.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            icon: Megaphone,
            title: "Micro-Influenciadores",
            subtitle: "Marketing de graça (Permuta)",
            color: "text-red-400",
            bg: "bg-red-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Não pague blogueira grande! Procure quem tem 2k a 10k seguidores no seu bairro.</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="font-bold text-white mb-2">🗣️ O Script de Abordagem:</p>
                        <p className="text-sm italic text-white/70">"Oi [Nome]! Sou fã do seu perfil. Queria te mandar uma caixa degustação dos meus cookies para você conhecer. Se gostar e quiser postar, vou amar! Posso deixar aí hoje?"</p>
                    </div>
                </div>
            )
        },
        {
            icon: Store,
            title: "Feiras e Eventos",
            subtitle: "Apareça para quem não te conhece",
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Participe de feiras de condomínio, bazar de escola ou eventos de rua.</p>
                    <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 text-white/90">
                        <p className="mb-2"><strong>🎪 O Segredo da Barraca Cheia:</strong></p>
                        <ul className="list-disc list-inside space-y-1 text-sm opacity-80">
                            <li>Tenha provinha grátis (corte o cookie em 8).</li>
                            <li>Leve um forno elétrico só pelo cheiro (venda sensitiva).</li>
                            <li>QR Code grandão pro Instagram e PIX.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            icon: Star,
            title: "Cartão Fidelidade",
            subtitle: "O cliente vicia em completar",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Gamifique a compra. O ser humano odeia deixar coisas incompletas.</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <p className="text-xl font-bold text-yellow-500 mb-2">Compre 10, Ganhe 1</p>
                        <p className="text-sm text-white/70">Imprima cartõezinhos baratinhos na gráfica. A cada compra, um carimbo ou assinatura sua.</p>
                    </div>
                </div>
            )
        },
        {
            icon: PlusCircle,
            title: "Técnica do 'Já Que'",
            subtitle: "Aumente o lucro sem esforço",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Upsell básico. O cliente já abriu a carteira, ofereça algo a mais.</p>
                    <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-white/90">
                        <p className="font-bold mb-2">💬 O que falar:</p>
                        <ul className="space-y-2 text-sm italic opacity-80">
                            <li>"Já que você pediu 2, leva 3 por apenas R$ XX a mais?"</li>
                            <li>"Aceita uma água ou café pra acompanhar?" (Margem altíssima)</li>
                            <li>"Quer colocar numa caixinha de presente por + R$ 5,00?"</li>
                        </ul>
                    </div>
                </div>
            )
        }
    ];

    return (
        <Layout>
            <header className="mb-10 mt-6 animate-float">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2 leading-tight">
                    Estratégias <br />
                    <span className="bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">de Crescimento</span> 📈
                </h1>
                <p className="text-white/60 text-lg font-light">Como sair da cozinha e virar empresária.</p>
            </header>

            <div className="space-y-4 pb-24">
                {strategies.map((strategy, index) => (
                    <GlassCard
                        key={index}
                        className={`!bg-gradient-to-br !from-white/5 !to-transparent !border-white/5 overflow-hidden transition-all duration-500 ${openStrategy === index ? 'ring-1 ring-green-400/30' : ''}`}
                        onClick={() => toggleStrategy(index)}
                    >
                        <div className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-2xl ${strategy.bg} ${strategy.color} shadow-lg shadow-black/20`}>
                                    <strategy.icon size={28} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-lg text-white/90 leading-tight">{strategy.title}</h3>
                                    <p className="text-sm text-white/50">{strategy.subtitle}</p>
                                </div>
                            </div>
                            <div className={`transition-transform duration-300 ${openStrategy === index ? 'rotate-180' : ''}`}>
                                <ChevronDown className="text-white/40" />
                            </div>
                        </div>

                        {openStrategy === index && (
                            <div className="mt-6 pt-6 border-t border-white/10 animate-fade-in">
                                {strategy.content}
                            </div>
                        )}
                    </GlassCard>
                ))}
            </div>
        </Layout>
    );
};

export default Strategies;
