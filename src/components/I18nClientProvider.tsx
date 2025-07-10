'use client';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { useEffect, useState } from 'react';

export default function I18nClientProvider({
  children,
  i18n,
}: {
  children: React.ReactNode;
  i18n: any;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!i18next.isInitialized) {
      i18next.init(i18n.options).then(() => setReady(true));
    } else {
      setReady(true);
    }
  }, [i18n]);

  if (!ready) return null;

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
