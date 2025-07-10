'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from '@/constants/locales';

const fallbackLng = 'zh_CN';

if (!i18next.isInitialized) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng,
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18next;
