import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
import { Agent } from '@gitroom/frontend/components/agents/agent';
export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'الوكيل الذكي', en: 'Agent' });
}
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Agent>{children}</Agent>;
}
