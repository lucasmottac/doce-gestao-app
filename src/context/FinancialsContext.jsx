import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const FinancialsContext = createContext();

export const useFinancials = () => {
    return useContext(FinancialsContext);
};

export const FinancialsProvider = ({ children }) => {
    const { user } = useAuth();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({ revenue: 0, profit: 0, count: 0 });

    useEffect(() => {
        if (user) {
            fetchSales();
        } else {
            setSales([]);
            setSummary({ revenue: 0, profit: 0, count: 0 });
            setLoading(false);
        }
    }, [user]);

    const fetchSales = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('sales')
                .select('*')
                .eq('user_id', user.id)
                .order('sale_date', { ascending: false });

            if (error) throw error;

            if (data) {
                setSales(data);
                calculateSummary(data);
            }
        } catch (error) {
            console.error('Error fetching sales:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateSummary = (salesData) => {
        const totalRevenue = salesData.reduce((sum, sale) => sum + (parseFloat(sale.total_amount) || 0), 0);
        const totalProfit = salesData.reduce((sum, sale) => sum + (parseFloat(sale.profit) || 0), 0);

        setSummary({
            revenue: totalRevenue,
            profit: totalProfit,
            count: salesData.length
        });
    };

    const addSale = async (saleData) => {
        if (!user) return { success: false, error: "Usuário não autenticado" };

        try {
            const payload = {
                user_id: user.id,
                sale_date: new Date().toISOString(), // Default
                ...saleData // Override
            };
            console.log("Inserting sale:", payload);

            const { data, error } = await supabase
                .from('sales')
                .insert([payload])
                .select()
                .single();

            if (error) throw error;

            // Optimistic update
            const newSales = [data, ...sales];
            setSales(newSales);
            calculateSummary(newSales);
            return { success: true };
        } catch (error) {
            console.error('Error adding sale:', error);
            return { success: false, error };
        }
    };

    const deleteSale = async (id) => {
        try {
            const { error } = await supabase
                .from('sales')
                .delete()
                .eq('id', id);

            if (error) throw error;

            const newSales = sales.filter(s => s.id !== id);
            setSales(newSales);
            calculateSummary(newSales);
        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    }

    return (
        <FinancialsContext.Provider value={{
            sales,
            loading,
            summary,
            addSale,
            deleteSale,
            fetchSales
        }}>
            {children}
        </FinancialsContext.Provider>
    );
};
