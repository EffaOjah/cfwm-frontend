import React, { useEffect } from 'react';
import { MapPin, User, Phone, Navigation } from 'lucide-react';
import './Locate.css';
import heroBg from '../assets/locate-church-hero.jpg';

// Import new branch images
// Note: Uncomment these lines after saving the images to src/assets with these names
import hqImage from '../assets/hq_main.png';
import branch1 from '../assets/branch_ikeja.png';
import branch2 from '../assets/branch_surulere.png';
import branch3 from '../assets/branch_yaba.png';
import branch4 from '../assets/branch_garki.png';
import branch5 from '../assets/branch_wuse.png';

// Temporary Placeholders until images are added
// const hqImage = "https://images.unsplash.com/photo-1548625361-1396a33db9ad?q=80&w=1200";
// const branch1 = "https://images.unsplash.com/photo-1510924948940-0255869dbbf3?q=80&w=800";
// const branch2 = "https://images.unsplash.com/photo-1548625361-1396a33db9ad?q=80&w=800";
// const branch3 = "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?q=80&w=800";
// const branch4 = "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800";
// const branch5 = "https://images.unsplash.com/photo-1577712356529-650058e13470?q=80&w=800";


const Locate = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Placeholder Data
    const headquarters = {
        name: "CFWM Headquarters",
        address: "38 Abasi Obori Street, Off Uwanse Street, Calabar, Cross River State", // Updated real address from footer
        pastor: "Rev. Dr. Nick Ezeh", // Updated from Apapro footer context
        phone: "+234 812 345 6789",
        coordinates: { lat: 4.9757, lng: 8.3417 }, // Calabar coords
        image: hqImage
    };

    const districts = [
        {
            id: 1,
            name: "Lagos District 1",
            head: "Pst. John Doe",
            branches: [
                {
                    id: 101,
                    name: "Ikeja Branch",
                    address: "45 Allen Avenue, Ikeja, Lagos",
                    pastor: "Pst. Michael Smith",
                    phone: "+234 801 111 1111",
                    image: branch1
                },
                {
                    id: 102,
                    name: "Surulere Branch",
                    address: "12 Stadium Road, Surulere, Lagos",
                    pastor: "Pst. David Coleman",
                    phone: "+234 801 222 2222",
                    image: branch2
                },
                {
                    id: 103,
                    name: "Yaba Branch",
                    address: "88 Herbert Macaulay Way, Yaba",
                    pastor: "Pst. Sarah James",
                    phone: "+234 801 333 3333",
                    image: branch3
                }
            ]
        },
        {
            id: 2,
            name: "Abuja District",
            head: "Pst. Peter Paul",
            branches: [
                {
                    id: 201,
                    name: "Garki Branch",
                    address: "Plot 55, Garki Area 3, Abuja",
                    pastor: "Pst. Solomon King",
                    phone: "+234 802 444 4444",
                    image: branch4
                },
                {
                    id: 202,
                    name: "Wuse Branch",
                    address: "22 Adetokunbo Ademola Crescent, Wuse 2",
                    pastor: "Pst. Ruth Abba",
                    phone: "+234 802 555 5555",
                    image: branch5
                }
            ]
        },
        {
            id: 3,
            name: "Port Harcourt District",
            head: "Pst. Matthew Mark",
            branches: [
                {
                    id: 301,
                    name: "GRA Branch",
                    address: "15 Tombia Street, GRA Phase 2, PH",
                    pastor: "Pst. Luke John",
                    phone: "+234 803 666 6666",
                    image: branch2 // Reusing
                }
            ]
        }
    ];

    const handleGetDirections = (address) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    };

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
                                <span className="district-head"><User size={14} style={{ marginRight: '5px', display: 'inline' }} /> District Head: {district.head}</span>
                            </div>

                            <div className="branches-grid">
                                {district.branches.map((branch) => (
                                    <div key={branch.id} className="branch-card">
                                        <div className="branch-image" style={{ backgroundImage: `url(${branch.image})` }}>
                                            <MapPin className="branch-image-icon" size={40} />
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
                                                    onClick={() => handleGetDirections(branch.address)}
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
