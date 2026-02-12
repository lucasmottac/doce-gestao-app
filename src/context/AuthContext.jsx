import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState(null)

    const fetchUserProfile = async (userId) => {
        try {
            // Timeout promise to prevent infinite hanging
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), 5000)
            );

            // Try standard 'id' column first
            const fetchPromiseId = supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            try {
                const { data, error } = await Promise.race([fetchPromiseId, timeoutPromise]);
                if (!error && data) return data;
            } catch (e) {
                console.log("Primary fetch failed, trying fallback...");
            }

            // Fallback: Try 'user_id' column if 'id' failed or returned nothing
            console.log("Attempting fetch with user_id column...");
            const fetchPromiseUserId = supabase
                .from('profiles')
                .select('*')
                .eq('user_id', userId) // User reported this column name
                .single();

            const { data: data2, error: error2 } = await Promise.race([fetchPromiseUserId, timeoutPromise]);

            if (error2) {
                console.error('Error fetching profile (both id and user_id failed):', error2)
                return null
            }
            return data2
        } catch (error) {
            console.error('Unexpected error fetching profile (possible RLS or Network issue):', error)
            return null
        }
    }

    useEffect(() => {
        const initAuth = async () => {
            try {
                // Safely get session
                const { data, error } = await supabase.auth.getSession()

                if (error) {
                    console.error('Supabase session error:', error)
                    return
                }

                const session = data?.session ?? null
                setSession(session)
                setUser(session?.user ?? null)

                if (session?.user) {
                    const profile = await fetchUserProfile(session.user.id)
                    setUserProfile(profile)
                }
            } catch (err) {
                console.error('Unexpected error initializing auth:', err)
            } finally {
                setLoading(false)
            }
        }

        initAuth()

        // Safely subscribe to auth changes
        const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
            try {
                setSession(session)
                setUser(session?.user ?? null)

                if (session?.user) {
                    const profile = await fetchUserProfile(session.user.id)
                    setUserProfile(profile)
                } else {
                    setUserProfile(null)
                }
            } catch (err) {
                console.error('Error in auth state change:', err)
            } finally {
                setLoading(false)
            }
        })

        return () => {
            if (data?.subscription) {
                data.subscription.unsubscribe()
            }
        }
    }, [])

    const signInWithEmail = async (email, password) => {
        return await supabase.auth.signInWithPassword({
            email,
            password,
        })
    }

    const signOut = async () => {
        return await supabase.auth.signOut()
    }

    const updatePassword = async (newPassword) => {
        return await supabase.auth.updateUser({ password: newPassword })
    }

    const hasRole = (role) => {
        if (!userProfile) return false;

        if (userProfile[role] === true) {
            return true;
        }

        if (userProfile.roles && Array.isArray(userProfile.roles)) {
            if (userProfile.roles.includes(role)) return true;

            if (role === 'acookies' && (
                userProfile.roles.includes('TRUE') ||
                userProfile.roles.includes('true') ||
                userProfile.roles.includes('1')
            )) {
                return true;
            }
        }

        return false;
    }

    const value = {
        signInWithEmail,
        signOut,
        updatePassword,
        user,
        session,
        loading,
        userProfile,
        userRoles: userProfile?.roles || [],
        hasRole
    }

    // Debug log
    console.log('AuthProvider State:', { loading, session, userProfile });

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="min-h-screen bg-black flex items-center justify-center text-white">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p>Loading Auth...</p>
                    </div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}
