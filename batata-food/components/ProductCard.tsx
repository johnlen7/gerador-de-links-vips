'use client';

import { Product } from '@/lib/types';
import { formatCurrency, formatTime } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Link href={`/produto/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200">
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            🥔
          </div>
          {!product.available && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Indisponível</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <span>⭐</span>
              <span className="font-semibold">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⏱️</span>
              <span>{formatTime(product.preparationTime)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-600">
              {formatCurrency(product.price)}
            </span>
            
            {product.available && (
              <button
                onClick={handleAddToCart}
                className="bg-secondary-500 text-white px-4 py-2 rounded-full hover:bg-secondary-600 transition font-semibold text-sm"
              >
                Adicionar
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
