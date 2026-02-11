
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TriangleAlert, Clock as ClockIcon, Flame, Cookie, ArrowRight, Star,
    Sparkles, Lock, ShieldCheck, Smartphone, Play, Gamepad2,
    Apple, TrendingUp, CircleCheck, Heart, Award, BookOpen,
    Gift, Calculator, MessageCircle, Lightbulb, Rocket, ChefHat,
    Timer as TimerIcon, Crown, X, Instagram, CircleHelp, ChevronDown, Shield, User
} from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    console.log('Rendering LandingPage');
    const navigate = useNavigate();

    // Timer Logic
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // FAQ Logic
    const [openFaq, setOpenFaq] = useState(null);
    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="landing-page-body">
            {/* Top Bar */}
            <div className="top-bar-sticker">
                <div className="top-bar-container">
                    <div className="timer-group">
                        <span className="timer-label">
                            <TriangleAlert className="icon-danger" /> OFERTA EXPIRA EM:
                        </span>
                        <div className="timer-pill">
                            <ClockIcon className="icon-clock" />
                            <span className="timer">{formatTime(timeLeft)}</span>
                        </div>
                    </div>

                    <div className="slots-pill">
                        <Flame className="icon-flame" />
                        <span>RESTAM APENAS <span className="highlight-pink">5 VAGAS</span>!</span>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="ml-4 px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-bold text-white transition-all flex items-center gap-2"
                    >
                        <User size={12} /> ÁREA DO ALUNO
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <header className="hero">
                <div className="container">
                    <div className="badge-pill">
                        <Cookie size={12} fill="currentColor" /> Método exclusivo de Cookies Americanos
                    </div>

                    <h1 className="main-title">
                        Transforme sua cozinha<br />
                        em uma<br />
                        <span className="text-pink">Vitrine de renda alta</span>
                    </h1>

                    <p className="sub-headline">
                        Mesmo para quem é <span className="text-pink">totalmente iniciante</span> e nunca assou um cookie na vida.
                        Fature de <strong>R$ 200 a R$ 500 de lucro por dia</strong> com receitas de alta demanda.
                    </p>

                    <a href="#pricing" className="cta-button">
                        QUERO FATURAR COM COOKIES <ArrowRight />
                    </a>

                    <div className="social-proof">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <Star key={i} fill="currentColor" className="star-filled" />
                            ))}
                        </div>
                        <span className="rating-text">4.9/5</span>
                    </div>

                    <div className="trust-badges">
                        <span><Sparkles /> Acesso Imediato</span>
                        <span className="dot">•</span>
                        <span><Lock /> Pagamento seguro</span>
                        <span className="dot">•</span>
                        <span><ShieldCheck /> Garantia de 7 dias</span>
                    </div>

                    <div className="hero-image-container">
                        <div className="glow-effect"></div>
                        <img src="/landing-assets/hero-cookies.png" alt="Cookies Americanos" className="hero-image" />
                        <div className="floating-badge">
                            <Sparkles className="badge-icon" />
                            <span>O Doce Mais Vendido do Mundo</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* App Section */}
            <section className="app-section">
                <div className="container">
                    <div className="badge-pill-outline">
                        <Smartphone /> CONHEÇA O APLICATIVO
                    </div>

                    <h2 className="section-title">
                        O Segredo do<br />
                        <span className="text-pink">Cookie Perfeito</span><br />
                        <span className="text-pink">Agora no Seu Bolso</span>
                    </h2>

                    <p className="section-description">
                        Tenha acesso às receitas dos famosos cookies 'Levain' de Nova York, passo a passo<br />
                        em vídeo e suporte direto. <span className="text-pink">Sua fábrica de cookies na palma da mão.</span>
                    </p>

                    <div className="phone-mockup-container">
                        <img src="/landing-assets/app-mockup-cookies.png" alt="App Preview" className="phone-mockup" />
                        <div className="play-button-overlay">
                            <div className="play-button">
                                <Play fill="currentColor" />
                            </div>
                        </div>
                        <div className="video-caption">Toque para assistir</div>
                    </div>

                    <p className="download-text">Disponível para download em</p>

                    <div className="download-buttons">
                        <div className="store-button">
                            <Gamepad2 />
                            <div className="store-info">
                                <span className="small-text">Disponível no</span>
                                <span className="store-name">Android</span>
                            </div>
                        </div>
                        <div className="store-button">
                            <Apple />
                            <div className="store-info">
                                <span className="small-text">Disponível na</span>
                                <span className="store-name">App Store</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why It Works Section */}
            <section className="why-works-section">
                <div className="container">
                    <div className="badge-pill-outline">
                        <Sparkles /> O Mecanismo Secreto
                    </div>

                    <h2 className="section-title">
                        Por Que Funciona<br />
                        <span className="text-pink">Para Qualquer Pessoa</span>
                    </h2>

                    <p className="section-description">
                        Não é mágica. É um <span className="text-pink">método testado</span> que transforma ingredientes simples em
                        lucro real.
                    </p>

                    <div className="why-works-grid">
                        <div className="images-column">
                            <div className="image-grid">
                                <img src="/landing-assets/grid-cookie-1.png" alt="Red Velvet Cookie" className="grid-img img-1" />
                                <img src="/landing-assets/grid-cookie-2.png" alt="Pistache Cookie" className="grid-img img-2" />
                                <div className="floating-badge badge-margin">
                                    <TrendingUp className="badge-icon" />
                                    <span>Margem de 300%+</span>
                                </div>
                            </div>
                        </div>

                        <div className="content-column">
                            <ul className="benefits-list">
                                <li className="benefit-item">
                                    <div className="check-icon"><CircleCheck /></div>
                                    <span>Assa em 12 minutos (Ultra Rápido)</span>
                                </li>
                                <li className="benefit-item">
                                    <div className="check-icon"><CircleCheck /></div>
                                    <span>Pode congelar a massa por 3 meses</span>
                                </li>
                                <li className="benefit-item">
                                    <div className="check-icon"><CircleCheck /></div>
                                    <span>Baixo custo, Alta margem de lucro</span>
                                </li>
                                <li className="benefit-item">
                                    <div className="check-icon"><CircleCheck /></div>
                                    <span>Vende fácil no Delivery e Instagram</span>
                                </li>
                                <li className="benefit-item">
                                    <div className="check-icon"><CircleCheck /></div>
                                    <span>Não precisa de batedeira planetária</span>
                                </li>
                                <li className="benefit-item">
                                    <div className="check-icon"><CircleCheck /></div>
                                    <span>Alta procura o ano inteiro</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emotional Connection Section */}
            <section className="emotional-section">
                <div className="container">
                    <div className="badge-pill-outline">
                        <Heart /> PARA PESSOAS COMO VOCÊ
                    </div>

                    <h2 className="section-title">
                        Você Sente Que <span className="text-pink">Merece Mais</span>
                    </h2>

                    <p className="section-description">
                        Você sempre soube que tinha <span className="text-pink">potencial para brilhar</span>. Às vezes, só falta o
                        caminho certo para mostrar ao mundo o que você é capaz de criar.
                    </p>

                    <div className="marquee-container">
                        <div className="marquee-content">
                            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((num, i) => (
                                <img
                                    key={i}
                                    src={num === 3 ? "/landing-assets/hero-cookies.png" : `/landing-assets/marquee-${num}.png`}
                                    alt="Cookie"
                                    className="marquee-img"
                                />
                            ))}
                        </div>
                        <div className="marquee-overlay-left"></div>
                        <div className="marquee-overlay-right"></div>
                    </div>

                    <div className="emotional-list">
                        <div className="emotion-pill">
                            <Sparkles /> <strong>Você já imaginou...</strong> Clientes pedindo antes mesmo de postar
                        </div>
                        <div className="emotion-pill">
                            <Heart /> <strong>Aquela sensação...</strong> De ver seu trabalho sendo reconhecido
                        </div>
                        <div className="emotion-pill">
                            <Star /> <strong>Finalmente...</strong> Ter orgulho do que você cria
                        </div>
                    </div>

                    <div className="quote-block">
                        "Pessoas como você, que buscam qualidade e dedicação, <span className="text-pink">sempre conseguem
                            resultados extraordinários</span> quando encontram o método certo."
                    </div>
                </div>
            </section>

            {/* Curriculum Section */}
            <section className="curriculum-section">
                <div className="container">
                    <div className="badge-pill-outline">
                        <BookOpen /> Conteúdo Completo
                    </div>

                    <h2 className="section-title">
                        O que você vai <br />
                        <span className="text-pink">aprender</span>
                    </h2>

                    <p className="section-description">
                        6 módulos práticos com mais de 30 aulas em vídeo para você dominar a arte dos Cookies Americanos (NY
                        Style) de alta conversão.
                    </p>

                    <div className="modules-grid">
                        {[
                            { num: '01', title: 'A Ciência do Cookie Perfeito', desc: 'Entenda a química por trás da massa: como deixar crocante por fora e macio por dentro (fudgy).', aulas: 8, horas: '2h 30min' },
                            { num: '02', title: 'Cookies Clássicos & Gota de Chocolate', desc: 'O carro-chefe das vendas. Aprenda o Clássico com gotas de chocolate belga que vende todo dia.', aulas: 12, horas: '3h 45min' },
                            { num: '03', title: 'Cookies Recheados (Stuffed)', desc: 'Aprenda a técnica correta para rechear com Nutella, Doce de Leite e Brigadeiro sem vazar no forno.', aulas: 10, horas: '3h 15min' },
                            { num: '04', title: 'Red Velvet & Especiais', desc: 'Receitas luxuosas como Red Velvet com Cream Cheese, Pistache e Dark Chocolate com Flor de Sal.', aulas: 8, horas: '2h 00min' },
                            { num: '05', title: 'Precificação Lucrativa', desc: 'A matemática do lucro: como calcular seus custos e definir preços que geram margem de 300% ou mais.', aulas: 5, horas: '1h 30min' },
                            { num: '06', title: 'Vitrine que Vende', desc: 'Apresentação, embalagem e fotos que fazem seus doces parecerem irresistíveis nas redes sociais.', aulas: 6, horas: '1h 45min' }
                        ].map((mod, i) => (
                            <div key={i} className="module-card">
                                <div className="card-header">
                                    <div className="play-icon-box">
                                        <Play fill="white" />
                                    </div>
                                    <span className="watermark-number">{mod.num}</span>
                                </div>
                                <h3>{mod.title}</h3>
                                <p>{mod.desc}</p>
                                <div className="card-meta">
                                    <span><BookOpen /> {mod.aulas} aulas</span>
                                    <span><ClockIcon /> {mod.horas}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="curriculum-stats">
                        <div className="stat-item">
                            <Award className="stat-icon-large" />
                            <div className="stat-text">
                                <strong>49+</strong>
                                <span>Aulas em vídeo</span>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <ClockIcon className="stat-icon-large" />
                            <div className="stat-text">
                                <strong>15h+</strong>
                                <span>De conteúdo</span>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <BookOpen className="stat-icon-large" />
                            <div className="stat-text">
                                <strong>Vitalício</strong>
                                <span>Acesso ao curso</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bonus Section */}
            <section className="bonus-section">
                <div className="container">
                    <div className="badge-pill-outline">
                        <Gift /> Bônus Exclusivos
                    </div>

                    <h2 className="section-title">
                        Bônus Irresistíveis <br />
                        <span className="text-pink">que Turbinam Seu Lucro</span>
                    </h2>

                    <p className="section-description">
                        Além do curso completo, você ganha acesso exclusivo ao <strong>Aplicativo Oficial</strong> com
                        ferramentas que valem mais que o próprio curso.
                        <span className="text-pink">Tudo isso grátis para alunos!</span>
                    </p>

                    <div className="bonus-grid">
                        <div className="bonus-card">
                            <div className="bonus-icon-box"><Calculator /></div>
                            <h3><span className="bonus-label">Bônus #1:</span> Calculadora de Lucro Automática</h3>
                            <p>Você nunca mais vai ter prejuízo. Coloque o preço dos ingredientes e o App calcula o custo exato, preço de venda e seu lucro na hora.</p>
                            <div className="price-tag"><span className="old-price">R$ 97</span> <span className="free-badge">APP EXCLUSIVO</span></div>
                        </div>
                        <div className="bonus-card">
                            <div className="bonus-icon-box"><MessageCircle /></div>
                            <h3><span className="bonus-label">Bônus #2:</span> Kit de Vendas Pro (Scripts)</h3>
                            <p>Copie e cole! Textos prontos para: "Instagram Magnético" (legendas que vendem), mensagens de WhatsApp para fechar pedidos e Quebra de Objeções.</p>
                            <div className="price-tag"><span className="old-price">R$ 147</span> <span className="free-badge">NO APP</span></div>
                        </div>
                        <div className="bonus-card">
                            <div className="bonus-icon-box"><Lightbulb /></div>
                            <h3><span className="bonus-label">Bônus #3:</span> Dicas de Ouro (Segredos de Chef)</h3>
                            <p>A área secreta do app com técnicas avançadas: maturação da massa (ficando saborosa), congelamento (flash freeze) e ponto perfeito do forno.</p>
                            <div className="price-tag"><span className="old-price">R$ 127</span> <span className="free-badge">NO APP</span></div>
                        </div>
                        <div className="bonus-card">
                            <div className="bonus-icon-box"><Rocket /></div>
                            <h3><span className="bonus-label">Bônus #4:</span> Guia da Primeira Venda 24h</h3>
                            <p>Um mapa passo a passo para você fazer sua primeira venda em menos de 24 horas, mesmo sem ter seguidores no Instagram.</p>
                            <div className="price-tag"><span className="old-price">R$ 67</span> <span className="free-badge">NO APP</span></div>
                        </div>
                        <div className="bonus-card">
                            <div className="bonus-icon-box"><ChefHat /></div>
                            <h3><span className="bonus-label">Bônus #5:</span> Receitas Especiais & Gourmet</h3>
                            <p>Módulo extra no app com receitas de Cookies Fit, Veganos e variações de luxo para atrair todo tipo de cliente.</p>
                            <div className="price-tag"><span className="old-price">R$ 97</span> <span className="free-badge">NO APP</span></div>
                        </div>
                        <div className="bonus-card">
                            <div className="bonus-icon-box"><TimerIcon /></div>
                            <h3><span className="bonus-label">Bônus #6:</span> Modo "Mãos na Massa" (Assistente)</h3>
                            <p>O App guia você passo-a-passo enquanto cozinha, com cronômetro integrado para não queimar nada. É como ter um chef ao seu lado!</p>
                            <div className="price-tag"><span className="old-price">R$ 197</span> <span className="free-badge">NO APP</span></div>
                        </div>
                    </div>

                    <a href="#pricing" className="big-cta-button">
                        <Sparkles /> Todos esses bônus são seus de GRAÇA ao garantir sua vaga agora!
                    </a>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="pricing-section">
                <div className="container">
                    <div className="pricing-grid">
                        <div className="pricing-card pro-card">
                            <div className="popular-badge">
                                <Crown /> MAIS ESCOLHIDO
                            </div>
                            <h3><Star fill="#e6c86e" className="text-gold" /> Plano Pro <Star fill="#e6c86e" className="text-gold" /></h3>

                            <div className="price-box">
                                <span className="price-strikethrough">De R$ 197</span>
                                <div className="price-main">
                                    R$ <span className="price-number">13,90</span>
                                </div>
                                <span className="price-subtitle">pagamento único • acesso vitalício</span>
                            </div>

                            <div className="save-pill">ECONOMIZE 92%</div>

                            <ul className="pricing-features">
                                <li className="feature-included"><CircleCheck /> 6 módulos completos (49+ aulas)</li>
                                <li className="feature-included"><CircleCheck /> Módulo Cookies Clássicos (NY Style)</li>
                                <li className="feature-included"><CircleCheck /> Módulo Cookies Recheados (Nutella)</li>
                                <li className="feature-included"><CircleCheck /> Módulo Cookies Especiais (Fit/Vegan)</li>
                                <li className="feature-included"><CircleCheck /> Calculadora Automática de Lucros</li>
                                <li className="feature-included"><CircleCheck /> Kit de Vendas (Scripts)</li>
                                <li className="feature-included"><CircleCheck /> Guia da Primeira Venda 24h</li>
                                <li className="feature-included"><CircleCheck /> Dicas de Ouro (Segredos de Chef)</li>
                                <li className="feature-included"><CircleCheck /> Atualizações Gratuitas + Certificado</li>
                                <li className="feature-included"><CircleCheck /> Acesso aos Bônus do App</li>
                            </ul>

                            <button onClick={handleLogin} className="cta-button full-width">
                                QUERO O PLANO PRO <ArrowRight />
                            </button>

                            <div className="secure-badge">
                                <span><ShieldCheck /> Compra segura</span>
                                <span><ClockIcon /> Acesso imediato</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="badge-pill-outline">
                        <Instagram /> Direto do Instagram <Heart fill="#d44d6a" className="heart-icon" />
                    </div>

                    <h2 className="section-title">
                        Mulheres Reais, <br />
                        <span className="text-pink">Resultados Reais</span>
                    </h2>

                    <p className="section-description">
                        Histórias de quem <span className="text-pink">transformou a cozinha em fonte de renda</span> e descobriu que
                        o segredo estava no método certo.
                    </p>

                    <div className="testimonials-grid">
                        {[
                            { name: 'Márcia Silva de Paula', handle: '@marciasilvadepaula', loc: 'São Paulo, SP', tag: 'Renda extra garantida', text: '"Minha primeira fornada de Cookies Red Velvet vendeu em 2 horas! O cheiro incendiou o prédio todo."', avatar: '1', color: 'red-tag' },
                            { name: 'Cássia Oliveira', handle: '@cassiaoliveira8604', loc: 'Rio de Janeiro, RJ', tag: 'Ficou perfeito', text: '"O cookie de Nutella com Ninho é o carro chefe aqui. Cliente compra um e volta pra buscar a caixa."', avatar: '2', color: 'pink-tag' },
                            { name: 'Camila Helena', handle: '@camilahelena5336', loc: 'Belo Horizonte, MG', tag: 'Primeira vez de sucesso', text: '"Sempre tive medo de cookie ficar duro, mas com essa técnica eles ficam puxa-puxa igual dos EUA! 💕"', avatar: '3', color: 'purple-tag' }
                        ].map((test, i) => (
                            <div key={i} className="testimonial-card">
                                <div className="testimonial-inner">
                                    <div className="user-header">
                                        <img src={`/landing-assets/avatar${test.avatar}.png`} alt={test.name} className="user-avatar" />
                                        <div className="user-info">
                                            <h4>{test.name}</h4>
                                            <span className="user-handle">{test.handle}</span>
                                            <span className="user-location"><span className="status-dot"></span> {test.loc}</span>
                                        </div>
                                        <Instagram className="insta-icon" />
                                    </div>
                                    <div className={`tag-badge ${test.color}`}><Star /> {test.tag}</div>
                                    <p className="testimonial-text">{test.text}</p>
                                    <div className="testimonial-rating">
                                        {[1, 2, 3, 4, 5].map((_, starI) => <Star key={starI} fill="#e6c86e" />)}
                                        <span>Aluna verificada</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guarantee Section */}
            <section className="guarantee-section">
                <div className="container">
                    <div className="guarantee-card">
                        <div className="icon-glow">
                            <Shield width={48} height={48} />
                        </div>
                        <h2>Garantia Incondicional de 7 Dias</h2>
                        <p>
                            Você tem 7 dias para assistir às aulas, testar as receitas e ver se o método funciona para você. Se
                            por qualquer motivo não gostar, devolvemos <span className="text-pink">100% do seu dinheiro</span>.
                        </p>
                        <div className="guarantee-features">
                            <div className="feature-item"><CircleCheck className="text-pink" /> <span>Sem burocracia</span></div>
                            <div className="feature-item"><CircleCheck className="text-pink" /> <span>Sem perguntas</span></div>
                            <div className="feature-item"><CircleCheck className="text-pink" /> <span>Reembolso total</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="container">
                    <div className="section-badge">
                        <CircleHelp /> Perguntas Frequentes
                    </div>
                    <div className="section-title">
                        <h2>Ainda tem <span className="text-pink">dúvidas?</span></h2>
                    </div>

                    <div className="faq-list">
                        {[
                            { q: 'Preciso ter experiência em confeitaria?', a: 'Não! O curso foi desenhado para quem está começando do zero. Ensinamos tudo passo a passo.' },
                            { q: 'Preciso de equipamentos caros?', a: 'Definitivamente não. Você pode começar com o que já tem na sua cozinha.' },
                            { q: 'Em quanto tempo vou ver resultados?', a: 'Muitas alunas já começam a vender na primeira semana.' },
                            { q: 'Por quanto tempo tenho acesso?', a: 'O acesso ao curso é vitalício!' }
                        ].map((faq, i) => (
                            <div key={i} className={`faq-item ${openFaq === i ? 'active' : ''}`}>
                                <button className="faq-question" onClick={() => toggleFaq(i)}>
                                    <span>{faq.q}</span>
                                    <ChevronDown style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                </button>
                                <div className="faq-answer" style={{ maxHeight: openFaq === i ? '200px' : '0' }}>
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Last Call Section */}
            <section className="last-call-section">
                <div className="container">
                    <div className="last-call-badge">
                        <Sparkles /> Última chamada
                    </div>
                    <h2>Transforme sua cozinha <br /> <span className="text-white">em uma</span> <br /> <span className="text-pink">vitrine
                        de renda alta</span></h2>
                    <p>Comece hoje mesmo a fazer cookies que vendem todos os dias — <span className="text-pink">mesmo se
                        você morre de medo de errar</span>.</p>

                    <a href="#pricing" className="cta-button large pulse">
                        QUERO MINHA VAGA AGORA <ArrowRight />
                    </a>

                    <div className="security-row">
                        <span><Sparkles className="text-gold" /> Acesso imediato</span>
                        <span><Lock className="text-green" /> Pagamento 100% seguro</span>
                        <span><ShieldCheck className="text-gold" /> 7 dias de garantia</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="container">
                    <div className="footer-brand">
                        <span className="text-pink">Doces de Vitrine</span> Renda Extra
                    </div>
                    <p className="copyright">
                        &copy; 2026 Doces de Vitrine. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
