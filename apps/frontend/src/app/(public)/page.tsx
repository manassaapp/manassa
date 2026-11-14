import Link from 'next/link';
import { cookies } from 'next/headers';
import {
  cookieName,
  defaultLng,
} from '@gitroom/react/translation/i18n.config';
import { getT } from '@gitroom/react/translation/get.translation.service.backend';
import { brand, brandTagline } from '@gitroom/helpers/brand/brand.config';
import { PublicShell } from '@gitroom/frontend/components/public/public.shell';

export const dynamic = 'force-dynamic';

const PLATFORMS = [
  'Instagram', 'TikTok', 'YouTube', 'Facebook', 'X', 'LinkedIn', 'Threads',
  'Pinterest', 'Reddit', 'Telegram', 'Discord', 'Bluesky', 'Mastodon',
];

/** Public homepage (signed-out visitors). */
export default async function HomePage() {
  const language = (await cookies()).get(cookieName)?.value || defaultLng;
  const t = await getT();
  const features = [
    {
      title: t('home_feature_calendar_title', 'A calendar for all your channels'),
      body: t('home_feature_calendar_body', 'See every scheduled, draft and published post in one weekly or monthly view, and move posts with drag and drop.'),
    },
    {
      title: t('home_feature_arabic_title', 'Built for Arabic'),
      body: t('home_feature_arabic_body', 'A right-to-left interface, and posts in Arabic, English or both are published exactly as you wrote them, with hashtags, mentions, links and emoji.'),
    },
    {
      title: t('home_feature_team_title', 'Made for teams'),
      body: t('home_feature_team_body', 'Invite your team, give each person a role, comment on posts and share one media library.'),
    },
    {
      title: t('home_feature_ai_title', 'AI that helps you write'),
      body: t('home_feature_ai_body', 'Get help writing captions and creating images, then review everything before it goes out.'),
    },
    {
      title: t('home_feature_analytics_title', 'Analytics'),
      body: t('home_feature_analytics_body', 'Follow the results of each channel and learn what works for your audience.'),
    },
    {
      title: t('home_feature_api_title', 'API and automation'),
      body: t('home_feature_api_body', 'Connect your own tools with the public API, webhooks and automation platforms such as n8n.'),
    },
  ];

  return (
    <PublicShell>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-[200px] start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[120px] opacity-30 pointer-events-none"
          style={{ background: brand.colors.primary }}
        />
        <div className="relative max-w-[1120px] mx-auto px-[20px] pt-[56px] pb-[40px] flex flex-col items-center text-center gap-[24px]">
          <h1 className="text-[32px] md:text-[44px] leading-[1.3] font-[700] max-w-[820px]">
            {brandTagline(language)}
          </h1>
          <p className="text-[18px] leading-[1.8] text-white/70 max-w-[680px]">
            {t(
              'home_hero_subtitle',
              '{{brand}} helps creators, brands and agencies plan, schedule and publish social media content from one dashboard.'
            )}
          </p>
          <div className="flex flex-wrap gap-[12px] justify-center">
            <Link
              href="/auth"
              className="h-[48px] px-[28px] rounded-[12px] bg-btnPrimary text-white text-[16px] font-[600] flex items-center hover:opacity-90"
            >
              {t('home_cta_start', 'Create a free account')}
            </Link>
            <Link
              href="/auth/login"
              className="h-[48px] px-[28px] rounded-[12px] border border-white/20 text-[16px] font-[600] flex items-center hover:bg-white/10"
            >
              {t('sign_in', 'Sign in')}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="platforms" className="max-w-[1120px] mx-auto px-[20px] py-[24px]">
        <h2 id="platforms" className="text-center text-[15px] text-white/60 mb-[16px]">
          {t('home_platforms_title', 'Publish to the networks you already use')}
        </h2>
        <ul className="ltr flex flex-wrap justify-center gap-[10px]" dir="ltr">
          {PLATFORMS.map((p) => (
            <li key={p} className="px-[14px] h-[36px] flex items-center rounded-full border border-white/10 bg-white/[0.04] text-[14px]">
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="features" className="max-w-[1120px] mx-auto px-[20px] pt-[48px]">
        <h2 id="features" className="text-[30px] font-[700] mb-[28px] text-center">
          {t('home_features_title', 'Everything you need to run your social media')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {features.map((f) => (
            <article key={f.title} className="rounded-[16px] border border-white/10 bg-[#120E22] p-[24px] flex flex-col gap-[10px]">
              <h3 className="text-[18px] font-[700]">{f.title}</h3>
              <p className="text-[15px] leading-[1.8] text-white/70">{f.body}</p>
            </article>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
