// Single source of truth for shipping fees and payment amounts (PKR).
// Used by the cart page, the checkout page and the /api/order route.
// Change a fee here and all three update together.

export const SHIPPING_FEE = {
  cod: 400, // Cash on Delivery
  advance: 250, // Advance Payment (discounted shipping)
} as const

export type PaymentMethod = keyof typeof SHIPPING_FEE

export const SHIPPING_SAVING = SHIPPING_FEE.cod - SHIPPING_FEE.advance

/**
 * How an order is paid:
 *  - cod:     nothing now. Product price + COD shipping on delivery.
 *  - advance: product price now (bank / JazzCash). Only shipping on delivery.
 */
export function getPaymentBreakdown(subtotal: number, method: PaymentMethod) {
  const shippingFee = SHIPPING_FEE[method]
  const total = subtotal + shippingFee

  if (method === "advance") {
    return { shippingFee, total, payNow: subtotal, dueOnDelivery: shippingFee }
  }
  return { shippingFee, total, payNow: 0, dueOnDelivery: total }
}