'use client';

import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const register = async (email, password, username, firstName, lastName, accountType) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username, firstName, lastName, accountType }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }
      const data = await response.json();
      setUser(data.user); // Assuming backend returns user data
      return data;
    } catch (err) {
      throw new Error(err.message || 'Registration failed');
    }
  };

  const login = async (email, password) => {
    // Placeholder for login, based on /login page requirements
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }
      const data = await response.json();
      setUser(data.user);
      return data;
    } catch (err) {
      throw new Error(err.message || 'Login failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}