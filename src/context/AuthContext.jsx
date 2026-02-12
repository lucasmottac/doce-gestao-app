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

            // Fetch profile
            const fetchPromise = supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            try {
                const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
                if (data) return data;
                if (error) console.warn("Profile fetch warning:", error.message);
            } catch (e) {
                console.warn("Profile fetch timed out or failed");
            }

            // Fallback: If no profile found, return a mock profile to ensure access 
            // since we are in "Global Access" mode.
            return { id: userId, email: user?.email, roles: ['acookies'] };
        } catch (error) {
            console.error('Unexpected error fetching profile:', error)
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
        if (!userProfile) return false;

        // MASTER KEY LOGIC: If 'avitalicio' is true, grant access to EVERYTHING
        if (userProfile.avitalicio === true ||
            (userProfile.roles && userProfile.roles.includes('avitalicio'))) {
            return true;
        }

        // Direct Boolean Column Check (e.g., userProfile.amassa === true)
        if (userProfile[role] === true) {
            return true;
        }

        // Array-based Role Check (legacy/hybrid support)
        if (userProfile.roles && Array.isArray(userProfile.roles)) {
            if (userProfile.roles.includes(role)) return true;

            // Check for string boolean representations in array
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
