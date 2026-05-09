import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null, { role: 'user' }, or { role: 'admin' }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token from URL (Google OAuth redirect)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    const urlRole = params.get('role');

    if (urlToken && urlRole) {
      const session = { role: urlRole };
      setUser(session);
      localStorage.setItem('auth_user', JSON.stringify(session));
      localStorage.setItem('token', urlToken);
      // Clean up the URL and redirect
      window.history.replaceState({}, document.title, window.location.pathname);
      if (urlRole === 'user') {
        window.location.href = '/user/intake';
      } else if (urlRole === 'admin') {
        window.location.href = '/admin/dashboard';
      }
    } else {
      // Check local storage for existing session
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse auth user", e);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (role, token) => {
    const session = { role };
    setUser(session);
    localStorage.setItem('auth_user', JSON.stringify(session));
    if (token) {
      localStorage.setItem('token', token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
