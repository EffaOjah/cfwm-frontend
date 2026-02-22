import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    MessageSquare,
    Music,
    ShoppingBag,
    MapPin,
    FileText,
    Settings,
    LogOut,
    User,
    Users,
    X
} from 'lucide-react';
import logoImg from '../../assets/logo-main.png';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Events', path: '/admin/events', icon: <Calendar size={20} /> },
        { name: 'Testimonies', path: '/admin/testimonies', icon: <MessageSquare size={20} /> },
        { name: 'Sermons', path: '/admin/sermons', icon: <Music size={20} /> },
        { name: 'Store', path: '/admin/store', icon: <ShoppingBag size={20} /> },
        { name: 'Locations', path: '/admin/locations', icon: <MapPin size={20} /> },
        { name: 'Forms', path: '/admin/forms', icon: <FileText size={20} /> },
        { name: 'Subscribers', path: '/admin/subscribers', icon: <Users size={20} /> },
    ];

    return (
        <aside className={`admin-sidebar ${isOpen ? 'mobile-open' : ''}`}>

            <div className="admin-sidebar-header">
                <Link to="/admin" onClick={onClose} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <img src={logoImg} alt="CFWM Admin" className="admin-sidebar-logo" />
                </Link>
                <button
                    className="admin-nav-trigger lg:hidden"
                    style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}
                    onClick={onClose}
                    aria-label="Close Menu"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="admin-sidebar-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        onClick={onClose}
                    >

                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}

                <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                    <p className="admin-stat-label" style={{ padding: '0 1rem 0.5rem', fontSize: '0.7rem' }}>SETTINGS</p>
                    <Link to="/admin/settings" className={`admin-nav-item ${location.pathname === '/admin/settings' ? 'active' : ''}`}>
                        <Settings size={20} />
                        <span>Configuration</span>
                    </Link>
                </div>
            </nav>

            <div className="admin-sidebar-footer">
                <div className="admin-user-card">
                    <div className="admin-user-avatar">
                        <User size={20} />
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>Admin User</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden' }}>admin@cfwm.org</p>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
