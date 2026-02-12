import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { useRecipeProgress } from './RecipeProgressContext';
import { Cookie, Trophy, Calendar, Star, Award } from 'lucide-react';

const AchievementsContext = createContext();

export const useAchievements = () => {
    return useContext(AchievementsContext);
};

export const ACHIEVEMENTS = [
    {
        id: 'streak_3',
        title: 'Foco Total',
        description: 'Acessou o app por 3 dias seguidos.',
        icon: 'calendar',
        color: 'text-blue-400',
        bg: 'bg-blue-400/20',
        condition: { type: 'streak', value: 3 }
    },
    {
        id: 'streak_7',
        title: 'Semana Doce',
        description: 'Acessou o app por 7 dias seguidos.',
        icon: 'calendar',
        color: 'text-purple-400',
        bg: 'bg-purple-400/20',
        condition: { type: 'streak', value: 7 }
    },
    {
        id: 'recipe_1',
        title: 'Primeira Fornada',
        description: 'Concluiu sua primeira receita.',
        icon: 'cookie',
        color: 'text-orange-400',
        bg: 'bg-orange-400/20',
        condition: { type: 'recipes', value: 1 }
    },
    {
        id: 'recipe_5',
        title: 'Mão na Massa',
        description: 'Concluiu 5 receitas diferentes.',
        icon: 'cookie',
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/20',
        condition: { type: 'recipes', value: 5 }
    },
    {
        id: 'recipe_10',
        title: 'Mestre Cuca',
        description: 'Concluiu 10 receitas diferentes.',
        icon: 'trophy',
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/20',
        condition: { type: 'recipes', value: 10 }
    },
    {
        id: 'sales_kit_visit',
        title: 'Vendedor Nato',
        description: 'Visitou o Kit de Vendas.',
        icon: 'star',
        color: 'text-pink-400',
        bg: 'bg-pink-400/20',
        condition: { type: 'visit', value: 'sales_kit' }
    }
];

export const AchievementsProvider = ({ children }) => {
    const { user } = useAuth();
    const { completedRecipes } = useRecipeProgress();
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    const [stats, setStats] = useState({ login_streak: 0, last_login: null });
    const [newUnlock, setNewUnlock] = useState(null); // To show modal/toast

    // 1. Fetch User Stats & Unlocked Achievements on Mount
    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    // 2. Watch for changes that might trigger unlocks
    useEffect(() => {
        if (user && stats.login_streak > 0) {
            checkAndUnlock('streak', stats.login_streak);
        }
    }, [stats.login_streak, user]);

    useEffect(() => {
        if (user && completedRecipes.length > 0) {
            checkAndUnlock('recipes', completedRecipes.length);
        }
    }, [completedRecipes.length, user]);

    const fetchUserData = async () => {
        try {
            // Fetch Achievements
            const { data: achievementsData } = await supabase
                .from('user_achievements')
                .select('achievement_id')
                .eq('user_id', user.id);

            if (achievementsData) {
                setUnlockedAchievements(achievementsData.map(a => a.achievement_id));
            }

            // Fetch & Update Stats (Login Streak)
            const { data: profile } = await supabase
                .from('profiles')
                .select('last_login, login_streak')
                .eq('id', user.id)
                .single();

            if (profile) {
                handleLoginStreak(profile);
            }
        } catch (error) {
            console.error('Error fetching achievement data:', error);
        }
    };

    const handleLoginStreak = async (profile) => {
        const today = new Date().toISOString().split('T')[0];
        const lastLoginDate = profile.last_login ? profile.last_login.split('T')[0] : null;

        let newStreak = profile.login_streak || 0;

        if (lastLoginDate === today) {
            // Already logged in today, do nothing to streak
            setStats({ login_streak: newStreak, last_login: profile.last_login });
        } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastLoginDate === yesterdayStr) {
                // Streak continues
                newStreak += 1;
            } else {
                // Streak broken or first login
                newStreak = 1;
            }

            // Update DB
            await supabase
                .from('profiles')
                .update({
                    last_login: new Date().toISOString(),
                    login_streak: newStreak
                })
                .eq('id', user.id);

            setStats({ login_streak: newStreak, last_login: new Date().toISOString() });
        }
    };

    const checkAndUnlock = async (type, value) => {
        const potentialUnlocks = ACHIEVEMENTS.filter(a =>
            a.condition.type === type && value >= a.condition.value
        );

        for (const achievement of potentialUnlocks) {
            if (!unlockedAchievements.includes(achievement.id)) {
                unlockAchievement(achievement);
            }
        }
    };

    const unlockAchievement = async (achievement) => {
        // Optimistic update
        setUnlockedAchievements(prev => [...prev, achievement.id]);
        setNewUnlock(achievement);

        try {
            await supabase.from('user_achievements').insert({
                user_id: user.id,
                achievement_id: achievement.id
            });
        } catch (error) {
            console.error('Error unlocking achievement:', error);
            // Revert if failed? For now, keep optimistic
        }
    };

    const clearNewUnlock = () => setNewUnlock(null);

    return (
        <AchievementsContext.Provider value={{
            achievements: ACHIEVEMENTS,
            unlockedAchievements,
            stats,
            newUnlock,
            clearNewUnlock,
            checkAndUnlock // Expose to manually trigger (e.g. page visits)
        }}>
            {children}
        </AchievementsContext.Provider>
    );
};
