import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CURRENCIES = {
    USD: { symbol: '$', rate: 1, label: 'USD' },
    GBP: { symbol: '£', rate: 0.78, label: 'GBP' },
    EUR: { symbol: '€', rate: 0.92, label: 'EUR' },
    NGN: { symbol: '₦', rate: 1500, label: 'NGN' }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cfwm_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [currency, setCurrency] = useState(() => {
        const savedCurrency = localStorage.getItem('cfwm_currency');
        return savedCurrency || 'NGN';
    });

    useEffect(() => {
        localStorage.setItem('cfwm_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('cfwm_currency', currency);
    }, [currency]);

    const formatPrice = (price) => {
        const selected = CURRENCIES[currency];
        // The database stores prices in NGN (matching Admin UI)
        // Convert to USD base first, then to selected currency
        const baseInUsd = price / CURRENCIES.NGN.rate;
        const converted = baseInUsd * selected.rate;

        return `${selected.symbol}${converted.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            currency,
            setCurrency,
            formatPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};
