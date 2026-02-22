import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.status === 'success') {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Submit error:', err);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <header className="contact-hero">
                <div className="container" data-aos="fade-up">
                    <div className="contact-hero-content">
                        <h1>Get in Touch</h1>
                        <p>Have questions or want to connect with us? We'd love to hear from you and welcome you into our family.</p>
                    </div>
                </div>
            </header>

            <main className="container contact-container">
                <div className="contact-grid">
                    {/* Contact Info */}
                    <aside className="contact-info" data-aos="fade-right">
                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <MapPin size={28} />
                            </div>
                            <div className="contact-info-content">
                                <h3>Visit Us</h3>
                                <p>38 Abasi Obori Street,<br />Calabar, Cross River State</p>
                            </div>
                        </div>

                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <Phone size={28} />
                            </div>
                            <div className="contact-info-content">
                                <h3>Call Us</h3>
                                <p>+234 800 000 0000<br />Mon - Fri, 9:00am - 5:00pm</p>
                            </div>
                        </div>

                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <Mail size={28} />
                            </div>
                            <div className="contact-info-content">
                                <h3>Email Us</h3>
                                <p>info@cfwm.org<br />support@cfwm.org</p>
                            </div>
                        </div>

                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <MessageSquare size={28} />
                            </div>
                            <div className="contact-info-content">
                                <h3>Live Chat</h3>
                                <p>Available during service hours<br />on our social media platforms.</p>
                            </div>
                        </div>
                    </aside>

                    {/* Contact Form */}
                    <section className="contact-form-wrapper" data-aos="fade-left">
                        <h2>Send us a Message</h2>

                        {status === 'success' && (
                            <div className="contact-feedback contact-feedback--success">
                                <CheckCircle size={20} />
                                <span>Your message was sent! We'll get back to you soon.</span>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="contact-feedback contact-feedback--error">
                                <AlertCircle size={20} />
                                <span>Something went wrong. Please try again or email us directly.</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="form-grid">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group form-full">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group form-full">
                                <label htmlFor="message">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-full">
                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Sending…' : <>Send Message <Send size={18} style={{ marginLeft: '8px', display: 'inline' }} /></>}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>

                {/* Map Section */}
                <section className="contact-map-section" data-aos="zoom-in">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126846.50508930723!2d3.313627!3d6.524379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e830e0e1a6c0d!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Church Location"
                    ></iframe>
                </section>
            </main>
        </div>
    );
};

export default Contact;
