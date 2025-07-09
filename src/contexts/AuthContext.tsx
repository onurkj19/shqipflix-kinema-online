
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  emri: string;
  isAdmin?: boolean;
  isSubscribed?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, emri: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('shqipflix_token');
    const userData = localStorage.getItem('shqipflix_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('shqipflix_token');
        localStorage.removeItem('shqipflix_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login - in real app, this would call your backend
      if (email === 'admin@shqipflix.com' && password === 'admin123') {
        const adminUser = {
          id: '1',
          email: 'admin@shqipflix.com',
          emri: 'Administrator',
          isAdmin: true,
          isSubscribed: true
        };
        setUser(adminUser);
        localStorage.setItem('shqipflix_token', 'mock_admin_token');
        localStorage.setItem('shqipflix_user', JSON.stringify(adminUser));
        return true;
      } else if (email === 'user@test.com' && password === 'test123') {
        const testUser = {
          id: '2',
          email: 'user@test.com',
          emri: 'Test User',
          isAdmin: false,
          isSubscribed: true
        };
        setUser(testUser);
        localStorage.setItem('shqipflix_token', 'mock_user_token');
        localStorage.setItem('shqipflix_user', JSON.stringify(testUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, emri: string): Promise<boolean> => {
    try {
      // Mock registration - in real app, this would call your backend
      const newUser = {
        id: Date.now().toString(),
        email,
        emri,
        isAdmin: false,
        isSubscribed: false
      };
      setUser(newUser);
      localStorage.setItem('shqipflix_token', `mock_token_${Date.now()}`);
      localStorage.setItem('shqipflix_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shqipflix_token');
    localStorage.removeItem('shqipflix_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
