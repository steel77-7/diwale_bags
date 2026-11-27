import { Dialog, Transition } from "@headlessui/react"
import { clx } from "@modules/common/components/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-50", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="bg-white/95 backdrop-blur-md flex flex-col gap-y-2.5 justify-center px-4 py-3 w-full border-t border-black/10 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
            data-testid="mobile-actions"
          >
            <div className="flex items-center justify-between gap-3 text-sm">
              <span
                data-testid="mobile-title"
                className="font-semibold text-black truncate"
              >
                {product.title}
              </span>
              {selectedPrice && (
                <div className="flex items-center gap-1.5 shrink-0">
                  {selectedPrice.price_type === "sale" && (
                    <span className="line-through text-xs text-black/40">
                      {selectedPrice.original_price}
                    </span>
                  )}
                  <span className="font-bold text-black">
                    {selectedPrice.calculated_price}
                  </span>
                </div>
              )}
            </div>
            <div
              className={clx("grid grid-cols-2 w-full gap-2.5", {
                "!grid-cols-1": isSimple,
              })}
            >
              {!isSimple && (
                <button
                  type="button"
                  onClick={open}
                  className="w-full h-11 px-4 rounded-full bg-[#F0F0F0] hover:bg-neutral-200 text-black text-xs font-medium flex items-center justify-between gap-2 transition-colors"
                  data-testid="mobile-actions-button"
                >
                  <span className="truncate">
                    {variant
                      ? Object.values(options).join(" / ")
                      : "Select Options"}
                  </span>
                  <ChevronDown />
                </button>
              )}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock || !variant || isAdding}
                className={clx(
                  "w-full h-11 px-5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors",
                  { "opacity-50 cursor-not-allowed": !inStock || !variant }
                )}
                data-testid="mobile-cart-button"
              >
                {isAdding
                  ? "Adding..."
                  : !variant
                  ? "Select variant"
                  : !inStock
                  ? "Out of stock"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[80]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/45 backdrop-blur-xs" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-end justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-6"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-6"
              >
                <Dialog.Panel
                  className="w-full transform overflow-hidden text-left flex flex-col gap-y-3"
                  data-testid="mobile-actions-modal"
                >
                  <div className="bg-white rounded-t-[24px] px-6 pt-5 pb-10 shadow-2xl">
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/10">
                      <span className="font-bold text-lg text-black">Select Options</span>
                      <button
                        type="button"
                        onClick={close}
                        className="bg-[#F0F0F0] w-9 h-9 rounded-full text-black flex justify-center items-center"
                        data-testid="close-modal-button"
                        aria-label="Close"
                      >
                        <X />
                      </button>
                    </div>
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-6">
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title ?? ""}
                                name={`mobile-options[${option.id}]`}
                                disabled={optionsDisabled}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
