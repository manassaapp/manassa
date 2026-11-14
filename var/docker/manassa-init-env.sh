#!/usr/bin/env bash
# Creates .env.manassa from .env.manassa.example and fills the three local
# secrets (JWT secret, database passwords) with random values.
# The values are written straight to the file and never printed.
# Safe to re-run: existing non-empty values are kept.
set -euo pipefail
cd "$(dirname "$0")/../.."
[ -f .env.manassa ] || cp .env.manassa.example .env.manassa
rand() { head -c 48 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | head -c "$1"; }
for key in JWT_SECRET:64 MANASSA_DB_PASSWORD:32 MANASSA_TEMPORAL_DB_PASSWORD:32; do
  name="${key%%:*}"; len="${key##*:}"
  if grep -qE "^${name}=$" .env.manassa; then
    value="$(rand "$len")"
    sed -i "s|^${name}=$|${name}=${value}|" .env.manassa
    echo "generated ${name}"
  else
    echo "kept existing ${name}"
  fi
done
echo "done: .env.manassa (secrets not shown)"
