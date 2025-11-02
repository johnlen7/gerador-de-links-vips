'use client';

import { useCart } from '@/lib/cart-context';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default function Cart() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="bg-primary-500 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Seu Carrinho</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-2xl hover:text-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-lg">Seu carrinho está vazio</p>
              <p className="text-sm mt-2">Adicione deliciosas batatas!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4"
                >
                  <div className="text-4xl">🥔</div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-primary-600 font-bold mb-2">
                      {formatCurrency(item.product.price)}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition font-bold"
                      >
                        −
                      </button>
                      <span className="font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto text-red-500 hover:text-red-700 transition text-sm font-semibold"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      {formatCurrency(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">{formatCurrency(cart.subtotal)}</span>
            </div>
            
            {cart.deliveryFee > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Taxa de entrega</span>
                <span className="font-semibold">{formatCurrency(cart.deliveryFee)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
              <span>Total</span>
              <span className="text-primary-600">{formatCurrency(cart.total)}</span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full bg-secondary-500 text-white text-center py-3 rounded-lg hover:bg-secondary-600 transition font-bold text-lg"
            >
              Finalizar Pedido
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
