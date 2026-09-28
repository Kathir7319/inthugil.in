// client/src/context/SettingsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSettingsAndCategories = async () => {
    try {
      const [sData, cData] = await Promise.all([
        api.getSettings(),
        api.getCategories()
      ]);
      setSettings(sData);
      setCategories(cData);
    } catch (err) {
      console.error('Failed to load initial site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingsAndCategories();
  }, []);

  const refreshSettings = async () => {
    await fetchSettingsAndCategories();
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        categories,
        loading,
        refreshSettings,
        setSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
