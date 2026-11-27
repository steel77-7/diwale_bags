"use client"

import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Transition } from "@headlessui/react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import useToggleState from "@lib/hooks/use-toggle-state"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const shopCategories = [
  { label: "All Bags", href: "/store" },
  { label: "Handbags", href: "/categories/handbags" },
  { label: "Tote Bags", href: "/categories/tote-bags" },
  { label: "Crossbody", href: "/categories/crossbody" },
  { label: "Backpacks", href: "/categories/backpacks" },
  { label: "Travel Bags", href: "/categories/travel-bags" },
]

const carryStyles = [
  { label: "Casual", href: "/collections/casual" },
  { label: "Formal", href: "/collections/formal" },
  { label: "Party", href: "/collections/party" },
  { label: "Gym", href: "/collections/gym" },
]

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [shopExpanded, setShopExpanded] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  useEffect(() => {
    if (!isOpen) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen])

  const closeMenu = () => {
    countryToggleState.close()
    languageToggleState.close()
    setIsOpen(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    closeMenu()
    router.push(trimmed ? `/store?q=${encodeURIComponent(trimmed)}` : "/store")
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        data-testid="nav-menu-button"
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="p-1.5 -ml-1.5 text-black hover:opacity-70 transition-opacity flex items-center justify-center"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6H21M3 12H21M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Transition show={isOpen} as={Fragment}>
        <div className="fixed inset-0 z-[80] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              data-testid="side-menu-backdrop"
              onClick={closeMenu}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            />
          </Transition.Child>

          {/* Slide-over Monochrome Drawer */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-250 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              data-testid="nav-menu-popup"
              className="relative z-10 flex flex-col justify-between w-[86vw] max-w-[360px] h-[100dvh] bg-white text-black shadow-2xl overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
                  <LocalizedClientLink
                    href="/"
                    onClick={closeMenu}
                    className="font-integral font-black text-xl uppercase tracking-tight text-black"
                  >
                    Dilwale Bags
                  </LocalizedClientLink>
                  <button
                    type="button"
                    onClick={closeMenu}
                    data-testid="close-menu-button"
                    aria-label="Close menu"
                    className="w-9 h-9 rounded-full bg-[#F0F0F0] hover:bg-neutral-200 text-black flex items-center justify-center transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M12 4L4 12M4 4L12 12"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Inline Search */}
                <div className="px-5 pt-4 pb-2">
                  <form onSubmit={handleSearch}>
                    <div className="bg-[#F0F0F0] rounded-full px-4 py-2.5 flex items-center gap-2.5 focus-within:ring-2 focus-within:ring-black/15">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black/45 shrink-0"
                      >
                        <path
                          d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search bags..."
                        className="bg-transparent text-sm text-black placeholder:text-black/45 focus:outline-none w-full"
                      />
                    </div>
                  </form>
                </div>

                {/* Primary Navigation */}
                <nav className="px-5 py-3 flex flex-col divide-y divide-black/10">
                  <LocalizedClientLink
                    href="/"
                    onClick={closeMenu}
                    data-testid="home-link"
                    className="py-3.5 text-[16px] font-medium text-black flex items-center justify-between hover:text-black/70 transition-colors"
                  >
                    <span>Home</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-black/40">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </LocalizedClientLink>

                  {/* Shop Categories Accordion */}
                  <div className="py-3.5">
                    <button
                      type="button"
                      onClick={() => setShopExpanded((prev) => !prev)}
                      className="w-full flex items-center justify-between text-[16px] font-medium text-black"
                      aria-expanded={shopExpanded}
                    >
                      <span>Shop</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`text-black/60 transition-transform duration-200 ${
                          shopExpanded ? "rotate-180" : ""
                        }`}
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {shopExpanded && (
                      <ul className="mt-2.5 pl-3 border-l border-black/10 flex flex-col gap-1">
                        {shopCategories.map((cat) => (
                          <li key={cat.href}>
                            <LocalizedClientLink
                              href={cat.href}
                              onClick={closeMenu}
                              data-testid={cat.href === "/store" ? "store-link" : undefined}
                              className="block py-1.5 text-[14px] text-black/70 hover:text-black transition-colors"
                            >
                              {cat.label}
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <LocalizedClientLink
                    href="/store?on_sale=true"
                    onClick={closeMenu}
                    className="py-3.5 text-[16px] font-medium text-black flex items-center justify-between hover:text-black/70 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      On Sale
                      <span className="px-2 py-0.5 rounded-full bg-[#FF3333]/10 text-[#FF3333] text-[11px] font-semibold">
                        -20%
                      </span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-black/40">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </LocalizedClientLink>

                  <LocalizedClientLink
                    href="/store?sort=created_at"
                    onClick={closeMenu}
                    className="py-3.5 text-[16px] font-medium text-black flex items-center justify-between hover:text-black/70 transition-colors"
                  >
                    <span>New Arrivals</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-black/40">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </LocalizedClientLink>
                </nav>

                {/* Carry Styles */}
                <div className="px-5 pt-2 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-black/45 mb-2.5">
                    Browse by Carry Style
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {carryStyles.map((style) => (
                      <LocalizedClientLink
                        key={style.href}
                        href={style.href}
                        onClick={closeMenu}
                        className="px-3.5 py-2 rounded-full bg-[#F0F0F0] hover:bg-black hover:text-white text-center text-[13px] font-medium text-black transition-colors"
                      >
                        {style.label}
                      </LocalizedClientLink>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer: Account, Cart & Region */}
              <div className="border-t border-black/10 bg-[#F9F9F9] px-5 py-4 flex flex-col gap-3.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <LocalizedClientLink
                    href="/account"
                    onClick={closeMenu}
                    data-testid="account-link"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-white border border-black/15 text-sm font-medium text-black hover:bg-neutral-100 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Account</span>
                  </LocalizedClientLink>
                  <LocalizedClientLink
                    href="/cart"
                    onClick={closeMenu}
                    data-testid="cart-link"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-black text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Cart</span>
                  </LocalizedClientLink>
                </div>

                {!!regions?.length && (
                  <div
                    className="flex items-center justify-between text-xs text-black/75 pt-1"
                    onMouseEnter={countryToggleState.open}
                    onMouseLeave={countryToggleState.close}
                    onClick={countryToggleState.toggle}
                  >
                    <CountrySelect toggleState={countryToggleState} regions={regions} />
                  </div>
                )}

                {!!locales?.length && (
                  <div
                    className="flex items-center justify-between text-xs text-black/75"
                    onMouseEnter={languageToggleState.open}
                    onMouseLeave={languageToggleState.close}
                    onClick={languageToggleState.toggle}
                  >
                    <LanguageSelect
                      toggleState={languageToggleState}
                      locales={locales}
                      currentLocale={currentLocale}
                    />
                  </div>
                )}

                <p className="text-[11px] text-black/45">
                  Dilwale Bags &copy; 2000-2026. All Rights Reserved.
                </p>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  )
}

export default SideMenu
