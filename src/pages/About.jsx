import './About.css';
import { Heart, Users, Target, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero-0.png';
import headerBg from '../assets/about-hero-user.jpg';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            {/* Header Section */}
            <section className="about-header" style={{ backgroundImage: `url(${headerBg})` }}>
                <div className="about-header-overlay"></div>
                <div className="container about-header-content">
                    <h1 data-aos="fade-up">About Us</h1>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mission-vision-section">
                <div className="container">
                    <div className="mission-vision-grid">
                        <div className="mission-card" data-aos="fade-right">
                            <div className="card-icon">
                                <Target size={28} />
                            </div>
                            <h2>Our Mission Statement</h2>
                            <p>
                                "Going to the highways with the gospel of Christ, hijacking men and women from the kingdom of hell to the kingdom of Christ, living and preserving the remnant."
                            </p>
                        </div>

                        <div className="vision-card" data-aos="fade-left">
                            <div className="card-icon">
                                <Heart size={28} />
                            </div>
                            <h2>Our Vision</h2>
                            <p>
                                Our vision is Evangelism and missions.
                                Every believer is commissioned and called - The Great Commission and the Holy Calling.
                            </p>
                            <p style={{ marginTop: '1rem', fontWeight: '600' }}>Every believer has three priestly ministries:</p>
                            <ul>
                                <li>To minister to the Lord in prayer, praise, and worship.</li>
                                <li>To minister to one another in loving relational, financial and spiritual support.</li>
                                <li>To minister to the world (unbelievers) by healing the physically and emotionally sick, casting demons and telling them the good news (1 Cor 15:1-4; Mk 16:15-16).</li>
                            </ul>
                        </div>

                        <div className="mission-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="card-icon">
                                <Book size={40} />
                            </div>
                            <h2>Our Motto</h2>
                            <p style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
                                "For the kingdom of God is not in word, but in power" (1 Cor 4:20)
                            </p>
                        </div>

                        <div className="vision-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="card-icon">
                                <Users size={40} />
                            </div>
                            <h2>Our Mandate</h2>
                            <p style={{ fontWeight: '600', marginBottom: '0.75rem' }}>"Every Believer a Minister"</p>
                            <p>
                                You do not have to be an "Ordained minister" to share the gospel. This is the privilege of every believer. All you need is to accept the honor conferred upon you as an ambassador of Christ (2 Cor 5:20).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section">
                <div className="container">
                    <div className="story-content">
                        <div className="story-text" data-aos="fade-right">
                            <h2>Our <span className="text-highlight">Story</span></h2>
                            <p className="story-intro">
                                Founded on the principles of faith, hope, and love, Christ For The World Mission Int'l
                                has been a pillar of spiritual growth and community transformation.
                            </p>
                            <p>
                                What began as a small gathering of passionate believers has grown into a vibrant
                                community of champions who are committed to living out the Great Commission.
                                Through powerful worship, life-changing messages, and genuine fellowship,
                                we have witnessed countless lives transformed by the power of God.
                            </p>
                            <p>
                                Our journey has been marked by divine encounters, miraculous breakthroughs,
                                and a relentless pursuit of God's presence. We believe that the best is yet
                                to come as we continue to fulfill our mandate to reach the world with the Gospel.
                            </p>
                        </div>
                        <div className="story-image" data-aos="fade-left">
                            <img
                                src={heroImg}
                                alt="Our Story"
                                className="full-img"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="values-section">
                <div className="container">
                    <h2 className="section-title" data-aos="fade-up">
                        Our Core <span className="text-highlight">Values</span>
                    </h2>
                    <div className="values-grid">
                        <div className="value-card" data-aos="zoom-in" data-aos-delay="0">
                            <div className="value-icon">
                                <Book />
                            </div>
                            <h3>The Word of God</h3>
                            <p>
                                We are firmly rooted in the unchanging truth of God's Word,
                                which is the foundation of our faith and practice.
                            </p>
                        </div>

                        <div className="value-card" data-aos="zoom-in" data-aos-delay="100">
                            <div className="value-icon">
                                <Heart />
                            </div>
                            <h3>Prayer & Worship</h3>
                            <p>
                                We prioritize intimate communion with God through prayer and
                                heartfelt worship, recognizing His presence as our greatest treasure.
                            </p>
                        </div>

                        <div className="value-card" data-aos="zoom-in" data-aos-delay="200">
                            <div className="value-icon">
                                <Users />
                            </div>
                            <h3>Community</h3>
                            <p>
                                We believe in the power of authentic relationships and genuine
                                fellowship, where every member is valued and supported.
                            </p>
                        </div>

                        <div className="value-card" data-aos="zoom-in" data-aos-delay="300">
                            <div className="value-icon">
                                <Target />
                            </div>
                            <h3>Excellence</h3>
                            <p>
                                We are committed to excellence in all we do, reflecting the
                                glory of God through our service and ministry.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="about-cta-section">
                <div className="container">
                    <div className="cta-content" data-aos="fade-up">
                        <h2>Join Our <span className="text-highlight">Family</span></h2>
                        <p>
                            Experience the transforming power of God's love in a community
                            that celebrates your journey and supports your growth.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/resources/forms" className="btn btn-red">Plan Your Visit</Link>
                            <Link to="/contact" className="btn btn-outline-white">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
