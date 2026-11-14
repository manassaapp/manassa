import { MediaLayoutComponent } from '@gitroom/frontend/components/new-layout/layout.media.component';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';

export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'مكتبة الوسائط', en: 'Media' });
}

export default async function Page() {
  return <MediaLayoutComponent />
}
