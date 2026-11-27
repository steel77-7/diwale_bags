import { ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  deleteProductsWorkflow,
} from "@medusajs/medusa/core-flows"

interface MockProductDef {
  handle: string
  title: string
  subtitle?: string
  description: string
  price: number
  originalPrice?: number
  discountPercent?: number
  rating: number
  categoryHandle: string
  collectionHandles: string[]
  images: string[]
  colors?: string[]
  sizes?: string[]
}

const CATEGORIES_TO_ENSURE = [
  { name: "Handbags", handle: "handbags" },
  { name: "Tote Bags", handle: "tote-bags" },
  { name: "Crossbody", handle: "crossbody" },
  { name: "Backpacks", handle: "backpacks" },
  { name: "Travel Bags", handle: "travel-bags" },
]

const COLLECTIONS_TO_ENSURE = [
  { title: "New Arrivals", handle: "new-arrivals" },
  { title: "Top Selling", handle: "top-selling" },
  { title: "Casual", handle: "casual" },
  { title: "Formal", handle: "formal" },
  { title: "Party", handle: "party" },
  { title: "Gym", handle: "gym" },
]

const DEFAULT_COLORS = ["Black", "Cognac", "Olive", "Navy"]

const MOCK_PRODUCTS: MockProductDef[] = [
  // --- New Arrivals (Homepage Rail 1) ---
  {
    handle: "chevron-quilted-crossbody",
    title: "Chevron Quilted Crossbody Bag",
    subtitle: "Matelassé leather chain shoulder bag",
    description:
      "Crafted from supple chevron-quilted calfskin with antique gold-tone chain hardware and a zip-top interior lined in suede microfiber.",
    price: 240,
    originalPrice: 280,
    discountPercent: 15,
    rating: 4.8,
    categoryHandle: "crossbody",
    collectionHandles: ["new-arrivals", "party"],
    images: ["http://localhost:8000/bags/bag-02-leather-crossbody.jpg"],
    colors: ["Black", "Cream", "Coral"],
    sizes: ["Mini", "Small"],
  },
  {
    handle: "organic-canvas-everyday-tote",
    title: "Organic Canvas Everyday Tote",
    subtitle: "Minimalist heavyweight cotton carryall",
    description:
      "Loomed from 16oz unbleached canvas with reinforced box-stitched webbing handles and an open upright silhouette for daily errands.",
    price: 95,
    rating: 4.6,
    categoryHandle: "tote-bags",
    collectionHandles: ["new-arrivals", "casual"],
    images: ["http://localhost:8000/bags/bag-15-canvas-tote.jpg"],
    colors: ["Tan", "Cream", "Black"],
    sizes: ["Medium", "Large"],
  },
  {
    handle: "saddle-leather-backpack",
    title: "Saddle Leather Heritage Backpack",
    subtitle: "Full-grain chestnut leather rucksack",
    description:
      "Handcrafted from vegetable-tanned pull-up leather with a padded 15-inch laptop sleeve, front zip organizer, and ergonomic shoulder straps.",
    price: 260,
    originalPrice: 310,
    discountPercent: 15,
    rating: 4.9,
    categoryHandle: "backpacks",
    collectionHandles: ["new-arrivals", "casual"],
    images: ["http://localhost:8000/bags/bag-13-urban-backpack.jpg"],
    colors: ["Cognac", "Brown", "Black"],
    sizes: ["Medium", "Large"],
  },
  {
    handle: "cognac-leather-weekender",
    title: "Cognac Leather Weekender Duffel",
    subtitle: "Full-grain cabin travel duffel",
    description:
      "Built for effortless 3-day escapes with rolled leather grab handles, brushed brass D-rings, protective bottom studs, and a detachable strap.",
    price: 320,
    rating: 4.9,
    categoryHandle: "travel-bags",
    collectionHandles: ["new-arrivals", "formal"],
    images: ["http://localhost:8000/bags/bag-travel-duffel.jpg"],
    colors: ["Cognac", "Brown", "Black"],
    sizes: ["Large", "Weekender"],
  },

  // --- Top Selling (Homepage Rail 2) ---
  {
    handle: "pebbled-leather-mini-satchel",
    title: "Pebbled Leather Mini Satchel",
    subtitle: "Double-buckle structured top handle",
    description:
      "Compact architectural silhouette in pebble-grained leather featuring twin gold-tone pin buckles, top handle, and detachable crossbody strap.",
    price: 185,
    originalPrice: 230,
    discountPercent: 20,
    rating: 4.7,
    categoryHandle: "handbags",
    collectionHandles: ["top-selling", "formal"],
    images: ["http://localhost:8000/bags/bag-08-leather-surface.jpg"],
    colors: ["Grey", "Black", "Cream"],
    sizes: ["Mini", "Small", "Medium"],
  },
  {
    handle: "ballistic-nylon-daypack",
    title: "Minimalist Ballistic Daypack",
    subtitle: "Weather-resistant urban commuter pack",
    description:
      "Clean matte-black ballistic nylon daypack with concealed front stash pocket, dual-zip main compartment, and contoured back padding.",
    price: 145,
    rating: 4.8,
    categoryHandle: "backpacks",
    collectionHandles: ["top-selling", "casual", "gym"],
    images: ["http://localhost:8000/bags/bag-11-classic-backpack.jpg"],
    colors: ["Black", "Charcoal", "Navy"],
    sizes: ["Medium", "Large"],
  },
  {
    handle: "chevron-chain-shoulder-bag",
    title: "Chevron Chain Shoulder Bag",
    subtitle: "Smooth calfskin evening flap bag",
    description:
      "Polished flap shoulder bag accented with geometric chevron striping and a convertible palladium chain strap for day-to-evening wear.",
    price: 210,
    originalPrice: 260,
    discountPercent: 20,
    rating: 4.6,
    categoryHandle: "crossbody",
    collectionHandles: ["top-selling", "party"],
    images: ["http://localhost:8000/bags/bag-04-clutch-sling.jpg"],
    colors: ["Pink", "Cream", "Black"],
    sizes: ["Mini", "Small"],
  },
  {
    handle: "waxed-canvas-overnight-duffel",
    title: "Waxed Canvas Overnight Duffel",
    subtitle: "Saddle-trimmed heritage travel bag",
    description:
      "Heavy charcoal waxed canvas reinforced with saddle-tan leather corner guards, rolled handles, and an exterior zip passport pocket.",
    price: 245,
    rating: 4.9,
    categoryHandle: "travel-bags",
    collectionHandles: ["top-selling", "casual"],
    images: ["http://localhost:8000/bags/bag-canvas-weekender.jpg"],
    colors: ["Charcoal", "Olive", "Black"],
    sizes: ["Large", "Weekender"],
  },

  // --- Extended Handbags ---
  {
    handle: "structured-calfskin-handbag",
    title: "Structured Calfskin Handbag",
    subtitle: "Signature clasp top-handle bag",
    description:
      "Tailored trapeze silhouette in glossy calfskin leather featuring a sculptural metal turn-lock clasp and interior divided compartments.",
    price: 295,
    originalPrice: 350,
    discountPercent: 15,
    rating: 4.9,
    categoryHandle: "handbags",
    collectionHandles: ["formal", "party"],
    images: ["http://localhost:8000/bags/bag-01-handbag-structured.jpg"],
    colors: ["Coral", "Red", "Black"],
    sizes: ["Small", "Medium"],
  },
  {
    handle: "woven-top-handle-handbag",
    title: "Woven Leather Top-Handle Bag",
    subtitle: "Artisan intrecciato flap handbag",
    description:
      "Hand-woven leather body paired with a smooth tonal saddle flap and signature front clasp for warm-weather sophistication.",
    price: 275,
    rating: 4.7,
    categoryHandle: "handbags",
    collectionHandles: ["formal", "party"],
    images: ["http://localhost:8000/bags/bag-03-shoulder-bag.jpg"],
    colors: ["Coral", "Tan", "Cream"],
    sizes: ["Small", "Medium"],
  },
  {
    handle: "heritage-buckled-satchel",
    title: "Heritage Buckled Leather Satchel",
    subtitle: "Twin-pocket work & city briefcase",
    description:
      "Supple burnished brown leather satchel with dual front gusset pockets, antique brass roller buckles, and top grab handle.",
    price: 230,
    originalPrice: 270,
    discountPercent: 15,
    rating: 4.6,
    categoryHandle: "handbags",
    collectionHandles: ["formal", "casual"],
    images: ["http://localhost:8000/bags/bag-17-brown-briefcase.jpg"],
    colors: ["Cognac", "Brown", "Black"],
    sizes: ["Medium", "Large"],
  },

  // --- Extended Tote Bags ---
  {
    handle: "bridle-handle-market-tote",
    title: "Bridle Handle Canvas Tote",
    subtitle: "Zip-top waxed canvas commuter tote",
    description:
      "Constructed from water-repellent ochre canvas with thick vegetable-tanned bridle leather straps, brass rivets, and an exterior slip pocket.",
    price: 165,
    originalPrice: 195,
    discountPercent: 15,
    rating: 4.8,
    categoryHandle: "tote-bags",
    collectionHandles: ["casual"],
    images: ["http://localhost:8000/bags/bag-05-leather-tote.jpg"],
    colors: ["Tan", "Olive", "Black"],
    sizes: ["Medium", "Large"],
  },
  {
    handle: "architect-kraft-shopper-tote",
    title: "Architect Kraft Shopper Tote",
    subtitle: "Minimalist structured utility tote",
    description:
      "Featherweight yet rigid flat-fold shopper tote in warm kraft texture with woven herringbone cotton straps for everyday carry.",
    price: 85,
    rating: 4.4,
    categoryHandle: "tote-bags",
    collectionHandles: ["casual"],
    images: ["http://localhost:8000/bags/bag-14-leather-duffel.jpg"],
    colors: ["Tan", "Cream"],
    sizes: ["Medium", "Large"],
  },
  {
    handle: "horn-handle-haircalf-tote",
    title: "Horn-Handle Haircalf Tote",
    subtitle: "Statement carved horn handle bag",
    description:
      "Editorial luxury tote crafted from mottled hair-on-hide leather with hand-carved horn ring handles and solid brass charm accents.",
    price: 310,
    originalPrice: 380,
    discountPercent: 20,
    rating: 4.9,
    categoryHandle: "tote-bags",
    collectionHandles: ["party", "formal"],
    images: ["http://localhost:8000/bags/bag-21-tote-adele.jpg"],
    colors: ["Brown", "Black"],
    sizes: ["Medium", "Large"],
  },

  // --- Extended Crossbody & Shoulder ---
  {
    handle: "woven-rattan-circle-crossbody",
    title: "Woven Rattan Circle Crossbody",
    subtitle: "Handcrafted summer resort shoulder bag",
    description:
      "Artisan-braided natural rattan circular silhouette fitted with a slender tan leather crossbody strap and braided loop closure.",
    price: 120,
    rating: 4.5,
    categoryHandle: "crossbody",
    collectionHandles: ["casual", "party"],
    images: ["http://localhost:8000/bags/bag-09-editorial-handbag.jpg"],
    colors: ["Tan", "Cream"],
    sizes: ["Mini", "Small"],
  },
  {
    handle: "pastel-chain-mini-crossbody",
    title: "Pastel Chain Mini Crossbody",
    subtitle: "Playful compact evening shoulder bag",
    description:
      "Matte smooth-finish mini flap bag suspended from a faceted silver link chain, sized neatly for cards, keys, and phone.",
    price: 115,
    originalPrice: 140,
    discountPercent: 20,
    rating: 4.3,
    categoryHandle: "crossbody",
    collectionHandles: ["party", "casual"],
    images: ["http://localhost:8000/bags/bag-10-crossbody-minimal.jpg"],
    colors: ["Pink", "Cream", "White"],
    sizes: ["Mini"],
  },
  {
    handle: "charcoal-canvas-messenger",
    title: "Charcoal Canvas Messenger Bag",
    subtitle: "Buckled commuter crossbody satchel",
    description:
      "Heavy charcoal cotton canvas messenger with full-grain leather buckle straps, brass snap pockets, and padded 14-inch laptop divider.",
    price: 175,
    rating: 4.7,
    categoryHandle: "crossbody",
    collectionHandles: ["casual", "formal"],
    images: ["http://localhost:8000/bags/bag-18-black-satchel.jpg"],
    colors: ["Charcoal", "Black", "Olive"],
    sizes: ["Medium", "Large"],
  },
  {
    handle: "artisan-studded-crossbody",
    title: "Artisan Studded Leather Crossbody",
    subtitle: "Distressed saddle leather shoulder bag",
    description:
      "Hand-burnished chestnut leather crossbody adorned with antique brass rivets and adjustable shoulder strap for effortless everyday character.",
    price: 195,
    originalPrice: 230,
    discountPercent: 15,
    rating: 4.6,
    categoryHandle: "crossbody",
    collectionHandles: ["casual"],
    images: ["http://localhost:8000/bags/bag-06-leather-collection.jpg"],
    colors: ["Brown", "Cognac"],
    sizes: ["Small", "Medium"],
  },

  // --- Extended Backpacks ---
  {
    handle: "heather-grey-commuter-pack",
    title: "Heather Grey Commuter Backpack",
    subtitle: "Compact minimalist studio backpack",
    description:
      "Lightweight water-repellent woven heather grey pack with top twin snap handles, front zip sleeve, and side quick-access pockets.",
    price: 125,
    rating: 4.5,
    categoryHandle: "backpacks",
    collectionHandles: ["casual", "gym"],
    images: ["http://localhost:8000/bags/bag-12-travel-backpack.jpg"],
    colors: ["Grey", "Charcoal", "Black"],
    sizes: ["Compact", "Medium"],
  },

  // --- Extended Travel & Work Bags ---
  {
    handle: "technical-matte-gym-duffel",
    title: "Matte Technical Gym Duffel",
    subtitle: "Waterproof ballistic athletic duffel",
    description:
      "Sleek all-black ballistic nylon gym and overnight duffel featuring coated waterproof zippers, ventilated side pocket, and padded strap.",
    price: 160,
    originalPrice: 190,
    discountPercent: 15,
    rating: 4.8,
    categoryHandle: "travel-bags",
    collectionHandles: ["gym", "casual"],
    images: ["http://localhost:8000/bags/bag-gym-duffel.jpg"],
    colors: ["Black", "Charcoal"],
    sizes: ["Medium", "Large"],
  },
  {
    handle: "stone-cabin-carryon-spinner",
    title: "Stone Cabin Carry-On Spinner",
    subtitle: "Leather-trimmed minimalist cabin case",
    description:
      "Polycarbonate matte stone-beige carry-on suitcase finished with full-grain black leather handles, front quick-access pocket, and silent 360° wheels.",
    price: 340,
    rating: 4.9,
    categoryHandle: "travel-bags",
    collectionHandles: ["formal", "casual"],
    images: ["http://localhost:8000/bags/bag-hardshell-carryon.jpg"],
    colors: ["Cream", "Grey", "Black"],
    sizes: ["Weekender"],
  },
  {
    handle: "executive-navy-attache",
    title: "Executive Navy Leather Briefcase",
    subtitle: "Italian pebble-grain document case",
    description:
      "Tailored navy full-grain leather attaché briefcase featuring a brushed chrome key-lock clasp, slim document gusset, and shoulder strap.",
    price: 360,
    originalPrice: 420,
    discountPercent: 15,
    rating: 4.9,
    categoryHandle: "travel-bags",
    collectionHandles: ["formal"],
    images: ["http://localhost:8000/bags/bag-20-exec-briefcase.jpg"],
    colors: ["Navy", "Black", "Espresso"],
    sizes: ["Medium", "Large"],
  },
]

