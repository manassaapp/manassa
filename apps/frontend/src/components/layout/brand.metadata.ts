import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { cookieName } from '@gitroom/react/translation/i18n.config';
import {
  brand,
  brandName,
  brandTagline,
} from '@gitroom/helpers/brand/brand.config';

/**
 * Builds the <title>/description for a page in the visitor's language,
 * always prefixed by the central brand name. Arabic is the default.
 */
export const brandMetadata = async (
  titles: { ar: string; en: string },
  description?: { ar: string; en: string }
): Promise<Metadata> => {
  const cookieStore = await cookies();
  const language = cookieStore.get(cookieName)?.value || brand.defaultLanguage;
  const isAr = language.startsWith('ar');
  const title = isAr ? titles.ar : titles.en;
  return {
    title: title ? `${brandName(language)} | ${title}` : brandName(language),
    description: description
      ? isAr
        ? description.ar
        : description.en
      : brandTagline(language),
  };
};
