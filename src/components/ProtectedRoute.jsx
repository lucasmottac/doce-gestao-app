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

    // Check for main app access (Dashboard, Recipes, etc.)
    const hasMainAccess = hasRole('acookies') || hasRole('avitalicio')

    // If user is logged in but doesn't have main access
    // and is trying to access restricted pages (not other-recipes or profile)
    // We use currentPath to check compatibility with HashRouter
    if (!hasMainAccess &&
        !currentPath.includes('/other-recipes') &&
        !currentPath.includes('/profile')) {
        return <Navigate to="/other-recipes" replace />
    }

    return children
}

export default ProtectedRoute
