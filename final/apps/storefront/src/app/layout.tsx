import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import EditorialCursor from "@modules/common/components/editorial-cursor"
import "styles/globals.css"

const defaultTitle = "Dilwale Bags | Find Bags That Match Your Style"
const defaultDescription =
  "Browse through our diverse range of meticulously crafted bags, designed to elevate your everyday carry and match your sense of style."
const previewImage = "/og-preview.jpg"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: defaultTitle,
    template: "%s | Dilwale Bags",
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: getBaseURL(),
    siteName: "Dilwale Bags",
    images: [
      {
        url: previewImage,
        width: 1024,
        height: 576,
        alt: "Dilwale Bags Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [previewImage],
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" />
        <link rel="ucp" href="/.well-known/ucp" />
      </head>
      <body>
        <EditorialCursor />
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
