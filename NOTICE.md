# Notice

**Manassa (منصة)** is a modified version of **Postiz**
(https://github.com/gitroomhq/postiz-app), Copyright © the Postiz / Gitroom
authors and contributors.

Postiz and this modified version are licensed under the **GNU Affero General
Public License v3.0** (see [LICENSE](LICENSE)). The upstream licence,
copyright notices, contributor agreements (CCLA.md, ICLA.md) and the
upstream README are kept unchanged in this repository.

## What was changed

- Product name, logo, icons, colours and e-mail layout (central config:
  `libraries/helpers/src/brand/brand.config.ts`).
- Arabic as the default language with right-to-left layout, an Arabic
  typeface (IBM Plex Sans Arabic, SIL Open Font License) and additional
  Arabic translations.
- Design-system adjustments (tokens, focus states, RTL-safe spacing).
- TikTok "Post to TikTok" screen aligned with TikTok's Content Sharing
  Guidelines.
- Public homepage, Privacy Policy and Terms of Service pages.

The full list of changes is in `git diff` against upstream commit
`132859f32d854830ce44b509da87409c3ec10a77`.

## Your obligation when offering this app to others (AGPL-3.0 §13)

If you let other people use this modified app over a network (for example
as a hosted SaaS), you must offer those users the **complete corresponding
source code of the version you run**, under the AGPL-3.0, for free. In
practice: publish this repository (with your changes) at a public URL and
set `SOURCE_CODE_URL` in `.env.manassa`; the app links to it from the
footer of every public page and the sign-in pages.

## Third-party assets

- IBM Plex Sans Arabic — © IBM Corp., SIL Open Font License 1.1
  (`apps/frontend/src/fonts/ibm-plex-sans-arabic/OFL.txt`).
- Platform names and logos (TikTok, Instagram, YouTube, …) belong to their
  owners and are used only to identify the integrations.
