import { useState, useRef, useEffect, useMemo } from 'react';
import { ShoppingCart, Filter, Book, Headphones, Star, ChevronRight, ChevronLeft, Plus, Search } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Store.css';
import { useCart, CURRENCIES } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const typeToGradient = (type = '', title = '') => {
    const gradients = {
        book: ['linear-gradient(135deg, #1e3a8a, #3b82f6)', 'linear-gradient(135deg, #7c2d12, #ea580c)', 'linear-gradient(135deg, #064e3b, #10b981)'],
        audio: ['linear-gradient(135deg, #581c87, #a855f7)', 'linear-gradient(135deg, #be123c, #fb7185)', 'linear-gradient(135deg, #1f2937, #4b5563)']
    };

    const typeList = gradients[type] || gradients.book;
    let hash = 0;
    for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash);
    return typeList[Math.abs(hash) % typeList.length];
};

const Store = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart, currency, setCurrency, formatPrice } = useCart();
    const scrollContainerRef = useRef(null);
    const [scrollStatus, setScrollStatus] = useState({ left: false, right: true });

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic'
        });

        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/products`);
                if (!res.ok) throw new Error('Failed to fetch products');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error('Store fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

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
    }, [products]);

    const scrollCategories = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            // Apply Category Filter
            let matchesCategory = true;
            if (filter !== 'all') {
                const prodCat = (p.category || '').toLowerCase();
                const filterVal = filter.toLowerCase();

                if (filterVal === 'audio') {
                    matchesCategory = prodCat === 'audio' || prodCat === 'audiobook' || prodCat === 'audiobooks';
                } else if (filterVal === 'book') {
                    matchesCategory = prodCat === 'book' || prodCat === 'books';
                } else {
                    matchesCategory = prodCat === filterVal;
                }
            }

            // Apply Search Filter
            const matchesSearch =
                (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.author || '').toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [products, filter, searchQuery]);

    const handleAddToCart = (product) => {
        // Map backend product data to cart format if necessary
        const cartItem = {
            ...product,
            type: product.category, // context uses type for badge display usually
            image: product.image_url // context might expect image
        };
        addToCart(cartItem);
    };

    const skeletons = Array(4).fill(null);

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

                    {/* Search Bar */}
                    <div className="search-bar" data-aos="fade-up" data-aos-delay="200">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search products by title, author or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
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
                    <div className="product_grid_container">
                        <div className="product-grid">
                            {loading ? (
                                skeletons.map((_, i) => (
                                    <div key={i} className="product-card loading" style={{ opacity: 0.5 }}>
                                        <div className="product-cover" style={{ height: '280px', background: '#e2e8f0' }} />
                                        <div className="product-details">
                                            <div style={{ height: '1.25rem', background: '#e2e8f0', borderRadius: '4px', marginBottom: '0.5rem', width: '80%' }} />
                                            <div style={{ height: '1rem', background: '#e2e8f0', borderRadius: '4px', width: '60%' }} />
                                        </div>
                                    </div>
                                ))
                            ) : filteredProducts.length === 0 ? (
                                <div className="no-results" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 0' }}>
                                    <Filter size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
                                    <h3>No products found</h3>
                                    <p>Check back later for new resources</p>
                                </div>
                            ) : (
                                filteredProducts.map((product, index) => (
                                    <div className="product-card" key={product.id} data-aos="fade-up" data-aos-delay={(index % 4) * 50}>
                                        <div
                                            className={`product-cover ${product.image_url ? 'has-image' : ''}`}
                                            style={{ background: !product.image_url ? typeToGradient(product.category, product.title) : 'var(--color-bg-dark)' }}
                                        >
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.title} className="product-image" />
                                            ) : (
                                                <div className="cover-content">
                                                    <h3>{product.title}</h3>
                                                    <span>{product.author}</span>
                                                </div>
                                            )}
                                            <div className="product-type-badge">
                                                {product.category?.toLowerCase().includes('book') ? <Book size={14} /> : <Headphones size={14} />}
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
                                                            fill={i < Math.floor(product.rating || 5) ? "#fbbf24" : "none"}
                                                            color={i < Math.floor(product.rating || 5) ? "#fbbf24" : "#cbd5e1"}
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
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Store;
