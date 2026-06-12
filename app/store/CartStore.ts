"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  _id: string
  title: string
  slug: string
  image: string
  price: number
  size?: string
  color?: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean

  addItem: (item: CartItem) => void
  removeItem: (id: string, size?: string, color?: string) => void
  increaseQty: (id: string, size?: string, color?: string) => void
  decreaseQty: (id: string, size?: string, color?: string) => void
  clearCart: () => void

  openCart: () => void
  closeCart: () => void

  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      /* =======================
         ADD ITEM (Variant Safe)
      ======================== */
      addItem: (item) => {
        const existing = get().items.find(
          (i) =>
            i._id === item._id &&
            i.size === item.size &&
            i.color === item.color
        )

        if (existing) {
          set({
            items: get().items.map((i) =>
              i._id === item._id &&
              i.size === item.size &&
              i.color === item.color
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({
            items: [...get().items, { ...item, quantity: 1 }],
          })
        }

        set({ isOpen: true }) // auto open drawer
      },

      /* =======================
         REMOVE ITEM
      ======================== */
      removeItem: (id, size, color) =>
        set({
          items: get().items.filter(
            (i) =>
              !(
                i._id === id &&
                i.size === size &&
                i.color === color
              )
          ),
        }),

      /* =======================
         INCREASE
      ======================== */
      increaseQty: (id, size, color) =>
        set({
          items: get().items.map((i) =>
            i._id === id &&
            i.size === size &&
            i.color === color
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }),

      /* =======================
         DECREASE
      ======================== */
      decreaseQty: (id, size, color) =>
        set({
          items: get()
            .items.map((i) =>
              i._id === id &&
              i.size === size &&
              i.color === color
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        }),

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      getTotalItems: () =>
        get().items.reduce(
          (total, item) => total + item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items, // persist only items (not isOpen)
      }),
    }
  )
)