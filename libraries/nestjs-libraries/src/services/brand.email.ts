import { brand } from '@gitroom/helpers/brand/brand.config';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Wraps every outgoing e-mail in the Manassa (منصة) layout.
 * Arabic first, right-to-left, with an English line where relevant.
 * Content written by users keeps its own direction (dir="auto").
 */
export const brandEmailLayout = (
  subject: string,
  html: string,
  settingsUrl: string
) => {
  const frontend = process.env.FRONTEND_URL || '';
  const logo = frontend
    ? `<img src="${frontend}${brand.assets.logoWithTextDark}" width="180" alt="${escapeHtml(
        brand.name.ar
      )}" style="display:block;border:0;height:auto;max-width:180px" />`
    : `<strong style="font-size:22px;color:${brand.colors.primary}">${escapeHtml(
        brand.name.ar
      )}</strong>`;
  const sender = escapeHtml(process.env.EMAIL_FROM_NAME || brand.name.ar);

  return `
<div dir="rtl" lang="ar" style="margin:0;padding:32px 16px;background:#f5f3fb;font-family:'IBM Plex Sans Arabic',Tahoma,'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8e3f3;">
    <div style="height:4px;background:${brand.colors.primary};"></div>
    <div style="padding:28px 32px 8px 32px;">${logo}</div>
    <div style="padding:8px 32px 0 32px;">
      <h1 dir="auto" style="font-size:22px;line-height:1.4;font-weight:700;margin:0 0 16px 0;color:${brand.colors.ink};text-align:start;">${subject}</h1>
      <div dir="auto" style="font-size:15px;line-height:1.8;color:#334155;text-align:start;">
        ${html}
      </div>
    </div>
    <div style="margin:28px 32px 0 32px;border-top:1px solid #e8e3f3;padding:20px 0 28px 0;">
      <div style="font-size:14px;font-weight:600;color:${brand.colors.ink};">${sender}</div>
      <div style="font-size:12px;line-height:1.7;color:#5e5873;">
        يمكنك تعديل تفضيلات الإشعارات من <a href="${settingsUrl}" style="color:${brand.colors.primary};">إعدادات الحساب</a>.
        <br />
        <span dir="ltr" lang="en">You can change your notification preferences in your <a href="${settingsUrl}" style="color:${brand.colors.primary};">account settings</a>.</span>
      </div>
    </div>
  </div>
</div>`;
};

/** A call-to-action button that works in all major mail clients. */
export const brandEmailButton = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:${brand.colors.primary};color:#ffffff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:10px;">${label}</a>`;
