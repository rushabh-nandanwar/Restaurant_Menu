import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, X, Minus, Plus } from 'lucide-react';

const CartList = ({ cart, onUpdateQuantity, onRemoveItem, onClearCart }) => {
    const navigate = useNavigate();
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:relative">
            {/* Mobile: Floating Cart (Only shows when items exist) */}
            {totalItems > 0 && (
                <div className="md:hidden bg-zinc-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        {/* Cart Header */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="text-orange-500" size={20} />
                                <h3 className="font-bold text-white">Your List ({totalItems})</h3>
                            </div>
                            <button
                                onClick={onClearCart}
                                className="text-zinc-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {/* Cart Items - Scrollable */}
                        <div className="max-h-48 overflow-y-auto scrollbar-hide space-y-2 mb-3">
                            {Object.values(cart).map((item) => (
                                <div key={item.id} className="flex items-center gap-3 bg-white/5 rounded-xl p-2">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                                        <p className="text-xs text-orange-500">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                        >
                                            <Minus size={12} className="text-white" />
                                        </button>
                                        <span className="text-sm font-bold text-white w-6 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors"
                                        >
                                            <Plus size={12} className="text-white" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => onRemoveItem(item.id)}
                                        className="text-zinc-400 hover:text-red-500 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Total and Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <div>
                                <p className="text-xs text-zinc-400">Total</p>
                                <p className="text-xl font-bold text-white">${totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="px-6 py-2 bg-linear-to-r from-orange-500 to-red-600 text-white rounded-full text-sm font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all font-sans"
                                >
                                    View Complete Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop: Side Panel */}
            <div className="hidden md:block bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-500/10 p-2 rounded-xl">
                            <ShoppingBag className="text-orange-500" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Your List</h3>
                    </div>
                    {totalItems > 0 && (
                        <button
                            onClick={onClearCart}
                            className="text-zinc-500 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>

                {totalItems > 0 ? (
                    <>
                        <div className="space-y-3 mb-6 max-h-[calc(100vh-28rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {Object.values(cart).map((item) => (
                                <div key={item.id} className="group flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-transparent hover:border-white/10 transition-all">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-xl object-cover shadow-lg"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-white truncate text-sm">{item.name}</p>
                                        <p className="text-sm font-bold text-orange-500">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center bg-zinc-900/50 rounded-full p-1 border border-white/5">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="font-bold text-white w-7 text-center text-xs">{item.quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 shadow-lg shadow-orange-500/20 text-white transition-colors"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-white/10 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500">Subtotal</span>
                                <span className="font-medium text-white">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400 font-medium">Total</span>
                                <span className="text-2xl font-black text-white">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full py-4 bg-linear-to-r from-orange-500 to-red-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-orange-500/40 transition-all active:scale-[0.98] cursor-pointer"
                            >
                                View Full Order
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="py-12 px-4 text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                            <ShoppingBag size={32} className="text-zinc-600" />
                        </div>
                        <h4 className="text-white font-bold mb-2">Your list is empty</h4>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                            Looks like you haven't added anything yet. Explore our menu to find your favorites!
                        </p>
                        <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10 text-left">
                            <p className="text-orange-500 text-[10px] uppercase tracking-widest font-black mb-2">Chef's Tip</p>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                Experience the real heat of Saoji cuisine with our "Papad Roast" to start your meal!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartList;
