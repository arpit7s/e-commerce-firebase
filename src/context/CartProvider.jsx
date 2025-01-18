import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const resetCart = () => {
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([])); // Clears the cart
    };

    return (
        <CartContext.Provider value={{ cart, resetCart }}>
            {children}
        </CartContext.Provider>
    );
};
