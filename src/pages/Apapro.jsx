import React, { useState, useEffect, useCallback } from 'react';
import { Quote, Flame, BookOpen, ScrollText, Calendar as CalendarIcon, Search, ChevronRight, Share2, Printer, Heart, Volume2, Maximize2, Minimize2, ChevronLeft, RotateCcw } from 'lucide-react';
import './Apapro.css';

const Apapro = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Sample Devotional Data based on user input
    // In a real app, this would come from a CMS or API
    const devotionals = [
        {
            id: 1,
            date: "THURSDAY, 5TH FEBRUARY 2026",
            shortDate: "2026-02-05",
            title: "WORTHY IS THE LAMB",
            subtitle: "",
            quote: "What Christ received in victory, He received on your behalf.",
            scripture: "Saying with a loud voice, Worthy is the Lamb that was slain to receive power, and riches, and wisdom, and strength, and honour, and glory, and blessing.",
            scriptureRef: "Revelation 5:12 (KJV)",
            content: [
                "Jesus did not receive these things for Himself. He received them for us. In His pre-incarnate glory, He already possessed power, honour, and authority. The cross was not about acquisition, it was about restoration. The Lamb was slain so that what humanity lost could be lawfully recovered and permanently transferred back to those who would come to Him.",
                "From the beginning, God gave man a mandate to be fruitful, multiply, subdue, and exercise dominion. Through Adam’s disobedience, that mandate was forfeited. Authority was surrendered. Dominion was compromised. But what the first Adam lost through rebellion, the last Adam restored through obedience. Redemption did not merely bring man back to zero, it elevated him to a higher position than before the fall.",
                "Scripture makes this unmistakably clear. Adam lost dominion through disobedience (Genesis 1:28; Romans 5:12). Jesus restored authority through obedience unto death (Philippians 2:8–11). Having received all power in heaven and on earth, He delegated that authority to believers (Matthew 28:18–20). Through Christ, believers now reign in life, not as survivors but as victors (Romans 5:17). Redemption always restores more than it recovers.",
                "This is why heaven cries, “Worthy is the Lamb.” In Christ, power is restored. Riches are restored. Wisdom is restored. Strength, honour, glory, and blessing are restored. You are not striving to obtain what Jesus already secured. You are learning to live consciously from what He has finished. Worship Him with your voice, but also honour Him with a life that reflects the fullness of what He redeemed."
            ],
            prophetic: "I declare that the full benefits of Christ’s finished work will manifest in your life. You will walk boldly in power, wisdom, honour, and blessing.",
            confession: "Worthy is the Lamb who was slain for me. I live from restoration, abundance, and authority in Christ Jesus.",
            furtherStudy: ["Revelation 5:12", "Genesis 1:28", "Romans 5:17", "Matthew 28:18"],
            biblePlan: "Isaiah 44–48",
            declaration: "LOVE SHOULD NOT LEAD YOU INTO A LOSS",
            declarationRef: "1 Corinthians 16:14"
        }
    ];

    const [currentDevotional, setCurrentDevotional] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [readingTheme, setReadingTheme] = useState('light'); // light, sepia, night
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('apapro_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    // Calendar State
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Initialize current devotional
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const found = devotionals.find(d => d.shortDate === today);
        setCurrentDevotional(found || devotionals[0]);
    }, []);

    // Calendar Helper Functions
    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const handleDateSelect = (day) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        setSelectedDate(newDate);
        const isoDate = newDate.toISOString().split('T')[0];
        const found = devotionals.find(d => d.shortDate === isoDate);
        if (found) {
            setCurrentDevotional(found);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Favorites Logic
    const toggleFavorite = (id) => {
        const newFavorites = favorites.includes(id)
            ? favorites.filter(f => f !== id)
            : [...favorites, id];
        setFavorites(newFavorites);
        localStorage.setItem('apapro_favorites', JSON.stringify(newFavorites));
    };

    // Text to Speech Logic
    const handleListen = useCallback(() => {
        if ('speechSynthesis' in window) {
            if (isListening) {
                window.speechSynthesis.cancel();
                setIsListening(false);
            } else {
                const text = `${currentDevotional.title}. ${currentDevotional.quote}. ${currentDevotional.scripture}. ${currentDevotional.content.join(' ')}`;
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.onend = () => setIsListening(false);
                window.speechSynthesis.speak(utterance);
                setIsListening(true);
            }
        }
    }, [isListening, currentDevotional]);

    const filteredDevotionals = devotionals.filter(d =>
        d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calendar Render Logic
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysInMonth = getDaysInMonth(viewDate.getMonth(), viewDate.getFullYear());
    const firstDay = getFirstDayOfMonth(viewDate.getMonth(), viewDate.getFullYear());
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

    // Notifications Logic
    const toggleNotifications = async () => {
        if (!notificationsEnabled) {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                setNotificationsEnabled(true);
                new Notification("Apapro Devotional", {
                    body: "Daily reminders enabled! We'll notify you when a new word is ready.",
                    icon: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=10&w=100"
                });
            }
        } else {
            setNotificationsEnabled(false);
        }
    };

    if (!currentDevotional) return <div className="loading">Loading Devotional...</div>;

    return (
        <div className={`apapro-page theme-${readingTheme} ${isFocusMode ? 'focus-mode' : ''}`}>
            {/* Hero Section */}
            {!isFocusMode && (
                <section className="apapro-hero">
                    <div className="container" data-aos="fade-up">
                        <div className="apapro-hero-content">
                            <h1>APAPRO 🔥</h1>
                            <p>Apostolic and Prophetic Daily Devotional</p>
                        </div>
                    </div>
                </section>
            )}

            <div className="container">
                <div className="apapro-content-grid">
                    {/* Main Content Area */}
                    <div className="apapro-main-content">
                        {/* Action Bar */}
                        <div className="apapro-actions-nav" data-aos="fade-down">
                            <button className={`nav-icon-btn ${isListening ? 'active' : ''}`} onClick={handleListen} title="Listen">
                                <Volume2 size={20} />
                                <span>{isListening ? 'Stop' : 'Listen'}</span>
                            </button>
                            <button className="nav-icon-btn" onClick={() => setIsFocusMode(!isFocusMode)} title="Focus Mode">
                                {isFocusMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                                <span>{isFocusMode ? 'Exit Focus' : 'Focus'}</span>
                            </button>
                            <button
                                className="nav-icon-btn"
                                onClick={() => {
                                    const today = new Date();
                                    setViewDate(today);
                                    handleDateSelect(today.getDate());
                                }}
                            >
                                <RotateCcw size={20} />
                                <span>Today</span>
                            </button>
                            <button
                                className={`nav-icon-btn ${favorites.includes(currentDevotional.id) ? 'favorite' : ''}`}
                                onClick={() => toggleFavorite(currentDevotional.id)}
                            >
                                <Heart size={20} fill={favorites.includes(currentDevotional.id) ? "var(--color-brand-red)" : "none"} />
                                <span>{favorites.includes(currentDevotional.id) ? 'Saved' : 'Save'}</span>
                            </button>

                            {/* Theme Switcher */}
                            <div className="theme-switcher">
                                <button className={`theme-btn light ${readingTheme === 'light' ? 'active' : ''}`} onClick={() => setReadingTheme('light')} title="Light Mode" />
                                <button className={`theme-btn sepia ${readingTheme === 'sepia' ? 'active' : ''}`} onClick={() => setReadingTheme('sepia')} title="Sepia Mode" />
                                <button className={`theme-btn night ${readingTheme === 'night' ? 'active' : ''}`} onClick={() => setReadingTheme('night')} title="Night Mode" />
                            </div>
                        </div>

                        <article className="devotional-card" data-aos="fade-up">
                            <header className="devotional-header">
                                <div className="devotional-date-badge">
                                    <CalendarIcon size={16} /> {currentDevotional.date}
                                </div>
                                <div className="section-label-main">
                                    <span role="img" aria-label="pin">📌</span> Title
                                </div>
                                <h2 className="devotional-title">{currentDevotional.title}</h2>
                                <p className="devotional-subtitle">{currentDevotional.subtitle}</p>
                            </header>

                            <div className="quote-section">
                                <div className="section-label-minimal">
                                    <span role="img" aria-label="speech">💬</span> Today’s Quote
                                </div>
                                <Quote className="quote-icon" size={40} />
                                <p className="quote-text">"{currentDevotional.quote}"</p>
                            </div>

                            <div className="focus-section">
                                <div className="section-label">
                                    <BookOpen size={18} /> Scriptural Focus
                                </div>
                                <div className="scripture-box">
                                    <p className="scripture-text">“{currentDevotional.scripture}”</p>
                                    <span className="scripture-ref">{currentDevotional.scriptureRef}</span>
                                </div>
                            </div>

                            <div className="devotional-body">
                                {currentDevotional.content.map((para, index) => (
                                    <p key={index}>{para}</p>
                                ))}
                            </div>

                            <div className="spiritual-guidance">
                                <div className="guidance-card prophetic-card">
                                    <div className="section-label">
                                        <Flame size={18} /> Prophetic Instruction
                                    </div>
                                    <p className="guidance-text">{currentDevotional.prophetic}</p>
                                </div>

                                <div className="guidance-card confession-card">
                                    <div className="section-label">
                                        <ScrollText size={18} /> Confession
                                    </div>
                                    <p className="guidance-text">{currentDevotional.confession}</p>
                                </div>
                            </div>

                            <div className="devotional-footer-items">
                                <div className="footer-item">
                                    <div className="section-label-minimal">
                                        <span role="img" aria-label="books">📚</span> Further Study
                                    </div>
                                    <ul>
                                        {currentDevotional.furtherStudy.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="footer-item">
                                    <div className="section-label-minimal">
                                        <span role="img" aria-label="blue-book">📘</span> Bible Reading Plan
                                    </div>
                                    <p className="study-text">{currentDevotional.biblePlan}</p>
                                </div>
                                <div className="footer-item">
                                    <div className="section-label-minimal">
                                        <Share2 size={16} /> Share
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="action-btn-circle" onClick={() => window.print()} title="Print">
                                            <Printer size={18} />
                                        </button>
                                        <button className="action-btn-circle" title="Share">
                                            <Share2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="declaration-banner">
                                <span className="declaration-label">
                                    <span role="img" aria-label="megaphone">📢</span> Monthly Declaration
                                </span>
                                <h3 className="declaration-text">{currentDevotional.declaration}</h3>
                                <span className="declaration-ref">{currentDevotional.declarationRef}</span>
                            </div>

                            <p className="copyright">©️ Dr. Nick Ezeh 2026</p>
                        </article>
                    </div>

                    {/* Sidebar Area */}
                    {!isFocusMode && (
                        <aside className="apapro-sidebar" data-aos="fade-left">
                            {/* Notification Widget */}
                            <div className="sidebar-widget notification-widget">
                                <h3 className="widget-title"><ScrollText size={20} /> Daily Reminder</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                                    Stay connected. Get notified when the daily devotional is ready.
                                </p>
                                <button className={`btn-notification ${notificationsEnabled ? 'active' : ''}`} onClick={toggleNotifications}>
                                    {notificationsEnabled ? 'Reminders ON' : 'Turn on Notifications'}
                                </button>
                            </div>

                            {/* Calendar Widget */}
                            <div className="sidebar-widget calendar-widget">
                                <header className="calendar-header">
                                    <h3>{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</h3>
                                    <div className="calendar-nav">
                                        <button onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
                                        <button onClick={handleNextMonth}><ChevronRight size={20} /></button>
                                    </div>
                                </header>
                                <div className="calendar-grid">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                        <div key={day} className="calendar-day-label">{day}</div>
                                    ))}
                                    {calendarDays.map((day, i) => {
                                        const isoDate = day ? new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toISOString().split('T')[0] : null;
                                        const hasDevotional = isoDate && devotionals.some(d => d.shortDate === isoDate);
                                        const isSelected = day === selectedDate.getDate() && viewDate.getMonth() === selectedDate.getMonth();

                                        return (
                                            <button
                                                key={i}
                                                className={`calendar-day ${day ? '' : 'empty'} ${hasDevotional ? 'has-data' : ''} ${isSelected ? 'selected' : ''}`}
                                                disabled={!day}
                                                onClick={() => handleDateSelect(day)}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="sidebar-widget">
                                <h3 className="widget-title"><Search size={20} /> Search</h3>
                                <div className="search-box">
                                    <input
                                        type="text"
                                        placeholder="Topic or Title..."
                                        className="search-input"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div className="archive-list" style={{ marginTop: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                                    {filteredDevotionals.map((dev) => (
                                        <button
                                            key={dev.id}
                                            className={`archive-item ${currentDevotional.id === dev.id ? 'active' : ''}`}
                                            onClick={() => {
                                                setCurrentDevotional(dev);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                        >
                                            <span className="archive-date">{dev.date}</span>
                                            <span className="archive-title">{dev.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {favorites.length > 0 && (
                                <div className="sidebar-widget">
                                    <h3 className="widget-title"><Heart size={20} /> Favorites</h3>
                                    <div className="archive-list">
                                        {devotionals.filter(d => favorites.includes(d.id)).map(dev => (
                                            <button
                                                key={dev.id}
                                                className="archive-item"
                                                onClick={() => setCurrentDevotional(dev)}
                                            >
                                                <span className="archive-title">{dev.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="sidebar-widget bg-brand-red text-white">
                                <h3 className="widget-title text-white">Share Grace</h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '1.5rem' }}>
                                    Blessing someone today with the Word? Share this devotional.
                                </p>
                                <button className="btn-white-outline w-100">Invite a Friend</button>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Apapro;
