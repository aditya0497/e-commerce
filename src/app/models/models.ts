export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DiscountCode {
  code: string;
  discountPercentage: number;
}

export interface OrderSummary {
  totalItems: number;
  totalAmount: number;
  discountCodes: DiscountCode[];
  totalDiscount: number;
}
