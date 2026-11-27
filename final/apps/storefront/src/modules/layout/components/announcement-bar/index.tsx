"use client"

import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function AnnouncementBar() {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div className="bg-black text-white min-h-[38px] py-1.5 flex items-center justify-center px-9 sm:px-12 relative text-[11px] sm:text-[14px] z-50">
      <p className="text-center font-normal truncate">
        Sign up and get 20% off to your first order.{" "}
        <LocalizedClientLink
          href="/account"
          className="font-medium underline underline-offset-2 hover:text-neutral-300 transition-colors ml-1"
        >
          Sign Up Now
        </LocalizedClientLink>
      </p>
      <button
        onClick={() => setIsOpen(false)}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white transition-opacity"
        aria-label="Close announcement"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

