import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, formatPrice } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-page empty">
                <div className="empty-cart-content">
                    <ShoppingBag size={64} className="empty-icon" />
                    <h1>Your Cart is Empty</h1>
                    <p>Looks like you haven't added any resources yet.</p>
                    <Link to="/store" className="btn-browse">
                        Browse Resources
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container cart-container">
                <h1 className="cart-title">Your Shopping Cart</h1>

                <div className="cart-layout">
                    {/* Cart Items List */}
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image" style={{ background: item.color || '#e2e8f0' }}>
                                    {/* Placeholder for item image if available */}
                                </div>

                                <div className="cart-item-details">
                                    <h3>{item.title}</h3>
                                    <p className="item-author">{item.author}</p>
                                    <p className="item-price">{formatPrice(item.price)}</p>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="qty-btn"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="qty-btn"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="remove-btn"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (Estimate)</span>
                            <span>{formatPrice(0)}</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>

                        <Link to="/checkout" className="btn-checkout">
                            Proceed to Checkout <ArrowRight size={18} />
                        </Link>

                        <Link to="/store" className="continue-shopping">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
