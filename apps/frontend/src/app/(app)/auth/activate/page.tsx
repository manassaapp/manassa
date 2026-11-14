export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
import { Activate } from '@gitroom/frontend/components/auth/activate';
export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'تفعيل الحساب', en: 'Activate your account' });
}
export default async function Auth() {
  return <Activate />;
}
