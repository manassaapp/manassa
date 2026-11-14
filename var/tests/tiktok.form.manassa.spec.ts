import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { TikTokFormDto } from '@gitroom/frontend/components/new-launch/providers/tiktok/tiktok.form.dto';

const base = {
  title: '',
  privacy_level: 'PUBLIC_TO_EVERYONE',
  duet: false,
  stitch: false,
  comment: false,
  autoAddMusic: 'no',
  brand_content_toggle: false,
  brand_organic_toggle: false,
  video_made_with_ai: false,
  content_posting_method: 'DIRECT_POST',
  disclose: false,
  creator_check: 'ok',
};

const errors = (v: Record<string, unknown>) =>
  validateSync(plainToInstance(TikTokFormDto, { ...base, ...v })).map(
    (e) => e.property
  );

describe('TikTok form rules (Content Sharing Guidelines)', () => {
  it('accepts a complete direct post', () => {
    expect(errors({})).toEqual([]);
  });

  it('has no default privacy: empty privacy is rejected', () => {
    expect(errors({ privacy_level: '' })).toContain('privacy_level');
  });

  it('requires a choice when commercial disclosure is on', () => {
    expect(errors({ disclose: true })).toContain('tiktok_rules');
    expect(errors({ disclose: true, brand_organic_toggle: true })).toEqual([]);
    expect(errors({ disclose: true, brand_content_toggle: true })).toEqual([]);
  });

  it('does not allow branded content to be private', () => {
    expect(
      errors({ disclose: true, brand_content_toggle: true, privacy_level: 'SELF_ONLY' })
    ).toContain('tiktok_rules');
    expect(
      errors({ disclose: true, brand_organic_toggle: true, privacy_level: 'SELF_ONLY' })
    ).toEqual([]);
  });

  it('blocks a direct post when TikTok says the creator cannot post or the video is too long', () => {
    expect(errors({ creator_check: 'cannot_post' })).toContain('creator_check');
    expect(errors({ creator_check: 'too_long' })).toContain('creator_check');
    expect(errors({ creator_check: 'unknown' })).toEqual([]);
    expect(errors({ creator_check: undefined })).toContain('creator_check');
  });

  it('upload-only (inbox draft) is not blocked by direct-post rules', () => {
    expect(
      errors({
        content_posting_method: 'UPLOAD',
        privacy_level: 'SELF_ONLY',
        disclose: true,
        creator_check: 'cannot_post',
      })
    ).toEqual([]);
  });
});
