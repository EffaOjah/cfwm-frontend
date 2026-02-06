import Hero from '../components/sections/Hero';
import WelcomeSection from '../components/sections/WelcomeSection';
// import FaithWalk from '../components/sections/FaithWalk';
import MottoSection from '../components/sections/MottoSection';
import EventsSection from '../components/sections/EventsSection';
import LeaderProfile from '../components/sections/LeaderProfile';
import PapasDesk from '../components/sections/PapasDesk';
import TestimonySection from '../components/sections/TestimonySection';
import MomentsGallery from '../components/sections/MomentsGallery';
import DirectionsSection from '../components/sections/DirectionsSection';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <WelcomeSection />
            {/* <FaithWalk /> */}
            <MottoSection />
            <EventsSection />
            <LeaderProfile />
            <PapasDesk />
            <TestimonySection />
            <MomentsGallery />
            <DirectionsSection />
        </div>
    );
};

export default Home;
