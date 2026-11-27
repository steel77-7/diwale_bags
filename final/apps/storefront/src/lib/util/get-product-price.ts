import { HttpTypes } from "@medusajs/types"
import { getPercentageDiff } from "./get-percentage-diff"
import { convertToLocale } from "./money"

type VariantWithPrice = HttpTypes.StoreProductVariant & {
  calculated_price?: {
    calculated_amount: number
    original_amount: number
    currency_code: string
    calculated_price: {
      price_list_type: string
    }
  }
}

export const getPricesForVariant = (variant: VariantWithPrice) => {
  if (!variant?.calculated_price?.calculated_amount) {
    return null
  }

  return {
    calculated_price_number: variant.calculated_price.calculated_amount,
    calculated_price: convertToLocale({
      amount: variant.calculated_price.calculated_amount,
      currency_code: variant.calculated_price.currency_code,
    }),
    original_price_number: variant.calculated_price.original_amount,
    original_price: convertToLocale({
      amount: variant.calculated_price.original_amount,
      currency_code: variant.calculated_price.currency_code,
    }),
    currency_code: variant.calculated_price.currency_code,
    price_type: variant.calculated_price.calculated_price.price_list_type,
    percentage_diff: getPercentageDiff(
      variant.calculated_price.original_amount,
      variant.calculated_price.calculated_amount
    ),
  }
}

export function getProductPrice({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct
  variantId?: string
}) {
  if (!product || !product.id) {
    throw new Error("No product provided")
  }

  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      return null
    }

    const cheapestVariant = (product.variants as VariantWithPrice[])
      .filter((v) => !!v.calculated_price)
      .sort((a, b) => {
        return (
          (a.calculated_price?.calculated_amount ?? 0) -
          (b.calculated_price?.calculated_amount ?? 0)
        )
      })[0]

    return getPricesForVariant(cheapestVariant)
  }

  const variantPrice = () => {
    if (!product || !variantId) {
      return null
    }

    const variant = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId
    ) as VariantWithPrice | undefined

    if (!variant) {
      return null
    }

    return getPricesForVariant(variant)
  }

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  }
}

/** Formats original strike-through price in the active variant currency to avoid mixed-currency display. */
export function getDisplayDiscount(
  product: HttpTypes.StoreProduct,
  selectedPrice: ReturnType<typeof getPricesForVariant>
): { originalPrice: string | null; discountPercent: string | null } {
  const meta = (product.metadata || {}) as Record<string, any>

  if (selectedPrice?.price_type === "sale") {
    return {
      originalPrice: selectedPrice.original_price,
      discountPercent: selectedPrice.percentage_diff ? `-${selectedPrice.percentage_diff}%` : null,
    }
  }

  const discountPercent = meta.discount_percent ? `-${meta.discount_percent}%` : null
  if (!meta.original_price) {
    return { originalPrice: null, discountPercent }
  }

  if (!selectedPrice?.currency_code) {
    return { originalPrice: `$${meta.original_price}`, discountPercent }
  }

  const amount =
    selectedPrice.currency_code.toLowerCase() === "usd" || !meta.discount_percent
      ? Number(meta.original_price)
      : Math.round(
          selectedPrice.calculated_price_number / (1 - Number(meta.discount_percent) / 100)
        )

  return {
    originalPrice: convertToLocale({
      amount,
      currency_code: selectedPrice.currency_code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
    discountPercent,
  }
}
