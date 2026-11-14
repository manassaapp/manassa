import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
import { Agent } from '@gitroom/frontend/components/agents/agent';
import { AgentChat } from '@gitroom/frontend/components/agents/agent.chat';
export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'الوكيل الذكي', en: 'Agent' });
}
export default async function Page() {
  return (
    <AgentChat />
  );
}
