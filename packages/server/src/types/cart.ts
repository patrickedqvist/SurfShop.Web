export interface CartItem {
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
  items: CartItem[]
  totalAmount: number
  totalTaxAmount: number
  totalDiscountAmount: number
}
