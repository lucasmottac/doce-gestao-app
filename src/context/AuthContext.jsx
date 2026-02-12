import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState(null) // Renamed from userRoles to userProfile

    // Renamed from fetchUserRoles to fetchUserProfile
    const fetchUserProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*') // Select all columns to get boolean flags like 'acookies'
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
        // Check active sessions and sets the user
        const initAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setSession(session)
            setUser(session?.user ?? null)

            if (session?.user) {
                const profile = await fetchUserProfile(session.user.id)
                setUserProfile(profile)
            }

            setLoading(false)
        }

        initAuth()

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)

            if (session?.user) {
                const profile = await fetchUserProfile(session.user.id)
                setUserProfile(profile)
            } else {
                setUserProfile(null)
            }

            setLoading(false)
        })

        return () => subscription.unsubscribe()
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

        // 1. Check Boolean Column (Priority - requested by user)
        // If the role name matches a column (e.g., 'acookies') and it is true
        if (userProfile[role] === true) {
            return true;
        }

        // 2. Check Roles Array (Fallback/Compatibility)
        if (userProfile.roles && Array.isArray(userProfile.roles)) {
            // Standard check
            if (userProfile.roles.includes(role)) return true;

            // Fallback for string variations if legacy data exists
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
        userRoles: userProfile?.roles || [], // Backwards compatibility if needed
        hasRole
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
