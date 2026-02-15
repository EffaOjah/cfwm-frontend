import { Bell, Moon, Sun, Search, Menu } from 'lucide-react';

const Topbar = ({ title, actionLabel, onAction, onMenuClick }) => {

    return (
        <header className="admin-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                    className="admin-nav-trigger lg:hidden"
                    onClick={onMenuClick}
                    aria-label="Toggle Menu"
                >
                    <Menu size={20} />
                </button>
                <h1 className="admin-topbar-title">{title}</h1>
            </div>

            <div className="admin-topbar-actions">
                <div className="relative hidden lg:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="admin-search-input"
                        style={{
                            padding: '0.6rem 1rem 0.6rem 2.5rem',
                            borderRadius: '10px',
                            border: '1px solid var(--admin-border)',
                            background: '#f8fafc',
                            fontSize: '0.875rem',
                            width: '240px'
                        }}
                    />
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Theme and Notification icons moved to Settings page */}
                </div>

                {actionLabel && (
                    <button className="admin-action-btn" onClick={onAction}>
                        + {actionLabel}
                    </button>
                )}
            </div>
        </header>
    );
};

export default Topbar;
