import { useState, useEffect, useRef } from 'react';
import { Play, Clock, MessageCircle, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Livestream.css';
import placeholderBg from '../assets/livestream-bg.png';

const Livestream = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 4, minutes: 15, seconds: 0 });
    const [isLive, setIsLive] = useState(false);

    // Chat State
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [username, setUsername] = useState("");
    const [showNameModal, setShowNameModal] = useState(false);
    const [tempName, setTempName] = useState("");
    const chatEndRef = useRef(null);

    // Initial load and socket connection
    useEffect(() => {
        // Check for stored name
        const storedName = localStorage.getItem('chat_username');
        if (storedName) {
            setUsername(storedName);
        }

        // Connect to socket server
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    // Listen for messages
    useEffect(() => {
        if (!socket) return;

        socket.on('chat-message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off('chat-message');
    }, [socket]);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (messages.length > 0) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        const timer = setInterval(() => {
            // Simple countdown simulation for demo purposes
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Load Facebook SDK
    useEffect(() => {
        if (isLive) {
            // Check if script already exists
            if (!document.getElementById('facebook-jssdk')) {
                const script = document.createElement('script');
                script.id = 'facebook-jssdk';
                script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v25.0";
                script.async = true;
                script.defer = true;
                script.crossOrigin = "anonymous";
                document.body.appendChild(script);
            }

            // Re-parse XFBML when isLive changes or component mounts
            if (window.FB) {
                window.FB.XFBML.parse();
            }
        }
    }, [isLive]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!currentMessage.trim()) return;

        if (!username) {
            setShowNameModal(true);
            return;
        }

        const msgData = {
            id: Date.now(),
            user: username,
            text: currentMessage,
            avatar: username.substring(0, 2).toUpperCase()
        };

        if (socket) {
            socket.emit('chat-message', msgData);
        }

        setCurrentMessage("");
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (!tempName.trim()) return;

        localStorage.setItem('chat_username', tempName);
        setUsername(tempName);
        setShowNameModal(false);

        // If they had a message typed, send it now
        if (currentMessage.trim() && socket) {
            const msgData = {
                id: Date.now(),
                user: tempName,
                text: currentMessage,
                avatar: tempName.substring(0, 2).toUpperCase()
            };
            socket.emit('chat-message', msgData);
            setCurrentMessage("");
        }
    };

    return (
        <div className="livestream-page">
            {/* Name Entry Modal */}
            {showNameModal && (
                <div className="modal-overlay">
                    <div className="name-modal">
                        <h3>Join the Chat</h3>
                        <p>Please enter your name to start chatting.</p>
                        <form onSubmit={handleNameSubmit}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                autoFocus
                            />
                            <button type="submit">Join</button>
                        </form>
                        <button className="close-modal" onClick={() => setShowNameModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Immersive Player Section */}
            <section className="player-section" style={{ backgroundImage: `url(${placeholderBg})` }}>
                <div className="player-overlay"></div>
                <div className="container player-container">
                    <div className="main-stage">
                        <div className={`video-placeholder ${isLive ? 'live-mode' : ''}`}>
                            {isLive ? (
                                <div className="iframe-container">
                                    <div id="fb-root"></div>
                                    <div
                                        className="fb-video"
                                        data-href="https://www.facebook.com/CFWMinternational/videos/1504505904339595/"
                                        data-width="auto"
                                        data-show-text="false"
                                        data-autoplay="true"
                                        data-allowfullscreen="true"
                                    >
                                        <blockquote cite="https://www.facebook.com/CFWMinternational/videos/1504505904339595/" className="fb-xfbml-parse-ignore">
                                            <a href="https://www.facebook.com/CFWMinternational/videos/1504505904339595/">CHRIST FOR THE WORLD MISSION INC.</a>
                                            <p>SUNDAY SERVICE | 22ND FEBRUARY 2026</p>
                                            Posted by <a href="https://www.facebook.com/CFWMinternational">Christ For The World Mission International</a> on Saturday, February 21, 2026
                                        </blockquote>
                                    </div>
                                </div>
                            ) : (
                                <div className="offline-status">
                                    <span className="live-badge">OFFLINE</span>
                                    <h1>Next Service Begins In</h1>
                                    <div className="countdown">
                                        <div className="time-block">
                                            <span className="number">{timeLeft.days}</span>
                                            <span className="label">Days</span>
                                        </div>
                                        <div className="time-block">
                                            <span className="number">{timeLeft.hours}</span>
                                            <span className="label">Hours</span>
                                        </div>
                                        <div className="time-block">
                                            <span className="number">{timeLeft.minutes}</span>
                                            <span className="label">Mins</span>
                                        </div>
                                        <div className="time-block">
                                            <span className="number">{timeLeft.seconds}</span>
                                            <span className="label">Secs</span>
                                        </div>
                                    </div>
                                    <p className="service-info">Sunday Service | 9:00 AM</p>
                                    <button className="btn btn-notify">
                                        <Clock size={18} /> Notify Me
                                    </button>
                                    {/* Dev Toggle */}
                                    <div style={{ marginTop: '2rem' }}>
                                        <button onClick={() => setIsLive(true)} style={{ fontSize: '0.8rem', opacity: 0.5, background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                                            Simulate Live
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="stream-info-bar">
                            <div className="stream-title">
                                <h2>SUNDAY SERVICE | 22ND FEBRUARY 2026</h2>
                                <span className="viewers">
                                    {isLive ? <span style={{ color: '#ef4444', fontWeight: 'bold' }}>● LIVE NOW</span> : 'Waiting for broadcast...'}
                                </span>
                            </div>
                            <div className="stream-actions">
                                <button className="action-btn primary" onClick={() => setIsLive(!isLive)} title="Toggle Live Mode"><Play size={20} /> {isLive ? 'Stop Demo' : 'Watch Previous'}</button>
                                <button className="action-btn"><Share2 size={20} /> Share</button>
                            </div>
                        </div>
                    </div>

                    <div className="chat-sidebar">
                        <div className="chat-header">
                            <h3>Live Chat</h3>
                            <span className="online-count">Online</span>
                        </div>
                        <div className="chat-messages">
                            <div className="chat-msg system">
                                <p>Welcome to Christ For The World Mission Online! Say hello 👋</p>
                            </div>
                            {messages.map((msg) => (
                                <div key={msg.id} className="chat-msg">
                                    <div className="avatar">{msg.avatar}</div>
                                    <div className="msg-content">
                                        <span className="username">{msg.user}</span>
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <form className="chat-input-area" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                placeholder="Join the conversation..."
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                            />
                            <button type="submit"><MessageCircle size={20} /></button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Quick Actions Grid */}
            <section className="actions-grid">
                <div className="container">
                    <div className="grid-layout">
                        <Link to="/give" className="action-card give-card" data-aos="fade-up">
                            <h3>Give Online</h3>
                            <p>Support the gospel and make an impact.</p>
                            <span className="btn-link">Give Now &rarr;</span>
                        </Link>
                        <Link to="/resources/forms" className="action-card connect-card" data-aos="fade-up" data-aos-delay="100">
                            <h3>Connect Card</h3>
                            <p>New here? We'd love to meet you.</p>
                            <span className="btn-link">Fill Card &rarr;</span>
                        </Link>
                        <Link to="/resources/forms" className="action-card prayer-card" data-aos="fade-up" data-aos-delay="200">
                            <h3>Prayer Request</h3>
                            <p>How can we pray for you today?</p>
                            <span className="btn-link">Request Prayer &rarr;</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Livestream;
