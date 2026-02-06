import { Clock, MapPin, Bus } from 'lucide-react';
import './AboutPreview.css'; // Reusing similar styles or create new

const ServiceInfo = () => {
    return (
        <section className="section-service">
            <div className="container">
                <div className="service-banner">
                    <div className="service-col">
                        <div className="icon-box">
                            <Clock size={32} />
                        </div>
                        <h3>Service Times</h3>
                        <p><strong>Sundays:</strong> 9:00 AM - Worship Service</p>
                        <p><strong>Wednesdays:</strong> 6:00 PM - Bible Study</p>
                        <p><strong>Fridays:</strong> 10:00 PM - Vigil Night</p>
                    </div>

                    <div className="divider"></div>

                    <div className="service-col">
                        <div className="icon-box">
                            <MapPin size={32} />
                        </div>
                        <h3>Location</h3>
                        <p>123 Church Street, City, State 12345</p>
                        <button className="btn-link">Get Directions</button>
                    </div>

                    <div className="divider"></div>

                    <div className="service-col">
                        <div className="icon-box">
                            <Bus size={32} />
                        </div>
                        <h3>Transportation</h3>
                        <p>Free bus service available from major hubs.</p>
                        <button className="btn-link">View Bus Schedule</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ServiceInfo;
