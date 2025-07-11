'use client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from '@/utils/language/locales';

if (typeof window !== 'undefined') {
  i18next
    .use(LanguageDetector) //嗅探当前浏览器语言
    .use(initReactI18next) // 将 i18next 向下传递给 react-i18next
    .init({
      //初始化
      resources, //本地多语言数据
      fallbackLng: 'zh_CN', //默认当前环境的语言
      detection: {
        caches: ['localStorage'],
      },
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18next;
