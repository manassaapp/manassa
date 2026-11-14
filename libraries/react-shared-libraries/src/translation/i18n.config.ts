import { brand } from '@gitroom/helpers/brand/brand.config';

/** Language used when a translation key is missing in the active language. */
export const fallbackLng = 'en';
/** Language shown to visitors who have not picked one yet (Arabic first). */
export const defaultLng = brand.defaultLanguage;
/** Languages written right-to-left. */
export const rtlLanguages = ['ar', 'he'];
export const isRtl = (language?: string | null) =>
  rtlLanguages.includes((language || defaultLng).split('-')[0]);

export const languages = [
  'ar',
  'en',
  'he',
  'ru',
  'zh',
  'fr',
  'es',
  'pt',
  'de',
  'it',
  'ja',
  'ko',
  'tr',
  'vi',
];

export const defaultNS = 'translation';
export const cookieName = 'i18next';
export const headerName = 'x-i18next-current-language';
