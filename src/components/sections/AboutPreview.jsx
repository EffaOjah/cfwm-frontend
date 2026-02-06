import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AboutPreview.css';

const AboutPreview = () => {
    return (
        <section className="section-about">
            <div className="container about-grid">
                <div className="about-content">
                    <span className="sub-heading">Who We Are</span>
                    <h2 className="section-title">A Family of Faith,<br />Hope, and Love</h2>
                    <p className="about-text">
                        Celestial Family World Ministries (CFWM) is more than just a church; we are a vibrant community dedicated to raising champions who make a global impact. Founded on biblical truth and guided by the Holy Spirit, we exist to help you discover your purpose and walk in divine destiny.
                    </p>
                    <div className="about-values">
                        <div className="value-item">
                            <ChevronRight className="value-icon" />
                            <span>Rooted in Scripture</span>
                        </div>
                        <div className="value-item">
                            <ChevronRight className="value-icon" />
                            <span>Led by the Spirit</span>
                        </div>
                        <div className="value-item">
                            <ChevronRight className="value-icon" />
                            <span>Driven by Love</span>
                        </div>
                    </div>
                    <Link to="/about" className="btn btn-primary mt-4">
                        Learn More About Us <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="about-image">
                    <div className="image-stack">
                        <img
                            src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2500&auto=format&fit=crop"
                            alt="Worship Service"
                            className="img-main"
                        />
                        <div className="img-accent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;
