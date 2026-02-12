import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useAchievements } from '../context/AchievementsContext';
import { Lock, CheckCircle, Cookie, Star, Award, Trophy, Calendar } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const Achievements = () => {
    const { achievements, unlockedAchievements, stats, checkAndUnlock } = useAchievements();

    // Trigger checks on mount (e.g. just in case)
    useEffect(() => {
        checkAndUnlock('visit', 'achievements_page'); // Example if we had this
    }, []);

    const totalUnlocked = unlockedAchievements.length;
    const progress = Math.round((totalUnlocked / achievements.length) * 100);

    return (
        <Layout>
            <header className="mb-8 mt-4">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">
                    Minhas <span className="text-primary-glow">Conquistas</span>
                </h1>
                <p className="text-white/60 font-light text-sm">Desbloqueie cookies exclusivos!</p>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-2 text-orange-400">
                        <Trophy size={20} />
                    </div>
                    <span className="text-2xl font-bold text-white">{totalUnlocked}/{achievements.length}</span>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Desbloqueadas</span>
                </GlassCard>
                <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 text-blue-400">
                        <Calendar size={20} />
                    </div>
                    <span className="text-2xl font-bold text-white">{stats.login_streak} <span className="text-xs font-normal text-white/40">dias</span></span>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Sequência</span>
                </GlassCard>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-xs font-bold text-white/40 mb-2 uppercase tracking-wide">
                    <span>Progresso Geral</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Achievements Grid */}
            <div className="space-y-4 mb-24">
                {achievements.map((achievement) => {
                    const isUnlocked = unlockedAchievements.includes(achievement.id);

                    return (
                        <div
                            key={achievement.id}
                            className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 ${isUnlocked
                                    ? 'bg-gradient-to-br from-white/10 to-transparent border-white/10 shadow-lg'
                                    : 'bg-white/5 border-white/5 grayscale opacity-70'
                                }`}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-white/10 shadow-inner ${isUnlocked ? achievement.bg : 'bg-white/5'
                                    }`}>
                                    {getIcon(achievement.icon, isUnlocked ? achievement.color : 'text-white/20')}
                                </div>

                                <div className="flex-1">
                                    <h3 className={`font-bold text-lg leading-tight mb-1 ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
                                        {achievement.title}
                                    </h3>
                                    <p className="text-xs text-white/50 leading-relaxed">
                                        {achievement.description}
                                    </p>
                                </div>

                                <div className="shrink-0">
                                    {isUnlocked ? (
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/20">
                                            <CheckCircle size={16} />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 border border-white/5">
                                            <Lock size={16} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};

const getIcon = (name, className) => {
    switch (name) {
        case 'cookie': return <Cookie size={24} className={className} />;
        case 'trophy': return <Trophy size={24} className={className} />;
        case 'calendar': return <Calendar size={24} className={className} />;
        case 'star': return <Star size={24} className={className} />;
        default: return <Award size={24} className={className} />;
    }
}

export default Achievements;
