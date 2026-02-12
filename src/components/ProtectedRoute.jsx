import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { user, loading, hasRole } = useAuth()
    const location = useLocation()
    const currentPath = location.pathname

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 border-t-4 border-primary">
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <span className="text-gray-600 font-medium">Verificando acesso...</span>
            </div>
        </div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    // SIMPLIFIED ACCESS LOGIC (Emergency Fix)
    // 1. Profile, Other Recipes, and Dashboard are ALWAYS allowed for logged-in users.
    if (currentPath.includes('/profile') || currentPath.includes('/other-recipes') || currentPath.includes('/dashboard')) {
        return children;
    }

    // 2. Dashboard, Recipes, and Calculator REQUIRE 'acookies' (or master key)
    const hasMainAccess = hasRole('acookies') || hasRole('avitalicio');

    if (hasMainAccess) {
        return children;
    }

    // 3. If no access to main pages, redirect to Other Recipes (the "Home" for restricted users)
    console.warn(`Redirecting from ${currentPath} to /other-recipes (No 'acookies' permission)`);
    return <Navigate to="/other-recipes" replace />
}

export default ProtectedRoute
