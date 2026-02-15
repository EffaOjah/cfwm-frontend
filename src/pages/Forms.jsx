import React, { useEffect, useState } from 'react';
import { Send, Upload, User, Mail, Phone, MapPin, MessageSquare, Heart, Anchor, Info, PenTool } from 'lucide-react';
import './Forms.css';
import ResponseModal from '../components/admin/ResponseModal';
import formsHero from '../assets/worship-hero.png';
import firstTimerImg from '../assets/mini_magick20260131-14148-649whl.jpg';
import testimonyImg from '../assets/mini_magick20260131-13418-mb0hlp.jpg';
import prayerImg from '../assets/mini_magick20260131-13418-u6grhx.jpg';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const Forms = () => {
    // Form States
    const [firstTimerData, setFirstTimerData] = useState({
        full_name: '',
        phone: '',
        email: '',
        address: '',
        wants_visit: false
    });

    const [testimonyData, setTestimonyData] = useState({
        name: '',
        content: '',
        permission: false
    });

    const [prayerData, setPrayerData] = useState({
        name: '',
        phone: '',
        topic: '',
        request_details: ''
    });

    // Response Modal State
    const [responseModal, setResponseModal] = useState({
        isOpen: false,
        type: 'success',
        title: '',
        message: ''
    });

    const showResponse = (type, title, message) => {
        setResponseModal({ isOpen: true, type, title, message });
    };

    const handleFirstTimerSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/forms/first-timer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(firstTimerData)
            });
            if (!response.ok) throw new Error('Failed to submit details');
            showResponse('success', 'Submitted!', 'Welcome to the family! We will get in touch with you soon.');
            setFirstTimerData({ full_name: '', phone: '', email: '', address: '', wants_visit: false });
        } catch (err) {
            showResponse('error', 'Submission Failed', err.message);
        }
    };

    const handleTestimonySubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/testimonies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: testimonyData.name,
                    content: testimonyData.content
                })
            });
            if (!response.ok) throw new Error('Failed to share testimony');
            showResponse('success', 'Praise God!', 'Thank you for sharing your testimony. It has been received.');
            setTestimonyData({ name: '', content: '', permission: false });
        } catch (err) {
            showResponse('error', 'Submission Failed', err.message);
        }
    };

    const handlePrayerSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/forms/prayer-request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prayerData)
            });
            if (!response.ok) throw new Error('Failed to send request');
            showResponse('success', 'Sent!', 'Your prayer request has been received. We are standing in faith with you.');
            setPrayerData({ name: '', phone: '', topic: '', request_details: '' });
        } catch (err) {
            showResponse('error', 'Submission Failed', err.message);
        }
    };

    useEffect(() => {
        // Scroll to hash on load
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 140; // Offset for sticky nav
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    return (
        <div className="forms-page">
            {/* Hero Section */}
            <div className="forms-hero" style={{ backgroundImage: `url(${formsHero})` }}>
                <div className="forms-hero-overlay"></div>
                <div className="forms-hero-content">
                    <h1 data-aos="zoom-out">Connect With Us</h1>
                    <p data-aos="fade-up" data-aos-delay="200">
                        Join our family, share your testimonies, and let us pray with you.
                    </p>
                </div>
            </div>

            {/* Quick Navigation */}
            <div className="forms-quick-nav">
                <a href="#first-timer" className="quick-nav-link" onClick={(e) => scrollToSection(e, 'first-timer')}>
                    <User /> <span>First Timer</span>
                </a>
                <a href="#testimony" className="quick-nav-link" onClick={(e) => scrollToSection(e, 'testimony')}>
                    <PenTool /> <span>Share Testimony</span>
                </a>
                <a href="#prayer" className="quick-nav-link" onClick={(e) => scrollToSection(e, 'prayer')}>
                    <Heart /> <span>Prayer Request</span>
                </a>
            </div>

            <div className="forms-container container">

                {/* First Timer Section */}
                <div id="first-timer" className="form-section">
                    <div className="form-visual" data-aos="fade-right">
                        <img src={firstTimerImg} alt="First Timer Welcome" />
                    </div>
                    <div className="form-content" data-aos="fade-left">
                        <div className="section-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                                <Anchor size={20} />
                                <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Join The Family</span>
                            </div>
                            <h2>First Timer</h2>
                            <p className="form-subtitle">
                                We are delighted to have you! Please fill out this form so we can connect with you.
                            </p>
                        </div>
                        <form onSubmit={handleFirstTimerSubmit}>
                            <div className="form-group">
                                <label><User size={18} /> Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    required
                                    value={firstTimerData.full_name}
                                    onChange={(e) => setFirstTimerData({ ...firstTimerData, full_name: e.target.value })}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label><Phone size={18} /> Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+234..."
                                        required
                                        value={firstTimerData.phone}
                                        onChange={(e) => setFirstTimerData({ ...firstTimerData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><Mail size={18} /> Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        required
                                        value={firstTimerData.email}
                                        onChange={(e) => setFirstTimerData({ ...firstTimerData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label><MapPin size={18} /> Residential Address</label>
                                <textarea
                                    rows="3"
                                    placeholder="Where do you stay?"
                                    value={firstTimerData.address}
                                    onChange={(e) => setFirstTimerData({ ...firstTimerData, address: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="form-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={firstTimerData.wants_visit}
                                        onChange={(e) => setFirstTimerData({ ...firstTimerData, wants_visit: e.target.checked })}
                                    />
                                    <span>I would like a pastoral visit</span>
                                </label>
                            </div>

                            <button type="submit" className="btn-submit">
                                Submit Details <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Testimony Section */}
                <div id="testimony" className="form-section reverse">
                    <div className="form-visual" data-aos="fade-left">
                        <img src={testimonyImg} alt="Share Testimony" />
                    </div>
                    <div className="form-content" data-aos="fade-right">
                        <div className="section-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                                <PenTool size={20} />
                                <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>God's Doings</span>
                            </div>
                            <h2>Share Testimony</h2>
                            <p className="form-subtitle">
                                "They overcame him by the blood of the Lamb and by the word of their testimony."
                            </p>
                        </div>
                        <form onSubmit={handleTestimonySubmit}>
                            <div className="form-group">
                                <label><User size={18} /> Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    required
                                    value={testimonyData.name}
                                    onChange={(e) => setTestimonyData({ ...testimonyData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label><MessageSquare size={18} /> Shared Testimony</label>
                                <textarea
                                    rows="8"
                                    placeholder="Tell us what God has done for you..."
                                    required
                                    value={testimonyData.content}
                                    onChange={(e) => setTestimonyData({ ...testimonyData, content: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="form-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={testimonyData.permission}
                                        onChange={(e) => setTestimonyData({ ...testimonyData, permission: e.target.checked })}
                                    />
                                    <span>I give permission to share this testimony publicly</span>
                                </label>
                            </div>

                            <button type="submit" className="btn-submit" disabled={!testimonyData.permission}>
                                Share Testimony <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Prayer Request Section */}
                <div id="prayer" className="form-section">
                    <div className="form-visual" data-aos="fade-right">
                        <img src={prayerImg} alt="Prayer Request" />
                    </div>
                    <div className="form-content" data-aos="fade-left">
                        <div className="section-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                                <Heart size={20} />
                                <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Faith Works</span>
                            </div>
                            <h2>Prayer Request</h2>
                            <p className="form-subtitle">
                                We believe in the power of prayer. Let us stand in faith with you.
                            </p>
                        </div>
                        <form onSubmit={handlePrayerSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label><User size={18} /> Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name (Optional)"
                                        value={prayerData.name}
                                        onChange={(e) => setPrayerData({ ...prayerData, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><Phone size={18} /> Phone</label>
                                    <input
                                        type="tel"
                                        placeholder="Your phone number"
                                        required
                                        value={prayerData.phone}
                                        onChange={(e) => setPrayerData({ ...prayerData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label><Info size={18} /> Prayer Topic</label>
                                <select
                                    required
                                    value={prayerData.topic}
                                    onChange={(e) => setPrayerData({ ...prayerData, topic: e.target.value })}
                                >
                                    <option value="">Select a topic</option>
                                    <option value="General Prayer">General Prayer</option>
                                    <option value="Healing">Healing</option>
                                    <option value="Financial Breakthrough">Financial Breakthrough</option>
                                    <option value="Family & Relationships">Family & Relationships</option>
                                    <option value="Spiritual Growth">Spiritual Growth</option>
                                    <option value="Deliverance">Deliverance</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Prayer Details</label>
                                <textarea
                                    rows="6"
                                    placeholder="How can we pray for you?"
                                    required
                                    value={prayerData.request_details}
                                    onChange={(e) => setPrayerData({ ...prayerData, request_details: e.target.value })}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-submit">
                                Send Prayer Request <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>

            </div>

            <ResponseModal
                isOpen={responseModal.isOpen}
                onClose={() => setResponseModal(prev => ({ ...prev, isOpen: false }))}
                type={responseModal.type}
                title={responseModal.title}
                message={responseModal.message}
            />
        </div>
    );
};

export default Forms;
