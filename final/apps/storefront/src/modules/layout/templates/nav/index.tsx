import { Suspense } from "react"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import AnnouncementBar from "@modules/layout/components/announcement-bar"
import NavSearch from "@modules/layout/components/nav-search"
import NavLinks from "@modules/layout/components/nav-links"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white">
      <AnnouncementBar />
      <header className="relative h-[64px] sm:h-[78px] border-b border-[rgba(0,0,0,0.1)] bg-white transition-colors duration-200">
        <nav className="content-container flex items-center justify-between w-full h-full gap-3 sm:gap-6 lg:gap-10">
          {/* Left: Mobile hamburger + Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="flex items-center md:hidden">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>

            <LocalizedClientLink
              href="/"
              className="text-[20px] sm:text-[26px] lg:text-[32px] font-black tracking-tight uppercase text-black font-integral hover:opacity-85 transition-opacity whitespace-nowrap leading-none"
              data-testid="nav-store-link"
            >
              Dilwale Bags
            </LocalizedClientLink>
          </div>

          {/* Navigation Links (Desktop) */}
          <NavLinks />

          {/* Search bar pill */}
          <div className="flex-1 max-w-[577px] hidden sm:block">
            <NavSearch />
          </div>

          {/* Action Icons (Figma order: Mobile Search, Cart, Account) */}
          <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
            <LocalizedClientLink
              href="/store"
              className="p-1 text-black hover:text-neutral-600 transition-colors sm:hidden"
              aria-label="Search products"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-neutral-600 flex items-center relative p-1 text-black"
                  href="/cart"
                  data-testid="nav-cart-link"
                  aria-label="Shopping cart"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            <LocalizedClientLink
              href="/account"
              className="p-1 text-black hover:text-neutral-600 transition-colors"
              data-testid="nav-account-link"
              aria-label="Account"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </LocalizedClientLink>
          </div>
        </nav>
      </header>
    </div>
  )
}
