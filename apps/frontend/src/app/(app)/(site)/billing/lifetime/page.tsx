import { LifetimeDeal } from '@gitroom/frontend/components/billing/lifetime.deal';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'الاشتراك مدى الحياة', en: 'Lifetime deal' });
}
export default async function Page() {
  return <LifetimeDeal />;
}
