export const dynamic = 'force-dynamic';
import '../global.scss';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { brandFont } from '@gitroom/frontend/fonts/brand.font';
import {
  cookieName,
  defaultLng,
  isRtl,
} from '@gitroom/react/translation/i18n.config';
import {
  brand,
  brandName,
  brandTagline,
} from '@gitroom/helpers/brand/brand.config';

export async function generateMetadata(): Promise<Metadata> {
  const language = (await cookies()).get(cookieName)?.value || defaultLng;
  const name = brandName(language);
  const description = brandTagline(language);
  const base = process.env.FRONTEND_URL;
  return {
    ...(base ? { metadataBase: new URL(base) } : {}),
    title: name,
    description,
    applicationName: name,
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [{ url: '/favicon.ico', sizes: 'any' }],
      apple: brand.assets.appleTouchIcon,
    },
    openGraph: {
      type: 'website',
      siteName: name,
      title: name,
      description,
      images: [{ url: brand.assets.socialPreview, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images: [brand.assets.socialPreview],
    },
  };
}

export const viewport: Viewport = { themeColor: brand.colors.ink };

/** Layout of the public pages: homepage, Privacy Policy, Terms of Service. */
export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const language = (await cookies()).get(cookieName)?.value || defaultLng;
  return (
    <html lang={language} dir={isRtl(language) ? 'rtl' : 'ltr'}>
      <body
        className={clsx(
          brandFont.className,
          brandFont.variable,
          'dark min-h-screen !bg-[#0B0817] text-white'
        )}
      >
        <a href="#main" className="skip-link">
          {language.startsWith('ar') ? 'انتقل إلى المحتوى' : 'Skip to content'}
        </a>
        {children}
      </body>
    </html>
  );
}
