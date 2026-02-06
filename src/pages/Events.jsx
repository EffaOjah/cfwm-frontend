import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, Filter, ChevronRight, ChevronLeft } from 'lucide-react';
import './Events.css';

import { ALL_EVENTS, CATEGORIES } from '../data/events';

const Events = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
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

    const filteredEvents = useMemo(() => {
        return ALL_EVENTS.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="events-page">
            {/* Hero Section */}
            <section className="events-hero">
                <div className="events-hero-overlay"></div>
                <div className="container events-hero-content" data-aos="fade-up">
                    <span className="hero-tag">CHURCH CALENDAR</span>
                    <h1>Experience Life-Changing <br /> Moments with Us</h1>
                    <p>Stay updated with our upcoming services, conferences, and community gatherings.</p>

                </div>
            </section>

            {/* Filter Section */}
            <section className="events-toolbar-section">
                <div className="container">
                    <div className="events-toolbar">
                        <div className="filter-wrapper">
                            <button
                                className={`scroll-indicator left ${!scrollStatus.left ? 'disabled' : ''}`}
                                onClick={() => scrollCategories('left')}
                                disabled={!scrollStatus.left}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div
                                className="filter-scroll"
                                ref={scrollContainerRef}
                                onScroll={checkScroll}
                            >
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <button
                                className={`scroll-indicator right ${!scrollStatus.right ? 'disabled' : ''}`}
                                onClick={() => scrollCategories('right')}
                                disabled={!scrollStatus.right}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="toolbar-search">
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Grid */}
            <section className="events-grid-section">
                <div className="container">
                    {filteredEvents.length > 0 ? (
                        <div className="events-grid">
                            {filteredEvents.map((event, index) => (
                                <div className="event-card-modern" key={event.id} data-aos="fade-up" data-aos-delay={index * 50}>
                                    <div className="event-card-image">
                                        <img src={event.image} alt={event.title} />
                                        <div className="event-date-box">
                                            <span className="date-month">{event.month}</span>
                                            <span className="date-day">{event.day}</span>
                                        </div>
                                        <div className="event-category-badge">{event.category}</div>
                                    </div>
                                    <div className="event-card-info">
                                        <h3 className="event-card-title">{event.title}</h3>
                                        <p className="event-card-subtitle">{event.subtitle}</p>

                                        <div className="event-card-meta">
                                            <div className="meta-item">
                                                <Clock size={16} />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="meta-item">
                                                <MapPin size={16} />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        <Link to={`/resources/events/${event.id}`} className="btn-event-details">
                                            Event Details <ChevronRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-events">
                            <Filter size={48} />
                            <h3>No events found</h3>
                            <p>Try adjusting your search or filter to find what you're looking for.</p>
                            <button className="btn-reset" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>Reset Filters</button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter/Reminder Section */}
            <section className="events-newsletter">
                <div className="container">
                    <div className="newsletter-card">
                        <div className="newsletter-text">
                            <h2>Never Miss a Blessing</h2>
                            <p>Subscribe to get monthly event calendars and special announcements delivered to your inbox.</p>
                        </div>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Your email address" />
                            <button className="btn btn-red">Subscribe Now</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Events;
