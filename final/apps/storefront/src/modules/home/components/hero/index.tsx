"use client"

import { useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@lib/gsap"

const headingWords = ["FIND", "BAGS", "THAT", "MATCH", "YOUR", "STYLE"]

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const rightImageContainerRef = useRef<HTMLDivElement>(null)
  const starTopRightRef = useRef<HTMLDivElement>(null)
  const starLeftCenterRef = useRef<HTMLDivElement>(null)
  const modelCutoutRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const isReduced = prefersReducedMotion()

      // 1. Initial Cinematic Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      if (!isReduced) {
        // Words slide up from masked container with slight tilt
        tl.from(".hero-word", {
          yPercent: 100,
          duration: 0.65,
          stagger: 0.05,
        })
          .from(
            paragraphRef.current,
            {
              y: 16,
              duration: 0.5,
            },
            "-=0.45"
          )
          .from(
            buttonRef.current,
            {
              y: 14,
              scale: 0.97,
              duration: 0.45,
            },
            "-=0.35"
          )
          .from(
            ".stat-item",
            {
              y: 14,
              duration: 0.45,
              stagger: 0.08,
            },
            "-=0.35"
          )
          .from(
            modelCutoutRef.current,
            {
              y: 24,
              scale: 0.97,
              duration: 0.75,
              ease: "power2.out",
            },
            "-=0.65"
          )
          .from(
            [starTopRightRef.current, starLeftCenterRef.current],
            {
              scale: 0.6,
              rotation: -25,
              duration: 0.6,
              stagger: 0.1,
              ease: "back.out(1.7)",
            },
            "-=0.5"
          )
      }

      // 2. Continuous Subtle Ambient Floating for Stars
      if (!isReduced) {
        gsap.to(starTopRightRef.current, {
          y: -10,
          rotation: 8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        gsap.to(starLeftCenterRef.current, {
          y: 8,
          rotation: -10,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        })
      }

      // 3. ScrollTrigger Parallax on Hero elements
      if (!isReduced) {
        gsap.to(leftContentRef.current, {
          y: -40,
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })

        gsap.to(modelCutoutRef.current, {
          y: 60,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        })

        gsap.to(starTopRightRef.current, {
          y: -60,
          x: 30,
          rotation: 40,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })

        gsap.to(starLeftCenterRef.current, {
          y: 40,
          x: -20,
          rotation: -30,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      // 4. Mouse-Responsive Parallax Interactions (Desktop only)
      const mm = gsap.matchMedia()
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return

        // QuickTo setters for typography
        const headingX = gsap.quickTo(headingRef.current, "x", { duration: 0.8, ease: "power2.out" })
        const headingY = gsap.quickTo(headingRef.current, "y", { duration: 0.8, ease: "power2.out" })
        const headingRotY = gsap.quickTo(headingRef.current, "rotationY", { duration: 0.9, ease: "power2.out" })
        const headingRotX = gsap.quickTo(headingRef.current, "rotationX", { duration: 0.9, ease: "power2.out" })

        const paragraphX = gsap.quickTo(paragraphRef.current, "x", { duration: 0.9, ease: "power2.out" })
        const paragraphY = gsap.quickTo(paragraphRef.current, "y", { duration: 0.9, ease: "power2.out" })

        const statsX = gsap.quickTo(statsRef.current, "x", { duration: 1.0, ease: "power2.out" })
        const statsY = gsap.quickTo(statsRef.current, "y", { duration: 1.0, ease: "power2.out" })

        // QuickTo setters for overlapping images (different depth intensities & directions)
        const modelX = gsap.quickTo(modelCutoutRef.current, "x", { duration: 0.9, ease: "power2.out" })
        const modelY = gsap.quickTo(modelCutoutRef.current, "y", { duration: 0.9, ease: "power2.out" })

        const starTopX = gsap.quickTo(starTopRightRef.current, "x", { duration: 0.6, ease: "power1.out" })
        const starTopY = gsap.quickTo(starTopRightRef.current, "y", { duration: 0.6, ease: "power1.out" })

        const starLeftX = gsap.quickTo(starLeftCenterRef.current, "x", { duration: 0.7, ease: "power1.out" })
        const starLeftY = gsap.quickTo(starLeftCenterRef.current, "y", { duration: 0.7, ease: "power1.out" })

        // Word-level subtle shift
        const wordElements = container.querySelectorAll(".hero-word")
        const wordSetters = Array.from(wordElements).map((el, idx) => {
          const factor = 1 + (idx % 3) * 0.35
          return {
            x: gsap.quickTo(el, "x", { duration: 0.7 + idx * 0.05, ease: "power2.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.7 + idx * 0.05, ease: "power2.out" }),
            factor,
          }
        })

        const onMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect()
          // Normalized coordinates from -1 to 1 based on center of hero section
          const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1
          const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1

          // Subtle Typography parallax
          headingX(normX * 14)
          headingY(normY * 10)
          headingRotY(normX * 4)
          headingRotX(-normY * 4)

          paragraphX(normX * 8)
          paragraphY(normY * 6)

          statsX(normX * 5)
          statsY(normY * 4)

          // Micro word displacement
          wordSetters.forEach((ws) => {
            ws.x(normX * 4 * ws.factor)
            ws.y(normY * 3 * ws.factor)
          })

          // Multi-layer Image parallax:
          // Model cutout moves slightly counter to cursor to create spatial depth
          modelX(-normX * 16)
          modelY(-normY * 12)

          // Sparkle 1 (foreground layer, faster positive movement)
          starTopX(normX * 28)
          starTopY(normY * 22)

          // Sparkle 2 (mid-left layer, opposite axis)
          starLeftX(-normX * 20)
          starLeftY(normY * 16)
        }

        const onMouseLeave = () => {
          headingX(0)
          headingY(0)
          headingRotY(0)
          headingRotX(0)
          paragraphX(0)
          paragraphY(0)
          statsX(0)
          statsY(0)
          modelX(0)
          modelY(0)
          starTopX(0)
          starTopY(0)
          starLeftX(0)
          starLeftY(0)
          wordSetters.forEach((ws) => {
            ws.x(0)
            ws.y(0)
          })
        }

        container.addEventListener("mousemove", onMouseMove, { passive: true })
        container.addEventListener("mouseleave", onMouseLeave)

        return () => {
          container.removeEventListener("mousemove", onMouseMove)
          container.removeEventListener("mouseleave", onMouseLeave)
        }
      })

      // 5. Magnetic Hover on "Shop Now" CTA
      const btn = buttonRef.current
      if (btn && !isReduced) {
        const btnX = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power2.out" })
        const btnY = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power2.out" })

        const onBtnMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect()
          const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.35
          const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.35
          btnX(dx)
          btnY(dy)
        }

        const onBtnLeave = () => {
          btnX(0)
          btnY(0)
          gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out" })
        }

        const onBtnEnter = () => {
          gsap.to(btn, { scale: 1.04, duration: 0.3, ease: "power2.out" })
        }

        btn.addEventListener("mousemove", onBtnMove)
        btn.addEventListener("mouseleave", onBtnLeave)
        btn.addEventListener("mouseenter", onBtnEnter)

        return () => {
          btn.removeEventListener("mousemove", onBtnMove)
          btn.removeEventListener("mouseleave", onBtnLeave)
          btn.removeEventListener("mouseenter", onBtnEnter)
        }
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="bg-[#F2F0F1] relative overflow-hidden w-full select-none"
      style={{ perspective: 1000 }}
    >
      <div className="content-container pt-10 sm:pt-16 lg:pt-20 pb-0 flex flex-col lg:flex-row items-center justify-between min-h-[620px] lg:min-h-[660px]">
        {/* Left Content */}
        <div
          ref={leftContentRef}
          className="flex flex-col items-start max-w-xl lg:max-w-2xl z-10 pb-12 lg:pb-24"
        >
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-[64px] font-black uppercase tracking-tight text-black leading-[1.0] font-integral flex flex-wrap"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {headingWords.map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block mr-[0.24em] last:mr-0 py-1">
                <span className="hero-word inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={paragraphRef}
            className="text-[14px] sm:text-[16px] text-black/60 leading-[22px] mt-6 sm:mt-8 max-w-[545px] will-change-transform"
          >
            Browse through our diverse range of meticulously crafted bags, designed to bring out your individuality and elevate your everyday carry.
          </p>

          <LocalizedClientLink
            ref={buttonRef}
            href="/store"
            data-cursor="hover"
            className="mt-8 sm:mt-9 bg-black text-white rounded-full px-14 py-4 text-[16px] font-medium hover:bg-neutral-800 transition-colors inline-flex items-center justify-center w-full sm:w-auto shadow-md will-change-transform"
          >
            Shop Now
          </LocalizedClientLink>

          {/* Statistics Row */}
          <div
            ref={statsRef}
            className="flex flex-wrap items-center justify-center sm:justify-start gap-y-4 gap-x-6 sm:gap-8 mt-8 sm:mt-12 pt-2 w-full will-change-transform"
          >
            <div className="stat-item pr-6 sm:pr-8 border-r border-black/10">
              <span className="block text-2xl sm:text-4xl font-bold text-black tracking-tight">
                200+
              </span>
              <span className="text-xs sm:text-sm text-black/60 mt-1 block">
                International Brands
              </span>
            </div>

            <div className="stat-item sm:pr-8 sm:border-r sm:border-black/10">
              <span className="block text-2xl sm:text-4xl font-bold text-black tracking-tight">
                2,000+
              </span>
              <span className="text-xs sm:text-sm text-black/60 mt-1 block">
                Handcrafted Bag Styles
              </span>
            </div>

            <div className="stat-item">
              <span className="block text-2xl sm:text-4xl font-bold text-black tracking-tight">
                30,000+
              </span>
              <span className="text-xs sm:text-sm text-black/60 mt-1 block">
                Happy Customers
              </span>
            </div>
          </div>
        </div>

        {/* Right Imagery with Decorative Star Vectors */}
        <div
          ref={rightImageContainerRef}
          className="relative w-full lg:w-1/2 flex items-end justify-center lg:justify-end self-end mt-4 lg:mt-0"
        >
          {/* Sparkle Vector Star (Top Right) */}
          <div
            ref={starTopRightRef}
            className="absolute right-0 sm:right-2 top-0 sm:top-3 z-20 pointer-events-none will-change-transform"
          >
            <Image
              src="/figma/21d44.svg"
              alt="Sparkle Star"
              width={80}
              height={80}
              className="w-12 h-12 sm:w-20 sm:h-20 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            />
          </div>

          {/* Sparkle Vector Star (Left Center) */}
          <div
            ref={starLeftCenterRef}
            className="absolute left-2 sm:left-8 top-[42%] z-20 pointer-events-none will-change-transform"
          >
            <Image
              src="/figma/b08ce.svg"
              alt="Small Sparkle Star"
              width={56}
              height={56}
              className="w-10 h-10 sm:w-14 sm:h-14 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            />
          </div>

          {/* Hero Editorial Bag Models */}
          <div
            ref={modelCutoutRef}
            className="relative w-full max-w-[580px] h-[440px] sm:h-[580px] lg:h-[660px] bg-[#F2F0F1] will-change-transform"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.72) 17%, black 26%, black 89%, rgba(0,0,0,0.68) 95%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 5%, rgba(0,0,0,0.82) 10%, black 14%, black 86%, rgba(0,0,0,0.55) 95%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.72) 17%, black 26%, black 89%, rgba(0,0,0,0.68) 95%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 5%, rgba(0,0,0,0.82) 10%, black 14%, black 86%, rgba(0,0,0,0.55) 95%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          >
            <Image
              src="/bags/hero-bags.jpg"
              alt="Dilwale Bags Editorial Collection"
              fill
              priority
              className="object-cover object-[82%_10%] mix-blend-multiply brightness-[1.06] contrast-[1.03] transition-transform duration-700 ease-out hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
