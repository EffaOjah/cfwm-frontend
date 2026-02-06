import './FaithWalk.css';
import { ArrowRight } from 'lucide-react';

const FaithWalk = () => {
    const steps = [
        { title: 'New Member', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop' },
        { title: 'Foundation', img: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2533&auto=format&fit=crop' },
        { title: 'Membership', img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2670&auto=format&fit=crop' },
        { title: 'Service', img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop' }
    ];

    return (
        <section className="section-faith-walk">
            <div className="faith-header">
                <div className="container">
                    <div className="header-content" data-aos="fade-down">
                        <h3>Your Spiritual Journey</h3>
                        <p>Take Your Next Step</p>
                    </div>
                </div>
            </div>

            <div className="container cards-container-overlap">
                <div className="walk-cards-grid">
                    {steps.map((step, index) => (
                        <div key={index} className="walk-card" data-aos="fade-up" data-aos-delay={index * 100}>
                            <img src={step.img} alt={step.title} className="card-bg" />
                            <div className="card-overlay">
                                <h4>{step.title}</h4>
                                <button className="card-btn"><ArrowRight size={20} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default FaithWalk;
