import { useState } from 'react';
import { Play, Mic, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PapasDesk.css';

const PapasDesk = () => {
    const [activeTab, setActiveTab] = useState('video');
    return (
        <section className="section-papas-desk">
            <div className="container">
                <div className="desk-header text-center" data-aos="fade-up">
                    <span className="desk-label">MONTHLY PODCAST</span>
                    <h2 className="desk-title">From Papa's Desk</h2>
                    <div className="desk-divider"></div>
                    <p className="desk-description">
                        Receive life-transforming wisdom and prophetic declarations directly from the General Overseer.
                    </p>
                </div>

                <div className="desk-tabs">
                    <button
                        className={`desk-tab ${activeTab === 'video' ? 'active' : ''}`}
                        onClick={() => setActiveTab('video')}
                    >
                        <Play size={18} /> Video Message
                    </button>
                    <button
                        className={`desk-tab ${activeTab === 'audio' ? 'active' : ''}`}
                        onClick={() => setActiveTab('audio')}
                    >
                        <Mic size={18} /> Audio Podcast
                    </button>
                </div>

                <div className="media-content-area" data-aos="zoom-in">
                    {activeTab === 'video' ? (
                        <div className="video-container-wrapper fade-in">
                            <div className="video-frame">
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed/vqIMoC957ic?si=069qxTorSpaxhaEF"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ) : (
                        <div className="audio-container-wrapper fade-in">
                            <iframe
                                style={{ borderRadius: '12px' }}
                                src="https://open.spotify.com/embed/episode/1Fd7TQilvyNbkZvNd1jdgy?utm_source=generator"
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        </div>
                    )}
                </div>

                <div className="desk-footer">
                    <Link to="/resources/sermons" className="btn btn-red-pill">
                        All Sermons <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PapasDesk;
