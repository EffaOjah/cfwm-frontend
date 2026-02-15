import AdminLayout from '../../components/admin/AdminLayout';
import Topbar from '../../components/admin/Topbar';
import {
    Search,
    MoreVertical,
    Check,
    X,
    Trash2,
    User,
    Clock,
    Share2,
    Eye
} from 'lucide-react';
import { useState } from 'react';
import ConfirmModal from '../../components/admin/ConfirmModal';
import ActionDropdown from '../../components/admin/ActionDropdown';
import AdminModal from '../../components/admin/AdminModal';

const ManageTestimonies = () => {
    const [testimonies, setTestimonies] = useState([
        {
            id: '1',
            author: 'Sarah Johnson',
            category: 'Healing',
            content: 'I want to thank God for His healing power. For three years, I struggled with a severe heart condition that the doctors said required surgery. During the last Divine Encounter service, the man of God spoke a word about someone with a heart condition being healed. I claimed it, and when I went back for my checkup, the specialists were shocked to find my heart perfectly normal without any surgery! Praise the Lord!',
            status: 'published',
            date: '2023-10-24'
        },
        {
            id: '2',
            author: 'Michael Chen',
            category: 'Provision',
            content: 'I was out of a job for 18 months and things were very difficult for my family. We barely had enough to eat, but we kept trusting in God. Three weeks ago, I received three different job offers in one day, all with better salaries than my previous role. God truly provides in His own time! Today, I am gainfully employed and my family is flourishing.',
            status: 'pending',
            date: '2023-10-25'
        },
        {
            id: '3',
            author: 'Amara Okeke',
            category: 'Family',
            content: 'My family was on the verge of breaking apart. There was so much strife and misunderstanding between my husband and I. After attending the marriage seminar organized by the church, God touched our hearts. We learned to communicate and forgive. Today, our home is a haven of peace and love. Thank you Jesus for restoring my marriage.',
            status: 'published',
            date: '2023-10-23'
        },
        {
            id: '4',
            author: 'David Miller',
            category: 'Finance',
            content: 'I was drowning in debt and my business was failing. I decided to start honoring God with my tithes and offerings faithfully despite the lack. Miraculously, a client I hadn\'t heard from in years called me for a major project that cleared all my debts and gave my business a fresh start. God is a rewarder of those who seek Him!',
            status: 'rejected',
            date: '2023-10-22'
        },
        {
            id: '5',
            author: 'Blessing Udoh',
            category: 'Fruit of the Womb',
            content: 'After 10 years of marriage without a child, people had started mocking us. We went to various hospitals but there was no hope. We joined the prayer chain for "The Fruitful Vine" program. Six months later, I am here to testify that I am 5 months pregnant with twins! What God cannot do does not exist!',
            status: 'pending',
            date: '2023-10-21'
        },
        {
            id: '6',
            author: 'Chidi Okafor',
            category: 'Protection',
            content: 'I was traveling to the village last week when armed robbers attacked our bus. They were shooting sporadically, and a bullet actually hit my window but it didn\'t penetrate. It felt like an invisible shield was around me. No one in our bus was hurt, though the bus itself was riddled with bullets. I am truly grateful for God\'s protection over my life.',
            status: 'published',
            date: '2023-10-20'
        },
        {
            id: '7',
            author: 'Esther Williams',
            category: 'Promotion',
            content: 'I have been in the same position for over 7 years with no promotion. I felt stuck and overlooked. I decided to sow a sacrificial seed and prayed for a breakthrough. Last Friday, I was not only promoted but I was leapfrogged over two seniors to become the Head of my Department! God has truly honored my faith.',
            status: 'pending',
            date: '2023-10-19'
        },
    ]);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [viewingTestimony, setViewingTestimony] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const handleDeleteClick = (id) => {
        setIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (idToDelete) {
            setTestimonies(prev => prev.filter(item => item.id !== idToDelete));
            setIsDeleteModalOpen(false);
            setIdToDelete(null);
        }
    };

    const handleStatusUpdate = (id, newStatus) => {
        setTestimonies(prev => prev.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        ));
    };

    const handleCopyContent = (content) => {
        navigator.clipboard.writeText(content);
        alert('Testimony content copied!');
    };

    const handleViewDetails = (testimony) => {
        setViewingTestimony(testimony);
        setIsDetailsModalOpen(true);
        setActiveDropdownId(null);
    };

    // Pagination Logic
    const totalPages = Math.ceil(testimonies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTestimonies = testimonies.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <AdminLayout>
            <Topbar title="Manage Testimonies" />

            <div className="admin-card-container">
                <div className="admin-card-header">
                    <div className="admin-filter-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
                        {/* <div className="relative" style={{ flex: '1 1 280px', minWidth: '0' }}>
                            <input
                                type="text"
                                placeholder="Search stories..."
                                className="admin-input"
                                style={{ paddingLeft: '2.5rem', width: '100%' }}
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div> */}
                        <select className="admin-select" style={{ width: '100%', maxWidth: '200px', flex: '1 1 140px' }}>
                            <option value="all">All Categories</option>
                            <option value="healing">Healing</option>
                            <option value="provision">Provision</option>
                            <option value="family">Family</option>
                            <option value="fruit">Fruit of the Womb</option>
                        </select>
                    </div>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Author & Category</th>
                                <th>Content Snippet</th>
                                <th className="hide-mobile">Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTestimonies.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <User size={16} className="text-slate-400" />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700 }}>{item.author}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--admin-primary)', fontWeight: 600 }}>{item.category.toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-slate-500 italic" style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            "{item.content}"
                                        </div>
                                    </td>
                                    <td className="hide-mobile">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)' }}>
                                            <Clock size={12} />
                                            <span style={{ fontSize: '0.8rem' }}>{item.date}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`admin-status-badge status-${item.status}`}>
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                                            {item.status === 'pending' && (
                                                <>
                                                    <button
                                                        className="admin-icon-btn hover:text-emerald-600 hover:bg-emerald-50"
                                                        title="Approve"
                                                        onClick={() => handleStatusUpdate(item.id, 'published')}
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                    <button
                                                        className="admin-icon-btn hover:text-rose-600 hover:bg-rose-50"
                                                        title="Reject"
                                                        onClick={() => handleStatusUpdate(item.id, 'rejected')}
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                className="admin-icon-btn hover:text-red-500 hover:bg-red-50"
                                                title="Delete"
                                                onClick={() => handleDeleteClick(item.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div style={{ position: 'relative' }}>
                                                <button
                                                    className="admin-icon-btn"
                                                    title="More"
                                                    onClick={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                <ActionDropdown
                                                    isOpen={activeDropdownId === item.id}
                                                    onClose={() => setActiveDropdownId(null)}
                                                    actions={[
                                                        { label: 'View Details', icon: <Eye size={16} />, onClick: () => handleViewDetails(item) },
                                                        { label: 'Copy Content', icon: <Share2 size={16} />, onClick: () => handleCopyContent(item.content) },
                                                        { label: 'Delete', icon: <Trash2 size={16} />, onClick: () => handleDeleteClick(item.id), type: 'danger' },
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, testimonies.length)} of {testimonies.length} stories
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            className="admin-action-btn-secondary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                className={currentPage === i + 1 ? "admin-action-btn" : "admin-action-btn-secondary"}
                                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            className="admin-action-btn-secondary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Testimony"
                message="Are you sure you want to remove this testimony? This cannot be undone."
                confirmText="Delete Testimony"
                type="danger"
            />

            <AdminModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                title="Testimony Details"
                size="medium"
            >
                {viewingTestimony && (
                    <div style={{ padding: '0.5rem' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--admin-text)', marginBottom: '0.25rem' }}>
                                    {viewingTestimony.author}
                                </h3>
                                <span className={`admin-status-badge status-${viewingTestimony.status}`}>
                                    {viewingTestimony.status.toUpperCase()}
                                </span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>
                                    {viewingTestimony.category.toUpperCase()}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                                    <Clock size={12} /> {viewingTestimony.date}
                                </div>
                            </div>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                            <p style={{ lineHeight: 1.6, color: '#475569', whiteSpace: 'pre-wrap', fontStyle: 'italic' }}>
                                "{viewingTestimony.content}"
                            </p>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button
                                className="admin-action-btn-secondary"
                                onClick={() => setIsDetailsModalOpen(false)}
                            >
                                Close
                            </button>
                            {viewingTestimony.status === 'pending' && (
                                <button
                                    className="admin-action-btn"
                                    onClick={() => {
                                        handleStatusUpdate(viewingTestimony.id, 'published');
                                        setIsDetailsModalOpen(false);
                                    }}
                                >
                                    Approve Testimony
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </AdminModal>
        </AdminLayout>
    );
};

export default ManageTestimonies;
