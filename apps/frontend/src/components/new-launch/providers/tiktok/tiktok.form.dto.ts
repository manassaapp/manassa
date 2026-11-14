import {
  IsIn,
  IsOptional,
  ValidateIf,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { TikTokDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/tiktok.dto';

/**
 * Form rules for the "Post to TikTok" settings screen, from TikTok's Content
 * Sharing Guidelines (developers.tiktok.com/doc/content-sharing-guidelines,
 * checked 2026-11-14). Used by the dashboard only: the shared TikTokDto (and
 * therefore the public API and what is sent to TikTok) is unchanged.
 */
@ValidatorConstraint({ name: 'tiktokDisclosureChoice', async: false })
class DisclosureChoice implements ValidatorConstraintInterface {
  validate(_: unknown, args: ValidationArguments) {
    const o = args.object as TikTokFormDto;
    if (o.content_posting_method === 'UPLOAD' || !o.disclose) {
      return true;
    }
    return !!o.brand_organic_toggle || !!o.brand_content_toggle;
  }
  defaultMessage() {
    return 'You need to indicate if your content promotes yourself, a third party, or both.';
  }
}

@ValidatorConstraint({ name: 'tiktokBrandedNotPrivate', async: false })
class BrandedNotPrivate implements ValidatorConstraintInterface {
  validate(_: unknown, args: ValidationArguments) {
    const o = args.object as TikTokFormDto;
    if (o.content_posting_method === 'UPLOAD') {
      return true;
    }
    return !(o.disclose && o.brand_content_toggle && o.privacy_level === 'SELF_ONLY');
  }
  defaultMessage() {
    return 'Branded content visibility cannot be set to private.';
  }
}

export class TikTokFormDto extends TikTokDto {
  @IsOptional()
  disclose?: boolean;

  /**
   * Never set: carries the cross-field rules above so a broken rule blocks
   * scheduling. The screen shows its own translated explanation.
   */
  @Validate(DisclosureChoice)
  @Validate(BrandedNotPrivate)
  tiktok_rules?: undefined;

  /**
   * Result of the creator_info check made when the screen opens:
   * 'ok', 'unknown' (could not be checked), 'cannot_post' or 'too_long'.
   * Only Direct Post is blocked by it.
   */
  @ValidateIf((o) => o.content_posting_method === 'DIRECT_POST')
  @IsIn(['ok', 'unknown'], {
    message:
      'TikTok does not allow this post right now: check the notice above the settings.',
  })
  creator_check?: string;
}
