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
    const hasAccess = hasRole('acookies') || hasRole('avitalicio');

    console.log('ProtectedRoute Check:', {
        path: currentPath,
        hasAccess,
        profile: user ? 'Loaded' : 'No User',
        roles: hasRole('acookies') ? 'acookies' : 'none'
    });

    // Allowed routes for EVERYONE logged in (Profile, Other Recipes)
    const alwaysAllowed = ['/profile', '/other-recipes'];
    const isAllowedRoute = alwaysAllowed.some(route => currentPath.includes(route));

    // If user has 'acookies', they can access EVERYTHING.
    // If not, they can ONLY access 'alwaysAllowed' routes.
    if (!hasAccess && !isAllowedRoute) {
        console.warn(`Access Denied to ${currentPath}. Redirecting to /other-recipes`);
        return <Navigate to="/other-recipes" replace />
    }

    return children
}

export default ProtectedRoute
