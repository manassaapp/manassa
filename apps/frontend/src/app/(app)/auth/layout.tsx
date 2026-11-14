import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { BrandPanelComponent } from '@gitroom/frontend/components/auth/brand.panel.component';
import { LanguageComponent } from '@gitroom/frontend/components/layout/language.component';
import { PublicFooterLinks } from '@gitroom/frontend/components/public/public.footer.links';
import { AttributionComponent } from '@gitroom/frontend/components/auth/attribution.component';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { MantineWrapper } from '@gitroom/react/helpers/mantine.wrapper';
import { Toaster } from '@gitroom/react/toaster/toaster';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();

  return (
    <MantineWrapper>
      <Toaster />
      <div className="bg-[#0B0817] flex flex-1 p-[12px] gap-[12px] min-h-screen w-screen text-white">
        {/*<style>{`html, body {overflow-x: hidden;}`}</style>*/}
        <ReturnUrlComponent />
        <AttributionComponent />
        <div className="flex flex-col py-[40px] px-[20px] flex-1 lg:w-[600px] lg:flex-none rounded-[12px] text-white p-[12px] bg-[#120E22]">
          <div className="w-full max-w-[440px] mx-auto justify-center gap-[20px] h-full flex flex-col text-white">
            <div className="flex items-center justify-between gap-[12px]">
              <LogoTextComponent />
              <LanguageComponent />
            </div>
            <main id="main" className="flex">{children}</main>
            <PublicFooterLinks />
          </div>
        </div>
        <div className="flex-1 hidden lg:flex flex-col items-center justify-center px-[48px] overflow-hidden">
          <BrandPanelComponent />
        </div>
      </div>
    </MantineWrapper>
  );
}
