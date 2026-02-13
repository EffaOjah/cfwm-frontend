import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo-main.png';
import './Footer.css';

const Footer = () => {
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
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Your email address" />
                        <button type="submit" className="btn btn-primary btn-sm">Join</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom container">
                <p>&copy; {new Date().getFullYear()} Christ For The World Mission Int'l. All rights reserved.</p>
                <div className="policy-links">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Use</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
