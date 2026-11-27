#!/usr/bin/env bash
# ==============================================================================
# One-shot Medusa Backend Health Check Script (Cron-safe)
# Exits 0 if healthy (HTTP 200 OK), 1 otherwise.
#
# Usage:
#   ./scripts/healthcheck.sh [BACKEND_URL]
#
# Crontab example (every 10 minutes to keep Render awake and log status):
#   */10 * * * * /home/utkarsh/work/dilwale/scripts/healthcheck.sh https://your-backend.onrender.com >> /tmp/dilwale-health.log 2>&1
# ==============================================================================

set -u

RAW_URL="${1:-${BACKEND_URL:-http://localhost:9000}}"
BASE_URL="${RAW_URL%/}"
case "$BASE_URL" in
  */health) HEALTH_URL="$BASE_URL" ;;
  *)        HEALTH_URL="${BASE_URL}/health" ;;
esac

MAX_ATTEMPTS="${HEALTH_RETRIES:-2}"
TIMEOUT_SEC="${HEALTH_TIMEOUT:-30}"
TIMESTAMP="$(date -u '+%Y-%m-%d %H:%M:%S UTC')"

BODY_FILE="/tmp/dilwale_health_body.$$"

for attempt in $(seq 1 "$MAX_ATTEMPTS"); do
  HTTP_CODE="$(curl -sS -o "$BODY_FILE" -w '%{http_code}' \
    --connect-timeout 10 --max-time "$TIMEOUT_SEC" "$HEALTH_URL" 2>/dev/null || echo "000")"
  BODY=""
  if [ -f "$BODY_FILE" ]; then
    BODY="$(tr -d '\r\n' < "$BODY_FILE" || true)"
    rm -f "$BODY_FILE"
  fi

  if [ "$HTTP_CODE" = "200" ]; then
    echo "[$TIMESTAMP] OK ($HTTP_CODE) $HEALTH_URL body=${BODY:-empty}"
    exit 0
  fi

  if [ "$attempt" -lt "$MAX_ATTEMPTS" ]; then
    sleep 3
  fi
done

echo "[$TIMESTAMP] FAIL ($HTTP_CODE) $HEALTH_URL body=${BODY:-unreachable}" >&2
exit 1

