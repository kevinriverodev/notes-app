import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie"
import { ToastContainer } from "react-toastify";
import { signin, signup, validateCookie } from "../api/auth";
import { AuthContext } from "../hooks/useAuth";

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => { // Funcion para validar si hay una cookie con el token de acceso cada vez que recargue la pagina
    async function authCookie() {
      const token = Cookies.get("token");

      if (!token) {
        setIsLoading(false);
        setCurrentUser(null);
        setIsAuthenticated(false);
        return;
      }

      const user = await validateCookie();

      if (!user) {
        setIsLoading(false);
        setCurrentUser(null);
        setIsAuthenticated(false);
        return;
      }

      setCurrentUser(user);
      setIsAuthenticated(true);
    }
    authCookie();
  }, []);

  //Funcion para validar login y generar los estados de acceso accesibles en toda la app
  async function authSignIn(username: string, password: string) {
    const user = await signin(username, password);

    if (!user) return;

    setCurrentUser(user);
    setIsAuthenticated(true);
  }

  //Funcion para validar el registro y generar los estados de acceso accesibles en toda la app
  async function authSignUp(username: string, firstName: string, lastName: string, email: string, password: string) {
    const user = await signup(username, firstName, lastName, email, password);

    if (!user) return;

    setCurrentUser(user);
    setIsAuthenticated(true);
  }

  //Funcion para remover los estados y cookie de acceso existentes
  function signOut() {
    Cookies.remove("token");
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsLoading(true);
  }

  return (
    <AuthContext.Provider value={{ authSignIn, authSignUp, signOut, currentUser, isAuthenticated, isLoading, setCurrentUser }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  )
}