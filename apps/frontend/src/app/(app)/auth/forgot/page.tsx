export const dynamic = 'force-dynamic';
import { Forgot } from '@gitroom/frontend/components/auth/forgot';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'استعادة كلمة المرور', en: 'Forgot Password' });
}
export default async function Auth() {
  return <Forgot />;
}
