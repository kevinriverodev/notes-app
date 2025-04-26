import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import ProfileConfig from './pages/ProfileConfig.tsx';
import AuthProvider from './context/AuthContext.tsx';
import ProtectedRoutes from './ProtectedRoutes.tsx';
import './index.css';

const router = createBrowserRouter([
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    {
        path: '/', element: <ProtectedRoutes />, children: [
            { path: '/', element: <Home /> },
            { path: '/profile', element: <ProfileConfig /> }
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
)