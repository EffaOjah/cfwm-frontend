import { CreditCard, Building2, Smartphone, Gift, ArrowRight, Heart } from 'lucide-react';
import './Give.css';
import heroBg from '../assets/give-hero.png';
import impactImg from '../assets/give-impact.png';
import paypalLogo from '../assets/logo-paypal.png';
import flutterwaveLogo from '../assets/logo-flutterwave.png';

const Give = () => {
    return (
        <div className="give-page">
            {/* Hero Section */}
            <section className="give-hero" style={{ backgroundImage: `url(${heroBg})` }}>
                <div className="give-hero-overlay"></div>
                <div className="container give-hero-content">
                    <span className="hero-badge" data-aos="fade-down">PARTNER WITH US</span>
                    <h1 data-aos="fade-up">Generosity Changes <span className="text-highlight">Lives</span></h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Your giving empowers us to spread the gospel, support our community,
                        and make a lasting difference in the world.
                    </p>
                    <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
                        <button className="btn btn-red">Give Online Now</button>
                        <button className="btn btn-outline-white">Why We Give</button>
                    </div>
                </div>
            </section>

            {/* Ways to Give Grid */}
            <section className="ways-to-give">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Select Payment Method</h2>
                    </div>

                    <div className="giving-grid">
                        {/* Bank Transfer */}
                        <div className="give-card" data-aos="fade-up">
                            <div className="icon-wrapper">
                                <Building2 size={32} />
                            </div>
                            <h3>Bank Transfer</h3>
                            <div className="bank-details">
                                <strong>Christ For The World Mission</strong>
                                <span>Acct: 1234567890</span>
                                <span>Bank: Zenith Bank</span>
                                <div className="divider"></div>
                                <span>Acct: 0987654321</span>
                                <span>Bank: GTBank</span>
                            </div>
                        </div>

                        {/* PayPal */}
                        <div className="give-card featured" data-aos="fade-up" data-aos-delay="100">
                            <div className="logo-wrapper">
                                <img src={paypalLogo} alt="PayPal" className="platform-logo" />
                            </div>
                            <h3>PayPal Checkout</h3>
                            <p>Fast, safe payment with your PayPal account or card.</p>
                            <button className="btn btn-blue w-100">Pay with PayPal</button>
                        </div>

                        {/* Flutterwave */}
                        <div className="give-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="logo-wrapper">
                                <img src={flutterwaveLogo} alt="Flutterwave" className="platform-logo" />
                            </div>
                            <h3>Flutterwave</h3>
                            <p>Secure payments via Card, Bank Transfer, or Mobile Money.</p>
                            <button className="btn btn-red w-100">Pay with Flutterwave</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scripture Verse */}
            <section className="scripture-banner">
                <div className="container">
                    <blockquote>
                        "Give, and it will be given to you. A good measure, pressed down, shaken together
                        and running over, will be poured into your lap."
                        <cite>— Luke 6:38</cite>
                    </blockquote>
                </div>
            </section>
        </div>
    );
};

export default Give;
