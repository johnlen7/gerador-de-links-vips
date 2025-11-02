'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { products } from '@/data/products';
import { restaurants } from '@/data/restaurants';
import { formatCurrency, formatTime } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === params.id);
  const restaurant = product ? restaurants.find((r) => r.id === product.restaurantId) : null;

  if (!product || !restaurant) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">😢</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Produto não encontrado
        </h1>
        <button
          onClick={() => router.push('/')}
          className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition"
        >
          Voltar para o início
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="text-primary-600 hover:text-primary-700 font-semibold mb-6 flex items-center space-x-2"
      >
        <span>←</span>
        <span>Voltar</span>
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl aspect-square flex items-center justify-center">
          <div className="text-9xl">🥔</div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1 text-gray-600">
              <span>⭐</span>
              <span className="font-semibold">{product.rating}</span>
              <span>({product.reviewCount} avaliações)</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <span>⏱️</span>
              <span>{formatTime(product.preparationTime)}</span>
            </div>
          </div>

          <p className="text-gray-600 text-lg mb-6">
            {product.description}
          </p>

          {/* Restaurant Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              Vendido por: {restaurant.name}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span>⭐</span>
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⏱️</span>
                <span>{formatTime(restaurant.deliveryTime)}</span>
              </div>
              <div>
                Entrega: {formatCurrency(restaurant.deliveryFee)}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-primary-600 mb-6">
            {formatCurrency(product.price)}
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Quantidade
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 transition font-bold text-xl"
              >
                −
              </button>
              <span className="text-2xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 transition font-bold text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.available}
            className={`w-full py-4 rounded-lg font-bold text-lg transition ${
              product.available
                ? 'bg-secondary-500 text-white hover:bg-secondary-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.available ? (
              <>Adicionar ao Carrinho - {formatCurrency(product.price * quantity)}</>
            ) : (
              'Produto Indisponível'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
