export interface CheckoutAddress {
  given_name: string
  family_name: string
  email: string
  street_address: string
  postal_code: string
  city: string
  phone: string
  country: string
}

export interface CheckoutOrderLine {
  type: string
  reference: string
  name: string
  quantity: number
  quantity_unit: string
  unit_price: number
  tax_rate: number
  total_amount: number
  total_discount_amount: number
  total_tax_amount: number
  image_url: string
}

export interface CheckoutMerchantUrls {
  terms: string
  checkout: string
  confirmation: string
  push: string
}

export interface CheckoutShippingOption {
  id: string
  name: string
  description: string
  price: number
  tax_amount: number
  tax_rate: number
  preselected: boolean
  shipping_method: string
  delivery_details: any
}
