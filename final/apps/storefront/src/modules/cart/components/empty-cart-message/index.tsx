import { Heading, Text } from "@modules/common/components/ui"
import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-32 px-4 flex flex-col justify-center items-center text-center max-w-lg mx-auto"
      data-testid="empty-cart-message"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ui-fg-subtle mb-3">
        Dilwale Bags / Collection
      </span>
      <Heading
        level="h1"
        className="text-3xl sm:text-4xl font-medium tracking-tight text-ui-fg-base mb-4"
      >
        Your Shopping Bag is Empty
      </Heading>
      <Text className="text-sm text-ui-fg-subtle leading-relaxed mb-8">
        You have not added any bags to your cart yet. Explore our signature leather
        totes, structured handbags, and everyday travel carry to begin.
      </Text>
      <div>
        <InteractiveLink href="/store">Explore collection</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
