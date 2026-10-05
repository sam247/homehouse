#!/usr/bin/env bash
# Re-encode oversized images in public/ so pages ship smaller bytes.
# - JPEG/WebP over THRESHOLD get capped at MAX_W and re-encoded at a web-appropriate quality.
# - A file is only replaced when the new version is actually smaller.
# - PNGs are left alone (no lossless win without a converter); re-run manually if needed.
#
# Usage: bash scripts/compress-images.sh [--dry-run]

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC="$ROOT/public"
THRESHOLD=$((150 * 1024))
MAX_W=1600
DRY=0
[ "${1:-}" = "--dry-run" ] && DRY=1

total_before=0
total_after=0
changed=0

while IFS= read -r -d '' file; do
  size=$(stat -f%z "$file")
  [ "$size" -lt "$THRESHOLD" ] && continue

  ext="${file##*.}"
  ext_lc="$(printf '%s' "$ext" | tr '[:upper:]' '[:lower:]')"
  tmp="$(mktemp -t hhhimg).$ext_lc"

  case "$ext_lc" in
    jpg|jpeg)
      ffmpeg -y -loglevel error -i "$file" \
        -vf "scale='min(${MAX_W},iw)':-2" -q:v 4 -f image2 "$tmp" || { rm -f "$tmp"; continue; }
      ;;
    webp)
      ffmpeg -y -loglevel error -i "$file" \
        -vf "scale='min(${MAX_W},iw)':-2" -c:v libwebp -quality 75 "$tmp" || { rm -f "$tmp"; continue; }
      ;;
    *)
      rm -f "$tmp"; continue ;;
  esac

  new=$(stat -f%z "$tmp")
  total_before=$((total_before + size))

  if [ "$new" -lt "$size" ]; then
    total_after=$((total_after + new))
    changed=$((changed + 1))
    printf '%-72s %8s -> %8s\n' "${file#"$ROOT"/}" "$size" "$new"
    [ "$DRY" -eq 0 ] && cp "$tmp" "$file"
  else
    total_after=$((total_after + size))
  fi
  rm -f "$tmp"
done < <(find "$PUBLIC" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' \) -print0)

echo "---"
echo "files rewritten: $changed"
echo "oversized set: $total_before bytes -> $total_after bytes"
