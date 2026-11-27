"use client"

import { Fragment, useEffect, useState } from "react"
import { Transition } from "@headlessui/react"
import StoreFilterSidebar from "../store-filter-sidebar"

export default function MobileFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        data-testid="mobile-filter-button"
        aria-label="Open filters"
        className="lg:hidden w-9 h-9 rounded-full bg-[#F0F0F0] hover:bg-neutral-200 text-black flex items-center justify-center shrink-0 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14H7M9 8H15M17 16H23"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Transition show={isOpen} as={Fragment}>
        <div
          className="fixed inset-0 z-[80] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Product filters"
        >
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
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-250 transform"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="ease-in duration-200 transform"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="fixed inset-x-0 bottom-0 z-10 bg-white rounded-t-[24px] max-h-[85dvh] overflow-y-auto px-5 pb-6 pt-4 shadow-2xl">
              <div className="w-10 h-1 bg-black/15 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <h2 className="text-[20px] font-bold text-black tracking-tight">
                  Filters
                </h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close filters"
                  data-testid="close-filter-button"
                  className="w-8 h-8 rounded-full bg-[#F0F0F0] text-black flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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

              <StoreFilterSidebar inSheet onApply={() => setIsOpen(false)} />
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  )
}

