# TikTok app review checklist — منصة (Manassa)

Checked against TikTok's official **Content Sharing Guidelines**
(<https://developers.tiktok.com/doc/content-sharing-guidelines>, page
“Last updated August 4, 2026”, read on 2026-11-14). TikTok can change these
rules; re-read the page right before you submit.

> This checklist shows what the app now does. It does **not** mean the app
> will pass review — TikTok's reviewers decide that, and they also look at
> your demo video, website, policies and app details.

Code: `apps/frontend/src/components/new-launch/providers/tiktok/tiktok.provider.tsx`
(settings screen), `tiktok.form.dto.ts` (rules that block scheduling),
`tiktok.preview.tsx` (preview), and the read-only `creatorInfo` function in
`libraries/nestjs-libraries/src/integrations/social/tiktok.provider.ts`.

## 1. Guideline points and how the app meets them

| # | TikTok requirement | Status | How |
|---|---|---|---|
| 1 | Get the latest creator info when the post screen is shown | ✅ | `creatorInfo` calls `/v2/post/publish/creator_info/query/` each time the TikTok settings open |
| 2 | Show the creator's **nickname** | ✅ | “Posting to TikTok as …” card with nickname (and avatar — not required by TikTok but shown) |
| 3 | If the creator can't post now, stop and tell the user | ✅ | Red notice + scheduling is blocked (`creator_check = cannot_post`) |
| 4 | Check video length against `max_video_post_duration_sec` | ✅ | Video duration read from file metadata; longer videos show a notice and are blocked |
| 5 | Title can be entered / edited | ✅ | Title field for photo posts; for video the post text is the title (TikTok API behaviour, shown in a notice) |
| 6 | Privacy options come from `privacy_level_options` | ✅ | Dropdown lists only the options TikTok returns |
| 7 | **No default** privacy; user must pick | ✅ | Empty “Select who can see it” placeholder; scheduling fails validation until one is chosen |
| 8 | Comment / Duet / Stitch: **none checked by default** | ✅ | All default to off (upstream had comments on) |
| 9 | Grey out interactions disabled in the creator's TikTok settings | ✅ | Disabled + tooltip “Turned off in your TikTok app settings” |
| 10 | Photo posts: only “Allow comment” | ✅ | Duet, Stitch and AI label hidden for photos |
| 11 | Commercial content toggle, **off by default** | ✅ | “Disclose video content” off by default |
| 12 | When on: “Your brand” / “Branded content”, multiple allowed, at least one required | ✅ | Both checkboxes; if none selected a notice shows the required text and scheduling is blocked |
| 13 | Label prompts: “Promotional content” / “Paid partnership” | ✅ | Notice changes with the selection; both selected → “Paid partnership” |
| 14 | Branded content cannot be private | ✅ | “Only me” disabled with the required hover text; if it was already private it switches to public, and a note under the field explains why |
| 15 | Consent text **before** the publish button, linked, varying by selection | ✅ | Always shown for Direct Post: “By posting, you agree to TikTok's Music Usage Confirmation”, or “…Branded Content Policy and Music Usage Confirmation” when Branded content is checked |
| 16 | Preview of the content | ✅ | TikTok preview panel next to the editor |
| 17 | No added watermarks / promotional text; user can edit all text and hashtags | ✅ | Nothing is added to captions; removed a stale UI claim that content defaults to “#Postiz” |
| 18 | Upload only after the user's express action | ✅ | Content is sent only when the user schedules/publishes |
| 19 | Tell users processing can take a few minutes | ✅ | “After publishing, it may take a few minutes for the content to process and be visible on your TikTok profile.” |
| 20 | Show post status (poll status API / webhooks) | ✅ (upstream) | Existing `checkPostStatus` workflow polls TikTok's status API; status shows in the calendar |
| 21 | Unaudited clients: max 5 users / 24 h, posts `SELF_ONLY`, account must be private | ⚠️ owner | Until TikTok audits the app, test only with private accounts and choose “Self only” |

