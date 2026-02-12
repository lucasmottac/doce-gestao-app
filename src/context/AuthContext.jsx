import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userRoles, setUserRoles] = useState([])

    const fetchUserRoles = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('roles')
                .eq('id', userId)
                .single()
            
            if (error) {
                console.error('Error fetching roles:', error)
                return []
            }
            return data?.roles || []
        } catch (error) {
            console.error('Unexpected error fetching roles:', error)
            return []
        }
    }

    useEffect(() => {
        // Check active sessions and sets the user
        const initAuth = async () => {
             const { data: { session } } = await supabase.auth.getSession()
             setSession(session)
             setUser(session?.user ?? null)
             
             if (session?.user) {
                 const roles = await fetchUserRoles(session.user.id)
                 setUserRoles(roles)
             }
             
             setLoading(false)
        }

        initAuth()

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            
            if (session?.user) {
                const roles = await fetchUserRoles(session.user.id)
                setUserRoles(roles)
            } else {
                setUserRoles([])
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
        return userRoles.includes(role)
    }

    const value = {
        signInWithEmail,
        signOut,
        updatePassword,
        user,
        session,
        loading,
        userRoles,
        hasRole
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
