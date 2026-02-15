import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Topbar from '../../components/admin/Topbar';
import { Moon, Sun, Bell, Shield, User, Save, ToggleLeft, ToggleRight } from 'lucide-react';

const ManageSettings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const SettingToggle = ({ icon: Icon, label, description, active, onClick, color = "#ef4444" }) => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem',
            background: 'white',
            borderRadius: '16px',
            border: '1px solid var(--admin-border)',
            marginBottom: '1rem'
        }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: `${color}10`,
                    color: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={20} />
                </div>
                <div>
                    <p style={{ fontWeight: 700, margin: 0, color: 'var(--admin-text-main)' }}>{label}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', margin: '0.25rem 0 0' }}>{description}</p>
                </div>
            </div>
            <button
                onClick={onClick}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: active ? 'var(--admin-primary)' : '#cbd5e1',
                    transition: 'all 0.3s ease'
                }}
            >
                {active ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
            </button>
        </div>
    );

    return (
        <AdminLayout>
            <Topbar title="Admin Configuration" />

            <div style={{ maxWidth: '800px' }}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Appearance & Experience</h2>
                    <SettingToggle
                        icon={isDarkMode ? Moon : Sun}
                        label="Dark Interface Mode"
                        description="Switch between light and dark dashboard themes for reduced eye strain."
                        active={isDarkMode}
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        color="#8b5cf6"
                    />
                    <SettingToggle
                        icon={Bell}
                        label="Desktop Notifications"
                        description="Receive real-time alerts for new form submissions and testimony updates."
                        active={notificationsEnabled}
                        onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                        color="#3b82f6"
                    />
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Security & Access</h2>
                    <div className="admin-card-container" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ fontWeight: 600, margin: 0 }}>Two-Factor Authentication</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', margin: '0.25rem 0 0' }}>Add an extra layer of security to your account.</p>
                                </div>
                                <button className="admin-action-btn-secondary" style={{ fontSize: '0.8rem' }}>Setup 2FA</button>
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px solid var(--admin-border)', margin: 0 }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ fontWeight: 600, margin: 0 }}>Change Password</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', margin: '0.25rem 0 0' }}>Last updated 3 months ago.</p>
                                </div>
                                <button className="admin-action-btn-secondary" style={{ fontSize: '0.8rem' }}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className="admin-action-btn"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '1rem 2rem',
                        fontSize: '1rem'
                    }}
                >
                    <Save size={20} />
                    Save Configuration
                </button>
            </div>
        </AdminLayout>
    );
};

export default ManageSettings;
