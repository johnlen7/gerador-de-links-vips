'use client';

import { PotatoCategory } from '@/lib/types';
import { getCategoryName } from '@/lib/utils';

interface CategoryFilterProps {
  categories: PotatoCategory[];
  selectedCategory: PotatoCategory | 'all';
  onSelectCategory: (category: PotatoCategory | 'all') => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="font-bold text-gray-800 mb-3">Categorias</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            selectedCategory === 'all'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getCategoryName(category)}
          </button>
        ))}
      </div>
    </div>
  );
}
