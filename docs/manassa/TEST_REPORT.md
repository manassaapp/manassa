# Test report — منصة (Manassa)

Date: 2026-11-14. Only results actually run are listed. All runs were inside the
`manassa:check` Docker image (Node 22, deps from the lockfile), with the current source
copied in, in a container limited to 4 GB RAM / 2 CPUs.

| Check | Command | Result |
|---|---|---|
| New unit tests (brand helpers, TikTok rules, Arabic/mixed/hashtag/mention/URL/emoji text through `stripHtmlValidation`) | `npx jest -c jest.manassa.config.js` | **PASS** – 3 suites, 24 tests |
| Upstream unit tests | `npx jest` | **Cannot run (upstream)** – `jest.config.ts` needs `@nx/jest`, which is not installed. The repo has no `*.spec.ts` files at all. |
| Translation coverage | `python3 var/i18n/check_translations.py` | **PASS** – 1,038 `t()` keys, 0 missing in en, 0 missing in ar |
| TypeScript – frontend | `tsc --noEmit -p apps/frontend/tsconfig.json` | **PASS** – 0 errors (after fixing 3 errors I had introduced) |
| TypeScript – backend / orchestrator (build configs) | `tsc --noEmit -p apps/{backend,orchestrator}/tsconfig.build.json` | **PASS** – 0 errors |
| TypeScript – backend / orchestrator (strict base config) | `tsc --noEmit -p apps/*/tsconfig.json` | 7 / 4 `noImplicitAny` errors, all in files **not modified** by this work (upstream) |
| ESLint – root config | `npx eslint …` | **Cannot run (upstream)** – ESLint 8.57 crashes loading `eslint-config-next` ("Converting circular structure to JSON") |
| ESLint – `apps/frontend/eslint.config.mjs`, changed files vs upstream versions | flat config, compared per file/rule | 0 new errors after fixes; remaining new findings are `react-hooks/exhaustive-deps` **warnings** in the TikTok screen (same pattern as upstream). New files: 0 problems. |
| Production build (`next build` + Nest builds) | `docker build --target runtime` | **PASS** – exit 0, image `manassa-app:local` (7.84 GB) |
| Run locally in Docker | `docker compose -f docker-compose.manassa.yaml --env-file .env.manassa up -d` | **PASS** after one fix – backend first failed (“cannot have more than 3 search attribute of type Text”: Temporal without Elasticsearch); added `temporal-es` (Elasticsearch 7.17, 256 MB heap). Frontend, backend and orchestrator start; `/`, `/privacy`, `/terms`, `/auth`, `/auth/login`, `/api/` return 200 |

## Live checks in the browser (http://127.0.0.1:5300, 2026-11-14)

| Screen | Arabic / RTL | Notes |
|---|---|---|
| Homepage `/` | ✅ `<html lang="ar" dir="rtl">`, title «منصة», IBM Plex Sans Arabic | logo image was redirected to sign-in → **fixed** (middleware lets `/brand/*` through) |
| Sign in / Register | ✅ form, brand panel and language button mirrored | register form linked Terms/Privacy to postiz.com → **fixed** (`/terms`, `/privacy`) |
| Privacy Policy | ✅ | contact e-mail set to `support@manassa.space` (owner's choice; rebuilt and re-checked) |
| Registration → onboarding | ✅ account created and auto-activated (no e-mail provider); steps run right-to-left | — |
| Calendar (mobile + desktop, day/week) | ✅ sidebar, channel panel and week grid mirrored; dates in Arabic locale | time labels rendered “AM 0:00” → **fixed** (times isolated as LTR, midnight shows 12:00 AM); the week range “2026/11/15 - 2026/11/9” is correct right-to-left order and was left as is; “Agent” menu item untranslated → **fixed** |
| Settings | ✅ menu on the right, toggles correct | — |
| Language switch → English | ✅ page flips to LTR, title “Manassa \| Settings” | selected-language button was white-on-white → **fixed** |
| Post editor / TikTok settings / previews | ⚠️ not checked live | needs at least one connected channel, which needs real platform credentials (TikTok app keys) |

The fixes marked above were applied in source and the image was rebuilt (exit 0). After the
first rebuild, re-checked live: logo/icons/social image return 200 and show on the homepage and
sign-in page; “Agent” shows «الوكيل الذكي»; midnight
shows 12:00. The hour labels still read “AM 12:00” because an upstream rule in `global.scss`
(`html[dir='rtl'] [dir='ltr'] { direction: rtl !important }`) forces RTL onto every
`dir="ltr"` element; it now skips elements with the `.ltr` class, which our LTR islands use.
After the second rebuild the hour labels read “12:00 AM”, “1:00 AM” (verified live). An attempt to force the week range to LTR garbled it (the Arabic date format contains right-to-left marks), so that change was reverted in a third rebuild.

Known cosmetic issue (upstream behaviour): on a cold page load, client-side form labels show the English defaults for a moment until the Arabic translation file has loaded.

Also found while checking: the upstream sidebar “Affiliate” item pointed at Postiz's own
affiliate programme (shown only when billing is on) → now hidden unless `brand.affiliateUrl`
is set.

## Remaining Postiz mentions (intentional)
User-agent strings sent to Tumblr/WordPress, Mastodon app registration name, Sentry service
names, the `postiz` npm CLI / `gitroomhq/postiz-agent` skill package names, docs.postiz.com
links, and the upstream attribution (FAQ, footer, NOTICE.md, LICENSE).
