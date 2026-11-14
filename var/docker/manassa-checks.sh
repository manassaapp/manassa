#!/usr/bin/env bash
# Quality checks run inside the "check" stage of Dockerfile.manassa:
#   docker build -f Dockerfile.manassa --target check -t manassa:check .
#   docker run --rm manassa:check
# Each step reports PASS/FAIL; the script keeps going so you see all results.
set -u
cd /app
results=()
run() {
  local name="$1"; shift
  echo "===== ${name}: $*"
  if "$@"; then results+=("PASS ${name}"); else results+=("FAIL ${name} (exit $?)"); fi
}
run "typescript-frontend" npx tsc --noEmit -p apps/frontend/tsconfig.json
run "typescript-backend" npx tsc --noEmit -p apps/backend/tsconfig.json
run "typescript-orchestrator" npx tsc --noEmit -p apps/orchestrator/tsconfig.json
run "lint-frontend" npx eslint apps/frontend/src --quiet
run "unit-tests-manassa" npx jest -c jest.manassa.config.js --ci
run "unit-tests-upstream" npx jest --ci --passWithNoTests
run "translations" python3 var/i18n/check_translations.py
echo
echo "===== SUMMARY"
printf '%s\n' "${results[@]}"
