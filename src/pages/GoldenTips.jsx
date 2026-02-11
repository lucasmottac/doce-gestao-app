import React, { useState } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import { Lightbulb, Thermometer, Snowflake, Clock, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';

const GoldenTips = () => {
    const [openTip, setOpenTip] = useState(0);

    const toggleTip = (index) => setOpenTip(openTip === index ? null : index);

    const tips = [
        {
            icon: Thermometer,
            title: "O Segredo da Temperatura",
            subtitle: "Por que seu cookie espalha demais?",
            color: "text-red-400",
            bg: "bg-red-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">A manteiga é a rainha do cookie. Se ela estiver derretida demais na hora de bater, seu cookie vai virar uma panqueca no forno.</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <ul className="space-y-3 text-sm text-white/70">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
                                <span><strong>Ponto Pomada:</strong> A manteiga deve estar fria, mas macia. Você aperta e o dedo marca, mas não afunda.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <AlertTriangle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                                <span><strong>Regra de Ouro:</strong> Nunca derreta a manteiga no microondas (a menos que a receita peça especificamente).</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            icon: Snowflake,
            title: "A Maturação Mágica",
            subtitle: "O sabor está no descanso",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Quer aquele sabor profundo de toffee/caramelo? Não asse direto!</p>
                    <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-white/90 italic">
                        "Deixe a massa descansar na geladeira por no mínimo 24h antes de assar. A farinha hidrata e os sabores explodem."
                    </div>
                    <p className="text-xs text-white/60">Dica: Você pode moldar as bolinhas e congelar cru. Dura 3 meses!</p>
                </div>
            )
        },
        {
            icon: Clock,
            title: "O Ponto Exato do Forno",
            subtitle: "Tire ANTES de parecer pronto",
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">O maior erro é deixar o cookie assar até ficar duro no forno.</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="font-bold text-white mb-2">🔥 Quando tirar:</p>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>1. As bordas estão douradas.</li>
                            <li>2. O centro ainda parece meio cru/mole.</li>
                        </ul>
                    </div>
                    <p className="text-sm text-orange-200">Ele termina de cozinhar no calor da própria forma fora do forno. Confia!</p>
                </div>
            )
        },
        {
            icon: Lightbulb,
            title: "Ingredientes Nobres",
            subtitle: "Onde não economizar",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Cookie é 80% ingredientes. Se usar chocolate hidrogenado (cobertura), vai ter gosto de gordura.</p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-3 rounded-lg text-center border border-white/5">
                            <span className="text-xl block mb-1">🍫</span>
                            <span className="text-xs text-white/70 font-bold">Use Sicao ou Melken</span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg text-center border border-white/5">
                            <span className="text-xl block mb-1">🧈</span>
                            <span className="text-xs text-white/70 font-bold">Manteiga Extra</span>
                        </div>
                    </div>
                    <p className="text-xs text-center text-white/40 mt-2">Jamais use margarina com menos de 80% de lipídeos.</p>
                </div>
            )
        },
        {
            icon: Snowflake,
            title: "Congelamento Lucrativo",
            subtitle: "Como ter cookie fresco todo dia",
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Não faça massa todo dia! Tire um dia para produzir e congele tudo.</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="font-bold text-white mb-2">🧊 Técnica Flash Freeze:</p>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>1. Modele as bolinhas e coloque numa assadeira (sem encostar).</li>
                            <li>2. Leve ao freezer por 2 horas até "pedrar".</li>
                            <li>3. Guarde tudo num saco Zip Lock.</li>
                        </ul>
                    </div>
                    <p className="text-sm text-cyan-200">Para assar: Do freezer direto pro forno! Só acrescente 2 minutos no tempo.</p>
                </div>
            )
        },
        {
            icon: AlertTriangle,
            title: "Química dos Açúcares",
            subtitle: "Crocante ou Puxa-Puxa?",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">O segredo da textura está na proporção dos açúcares. Não mude a receita sem saber isso:</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                            <div className="w-3 h-3 rounded-full bg-amber-700"></div>
                            <span className="text-sm text-white/80"><strong>Açúcar Mascavo:</strong> Traz umidade, cor e o "puxa-puxa" (chewy).</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                            <div className="w-3 h-3 rounded-full bg-stone-200"></div>
                            <span className="text-sm text-white/80"><strong>Açúcar Cristal/Refinado:</strong> Cria a borda crocante e estruturada.</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            icon: CheckCircle,
            title: "O Segredo da Altura",
            subtitle: "Estilo New York (Altão)",
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Seu cookie fica chato e fino? O erro está na modelagem.</p>
                    <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 text-white/90">
                        <p className="mb-2"><strong>🚀 Como resolver:</strong></p>
                        <ol className="list-decimal list-inside space-y-1 text-sm opacity-80">
                            <li>Faça bolinhas mais altas (tipo uma torre), não achatadas.</li>
                            <li>Massa estupidamente GELADA entra no forno QUENTE.</li>
                            <li>Não unte a forma com manteiga (ela derrete e espalha o cookie). Use papel manteiga.</li>
                        </ol>
                    </div>
                </div>
            )
        },
        {
            icon: Clock,
            title: "Parar o Cozimento",
            subtitle: "Não deixe secar!",
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">O cookie continua assando na forma quente depois que sai do forno.</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <p className="text-white font-bold mb-2">O Resfriamento Perfeito:</p>
                        <p className="text-sm text-white/70">Deixe 5 a 10 minutos na forma (para firmar) e depois OBRIGATORIAMENTE passe para uma grade ou prato frio.</p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <Layout>
            <header className="mb-10 mt-6 animate-float">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2 leading-tight">
                    Dicas de <br />
                    <span className="bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">Ouro Puro</span> 💡
                </h1>
                <p className="text-white/60 text-lg font-light">Segredos de chef que cursos caros não contam.</p>
            </header>

            <div className="space-y-4 pb-24">
                {tips.map((tip, index) => (
                    <GlassCard
                        key={index}
                        className={`!bg-gradient-to-br !from-white/5 !to-transparent !border-white/5 overflow-hidden transition-all duration-500 ${openTip === index ? 'ring-1 ring-yellow-400/30' : ''}`}
                        onClick={() => toggleTip(index)}
                    >
                        <div className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-2xl ${tip.bg} ${tip.color} shadow-lg shadow-black/20`}>
                                    <tip.icon size={28} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-lg text-white/90 leading-tight">{tip.title}</h3>
                                    <p className="text-sm text-white/50">{tip.subtitle}</p>
                                </div>
                            </div>
                            <div className={`transition-transform duration-300 ${openTip === index ? 'rotate-180' : ''}`}>
                                <ChevronDown className="text-white/40" />
                            </div>
                        </div>

                        {openTip === index && (
                            <div className="mt-6 pt-6 border-t border-white/10 animate-fade-in">
                                {tip.content}
                            </div>
                        )}
                    </GlassCard>
                ))}
            </div>
        </Layout>
    );
};

export default GoldenTips;
