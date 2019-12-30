export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  unitDiscountPrice: number;
  taxRate: number;
  totalAmount: number;
  totalDiscountAmount: number;
  totalTaxAmount: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalTaxAmount: number;
  totalDiscountAmount: number;
}
