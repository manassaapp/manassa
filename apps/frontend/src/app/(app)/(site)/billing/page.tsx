export const dynamic = 'force-dynamic';
import { BillingComponent } from '@gitroom/frontend/components/billing/billing.component';
import { Metadata } from 'next';
import { brandMetadata } from '@gitroom/frontend/components/layout/brand.metadata';
export async function generateMetadata(): Promise<Metadata> {
  return brandMetadata({ ar: 'الفوترة', en: 'Billing' });
}
export default async function Page() {
  return (
    <div className="bg-newBgColorInner flex-1 flex-col flex p-[20px] gap-[12px]">
      <BillingComponent />
    </div>
  );
}
