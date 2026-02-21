import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const glowRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (glowRef.current) {
                const { clientX, clientY } = e;
                glowRef.current.style.setProperty('--x', `${clientX}px`);
                glowRef.current.style.setProperty('--y', `${clientY}px`);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="hero-section">
            <div className="pointer-glow" ref={glowRef}></div>
            
            <div className="hero-bg-visuals">
                <div className="visual-overlay"></div>
                <div className="hero-grid-collage">
                    <div className="grid-cell cell-1"></div>
                    <div className="grid-cell cell-2"></div>
                    <div className="grid-cell cell-3"></div>
                </div>
            </div>

            <div className="container hero-editorial-container" data-aos="zoom-out">
                <div className="editorial-content">
                    <h1 className="editorial-title">
                        <span className="weight-light">Welcome to</span>
                        <span className="weight-bold focus-text">Christ For The World</span>
                        <span className="weight-medium">Mission International</span>
                    </h1>
                    <p className="editorial-tagline">JESUS POWER HOUSE</p>

                    <div className="hero-action-group">
                        <Link to="/livestream" className="btn-cinematic primary">
                            Watch Live
                        </Link>
                        <Link to="/give" className="btn-cinematic secondary">
                            Support Mission
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
