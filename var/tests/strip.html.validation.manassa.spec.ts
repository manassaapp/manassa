import { stripHtmlValidation } from '@gitroom/helpers/utils/strip.html.validation';

/**
 * Arabic, mixed Arabic/English text, hashtags, mentions, URLs and emoji must
 * reach the social networks exactly as written. These checks run the shared
 * text conversion used by the providers before publishing.
 */
const samples = [
  'مرحبًا بكم في منصة! 🎉',
  'إطلاق جديد New launch اليوم 🚀 #تسويق #marketing',
  'شكرًا @manassa_app على الدعم 🙏',
  'اقرأ المزيد: https://example.com/ar/مقال?x=1&y=2',
  '١٢٣ - 123 — نص RTL مع LTR (قوسين) [معقوفين]',
  'سطر أول\nسطر ثانٍ',
];

describe('post text survives conversion unchanged', () => {
  it.each(samples)('plain text type "none": %s', (text) => {
    expect(stripHtmlValidation('none', text)).toBe(text);
  });

  it.each(samples.filter((s) => !s.includes('\n')))(
    'editor HTML paragraph, type "normal": %s',
    (text) => {
      const html = `<p>${text.replace(/&/g, '&amp;')}</p>`;
      const out = stripHtmlValidation('normal', html);
      expect(out.trim()).toBe(text);
    }
  );

  it('does not change text when plain=true', () => {
    for (const s of samples) {
      expect(stripHtmlValidation('normal', s, false, false, true)).toBe(s);
    }
  });
});
