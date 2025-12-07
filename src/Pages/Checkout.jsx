import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, updateQuantity, removeItem, clearCart } = useCart();

    const cartItems = Object.values(cart);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
                <div className="text-center">
                    <ShoppingBag className="mx-auto mb-4 text-zinc-600" size={64} />
                    <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
                    <p className="text-zinc-400 mb-6">Add some delicious items to get started!</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-linear-to-r from-orange-500 to-red-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                    >
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft size={20} />
                        Back to Menu
                    </button>
                    <h1 className="text-4xl md:text-5xl font-black mb-2">Checkout</h1>
                    <p className="text-zinc-400">Review your order before placing</p>
                </div>

                {/* Order Items */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Your Order</h2>
                        <button
                            onClick={clearCart}
                            className="text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-2"
                        >
                            <Trash2 size={18} />
                            Clear All
                        </button>
                    </div>

                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 rounded-xl object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                                    <p className="text-sm text-zinc-400 mb-2">{item.category}</p>
                                    <p className="text-orange-500 font-bold">${item.price.toFixed(2)} each</p>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                        >
                                            <Minus size={14} className="text-white" />
                                        </button>
                                        <span className="font-bold w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors"
                                        >
                                            <Plus size={14} className="text-white" />
                                        </button>
                                    </div>
                                    <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-zinc-400">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                            <span>Tax (10%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-white/10 pt-3 flex justify-between text-2xl font-bold">
                            <span>Total</span>
                            <span className="text-orange-500">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex-1 py-4 bg-white/10 text-white rounded-2xl font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Add Another Item
                    </button>
                    <button
                        onClick={() => {
                            alert('Order placed successfully! 🎉');
                            clearCart();
                            navigate('/');
                        }}
                        className="flex-1 py-4 bg-linear-to-r from-orange-500 to-red-600 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                    >
                        Place Order - ${total.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
