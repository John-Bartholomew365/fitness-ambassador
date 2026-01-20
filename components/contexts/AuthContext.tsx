'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { authService, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User, rememberMe: boolean) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  requireAuth = false 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const isInitialMount = useRef(true);

  // Memoized checkAuth function
  const checkAuth = useCallback(() => {
    const isAuth = authService.isAuthenticated();
    if (!isAuth) {
      // Clear auth data and redirect
      authService.clearAuthData();
      setUser(null);
      if (requireAuth && window.location.pathname !== '/login') {
        router.push('/login');
      }
    }
    return isAuth;
  }, [router, requireAuth]);

  // Memoized logout function
  const logout = useCallback(() => {
    authService.clearAuthData();
    setUser(null);
    router.push('/login');
  }, [router]);

  // Memoized login function
  const login = useCallback((token: string, userData: User, rememberMe: boolean = false) => {
    authService.setAuthData({ token }, userData, rememberMe);
    setUser(userData);
  }, []);

  // Check initial auth on mount
  useEffect(() => {
    const checkInitialAuth = async () => {
      setIsLoading(true);
      try {
        const currentUser = authService.getUser();
        const isAuth = authService.isAuthenticated();

        if (isAuth && currentUser) {
          setUser(currentUser);
        } else if (isAuth && !currentUser) {
          // Token exists but no user data - clear auth
          authService.clearAuthData();
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        authService.clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    // Use setTimeout to avoid synchronous state updates in effect
    const timer = setTimeout(() => {
      checkInitialAuth();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Redirect if auth is required but user is not authenticated
  useEffect(() => {
    if (!isLoading && requireAuth && !user && window.location.pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoading, user, requireAuth, router]);

  // Provide context value
  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};