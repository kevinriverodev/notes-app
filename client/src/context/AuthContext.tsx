import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

interface user {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
    password?: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface authContextProps {
    authSignIn: (username: string, password: string) => Promise<void>;
    authSignUp: (user: user) => Promise<void>;
    signOut: () => void;
    currentUser: user | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<authContextProps | null>(null);

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) throw new Error('useAuth must be used within an AuthProvider');

    return context;
}

export default function AuthProvider({ children }: AuthProviderProps) {

    const [currentUser, setCurrentUser] = useState<user | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function validateCookie() {
            const token = Cookies.get('token');

            if (!token) {
                setIsLoading(false);
                setIsAuthenticated(false);
                setCurrentUser(null);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/auth/validate-cookie', {
                    withCredentials: true
                });

                const { data } = JSON.parse(JSON.stringify(response));

                if (!data.user) {
                    setIsLoading(false);
                    setIsAuthenticated(false);
                    setCurrentUser(null);
                    return;
                }

                setCurrentUser(data.user);
                setIsAuthenticated(true);

            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setIsAuthenticated(false);
                setCurrentUser(null);
            }
        }
        validateCookie();
    }, []);

    async function authSignIn(username: string, password: string) {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', {
                username,
                password
            }, {
                withCredentials: true
            });

            const { data } = JSON.parse(JSON.stringify(response));

            setCurrentUser(data.user);
            setIsAuthenticated(true)

        } catch (error) {
            console.log(error);
        }
    }

    async function authSignUp({ username, firstName, lastName, email, password }: user) {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', {
                username, firstName, lastName, email, password
            }, {
                withCredentials: true
            });

            const { data } = JSON.parse(JSON.stringify(response));
            setIsAuthenticated(true);
            setCurrentUser(data.user);

        } catch (error) {
            console.log(error);
        }
    }

    function signOut() {
        Cookies.remove('token');
        setCurrentUser(null);
        setIsAuthenticated(false);
        setIsLoading(true);
    }

    return (
        <AuthContext.Provider value={{ authSignIn, authSignUp, signOut, currentUser, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}