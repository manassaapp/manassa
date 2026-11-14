import {
  brand,
  brandName,
  brandTagline,
  pageTitle,
  BRAND_NAME,
} from '@gitroom/helpers/brand/brand.config';

describe('brand config', () => {
  it('defaults to Arabic', () => {
    expect(brand.defaultLanguage).toBe('ar');
    expect(brandName()).toBe(brand.name.ar);
    expect(brandName(null)).toBe(brand.name.ar);
  });

  it('returns the English name for English and region variants', () => {
    expect(brandName('en')).toBe(brand.name.en);
    expect(brandName('en-US')).toBe(brand.name.en);
    expect(brandName('ar-EG')).toBe(brand.name.ar);
  });

  it('falls back to English for languages without a brand name', () => {
    expect(brandName('de')).toBe(brand.name.en);
    expect(brandTagline('fr')).toBe(brand.tagline.en);
  });

  it('builds page titles with the brand first', () => {
    expect(pageTitle('Calendar', 'en')).toBe(`${brand.name.en} | Calendar`);
    expect(pageTitle(undefined, 'ar')).toBe(brand.name.ar);
  });

  it('exposes the English name for backend messages', () => {
    expect(BRAND_NAME).toBe(brand.name.en);
  });

  it('keeps white text on the primary colour readable (WCAG AA)', () => {
    const lum = (hex: string) => {
      const c = [1, 3, 5]
        .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
        .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const ratio = (1 + 0.05) / (lum(brand.colors.primary) + 0.05);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
