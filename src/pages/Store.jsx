import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Filter, Book, Headphones, Star, ChevronRight, ChevronLeft, Plus } from 'lucide-react';
import './Store.css';
import { useCart, CURRENCIES } from '../context/CartContext';

const PRODUCTS = [
    {
        id: 1,
        title: "The Power of Prayer",
        author: "Rev. Dr. Nick Ezeh",
        price: 15.00,
        type: "book",
        description: "Unlock the divine secrets of effective communication with God. A guide to transforming your spiritual life.",
        color: "linear-gradient(135deg, #1e3a8a, #3b82f6)", // Deep Blue
        rating: 5
    },
    {
        id: 2,
        title: "Walking in Dominion",
        author: "Rev. Dr. Nick Ezeh",
        price: 12.50,
        type: "book",
        description: "Discover your authority as a believer and how to exercise dominion over every circumstance.",
        color: "linear-gradient(135deg, #7c2d12, #ea580c)", // Burnt Orange
        rating: 5
    },
    {
        id: 3,
        title: "Kingdom Principles (Audio)",
        author: "Rev. Dr. Nick Ezeh",
        price: 9.99,
        type: "audio",
        description: "An audio series teaching the foundational principles that govern the Kingdom of God.",
        color: "linear-gradient(135deg, #581c87, #a855f7)", // Purple
        rating: 4.5
    },
    {
        id: 4,
        title: "The Holy Spirit & You",
        author: "Rev. Dr. Nick Ezeh",
        price: 18.00,
        type: "book",
        description: "A comprehensive study on the person, power, and presence of the Holy Spirit in a believer's life.",
        color: "linear-gradient(135deg, #064e3b, #10b981)", // Emerald
        rating: 5
    },
    {
        id: 5,
        title: "Faith That Works (Audio)",
        author: "Rev. Dr. Nick Ezeh",
        price: 8.50,
        type: "audio",
        description: "Listen on the go: Practical teachings on how to activate your faith for daily victories.",
        color: "linear-gradient(135deg, #be123c, #fb7185)", // Rose
        rating: 4
    },
    {
        id: 6,
        title: "Understanding Grace",
        author: "Rev. Dr. Nick Ezeh",
        price: 14.00,
        type: "book",
        description: "Dive deep into the unmerited favor of God and how it empowers you for righteous living.",
        color: "linear-gradient(135deg, #1f2937, #4b5563)", // Dark Grey
        rating: 5
    }
];

const Store = () => {
    const [filter, setFilter] = useState('all');
    const { addToCart, currency, setCurrency, formatPrice } = useCart();
    const scrollContainerRef = useRef(null);
    const [scrollStatus, setScrollStatus] = useState({ left: false, right: true });

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setScrollStatus({
                left: scrollLeft > 10,
                right: scrollLeft < scrollWidth - clientWidth - 10
            });
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scrollCategories = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const filteredProducts = filter === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.type === filter);

    const handleAddToCart = (product) => {
        addToCart(product);
        // Optional: Add toast notification Logic here
    };

    return (
        <div className="store-page">
            {/* Store Hero */}
            <section className="store-hero">
                <div className="store-hero-overlay"></div>
                <div className="container store-hero-content">
                    <h1 data-aos="fade-up">Equip <span className="text-highlight">Yourself</span></h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Resources to help you grow in faith, knowledge, and spiritual power.
                    </p>
                </div>
            </section>

            {/* Catalog Section */}
            <section className="catalog-section">
                <div className="container">
                    {/* Toolbar */}
                    <div className="store-toolbar" data-aos="fade-up">
                        <div className="filter-wrapper">
                            <button
                                className={`scroll-indicator left ${!scrollStatus.left ? 'disabled' : ''}`}
                                onClick={() => scrollCategories('left')}
                                disabled={!scrollStatus.left}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div
                                className="filter-tabs"
                                ref={scrollContainerRef}
                                onScroll={checkScroll}
                            >
                                <button
                                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    All Resources
                                </button>
                                <button
                                    className={`filter-btn ${filter === 'book' ? 'active' : ''}`}
                                    onClick={() => setFilter('book')}
                                >
                                    <Book size={18} /> Books
                                </button>
                                <button
                                    className={`filter-btn ${filter === 'audio' ? 'active' : ''}`}
                                    onClick={() => setFilter('audio')}
                                >
                                    <Headphones size={18} /> Audio
                                </button>
                            </div>
                            <button
                                className={`scroll-indicator right ${!scrollStatus.right ? 'disabled' : ''}`}
                                onClick={() => scrollCategories('right')}
                                disabled={!scrollStatus.right}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="toolbar-actions">
                            {/* Currency Selector */}
                            <div className="currency-selector">
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="currency-dropdown"
                                >
                                    {Object.keys(CURRENCIES).map(code => (
                                        <option key={code} value={code}>
                                            {CURRENCIES[code].symbol} {code}
                                        </option>
                                    ))}
                                </select>
                            </div>


                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="product-grid">
                        {filteredProducts.map((product, index) => (
                            <div className="product-card" key={product.id} data-aos="fade-up" data-aos-delay={index * 50}>
                                <div className="product-cover" style={{ background: product.color }}>
                                    <div className="cover-content">
                                        <h3>{product.title}</h3>
                                        <span>{product.author}</span>
                                    </div>
                                    <div className="product-type-badge">
                                        {product.type === 'book' ? <Book size={14} /> : <Headphones size={14} />}
                                    </div>
                                </div>
                                <div className="product-details">
                                    <div className="product-meta">
                                        <span className="price">{formatPrice(product.price)}</span>
                                        <div className="rating">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                                                    color={i < Math.floor(product.rating) ? "#fbbf24" : "#cbd5e1"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <h4>{product.title}</h4>
                                    <p className="description">{product.description}</p>
                                    <button className="btn-add-cart" onClick={() => handleAddToCart(product)}>
                                        Add to Cart <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Store;
