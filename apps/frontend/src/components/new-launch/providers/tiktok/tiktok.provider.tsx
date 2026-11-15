'use client';

import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import {
  PostComment,
  withProvider,
} from '@gitroom/frontend/components/new-launch/providers/high.order.provider';
import { TikTokFormDto } from '@gitroom/frontend/components/new-launch/providers/tiktok/tiktok.form.dto';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { useCustomProviderFunction } from '@gitroom/frontend/components/launches/helpers/use.custom.provider.function';
import { Select } from '@gitroom/react/form/select';
import { Checkbox } from '@gitroom/react/form/checkbox';
import clsx from 'clsx';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { useIntegration } from '@gitroom/frontend/components/launches/helpers/use.integration';
import { Input } from '@gitroom/react/form/input';
import { TiktokPreview } from '@gitroom/frontend/components/new-launch/providers/tiktok/tiktok.preview';
import { TikTokMusicSelector } from '@gitroom/frontend/components/new-launch/providers/tiktok/tiktok.music';
import { TikTokLocationSelector } from '@gitroom/frontend/components/new-launch/providers/tiktok/tiktok.location';

type CreatorInfo = {
  canPost: boolean;
  errorCode?: string;
  nickname?: string;
  username?: string;
  avatar?: string;
  privacyLevelOptions?: string[];
  commentDisabled?: boolean;
  duetDisabled?: boolean;
  stitchDisabled?: boolean;
  maxVideoPostDurationSec?: number;
};

const ALL_PRIVACY_LEVELS = [
  'PUBLIC_TO_EVERYONE',
  'MUTUAL_FOLLOW_FRIENDS',
  'FOLLOWER_OF_CREATOR',
  'SELF_ONLY',
];

const InfoIcon: FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="shrink-0 mt-[2px]"
  >
    <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 10.5v6M12 7.5v.01"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const Notice: FC<{ tone?: 'info' | 'error'; children: ReactNode }> = ({
  tone = 'info',
  children,
}) => (
  <div
    role={tone === 'error' ? 'alert' : 'note'}
    className={clsx(
      'p-[12px] rounded-[10px] flex gap-[10px] items-start text-[13px] leading-[1.7]',
      tone === 'error'
        ? 'bg-red-500/10 border border-red-500/40 text-red-300'
        : 'bg-tableBorder'
    )}
  >
    <InfoIcon />
    <div>{children}</div>
  </div>
);

/** Duration in seconds of a video URL (metadata only, nothing is played). */
const useVideoDuration = (url?: string) => {
  const [measured, setMeasured] = useState<{
    url: string;
    duration: number | null;
  } | null>(null);
  useEffect(() => {
    if (!url) {
      return;
    }
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.onloadedmetadata = () =>
      setMeasured({ url, duration: video.duration || null });
    video.onerror = () => setMeasured({ url, duration: null });
    video.src = url;
    return () => {
      video.removeAttribute('src');
      video.load();
    };
  }, [url]);
  // a result measured for another video is ignored
  return measured && measured.url === url ? measured.duration : null;
};

/**
 * "Post to TikTok" settings, following TikTok's Content Sharing Guidelines
 * (developers.tiktok.com/doc/content-sharing-guidelines, last updated
 * 2026-08-04, checked 2026-11-14): the creator is shown by nickname, the
 * privacy level is chosen by the user from creator_info with no default,
 * interactions are off by default and greyed out when the creator disabled
 * them, commercial content can be disclosed, the required consent text is
 * shown, and the user is told processing can take a few minutes.
 * Field names (and therefore what is sent to TikTok) are unchanged.
 */
