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
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) {
                console.error('Error fetching profile:', error)
                return null
            }
            return data
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

    // ... (rest of component)

    // Debug log
    console.log('AuthProvider State:', { loading, session, userProfile });

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="min-h-screen bg-black flex items-center justify-center text-white">
                    Loading Auth...
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}
