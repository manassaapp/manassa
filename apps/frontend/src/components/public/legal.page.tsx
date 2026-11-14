import { cookies } from 'next/headers';
import {
  cookieName,
  defaultLng,
} from '@gitroom/react/translation/i18n.config';
import { brand, brandName } from '@gitroom/helpers/brand/brand.config';
import { LegalDoc } from '@gitroom/frontend/components/public/legal.content';
import { PublicShell } from '@gitroom/frontend/components/public/public.shell';

const fill = (text: string, lang: 'ar' | 'en') =>
  text
    .replace(/\{\{brand\}\}/g, brandName(lang))
    .replace(/\{\{email\}\}/g, brand.legal.contactEmail)
    .replace(/\{\{country\}\}/g, brand.legal.country[lang])
    .replace(/\{\{updated\}\}/g, brand.legal.lastUpdated);

/** Renders a legal document in the visitor's language (Arabic by default). */
export const LegalPage = async ({
  doc,
}: {
  doc: Record<'ar' | 'en', LegalDoc>;
}) => {
  const language = (await cookies()).get(cookieName)?.value || defaultLng;
  const lang: 'ar' | 'en' = language.startsWith('ar') ? 'ar' : 'en';
  const d = doc[lang];
  return (
    <PublicShell>
      <article className="max-w-[780px] mx-auto px-[20px] pt-[32px] flex flex-col gap-[28px]">
        <header className="flex flex-col gap-[12px]">
          <h1 className="text-[34px] font-[700]">{d.title}</h1>
          <p className="text-[16px] leading-[1.8] text-white/70">{fill(d.intro, lang)}</p>
        </header>
        {d.sections.map((s) => (
          <section key={s.title} className="flex flex-col gap-[10px]">
            <h2 className="text-[20px] font-[700]">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.9] text-white/80">
                {fill(p, lang)}
              </p>
            ))}
          </section>
        ))}
      </article>
    </PublicShell>
  );
};
