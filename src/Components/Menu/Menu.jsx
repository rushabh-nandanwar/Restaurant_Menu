import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { menuItems } from '../../data/menuItems';
import MenuItem from './MenuItem';
import CategoryFilter from './CategoryFilter';
import CartList from './CartList';
import { Search, UtensilsCrossed } from 'lucide-react';

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { cart, addToCart, updateQuantity, removeItem, clearCart } = useCart();

    const categories = ['All', ...new Set(menuItems.map(item => item.category))];

    const filteredItems = useMemo(() => {
        return menuItems.filter(item => {
            const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500/30 pb-32 md:pb-0">
            {/* Global Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            {/* Hero Section */}
            <div className="relative z-10 pb-20 pt-20 px-4 md:px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
                    <div className="absolute inset-0 bg-linear-to-b from-zinc-950/80 via-zinc-950/50 to-zinc-950" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-1 pr-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8 shadow-2xl shadow-orange-500/10 ring-1 ring-white/5">
                        <div className="bg-linear-to-r from-orange-500 to-red-600 p-2 rounded-full mr-3">
                            <UtensilsCrossed className="text-white" size={16} />
                        </div>
                        <span className="text-zinc-300 font-medium tracking-wide text-sm uppercase">Premium Dining Experience</span>
                    </div>

                    <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tight leading-tight">
                        Nandu Saoji <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-red-500 to-purple-600 animate-gradient-x">Bhojnalaya</span>
                    </h1>

                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                        ~ The Taste of Saoji Tradition
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 pb-20 -mt-10 md:-mt-20">
                {/* Controls */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-4 md:p-6 shadow-2xl border border-white/10 mb-8 ring-1 ring-white/5">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">

                        <div className="relative w-full md:w-auto md:min-w-[320px] group">
                            <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <div className="relative bg-zinc-900/80 rounded-full flex items-center border border-white/10 focus-within:border-orange-500/50 transition-colors">
                                <Search className="ml-4 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search for dishes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-3 pr-6 py-3.5 bg-transparent rounded-full border-none focus:ring-0 outline-none text-white placeholder-zinc-500"
                                />
                            </div>
                        </div>

                        <CategoryFilter
                            categories={categories}
                            activeCategory={activeCategory}
                            onSelectCategory={setActiveCategory}
                        />

                    </div>
                </div>

                <div className="md:grid md:grid-cols-3 md:gap-8">
                    {/* Menu Items Grid */}
                    <div className="md:col-span-2">
                        {filteredItems.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 auto-rows-auto">
                                {filteredItems.map((item, index) => {
                                    // Bento box pattern for mobile: every 5th and 6th item spans 2 columns
                                    const isMobileLarge = (index % 6 === 4 || index % 6 === 5);

                                    return (
                                        <div
                                            key={item.id}
                                            className={`${isMobileLarge ? 'col-span-2 md:col-span-1' : 'col-span-1'}`}
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
                    <div className="hidden md:block md:col-span-1">
                        <CartList
                            cart={cart}
                            onUpdateQuantity={updateQuantity}
                            onRemoveItem={removeItem}
                            onClearCart={clearCart}
                        />
                    </div>
                </div>
            </main>

            {/* Cart List - Mobile Only (Fixed Bottom) */}
            <CartList
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                onClearCart={clearCart}
            />
        </div>
    );
};

export default Menu;
