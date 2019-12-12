export interface CartProduct {
  id: string
  name: string
  quantity: number
  unitPrice: number
  unitDiscountPrice: number
  taxRate: number
  totalAmount: number
  totalDiscountAmount: number
  totalTaxAmount: number
}

export interface Cart {
  items: CartProduct[] | []
  totalAmount: number
  totalTaxAmount: number
  totalDiscountAmount: number
}
