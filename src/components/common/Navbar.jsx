import { useState, useEffect } from 'react';
import { Menu, X, Facebook, Instagram, Youtube, ChevronDown, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import logoImg from '../../assets/logo-main.png';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isChurchOpen, setIsChurchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  // Pages with hero headers that should have transparent nav initially
  const isTransparentNav = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/about/overseer' || location.pathname === '/livestream' || location.pathname === '/give' || location.pathname === '/store' || location.pathname === '/resources/sermons' || location.pathname === '/resources/forms' || location.pathname === '/resources/locate' || location.pathname === '/resources/testimonies' || location.pathname === '/contact' || location.pathname === '/apapro' || location.pathname === '/cart' || location.pathname === '/checkout' || location.pathname.startsWith('/resources/events');
  const isLightNav = !isTransparentNav;

  // Pages that are transparent but over a light background (need dark text initially)
  const isDarkTextNav = location.pathname === '/cart' || location.pathname === '/checkout';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
    return () => document.body.classList.remove('body-no-scroll');
  }, [isOpen]);

  return (
    <nav className={`navbar ${isLightNav ? 'navbar-light' : ''} ${isScrolled ? 'scrolled' : ''} ${isDarkTextNav && !isScrolled ? 'navbar-dark-text' : ''}`}>
      <div className="container nav-container">
        {/* Logo Left */}
        <Link to="/" className="brand-logo">
          <img src={logoImg} alt="CFWM" className="nav-logo-img" />
        </Link>

        {/* Desktop Menu - Centered & Uppercase as per reference */}
        <div className="nav-links hidden md:flex">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>HOME</Link>
          <Link to="/livestream" className={`highlight-link ${location.pathname === '/livestream' ? 'active' : ''}`}>LIVESTREAM</Link>
          <Link to="/give" className={location.pathname === '/give' ? 'active' : ''}>GIVE</Link>
          <div className="nav-item dropdown">
            <Link to="/about" className={`nav-link ${location.pathname.startsWith('/about') ? 'active' : ''}`}>THE CHURCH <ChevronDown size={14} className="dropdown-icon" /></Link>
            <div className="dropdown-menu">
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>ABOUT US</Link>
              <Link to="/about/overseer" className={location.pathname === '/about/overseer' ? 'active' : ''}>GENERAL OVERSEER</Link>
            </div>
          </div>
          <Link to="/store" className={location.pathname === '/store' ? 'active' : ''}>STORE</Link>

          <div className="nav-item dropdown">
            <span className={`nav-link ${location.pathname.startsWith('/resources') ? 'active' : ''}`}>RESOURCES <ChevronDown size={14} className="dropdown-icon" /></span>
            <div className="dropdown-menu">
              <Link to="/resources/events" className={location.pathname === '/resources/events' ? 'active' : ''}>EVENTS</Link>
              <Link to="/resources/testimonies" className={location.pathname === '/resources/testimonies' ? 'active' : ''}>TESTIMONIES</Link>
              <Link to="/resources/sermons" className={location.pathname === '/resources/sermons' ? 'active' : ''}>SERMONS</Link>
              <Link to="/resources/locate" className={location.pathname === '/resources/locate' ? 'active' : ''}>LOCATE CHURCH</Link>
              <Link to="/resources/forms" className={location.pathname === '/resources/forms' ? 'active' : ''}>FORMS</Link>
            </div>
          </div>
          <Link to="/apapro" className={location.pathname === '/apapro' ? 'active' : ''}>APAPRO</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>CONTACT</Link>
        </div>

        {/* Social Icons Right */}
        <div className="nav-actions hidden md:flex">
          <div className="nav-cart-action">
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="nav-cart-count">{cartCount}</span>}
            </Link>
          </div>
          <a href="https://facebook.com/CFWMinternational" target="_blank" rel="noreferrer" className="social-icon facebook-icon"><Facebook size={18} /></a>
          <a href="https://instagram.com/christfortheworldmission" target="_blank" rel="noreferrer" className="social-icon instagram-icon"><Instagram size={18} /></a>
          <a href="#" className="social-icon youtube-icon"><Youtube size={18} /></a>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu md:hidden">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsOpen(false)}>HOME</Link>
          <Link to="/livestream" className={location.pathname === '/livestream' ? 'active' : ''} onClick={() => setIsOpen(false)}>LIVESTREAM</Link>
          <Link to="/give" className={location.pathname === '/give' ? 'active' : ''} onClick={() => setIsOpen(false)}>GIVE</Link>
          <div className="mobile-nav-item">
            <button
              className={`mobile-nav-link ${location.pathname.startsWith('/about') ? 'active' : ''}`}
              onClick={() => setIsChurchOpen(!isChurchOpen)}
            >
              THE CHURCH <ChevronDown size={16} style={{ transform: isChurchOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
            </button>
            {isChurchOpen && (
              <div className="mobile-submenu">
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => setIsOpen(false)}>About Us</Link>
                <Link to="/about/overseer" className={location.pathname === '/about/overseer' ? 'active' : ''} onClick={() => setIsOpen(false)}>General Overseer</Link>
              </div>
            )}
          </div>
          <Link to="/store" className={location.pathname === '/store' ? 'active' : ''} onClick={() => setIsOpen(false)}>STORE</Link>

          {/* Resources Accordion for Mobile */}
          <div className="mobile-nav-item">
            <button
              className={`mobile-nav-link ${location.pathname.startsWith('/resources') ? 'active' : ''}`}
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              RESOURCES <ChevronDown size={16} style={{ transform: isResourcesOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
            </button>
            {isResourcesOpen && (
              <div className="mobile-submenu">
                <Link to="/resources/events" className={location.pathname === '/resources/events' ? 'active' : ''} onClick={() => setIsOpen(false)}>EVENTS</Link>
                <Link to="/resources/testimonies" className={location.pathname === '/resources/testimonies' ? 'active' : ''} onClick={() => setIsOpen(false)}>TESTIMONIES</Link>
                <Link to="/resources/sermons" className={location.pathname === '/resources/sermons' ? 'active' : ''} onClick={() => setIsOpen(false)}>SERMONS</Link>
                <Link to="/resources/locate" className={location.pathname === '/resources/locate' ? 'active' : ''} onClick={() => setIsOpen(false)}>LOCATE CHURCH</Link>
                <Link to="/resources/forms" className={location.pathname === '/resources/forms' ? 'active' : ''} onClick={() => setIsOpen(false)}>FORMS</Link>
              </div>
            )}
          </div>

          <Link to="/apapro" className={location.pathname === '/apapro' ? 'active' : ''} onClick={() => setIsOpen(false)}>APAPRO</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={() => setIsOpen(false)}>CONTACT</Link>

          <div className="mobile-actions">
            <Link to="/cart" className={`mobile-cart-icon-btn ${location.pathname === '/cart' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              <div className="relative">
                <ShoppingCart size={24} />
                {cartCount > 0 && <span className="nav-cart-count">{cartCount}</span>}
              </div>
            </Link>
            <div className="mobile-socials">
              <a href="https://facebook.com/CFWMinternational" target="_blank" rel="noreferrer" className="social-icon facebook-icon"><Facebook size={24} /></a>
              <a href="https://instagram.com/christfortheworldmission" target="_blank" rel="noreferrer" className="social-icon instagram-icon"><Instagram size={24} /></a>
              <a href="#" className="social-icon youtube-icon"><Youtube size={24} /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
