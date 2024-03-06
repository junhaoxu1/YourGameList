import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

type AuthContextType = {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<boolean>;
  userEmail: string | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProps = {
  children: React.ReactNode;
};

const AuthContextProvider = ({ children } : AuthContextProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email: string, password: string) => {
    const createUser = createUserWithEmailAndPassword(auth, email, password);
    return createUser;
  };

  const logout = () => {
    return signOut(auth);
  };

  const reloadUser = async () => {
    if (!auth.currentUser) {
      return false;
    }
    setUserEmail(auth.currentUser.email);

    return true;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        reloadUser,
        userEmail,
      }}
    >
      {loading ? (
        <div id="initial-loader">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