const TikTokSettings: FC<{
  values?: any;
}> = () => {
  const { watch, register, setValue, getValues, formState } = useSettings();
  const { value, integration } = useIntegration();
  const customFunc = useCustomProviderFunction();
  const t = useT();

  // Music and location come from the Business API (v1.3) - the legacy Content
  // Posting API used by the "tiktok" identifier has no such fields.
  const isBusiness = integration?.identifier === 'tiktok-business';

  const isTitle = useMemo(() => {
    return value?.[0]?.image?.some(
      (p) => (p?.path?.indexOf?.('mp4') ?? -1) === -1
    );
  }, [value]);

  const hasMedia = (value?.[0]?.image?.length ?? 0) > 0;
  const isVideo = hasMedia && !isTitle;
  const isPhoto = hasMedia && !!isTitle;
  const videoUrl = isVideo ? value?.[0]?.image?.[0]?.path : undefined;
  const videoDuration = useVideoDuration(videoUrl);

  const disclose = watch('disclose');
  const autoAddMusic = watch('autoAddMusic');
  const privacy = watch('privacy_level');
  const brand_organic_toggle = watch('brand_organic_toggle');
  const brand_content_toggle = watch('brand_content_toggle');
  const content_posting_method = watch('content_posting_method');
  const isUploadMode = content_posting_method === 'UPLOAD';

  // ---- creator_info (Content Posting API only) ----
  // The answer is stored with the channel id it belongs to, so switching
  // channels shows "loading" until that channel's answer arrives.
  const [creatorResult, setCreatorResult] = useState<{
    id: string;
    data: CreatorInfo | null;
  } | null>(null);
  useEffect(() => {
    let cancelled = false;
    const id = integration?.id;
    if (isBusiness || !id) {
      return;
    }
    customFunc
      .get('creatorInfo')
      .then((data: CreatorInfo) => {
        if (!cancelled) {
          setCreatorResult({
            id,
            data: data && typeof data === 'object' ? data : null,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCreatorResult({ id, data: null });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [integration?.id, isBusiness]);
  const creatorLoading =
    !isBusiness &&
    !!integration?.id &&
    creatorResult?.id !== integration?.id;
  const creator = creatorLoading ? null : creatorResult?.data ?? null;

  const maxDuration = creator?.maxVideoPostDurationSec || 0;
  const tooLong =
    !!maxDuration && !!videoDuration && videoDuration > maxDuration + 0.5;
  const cannotPost =
    !!creator &&
    creator.canPost === false &&
    creator.errorCode !== 'network_error';

  // Result of the checks above, validated by TikTokFormDto (blocks scheduling
  // a Direct Post that TikTok would refuse).
  useEffect(() => {
    if (creatorLoading) {
      return;
    }
    const next = cannotPost
      ? 'cannot_post'
      : tooLong
      ? 'too_long'
      : creator?.canPost
      ? 'ok'
      : 'unknown';
    if (getValues('creator_check') !== next) {
      setValue('creator_check', next, { shouldValidate: true });
    }
  }, [creatorLoading, cannotPost, tooLong, creator?.canPost]);

  // TikTok ignores the privacy level on "upload without posting"; the shared
  // DTO still requires one, so a value is filled in only for that mode.
  useEffect(() => {
    if (isUploadMode && !getValues('privacy_level')) {
      setValue('privacy_level', 'SELF_ONLY', { shouldValidate: true });
    }
  }, [isUploadMode]);

  // The music field is shown for photos only, but the shared DTO requires a
  // value for every post: default it to "no" so video posts can be scheduled.
  useEffect(() => {
    if (!getValues('autoAddMusic')) {
      setValue('autoAddMusic', 'no', { shouldValidate: true });
    }
  }, [autoAddMusic]);

  // Interactions the creator turned off in the TikTok app stay off.
  useEffect(() => {
    if (!creator?.canPost) {
      return;
    }
    if (creator.commentDisabled && getValues('comment')) {
      setValue('comment', false);
    }
    if (creator.duetDisabled && getValues('duet')) {
      setValue('duet', false);
    }
    if (creator.stitchDisabled && getValues('stitch')) {
      setValue('stitch', false);
    }
  }, [creator]);

  // Branded content cannot be private: switch the audience to public; the
  // notice under the audience field tells the user (the second option TikTok's
  // guidelines allow).
  useEffect(() => {
    if (disclose && brand_content_toggle && privacy === 'SELF_ONLY') {
      const options = creator?.privacyLevelOptions?.length
        ? creator.privacyLevelOptions
        : ALL_PRIVACY_LEVELS;
      if (options.includes('PUBLIC_TO_EVERYONE') && !isUploadMode) {
        setValue('privacy_level', 'PUBLIC_TO_EVERYONE', {
          shouldValidate: true,
        });
      }
    }
  }, [disclose, brand_content_toggle, privacy, isUploadMode]);

  // Re-check the cross-field rules when the inputs they depend on change.
  useEffect(() => {
    setValue('tiktok_rules', undefined, { shouldValidate: true });
  }, [
    disclose,
    brand_organic_toggle,
    brand_content_toggle,
    privacy,
    content_posting_method,
  ]);

  // TikTok ignores every setting except the title / content when the posting
  // method is UPLOAD, so we hide them rather than pretend they apply. The fields
  // stay mounted and registered: their values must survive the switch, and
  // TikTokDto still requires most of them at save time.
  const directPostOnly = clsx(isUploadMode && 'invisible h-0 overflow-hidden');

  const tiktokRestrictionNotice = useMemo(() => {
    if (!hasMedia || !isVideo) {
      return null;
    }
    if (!isUploadMode) {
      return t(
        'tiktok_restriction_direct_video',
        'TikTok restriction: For direct post with video, your post content is used as the title. A separate title field is not available.'
      );
    }
    return t(
      'tiktok_restriction_upload_video',
      'TikTok restriction: For upload-only video, TikTok does not accept a title or message. You can add one inside the TikTok app before publishing.'
    );
  }, [hasMedia, isUploadMode, isVideo, t]);

  const privacyLabels: Record<string, string> = {
    PUBLIC_TO_EVERYONE: t('public_to_everyone', 'Public to everyone'),
    MUTUAL_FOLLOW_FRIENDS: t('mutual_follow_friends', 'Mutual follow friends'),
    FOLLOWER_OF_CREATOR: t('follower_of_creator', 'Follower of creator'),
    SELF_ONLY: t('self_only', 'Self only'),
  };
  const privacyOptions = creator?.privacyLevelOptions?.length
    ? creator.privacyLevelOptions.filter((p) => privacyLabels[p])
    : ALL_PRIVACY_LEVELS;

  const contentPostingMethod = [
    {
      value: 'DIRECT_POST',
      label: t(
        'post_content_directly_to_tiktok',
        'Post content directly to TikTok'
      ),
    },
    {
      value: 'UPLOAD',
      label: t(
        'upload_content_to_tiktok_without_posting',
        'Upload content to TikTok without posting it'
      ),
    },
  ];
  const yesNo = [
    { value: 'yes', label: t('yes', 'Yes') },
    { value: 'no', label: t('no', 'No') },
  ];

  const disclosureMissing =
    !isUploadMode &&
    !!disclose &&
    !brand_organic_toggle &&
    !brand_content_toggle;
  const brandedLabel = !!disclose && !!brand_content_toggle;
  const organicLabel =
    !!disclose && !!brand_organic_toggle && !brand_content_toggle;
  const mediaWord = isPhoto
    ? t('tiktok_photo', 'photo')
    : t('tiktok_video', 'video');
  const disabledInApp = t(
    'tiktok_disabled_in_app',
    'Turned off in your TikTok app settings'
  );
  const brandedNotPrivate = t(
    'tiktok_branded_not_private',
    'Branded content visibility cannot be set to private.'
  );

  const creatorName =
    creator?.nickname || integration?.name || creator?.username || '';
  const creatorAvatar = creator?.avatar || integration?.picture || '';

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Who this will be posted as */}
      <div className="flex items-center gap-[12px] p-[12px] rounded-[12px] bg-newBgColorInner border border-newTableBorder">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={creatorAvatar || '/no-picture.jpg'}
          alt=""
          width={40}
          height={40}
          className="w-[40px] h-[40px] rounded-full object-cover bg-newTableHeader"
        />
        <div className="flex flex-col min-w-0">
          <div className="text-[12px] text-textItemBlur">
            {t('tiktok_posting_as', 'Posting to TikTok as')}
          </div>
          <div className="text-[15px] font-[600] truncate" dir="auto">
            {creatorLoading ? t('loading', 'Loading...') : creatorName}
          </div>
        </div>
      </div>

      {cannotPost && (
        <Notice tone="error">
          {t(
            'tiktok_cannot_post_now',
            'TikTok says this account cannot publish more posts right now. Please try again later.'
          )}
        </Notice>
      )}
      {tooLong && !isUploadMode && (
        <Notice tone="error">
          {t(
            'tiktok_video_too_long',
            'This video is longer than this TikTok account allows ({{max}} seconds). Please use a shorter video.',
            { max: maxDuration }
          )}
        </Notice>
      )}
      {tiktokRestrictionNotice && <Notice>{tiktokRestrictionNotice}</Notice>}

      {isTitle && (
        <Input
          label={t('label_title', 'Title')}
          {...register('title')}
          maxLength={89}
        />
      )}

      <div>
        <Select
          label={t('label_content_posting_method', 'Content posting method')}
          {...register('content_posting_method', {
            value: 'DIRECT_POST',
          })}
        >
          {contentPostingMethod.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
        <div className="text-[13px] mt-[8px] text-textItemBlur leading-[1.7]">
          {t(
            'choose_upload_without_posting_description',
            `Choose upload without posting if you want to review and edit your content within TikTok's app before publishing.
        This gives you access to TikTok's built-in editing tools and lets you make final adjustments before posting. The additional settings are only available when posting directly to TikTok.`
          )}
        </div>
        {isUploadMode && (
          <div className="mt-[8px] text-[13px] text-amber-400">
            {t(
              'tiktok_upload_inbox_notice',
              'After it is sent, you will find a notification in your TikTok inbox to finish and publish the post.'
            )}
          </div>
        )}
      </div>

      <div className={directPostOnly}>
        <Select
          label={t('label_who_can_see_this_video', 'Who can see this video?')}
          disabled={isUploadMode}
          {...register('privacy_level')}
        >
          <option value="" disabled>
            {t('tiktok_select_privacy', 'Select who can see it')}
          </option>
          {privacyOptions.map((item) => {
            const blocked = item === 'SELF_ONLY' && brandedLabel;
            return (
              <option
                key={item}
                value={item}
                disabled={blocked}
                title={blocked ? brandedNotPrivate : undefined}
              >
                {privacyLabels[item]}
                {blocked ? ` (${brandedNotPrivate})` : ''}
              </option>
            );
          })}
        </Select>
        {brandedLabel && (
          <div className="mt-[8px] text-[13px] text-textItemBlur">
            {t(
              'tiktok_branded_switched_public',
              'Branded content can only be public or visible to friends; private (Only me) is not allowed.'
            )}
          </div>
        )}
      </div>

      <div className={clsx('flex flex-col gap-[18px]', directPostOnly)}>
        {(isPhoto || !hasMedia) && (
          <div>
            <Select
              label={
                isBusiness
                  ? t('label_add_random_music', 'Add random music')
                  : t('label_auto_add_music', 'Auto add music')
              }
              disabled={isUploadMode}
              {...register('autoAddMusic', {
                value: 'no',
              })}
            >
              {yesNo.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <div className="text-[13px] mt-[8px] text-textItemBlur">
              {isBusiness
                ? t(
                    'tiktok_random_music_only_for_photos',
                    "This feature is available only for photos, it adds a random trending track from TikTok's commercial music library."
                  )
                : t(
                    'this_feature_available_only_for_photos',
                    'This feature available only for photos, it will add a default music that\n        you can change later.'
                  )}
            </div>
          </div>
        )}
        {isBusiness && (
          <div className="flex flex-col gap-[18px]">
            {/* Random music replaces a manual choice for photos, so the
                selector is hidden (but stays registered) while it's on. */}
            <div
              className={clsx(
                !isVideo &&
                  autoAddMusic === 'yes' &&
                  'invisible h-0 overflow-hidden'
              )}
            >
              <TikTokMusicSelector
                label={t('tiktok_music_label', 'Music')}
                showVolumes={isVideo}
                {...register('music')}
              />
            </div>
            <TikTokLocationSelector
              label={t('tiktok_location_label', 'Location')}
              {...register('location')}
            />
          </div>
        )}

        <fieldset className="flex flex-col gap-[14px] border-t border-tableBorder pt-[16px]">
          <legend className="text-[14px] font-[600] mb-[4px]">
            {t('tiktok_allow_users_to', 'Allow users to')}
          </legend>
          <div className="flex flex-wrap gap-x-[32px] gap-y-[14px]">
            <Checkbox
              variant="hollow"
              label={t('label_comments', 'Allow Comments')}
              disabled={isUploadMode || !!creator?.commentDisabled}
              title={creator?.commentDisabled ? disabledInApp : undefined}
              {...register('comment', {
                value: false,
              })}
            />
            {/* Duet and Stitch do not exist for photo posts */}
            {!isPhoto && (
              <>
                <Checkbox
                  variant="hollow"
                  label={t('label_duet', 'Allow Duet')}
                  disabled={isUploadMode || !!creator?.duetDisabled}
                  title={creator?.duetDisabled ? disabledInApp : undefined}
                  {...register('duet', {
                    value: false,
                  })}
                />
                <Checkbox
                  variant="hollow"
                  label={t('label_stitch', 'Allow Stitch')}
                  disabled={isUploadMode || !!creator?.stitchDisabled}
                  title={creator?.stitchDisabled ? disabledInApp : undefined}
                  {...register('stitch', {
                    value: false,
                  })}
                />
              </>
            )}
          </div>
          {!isPhoto && (
            <Checkbox
              variant="hollow"
              label={t('video_made_with_ai', 'Video made with AI')}
              disabled={isUploadMode}
              {...register('video_made_with_ai', {
                value: false,
              })}
            />
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-[12px] border-t border-tableBorder pt-[16px]">
          <legend className="text-[14px] font-[600] mb-[4px]">
            {t('tiktok_commercial_content', 'Commercial content disclosure')}
          </legend>
          <Checkbox
            variant="hollow"
            label={t('label_disclose_video_content', 'Disclose Video Content')}
            disabled={isUploadMode}
            {...register('disclose', {
              value: false,
            })}
          />
          <div className="text-[13px] text-textItemBlur leading-[1.7]">
            {t(
              'turn_on_to_disclose_video_promotes',
              'Turn on to disclose that this video promotes goods or services in\n          exchange for something of value. You video could promote yourself, a\n          third party, or both.'
            )}
          </div>
          <div
            className={clsx(
              !disclose && 'invisible h-0 overflow-hidden',
              'flex flex-col gap-[10px]'
            )}
          >
            <Checkbox
              variant="hollow"
              label={t('label_your_brand', 'Your brand')}
              disabled={isUploadMode}
              {...register('brand_organic_toggle', {
                value: false,
              })}
            />
            <div className="text-[13px] text-textItemBlur ps-[34px]">
              {t(
                'you_are_promoting_yourself',
                'You are promoting yourself or your own brand.'
              )}{' '}
              {t(
                'this_video_will_be_classified_brand_organic',
                'This video will be classified as Brand Organic.'
              )}
            </div>
            <Checkbox
              variant="hollow"
              label={t('label_branded_content', 'Branded content')}
              disabled={isUploadMode}
              {...register('brand_content_toggle', {
                value: false,
              })}
            />
            <div className="text-[13px] text-textItemBlur ps-[34px]">
              {t(
                'you_are_promoting_another_brand',
                'You are promoting another brand or a third party.'
              )}{' '}
              {t(
                'this_video_will_be_classified_branded_content',
                'This video will be classified as Branded Content.'
              )}
            </div>
            {disclosureMissing && (
              <Notice tone="error">
                {t(
                  'tiktok_disclosure_choose',
                  'You need to indicate if your content promotes yourself, a third party, or both.'
                )}
              </Notice>
            )}
            {(organicLabel || brandedLabel) && (
              <Notice>
                {brandedLabel
                  ? t(
                      'tiktok_label_paid_partnership',
                      "Your {{media}} will be labeled as 'Paid partnership'",
                      { media: mediaWord }
                    )
                  : t(
                      'tiktok_label_promotional',
                      "Your {{media}} will be labeled as 'Promotional content'",
                      { media: mediaWord }
                    )}
                <br />
                {t(
                  'this_cannot_be_changed_once_posted',
                  'This cannot be changed once your video is posted.'
                )}
              </Notice>
            )}
          </div>
        </fieldset>
      </div>

      {/* Required consent declaration, shown before the post is scheduled */}
      {!isUploadMode && (
        <div className="text-[13px] leading-[1.8] p-[12px] rounded-[10px] border border-newTableBorder">
          {t('by_posting_you_agree_to_tiktoks', "By posting, you agree to TikTok's")}{' '}
          {brandedLabel && (
            <>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B69DEC] underline-offset-2 hover:underline"
                href="https://www.tiktok.com/legal/page/global/bc-policy/en"
              >
                {t('branded_content_policy', 'Branded Content Policy')}
              </a>{' '}
              {t('and', 'and')}{' '}
            </>
          )}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B69DEC] underline-offset-2 hover:underline"
            href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en"
          >
            {t('music_usage_confirmation', 'Music Usage Confirmation')}
          </a>
          .
        </div>
      )}

      <div className="text-[13px] text-textItemBlur leading-[1.7]">
        {t(
          'tiktok_processing_notice',
          'After publishing, it may take a few minutes for the content to process and be visible on your TikTok profile.'
        )}
      </div>
      {!!(formState?.errors as Record<string, unknown>)?.tiktok_rules &&
        !disclosureMissing && (
        <Notice tone="error">{brandedNotPrivate}</Notice>
      )}
    </div>
  );
};
export default withProvider({
  postComment: PostComment.COMMENT,
  minimumCharacters: [],
  SettingsComponent: TikTokSettings,
  comments: false,
  CustomPreviewComponent: TiktokPreview,
  dto: TikTokFormDto,
  maximumCharacters: 2000,
});
