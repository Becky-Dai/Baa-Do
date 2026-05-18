/**
 * 中文：语言上下文，提供全局语言状态和翻译函数。
 * English: Language context providing global language state and translation function.
 */

'use client';

import { createContext, useContext, useState } from 'react';
import { t, type LangCode, type TranslationMap } from '../lib/i18n/translations';

interface LangContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: keyof TranslationMap, vars?: Record<string, string | number>) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: 'zh-CN',
  setLang: () => {},
  t: (key) => key as string,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LangCode>('zh-CN');

  function translate(key: keyof TranslationMap, vars?: Record<string, string | number>) {
    return t(lang, key, vars);
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  return useContext(LangContext).t;
}
