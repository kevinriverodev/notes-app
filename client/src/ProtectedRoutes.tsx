import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export default function ProtectedRoutes() {
    const { isAuthenticated, isLoading } = useAuth();

    if (!isLoading && !isAuthenticated) return <Navigate to="/signin" replace />

    return (
        <Outlet />
    )
}