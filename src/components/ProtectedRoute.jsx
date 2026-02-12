import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { user, loading, hasRole } = useAuth()
    const location = window.location.pathname

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">Carregando...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Check for main app access
    const hasMainAccess = hasRole('acookies') || hasRole('avitalicio')

    // If user is logged in but doesn't have main access
    // and is trying to access restricted pages (not other-recipes or profile)
    if (!hasMainAccess &&
        !location.includes('/other-recipes') &&
        !location.includes('/profile')) {
        return <Navigate to="/other-recipes" replace />
    }

    return children
}

export default ProtectedRoute
