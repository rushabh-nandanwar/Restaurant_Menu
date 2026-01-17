import React from 'react';
import { Plus, Minus } from 'lucide-react';

const MenuItem = ({ item, cartQuantity = 0, onAddToCart, onUpdateQuantity }) => {
    return (
        <div className="group relative bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col h-full">
            <div className="relative h-48 md:h-64 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-60" />
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-2 right-2 z-20 bg-zinc-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 shadow-lg">
                    <span className="text-white font-bold tracking-tight text-[10px] md:text-sm">${item.price.toFixed(2)}</span>
                </div>
            </div>

            <div className="p-4 md:p-6 flex flex-col grow relative z-20">
                <div className="mb-2">
                    <h3 className="text-sm md:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-300 line-clamp-1">
                        {item.name}
                    </h3>
                </div>

                <p className="text-zinc-500 text-[10px] md:text-sm leading-relaxed mb-4 grow font-light line-clamp-2 md:line-clamp-3">
                    {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mr-2">
                        {item.category}
                    </span>

                    {cartQuantity > 0 ? (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onUpdateQuantity(item.id, cartQuantity - 1)}
                                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95"
                            >
                                <Minus size={14} className="text-white" />
                            </button>
                            <span className="text-sm font-bold text-white w-6 text-center">{cartQuantity}</span>
                            <button
                                onClick={() => onUpdateQuantity(item.id, cartQuantity + 1)}
                                className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors active:scale-95"
                            >
                                <Plus size={14} className="text-white" />
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => onAddToCart(item)} className="flex items-center gap-1 bg-white text-zinc-950 px-4 py-2 rounded-2xl text-xs md:text-sm font-bold hover:bg-linear-to-r hover:from-orange-500 hover:to-red-600 hover:text-white transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-orange-500/40 active:scale-95 cursor-pointer">
                            <Plus size={12} />
                            Add to List
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuItem;
