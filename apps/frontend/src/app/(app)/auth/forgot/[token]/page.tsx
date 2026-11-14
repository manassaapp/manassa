export const dynamic = 'force-dynamic';
import { ForgotReturn } from '@gitroom/frontend/components/auth/forgot-return';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'استعادة كلمة المرور', en: 'Forgot Password' });
}
export default async function Auth(params: {
  params: Promise<{
    token: string;
  }>;
}) {
  return <ForgotReturn token={(await params.params).token} />;
}
