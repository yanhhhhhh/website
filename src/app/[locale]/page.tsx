'use client';
import { useTranslation } from 'react-i18next';
import '@/utils/language/clientInit';

export default function Page() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('navigator.aboutUs')}</h1>
    </div>
  );
}