export default async function seedData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  logger.info("Starting Dilwale Bags catalog seed script...")

  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const { data: stores } = await query.graph({
    entity: "store",
    fields: ["id", "supported_currencies.currency_code"],
  })
  const { data: stockLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id"],
  })

  const salesChannel = salesChannels[0]
  const shippingProfile = shippingProfiles[0]
  const stockLocation = stockLocations[0]

  if (!salesChannel || !shippingProfile || !stockLocation) {
    throw new Error(
      "Missing prerequisite sales channel, shipping profile, or stock location."
    )
  }

  const currencyCodes: string[] = (stores[0]?.supported_currencies ?? [])
    .map((c) => c?.currency_code)
    .filter((code): code is string => Boolean(code))

  const supportedCurrencies =
    currencyCodes.length > 0 ? currencyCodes : ["usd", "eur"]

  // Ensure Bag Categories Exist
  const { data: existingCategories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle"],
  })

  const existingCategoryHandles = new Set(
    existingCategories.map((c) => c.handle)
  )
  const missingCategories = CATEGORIES_TO_ENSURE.filter(
    (c) => !existingCategoryHandles.has(c.handle)
  )

  if (missingCategories.length > 0) {
    await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: missingCategories.map((c) => ({
          name: c.name,
          handle: c.handle,
          is_active: true,
        })),
      },
    })
  }

  const { data: allCategories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle"],
  })
  const categoryMap = new Map<string, string>()
  for (const cat of allCategories) {
    if (cat.handle) categoryMap.set(cat.handle, cat.id as string)
    if (cat.name) categoryMap.set(cat.name.toLowerCase(), cat.id as string)
  }

  // Ensure Collections Exist
  const { data: existingCollections } = await query.graph({
    entity: "product_collection",
    fields: ["id", "title", "handle"],
  })

  const existingCollectionHandles = new Set(
    existingCollections.map((c) => c.handle)
  )
  const missingCollections = COLLECTIONS_TO_ENSURE.filter(
    (c) => !existingCollectionHandles.has(c.handle)
  )

  if (missingCollections.length > 0) {
    await createCollectionsWorkflow(container).run({
      input: {
        collections: missingCollections.map((c) => ({
          title: c.title,
          handle: c.handle,
        })),
      },
    })
  }

  const { data: allCollections } = await query.graph({
    entity: "product_collection",
    fields: ["id", "title", "handle"],
  })
  const collectionMap = new Map<string, string>()
  for (const col of allCollections) {
    if (col.handle) collectionMap.set(col.handle, col.id as string)
  }

  // Remove all existing non-bag / previous products so the store is 100% Dilwale Bags
  const { data: allExistingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle"],
  })

  const idsToDelete = allExistingProducts
    .map((p) => p.id as string)
    .filter(Boolean)

  if (idsToDelete.length > 0) {
    logger.info(
      `Removing ${idsToDelete.length} previous products before seeding Dilwale Bags catalog...`
    )
    try {
      await deleteProductsWorkflow(container).run({
        input: { ids: idsToDelete },
      })
    } catch (err: any) {
      logger.warn(`Could not delete some products: ${err.message}`)
    }
  }

  const storefrontBaseUrl =
    process.env.STOREFRONT_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.STORE_CORS
      ? process.env.STORE_CORS.split(",")[0].trim()
      : "http://localhost:8000")

  const productsPayload = MOCK_PRODUCTS.map((prod) => {
    const colors = prod.colors || DEFAULT_COLORS
    const catId = categoryMap.get(prod.categoryHandle)
    const colId = prod.collectionHandles[0]
      ? collectionMap.get(prod.collectionHandles[0])
      : undefined

    const variants: Record<string, any>[] = colors.map((color) => {
      const sku = `${prod.handle.toUpperCase()}-${color.substring(0, 3).toUpperCase()}`
      const prices = supportedCurrencies.map((currency_code) => {
        const rate = currency_code.toLowerCase() === "eur" ? 0.92 : 1.0
        return {
          amount: Math.round(prod.price * rate),
          currency_code: currency_code.toLowerCase(),
        }
      })

      return {
        title: color,
        sku,
        options: {
          Color: color,
        },
        prices,
        manage_inventory: true,
        allow_backorder: true,
      }
    })

    const metadata: Record<string, any> = {
      rating: prod.rating,
    }
    if (prod.originalPrice) {
      metadata.original_price = prod.originalPrice
    }
    if (prod.discountPercent) {
      metadata.discount_percent = prod.discountPercent
    }

    const resolvedImages = prod.images.map((url) =>
      url.replace("http://localhost:8000", storefrontBaseUrl)
    )

    return {
      title: prod.title,
      handle: prod.handle,
      subtitle: prod.subtitle,
      description: prod.description,
      status: ProductStatus.PUBLISHED,
      is_giftcard: false,
      thumbnail: resolvedImages[0],
      images: resolvedImages.map((url) => ({ url })),
      shipping_profile_id: shippingProfile.id,
      sales_channels: [{ id: salesChannel.id }],
      collection_id: colId,
      category_ids: catId ? [catId] : [],
      metadata,
      options: [{ title: "Color", values: colors }],
      variants,
    }
  })

  const BATCH_SIZE = 8
  let createdCount = 0

  for (let i = 0; i < productsPayload.length; i += BATCH_SIZE) {
    const batch = productsPayload.slice(i, i + BATCH_SIZE)
    await createProductsWorkflow(container).run({
      input: { products: batch as any },
    })
    createdCount += batch.length
    logger.info(
      `Seeded ${createdCount}/${productsPayload.length} Dilwale Bags products...`
    )
  }

  const { data: allInventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "location_levels.location_id"],
  })

  const itemsNeedingLevels = allInventoryItems.filter(
    (item) =>
      !item.location_levels?.some(
        (lvl: any) => lvl.location_id === stockLocation.id
      )
  )

  if (itemsNeedingLevels.length > 0) {
    const inventoryLevels = itemsNeedingLevels.map((item) => ({
      location_id: stockLocation.id,
      stocked_quantity: 10000,
      inventory_item_id: item.id as string,
    }))

    for (let i = 0; i < inventoryLevels.length; i += 100) {
      const chunk = inventoryLevels.slice(i, i + 100)
      await createInventoryLevelsWorkflow(container).run({
        input: { inventory_levels: chunk },
      })
    }
    logger.info(
      `Assigned 10,000 units of inventory to ${itemsNeedingLevels.length} items.`
    )
  }

  try {
    const search = container.resolve(Modules.SEARCH)
    const { data: finalProducts } = await query.graph({
      entity: "product",
      fields: ["id"],
    })

    for (let i = 0; i < finalProducts.length; i += 25) {
      const chunk = finalProducts.slice(i, i + 25)
      await search.ingest({
        name: "product.created",
        data: chunk.map((p) => ({ id: p.id })),
      } as never)
    }
    logger.info(
      `Search index synchronized for ${finalProducts.length} product(s).`
    )
  } catch (err: any) {
    logger.warn(`Search sync note: ${err.message}`)
  }

  logger.info("Dilwale Bags mock data seed completed successfully!")
}
