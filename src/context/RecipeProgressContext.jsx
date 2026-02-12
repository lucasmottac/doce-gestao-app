import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { recipesData } from '../data/recipes';

const RecipeProgressContext = createContext();

export const useRecipeProgress = () => {
    return useContext(RecipeProgressContext);
};

export const RecipeProgressProvider = ({ children }) => {
    const { user } = useAuth();
    const [completedRecipes, setCompletedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Total unique recipes from data
    const totalRecipes = recipesData.length;

    useEffect(() => {
        if (user) {
            fetchCompletedRecipes();
        } else {
            setCompletedRecipes([]);
            setLoading(false);
        }
    }, [user]);

    const fetchCompletedRecipes = async () => {
        try {
            const { data, error } = await supabase
                .from('completed_recipes')
                .select('recipe_title');

            if (error) throw error;

            if (data) {
                setCompletedRecipes(data.map(item => item.recipe_title));
            }
        } catch (error) {
            console.error('Error fetching completed recipes:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleRecipeCompletion = async (recipeTitle) => {
        if (!user) return;

        // Check if already completed (optimistic update)
        const isCompleted = completedRecipes.includes(recipeTitle);

        let newCompleted = [...completedRecipes];
        if (isCompleted) {
            newCompleted = newCompleted.filter(t => t !== recipeTitle);
        } else {
            newCompleted.push(recipeTitle);
        }
        setCompletedRecipes(newCompleted);

        try {
            if (isCompleted) {
                // Remove from DB
                const { error } = await supabase
                    .from('completed_recipes')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('recipe_title', recipeTitle);

                if (error) throw error;
            } else {
                // Add to DB
                const { error } = await supabase
                    .from('completed_recipes')
                    .insert({ user_id: user.id, recipe_title: recipeTitle });

                if (error) throw error;
            }
        } catch (error) {
            console.error('Error toggling recipe completion:', error);
            // Revert on error
            fetchCompletedRecipes();
        }
    };

    const progressPercentage = totalRecipes > 0
        ? Math.round((completedRecipes.length / totalRecipes) * 100)
        : 0;

    const value = {
        completedRecipes,
        toggleRecipeCompletion,
        progressPercentage,
        totalRecipes,
        completedCount: completedRecipes.length,
        loading
    };

    return (
        <RecipeProgressContext.Provider value={value}>
            {children}
        </RecipeProgressContext.Provider>
    );
};
