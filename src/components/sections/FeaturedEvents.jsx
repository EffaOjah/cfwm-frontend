import { Calendar, Clock, ArrowRight } from 'lucide-react';
import './FeaturedEvents.css';

const FeaturedEvents = () => {
    // Mock data
    const events = [
        {
            id: 1,
            title: "21 Days of Prayer & Fasting",
            date: "Jan 10 - Jan 31",
            time: "6:00 PM Daily",
            image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2500&auto=format&fit=crop",
            category: "Spiritual Growth"
        },
        {
            id: 2,
            title: "Worship Night: Glory Reign",
            date: "Feb 14",
            time: "7:00 PM",
            image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2670&auto=format&fit=crop",
            category: "Worship"
        },
        {
            id: 3,
            title: "Community Outreach",
            date: "Feb 20",
            time: "10:00 AM",
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop",
            category: "Outreach"
        }
    ];

    return (
        <section className="section-featured-events">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Upcoming <span className="highlight-text">Events</span></h2>
                    <a href="/events" className="view-all-link">View Full Calendar <ArrowRight size={16} /></a>
                </div>

                <div className="events-grid">
                    {events.map(event => (
                        <div key={event.id} className="event-card">
                            <div className="event-image-wrapper">
                                <img src={event.image} alt={event.title} className="event-image" />
                                <span className="event-category">{event.category}</span>
                            </div>
                            <div className="event-details">
                                <h3 className="event-title">{event.title}</h3>
                                <div className="event-meta">
                                    <span className="meta-item"><Calendar size={14} /> {event.date}</span>
                                    <span className="meta-item"><Clock size={14} /> {event.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedEvents;
