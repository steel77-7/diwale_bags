import { getSiteOrigin } from "@lib/util/site"
import type { MetadataRoute } from "next"

export const dynamic = "force-dynamic"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await getSiteOrigin()

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/*/cart",
        "/*/checkout",
        "/*/account",
        "/*/order/",
        "/buy/",
      ],
    },
    sitemap: `${origin}/sitemap.xml`,
  }
}
