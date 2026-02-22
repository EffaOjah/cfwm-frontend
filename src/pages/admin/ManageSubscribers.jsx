import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Topbar from '../../components/admin/Topbar';
import {
    Search,
    Trash2,
    Mail,
    Clock,
    MoreVertical,
    Download
} from 'lucide-react';
import ConfirmModal from '../../components/admin/ConfirmModal';
import ResponseModal from '../../components/admin/ResponseModal';
import ActionDropdown from '../../components/admin/ActionDropdown';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const ManageSubscribers = () => {
    const dropdownTriggerRef = useRef(null);

    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [activeDropdownId, setActiveDropdownId] = useState(null);

    // Response Modal State
    const [responseModal, setResponseModal] = useState({
        isOpen: false,
        type: 'success',
        title: '',
        message: ''
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/newsletter/subscribers`);
            if (!response.ok) throw new Error('Failed to fetch subscribers');
            const data = await response.json();
            setSubscribers(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching subscribers:', err);
        } finally {
            setLoading(false);
        }
    };

    const showResponse = (type, title, message) => {
        setResponseModal({
            isOpen: true,
            type,
            title,
            message
        });
    };

    const handleDeleteClick = (id) => {
        setIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!idToDelete) return;
        try {
            const response = await fetch(`${API_BASE_URL}/newsletter/subscriber/${idToDelete}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to remove subscriber');
            await fetchSubscribers();
            setIsDeleteModalOpen(false);
            setIdToDelete(null);
            showResponse('success', 'Subscriber Removed', 'The email has been removed from the newsletter list.');
        } catch (err) {
            showResponse('error', 'Action Failed', err.message);
        }
    };

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const exportToCSV = () => {
        const headers = ['Email', 'Status', 'Date Joined'];
        const csvContent = [
            headers.join(','),
            ...filteredSubscribers.map(sub => `${sub.email},${sub.status},${new Date(sub.created_at).toLocaleDateString()}`)
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Pagination Logic
    const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSubscribers = filteredSubscribers.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <AdminLayout>
            <Topbar title="Newsletter Subscribers" />

            <div className="admin-card-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '1rem', flexWrap: 'wrap' }}>
                    <div className="relative" style={{ flex: '1 1 300px', maxWidth: '400px' }}>
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search emails..."
                            className="admin-input"
                            style={{ paddingLeft: '2.75rem' }}
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <button className="admin-action-btn" onClick={exportToCSV} style={{ whiteSpace: 'nowrap' }}>
                        <Download size={18} style={{ marginRight: '0.5rem' }} />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            <div className="admin-card-container">
                <div className="admin-table-container">
                    {loading ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                            <div className="admin-loader">Loading subscribers...</div>
                        </div>
                    ) : error ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#ef4444' }}>
                            <p>Error: {error}</p>
                            <button className="admin-action-btn-secondary" onClick={fetchSubscribers} style={{ marginTop: '1rem' }}>Retry</button>
                        </div>
                    ) : filteredSubscribers.length === 0 ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                            <p>No subscribers found.</p>
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Email Address</th>
                                    <th>Status</th>
                                    <th>Date Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedSubscribers.map((sub) => (
                                    <tr key={sub.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Mail size={16} className="text-slate-400" />
                                                </div>
                                                <div style={{ fontWeight: 600 }}>{sub.email}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`admin-status-badge status-${sub.status}`}>
                                                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)' }}>
                                                <Clock size={12} />
                                                <span style={{ fontSize: '0.8rem' }}>{new Date(sub.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                                                <button
                                                    className="admin-icon-btn hover:text-red-500 hover:bg-red-50"
                                                    title="Remove"
                                                    onClick={() => handleDeleteClick(sub.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {filteredSubscribers.length > itemsPerPage && (
                    <div className="admin-pagination">
                        <p className="admin-pagination-info">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSubscribers.length)} of {filteredSubscribers.length} subscribers
                        </p>
                        <div className="admin-pagination-controls">
                            <button
                                className="admin-pagination-btn"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    className={`admin-pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="admin-pagination-btn"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Remove Subscriber"
                message="Are you sure you want to remove this email from the newsletter list?"
                confirmText="Remove"
                type="danger"
            />

            <ResponseModal
                isOpen={responseModal.isOpen}
                onClose={() => setResponseModal(prev => ({ ...prev, isOpen: false }))}
                type={responseModal.type}
                title={responseModal.title}
                message={responseModal.message}
            />
        </AdminLayout>
    );
};

export default ManageSubscribers;
