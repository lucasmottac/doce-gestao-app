import React, { useState } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import { Copy, Instagram, MessageCircle, ShieldAlert, ChevronDown, Rocket, Sparkles } from 'lucide-react';

const SalesKit = () => {
    const [openSection, setOpenSection] = useState(0);

    const toggleSection = (index) => setOpenSection(openSection === index ? null : index);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copiado! Agora é só colar.');
    };

    const sections = [
        {
            icon: Instagram,
            title: "Instagram Magnético",
            subtitle: "Legendas que dão fome",
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            scripts: [
                {
                    label: "🔥 Story de Bastidores (Gera Desejo)",
                    text: "Gente, sério... o cheiro que tá nessa cozinha hoje é covardia! 🤤 Acabei de tirar uma fornada de [Sabor]. Quem avisa amigo é: vai acabar rápido. 🏃‍♀️"
                },
                {
                    label: "📸 Legenda para Foto (Venda)",
                    text: "Não é só um cookie. É [Sabor] com chocolate nobre e aquela textura que você sonha. 🍪✨\n\nMarque aqui quem te deve um desses hoje! 👇\n\n(Link de pedidos na bio)"
                },
                {
                    label: "👀 Enquete (Engajamento)",
                    text: "Dúvida cruel do dia: Qual sabor não pode faltar na próxima fornada? \n\nVote aqui: \n🅰️ Red Velvet \n🅱️ Pistache\n\n(Vote no sticker!)"
                },
                {
                    label: "💬 Depoimento (Prova Social)",
                    text: "'O melhor cookie que já comi na vida!' 😭❤️\n\nReceber esse carinho de vocês não tem preço! Esse feedback é da [Nome da Cliente]. \n\nAinda não provou? Pede o seu e me conta se ela tem razão! 👇"
                }
            ]
        },
        {
            icon: MessageCircle,
            title: "WhatsApp Lucrativo",
            subtitle: "Scripts para fechar venda agora",
            color: "text-green-500",
            bg: "bg-green-500/10",
            scripts: [
                {
                    label: "⚡ Lista VIP (Fornada Quente)",
                    text: "Oiii [Nome]! ❤️\n\nPassando só pra VIPs: Acabei de assar Cookies de Nutella. Estão quentinhos! 🔥\n\nComo você ama esse sabor, te avisei antes de postar no Insta. Quer que eu separe quantos pra você?"
                },
                {
                    label: "👻 Recuperar 'Sumidos'",
                    text: "Oii [Nome]! Saudade! 🥰\n\nFaz tempo que você não se mima com um doce, hein? \n\nAproveita que hoje tem entrega grátis no seu bairro para pedidos acima de 3 unidades. Bora aproveitar?"
                },
                {
                    label: "⭐️ Pedir Feedback (Pós-Venda)",
                    text: "E aí [Nome], tudo bem? 😍\n\nMe conta, o que achou dos cookies? \n\nSe tiver um tempinho, posta uma fotinho e me marca? Me ajuda demais a divulgar! 🙏"
                },
                {
                    label: "🎂 Oferta Aniversário (Fidelidade)",
                    text: "Parabéns [Nome]! 🎉🥳\n\nVi que é seu mês! Cliente especial tem presente: na compra de 4 cookies pra sua festa (ou pra você mesmo rs), o 5º é por minha conta! 🎁"
                }
            ]
        },
        {
            icon: ShieldAlert,
            title: "Quebra de Objeções",
            subtitle: "O que responder quando...",
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            scripts: [
                {
                    label: "💸 'Achei caro'",
                    text: "Entendo total! É que qualidade tem preço, né? 😉 Eu uso chocolate belga autêntico e manteiga extra, nada industrializado. É uma experiência, não só um biscoito. Quem prova fala que vale cada centavo! Quer provar um menorzinho pra conhecer?"
                },
                {
                    label: "🛵 'Entrega é paga?'",
                    text: "Sim, a taxa vai integral para o motoboy que leva seu doce com todo cuidado pra chegar perfeito! 🏍️ Mas ó, pedindo X unidades eu consigo te dar um desconto pra ajudar na taxa. Que tal?"
                },
                {
                    label: "🤔 'Só vende caixa?'",
                    text: "Vendo unidade também! Mas te conto um segredo: a caixa com 4 sai mais barato e você consegue provar mais sabores. Quer que eu monte uma mista pra você?"
                }
            ]
        }
    ];

    return (
        <Layout>
            <header className="mb-10 mt-6 animate-float">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2 leading-tight">
                    Kit de <br />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Vendas Pro</span> 🚀
                </h1>
                <p className="text-white/60 text-lg font-light">Copie, cole e veja o PIX cair.</p>
            </header>

            <div className="space-y-4 pb-24">
                {sections.map((section, index) => (
                    <GlassCard
                        key={index}
                        className={`!bg-gradient-to-br !from-white/5 !to-transparent !border-white/5 overflow-hidden transition-all duration-500 ${openSection === index ? 'ring-1 ring-white/20' : ''}`}
                        onClick={() => toggleSection(index)}
                    >
                        <div className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-2xl ${section.bg} ${section.color} shadow-lg shadow-black/20`}>
                                    <section.icon size={28} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-lg text-white/90 leading-tight">{section.title}</h3>
                                    <p className="text-sm text-white/50">{section.subtitle}</p>
                                </div>
                            </div>
                            <div className={`transition-transform duration-300 ${openSection === index ? 'rotate-180' : ''}`}>
                                <ChevronDown className="text-white/40" />
                            </div>
                        </div>

                        {openSection === index && (
                            <div className="mt-6 pt-2 space-y-8 animate-fade-in border-t border-white/5">
                                {section.scripts.map((script, sIndex) => (
                                    <div key={sIndex} className="relative">
                                        <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 flex items-center gap-1">
                                            <Sparkles size={10} className={section.color} /> {script.label}
                                        </p>
                                        <div className="bg-black/30 rounded-xl p-4 border border-white/5 shadow-inner">
                                            <p className="text-white/90 text-sm italic leading-relaxed whitespace-pre-line">
                                                "{script.text}"
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyToClipboard(script.text);
                                            }}
                                            className={`mt-3 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all active:scale-[0.98] ${section.bg} ${section.color} hover:contrast-125 border border-white/5`}
                                        >
                                            <Copy size={16} /> Copiar Texto
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </GlassCard>
                ))}
            </div>
        </Layout>
    );
};

export default SalesKit;
