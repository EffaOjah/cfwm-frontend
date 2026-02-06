import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            {/* Background Grid Collage - mimicking the reference */}
            <div className="hero-bg-grid">
                <div className="grid-item item-1"></div>
                <div className="grid-item item-2"></div>
                <div className="grid-item item-3"></div>
                <div className="grid-item item-4"></div>
                <div className="grid-item item-5"></div>
            </div>

            <div className="hero-overlay-dark"></div>

            <div className="container hero-content-center" data-aos="fade-up">
                <h1 className="hero-heading">
                    Welcome to <br />
                    <span className="church-name">Christ For The World Mission Inc.</span>
                    <span className="tagline">(Jesus Power House)</span>
                </h1>

                <div className="hero-buttons">
                    <Link to="/livestream" className="btn btn-red">
                        Livestream
                    </Link>
                    <Link to="/give" className="btn btn-outline-pill">
                        Give Online
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
