import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import {
  fallbackLng,
  defaultLng,
  languages,
  defaultNS,
  cookieName,
} from './i18n.config';
import { brandName } from '@gitroom/helpers/brand/brand.config';
const runsOnServerSide = typeof window === 'undefined';

// Visitors without a saved choice get Arabic (the product default),
// not the browser language.
const savedLanguage = (() => {
  if (runsOnServerSide) {
    return undefined;
  }
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + cookieName + '=([^;]*)')
  );
  const value = match ? decodeURIComponent(match[1]) : undefined;
  return value && languages.includes(value) ? value : undefined;
})();

// `{{brand}}` in any translation resolves to the product name in the
// active language (see libraries/helpers/src/brand/brand.config.ts).
const brandVariables = { brand: brandName(savedLanguage || defaultLng) };

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: any, namespace: any) => {
      return import(`./locales/${language}/${namespace}.json`);
    })
  )
  .init({
    supportedLngs: languages,
    fallbackLng,
    lng: runsOnServerSide ? undefined : savedLanguage || defaultLng,
    fallbackNS: defaultNS,
    defaultNS,
    detection: {
      order: ['cookie', 'header'],
    },
    interpolation: {
      defaultVariables: brandVariables,
    },
    preload: runsOnServerSide ? languages : [],
  });

i18next.on('languageChanged', (lng) => {
  brandVariables.brand = brandName(lng);
});

export default i18next;
