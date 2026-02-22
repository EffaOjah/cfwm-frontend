import { useState, useEffect } from 'react';
import { MapPin, User, Phone, Navigation, Loader2, AlertCircle } from 'lucide-react';
import './Locate.css';
import heroBg from '../assets/locate-church-hero.jpg';
import hqImage from '../assets/hq_main.png';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const Locate = () => {
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hardcoded HQ Details
    const headquarters = {
        name: "CFWM Headquarters",
        address: "38 Abasi Obori Street, Off Uwanse Street, Calabar, Cross River State",
        pastor: "Rev. Dr. Nick Ezeh",
        phone: "+234 812 345 6789",
        image: hqImage
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/locations/districts`);
            if (!response.ok) throw new Error('Failed to fetch church locations');
            const data = await response.json();

            setDistricts(data);

            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleGetDirections = (address) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    };

    if (loading) {
        return (
            <div className="locate-loading">
                <Loader2 className="animate-spin" size={48} />
                <p>Finding our branches...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="locate-error">
                <AlertCircle size={48} />
                <h2>Oops!</h2>
                <p>{error}</p>
                <button onClick={fetchLocations} className="btn btn-red">Try Again</button>
            </div>
        );
    }

    return (
        <div className="locate-page">
            {/* Hero Section */}
            <div className="locate-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroBg})` }}>
                <div className="locate-hero-content" data-aos="fade-up">
                    <h1>Locate A Church</h1>
                    <p>Find a CFWM branch near you and join our family.</p>
                </div>
            </div>

            <div className="container">
                {/* Headquarters Section */}
                <div className="locate-section-title" data-aos="fade-up">
                    <h2>International Headquarters</h2>
                    <div className="divider"></div>
                </div>

                <div className="hq-card" data-aos="fade-up">
                    <div className="hq-image">
                        <img src={headquarters.image} alt={headquarters.name} className="hq-bg-image" />
                        <div className="hq-overlay"></div>
                    </div>
                    <div className="hq-details">
                        <span className="hq-label">Central Office & Main Church</span>
                        <h3 className="hq-name">{headquarters.name}</h3>

                        <div className="info-group">
                            <MapPin className="info-icon" size={24} />
                            <div className="info-content">
                                <h4>Address</h4>
                                <p>{headquarters.address}</p>
                            </div>
                        </div>

                        <div className="info-group">
                            <User className="info-icon" size={24} />
                            <div className="info-content">
                                <h4>Presiding Pastor</h4>
                                <p>{headquarters.pastor}</p>
                            </div>
                        </div>

                        <div className="info-group">
                            <Phone className="info-icon" size={24} />
                            <div className="info-content">
                                <h4>Contact</h4>
                                <p>{headquarters.phone}</p>
                            </div>
                        </div>

                        <button
                            className="get-directions-btn"
                            onClick={() => handleGetDirections(headquarters.address)}
                        >
                            Get Directions <Navigation size={18} />
                        </button>
                    </div>
                </div>

                {/* Districts & Branches */}
                <div className="locate-section-title" style={{ marginTop: '5rem' }} data-aos="fade-up">
                    <h2>Our Districts & Branches</h2>
                    <div className="divider"></div>
                </div>

                <div className="districts-container">
                    {districts.map((district) => (
                        <div key={district.id} className="district-block" data-aos="fade-up">
                            <div className="district-header">
                                <span className="district-name">{district.name}</span>
                                <span className="district-head">
                                    <User size={14} style={{ marginRight: '5px', display: 'inline' }} />
                                    District Head: {district.head_pastor}
                                </span>
                            </div>

                            <div className="branches-grid">
                                {district.branches?.map((branch) => (
                                    <div key={branch.id} className="branch-card">
                                        <div className="branch-image" style={{ backgroundImage: `url(${branch.image_url})` }}>
                                            {!branch.image_url && <MapPin className="branch-image-icon" size={40} />}
                                        </div>
                                        <div className="branch-content">
                                            <h4 className="branch-name">{branch.name}</h4>

                                            <div className="branch-detail">
                                                <MapPin size={16} />
                                                <span>{branch.address}</span>
                                            </div>

                                            <div className="branch-detail">
                                                <User size={16} />
                                                <span>{branch.pastor}</span>
                                            </div>

                                            <div className="branch-detail">
                                                <Phone size={16} />
                                                <span>{branch.phone}</span>
                                            </div>

                                            <div className="branch-actions">
                                                <button
                                                    className="branch-btn"
                                                    onClick={() => handleGetDirections(branch.address || branch.map_url)}
                                                >
                                                    Get Directions
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Locate;
