import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function ProtectedRoutes() {
    const { isAuthenticated, isLoading } = useAuth();

    if (!isLoading && !isAuthenticated) return <Navigate to="/signin" replace />

    return (
        <Outlet />
    )
}