import { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Search, Video, Headphones, Clock, Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Sermons.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const PLACEHOLDER_THUMBNAIL = 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80';

const seriesToColor = (series = '') => {
    if (!series) return '#64748b';
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899'];
    let hash = 0;
    for (let i = 0; i < series.length; i++) hash = series.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
};

const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const Sermons = () => {
    const [sermons, setSermons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const scrollContainerRef = useRef(null);
    const [scrollStatus, setScrollStatus] = useState({ left: false, right: true });

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic'
        });

        const fetchSermons = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/sermons`);
                if (!res.ok) throw new Error('Failed to fetch sermons');
                const data = await res.json();
                setSermons(data);
            } catch (err) {
                console.error('Sermons fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSermons();
    }, []);

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
    }, [sermons]);

    const scrollCategories = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const filteredSermons = useMemo(() => {
        return sermons.filter(sermon => {
            const matchesFilter = filter === 'all' || sermon.type === filter;
            const matchesSearch = sermon.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sermon.speaker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sermon.series?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [sermons, filter, searchQuery]);

    const videoCount = sermons.filter(s => s.type === 'video').length;
    const audioCount = sermons.filter(s => s.type === 'audio').length;

    const skeletons = Array(4).fill(null);

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
                            placeholder="Search sermons by title, speaker or series..."
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
                                    All Sermons <span className="count">{sermons.length}</span>
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
                        {loading ? (
                            skeletons.map((_, i) => (
                                <div key={i} className="sermon-card loading" style={{ opacity: 0.5 }}>
                                    <div className="sermon-thumbnail" style={{ background: '#e2e8f0', height: '200px' }} />
                                    <div className="sermon-details">
                                        <div style={{ height: '1.25rem', background: '#e2e8f0', borderRadius: '4px', marginBottom: '0.5rem', width: '80%' }} />
                                        <div style={{ height: '1rem', background: '#e2e8f0', borderRadius: '4px', width: '60%' }} />
                                    </div>
                                </div>
                            ))
                        ) : filteredSermons.map((sermon, index) => (
                            <div
                                className={`sermon-card ${sermon.type}`}
                                key={sermon.id}
                                data-aos="fade-up"
                                data-aos-delay={(index % 4) * 50}
                            >
                                {sermon.type === 'video' ? (
                                    <div className="sermon-thumbnail">
                                        <img src={sermon.thumbnail_url || PLACEHOLDER_THUMBNAIL} alt={sermon.title} />
                                        <div className="play-overlay">
                                            <div className="play-button">
                                                <Play size={32} fill="white" />
                                            </div>
                                        </div>
                                        {sermon.duration && (
                                            <span className="duration-badge">
                                                <Clock size={12} /> {sermon.duration}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="audio-visual">
                                        <div className="audio-icon-wrapper">
                                            <Headphones size={48} />
                                        </div>
                                        <div className="audio-waves">
                                            <span></span><span></span><span></span><span></span><span></span>
                                        </div>
                                    </div>
                                )}

                                <div className="sermon-details">
                                    {sermon.series && (
                                        <span
                                            className="series-badge"
                                            style={{ backgroundColor: seriesToColor(sermon.series) }}
                                        >
                                            {sermon.series}
                                        </span>
                                    )}
                                    <h3>{sermon.title}</h3>
                                    <p className="speaker">{sermon.speaker}</p>
                                    <div className="sermon-meta">
                                        <span><Calendar size={14} /> {formatDate(sermon.sermon_date)}</span>
                                        {sermon.duration && <span><Clock size={14} /> {sermon.duration}</span>}
                                    </div>
                                    <button
                                        className="btn-play"
                                        onClick={() => {
                                            const url = sermon.type === 'video' ? sermon.video_url : sermon.audio_url;
                                            if (url) window.open(url, '_blank');
                                        }}
                                    >
                                        <Play size={16} /> {sermon.type === 'video' ? 'Watch' : 'Listen'} Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!loading && filteredSermons.length === 0 && (
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
