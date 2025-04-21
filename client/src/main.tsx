import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'

import './index.css'
import ProfileConfig from './pages/ProfileConfig.tsx'

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signin', element: <SignIn />},
    { path: '/signup', element: <SignUp />},
    { path: '/profile', element: <ProfileConfig />}
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
