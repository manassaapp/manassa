import Link from 'next/link';
import { getT } from '@gitroom/react/translation/get.translation.service.backend';
import { brand } from '@gitroom/helpers/brand/brand.config';

/**
 * Footer links shown on every public page and on the sign-in pages:
 * Privacy Policy, Terms of Service and the AGPL-3.0 source code offer.
 */
export const PublicFooterLinks = async () => {
  const t = await getT();
  const sourceUrl = process.env[brand.sourceCodeUrlEnv] || brand.upstream.url;
  return (
    <nav
      aria-label={t('legal_links', 'Legal')}
      className="flex flex-wrap items-center gap-x-[16px] gap-y-[6px] text-[13px] text-white/60"
    >
      <Link className="hover:text-white underline-offset-4 hover:underline" href="/privacy">
        {t('privacy_policy', 'Privacy Policy')}
      </Link>
      <Link className="hover:text-white underline-offset-4 hover:underline" href="/terms">
        {t('terms_of_service', 'Terms of Service')}
      </Link>
      <a
        className="hover:text-white underline-offset-4 hover:underline"
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('source_code_agpl', 'Source code (AGPL-3.0)')}
      </a>
    </nav>
  );
};
