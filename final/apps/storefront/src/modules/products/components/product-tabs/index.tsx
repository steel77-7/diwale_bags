"use client"

import { useState, useRef, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { gsap, prefersReducedMotion } from "@lib/gsap"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const sampleReviews = [
  {
    name: "Samantha D.",
    rating: 5,
    date: "August 14, 2026",
    text: `"I absolutely love this bag! The silhouette is unique and the leather feels so supple yet structured. As a daily commuter, I appreciate the thoughtful interior pockets. It has become my favorite go-to carry."`,
  },
  {
    name: "Alex M.",
    rating: 4.5,
    date: "August 15, 2026",
    text: `"This bag exceeded my expectations! The finish is rich and the hardware quality is top-notch. Being a designer myself, I'm quite picky about proportions and stitching, and this piece definitely gets a thumbs up."`,
  },
  {
    name: "Ethan R.",
    rating: 5,
    date: "August 16, 2026",
    text: `"A must-have for anyone who appreciates clean craftsmanship. The minimalistic yet elevated hardware caught my eye, and the strap drop is ideal. You can see the designer's touch in every seam."`,
  },
  {
    name: "Olivia P.",
    rating: 5,
    date: "August 17, 2026",
    text: `"As a minimalist, I love bags that elevate an outfit effortlessly. This piece works seamlessly from workday meetings to evening dinners."`,
  },
  {
    name: "Liam K.",
    rating: 4,
    date: "August 18, 2026",
    text: `"The leather thickness, edge-paint finish, and zipper glide hold up exceptionally well with daily use. Extremely pleased with this purchase."`,
  },
  {
    name: "Ava H.",
    rating: 5,
    date: "August 19, 2026",
    text: `"I'm not usually one to leave reviews, but this bag is truly fantastic. Clean stitchwork, balanced weight distribution, and timeless structure."`,
  },
]

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">("reviews")
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (panelRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      )
    }
  }, [activeTab])

  return (
    <div className="w-full mt-12 sm:mt-16">
      {/* 3 Horizontal Tabs */}
      <div className="flex border-b border-black/10 text-center">
        <button
          onClick={() => setActiveTab("details")}
          data-cursor="hover"
          className={`flex-1 py-4 text-base sm:text-lg font-medium transition-colors relative ${
            activeTab === "details"
              ? "text-black border-b-2 border-black font-semibold"
              : "text-black/60 hover:text-black"
          }`}
        >
          Product Details
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          data-cursor="hover"
          className={`flex-1 py-4 text-base sm:text-lg font-medium transition-colors relative ${
            activeTab === "reviews"
              ? "text-black border-b-2 border-black font-semibold"
              : "text-black/60 hover:text-black"
          }`}
        >
          Rating &amp; Reviews
        </button>
        <button
          onClick={() => setActiveTab("faqs")}
          data-cursor="hover"
          className={`flex-1 py-4 text-base sm:text-lg font-medium transition-colors relative ${
            activeTab === "faqs"
              ? "text-black border-b-2 border-black font-semibold"
              : "text-black/60 hover:text-black"
          }`}
        >
          FAQs
        </button>
      </div>

      {/* Tab Panels */}
      <div ref={panelRef} className="py-8 sm:py-10 will-change-transform">
        {activeTab === "details" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-black/70 leading-relaxed">
            <div>
              <h3 className="font-bold text-black text-lg mb-3">Specifications</h3>
              <ul className="flex flex-col gap-2">
                <li><span className="font-semibold text-black">Material:</span> {product.material || "Full-Grain Vegetable-Tanned Leather"}</li>
                <li><span className="font-semibold text-black">Country of Origin:</span> {product.origin_country || "Italy"}</li>
                <li><span className="font-semibold text-black">Care:</span> Wipe clean with a soft dry cloth; store in dust bag</li>
                <li><span className="font-semibold text-black">Hardware:</span> Solid brushed brass clasps &amp; YKK Excella zips</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-black text-lg mb-3">Bag Craftsmanship</h3>
              <p>
                Engineered with precision saddle-stitching, hand-painted edges, reinforced load-bearing straps, and lined interior compartments built to hold their architectural form.
              </p>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {/* Reviews Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-black">
                  All Reviews
                </h3>
                <span className="text-sm text-black/60 font-normal">
                  (451)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select className="bg-[#F0F0F0] rounded-full px-4 py-2.5 text-sm font-medium text-black focus:outline-none cursor-pointer">
                  <option value="latest">Latest</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>

                <button
                  type="button"
                  className="bg-black text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {sampleReviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="border border-black/10 rounded-[20px] p-6 sm:p-7 bg-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center text-[#FFC633] mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill={i < Math.floor(rev.rating) ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="1.2"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.04894 0.927051C9.3483 0.00574112 10.6517 0.00573993 10.9511 0.927049L12.4697 5.60081C12.6035 6.01284 12.9875 6.2918 13.4207 6.2918H18.3351C19.3037 6.2918 19.7065 7.53155 18.9231 8.10062L14.9472 10.9894C14.5967 11.244 14.4499 11.6957 14.5838 12.1077L16.1024 16.7815C16.4017 17.7028 15.3472 18.4688 14.5638 17.8997L10.5879 15.011C10.2374 14.7563 9.7626 14.7563 9.4121 15.011L5.43624 17.8997C4.65277 18.4688 3.59828 17.7028 3.89763 16.7815L5.41623 12.1077C5.55006 11.6957 5.40333 11.244 5.05284 10.9894L1.07693 8.10062C0.293475 7.53155 0.696328 6.2918 1.66492 6.2918H6.57929C7.01252 6.2918 7.39647 6.01284 7.5303 5.60081L9.04894 0.927051Z" />
                        </svg>
                      ))}
                    </div>

                    {/* Name + Badge */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="font-bold text-base sm:text-lg text-black">
                        {rev.name}
                      </span>
                      <Image
                        src="/figma/6112d.svg"
                        alt="Verified"
                        width={18}
                        height={18}
                        className="w-4 h-4"
                      />
                    </div>

                    {/* Review Text */}
                    <p className="text-sm text-black/60 leading-relaxed mb-4">
                      {rev.text}
                    </p>
                  </div>

                  <span className="text-xs text-black/40 font-medium">
                    Posted on {rev.date}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-9">
              <button
                type="button"
                className="border border-black/10 rounded-full px-12 py-3 text-sm font-medium text-black hover:bg-neutral-100 transition-colors shadow-xs"
              >
                Load More Reviews
              </button>
            </div>
          </div>
        )}

        {activeTab === "faqs" && (
          <div className="max-w-2xl mx-auto flex flex-col gap-6 text-sm sm:text-base">
            <div className="border border-black/10 rounded-[16px] p-5">
              <h4 className="font-bold text-black mb-1">What fits inside this bag?</h4>
              <p className="text-black/60">Each silhouette is proportioned for daily essentials—accommodating a phone, wallet, keys, and, on Medium to Large styles, a tablet or 14-inch laptop.</p>
            </div>
            <div className="border border-black/10 rounded-[16px] p-5">
              <h4 className="font-bold text-black mb-1">What is your shipping timeframe?</h4>
              <p className="text-black/60">Orders are processed within 24 hours in protective dust bags. Standard delivery arrives in 2–4 business days.</p>
            </div>
            <div className="border border-black/10 rounded-[16px] p-5">
              <h4 className="font-bold text-black mb-1">What is your return policy?</h4>
              <p className="text-black/60">We offer complimentary 30-day returns and exchanges for all unused bags with original tags and dust bag intact.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
