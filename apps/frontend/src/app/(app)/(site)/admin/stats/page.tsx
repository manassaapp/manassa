export const dynamic = 'force-dynamic';
import { AdminStatsComponent } from '@gitroom/frontend/components/admin/admin-stats.component';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';

export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'إحصاءات الإدارة', en: 'Admin Stats' });
}

export default async function Page() {
  return (
    <div className="bg-newBgColorInner flex-1 min-w-0 flex-col flex p-[20px] gap-[12px]">
      <AdminStatsComponent />
    </div>
  );
}
