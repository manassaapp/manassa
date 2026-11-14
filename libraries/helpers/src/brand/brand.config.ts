/**
 * Central brand configuration for Manassa (منصة).
 *
 * This is the ONLY place the product name, tagline, colours and asset paths
 * are defined. To rename the product, edit this file (and replace the files
 * under apps/frontend/public/brand/), then rebuild.
 *
 * Translations reference the name through the `{{brand}}` variable, which is
 * filled in automatically from `brandName(language)`.
 *
 * This product is a modified version of Postiz (https://github.com/gitroomhq/postiz-app),
 * licensed under AGPL-3.0. The upstream licence and copyright notices are kept
 * in the repository; see LICENSE and NOTICE.md.
 */
export const brand = {
  /** Display name per language. Arabic is the default product language. */
  name: {
    ar: 'منصة',
    en: 'Manassa',
  } as Record<string, string>,
  /** Short tagline per language (used on the homepage, login and meta tags). */
  tagline: {
    ar: 'جدولة ونشر محتواك على كل المنصات الاجتماعية من مكان واحد',
    en: 'Schedule and publish your content to every social network from one place',
  } as Record<string, string>,
  /** Public website of the product (production). */
  website: 'https://manassa.space',
  domain: 'manassa.space',
  /** Your affiliate programme URL; empty hides the "Affiliate" menu item. */
  affiliateUrl: '' as string,
  /** Default UI language and the language list shown first in the switcher. */
  defaultLanguage: 'ar',
  primaryLanguages: ['ar', 'en'],
  /** Brand colours (kept in sync with apps/frontend/src/app/colors.scss). */
  colors: {
    primary: '#6A2BF0',
    primaryHover: '#5B21D6',
    accent: '#A66BFF',
    ink: '#19094B',
  },
  /**
   * Public assets (served from apps/frontend/public), all generated from the
   * official logo var/brand/source/manassa-logo-original.png by
   * var/brand/process_logo.py.
   */
  assets: {
    /** Paper-plane symbol on a white tile (favicon, sidebar, small spaces). */
    logo: '/brand/logo-256.png',
    /** Paper-plane symbol, transparent background. */
    symbol: '/brand/symbol.png',
    /** Full logo with light lettering, for dark backgrounds. */
    logoWithText: '/brand/logo-text.png',
    /** Full logo with navy lettering, for light backgrounds and e-mails. */
    logoWithTextDark: '/brand/logo-text-dark.png',
    favicon: '/favicon.ico',
    icon192: '/brand/icon-192.png',
    icon512: '/brand/icon-512.png',
    appleTouchIcon: '/brand/apple-touch-icon.png',
    socialPreview: '/brand/og-image.png',
  },
  /** Contact and legal details shown on the public pages. Edit before launch. */
  legal: {
    companyName: {
      ar: 'منصة',
      en: 'Manassa',
    } as Record<string, string>,
    contactEmail: 'support@manassa.space',
    country: { ar: 'مصر', en: 'Egypt' } as Record<string, string>,
    lastUpdated: '2026-11-14',
  },
  /** Upstream project, required for AGPL-3.0 source availability notices. */
  upstream: {
    name: 'Postiz',
    url: 'https://github.com/gitroomhq/postiz-app',
    license: 'AGPL-3.0',
  },
  /**
   * Where users can download the source code of THIS modified version
   * (AGPL-3.0 section 13). Set SOURCE_CODE_URL in the environment to your
   * public repository before offering the app to other people.
   */
  sourceCodeUrlEnv: 'SOURCE_CODE_URL',
} as const;

export const brandName = (language?: string | null) =>
  brand.name[(language || brand.defaultLanguage).split('-')[0]] ||
  brand.name.en;

export const brandTagline = (language?: string | null) =>
  brand.tagline[(language || brand.defaultLanguage).split('-')[0]] ||
  brand.tagline.en;

/** "<Brand> <suffix>" page titles, e.g. pageTitle('Calendar') -> "منصة | Calendar" */
export const pageTitle = (suffix?: string, language?: string | null) =>
  suffix ? `${brandName(language)} | ${suffix}` : brandName(language);

/** English product name, used in backend messages, e-mails and API metadata. */
export const BRAND_NAME = brand.name.en;
