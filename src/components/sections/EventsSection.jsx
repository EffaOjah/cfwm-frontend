import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import './EventsSection.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop';

const EventsSection = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 1200) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/events`);
                if (!res.ok) throw new Error('Failed to fetch events');
                const data = await res.json();
                setEvents(data);
            } catch (err) {
                console.error('EventsSection fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const nextSlide = () => {
        if (events.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % events.length);
    };

    const prevSlide = () => {
        if (events.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    };

    // Format date: "2026-02-27" → { day: "27", month: "FEB" }
    const formatDate = (dateStr) => {
        if (!dateStr) return { day: '--', month: '---' };
        const d = new Date(dateStr);
        const day = d.getDate().toString().padStart(2, '0');
        const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        return { day, month };
    };

    // Format time: "17:00:00" → "5:00 PM"
    const formatTime = (timeStr) => {
        if (!timeStr) return '';
        const [h, m] = timeStr.split(':').map(Number);
        const period = h >= 12 ? 'PM' : 'AM';
        const hour = h % 12 || 12;
        return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
    };

    const skeletons = Array(3).fill(null);

    return (
        <section className="section-events">
            <div className="container">
                <div className="events-header" data-aos="fade-up">
                    <div className="header-left">
                        <span className="section-label-red">— WHAT'S HAPPENING</span>
                        <Link to="/resources/events" style={{ textDecoration: 'none' }}>
                            <h2 className="section-title-large">Upcoming Events</h2>
                        </Link>
                    </div>
                    <div className="carousel-controls">
                        <button className="control-btn" onClick={prevSlide}>
                            <ChevronLeft size={24} />
                        </button>
                        <button className="control-btn" onClick={nextSlide}>
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="events-carousel-wrapper" data-aos="fade-up">
                    {loading ? (
                        <div className="events-track" style={{ transform: 'none' }}>
                            {skeletons.map((_, i) => (
                                <div key={i} className="event-slide" style={{ flex: `0 0 ${100 / slidesToShow}%` }}>
                                    <div className="event-card" style={{ opacity: 0.5 }}>
                                        <div className="event-image" style={{ background: '#e2e8f0', height: '200px' }} />
                                        <div className="event-content">
                                            <div style={{ height: '1rem', background: '#e2e8f0', borderRadius: '4px', marginBottom: '0.5rem' }} />
                                            <div style={{ height: '0.75rem', background: '#e2e8f0', borderRadius: '4px', width: '60%' }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : events.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem 0' }}>No upcoming events at this time.</p>
                    ) : (
                        <div
                            className="events-track"
                            style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
                        >
                            {events.map((event) => {
                                const { day, month } = formatDate(event.event_date);
                                return (
                                    <div
                                        className="event-slide"
                                        key={event.id}
                                        style={{ flex: `0 0 ${100 / slidesToShow}%` }}
                                    >
                                        <div className="event-card">
                                            <div className="event-image">
                                                <img
                                                    src={event.image_url || PLACEHOLDER_IMAGE}
                                                    alt={event.title}
                                                    onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                                                />
                                                <div className="event-date-overlay">
                                                    {day} <br />
                                                    <span>{month}</span>
                                                </div>
                                            </div>
                                            <div className="event-content">
                                                <h3 className="event-title">{event.title}</h3>
                                                <p className="event-subtitle">{event.subtitle}</p>
                                                <div className="event-info">
                                                    <span><Clock size={16} /> {formatTime(event.event_time)}</span>
                                                    <span><MapPin size={16} /> {event.location}</span>
                                                </div>
                                                <Link to={`/resources/events/${event.id}`} className="btn-learn-more">
                                                    View Details <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="events-footer" data-aos="fade-up">
                    <Link to="/resources/events" className="btn btn-outline-red">
                        See All Events <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
