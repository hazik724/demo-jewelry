export interface Product {
  title: string
  slug: {
    current: string
  }
  images?: {
    asset?: {
      url?: string
    }
  }[]
  price: number
  discountPrice?: number
}
