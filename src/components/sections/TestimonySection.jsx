import { useState, useEffect } from 'react';
import { Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './TestimonySection.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Generate a consistent colour from a name string
const nameToColor = (name = '') => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name = '') =>
    name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

const TestimonySection = () => {
    const [testimonies, setTestimonies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonies = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/testimonies`);
                if (!res.ok) throw new Error('Failed to fetch testimonies');
                const data = await res.json();
                // Show only the 3 most recent approved testimonies
                setTestimonies(data.slice(0, 3));
            } catch (err) {
                console.error('TestimonySection fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonies();
    }, []);

    const skeletons = Array(3).fill(null);

    return (
        <section className="section-testimony">
            <div className="container">
                <div className="testimony-header text-center" data-aos="fade-down">
                    <span className="testimony-label">TESTIMONIES</span>
                    <h2 className="testimony-title">Voices of Victory</h2>
                    <div className="testimony-divider"></div>
                    <p className="testimony-desc">
                        Real stories of God's transforming power in the lives of His people.
                    </p>
                </div>

                <div className="testimony-grid">
                    {loading ? (
                        skeletons.map((_, i) => (
                            <div key={i} className="testimony-card" style={{ opacity: 0.5 }} data-aos="fade-up" data-aos-delay={i * 100}>
                                <div className="quote-icon-wrapper">
                                    <Quote size={24} className="quote-icon" />
                                </div>
                                <div style={{ height: '4rem', background: '#e2e8f0', borderRadius: '8px', marginBottom: '1rem' }} />
                                <div style={{ height: '1rem', background: '#e2e8f0', borderRadius: '4px', width: '40%' }} />
                            </div>
                        ))
                    ) : testimonies.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#64748b', gridColumn: '1/-1', padding: '2rem 0' }}>
                            No testimonies yet. Be the first to share!
                        </p>
                    ) : (
                        testimonies.map((testimony, idx) => {
                            const color = nameToColor(testimony.name);
                            const initials = getInitials(testimony.name);
                            return (
                                <div key={testimony.id} className="testimony-card" data-aos="fade-up" data-aos-delay={idx * 100}>
                                    <div className="quote-icon-wrapper">
                                        <Quote size={24} className="quote-icon" />
                                    </div>
                                    <p className="testimony-text">"{testimony.content}"</p>
                                    <div className="testimony-author">
                                        <div
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                background: `${color}20`,
                                                color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700,
                                                fontSize: '0.85rem',
                                                flexShrink: 0,
                                                border: `2px solid ${color}40`
                                            }}
                                        >
                                            {initials}
                                        </div>
                                        <div className="author-info">
                                            <h4 className="author-name">— {testimony.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="testimony-footer text-center">
                    <Link to="/resources/testimonies" className="btn btn-red-pill me-3">
                        View All Testimonies <ArrowRight size={18} />
                    </Link>
                    <Link to="/resources/forms#testimony" className="btn btn-outline-red">
                        Share Your Testimony
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TestimonySection;
