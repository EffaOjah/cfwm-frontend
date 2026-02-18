import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Facebook, Instagram, Twitter, CheckCircle2 } from 'lucide-react';
import './EventDetails.css';
import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop';

// Format "2026-02-27" → "FEB 27, 2026"
const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
};

// Format "17:00:00" → "5:00 PM"
const formatTime = (timeStr) => {
    if (!timeStr) return '—';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
};

// Parse highlights — stored as JSON string or plain string in DB
const parseHighlights = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [raw];
    } catch {
        return [raw];
    }
};

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchEvent = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/events/${id}`);
                if (res.status === 404) { setNotFound(true); return; }
                if (!res.ok) throw new Error('Failed to fetch event');
                const data = await res.json();
                setEvent(data);
            } catch (err) {
                console.error('EventDetails fetch error:', err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <div className="event-details-page">
                <section className="event-hero-modern">
                    <div className="event-hero-bg" style={{ background: '#1e293b' }} />
                    <div className="event-hero-overlay" />
                    <div className="container event-hero-content">
                        <div style={{ height: '1.5rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', width: '200px', marginBottom: '1rem' }} />
                        <div style={{ height: '3rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', width: '60%', marginBottom: '0.5rem' }} />
                        <div style={{ height: '1.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', width: '40%' }} />
                    </div>
                </section>
            </div>
        );
    }

    if (notFound || !event) {
        return (
            <div className="event-not-found">
                <div className="container">
                    <h2>Event Not Found</h2>
                    <p>The event you are looking for might have been moved or is no longer available.</p>
                    <Link to="/resources/events" className="btn btn-red">Back to Events</Link>
                </div>
            </div>
        );
    }

    const highlights = parseHighlights(event.highlights);
    const heroImage = event.image_url || PLACEHOLDER_IMAGE;

    return (
        <div className="event-details-page">
            {/* Hero Section */}
            <section className="event-hero-modern">
                <div className="event-hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
                <div className="event-hero-overlay" />
                <div className="container event-hero-content" data-aos="fade-up">
                    <Link to="/resources/events" className="back-link">
                        <ArrowLeft size={20} /> Back to All Events
                    </Link>
                    <div className="event-category-pill">{event.category}</div>
                    <h1>{event.title}</h1>
                    <p className="hero-subtitle">{event.subtitle}</p>

                    <div className="hero-meta-grid">
                        <div className="hero-meta-item">
                            <Calendar className="icon" size={24} />
                            <div className="meta-text">
                                <span>Date</span>
                                <strong>{formatDate(event.event_date)}</strong>
                            </div>
                        </div>
                        <div className="hero-meta-item">
                            <Clock className="icon" size={24} />
                            <div className="meta-text">
                                <span>Time</span>
                                <strong>{formatTime(event.event_time)}</strong>
                            </div>
                        </div>
                        <div className="hero-meta-item">
                            <MapPin className="icon" size={24} />
                            <div className="meta-text">
                                <span>Location</span>
                                <strong>{event.location}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <div className="container event-main-grid">
                <div className="event-content-left" data-aos="fade-right">
                    <section className="about-event">
                        <h2 className="detail-section-title">About This Event</h2>
                        <p>{event.description}</p>
                    </section>

                    {highlights.length > 0 && (
                        <section className="event-highlights">
                            <h2 className="detail-section-title">Event Highlights</h2>
                            <div className="highlights-grid">
                                {highlights.map((highlight, index) => (
                                    <div className="highlight-item" key={index}>
                                        <CheckCircle2 size={20} className="check-icon" />
                                        <span>{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="event-sidebar-right" data-aos="fade-left">
                    <div className="booking-card-glass">
                        <h3>Join This Event</h3>
                        <p>We'd love to have you with us. Membership is not required to attend!</p>

                        {event.organizer && (
                            <div className="sidebar-info-row">
                                <label>Organizer</label>
                                <span>{event.organizer}</span>
                            </div>
                        )}

                        <button className="btn btn-red btn-block">Set Reminder</button>
                        <button className="btn btn-outline-dark btn-block btn-sidebar-spacing">Add to Calendar</button>

                        <div className="share-section">
                            <p>Spread the Word</p>
                            <div className="share-buttons">
                                <button className="share-icon-btn"><Facebook size={18} /></button>
                                <button className="share-icon-btn"><Instagram size={18} /></button>
                                <button className="share-icon-btn"><Twitter size={18} /></button>
                                <button className="share-icon-btn"><Share2 size={18} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Banner */}
            <section className="event-cta-banner" data-aos="zoom-in">
                <div className="container">
                    <div className="cta-content">
                        <h2>Can't Attend In Person?</h2>
                        <p>Subscribe to get updates on livestreaming and video highlights from this event.</p>
                        <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Your email address" />
                            <button type="submit" className="btn btn-red">Keep Me Updated</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventDetails;
