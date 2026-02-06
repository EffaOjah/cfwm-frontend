import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    CreditCard,
    Building2,
    User,
    Mail,
    Phone,
    MapPin,
    CheckCircle2,
    ArrowLeft,
    ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart, formatPrice } = useCart();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [paymentMethod, setPaymentMethod] = useState('card');

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        country: 'Nigeria'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = (e) => {
        if (e) e.preventDefault();
        setStep(step + 1);
        window.scrollTo(0, 0);
    };

    const handlePlaceOrder = () => {
        // Mock order placement
        setStep(3);
        clearCart();
        window.scrollTo(0, 0);
    };

    const BASE_SHIPPING_FEE = 5; // Base USD
    const isCalabar = formData.city.toLowerCase().trim() === 'calabar';
    const shippingFee = isCalabar ? 0 : BASE_SHIPPING_FEE;
    const grandTotal = cartTotal + shippingFee;

    if (cartItems.length === 0 && step !== 3) {
        return (
            <div className="checkout-empty">
                <div className="container">
                    <h2>Your cart is empty</h2>
                    <p>Please add items to your cart before checking out.</p>
                    <Link to="/store" className="btn btn-red">Return to Store</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                {/* Progress Tracker */}
                {step < 3 && (
                    <div className="checkout-steps">
                        <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                            <span className="step-num">1</span>
                            <span className="step-label">Shipping</span>
                        </div>
                        <div className="step-divider"></div>
                        <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                            <span className="step-num">2</span>
                            <span className="step-label">Payment</span>
                        </div>
                    </div>
                )}

                {step === 3 ? (
                    /* Success State */
                    <div className="order-success" data-aos="zoom-in">
                        <CheckCircle2 size={80} className="success-icon" />
                        <h1>Order Placed Successfully!</h1>
                        <p>Thank you for your purchase, <strong>{formData.fullName}</strong>. Your resources are being prepared for delivery.</p>
                        <div className="order-details-box">
                            <p>Order reference: <strong>#CFWM-{Math.floor(Math.random() * 1000000)}</strong></p>
                            <p>A confirmation email has been sent to {formData.email}</p>
                        </div>
                        <div className="success-actions">
                            <Link to="/store" className="btn btn-red">Continue Shopping</Link>
                            <Link to="/" className="btn btn-outline">Back to Home</Link>
                        </div>
                    </div>
                ) : (
                    <div className="checkout-layout">
                        {/* Left Column: Forms */}
                        <div className="checkout-main">
                            {step === 1 ? (
                                <form className="checkout-form" onSubmit={handleNextStep} data-aos="fade-right">
                                    <div className="form-section">
                                        <h3><User size={20} /> Contact Information</h3>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    required
                                                    placeholder="John Doe"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    placeholder="+234 ..."
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-section">
                                        <h3><MapPin size={20} /> Shipping Address</h3>
                                        <div className="form-group">
                                            <label>Street Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                required
                                                placeholder="123 Church Street"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    required
                                                    placeholder="Lagos"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Zip Code</label>
                                                <input
                                                    type="text"
                                                    name="zip"
                                                    required
                                                    placeholder="100001"
                                                    value={formData.zip}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="checkout-actions">
                                        <Link to="/cart" className="back-link"><ArrowLeft size={16} /> Back to Cart</Link>
                                        <button type="submit" className="btn btn-red">Continue to Payment <ChevronRight size={18} /></button>
                                    </div>
                                </form>
                            ) : (
                                <div className="payment-selection" data-aos="fade-right">
                                    <div className="form-section">
                                        <h3><CreditCard size={20} /> Select Payment Method</h3>
                                        <div className="payment-grid">
                                            <div
                                                className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('card')}
                                            >
                                                <div className="radio-circle"></div>
                                                <div className="option-info">
                                                    <h4>Credit or Debit Card</h4>
                                                    <p>Pay securely via Flutterwave</p>
                                                </div>
                                            </div>

                                            <div
                                                className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('paypal')}
                                            >
                                                <div className="radio-circle"></div>
                                                <div className="option-info">
                                                    <h4>PayPal</h4>
                                                    <p>Fast and secure international payment</p>
                                                </div>
                                            </div>

                                            <div
                                                className={`payment-option ${paymentMethod === 'bank' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('bank')}
                                            >
                                                <div className="radio-circle"></div>
                                                <div className="option-info">
                                                    <h4>Bank Transfer</h4>
                                                    <p>Direct transfer to our accounts</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="security-note">
                                        <ShieldCheck size={20} />
                                        <span>Your payment is secure and encrypted. CFWM does not store your card details.</span>
                                    </div>

                                    <div className="checkout-actions">
                                        <button className="back-link" onClick={() => setStep(1)}><ArrowLeft size={16} /> Shipping Details</button>
                                        <button className="btn btn-red" onClick={handlePlaceOrder}>Complete Purchase ({formatPrice(grandTotal)})</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Order Summary */}
                        <aside className="checkout-sidebar" data-aos="fade-left">
                            <div className="summary-card">
                                <h3>Order Summary</h3>
                                <div className="summary-items">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="summary-item">
                                            <div className="item-thumb" style={{ background: item.color }}></div>
                                            <div className="item-info">
                                                <h4>{item.title}</h4>
                                                <span>Qty: {item.quantity}</span>
                                            </div>
                                            <span className="item-total">{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="summary-totals">
                                    <div className="total-row">
                                        <span>Subtotal:</span>
                                        <span>{formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Shipping Fee:</span>
                                        <span className={isCalabar ? 'free' : ''}>
                                            {isCalabar ? 'FREE' : formatPrice(shippingFee)}
                                        </span>
                                    </div>
                                    <div className="total-divider"></div>
                                    <div className="total-row grand-total">
                                        <span>Total:</span>
                                        <span>{formatPrice(grandTotal)}</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
