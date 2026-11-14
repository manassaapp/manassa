import { ReactNode } from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import {
  cookieName,
  defaultLng,
} from '@gitroom/react/translation/i18n.config';
import { getT } from '@gitroom/react/translation/get.translation.service.backend';
import { brand, brandName } from '@gitroom/helpers/brand/brand.config';
import { PublicLanguageToggle } from '@gitroom/frontend/components/public/language.toggle';
import { PublicFooterLinks } from '@gitroom/frontend/components/public/public.footer.links';

/** Header + footer shared by the homepage and the legal pages. */
export const PublicShell = async ({ children }: { children: ReactNode }) => {
  const language = (await cookies()).get(cookieName)?.value || defaultLng;
  const t = await getT();
  const name = brandName(language);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full max-w-[1120px] mx-auto px-[20px] h-[84px] flex items-center justify-between gap-[16px]">
        <Link href="/" aria-label={name} className="ltr inline-flex" dir="ltr">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brand.assets.logoWithText} alt={name} width={160} height={60} className="h-[56px] w-auto" />
        </Link>
        <div className="flex items-center gap-[10px]">
          <PublicLanguageToggle language={language} />
          <Link
            href="/auth/login"
            className="h-[36px] px-[16px] rounded-[10px] bg-btnPrimary text-white text-[14px] font-[600] flex items-center hover:opacity-90"
          >
            {t('sign_in', 'Sign in')}
          </Link>
        </div>
      </header>
      <main id="main" className="flex-1 w-full">
        {children}
      </main>
      <footer className="w-full border-t border-white/10 mt-[64px]">
        <div className="max-w-[1120px] mx-auto px-[20px] py-[28px] flex flex-col md:flex-row gap-[16px] md:items-center md:justify-between">
          <div className="text-[13px] text-white/50">
            © {new Date().getFullYear()} {brand.legal.companyName[language.startsWith('ar') ? 'ar' : 'en']}
            {' · '}
            {t('built_on_postiz', 'Built on the open-source Postiz project')}
          </div>
          <PublicFooterLinks />
        </div>
      </footer>
    </div>
  );
};
