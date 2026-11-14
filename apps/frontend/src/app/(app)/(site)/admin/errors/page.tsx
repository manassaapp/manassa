export const dynamic = 'force-dynamic';
import { AdminErrorsComponent } from '@gitroom/frontend/components/admin/admin-errors.component';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';

export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'أخطاء النظام', en: 'Admin Errors' });
}

export default async function Page() {
  return (
    <div className="bg-newBgColorInner flex-1 flex-col flex p-[20px] gap-[12px]">
      <AdminErrorsComponent />
    </div>
  );
}
