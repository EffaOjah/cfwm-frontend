import AdminLayout from '../../components/admin/AdminLayout';
import Topbar from '../../components/admin/Topbar';
import {
    Users,
    MessageSquare,
    ShoppingBag,
    TrendingUp,
    CheckCircle,
    Clock,
    ExternalLink,
    Calendar,
    Music,
    Eye,
    Heart,
    User
} from 'lucide-react';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        counts: { testimonies: 0, events: 0, sermons: 0 },
        trends: { testimonies: null },
        recentTestimonies: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/stats/overview`);
                if (!response.ok) throw new Error('Failed to fetch dashboard data');
                const data = await response.json();
                setDashboardData(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const stats = [
        { label: 'Total Testimonies', value: dashboardData.counts.testimonies || 0, trend: dashboardData.trends?.testimonies || '—', trendUp: true, icon: <MessageSquare size={24} />, color: '#3b82f6' },
        { label: 'Total Events', value: dashboardData.counts.events || 0, trend: 'Church Calendar', icon: <Calendar size={24} />, color: '#f59e0b' },
        { label: 'Total Sermons', value: dashboardData.counts.sermons || 0, trend: 'Audio & Video', icon: <Music size={24} />, color: '#10b981' },
        { label: 'Impact Reach', value: '4.9k', trend: 'Global followers', icon: <TrendingUp size={24} />, color: '#8b5cf6' },
    ];

    return (
        <AdminLayout>
            <Topbar title="Dashboard Overview" />

            {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard data...</div>
            ) : (
                <>
                    <div className="admin-stats-grid">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="admin-stat-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div className="admin-stat-label">{stat.label}</div>
                                    <div style={{ padding: '0.5rem', borderRadius: '12px', background: `${stat.color}15`, color: stat.color }}>
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="admin-stat-value">{stat.value}</div>
                                <div className={`admin-stat-trend ${stat.trendUp ? 'admin-trend-up' : ''}`}>
                                    {stat.trend}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="admin-grid-split">
                        {/* Recent Testimonies Table */}
                        <div className="admin-card-container">
                            <div className="admin-card-header">
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Testimonies</h2>
                                <Link to="/admin/testimonies" style={{ color: 'var(--admin-primary)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
                                    View All
                                </Link>
                            </div>
                            <div className="admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Author</th>
                                            <th>Date</th>
                                            <th>Story Snippet</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dashboardData.recentTestimonies.map((testimony) => (
                                            <tr key={testimony.id}>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Users size={16} className="text-slate-400" />
                                                        </div>
                                                        <span style={{ fontWeight: 600 }}>{testimony.name}</span>
                                                    </div>
                                                </td>
                                                <td className="text-slate-500">
                                                    {new Date(testimony.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="text-slate-500 italic">
                                                    {testimony.content.length > 50 ? `${testimony.content.substring(0, 50)}...` : testimony.content}
                                                </td>
                                                <td>
                                                    <span className={`admin-status-badge status-${testimony.status}`}>
                                                        {testimony.status.charAt(0).toUpperCase() + testimony.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link to="/admin/testimonies" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--admin-primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
                                                        <Eye size={16} /> View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="admin-card-container">
                            <div className="admin-card-header">
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Activity</h2>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                {dashboardData.recentActivity?.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {dashboardData.recentActivity.map((activity, idx) => {
                                            const typeConfig = {
                                                testimony: { icon: <MessageSquare size={14} />, color: '#3b82f6' },
                                                event: { icon: <Calendar size={14} />, color: '#f59e0b' },
                                                sermon: { icon: <Music size={14} />, color: '#10b981' },
                                                prayer: { icon: <Heart size={14} />, color: '#ef4444' },
                                                firstTimer: { icon: <User size={14} />, color: '#8b5cf6' },
                                            };
                                            const { icon, color } = typeConfig[activity.type] || { icon: <Clock size={14} />, color: '#8b5cf6' };

                                            const timeAgo = (dateStr) => {
                                                const diff = Date.now() - new Date(dateStr).getTime();
                                                const mins = Math.floor(diff / 60000);
                                                if (mins < 60) return `${mins} min${mins !== 1 ? 's' : ''} ago`;
                                                const hrs = Math.floor(mins / 60);
                                                if (hrs < 24) return `${hrs} hr${hrs !== 1 ? 's' : ''} ago`;
                                                const days = Math.floor(hrs / 24);
                                                return `${days} day${days !== 1 ? 's' : ''} ago`;
                                            };

                                            return (
                                                <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                                                    <div style={{
                                                        width: '32px', height: '32px', borderRadius: '50%',
                                                        background: `${color}15`, color,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        flexShrink: 0
                                                    }}>
                                                        {icon}
                                                    </div>
                                                    <div>
                                                        <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>{activity.title}</p>
                                                        <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', margin: '0.25rem 0' }}>{activity.desc}</p>
                                                        <p style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{timeAgo(activity.date)}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>No recent activity.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
};

export default AdminDashboard;
