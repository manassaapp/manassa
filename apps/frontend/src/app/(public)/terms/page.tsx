import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
import { LegalPage } from '@gitroom/frontend/components/public/legal.page';
import { termsOfService } from '@gitroom/frontend/components/public/legal.content';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'شروط الاستخدام', en: 'Terms of Service' });
}

export default async function TermsPage() {
  return <LegalPage doc={termsOfService} />;
}
