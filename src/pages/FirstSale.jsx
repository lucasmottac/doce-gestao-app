import React, { useState } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import { Target, MessageCircle, CheckCircle, Package, Copy, ChevronDown, ChevronUp, Camera, DollarSign, ShieldAlert, Users } from 'lucide-react';

const FirstSale = () => {
    const [openStep, setOpenStep] = useState(0);

    const toggleStep = (index) => setOpenStep(openStep === index ? null : index);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Texto copiado! Agora é só colar no WhatsApp.');
    };

    const steps = [
        {
            icon: Camera,
            title: "PASSO 1: O Clique Perfeito",
            subtitle: "Antes de vender, tem que dar fome",
            color: "text-purple-400",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Ninguém compra comida feia. Siga este checklist rápido:</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <ul className="space-y-3 text-sm text-white/70">
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Vá para perto de uma janela (Luz Natural).</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Limpe a câmera do celular (parece bobo, mas muda tudo).</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Quebre um cookie ao meio para mostrar o recheio.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            icon: Target,
            title: "PASSO 2: A Lista de Ouro",
            subtitle: "Para quem você vai vender?",
            color: "text-red-400",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Você não vai sair vendendo para desconhecidos na rua agora. Vamos vender para quem já confia em você.</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="font-bold text-white mb-2">✅ Tarefa Agora:</p>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>1. Pegue papel e caneta.</li>
                            <li>2. Liste 5 pessoas da sua família.</li>
                            <li>3. Liste 5 amigos próximos.</li>
                            <li>4. Liste 3 vizinhos ou colegas de trabalho.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            icon: DollarSign,
            title: "PASSO 3: O Pagamento Fácil",
            subtitle: "Não dê chance pro cliente desistir",
            color: "text-emerald-400",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Tenha sua chave PIX copiada e salva no bloco de notas do celular. Se o cliente pedir a conta e você demorar 5 minutos pra achar, ele desiste.</p>
                    <p className="text-xs text-yellow-200 bg-yellow-400/10 p-3 rounded-lg border border-yellow-400/20">
                        💡 Dica: Cadastre uma chave aleatória ou celular. Evite usar CPF para clientes desconhecidos no futuro.
                    </p>
                </div>
            )
        },
        {
            icon: MessageCircle,
            title: "PASSO 4: A Mensagem Irresistível",
            subtitle: "O que mandar no WhatsApp?",
            color: "text-green-400",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Não mande "Oi, quer comprar cookie?". Isso é chato. Use a técnica da <strong>Escassez</strong> e <strong>Exclusividade</strong>.</p>
                    <p className="text-sm text-white/50">Copie e mande esse texto exato (só mude o sabor):</p>

                    <div className="relative group">
                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-white/90 italic pr-12">
                            "Oiii! ❤️ Tudo bem?
                            <br /><br />
                            Acabei de tirar do forno uma leva exclusiva de Cookies de <strong>Red Velvet</strong>. O cheiro tá incrível aqui! 🤤
                            <br /><br />
                            Separei 3 unidades que sobraram, quer que eu guarde uma pra você provar antes que acabe?"
                        </div>
                        <button
                            onClick={() => copyToClipboard("Oiii! ❤️ Tudo bem?\n\nAcabei de tirar do forno uma leva exclusiva de Cookies de Red Velvet. O cheiro tá incrível aqui! 🤤\n\nSeparei 3 unidades que sobraram, quer que eu guarde uma pra você provar antes que acabe?")}
                            className="absolute top-2 right-2 p-2 bg-green-500 rounded-lg text-white hover:bg-green-400 transition-colors shadow-lg"
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                    <p className="text-xs text-center text-white/40">👆 Clique no botão verde para copiar</p>
                </div>
            )
        },
        {
            icon: ShieldAlert,
            title: "PASSO 5: E se acharem caro?",
            subtitle: "Como contornar objeções",
            color: "text-orange-400",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Se alguém disser "Nossa, R$ 12,00 num cookie?", não se ofenda. Responda com valor:</p>
                    <div className="relative group">
                        <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl text-white/90 italic pr-12">
                            "Eu entendo! É que não é um biscoito comum de mercado. Eu uso chocolate nobre 70% e manteiga extra. Um desse na Starbucks custa R$ 18,00 e o meu é fresquinho!"
                        </div>
                        <button
                            onClick={() => copyToClipboard("Eu entendo! É que não é um biscoito comum de mercado. Eu uso chocolate nobre 70% e manteiga extra. Um desse na Starbucks custa R$ 18,00 e o meu é fresquinho!")}
                            className="absolute top-2 right-2 p-2 bg-orange-500 rounded-lg text-white hover:bg-orange-400 transition-colors shadow-lg"
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                </div>
            )
        },
        {
            icon: Package,
            title: "PASSO 6: A Entrega",
            subtitle: "Como encantar o cliente",
            color: "text-yellow-400",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">A primeira impressão é a que fica. Mesmo que não tenha embalagem cara, faça com capricho.</p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-3 rounded-lg text-center border border-white/5">
                            <span className="text-2xl block mb-1">🎁</span>
                            <span className="text-xs text-white/70">Laço ou barbante</span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg text-center border border-white/5">
                            <span className="text-2xl block mb-1">💌</span>
                            <span className="text-xs text-white/70">Bilhete a mão</span>
                        </div>
                    </div>
                    <p className="text-sm text-yellow-200 bg-yellow-400/10 p-3 rounded-lg border border-yellow-400/20">
                        💡 Dica: Escreva "Feito especialmente para [Nome da Pessoa]" na embalagem.
                    </p>
                </div>
            )
        },
        {
            icon: CheckCircle,
            title: "PASSO 7: O Pós-Venda",
            subtitle: "Garantindo a recompra",
            color: "text-blue-400",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">No dia seguinte, mande essa mensagem:</p>
                    <div className="relative group">
                        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-white/90 italic pr-12">
                            "E aí, o que achou do cookie? 🥰 Se gostou, posta uma foto e me marca? Me ajuda muito!"
                        </div>
                        <button
                            onClick={() => copyToClipboard("E aí, o que achou do cookie? 🥰 Se gostou, posta uma foto e me marca? Me ajuda muito!")}
                            className="absolute top-2 right-2 p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-400 transition-colors shadow-lg"
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                </div>
            )
        },
        {
            icon: Users,
            title: "PASSO 8: Multiplicação",
            subtitle: "Como conseguir novos clientes de graça",
            color: "text-pink-400",
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Se o cliente elogiou, é a hora de pedir indicação!</p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="font-bold text-white mb-2">🚀 A Oferta Viral:</p>
                        <p className="text-sm text-white/70 italic">"Fulano, fico feliz que gostou! Se você indicar 2 amigos que comprarem, seu próximo cookie sai com 50% de desconto. Topa?"</p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <Layout>
            <header className="mb-10 mt-6 animate-float">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2 leading-tight">
                    Tutorial: <br />
                    <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Minha 1ª Venda</span> 💰
                </h1>
                <p className="text-white/60 text-lg font-light">Siga este passo-a-passo exato para lucrar hoje.</p>
            </header>

            <div className="space-y-4 pb-24">
                {steps.map((step, index) => (
                    <GlassCard
                        key={index}
                        className={`!bg-gradient-to-br !from-white/5 !to-transparent !border-white/5 overflow-hidden transition-all duration-500 ${openStep === index ? 'ring-1 ring-primary/50' : ''}`}
                        onClick={() => toggleStep(index)}
                    >
                        <div className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-2xl bg-white/5 ${step.color} shadow-lg shadow-black/20 text-white`}>
                                    <step.icon size={28} className={step.color} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-lg text-white/90 leading-tight">{step.title}</h3>
                                    <p className="text-sm text-white/50">{step.subtitle}</p>
                                </div>
                            </div>
                            <div className={`transition-transform duration-300 ${openStep === index ? 'rotate-180' : ''}`}>
                                <ChevronDown className="text-white/40" />
                            </div>
                        </div>

                        {openStep === index && (
                            <div className="mt-6 pt-6 border-t border-white/10 animate-fade-in">
                                {step.content}
                            </div>
                        )}
                    </GlassCard>
                ))}
            </div>
        </Layout>
    );
};

export default FirstSale;
