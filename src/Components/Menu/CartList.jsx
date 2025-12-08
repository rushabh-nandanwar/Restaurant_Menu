import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, X, Minus, Plus } from 'lucide-react';

const CartList = ({ cart, onUpdateQuantity, onRemoveItem, onClearCart }) => {
    const navigate = useNavigate();
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (totalItems === 0) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:relative md:mt-8">
            {/* Mobile: Floating Cart */}
            <div className="md:hidden bg-zinc-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
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
                                className="px-6 py-2 bg-linear-to-r from-orange-500 to-red-600 text-white rounded-full text-sm font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop: Side Panel */}
            <div className="hidden md:block bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="text-orange-500" size={24} />
                        <h3 className="text-xl font-bold text-white">Your List</h3>
                    </div>
                    <button
                        onClick={onClearCart}
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                <div className="space-y-3 mb-4">
                    {Object.values(cart).map((item) => (
                        <div key={item.id} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-white truncate">{item.name}</p>
                                <p className="text-sm text-orange-500">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                    <Minus size={14} className="text-white" />
                                </button>
                                <span className="font-bold text-white w-8 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors"
                                >
                                    <Plus size={14} className="text-white" />
                                </button>
                            </div>
                            <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-zinc-400 hover:text-red-500 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Total Items</span>
                        <span className="font-bold text-white">{totalItems}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Total Price</span>
                        <span className="text-2xl font-bold text-white">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                        <button className="w-full py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors">
                            Save for Later
                        </button>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full py-3 bg-linear-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartList;
