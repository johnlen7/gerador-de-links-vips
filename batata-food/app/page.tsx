'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import RestaurantCard from '@/components/RestaurantCard';
import CategoryFilter from '@/components/CategoryFilter';
import { products } from '@/data/products';
import { restaurants } from '@/data/restaurants';
import { PotatoCategory } from '@/lib/types';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<PotatoCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: PotatoCategory[] = [
    'frita',
    'assada',
    'doce',
    'rosti',
    'gratinada',
    'hasselback',
    'pure',
    'croquete',
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl p-8 md:p-12 mb-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🥔 Batatas Deliciosas na Sua Casa!
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Fritas, assadas, doces e muito mais. Delivery rápido e quentinho!
          </p>
          <div className="flex flex-wrap gap-4 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Entrega rápida</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌟</span>
              <span>Qualidade garantida</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💳</span>
              <span>Vários meios de pagamento</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar batatas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg"
        />
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Restaurants Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Restaurantes Parceiros
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {selectedCategory === 'all' ? 'Todos os Produtos' : `Batatas ${selectedCategory}`}
        </h2>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-xl text-gray-600">
              Nenhum produto encontrado
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
