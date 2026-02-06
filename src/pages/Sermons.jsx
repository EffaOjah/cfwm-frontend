import { useState, useRef, useEffect } from 'react';
import { Play, Search, Video, Headphones, Clock, Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import './Sermons.css';

const SERMONS = [
    {
        id: 1,
        title: "The Power of Faith",
        speaker: "Rev. Dr. Nick Ezeh",
        date: "January 21, 2026",
        duration: "45:30",
        type: "video",
        series: "Faith Series",
        seriesColor: "#3b82f6",
        thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80"
    },
    {
        id: 2,
        title: "Walking in Divine Purpose",
        speaker: "Rev. Dr. Nick Ezeh",
        date: "January 14, 2026",
        duration: "52:15",
        type: "video",
        series: "Purpose Series",
        seriesColor: "#10b981",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
    },
    {
        id: 3,
        title: "Prayer That Moves Mountains",
        speaker: "Rev. Dr. Nick Ezeh",
        date: "January 7, 2026",
        duration: "38:45",
        type: "audio",
        series: "Prayer Series",
        seriesColor: "#a855f7"
    },
    {
        id: 4,
        title: "The Holy Spirit's Power",
        speaker: "Rev. Dr. Nick Ezeh",
        date: "December 31, 2025",
        duration: "48:20",
        type: "video",
        series: "Holy Spirit Series",
        seriesColor: "#ef4444",
        thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80"
    },
    {
        id: 5,
        title: "Grace Upon Grace",
        speaker: "Rev. Dr. Nick Ezeh",
        date: "December 24, 2025",
        duration: "41:10",
        type: "audio",
        series: "Grace Series",
        seriesColor: "#f59e0b"
    },
    {
        id: 6,
        title: "Kingdom Authority",
        speaker: "Rev. Dr. Nick Ezeh",
        date: "December 17, 2025",
        duration: "55:30",
        type: "video",
        series: "Kingdom Series",
        seriesColor: "#8b5cf6",
        thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=80"
    }
];

const Sermons = () => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const scrollContainerRef = useRef(null);
    const [scrollStatus, setScrollStatus] = useState({ left: false, right: true });

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setScrollStatus({
                left: scrollLeft > 10,
                right: scrollLeft < scrollWidth - clientWidth - 10
            });
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scrollCategories = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const filteredSermons = SERMONS.filter(sermon => {
        const matchesFilter = filter === 'all' || sermon.type === filter;
        const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const videoCount = SERMONS.filter(s => s.type === 'video').length;
    const audioCount = SERMONS.filter(s => s.type === 'audio').length;

    return (
        <div className="sermons-page">
            {/* Hero Section */}
            <section className="sermons-hero">
                <div className="sermons-hero-overlay"></div>
                <div className="container sermons-hero-content">
                    <h1 data-aos="fade-up">Feed Your <span className="text-highlight">Spirit</span></h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Powerful messages to strengthen your faith and transform your life
                    </p>

                    {/* Search Bar */}
                    <div className="search-bar" data-aos="fade-up" data-aos-delay="200">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search sermons by title or speaker..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="sermons-content">
                <div className="container">
                    {/* Filter Toolbar */}
                    <div className="sermons-toolbar" data-aos="fade-up">
                        <div className="filter-wrapper">
                            <button
                                className={`scroll-indicator left ${!scrollStatus.left ? 'disabled' : ''}`}
                                onClick={() => scrollCategories('left')}
                                disabled={!scrollStatus.left}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div
                                className="filter-tabs"
                                ref={scrollContainerRef}
                                onScroll={checkScroll}
                            >
                                <button
                                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    All Sermons <span className="count">{SERMONS.length}</span>
                                </button>
                                <button
                                    className={`filter-btn ${filter === 'video' ? 'active' : ''}`}
                                    onClick={() => setFilter('video')}
                                >
                                    <Video size={18} /> Video <span className="count">{videoCount}</span>
                                </button>
                                <button
                                    className={`filter-btn ${filter === 'audio' ? 'active' : ''}`}
                                    onClick={() => setFilter('audio')}
                                >
                                    <Headphones size={18} /> Audio <span className="count">{audioCount}</span>
                                </button>
                            </div>
                            <button
                                className={`scroll-indicator right ${!scrollStatus.right ? 'disabled' : ''}`}
                                onClick={() => scrollCategories('right')}
                                disabled={!scrollStatus.right}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Sermons Grid */}
                    <div className="sermons-grid">
                        {filteredSermons.map((sermon, index) => (
                            <div
                                className={`sermon-card ${sermon.type}`}
                                key={sermon.id}
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                            >
                                {sermon.type === 'video' ? (
                                    <div className="sermon-thumbnail">
                                        <img src={sermon.thumbnail} alt={sermon.title} />
                                        <div className="play-overlay">
                                            <div className="play-button">
                                                <Play size={32} fill="white" />
                                            </div>
                                        </div>
                                        <span className="duration-badge">
                                            <Clock size={12} /> {sermon.duration}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="audio-visual">
                                        <div className="audio-icon-wrapper">
                                            <Headphones size={48} />
                                        </div>
                                        <div className="audio-waves">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                )}

                                <div className="sermon-details">
                                    <span
                                        className="series-badge"
                                        style={{ backgroundColor: sermon.seriesColor }}
                                    >
                                        {sermon.series}
                                    </span>
                                    <h3>{sermon.title}</h3>
                                    <p className="speaker">{sermon.speaker}</p>
                                    <div className="sermon-meta">
                                        <span><Calendar size={14} /> {sermon.date}</span>
                                        <span><Clock size={14} /> {sermon.duration}</span>
                                    </div>
                                    <button className="btn-play">
                                        <Play size={16} /> {sermon.type === 'video' ? 'Watch' : 'Listen'} Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredSermons.length === 0 && (
                        <div className="no-results">
                            <Search size={48} />
                            <h3>No sermons found</h3>
                            <p>Try adjusting your search or filter</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Sermons;
