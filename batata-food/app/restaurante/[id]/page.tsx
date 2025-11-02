'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { restaurants } from '@/data/restaurants';
import { products } from '@/data/products';
import { formatCurrency, formatTime } from '@/lib/utils';
import { PotatoCategory } from '@/lib/types';

export default function RestaurantPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<PotatoCategory | 'all'>('all');

  const restaurant = restaurants.find((r) => r.id === params.id);
  const restaurantProducts = products.filter((p) => p.restaurantId === params.id);

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">😢</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Restaurante não encontrado
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

  const filteredProducts = restaurantProducts.filter((product) => {
    return selectedCategory === 'all' || product.category === selectedCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="text-primary-600 hover:text-primary-700 font-semibold mb-6 flex items-center space-x-2"
      >
        <span>←</span>
        <span>Voltar</span>
      </button>

      {/* Restaurant Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="h-48 bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center">
          <div className="text-8xl">🏪</div>
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {restaurant.name}
          </h1>
          <p className="text-gray-600 mb-4">{restaurant.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">⭐</div>
              <div className="font-bold text-gray-800">{restaurant.rating}</div>
              <div className="text-xs text-gray-500">{restaurant.reviewCount} avaliações</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="font-bold text-gray-800">{formatTime(restaurant.deliveryTime)}</div>
              <div className="text-xs text-gray-500">Tempo de entrega</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">🚚</div>
              <div className="font-bold text-gray-800">{formatCurrency(restaurant.deliveryFee)}</div>
              <div className="text-xs text-gray-500">Taxa de entrega</div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">💰</div>
              <div className="font-bold text-gray-800">{formatCurrency(restaurant.minimumOrder)}</div>
              <div className="text-xs text-gray-500">Pedido mínimo</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              restaurant.isOpen
                ? 'bg-secondary-100 text-secondary-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {restaurant.isOpen ? '🟢 Aberto' : '🔴 Fechado'}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={restaurant.categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Products */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Cardápio
        </h2>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-xl text-gray-600">
              Nenhum produto encontrado nesta categoria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
