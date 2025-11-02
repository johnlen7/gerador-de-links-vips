'use client';

import { Restaurant } from '@/lib/types';
import { formatCurrency, formatTime, getCategoryName } from '@/lib/utils';
import Link from 'next/link';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurante/${restaurant.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="relative h-40 bg-gradient-to-br from-primary-200 to-secondary-200">
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            🏪
          </div>
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Fechado</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-xl text-gray-800 mb-2">
            {restaurant.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {restaurant.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <span>⭐</span>
              <span className="font-semibold">{restaurant.rating}</span>
              <span>({restaurant.reviewCount})</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⏱️</span>
              <span>{formatTime(restaurant.deliveryTime)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-gray-600">
              Entrega: <span className="font-semibold text-primary-600">
                {formatCurrency(restaurant.deliveryFee)}
              </span>
            </span>
            <span className="text-gray-600">
              Mín: <span className="font-semibold">
                {formatCurrency(restaurant.minimumOrder)}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {restaurant.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
              >
                {getCategoryName(category)}
              </span>
            ))}
            {restaurant.categories.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{restaurant.categories.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
