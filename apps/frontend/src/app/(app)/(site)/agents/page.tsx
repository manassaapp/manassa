import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
import { redirect } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'الوكيل الذكي', en: 'Agent' });
}

export default async function Page() {
  return redirect('/agents/new');
}
