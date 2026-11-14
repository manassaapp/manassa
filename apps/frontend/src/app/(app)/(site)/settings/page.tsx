import { SettingsPopup } from '@gitroom/frontend/components/layout/settings.component';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'الإعدادات', en: 'Settings' });
}
export default async function Index(props: {
  searchParams: Promise<{
    code: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  return <SettingsPopup />;
}