All texts are translated into Arabic; the Arabic interface shows the same
meaning. TikTok's legal names (Music Usage Confirmation, Branded Content
Policy) link to TikTok's own pages.

## 2. Pages TikTok asks for

| Item | URL (after you deploy) | Status |
|---|---|---|
| Website / homepage | `https://manassa.space/` | ✅ built (`apps/frontend/src/app/(public)/page.tsx`) |
| Privacy Policy | `https://manassa.space/privacy` | ✅ draft — **have it reviewed** and set your real contact e-mail/company in `brand.config.ts` |
| Terms of Service | `https://manassa.space/terms` | ✅ draft — same as above |
| Login redirect URI | `https://manassa.space/integrations/social/tiktok` | set this in the TikTok developer portal |

## 3. Still needed before you submit (only you can do these)

1. **Domain + HTTPS**: point `manassa.space` at the server (see `DEPLOYMENT.md`); TikTok
   rejects `localhost` / `127.0.0.1` URLs. Verify the domain in the TikTok portal (URL
   properties) — needed for `PULL_FROM_URL` media and for TikTok Business.
2. **Real legal details**: company / owner name, contact e-mail, country in
   `libraries/helpers/src/brand/brand.config.ts` (`brand.legal`); a lawyer's review of
   `/privacy` and `/terms`.
3. **TikTok developer app**: create the app, add Login Kit + Content Posting API (Direct
   Post), and request the scopes the app asks for at login: `user.info.basic`,
   `user.info.profile`, `user.info.stats`, `video.list`, `video.upload`, `video.publish`
   (the last three stats/list scopes power analytics; explain that use in the review form).
   Paste `TIKTOK_CLIENT_ID` / `TIKTOK_CLIENT_SECRET` into `.env.manassa` yourself.
4. **App icon**: `apps/frontend/public/brand/app-icon-1024.png` (1024×1024, paper-plane
   mark on white) — resize to the size the portal asks for.
5. **App name & description** (suggested, edit freely):
   - Name: `منصة - Manassa`
   - Description (EN): “Manassa is an Arabic-first social media scheduler. Creators and
     teams write a post once, preview it, choose the audience and interaction settings,
     and publish it to their own TikTok account at the time they choose.”
   - Description (AR): «منصة أداة عربية لجدولة منشورات التواصل الاجتماعي. يكتب صانع
     المحتوى أو الفريق المنشور مرة واحدة، ويعاينه، ويختار الجمهور وإعدادات التفاعل، ثم
     يُنشر على حساب TikTok الخاص به في الوقت الذي يحدده.»
6. **Demo video** (screen recording, English UI is safest for reviewers, or Arabic with
   English captions) showing, in one take on the deployed domain:
   1. Signing in to Manassa and connecting TikTok through TikTok's own login screen
      (show the scopes consent).
   2. Creating a post with a video, opening the TikTok settings: nickname + avatar shown,
      privacy dropdown empty, picking a privacy level, toggling comments/duet/stitch.
   3. Turning on commercial content disclosure, showing the “at least one” rule, “Your
      brand” → Promotional content label, “Branded content” → Paid partnership label and
      the “Only me” option disabled; the consent sentence changing.
   4. The preview, then clicking Add to calendar / Post now.
   5. The processing notice, the post status in the calendar, and the video live on the
      TikTok profile.
   6. Disconnecting the TikTok channel (data deletion path) and opening `/privacy`.
7. **Test account**: a private TikTok account (unaudited apps can only post `SELF_ONLY`).
8. **Source code link (AGPL)**: set `SOURCE_CODE_URL` to your public repository before
   other people use the app.

## 4. Known limits

- TikTok Business (`tiktok-business` channel, Business API v1.3) uses the same screen; its
  API has no `creator_info`, so the card shows the channel's saved name and picture and the
  full privacy list. The Content Sharing Guidelines above apply to the Content Posting API.
- “Upload without posting” (TikTok inbox draft) hides the Direct-Post settings because TikTok
  ignores them in that mode; TikTok's own app then shows its own settings.
