import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
import { LegalPage } from '@gitroom/frontend/components/public/legal.page';
import { privacyPolicy } from '@gitroom/frontend/components/public/legal.content';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'سياسة الخصوصية', en: 'Privacy Policy' });
}

export default async function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
