'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const { cart, setIsCartOpen } = useCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl">🥔</div>
            <div>
              <h1 className="text-2xl font-bold text-primary-600">BatataFood</h1>
              <p className="text-xs text-gray-500">Delivery de Batatas</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              Início
            </Link>
            <Link href="/restaurantes" className="text-gray-700 hover:text-primary-600 transition">
              Restaurantes
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-primary-600 transition">
              Sobre
            </Link>
          </nav>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition flex items-center space-x-2"
          >
            <span className="text-xl">🛒</span>
            <span className="font-semibold">Carrinho</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
