import { createContext, useContext } from 'react';
import { User } from '../context/AuthContext';

export interface AuthContextProps {
	authSignIn: (username: string, password: string) => Promise<void>;
	authSignUp: (
		username: string,
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) => Promise<void>;
	signOut: () => void;
	setCurrentUser: (user: User) => void;
	currentUser: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) throw new Error('useAuth must be used within an AuthProvider');

	return context;
}
