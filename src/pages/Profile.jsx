import React, { useState } from 'react';
import { User, LogOut, Lock, Mail, Edit2, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
const Profile = () => {
    const navigate = useNavigate();
    const { user, updatePassword, signOut } = useAuth();
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Local state for editing (if we were to update profile info in DB, we'd use this)
    const [userInfo, setUserInfo] = useState({
        email: user?.email || '',
        // Name would come from profiles table if we fetched it
    });

    const [passwords, setPasswords] = useState({
        new: '',
        confirm: ''
    });

    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveInfo = () => {
        setIsEditingInfo(false);
        // Here we would update the profiles table
        console.log('Info Saved:', userInfo);
    };

    const handleSavePassword = async () => {
        if (passwords.new !== passwords.confirm) {
            alert('As senhas não coincidem!');
            return;
        }

        if (passwords.new.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            const { error } = await updatePassword(passwords.new);
            if (error) throw error;

            alert('Senha alterada com sucesso!');
            setIsChangingPassword(false);
            setPasswords({ new: '', confirm: '' });
        } catch (error) {
            alert('Erro ao alterar senha: ' + error.message);
        }
    };

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <Layout>
            <div className="flex flex-col space-y-6 animate-fade-in pb-20">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-2">
                    <div className="bg-primary/20 p-4 rounded-full ring-2 ring-primary/50">
                        <User size={32} className="text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Meu Perfil</h1>
                        <p className="text-white/60 text-sm">Gerencie suas informações</p>
                    </div>
                </div>

                {/* Personal Info Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <User size={18} className="text-primary" /> Dados Pessoais
                        </h2>
                        {!isEditingInfo ? (
                            <button
                                onClick={() => setIsEditingInfo(true)}
                                className="text-xs font-bold text-primary hover:text-white bg-primary/10 hover:bg-primary px-3 py-1.5 rounded-lg transition-all"
                            >
                                EDITAR
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsEditingInfo(false)}
                                    className="text-xs font-bold text-white/60 hover:text-white px-3 py-1.5"
                                >
                                    CANCELAR
                                </button>
                                <button
                                    onClick={handleSaveInfo}
                                    className="text-xs font-bold text-white bg-green-500/20 hover:bg-green-500 px-3 py-1.5 rounded-lg transition-all text-green-400 hover:text-white"
                                >
                                    SALVAR
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Nome</label>
                            <input
                                type="text"
                                name="name"
                                disabled={!isEditingInfo}
                                className={`w-full bg-black/20 border ${isEditingInfo ? 'border-primary/50 text-white' : 'border-transparent text-white/70'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                                value={user.name}
                                onChange={handleInfoChange}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                disabled={!isEditingInfo}
                                className={`w-full bg-black/20 border ${isEditingInfo ? 'border-primary/50 text-white' : 'border-transparent text-white/70'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                                value={user.email}
                                onChange={handleInfoChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Security Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Shield size={18} className="text-primary" /> Segurança
                        </h2>
                        {!isChangingPassword ? (
                            <button
                                onClick={() => setIsChangingPassword(true)}
                                className="text-xs font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
                            >
                                ALTERAR SENHA
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsChangingPassword(false)}
                                    className="text-xs font-bold text-white/60 hover:text-white px-3 py-1.5"
                                >
                                    CANCELAR
                                </button>
                                <button
                                    onClick={handleSavePassword}
                                    className="text-xs font-bold text-white bg-green-500/20 hover:bg-green-500 px-3 py-1.5 rounded-lg transition-all text-green-400 hover:text-white"
                                >
                                    CONFIRMAR
                                </button>
                            </div>
                        )}
                    </div>

                    {isChangingPassword && (
                        <div className="space-y-3 animate-slide-down">
                            {/* Removed Current Password field as per Supabase auth flow */}
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Nova Senha</label>
                                <div className="relative">
                                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type="password"
                                        name="new"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/10"
                                        placeholder="Digite a nova senha"
                                        value={passwords.new}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Confirmar Nova Senha</label>
                                <div className="relative">
                                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type="password"
                                        name="confirm"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/10"
                                        placeholder="Repita a nova senha"
                                        value={passwords.confirm}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {!isChangingPassword && (
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="bg-green-500/20 p-2 rounded-full">
                                <Shield size={16} className="text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-white font-medium">Senha protegida</p>
                                <p className="text-xs text-white/40">Última alteração há 3 meses</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-red-900/10"
                >
                    <LogOut size={20} />
                    Sair da Conta
                </button>
            </div>
        </Layout>
    );
};

export default Profile;
