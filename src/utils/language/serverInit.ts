// utils/language/serverInit.ts
import i18next from 'i18next';
import { resources } from '@/constants/locales';

export const fallbackLng = 'zh_CN';

export async function initServerI18n(locale: string) {
  const i18nInstance = i18next.createInstance();
  await i18nInstance.init({
    lng: locale,
    fallbackLng,
    resources,
    interpolation: { escapeValue: false },
  });

  return i18nInstance;
}
