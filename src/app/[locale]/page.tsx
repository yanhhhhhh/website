import { getTranslations } from 'next-intl/server';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div>
      <div className="text-black">{t('homeSceneLearn.title')}</div>
    </div>
  );
}
