import React, { useEffect } from 'react';
import { Quote, Send, ArrowRight, Heart, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Testimonies.css';
import testimoniesHero from '../assets/testimonies-hero.png';

const Testimonies = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic'
        });
    }, []);

    const testimonies = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Member",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop",
            text: "God turned my situation around completely! After the 21 days fasting, I received a job offer I didn't even apply for. His power is real!"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Worker",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop",
            text: "I was healed of a chronic condition during the breakthrough service. The presence of God in this house is undeniable."
        },
        {
            id: 3,
            name: "Amara Okeke",
            role: "Choir Member",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=3387&auto=format&fit=crop",
            text: "My family was on the verge of breaking up, but through the counsel of Papa and the prayers of the church, we are restored and stronger than ever."
        },
        {
            id: 4,
            name: "David Adeleke",
            role: "Entrepreneur",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3387&auto=format&fit=crop",
            text: "I started my business with nothing but a prophecy from the General Overseer. Today, we employ over 50 people. God is the ultimate chairman!"
        },
        {
            id: 5,
            name: "Blessing Udoh",
            role: "Student",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=3387&auto=format&fit=crop",
            text: "I was struggling with my academics for years. After joining the youth ministry and receiving prayers, I graduated with first-class honors!"
        },
        {
            id: 6,
            name: "Emmanuel Etim",
            role: "Deacon",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3387&auto=format&fit=crop",
            text: "A miracle escaped home accident that should have been fatal. God sent His angels to preserve my life. I am a living testimony."
        },
        {
            id: 7,
            name: "Joy Williams",
            role: "Member",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3387&auto=format&fit=crop",
            text: "After 10 years of waiting, God blessed me with a beautiful baby girl. No doctor could explain it, but God did it!"
        },
        {
            id: 8,
            name: "Samuel Olatunji",
            role: "Youth Leader",
            image: "https://images.unsplash.com/photo-1506794778242-aff56d996249?q=80&w=3387&auto=format&fit=crop",
            text: "I came to CFWM broken and addicted. Today, I am clean, restored, and leading others to Christ. The grace here is transformative."
        },
        {
            id: 9,
            name: "Grace Nelson",
            role: "Worker",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3387&auto=format&fit=crop",
            text: "My promotion was blocked for years. During the 'Anointing for Level Change' service, the yoke was broken. I am now a Regional Manager."
        }
    ];

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
                        {testimonies.map((testimony, index) => (
                            <div
                                className="testimony-card"
                                key={testimony.id}
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                            >
                                <div className="quote-icon-wrapper">
                                    <Quote size={24} className="quote-icon" />
                                </div>
                                <p className="testimony-text">"{testimony.text}"</p>
                                <div className="testimony-author">
                                    <img src={testimony.image} alt={testimony.name} className="author-img" />
                                    <div className="author-info">
                                        <h4 className="author-name">{testimony.name}</h4>
                                        <span className="author-role">{testimony.role}</span>
                                    </div>
                                    <div className="verified-badge-mini">
                                        <Sparkles size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="share-cta-compact" data-aos="flip-up">
                        <div className="cta-content">
                            <h3>Got a Testimony?</h3>
                            <p>Don't keep the miracle to yourself. Share what God has done!</p>
                        </div>
                        <Link to="/resources/forms" className="btn btn-red-pill">
                            Share Your Story <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonies;
