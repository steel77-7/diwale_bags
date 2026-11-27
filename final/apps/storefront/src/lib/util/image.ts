/**
 * Strips local/origin prefixes from static asset paths stored in product data
 * so /bags/* and /figma/* resolve against the active storefront host.
 */
export const normalizeImageUrl = (
  url?: string | null
): string | undefined => {
  if (!url) return undefined

  for (const prefix of ["/figma/", "/bags/"]) {
    const idx = url.indexOf(prefix)
    if (idx !== -1) return url.substring(idx)
  }

  return url
}

export const toAbsoluteImageUrl = (
  url: string | null | undefined,
  origin: string
): string | undefined => {
  const normalized = normalizeImageUrl(url)
  if (!normalized) return undefined
  return normalized.startsWith("/") ? `${origin}${normalized}` : normalized
}

