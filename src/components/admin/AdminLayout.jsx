import { useState, cloneElement, Children } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import '../../admin.css';

const AdminLayout = ({ children }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Enhance children to automatically pass onMenuClick to Topbar if present
    const enhancedChildren = Children.map(children, child => {
        if (child?.type === Topbar) {
            return cloneElement(child, {
                onMenuClick: () => setIsMobileOpen(true)
            });
        }
        return child;
    });

    return (
        <div className="admin-body">
            <div className="admin-layout">
                {/* Overlay for mobile */}
                {isMobileOpen && (
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(15, 23, 42, 0.4)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 950
                        }}
                        onClick={() => setIsMobileOpen(false)}
                    ></div>
                )}

                <Sidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

                <main className="admin-main-content">
                    {enhancedChildren}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
