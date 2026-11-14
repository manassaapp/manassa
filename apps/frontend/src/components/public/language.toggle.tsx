'use client';

import { FC } from 'react';
import { cookieName } from '@gitroom/react/translation/i18n.config';

/** Arabic / English switch for the public pages (no modal, no app state). */
export const PublicLanguageToggle: FC<{ language: string }> = ({
  language,
}) => {
  const isAr = language.startsWith('ar');
  const next = isAr ? 'en' : 'ar';
  return (
    <button
      type="button"
      lang={next}
      onClick={() => {
        document.cookie = `${cookieName}=${next}; path=/; max-age=31536000; SameSite=Lax`;
        window.location.reload();
      }}
      className="h-[36px] px-[14px] rounded-[10px] border border-white/15 text-[14px] font-[600] hover:bg-white/10"
    >
      {isAr ? 'English' : 'العربية'}
    </button>
  );
};
