export const dynamic = 'force-dynamic';
import { LaunchesComponent } from '@gitroom/frontend/components/launches/launches.component';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'التقويم', en: 'Calendar' });
}
export default async function Index() {
  return <LaunchesComponent />;
}
