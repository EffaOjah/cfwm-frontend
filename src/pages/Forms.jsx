import React, { useEffect } from 'react';
import { Send, Upload, User, Mail, Phone, MapPin, MessageSquare, Heart } from 'lucide-react';
import './Forms.css';
import formsHero from '../assets/worship-hero.png';
import firstTimerImg from '../assets/mini_magick20260131-14148-649whl.jpg';
import testimonyImg from '../assets/mini_magick20260131-13418-mb0hlp.jpg';
import prayerImg from '../assets/mini_magick20260131-13418-u6grhx.jpg';

const Forms = () => {
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

    return (
        <div className="forms-page">
            {/* Hero Section */}
            <div className="forms-hero" style={{ backgroundImage: `url(${formsHero})` }}>
                <div className="forms-hero-overlay"></div>
                <div className="forms-hero-content">
                    <h1 data-aos="fade-up">Connect With Us</h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Join our family, share your testimonies, and let us pray with you.
                    </p>
                </div>
            </div>

            <div className="forms-container container">

                {/* First Timer Section */}
                <div className="form-section">
                    <div className="form-visual" data-aos="fade-right">
                        <img src={firstTimerImg} alt="First Timer Welcome" />
                    </div>
                    <div className="form-content" data-aos="fade-left">
                        <div className="section-header">
                            <h2>First Timer</h2>
                            <p className="form-subtitle">
                                We are delighted to have you! Please fill out this form so we can connect with you.
                            </p>
                        </div>
                        <form>
                            <div className="form-group">
                                <label><User size={18} /> Full Name</label>
                                <input type="text" placeholder="Enter your full name" />
                            </div>

                            <div className="form-row">
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label><Phone size={18} /> Phone Number</label>
                                    <input type="tel" placeholder="+234..." />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label><Mail size={18} /> Email Address</label>
                                    <input type="email" placeholder="email@example.com" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label><MapPin size={18} /> Residential Address</label>
                                <textarea rows="2" placeholder="Where do you stay?"></textarea>
                            </div>

                            <div className="form-checkbox">
                                <label>
                                    <input type="checkbox" />
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
                            <h2>Share Testimony</h2>
                            <p className="form-subtitle">
                                "They overcame him by the blood of the Lamb and by the word of their testimony."
                            </p>
                        </div>
                        <form>
                            <div className="form-group">
                                <label><User size={18} /> Full Name</label>
                                <input type="text" placeholder="Enter your name" />
                            </div>

                            <div className="form-group">
                                <label><MessageSquare size={18} /> Testimony Title</label>
                                <input type="text" placeholder="What did God do?" />
                            </div>

                            <div className="form-group">
                                <label>Describe Your Testimony</label>
                                <textarea rows="5" placeholder="Share the details of your testimony here..."></textarea>
                            </div>

                            <div className="form-group">
                                <label><Upload size={18} /> Upload Image (Optional)</label>
                                <div className="file-input-wrapper">
                                    <div className="file-placeholder">
                                        <span>Click to upload supporting image/document</span>
                                    </div>
                                    <input type="file" />
                                </div>
                            </div>

                            <div className="form-checkbox">
                                <label>
                                    <input type="checkbox" />
                                    <span>I give permission to share this testimony publicly</span>
                                </label>
                            </div>

                            <button type="submit" className="btn-submit">
                                Share Testimony <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Prayer Request Section */}
                <div className="form-section">
                    <div className="form-visual" data-aos="fade-right">
                        <img src={prayerImg} alt="Prayer Request" />
                    </div>
                    <div className="form-content" data-aos="fade-left">
                        <div className="section-header">
                            <h2>Prayer Request</h2>
                            <p className="form-subtitle">
                                We believe in the power of prayer. Let us stand in faith with you.
                            </p>
                        </div>
                        <form>
                            <div className="form-row">
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label><User size={18} /> Name</label>
                                    <input type="text" placeholder="Your name (Optional)" />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label><Phone size={18} /> Phone</label>
                                    <input type="tel" placeholder="Your phone number" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label><Heart size={18} /> Prayer Topic</label>
                                <select>
                                    <option>General Prayer</option>
                                    <option>Healing</option>
                                    <option>Financial Breakthrough</option>
                                    <option>Family & Relationships</option>
                                    <option>Spiritual Growth</option>
                                    <option>Deliverance</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Prayer Details</label>
                                <textarea rows="5" placeholder="How can we pray for you?"></textarea>
                            </div>

                            <button type="submit" className="btn-submit">
                                Send Prayer Request <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Forms;
