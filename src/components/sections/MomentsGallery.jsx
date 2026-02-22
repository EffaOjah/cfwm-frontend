import { Instagram, Facebook } from 'lucide-react';
import moment1 from '../../assets/moment1.png';
import moment2 from '../../assets/moment2.jpg';
import moment3 from '../../assets/moment3.jpg';
import moment4 from '../../assets/moment4.png';
import moment5 from '../../assets/moment5.jpg';
import moment6 from '../../assets/moment6.jpg';
import './MomentsGallery.css';

const MomentsGallery = () => {
    // Mock gallery images
    // Simulating a social feed
    const moments = [
        { img: moment1, type: 'instagram', link: 'https://instagram.com/christfortheworldmission' },
        { img: moment2, type: 'facebook', link: 'https://facebook.com/CFWMinternational' },
        { img: moment3, type: 'instagram', link: 'https://instagram.com/christfortheworldmission' },
        { img: moment4, type: 'facebook', link: 'https://facebook.com/CFWMinternational' },
        { img: moment5, type: 'instagram', link: 'https://instagram.com/christfortheworldmission' },
        { img: moment6, type: 'facebook', link: 'https://facebook.com/CFWMinternational' }
    ];

    return (
        <section className="section-moments">
            <div className="container">
                <div className="moments-header" data-aos="fade-up">
                    <h2 className="moments-title">Follow Us @CFWM</h2>
                    <div className="moments-divider"></div>
                    <p className="moments-subtitle">Stay connected with our latest moments on social media.</p>
                </div>

                <div className="moments-grid">
                    {moments.map((item, idx) => (
                        <a href={item.link} target="_blank" rel="noreferrer" key={idx} className="moment-item" data-aos="zoom-in" data-aos-delay={idx * 50}>
                            <img src={item.img} alt={`Social Moment ${idx + 1}`} />
                            <div className="moment-overlay">
                                {item.type === 'instagram' ? <Instagram size={32} /> : <Facebook size={32} />}
                            </div>
                        </a>
                    ))}
                </div>

                <div className="centered-btn-wrapper">
                    <a href="https://instagram.com/christfortheworldmission" target="_blank" rel="noreferrer" className="btn btn-outline-dark">
                        View More on Instagram
                    </a>
                </div>
            </div>
        </section>
    );
};

export default MomentsGallery;
