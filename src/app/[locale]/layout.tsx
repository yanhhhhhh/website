import { languages } from '@/constants/locales';

export async function generateStaticParams() {
  return languages.map((lang) => ({ locale: lang.key }));
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  return (
    <div>
      offical layout
      {children}
    </div>
  );
}
