import { Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './TestimonySection.css';

const TestimonySection = () => {
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
        }
    ];

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
                    {testimonies.map((testimony, idx) => (
                        <div key={testimony.id} className="testimony-card" data-aos="fade-up" data-aos-delay={idx * 100}>
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
                            </div>
                        </div>
                    ))}
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
