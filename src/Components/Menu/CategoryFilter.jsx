import React from 'react';

// Category images mapping
const categoryImages = {
    'All': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    'Burgers': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    'Salads': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    'Bowls': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    'Pizza': 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
    'Drinks': 'https://images.unsplash.com/photo-1515825838458-f2a94b20105a?w=400&h=300&fit=crop',
    'Desserts': 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    'Mains': 'https://images.unsplash.com/photo-1512838243191-e6253434dee3?w=400&h=300&fit=crop'
};

const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
    return (
        <div className="w-full md:w-auto z-20">
            {/* Mobile Horizontal Slider */}
            <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex gap-3 pb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={`
                shrink-0 relative overflow-hidden mt-3 rounded-2xl transition-all duration-300 cursor-pointer
                ${activeCategory === category
                                    ? 'ring-2 ring-orange-500 scale-105'
                                    : 'ring-1 ring-white/10'
                                }
              `}
                        >
                            <div className="relative w-24 h-24">
                                <img
                                    src={categoryImages[category] || categoryImages['All']}
                                    alt={category}
                                    className="w-full h-full object-cover"
                                />
                                <div className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-2 ${activeCategory === category ? 'bg-orange-500/20' : ''
                                    }`}>
                                    <span className={`text-xs font-bold text-white drop-shadow-lg ${activeCategory === category ? 'text-orange-300' : ''
                                        }`}>
                                        {category}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex gap-3 overflow-x-auto pb-4 scrollbar-hide mask-linear-fade">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`
              px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer border
              ${activeCategory === category
                                ? 'bg-linear-to-r from-orange-500 to-red-600 text-white border-transparent shadow-lg shadow-orange-500/30 scale-105'
                                : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
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
