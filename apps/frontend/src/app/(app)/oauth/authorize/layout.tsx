import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
import { ReactNode } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'تفويض تطبيق', en: 'Authorize Application' });
}

export default async function OAuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-[#0B0A0A] flex flex-1 min-h-screen w-screen">
      {children}
    </div>
  );
}
