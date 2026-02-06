import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Facebook, Instagram, Twitter, CheckCircle2 } from 'lucide-react';
import { ALL_EVENTS } from '../data/events';
import './EventDetails.css';
import { useEffect } from 'react';

const EventDetails = () => {
    const { id } = useParams();
    const event = ALL_EVENTS.find(e => e.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!event) {
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

    return (
        <div className="event-details-page">
            {/* Hero Section */}
            <section className="event-hero-modern">
                <div className="event-hero-bg" style={{ backgroundImage: `url(${event.image})` }}></div>
                <div className="event-hero-overlay"></div>
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
                                <strong>{event.date}</strong>
                            </div>
                        </div>
                        <div className="hero-meta-item">
                            <Clock className="icon" size={24} />
                            <div className="meta-text">
                                <span>Time</span>
                                <strong>{event.time}</strong>
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

                    <section className="event-highlights">
                        <h2 className="detail-section-title">Event Highlights</h2>
                        <div className="highlights-grid">
                            {event.highlights?.map((highlight, index) => (
                                <div className="highlight-item" key={index}>
                                    <CheckCircle2 size={20} className="check-icon" />
                                    <span>{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="event-sidebar-right" data-aos="fade-left">
                    <div className="booking-card-glass">
                        <h3>Join This Event</h3>
                        <p>We'd love to have you with us. Membership is not required to attend!</p>

                        <div className="sidebar-info-row">
                            <label>Organizer</label>
                            <span>{event.organizer}</span>
                        </div>

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

            {/* Newsletter Integration */}
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
