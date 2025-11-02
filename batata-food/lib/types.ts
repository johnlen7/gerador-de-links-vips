export type PotatoCategory = 
  | 'frita'
  | 'assada'
  | 'doce'
  | 'rosti'
  | 'gratinada'
  | 'hasselback'
  | 'pure'
  | 'croquete';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: PotatoCategory;
  image: string;
  restaurantId: string;
  preparationTime: number; // em minutos
  rating: number;
  reviewCount: number;
  available: boolean;
  options?: ProductOption[];
}

export interface ProductOption {
  id: string;
  name: string;
  choices: {
    id: string;
    name: string;
    price: number;
  }[];
  required: boolean;
  maxChoices: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: number; // em minutos
  deliveryFee: number;
  minimumOrder: number;
  categories: PotatoCategory[];
  isOpen: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: {
    optionId: string;
    choiceId: string;
  }[];
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  restaurant?: Restaurant;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  restaurant: Restaurant;
  address: Address;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  estimatedDelivery: Date;
  paymentMethod: PaymentMethod;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'delivering'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 
  | 'credit_card'
  | 'debit_card'
  | 'pix'
  | 'cash';
