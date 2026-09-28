// client/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('inthugil_admin_token') || null;
  });
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const u = localStorage.getItem('inthugil_admin_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  });

  const login = async (email, password) => {
    const data = await api.adminLogin(email, password);
    setAdminToken(data.token);
    setAdminUser(data.user);
    localStorage.setItem('inthugil_admin_token', data.token);
    localStorage.setItem('inthugil_admin_user', JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('inthugil_admin_token');
    localStorage.removeItem('inthugil_admin_user');
  };

  const isAuthenticated = Boolean(adminToken);

  return (
    <AuthContext.Provider
      value={{
        adminToken,
        adminUser,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
