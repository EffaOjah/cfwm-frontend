import { useState } from 'react';
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo-main.png';
import './Footer.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message);
                setEmail('');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setMessage(data.message || 'Something went wrong.');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            setStatus('error');
            setMessage('Network error. Please try again.');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <footer className="site-footer">
            <div className="container footer-grid">
                <div className="footer-col brand-col">
                    <Link to="/" className="footer-brand-logo">
                        <img src={logoImg} alt="CFWM Logo" />
                    </Link>
                    <p className="footer-desc">
                        Christ For The World Mission Int'l<br />
                        (Jesus Power House)<br /><br />
                        Raising a generation of champions, empowered by the Word and Spirit for global impact.
                    </p>
                    <div className="social-links">
                        <a href="https://facebook.com/CFWMinternational" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-social facebook-icon"><Facebook size={20} /></a>
                        <a href="https://instagram.com/christfortheworldmission" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-social instagram-icon"><Instagram size={20} /></a>
                        <a href="#" aria-label="YouTube" className="footer-social youtube-icon"><Youtube size={20} /></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/about/overseer">General Overseer</Link></li>
                        <li><Link to="/resources/sermons">Sermons</Link></li>
                        <li><Link to="/resources/events">Events</Link></li>
                        <li><Link to="/resources/testimonies">Testimonies</Link></li>
                        <li><Link to="/resources/locate">Find a Church</Link></li>
                        <li><Link to="/give">Give Online</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contact & Visit</h4>
                    <ul className="footer-contact">
                        <li>
                            <MapPin size={18} className="contact-icon" />
                            <span>38 Abasi Obori Street,<br />Calabar, Cross River State</span>
                        </li>
                        <li>
                            <Phone size={18} className="contact-icon" />
                            <span>(555) 123-4567</span>
                        </li>
                        <li>
                            <Mail size={18} className="contact-icon" />
                            <span>info@cfwm.org</span>
                        </li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Stay Connected</h4>
                    <p className="newsletter-text">Subscribe to our weekly newsletter for updates and inspiration.</p>
                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={status === 'loading'}
                        />
                        <button
                            type="submit"
                            className={`btn btn-primary btn-sm ${status === 'loading' ? 'loading' : ''}`}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Join'}
                        </button>
                        {status === 'success' && (
                            <div className="newsletter-feedback success">
                                <CheckCircle2 size={14} />
                                <span>{message}</span>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="newsletter-feedback error">
                                <AlertCircle size={14} />
                                <span>{message}</span>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <div className="footer-bottom container">
                <p>&copy; {new Date().getFullYear()} Christ For The World Mission Int'l. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
