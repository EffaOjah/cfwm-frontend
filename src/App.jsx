import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BackToTop from './components/common/BackToTop';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Livestream from './pages/Livestream';
import Give from './pages/Give';
import Store from './pages/Store';
import Sermons from './pages/Sermons';
import Locate from './pages/Locate';
import Forms from './pages/Forms';
import Contact from './pages/Contact';
import Apapro from './pages/Apapro';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Biography from './pages/Biography';
import Testimonies from './pages/Testimonies';
import VmixTestimony from './pages/VmixTestimony'; // Import the new component


function App() {
  const location = useLocation();
  const isVmixRoute = location.pathname.startsWith('/vmix');

  return (
    <div className={`app-container ${isVmixRoute ? 'vmix-mode' : ''}`}>
      {!isVmixRoute && <Navbar />}
      {!isVmixRoute && <ScrollToTop />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/overseer" element={<Biography />} />
        <Route path="/livestream" element={<Livestream />} />
        <Route path="/give" element={<Give />} />
        <Route path="/store" element={<Store />} />
        <Route path="/resources/sermons" element={<Sermons />} />
        <Route path="/resources/locate" element={<Locate />} />
        <Route path="/resources/forms" element={<Forms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apapro" element={<Apapro />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/resources/events" element={<Events />} />
        <Route path="/resources/events/:id" element={<EventDetails />} />
        <Route path="/resources/testimonies" element={<Testimonies />} />
        {/* vMix Overlay Route - Keep isolated from main nav */}
        <Route path="/vmix/testimony" element={<VmixTestimony />} />

      </Routes>

      {!isVmixRoute && <Footer />}
      {!isVmixRoute && <BackToTop />}
    </div >
  );
}

export default App;
