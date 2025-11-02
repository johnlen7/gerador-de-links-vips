'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartItem, Product, Restaurant } from './types';
import { calculateCartTotal } from './utils';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number, selectedOptions?: any[]) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setRestaurant: (restaurant: Restaurant) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('batata-food-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('batata-food-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number, selectedOptions?: any[]) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.product.id === product.id
      );

      let newItems: CartItem[];
      
      if (existingItemIndex > -1) {
        // Atualizar quantidade do item existente
        newItems = [...prevCart.items];
        newItems[existingItemIndex].quantity += quantity;
        newItems[existingItemIndex].subtotal = 
          newItems[existingItemIndex].quantity * product.price;
      } else {
        // Adicionar novo item
        const newItem: CartItem = {
          product,
          quantity,
          selectedOptions,
          subtotal: product.price * quantity,
        };
        newItems = [...prevCart.items, newItem];
      }

      const subtotal = calculateCartTotal(newItems);
      const deliveryFee = prevCart.restaurant?.deliveryFee || 0;
      
      return {
        ...prevCart,
        items: newItems,
        subtotal,
        total: subtotal + deliveryFee,
      };
    });
    
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.product.id !== productId);
      const subtotal = calculateCartTotal(newItems);
      const deliveryFee = prevCart.restaurant?.deliveryFee || 0;
      
      return {
        ...prevCart,
        items: newItems,
        subtotal,
        total: subtotal + deliveryFee,
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity,
            subtotal: item.product.price * quantity,
          };
        }
        return item;
      });

      const subtotal = calculateCartTotal(newItems);
      const deliveryFee = prevCart.restaurant?.deliveryFee || 0;
      
      return {
        ...prevCart,
        items: newItems,
        subtotal,
        total: subtotal + deliveryFee,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      deliveryFee: 0,
      total: 0,
    });
  };

  const setRestaurant = (restaurant: Restaurant) => {
    setCart((prevCart) => {
      const deliveryFee = restaurant.deliveryFee;
      return {
        ...prevCart,
        restaurant,
        deliveryFee,
        total: prevCart.subtotal + deliveryFee,
      };
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setRestaurant,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
