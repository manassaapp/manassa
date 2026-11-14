export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
import { PlatformAnalytics } from '@gitroom/frontend/components/platform-analytics/platform.analytics';
export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'التحليلات', en: 'Analytics' });
}
export default async function Index() {
  return <PlatformAnalytics />;
}
