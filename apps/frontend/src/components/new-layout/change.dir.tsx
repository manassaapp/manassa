'use client';

import {
  cookieName,
  defaultLng,
  isRtl,
} from '@gitroom/react/translation/i18n.config';
import i18next from 'i18next';
import { FC, useEffect } from 'react';

/**
 * Keeps <html lang> and <html dir> in sync with the active language.
 * The server already renders the right values from the language cookie;
 * this only matters after the user switches language in the browser.
 */
export const ChangeDir: FC = () => {
  useEffect(() => {
    const apply = (lng?: string) => {
      const language =
        lng ||
        i18next.resolvedLanguage ||
        document.cookie.match(new RegExp(`(?:^|; )${cookieName}=([^;]*)`))?.[1] ||
        defaultLng;
      document.documentElement.setAttribute('dir', isRtl(language) ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', language);
    };
    apply();
    i18next.on('languageChanged', apply);
    return () => {
      i18next.off('languageChanged', apply);
    };
  }, []);

  return null;
};
