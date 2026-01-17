import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { menuItems } from '../../data/menuItems';
import MenuItem from './MenuItem';
import CategoryFilter from './CategoryFilter';
import CartList from './CartList';
import { Search, UtensilsCrossed } from 'lucide-react';

const Menu = () => {
    const [view, setView] = useState('landing'); // 'landing', 'categories', 'items'
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { cart, addToCart, updateQuantity, removeItem, clearCart } = useCart();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.view) {
            setView(location.state.view);
            if (location.state.category) {
                setActiveCategory(location.state.category);
            }
        }
    }, [location]);

    const categories = ['All', ...new Set(menuItems.map(item => item.category))];

    // Category images for the grid
    const categoryDetails = {
        'All': { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', desc: 'Explore our complete tradition' },
        'Papad': { img: 'https://images.unsplash.com/photo-1601050638917-380d3885f81e?w=800&q=80', desc: 'Crispy starters to begin your journey' },
        'Roti': { img: 'https://images.unsplash.com/photo-1589135398302-388cd35113d1?w=800&q=80', desc: 'Freshly baked traditional breads' },
        'Rice': { img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80', desc: 'Fragrant long-grain specialties' },
        'Thali': { img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80', desc: 'Complete traditional meal experience' },
        'Veg Main': { img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', desc: 'Hearty vegetarian delights' },
        'Paneer': { img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80', desc: 'Rich and creamy cottage cheese' },
        'Dal': { img: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&q=80', desc: 'Spiced lentils slow-cooked to perfection' },
        'Chicken': { img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80', desc: 'Authentic Saoji chicken curries' },
        'Eggs': { img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80', desc: 'Protein-packed egg specialties' }
    };

    const filteredItems = useMemo(() => {
        return menuItems.filter(item => {
            const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const handleCategorySelect = (cat) => {
        setActiveCategory(cat);
        setView('items');
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500/30 overflow-x-hidden relative">
            {/* Global Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] md:w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[70%] md:w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            {/* Landing View */}
            {view === 'landing' && (
                <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 scale-105 animate-pulse transition-all duration-10000" />
                        <div className="absolute inset-0 bg-linear-to-b from-zinc-950/40 via-zinc-950/80 to-zinc-950" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                        <div className="inline-flex items-center justify-center p-1 pr-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8 shadow-2xl animate-in fade-in zoom-in duration-700">
                            <div className="w-10 h-10 rounded-full mr-3 shadow-lg shadow-orange-500/30 overflow-hidden flex items-center justify-center bg-zinc-900 border border-white/10">
                                <img
                                    src="/NSB LOGO.png"
                                    alt="NSB Logo"
                                    className="w-full h-full object-cover scale-125"
                                />
                            </div>
                            <span className="text-zinc-300 font-bold tracking-widest text-xs uppercase">Est. 2008</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.95] animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            Nandu Saoji <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-red-500 to-purple-600 animate-gradient-x underline decoration-orange-500/20">Bhojnalaya</span>
                        </h1>

                        <p className="text-lg md:text-2xl text-zinc-400 max-w-xl mx-auto leading-relaxed font-light mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1200 delay-200">
                            ~ The authentic taste of Saoji tradition, crafted with heritage and passion since 2008.
                        </p>

                        <button
                            onClick={() => setView('categories')}
                            className="group relative px-8 md:px-12 py-4 md:py-5 bg-white text-zinc-950 rounded-full font-black text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-white/10 hover:shadow-orange-500/40 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Explore Menu</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Categories Grid View */}
            {view === 'categories' && (
                <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 animate-in fade-in slide-in-from-bottom-10 duration-700">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">Select Category</h2>
                        <div className="w-24 h-1.5 bg-linear-to-r from-orange-500 to-red-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                        {categories.map((cat, idx) => (
                            <div
                                key={cat}
                                onClick={() => handleCategorySelect(cat)}
                                className="group relative h-32 md:h-80 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <img
                                    src={categoryDetails[cat]?.img || categoryDetails['All'].img}
                                    alt={cat}
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80 md:opacity-90 group-hover:opacity-70 transition-opacity" />
                                <div className="absolute inset-0 p-3 md:p-8 flex flex-col justify-end">
                                    <h3 className="text-[10px] md:text-3xl font-black text-white mb-1 md:mb-2 group-hover:text-orange-500 transition-colors uppercase italic leading-tight">{cat}</h3>
                                    <p className="hidden md:block text-zinc-400 text-sm group-hover:text-zinc-200 transition-colors">
                                        {categoryDetails[cat]?.desc || 'Discover authentic flavors'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <button
                            onClick={() => setView('landing')}
                            className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 mx-auto font-bold uppercase tracking-widest text-xs"
                        >
                            ← Back to Home
                        </button>
                    </div>
                </div>
            )}

            {/* Items View (Previous Model Theme) */}
            {view === 'items' && (
                <div className="animate-in fade-in duration-500">
                    {/* Hero Mini Section - Optimized for Mobile */}
                    <div className="relative z-10 pt-12 md:pt-20 pb-8 md:pb-16 px-4 md:px-6">
                        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6 md:gap-10">
                            {/* Navigation and Search Controls */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                                <button
                                    onClick={() => setView('categories')}
                                    className="group inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-zinc-400 hover:text-white transition-all hover:bg-white/10 cursor-pointer shadow-xl self-start md:self-auto text-[10px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap"
                                >
                                    <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center">
                                        <img src="/NSB LOGO.png" alt="NSB" className="w-full h-full object-cover scale-250" />
                                    </div>
                                    <span>← Categories</span>
                                </button>

                                <div className="bg-white/5 backdrop-blur-2xl rounded-2xl md:rounded-4xl p-2 md:p-3 shadow-2xl border border-white/10 ring-1 ring-white/5 flex flex-col items-center w-full md:w-auto">
                                    <div className="relative w-full md:w-[280px] lg:w-64 xl:w-80 group mb-2 md:mb-0">
                                        <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-purple-600 rounded-full blur opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
                                        <div className="relative bg-zinc-950/40 rounded-full flex items-center border border-white/5 focus-within:border-orange-500/30 transition-colors">
                                            <Search className="ml-3 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={16} />
                                            <input
                                                type="text"
                                                placeholder="Search dishes..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-2 pr-4 py-2 bg-transparent rounded-full border-none focus:ring-0 outline-none text-white placeholder-zinc-600 text-[11px] md:text-xs font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <CategoryFilter
                                            categories={categories}
                                            activeCategory={activeCategory}
                                            onSelectCategory={setActiveCategory}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Category Title - Positioned below the controls */}
                            <div className="animate-in fade-in slide-in-from-left-5 duration-700 max-w-full overflow-hidden">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-none tracking-tighter truncate wrap-break-word">
                                    {activeCategory === 'All' ? (
                                        <>Our <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">Menu</span></>
                                    ) : (
                                        <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 uppercase italic">
                                            {activeCategory}
                                        </span>
                                    )}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <main className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 pb-20">
                        <div className="md:grid md:grid-cols-3 md:gap-8 items-start">
                            {/* Menu Items Grid */}
                            <div className="md:col-span-2">
                                {filteredItems.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 auto-rows-auto">
                                        {filteredItems.map((item, index) => {
                                            const isMobileLarge = (index % 6 === 4 || index % 6 === 5);
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`${isMobileLarge ? 'col-span-2 md:col-span-1' : 'col-span-1'} animate-in fade-in slide-in-from-bottom-5 duration-500`}
                                                    style={{ animationDelay: `${index * 50}ms` }}
                                                >
                                                    <MenuItem
                                                        item={item}
                                                        cartQuantity={cart[item.id]?.quantity || 0}
                                                        onAddToCart={addToCart}
                                                        onUpdateQuantity={updateQuantity}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-32 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                                        <div className="text-7xl mb-6 opacity-50">🔍</div>
                                        <h3 className="text-3xl font-bold text-white mb-3">No items found</h3>
                                        <p className="text-zinc-400 text-lg">We couldn't find anything matching your search.</p>
                                    </div>
                                )}
                            </div>

                            {/* Cart List - Desktop Only */}
                            <div className="hidden md:block md:col-span-1 md:sticky md:top-6">
                                <CartList
                                    cart={cart}
                                    onUpdateQuantity={updateQuantity}
                                    onRemoveItem={removeItem}
                                    onClearCart={clearCart}
                                />
                            </div>
                        </div>
                    </main>

                    {/* Premium Footer (Only in Items View) */}
                    <footer className="relative z-10 border-t border-white/5 bg-zinc-950/50 backdrop-blur-md pt-16 pb-32 md:pb-12 px-4">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                            <div className="md:col-span-2">
                                <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-zinc-900 border border-white/10">
                                        <img src="/NSB LOGO.png" alt="NSB" className="w-full h-full object-cover scale-125" />
                                    </div>
                                    <span className="text-2xl font-bold tracking-tight text-white">Nandu Saoji Bhojnalaya</span>
                                </div>
                                <p className="text-zinc-400 max-w-sm mx-auto md:mx-0 leading-relaxed">
                                    Bringing you the authentic taste of Saoji tradition with premium ingredients and time-honored recipes that transcend generations.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Connect</h4>
                                <div className="flex justify-center md:justify-start gap-4">
                                    {['Instagram', 'Twitter', 'Facebook'].map(social => (
                                        <div key={social} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-all cursor-pointer border border-white/10">
                                            <span className="sr-only">{social}</span>
                                            <div className="w-2 h-2 rounded-full bg-current" />
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-6 text-zinc-500 text-xs">
                                    © 2025 Nandu Saoji Bhojnalaya.<br />All rights reserved.
                                </p>
                            </div>
                        </div>
                    </footer>

                    {/* Cart List Component - Handles its own mobile/desktop visibility */}
                    <div className="md:hidden">
                        <CartList
                            cart={cart}
                            onUpdateQuantity={updateQuantity}
                            onRemoveItem={removeItem}
                            onClearCart={clearCart}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
