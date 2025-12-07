import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});

    const addToCart = (item) => {
        setCart(prev => ({
            ...prev,
            [item.id]: { ...item, quantity: 1 }
        }));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            setCart(prev => {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            });
        } else {
            setCart(prev => ({
                ...prev,
                [itemId]: { ...prev[itemId], quantity: newQuantity }
            }));
        }
    };

    const removeItem = (itemId) => {
        setCart(prev => {
            const newCart = { ...prev };
            delete newCart[itemId];
            return newCart;
        });
    };

    const clearCart = () => {
        setCart({});
    };

    const value = {
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
