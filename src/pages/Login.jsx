import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { Cookie } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { signInWithEmail } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { error } = await signInWithEmail(email, password);
            if (error) throw error;
            navigate('/dashboard');
        } catch (error) {
            setError('Erro ao fazer login: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src="/cookie_dark_chocolate_1770262038297.png" className="w-full h-full object-cover opacity-60 scale-110 blur-sm" alt="Background" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#050505]/80 to-[#050505]"></div>
            </div>

            <div className="w-full max-w-sm relative z-10 animate-float">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-tr from-primary to-primary-glow rounded-2xl rotate-3 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(218,69,95,0.6)] border border-white/20">
                        <Cookie size={40} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-center mb-2 drop-shadow-lg">Doce Gestão</h1>
                    <p className="text-white/60 text-sm font-light tracking-widest uppercase">Premium Edition</p>
                </div>

                <GlassCard className="!bg-black/40 !backdrop-blur-3xl !border-white/5">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-bold text-white/40 mb-2 uppercase tracking-wide">E-mail Profissional</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border-b border-white/10 rounded-t-lg p-4 text-white placeholder-white/20 focus:border-primary focus:bg-white/10 focus:outline-none transition-all"
                                placeholder="chef@docegestao.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/40 mb-2 uppercase tracking-wide">Senha de Acesso</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border-b border-white/10 rounded-t-lg p-4 text-white placeholder-white/20 focus:border-primary focus:bg-white/10 focus:outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-primary to-primary-glow text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_-5px_rgba(218,69,95,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Entrando...' : 'Acessar Painel'}
                        </button>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
};

export default Login;
