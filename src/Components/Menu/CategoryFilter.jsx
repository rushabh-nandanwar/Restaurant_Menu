import React from 'react';

const categoryImages = {
    'All': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    'Papad': 'https://images.unsplash.com/photo-1601050638917-380d3885f81e?w=400&h=300&fit=crop',
    'Roti': 'https://images.unsplash.com/photo-1589135398302-388cd35113d1?w=400&h=300&fit=crop',
    'Rice': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
    'Thali': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    'Veg Main': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    'Paneer': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    'Dal': 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&h=300&fit=crop',
    'Chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    'Eggs': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop'
};

const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
    return (
        <div className="w-full md:flex-1 md:min-w-0 z-20 overflow-hidden">
            {/* Scrollable Pill Filter (Mobile & Tablet) */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 items-center">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`
                            shrink-0 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer border
                            ${activeCategory === category
                                ? 'bg-linear-to-r from-orange-500 to-red-600 text-white border-transparent shadow-lg shadow-orange-500/30 scale-105'
                                : 'bg-white/5 text-zinc-500 border-white/10 hover:bg-white/10 hover:text-white'
                            }
                        `}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
