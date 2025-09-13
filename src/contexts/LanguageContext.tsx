"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { contentID } from '@/data/content-id';
import { contentEN } from '@/data/content-en';

type Language = 'id' | 'en';
type Content = typeof contentID;

interface LanguageContextType {
  language: Language;
  content: Content;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('id');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    } else {
      // Auto-detect browser language
      const browserLanguage = navigator.language.toLowerCase();
      if (browserLanguage.startsWith('id')) {
        setLanguageState('id');
      } else {
        setLanguageState('en');
      }
    }
    setIsInitialized(true);
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('preferred-language', language);
    }
  }, [language, isInitialized]);

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'id' ? 'en' : 'id');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const content = language === 'id' ? contentID : contentEN;

  const value: LanguageContextType = {
    language,
    content,
    toggleLanguage,
    setLanguage
  };

  // Don't render until initialized to prevent hydration mismatch
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}