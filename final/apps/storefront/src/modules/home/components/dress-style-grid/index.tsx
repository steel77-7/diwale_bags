"use client"

import { useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { gsap, useGSAP, prefersReducedMotion } from "@lib/gsap"

const styles = [
  {
    title: "Casual",
    href: "/collections/casual",
    image: "/bags/bento-casual.jpg",
    colSpan: "md:col-span-1",
    imgClass: "inset-0 w-full h-full",
  },
  {
    title: "Formal",
    href: "/collections/formal",
    image: "/bags/bento-formal.jpg",
    colSpan: "md:col-span-2",
    imgClass: "inset-0 w-full h-full",
  },
  {
    title: "Party",
    href: "/collections/party",
    image: "/bags/bento-party.jpg",
    colSpan: "md:col-span-2",
    imgClass: "inset-0 w-full h-full",
  },
  {
    title: "Gym",
    href: "/collections/gym",
    image: "/bags/bento-gym.jpg",
    colSpan: "md:col-span-1",
    imgClass: "inset-0 w-full h-full",
  },
]

export default function DressStyleGrid() {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const isReduced = prefersReducedMotion()
      if (isReduced) return

      // ScrollTrigger Entrance (transform-only so cards never get stuck hidden)
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        })
      }

      const cards = container.querySelectorAll<HTMLElement>(".bento-card")
      if (cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: container,
            start: "top 92%",
            toggleActions: "play none none none",
          },
          y: 24,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        })

        // Interactive 3D Depth Window on Desktop
        const mm = gsap.matchMedia()
        mm.add("(min-width: 1024px)", () => {
          cards.forEach((card) => {
            const imgWrap = card.querySelector<HTMLElement>(".bento-img-wrap")
            const titleEl = card.querySelector<HTMLElement>(".bento-title")

            if (!imgWrap) return

            const imgX = gsap.quickTo(imgWrap, "x", { duration: 0.5, ease: "power2.out" })
            const imgY = gsap.quickTo(imgWrap, "y", { duration: 0.5, ease: "power2.out" })
            const titleX = titleEl ? gsap.quickTo(titleEl, "x", { duration: 0.5, ease: "power2.out" }) : null
            const titleY = titleEl ? gsap.quickTo(titleEl, "y", { duration: 0.5, ease: "power2.out" }) : null

            const onMouseMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect()
              const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1
              const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1

              imgX(normX * 16)
              imgY(normY * 12)

              if (titleX && titleY) {
                titleX(-normX * 6)
                titleY(-normY * 4)
              }
            }

            const onMouseEnter = () => {
              gsap.to(card, { y: -4, duration: 0.35, ease: "power2.out" })
              gsap.to(imgWrap, { scale: 1.06, duration: 0.5, ease: "power2.out" })
            }

            const onMouseLeave = () => {
              imgX(0)
              imgY(0)
              if (titleX && titleY) {
                titleX(0)
                titleY(0)
              }
              gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out" })
              gsap.to(imgWrap, { scale: 1, duration: 0.5, ease: "power2.out" })
            }

            card.addEventListener("mousemove", onMouseMove, { passive: true })
            card.addEventListener("mouseenter", onMouseEnter)
            card.addEventListener("mouseleave", onMouseLeave)
          })
        })
      }
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="content-container my-12 sm:my-16 md:my-20 select-none">
      <div className="bg-[#F0F0F0] rounded-[32px] sm:rounded-[40px] px-6 py-10 sm:p-12 md:p-16">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-[48px] font-black uppercase tracking-tight text-center text-black mb-8 sm:mb-14 font-integral will-change-transform"
        >
          BROWSE BY BAG STYLE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {styles.map((item) => (
            <LocalizedClientLink
              key={item.title}
              href={item.href}
              data-cursor="view"
              className={`bento-card bg-white rounded-[20px] h-[220px] sm:h-[289px] relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 will-change-transform ${item.colSpan}`}
            >
              <span className="bento-title text-[24px] sm:text-[32px] md:text-[36px] font-bold text-black p-6 sm:p-8 block relative z-10 group-hover:text-neutral-700 transition-colors will-change-transform">
                {item.title}
              </span>

              <div
                className={`bento-img-wrap absolute pointer-events-none will-change-transform ${item.imgClass}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="eager"
                  className="object-cover object-right"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}
