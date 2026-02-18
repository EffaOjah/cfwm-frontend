import React, { useState, useEffect } from 'react';
import { Quote, Send, ArrowRight, Heart, Star, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Testimonies.css';
import testimoniesHero from '../assets/testimonies-hero.png';

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

const Testimonies = () => {
    const [testimonies, setTestimonies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic'
        });

        const fetchTestimonies = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/testimonies`);
                if (!res.ok) throw new Error('Failed to fetch testimonies');
                const data = await res.json();
                setTestimonies(data);
            } catch (err) {
                console.error('Testimonies page fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonies();
    }, []);

    const skeletons = Array(6).fill(null);

    return (
        <div className="testimonies-page">
            {/* Hero Section */}
            <section className="testimonies-hero" style={{ backgroundImage: `url(${testimoniesHero})` }}>
                <div className="hero-overlay"></div>
                <div className="container hero-content" data-aos="zoom-out">
                    <span className="hero-tag">COULD IT BE GOD?</span>
                    <h1>Voices of <span className="text-highlight">Victory</span></h1>
                    <p className="hero-subtitle">
                        Every testimony is a weapon against the enemy and a pointer to what God can do for you.
                    </p>
                </div>
            </section>

            {/* Testimonies Grid */}
            <section className="testimonies-grid-section">
                <div className="container">
                    <div className="section-intro text-center" data-aos="fade-up">
                        <h2 className="section-title">Miracles in Our Midst</h2>
                        <p className="section-desc">
                            Explore the documented evidence of God's power at Christ For The World Mission.
                        </p>
                    </div>

                    <div className="testimonies-grid">
                        {loading ? (
                            skeletons.map((_, i) => (
                                <div key={i} className="testimony-card" style={{ opacity: 0.5 }} data-aos="fade-up" data-aos-delay={i * 50}>
                                    <div className="quote-icon-wrapper">
                                        <Quote size={24} className="quote-icon" />
                                    </div>
                                    <div style={{ height: '5rem', background: '#e2e8f0', borderRadius: '8px', marginBottom: '1.5rem' }} />
                                    <div style={{ height: '1.25rem', background: '#e2e8f0', borderRadius: '4px', width: '60%' }} />
                                </div>
                            ))
                        ) : testimonies.length === 0 ? (
                            <div className="no-events" style={{ gridColumn: '1/-1' }}>
                                <Filter size={48} />
                                <h3>No testimonies found</h3>
                                <p>Be the first to share what God has done in your life!</p>
                            </div>
                        ) : (
                            testimonies.map((testimony, index) => {
                                const color = nameToColor(testimony.name);
                                const initials = getInitials(testimony.name);
                                return (
                                    <div
                                        className="testimony-card"
                                        key={testimony.id}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 50}
                                    >
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

                    {/* CTA Section */}
                    <div className="share-cta-compact" data-aos="flip-up">
                        <div className="cta-content">
                            <h3>Got a Testimony?</h3>
                            <p>Don't keep the miracle to yourself. Share what God has done!</p>
                        </div>
                        <Link to="/resources/forms#testimony" className="btn btn-red-pill">
                            Share Your Story <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonies;
