import React, { useState, useEffect, useCallback } from 'react';
import { Quote, Flame, BookOpen, ScrollText, Calendar as CalendarIcon, Search, ChevronRight, Share2, Printer, Heart, Volume2, Maximize2, Minimize2, ChevronLeft, RotateCcw, Lock, X } from 'lucide-react';
import './Apapro.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Timezone-safe local date formatter: returns 'YYYY-MM-DD' without UTC conversion
const toLocalISODate = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Helper: get the date portion of a DB date string (strips any time component)
const getDatePart = (dateStr) => (dateStr || '').split('T')[0].split(' ')[0];

const Apapro = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [devotionals, setDevotionals] = useState([]);
    const [currentDevotional, setCurrentDevotional] = useState(null);
    const [loadingDevotionals, setLoadingDevotionals] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [readingTheme, setReadingTheme] = useState('light');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [lockedDate, setLockedDate] = useState(null); // date string if user picks future
    const [fetchingContent, setFetchingContent] = useState(false);

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('apapro_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Fetch all published devotionals
    useEffect(() => {
        const fetchDevotionals = async () => {
            setLoadingDevotionals(true);
            try {
                const res = await fetch(`${API_BASE}/apapro`);
                const data = await res.json();
                if (data.status === 'success') {
                    setDevotionals(data.data);
                    // Load today's or most recent
                    const today = toLocalISODate(new Date());
                    const todayDev = data.data.find(d => getDatePart(d.date) === today);
                    setCurrentDevotional(todayDev || data.data[0] || null);
                }
            } catch (e) {
                console.error('Failed to fetch devotionals:', e);
            } finally {
                setLoadingDevotionals(false);
            }
        };
        fetchDevotionals();
    }, []);

    // Calendar helpers
    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

    const handleDateSelect = async (day, dateOverride = null) => {
        const newDate = dateOverride ? new Date(dateOverride) : new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        newDate.setHours(0, 0, 0, 0);
        setSelectedDate(newDate);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Date gating: future dates are locked
        if (newDate > today) {
            setLockedDate(newDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
            setCurrentDevotional(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setLockedDate(null);
        setFetchingContent(true);
        const isoDate = toLocalISODate(newDate);

        try {
            const res = await fetch(`${API_BASE}/apapro/date/${isoDate}`);
            const data = await res.json();
            if (data.status === 'success') {
                setCurrentDevotional(data.data);
            } else {
                setCurrentDevotional(null);
            }
        } catch (e) {
            console.error('Failed to fetch devotional for date:', e);
            setCurrentDevotional(null);
        } finally {
            setFetchingContent(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const toggleFavorite = (id) => {
        const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
        setFavorites(newFavs);
        localStorage.setItem('apapro_favorites', JSON.stringify(newFavs));
    };

    const handleListen = useCallback(() => {
        if ('speechSynthesis' in window) {
            if (isListening) {
                window.speechSynthesis.cancel();
                setIsListening(false);
            } else if (currentDevotional) {
                const contentArr = Array.isArray(currentDevotional.content) ? currentDevotional.content : [];
                const text = `${currentDevotional.title}. ${currentDevotional.quote}. ${currentDevotional.scripture}. ${contentArr.join(' ')}`;
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.onend = () => setIsListening(false);
                window.speechSynthesis.speak(utterance);
                setIsListening(true);
            }
        }
    }, [isListening, currentDevotional]);

    const filteredDevotionals = devotionals.filter(d =>
        d.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.date?.includes(searchTerm)
    );

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysInMonth = getDaysInMonth(viewDate.getMonth(), viewDate.getFullYear());
    const firstDay = getFirstDayOfMonth(viewDate.getMonth(), viewDate.getFullYear());
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

    const toggleNotifications = async () => {
        if (!notificationsEnabled) {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                setNotificationsEnabled(true);
                new Notification("Apapro Devotional", {
                    body: "Daily reminders enabled! We'll notify you when a new word is ready.",
                });
            }
        } else {
            setNotificationsEnabled(false);
        }
    };

    const handlePrint = () => {
        const originalTitle = document.title;
        if (currentDevotional) {
            const dateStr = getDatePart(currentDevotional.date);
            const [y, m, d] = dateStr.split('-');
            document.title = `Apapro - ${d}/${m}/${y}`;
        }
        window.print();
        document.title = originalTitle;
    };

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Read today's Apapro Devotional: ${currentDevotional?.title}`;
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            default:
                break;
        }

        if (shareUrl) window.open(shareUrl, '_blank');
        setShowShareMenu(false);
    };

    const formatDisplayDate = (dateStr) => {
        if (!dateStr) return '';
        // "2026-02-22" -> "2026/02/22" forces local time interpretation in JS
        const normalized = typeof dateStr === 'string' ? dateStr.split('T')[0].split(' ')[0].replace(/-/g, '/') : dateStr;
        const d = new Date(normalized);
        return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
    };

    if (loadingDevotionals) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <Flame size={48} color="#cc121a" style={{ marginBottom: '1rem' }} />
                    <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#64748b' }}>Loading Devotional...</p>
                </div>
            </div>
        );
    }

    const contentParagraphs = Array.isArray(currentDevotional?.content) ? currentDevotional.content : [];
    const furtherStudyRefs = Array.isArray(currentDevotional?.further_study) ? currentDevotional.further_study : [];

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
                                    setLockedDate(null);
                                    handleDateSelect(today.getDate(), today);
                                }}
                            >
                                <RotateCcw size={20} />
                                <span>Today</span>
                            </button>

                            <button className="nav-icon-btn" onClick={handlePrint} title="Print Devotional">
                                <Printer size={20} />
                                <span>Print</span>
                            </button>

                            <div style={{ position: 'relative' }}>
                                <button
                                    className={`nav-icon-btn ${showShareMenu ? 'active' : ''}`}
                                    onClick={() => setShowShareMenu(!showShareMenu)}
                                    title="Share Devotional"
                                >
                                    <Share2 size={20} />
                                    <span>Share</span>
                                </button>

                                {showShareMenu && (
                                    <div className="share-dropdown">
                                        <button className="share-item" onClick={() => handleShare('whatsapp')}>WhatsApp</button>
                                        <button className="share-item" onClick={() => handleShare('twitter')}>Twitter (X)</button>
                                        <button className="share-item" onClick={() => handleShare('facebook')}>Facebook</button>
                                        <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '0.25rem 0' }}></div>
                                        <button className="share-item" onClick={handleCopyLink} style={{ color: 'var(--color-brand-red)', fontWeight: 700 }}>
                                            {copySuccess ? 'Copied!' : 'Copy Link'}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="theme-switcher">
                                <button className={`theme-btn light ${readingTheme === 'light' ? 'active' : ''}`} onClick={() => setReadingTheme('light')} title="Light Mode" />
                                <button className={`theme-btn sepia ${readingTheme === 'sepia' ? 'active' : ''}`} onClick={() => setReadingTheme('sepia')} title="Sepia Mode" />
                                <button className={`theme-btn night ${readingTheme === 'night' ? 'active' : ''}`} onClick={() => setReadingTheme('night')} title="Night Mode" />
                            </div>
                        </div>

                        {/* ── LOADING CONTENT ── */}
                        {fetchingContent && (
                            <div className="devotional-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                                <div className="loading-spinner-container">
                                    <div className="loading-spinner"></div>
                                </div>
                                <p style={{ marginTop: '1rem', color: '#64748b' }}>Fetching Word for {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}...</p>
                            </div>
                        )}

                        {/* ── DATE GATE ── */}
                        {!fetchingContent && lockedDate && (
                            <div className="devotional-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                                <Lock size={64} color="#cc121a" style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>Content Not Yet Available</h2>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                                    This devotional unlocks on <strong>{lockedDate}</strong>. Check back on that day for your daily word.
                                </p>
                                <Flame size={32} color="#cc121a" style={{ opacity: 0.4 }} />
                            </div>
                        )}

                        {/* ── NO DEVOTIONAL YET ── */}
                        {!fetchingContent && !lockedDate && !currentDevotional && (
                            <div className="devotional-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                                <Flame size={64} color="#cc121a" style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>No Devotional for This Date</h2>
                                <p style={{ fontSize: '1.1rem', color: '#64748b' }}>Select another date from the calendar, or check back soon.</p>
                            </div>
                        )}

                        {/* ── DEVOTIONAL CONTENT ── */}
                        {!fetchingContent && !lockedDate && currentDevotional && (
                            <article className="devotional-card" data-aos="fade-up">
                                <header className="devotional-header">
                                    <div className="devotional-date-badge">
                                        <CalendarIcon size={16} /> {formatDisplayDate(currentDevotional.date)}
                                    </div>
                                    <div className="section-label-main">
                                        <span role="img" aria-label="pin">📌</span> Title
                                    </div>
                                    <h2 className="devotional-title">{currentDevotional.title}</h2>
                                    {currentDevotional.subtitle && (
                                        <p className="devotional-subtitle">{currentDevotional.subtitle}</p>
                                    )}
                                </header>

                                <div className="quote-section">
                                    <div className="section-label-minimal">
                                        <span role="img" aria-label="speech">💬</span> Today's Quote
                                    </div>
                                    <Quote className="quote-icon" size={40} />
                                    <p className="quote-text">"{currentDevotional.quote}"</p>
                                </div>

                                <div className="focus-section">
                                    <div className="section-label">
                                        <BookOpen size={18} /> Scriptural Focus
                                    </div>
                                    <div className="scripture-box">
                                        <p className="scripture-text">"{currentDevotional.scripture}"</p>
                                        <span className="scripture-ref">{currentDevotional.scripture_ref}</span>
                                    </div>
                                </div>

                                <div className="devotional-body">
                                    {contentParagraphs.map((para, index) => (
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
                                            {furtherStudyRefs.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="footer-item">
                                        <div className="section-label-minimal">
                                            <span role="img" aria-label="blue-book">📘</span> Bible Reading Plan
                                        </div>
                                        <p className="study-text">{currentDevotional.bible_plan}</p>
                                    </div>
                                    <div className="footer-item">
                                        <div className="section-label-minimal">
                                            <Share2 size={16} /> Share
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="action-btn-circle" onClick={handlePrint} title="Print">
                                                <Printer size={18} />
                                            </button>
                                            <button
                                                className="action-btn-circle"
                                                title="Share"
                                                onClick={() => {
                                                    if (navigator.share) {
                                                        navigator.share({
                                                            title: currentDevotional.title,
                                                            text: `Read today's Apapro Devotional: ${currentDevotional.title}`,
                                                            url: window.location.href,
                                                        });
                                                    } else {
                                                        setShowShareMenu(true);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }
                                                }}
                                            >
                                                <Share2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {currentDevotional.declaration && (
                                    <div className="declaration-banner">
                                        <span className="declaration-label">
                                            <span role="img" aria-label="megaphone">📢</span> Monthly Declaration
                                        </span>
                                        <h3 className="declaration-text">{currentDevotional.declaration}</h3>
                                        <span className="declaration-ref">{currentDevotional.declaration_ref}</span>
                                    </div>
                                )}

                                <p className="copyright">©️ Dr. Nick Ezeh 2026</p>
                            </article>
                        )}
                    </div>

                    {/* Sidebar */}
                    {!isFocusMode && (
                        <aside className="apapro-sidebar" data-aos="fade-left">
                            {/* Notification Widget */}
                            <div className="sidebar-widget notification-widget">
                                <h3 className="widget-title"><ScrollText size={20} /> Daily Reminder</h3>
                                <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
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
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                        <div key={i} className="calendar-day-label">{day}</div>
                                    ))}
                                    {calendarDays.map((day, i) => {
                                        const isoDate = day ? toLocalISODate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day)) : null;
                                        const hasDevotional = isoDate && devotionals.some(d => getDatePart(d.date) === isoDate);
                                        const isSelected = day === selectedDate.getDate() && viewDate.getMonth() === selectedDate.getMonth() && viewDate.getFullYear() === selectedDate.getFullYear();
                                        const isFuture = isoDate && toLocalISODate(new Date(new Date().toDateString())) < isoDate;

                                        return (
                                            <button
                                                key={i}
                                                className={`calendar-day ${day ? '' : 'empty'} ${hasDevotional ? 'has-data' : ''} ${isSelected ? 'selected' : ''} ${isFuture ? 'future-locked' : ''}`}
                                                disabled={!day}
                                                onClick={() => handleDateSelect(day)}
                                                title={isFuture ? 'Not yet available' : undefined}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Search */}
                            <div className="sidebar-widget search-widget">
                                <h3 className="widget-title"><Search size={20} /> Search</h3>
                                <div className="search-box">
                                    <Search className="search-icon-inside" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Topic or Title..."
                                        className="search-input"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm && (
                                        <button
                                            className="search-clear-btn"
                                            onClick={() => setSearchTerm('')}
                                            title="Clear search"
                                        >
                                            <X size={12} />
                                        </button>
                                    )}
                                </div>
                                <div className="archive-list" style={{ marginTop: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                                    {filteredDevotionals.map((dev) => (
                                        <button
                                            key={dev.id}
                                            className={`archive-item ${currentDevotional?.id === dev.id ? 'active' : ''}`}
                                            onClick={() => {
                                                setLockedDate(null);
                                                setCurrentDevotional(dev);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                        >
                                            <span className="archive-date">{formatDisplayDate(dev.date)}</span>
                                            <span className="archive-title">{dev.title}</span>
                                        </button>
                                    ))}
                                    {filteredDevotionals.length === 0 && (
                                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center' }}>No results found.</p>
                                    )}
                                </div>
                            </div>


                            <div className="sidebar-widget bg-brand-red text-white">
                                <h3 className="widget-title text-white" style={{ color: 'white' }}><Share2 size={20} /> Share Grace</h3>
                                <p style={{ fontSize: '0.9rem', color: 'white', opacity: 1, marginBottom: '1.5rem' }}>
                                    Blessing someone today with the Word? Share this devotional.
                                </p>
                                <button
                                    className="btn-white-outline w-100"
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: 'Apapro Daily Devotional',
                                                text: 'Join me in reading the daily devotional on Apapro!',
                                                url: window.location.href,
                                            });
                                        } else {
                                            setShowShareMenu(true);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    Invite a Friend
                                </button>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Apapro;
