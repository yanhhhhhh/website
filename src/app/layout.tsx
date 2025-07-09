import { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
export const metadata: Metadata = {
  title: 'HeroEE',
  description:
    'HiTHIUM HeroEE portable power station, 省钱•安全•耐用的家庭储能系统 | HiTHIUM HeroEE 户外移动电源,省钱•安全•耐用的家庭储能系统',
  keywords: [
    'Hithium',
    'HiTHIUM',
    'HeroEE',
    'Hero',
    'heroEE',
    '平权',
    '平权英雄',
    '海辰平权',
    '深圳海辰',
    '安全',
    '耐用',
    '省钱',
    '储能',
    'portable power station',
    '家庭储能系统',
    '户外移动电源',
  ],
  openGraph: {
    title: 'HeroEE',
    description: 'HiTHIUM HeroEE portable power station',
    images: [
      {
        url: 'https://hero.hithium.com/intro/logo100.jpg',
        width: 300,
        height: 300,
        alt: 'HeroEE Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/intro/logo.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />

        <meta
          name="google-site-verification"
          content="qfOfo7g_tVNdeMRacXHePdOx69KJlEwd7LT29VPVeAg"
        />
        <meta httpEquiv="x-ua-compatible" content="IE=Edge" />
      </head>
      <body>
        <div id="root">{children}</div>

        <Script id="matomo-script" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u='//www.hero-ee.com/matomo/';
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '3']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
