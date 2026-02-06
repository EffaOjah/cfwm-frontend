import { MapPin, Clock, Phone, Mail, ArrowRight } from 'lucide-react';
import './DirectionsSection.css';

const DirectionsSection = () => {
    return (
        <section className="section-directions">
            <div className="container">
                <div className="directions-grid">
                    <div className="directions-content" data-aos="fade-right">
                        <span className="directions-label">JOIN US THIS SUNDAY</span>
                        <h2 className="directions-title">Find Your Way Home</h2>
                        <div className="directions-divider"></div>
                        <p className="directions-desc">
                            We can't wait to welcome you! Join us for a life-changing experience in God's presence.
                        </p>

                        <div className="info-cards">
                            <div className="info-card">
                                <MapPin className="info-icon" size={24} />
                                <div>
                                    <h4>Location</h4>
                                    <p>38, Abasi Obori Street, Off Uwanse Street, Calabar, Cross River State.</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <Clock className="info-icon" size={24} />
                                <div>
                                    <h4>Service Times</h4>
                                    <p>Sundays: 8:00 AM (Sunday School) & 9:00 AM (Main Service)</p>
                                    <p>Tuesdays: 4:45 PM (Bible Study)</p>
                                    <p>Wednesdays: 9:00 AM (Family Outreach)</p>
                                    <p>Fridays: 4:45 PM (Miracle & Healing Service)</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <Phone className="info-icon" size={24} />
                                <div>
                                    <h4>Contact</h4>
                                    <p>+234 812 345 6789</p>
                                </div>
                            </div>
                        </div>

                        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn btn-red-pill mt-4">
                            Get Directions <ArrowRight size={18} />
                        </a>
                    </div>

                    <div className="directions-visuals" data-aos="fade-left">
                        <div className="map-wrapper">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.660195379657!2d6.9608!3d4.8315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDknNTMuNCJOIDbCsDU3JzM4LjkiRQ!5e0!3m2!1sen!2sng!4v1600000000000!5m2!1sen!2sng"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DirectionsSection;
