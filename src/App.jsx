import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

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
import ManageSubscribers from './pages/admin/ManageSubscribers';
import ManageApapro from './pages/admin/ManageApapro';
import Login from './pages/admin/Login';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('cfwm_admin_token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  const location = useLocation();
  const isVmixRoute = location.pathname.startsWith('/vmix');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname === '/admin/login';
  const isNoNavRoute = isVmixRoute || isAdminRoute || isLoginRoute;

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
        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute><ManageEvents /></ProtectedRoute>} />
        <Route path="/admin/testimonies" element={<ProtectedRoute><ManageTestimonies /></ProtectedRoute>} />
        <Route path="/admin/sermons" element={<ProtectedRoute><ManageSermons /></ProtectedRoute>} />
        <Route path="/admin/store" element={<ProtectedRoute><ManageStore /></ProtectedRoute>} />
        <Route path="/admin/locations" element={<ProtectedRoute><ManageLocations /></ProtectedRoute>} />
        <Route path="/admin/forms" element={<ProtectedRoute><ManageForms /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><ManageSettings /></ProtectedRoute>} />
        <Route path="/admin/subscribers" element={<ProtectedRoute><ManageSubscribers /></ProtectedRoute>} />
        <Route path="/admin/apapro" element={<ProtectedRoute><ManageApapro /></ProtectedRoute>} />
      </Routes>

      {!isNoNavRoute && <Footer />}
      {!isNoNavRoute && <BackToTop />}
    </div>
  );
}

export default App;
