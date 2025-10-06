import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (options?: { remember?: boolean }) => void;
  signOut: () => void;
};

const STORAGE_KEY = "noesis:isAuthenticated";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedSession = window.sessionStorage.getItem(STORAGE_KEY);
    const storedLocal = window.localStorage.getItem(STORAGE_KEY);
    setIsAuthenticated(storedSession === "true" || storedLocal === "true");
    setIsLoading(false);
  }, []);

  const signIn = ({ remember }: { remember?: boolean } = {}) => {
    setIsAuthenticated(true);
    if (typeof window !== "undefined") {
      const storage = remember ? window.localStorage : window.sessionStorage;
      storage.setItem(STORAGE_KEY, "true");
      const altStorage = remember ? window.sessionStorage : window.localStorage;
      altStorage.removeItem(STORAGE_KEY);
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({ isAuthenticated, isLoading, signIn, signOut }),
    [isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
