import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import experienceGodImg from '../../assets/experience-god.jpg';
import './WelcomeSection.css';

const WelcomeSection = () => {
    return (
        <section className="section-welcome">
            <div className="container welcome-grid">
                <div className="welcome-image-col" data-aos="fade-right">
                    <img
                        src={experienceGodImg}
                        alt="Experience God"
                        className="pastor-img"
                    />
                    <div className="dot-pattern"></div>
                </div>

                <div className="welcome-text-col" data-aos="fade-left">
                    <div className="small-heading"> — WELCOME MESSAGE</div>
                    <h2 className="big-heading">
                        Experience God Here!
                    </h2>
                    <div className="red-divider"></div>
                    <p className="welcome-body">
                        To reign in life, the Kingdom of God must be at work in you.
                        We are dedicated to teaching you how to walk in dominion and
                        live a victorious life through the power of God's Word.
                    </p>

                    <Link to="/about" className="btn btn-red-pill">
                        Read More <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default WelcomeSection;
