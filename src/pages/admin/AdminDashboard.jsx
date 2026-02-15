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
    Music
} from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Testimonies', value: '1,284', trend: '+12%', trendUp: true, icon: <MessageSquare size={24} />, color: '#3b82f6' },
        { label: 'Total Events', value: '48', trend: 'Next: Sunday Service', icon: <Calendar size={24} />, color: '#f59e0b' },
        { label: 'Total Sermons', value: '256', trend: '+4 this month', trendUp: true, icon: <Music size={24} />, color: '#10b981' },
        { label: 'Impact Reach', value: '45.2k', trend: 'Global followers', icon: <TrendingUp size={24} />, color: '#8b5cf6' },
    ];

    const recentTestimonies = [
        { id: 1, author: 'Sarah Johnson', date: 'Oct 24, 2023', snippet: '"God turned my life around..."', status: 'published' },
        { id: 2, author: 'Michael Chen', date: 'Oct 25, 2023', snippet: '"I was healed from..."', status: 'pending' },
        { id: 3, author: 'Amara Okeke', date: 'Oct 23, 2023', snippet: '"My family was blessed..."', status: 'published' },
        { id: 4, author: 'David Miller', date: 'Oct 22, 2023', snippet: '"The financial miracle..."', status: 'rejected' },
    ];

    return (
        <AdminLayout>
            <Topbar title="Dashboard Overview" />

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
                        <button style={{ color: 'var(--admin-primary)', fontSize: '0.875rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                            View All
                        </button>
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
                                {recentTestimonies.map((testimony) => (
                                    <tr key={testimony.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Users size={16} className="text-slate-400" />
                                                </div>
                                                <span style={{ fontWeight: 600 }}>{testimony.author}</span>
                                            </div>
                                        </td>
                                        <td className="text-slate-500">{testimony.date}</td>
                                        <td className="text-slate-500 italic">{testimony.snippet}</td>
                                        <td>
                                            <span className={`admin-status-badge status-${testimony.status}`}>
                                                {testimony.status.charAt(0).toUpperCase() + testimony.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            {testimony.status === 'pending' ? (
                                                <button style={{ padding: '0.4rem 0.8rem', background: 'var(--admin-primary)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                                                    Approve
                                                </button>
                                            ) : (
                                                <button style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>
                                                    <ExternalLink size={16} />
                                                </button>
                                            )}
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { title: 'Testimony Approved', desc: "Michael Chen's story was published by Pastor Joe.", time: '2 mins ago', icon: <CheckCircle size={14} />, color: '#10b981' },
                                { title: 'New Submission', desc: "Sarah Johnson submitted a new testimony.", time: '45 mins ago', icon: <Clock size={14} />, color: '#3b82f6' },
                                { title: 'New Admin Added', desc: "Robert Smith was granted content moderator access.", time: '1 day ago', icon: <Users size={14} />, color: '#8b5cf6' },
                            ].map((activity, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: `${activity.color}15`,
                                        color: activity.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        {activity.icon}
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>{activity.title}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', margin: '0.25rem 0' }}>{activity.desc}</p>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button style={{
                            width: '100%',
                            marginTop: '1.5rem',
                            padding: '0.75rem',
                            background: '#f8fafc',
                            border: '1px solid var(--admin-border)',
                            borderRadius: '12px',
                            color: 'var(--admin-primary)',
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}>
                            View All Activity
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
