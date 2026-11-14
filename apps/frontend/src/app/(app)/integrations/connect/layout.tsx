import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
import { ReactNode } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'ربط قناة', en: 'Connect Channel' });
}

export default async function ConnectLinkLayout({
  children,
}: {
  children: ReactNode;
}) {
  // w-full: the page can be taller than a small window, and w-screen then adds
  // a horizontal scrollbar next to the vertical one
  return (
    <div className="bg-[#0B0A0A] flex flex-1 min-h-screen w-full">
      {children}
    </div>
  );
}
