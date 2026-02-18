import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, Filter, ChevronRight, ChevronLeft } from 'lucide-react';
import './Events.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop';

// Format "2026-02-27" → { day: "27", month: "FEB" }
const formatDate = (dateStr) => {
    if (!dateStr) return { day: '--', month: '---' };
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    return { day, month };
};

// Format "17:00:00" → "5:00 PM"
const formatTime = (timeStr) => {
    if (!timeStr) return '—';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
};

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const scrollContainerRef = useRef(null);
    const [scrollStatus, setScrollStatus] = useState({ left: false, right: true });

    // Fetch events from backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/events`);
                if (!res.ok) throw new Error('Failed to fetch events');
                const data = await res.json();
                setEvents(data);
            } catch (err) {
                console.error('Events fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Derive categories dynamically from fetched events
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(events.map(e => e.category).filter(Boolean))];
        return cats;
    }, [events]);

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
    }, [categories]);

    const scrollCategories = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch =
                event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [events, searchQuery, activeCategory]);

    const skeletons = Array(6).fill(null);

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
                                {categories.map(cat => (
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
                    {loading ? (
                        <div className="events-grid">
                            {skeletons.map((_, i) => (
                                <div className="event-card-modern" key={i} style={{ opacity: 0.5 }}>
                                    <div className="event-card-image" style={{ background: '#e2e8f0', height: '200px' }} />
                                    <div className="event-card-info">
                                        <div style={{ height: '1.25rem', background: '#e2e8f0', borderRadius: '4px', marginBottom: '0.5rem' }} />
                                        <div style={{ height: '1rem', background: '#e2e8f0', borderRadius: '4px', width: '70%', marginBottom: '0.5rem' }} />
                                        <div style={{ height: '0.875rem', background: '#e2e8f0', borderRadius: '4px', width: '50%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredEvents.length > 0 ? (
                        <div className="events-grid">
                            {filteredEvents.map((event, index) => {
                                const { day, month } = formatDate(event.event_date);
                                return (
                                    <div className="event-card-modern" key={event.id} data-aos="fade-up" data-aos-delay={index * 50}>
                                        <div className="event-card-image">
                                            <img
                                                src={event.image_url || PLACEHOLDER_IMAGE}
                                                alt={event.title}
                                                onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                                            />
                                            <div className="event-date-box">
                                                <span className="date-month">{month}</span>
                                                <span className="date-day">{day}</span>
                                            </div>
                                            <div className="event-category-badge">{event.category}</div>
                                        </div>
                                        <div className="event-card-info">
                                            <h3 className="event-card-title">{event.title}</h3>
                                            <p className="event-card-subtitle">{event.subtitle}</p>

                                            <div className="event-card-meta">
                                                <div className="meta-item">
                                                    <Clock size={16} />
                                                    <span>{formatTime(event.event_time)}</span>
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
                                );
                            })}
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
