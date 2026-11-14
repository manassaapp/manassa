# Running and deploying منصة (Manassa)

## Run locally (this PC)

```bash
cd /c/ElDoc/manassa
bash var/docker/manassa-init-env.sh          # once: creates .env.manassa with random local secrets
docker compose -f docker-compose.manassa.yaml --env-file .env.manassa up -d --build
```

Open <http://127.0.0.1:5300>. Stop with
`docker compose -f docker-compose.manassa.yaml --env-file .env.manassa down`
(add `-v` only if you really want to erase the Manassa database and uploads).

The stack is separate from the VMA Postiz stack:

| | VMA Postiz | Manassa |
|---|---|---|
| Folder | `C:\ElDoc\postiz-docker-compose-main` | `C:\ElDoc\manassa` |
| Compose project | `postiz-docker-compose-main` | `manassa` |
| App port | 127.0.0.1:5000 / 4007 | 127.0.0.1:5300 |
| Database / Redis / Temporal | `postiz-postgres`, `postiz-redis`, `temporal` (+ `temporal-elasticsearch`) | `manassa-postgres-1`, `manassa-redis-1`, `manassa-temporal-1` (+ `manassa-temporal-es-1`, 256 MB heap) |
| Network | `postiz-network`, `temporal-network` | `manassa_manassa` |
| Volumes | `postiz-docker-compose-main_*` | `manassa_*` |
| Image | `ghcr.io/gitroomhq/postiz-app` | `manassa-app:local` (built from this repo) |

## Going live on https://manassa.space

I have not changed Cloudflare or DNS. When you are ready, do these yourself:

1. **Domain**: `manassa.space`. Add it to Cloudflare as its own zone, separate from
   `vmaegypt.online` (if it isn't already).
2. **Cloudflare Tunnel**: create a **new** tunnel (or a new public hostname on a tunnel
   you choose) — do not edit the existing `vmaegypt.online` routes. Route:
   - `manassa.space` (apex) and `www` → service type **HTTP**, URL `host.docker.internal:5300`.
     The tunnel used here (`cf-tunnel-2`) runs in Docker, so `localhost` would mean the
     tunnel container itself (error 502). If cloudflared runs directly on Windows instead,
     use `localhost:5300`. Not HTTPS: the app speaks plain HTTP behind the tunnel.
   - Delete any DNS records Cloudflare imported from the registrar (e.g. Namecheap URL
     forwarding) for `@` and `www` first, or the tunnel hostname can't create its CNAME.
   - optional `www.manassa.space` → redirect to `https://manassa.space` (Cloudflare redirect rule)
   - The homepage, `/privacy`, `/terms` and the app all live on the same host:
     `/` shows the homepage to signed-out visitors and the calendar to signed-in users.
3. **Update `.env.manassa`** (edit the file yourself):
   ```
   MAIN_URL=https://manassa.space
   FRONTEND_URL=https://manassa.space
   NEXT_PUBLIC_BACKEND_URL=https://manassa.space/api
   # delete NOT_SECURED=true once you are on https
   SOURCE_CODE_URL=https://github.com/manassaapp/manassa
   ```
   then restart the app: `docker compose -f docker-compose.manassa.yaml --env-file .env.manassa up -d app`
   (these URLs are read when the server starts; no rebuild needed).
4. **Storage**: local uploads work for testing. For production create a **new** R2
   bucket (not `postiz-upload`) with its own API token and set `STORAGE_PROVIDER=cloudflare`
   + the `CLOUDFLARE_*` variables.
5. **E-mail**: set `EMAIL_PROVIDER` and its key so activation / password e-mails go out,
   with a sender on the domain (e.g. `no-reply@manassa.space`; verify the domain with the
   e-mail provider — that needs DNS records you add yourself).
6. **Social apps**: in each platform's developer portal set the redirect URI to
   `https://manassa.space/integrations/social/<provider>` (e.g. `https://manassa.space/integrations/social/tiktok`).
7. **AGPL-3.0**: before other people use it, publish this repository (with your changes)
   and set `SOURCE_CODE_URL`. Published at https://github.com/manassaapp/manassa (keep it public and up to date). See [NOTICE.md](../../NOTICE.md).
