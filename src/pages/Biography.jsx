import { useEffect } from 'react';
import { Quote, Calendar, Globe, Award, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import goHeroImg from '../assets/overseer-hero.png';
import goIntroImg from '../assets/overseer-intro.png';
import gallery1 from '../assets/gallery-1.png';
import gallery2 from '../assets/gallery-2.png';
import gallery3 from '../assets/gallery-3.png';
import './Biography.css';

const Biography = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const timelineData = [
        {
            year: "1982",
            title: "The Divine Encounter",
            description: "A young Nick Ezeh receives a profound spiritual visitation, setting the stage for a global mandate to raise champions."
        },
        {
            year: "1994",
            title: "Founding Christ For The World Mission",
            description: "With a small band of believers, the mission is officially birthed in Calabar, Nigeria, focused on atmospheric prayer and discipleship."
        },
        {
            year: "2005",
            title: "Continental Expansion",
            description: "The mission expands beyond Nigeria's borders, establishing vibrant hubs of faith across Africa and into the UK."
        },
        {
            year: "2018",
            title: "The Champion Era",
            description: "Launch of global discipleship programs designed to empower professionals, entrepreneurs, and youth for kingdom impact."
        },
        {
            year: "2024",
            title: "Digital Frontier",
            description: "Embracing technology to reach 100 million souls through digital ministry, livestreaming, and the Apapro platform."
        }
    ];

    const galleryData = [
        {
            img: gallery1,
            caption: "At the 2023 Global Champions Conference"
        },
        {
            img: gallery2,
            caption: "Speaking at a National Youth Summit"
        },
        {
            img: gallery3,
            caption: "Leading a Night of Atmospheric Prayer"
        }
    ];

    return (
        <div className="biography-page">
            {/* Elegant Hero Section */}
            <section className="bio-hero" style={{ backgroundImage: `url(${goHeroImg})` }}>
                <div className="bio-hero-overlay"></div>
                <div className="container bio-hero-content" data-aos="fade-up">
                    <span className="bio-title-tag">General Overseer</span>
                    <h1>Rev. Dr. Nick Ezeh</h1>
                    <p className="hero-subtitle">A Visionary Leader, A Spiritual Father, and A Prophet to the Nations.</p>

                    <div className="bio-hero-meta">
                        <div className="meta-item">
                            <span className="meta-number">40+</span>
                            <span className="meta-label">Years of Ministry</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-number">50+</span>
                            <span className="meta-label">Churches Founded</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-number">1M+</span>
                            <span className="meta-label">Lives Impacted</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Introduction */}
            <section className="bio-intro-section">
                <div className="container">
                    <div className="intro-grid">
                        <div className="intro-image-wrapper" data-aos="fade-right">
                            <div className="img-accent-border"></div>
                            <img
                                src={goIntroImg}
                                alt="Rev. Dr. Nick Ezeh"
                                className="bio-main-img"
                            />
                        </div>
                        <div className="intro-text" data-aos="fade-left">
                            <h2>The Heart Behind <span className="text-highlight">The Mandate</span></h2>
                            <p className="intro-lead">
                                For over four decades, Rev. Dr. Nick Ezeh has been a relentless voice for spiritual transformation and kingdom excellence.
                            </p>
                            <p>
                                His journey began with a simple yet profound surrender to the divine call. Today, he stands as the visionary behind Christ For The World Mission Inc., a ministry dedicated to raising champions who dominate their spheres of influence with the grace of God.
                            </p>
                            <p>
                                Dr. Ezeh is renowned for his insightful teaching of the Word, his commitment to intense prayer, and his fatherly heart that seeks to empower the next generation of spiritual and secular leaders.
                            </p>

                            <div className="bio-quote-card">
                                <Quote className="quote-icon" size={40} fill="currentColor" />
                                <p>"We are not just building a church; we are raising a generation of champions who will carry the fire of God to every mountain of influence in our world today."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Life & Ministry Milestones */}
            <section className="milestones-section">
                <div className="container">
                    <div className="section-header text-center" data-aos="fade-up">
                        <h2 className="section-title">Ministry <span className="text-highlight">Journey</span></h2>
                        <p>Tracing the footprints of faith across the decades.</p>
                    </div>

                    <div className="timeline">
                        {timelineData.map((item, index) => (
                            <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index} data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
                                <div className="timeline-content">
                                    <span className="timeline-year">{item.year}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Moments Gallery */}
            <section className="bio-gallery-section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2 className="section-title">Ministry <span className="text-highlight">Gallery</span></h2>
                        <p>Captured moments of grace, worship, and transformation.</p>
                    </div>

                    <div className="bio-gallery-grid">
                        {galleryData.map((item, index) => (
                            <div className="gallery-item" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                                <img src={item.img} alt={item.caption} />
                                <div className="gallery-overlay">
                                    <p>{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="bio-cta" data-aos="zoom-in">
                <div className="container">
                    <h2>Experience the <span className="text-highlight">Transformation</span></h2>
                    <p>Join us in any of our services and be part of the champion generation.</p>
                    <div className="cta-buttons">
                        <Link to="/resources/events" className="btn btn-red">View Upcoming Events</Link>
                        <Link to="/resources/sermons" className="btn btn-outline-white ml-4">Listen to Sermons</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Biography;
