import localFont from 'next/font/local';

/**
 * Product typeface: IBM Plex Sans Arabic (SIL Open Font License, see
 * ./ibm-plex-sans-arabic/OFL.txt). It contains Arabic and Latin glyphs, so
 * Arabic, English and mixed text share one consistent look.
 */
export const brandFont = localFont({
  src: [
    { path: './ibm-plex-sans-arabic/IBMPlexSansArabic-Regular.ttf', weight: '400', style: 'normal' },
    { path: './ibm-plex-sans-arabic/IBMPlexSansArabic-Medium.ttf', weight: '500', style: 'normal' },
    { path: './ibm-plex-sans-arabic/IBMPlexSansArabic-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './ibm-plex-sans-arabic/IBMPlexSansArabic-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-brand',
  display: 'swap',
  fallback: ['Tahoma', 'Segoe UI', 'Arial', 'sans-serif'],
});
