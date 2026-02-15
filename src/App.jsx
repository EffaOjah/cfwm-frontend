import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BackToTop from './components/common/BackToTop';
import ScrollToTop from './components/common/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Biography from './pages/Biography';
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
import Testimonies from './pages/Testimonies';
import VmixTestimony from './pages/VmixTestimony';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageEvents from './pages/admin/ManageEvents';
import ManageTestimonies from './pages/admin/ManageTestimonies';
import ManageSermons from './pages/admin/ManageSermons';
import ManageStore from './pages/admin/ManageStore';
import ManageLocations from './pages/admin/ManageLocations';
import ManageForms from './pages/admin/ManageForms';
import ManageSettings from './pages/admin/ManageSettings';

function App() {
  const location = useLocation();
  const isVmixRoute = location.pathname.startsWith('/vmix');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isNoNavRoute = isVmixRoute || isAdminRoute;

  return (
    <div className={`app-container ${isVmixRoute ? 'vmix-mode' : ''} ${isAdminRoute ? 'admin-mode' : ''}`}>
      {!isNoNavRoute && <Navbar />}
      {!isNoNavRoute && <ScrollToTop />}

      <Routes>
        {/* Public Routes */}
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

        {/* vMix Overlay Route */}
        <Route path="/vmix/testimony" element={<VmixTestimony />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<ManageEvents />} />
        <Route path="/admin/testimonies" element={<ManageTestimonies />} />
        <Route path="/admin/sermons" element={<ManageSermons />} />
        <Route path="/admin/store" element={<ManageStore />} />
        <Route path="/admin/locations" element={<ManageLocations />} />
        <Route path="/admin/forms" element={<ManageForms />} />
        <Route path="/admin/settings" element={<ManageSettings />} />
      </Routes>

      {!isNoNavRoute && <Footer />}
      {!isNoNavRoute && <BackToTop />}
    </div>
  );
}

export default App;
