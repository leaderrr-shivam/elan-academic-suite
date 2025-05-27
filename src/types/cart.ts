
export interface CartItem {
  id: string;
  product_name: string;
  price: number;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: string, price: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getItemCount: () => number;
}
