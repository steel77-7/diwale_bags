"use client"

import { useRef } from "react"
import { gsap, useGSAP, prefersReducedMotion } from "@lib/gsap"

export default function AnimatedProductList({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const listRef = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      const list = listRef.current
      if (!list || prefersReducedMotion()) return

      const items = list.querySelectorAll(".store-product-item")
      if (items.length > 0) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: list,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          y: 18,
          duration: 0.55,
          stagger: 0.04,
          ease: "power2.out",
        })
      }
    },
    { scope: listRef }
  )

  return (
    <ul ref={listRef} className={className} data-testid="products-list">
      {children}
    </ul>
  )
}
