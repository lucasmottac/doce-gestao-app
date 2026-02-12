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
            console.log("---------------- DEBUG PROBE ----------------");
            console.log("Fetching profile for User ID:", userId);

            // 1. Debug: Fetch ANY row to see table structure
            const { data: debugData, error: debugError } = await supabase
                .from('profiles')
                .select('*')
                .limit(1);

            if (debugData && debugData.length > 0) {
                console.log("Table Columns Found:", Object.keys(debugData[0]));
                console.log("Sample Row Data:", debugData[0]);
            } else {
                console.log("Profiles table appears empty or unreadable (RLS?). Error:", debugError);
            }

            // Timeout promise to prevent infinite hanging
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), 5000)
            );

            // 2. Try standard 'id' column first
            const fetchPromiseId = supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            try {
                const { data, error } = await Promise.race([fetchPromiseId, timeoutPromise]);
                if (!error && data) {
                    console.log("Successfully fetched profile by 'id'");
                    return data;
                }
                console.log("Fetch by 'id' failed:", error);
            } catch (e) {
                console.log("Fetch by 'id' timed out or crashed");
            }

            // 3. Fallback: Try 'user_id' column if 'id' failed
            // Note: browser logs showed this column didn't exist, but keeping it for completeness
            // in case RLS hid it or something weird.
            console.log("Attempting fetch with 'user_id' column fallback...");
            const fetchPromiseUserId = supabase
                .from('profiles')
                .select('*')
                .eq('user_id', userId)
                .single();

            try {
                const { data: data2, error: error2 } = await Promise.race([fetchPromiseUserId, timeoutPromise]);

                if (!error2 && data2) {
                    console.log("Successfully fetched profile by 'user_id'");
                    return data2;
                }
                console.error('Fetch by user_id also failed:', error2)
            } catch (e) {
                console.log("Fetch by 'user_id' timed out");
            }

            return null
        } catch (error) {
            console.error('Unexpected error in fetchUserProflie:', error)
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

        // Listen for changes on auth state (logged in, signed out, etc.)
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

        // REAL-TIME SUBSCRIPTION FOR PROFILE UPDATES
        const channel = supabase
            .channel('public:profiles')
            .on('postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'profiles' },
                (payload) => {
                    if (session?.user && payload.new.id === session.user.id) {
                        console.log('Real-time profile update received:', payload.new);
                        setUserProfile(payload.new);
                    }
                }
            )
            .subscribe();

        return () => {
            if (data?.subscription) {
                data.subscription.unsubscribe()
            }
            supabase.removeChannel(channel);
        }
    }, [session?.user?.id]) // specific dependency on user id for the check

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
        // GLOBAL ACCESS: If user has a profile, they have access to EVERYTHING.
        // We removed specific column checks as requested.
        return !!userProfile;
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
