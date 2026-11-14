import { getT } from '@gitroom/react/translation/get.translation.service.backend';
import { brand } from '@gitroom/helpers/brand/brand.config';

/**
 * Right-hand panel of the sign-in / sign-up pages: what the product does.
 * No usage numbers or testimonials: add real ones here once you have them.
 */
export const BrandPanelComponent = async () => {
  const t = await getT();
  const features = [
    t('brand_panel_feature_schedule', 'Plan and schedule posts on a visual calendar'),
    t('brand_panel_feature_channels', 'Publish to Instagram, TikTok, YouTube, X, LinkedIn, Facebook and more from one place'),
    t('brand_panel_feature_arabic', 'Arabic-first, with full support for Arabic, English and mixed posts'),
    t('brand_panel_feature_team', 'Work as a team with roles, approvals, comments and a shared media library'),
    t('brand_panel_feature_analytics', 'Track results with analytics for every channel'),
  ];
  return (
    <div className="relative w-full max-w-[560px] flex flex-col gap-[32px] text-start">
      <div
        className="absolute -top-[120px] -end-[80px] w-[360px] h-[360px] rounded-full blur-[90px] opacity-40 pointer-events-none"
        style={{ background: brand.colors.primary }}
        aria-hidden="true"
      />
      <h2 className="relative text-[40px] leading-[1.3] font-[700]">
        {t('brand_panel_title', 'All your social media, in one calm place')}
      </h2>
      <p className="relative text-[18px] leading-[1.7] text-white/70">
        {t(
          'brand_panel_subtitle',
          'Write once, schedule for the best time and let {{brand}} publish for you.'
        )}
      </p>
      <ul className="relative flex flex-col gap-[14px]">
        {features.map((f) => (
          <li key={f} className="flex gap-[12px] items-start text-[16px] leading-[1.7]">
            <span
              className="mt-[6px] shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center"
              style={{ background: brand.colors.primary }}
              aria-hidden="true"
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6.5 4.8 9 10 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
