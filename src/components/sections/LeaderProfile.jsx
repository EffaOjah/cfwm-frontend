import { Link } from 'react-router-dom';
import overseerImg from '../../assets/general-overseer.png';
import './LeaderProfile.css';

const LeaderProfile = () => {
    return (
        <section className="section-leader">
            <div className="container leader-grid">
                <div className="leader-content" data-aos="fade-right">
                    <span className="leader-role">GENERAL OVERSEER</span>
                    <h2 className="leader-name">Rev. Dr. Nick Ezeh</h2>
                    <p className="leader-bio">
                        Rev. Dr. Nick Ezeh is a man ordained by God to liberate men from the shackles of darkness through the preaching of the Word of Faith. He is the presiding pastor of Christ For The World Mission Int'l.
                    </p>
                    <Link to="/about/overseer" className="leader-link">Read Full Biography</Link>
                </div>

                <div className="leader-image-wrapper" data-aos="fade-left">
                    <img
                        src={overseerImg}
                        alt="Rev. Dr. Nick Ezeh"
                        className="leader-img"
                    />
                </div>
            </div>
        </section>
    );
};

export default LeaderProfile;
