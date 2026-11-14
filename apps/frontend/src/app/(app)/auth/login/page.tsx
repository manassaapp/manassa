export const dynamic = 'force-dynamic';
import { Login } from '@gitroom/frontend/components/auth/login';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'تسجيل الدخول', en: 'Login' });
}
export default async function Auth() {
  return <Login />;
}
