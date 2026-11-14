import i18next from './i18next';
import { cookieName, defaultLng, languages } from './i18n.config';
import { brandName } from '@gitroom/helpers/brand/brand.config';

const requestLanguage = async (): Promise<string> => {
  try {
    const { cookies } = await import('next/headers');
    const value = (await cookies()).get(cookieName)?.value;
    if (value && languages.includes(value)) {
      return value;
    }
  } catch (e) {
    // not inside a Next.js request (e.g. tests)
  }
  return defaultLng;
};

/**
 * Server-side translation function for the language of the current request
 * (cookie, otherwise Arabic). `{{brand}}` is filled with the product name.
 */
export async function getT(ns?: string, options?: any) {
  if (ns && !i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns);
  }
  const lng = await requestLanguage();
  if (!i18next.hasResourceBundle(lng, ns || 'translation')) {
    await i18next.loadLanguages(lng);
  }
  const t = i18next.getFixedT(
    lng,
    Array.isArray(ns) ? ns[0] : ns,
    options?.keyPrefix
  );
  const brand = brandName(lng);
  return ((key: any, a?: any, b?: any) => {
    if (typeof a === 'string') {
      return t(key, a, { brand, ...(b || {}) });
    }
    return t(key, { brand, ...(a || {}) });
  }) as unknown as typeof t;
}
