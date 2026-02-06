import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import './EventsSection.css';

import { ALL_EVENTS } from '../../data/events';

const EventsSection = () => {
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

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % ALL_EVENTS.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + ALL_EVENTS.length) % ALL_EVENTS.length);
    };

    // Calculate how many slides to show based on screen width
    // In a real app we'd use a resize listener or CSS breakpoints
    // For this simple implementation, we'll use CSS for layout and state for indexing

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
                    <div
                        className="events-track"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
                        }}
                    >
                        {ALL_EVENTS.map((event) => (
                            <div
                                className="event-slide"
                                key={event.id}
                                style={{ flex: `0 0 ${100 / slidesToShow}%` }}
                            >
                                <div className="event-card">
                                    <div className="event-image">
                                        <img src={event.image} alt={event.title} />
                                        <div className="event-date-overlay">
                                            {event.date.split(' ')[0]} <br />
                                            <span>{event.date.split(' ')[1]}</span>
                                        </div>
                                    </div>
                                    <div className="event-content">
                                        <h3 className="event-title">{event.title}</h3>
                                        <p className="event-subtitle">{event.subtitle}</p>
                                        <div className="event-info">
                                            <span><Clock size={16} /> {event.time}</span>
                                            <span><MapPin size={16} /> {event.location}</span>
                                        </div>
                                        <Link to={`/resources/events/${event.id}`} className="btn-learn-more">
                                            View Details <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
