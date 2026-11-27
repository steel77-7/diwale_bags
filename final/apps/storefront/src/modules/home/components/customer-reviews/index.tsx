"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap, useGSAP, prefersReducedMotion } from "@lib/gsap"

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: `"I'm blown away by the quality and finish of the bags I received from Dilwale Bags. From everyday totes to evening clutches, every piece I've bought has exceeded my expectations."`,
  },
  {
    name: "Alex K.",
    rating: 5,
    text: `"Finding bags that align with my personal style used to be a challenge until I discovered Dilwale Bags. The range of silhouettes they offer is truly remarkable, catering to every occasion."`,
  },
  {
    name: "James L.",
    rating: 5,
    text: `"As someone who's always on the lookout for unique leather pieces, I'm thrilled to have stumbled upon Dilwale Bags. The selection of bags is not only diverse but also timeless and functional."`,
  },
  {
    name: "Emily R.",
    rating: 5,
    text: `"The attention to detail and hardware craftsmanship in every bag is exceptional. Dilwale Bags has become my definitive destination for both daily carry and weekend travel."`,
  },
  {
    name: "Michael B.",
    rating: 5,
    text: `"Seamless ordering, rapid delivery, and supple full-grain leather textures. The stitching and strap hardware on the crossbody and tote bags are world-class."`,
  },
]

export default function CustomerReviews() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const isReduced = prefersReducedMotion()
      if (isReduced) return

      // Section Heading entrance
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          y: 18,
          duration: 0.6,
          ease: "power2.out",
        })
      }

      // Review Cards staggered entrance
      const cards = section.querySelectorAll<HTMLElement>(".review-card")
      if (cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            toggleActions: "play none none none",
          },
          y: 20,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        })

        // Card Hover Elevation
        cards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" })
          })
          card.addEventListener("mouseleave", () => {
            gsap.to(card, { y: 0, duration: 0.35, ease: "power2.out" })
          })
        })
      }

      // Magnetic Controls for Prev/Next Buttons
      const buttons = [prevBtnRef.current, nextBtnRef.current]
      buttons.forEach((btn) => {
        if (!btn) return
        const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power2.out" })
        const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power2.out" })

        const onMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect()
          const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.35
          const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.35
          xTo(dx)
          yTo(dy)
        }

        const onMouseEnter = () => {
          gsap.to(btn, { scale: 1.1, duration: 0.25, ease: "power2.out" })
        }

        const onMouseLeave = () => {
          xTo(0)
          yTo(0)
          gsap.to(btn, { scale: 1, duration: 0.35, ease: "power2.out" })
        }

        btn.addEventListener("mousemove", onMouseMove)
        btn.addEventListener("mouseenter", onMouseEnter)
        btn.addEventListener("mouseleave", onMouseLeave)
      })
    },
    { scope: sectionRef }
  )

  const scrollWithGSAP = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return

    const offset = direction === "left" ? -420 : 420
    const current = el.scrollLeft
    const target = Math.max(0, current + offset)

    gsap.to(el, {
      scrollLeft: target,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    })
  }

  return (
    <section ref={sectionRef} className="content-container my-14 sm:my-20 select-none">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-[48px] font-black uppercase tracking-tight text-black font-integral will-change-transform"
        >
          OUR HAPPY CUSTOMERS
        </h2>

        {/* Prev / Next Arrow Controls */}
        <div className="flex items-center gap-3">
          <button
            ref={prevBtnRef}
            onClick={() => scrollWithGSAP("left")}
            data-cursor="hover"
            aria-label="Previous review"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200 shadow-xs will-change-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            ref={nextBtnRef}
            onClick={() => scrollWithGSAP("right")}
            data-cursor="hover"
            aria-label="Next review"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200 shadow-xs will-change-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Reviews Horizontal Rail */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pt-4 pb-6 px-1 -mx-1"
      >
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="review-card snap-start border border-black/10 rounded-[20px] p-6 sm:p-8 bg-white w-[calc(100vw-32px)] sm:w-auto sm:min-w-[360px] md:min-w-[400px] sm:flex-1 shrink-0 flex flex-col justify-between shadow-xs hover:shadow-lg transition-shadow duration-300 will-change-transform"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center text-[#FFC633] mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <svg
                    key={i}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.04894 0.927051C9.3483 0.00574112 10.6517 0.00573993 10.9511 0.927049L12.4697 5.60081C12.6035 6.01284 12.9875 6.2918 13.4207 6.2918H18.3351C19.3037 6.2918 19.7065 7.53155 18.9231 8.10062L14.9472 10.9894C14.5967 11.244 14.4499 11.6957 14.5838 12.1077L16.1024 16.7815C16.4017 17.7028 15.3472 18.4688 14.5638 17.8997L10.5879 15.011C10.2374 14.7563 9.7626 14.7563 9.4121 15.011L5.43624 17.8997C4.65277 18.4688 3.59828 17.7028 3.89763 16.7815L5.41623 12.1077C5.55006 11.6957 5.40333 11.244 5.05284 10.9894L1.07693 8.10062C0.293475 7.53155 0.696328 6.2918 1.66492 6.2918H6.57929C7.01252 6.2918 7.39647 6.01284 7.5303 5.60081L9.04894 0.927051Z" />
                  </svg>
                ))}
              </div>

              {/* Reviewer Name with Verified Badge */}
              <div className="flex items-center gap-1.5 mb-3">
                <span className="font-bold text-[18px] sm:text-[20px] text-black">
                  {rev.name}
                </span>
                <Image
                  src="/figma/6112d.svg"
                  alt="Verified customer badge"
                  width={20}
                  height={20}
                  loading="eager"
                  className="w-5 h-5"
                />
              </div>

              {/* Review Text */}
              <p className="text-[14px] sm:text-[16px] text-black/60 leading-[22px]">
                {rev.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
