import { useState, useEffect, useRef } from 'react';
import { ActionDropdown, AdminLayout, Topbar, ConfirmModal, ResponseModal } from '../../components/admin';
import { adminFetch } from '../../utils/adminFetch';
import { Search, Trash2, Clock, CheckCircle, XCircle, MoreVertical, MessageSquare, User, Eye, Share2, Check, X } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const ManageTestimonies = () => {
    const dropdownTriggerRef = useRef(null);

    const [testimonies, setTestimonies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(null);
    const [viewingTestimony, setViewingTestimony] = useState(null);

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
        fetchTestimonies();
    }, []);

    const fetchTestimonies = async () => {
        try {
            setLoading(true);
            const response = await adminFetch('/testimonies/all');
            if (!response.ok) throw new Error('Failed to fetch testimonies');
            const data = await response.json();
            setTestimonies(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching testimonies:', err);
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
            const response = await adminFetch(`/testimonies/${idToDelete}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to remove testimony');

            await fetchTestimonies();
            setIsDeleteModalOpen(false);
            setIdToDelete(null);
            showResponse('success', 'Testimony Deleted', 'The testimony has been permanently removed.');
        } catch (err) {
            showResponse('error', 'Action Failed', err.message);
        }
    };

    const handleStatusUpdate = async (testimony, newStatus) => {
        try {
            const response = await adminFetch(`/testimonies/${testimony.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...testimony,
                    status: newStatus
                })
            });
            if (!response.ok) throw new Error('Failed to update status');

            await fetchTestimonies();
            showResponse('success', 'Status Updated', `Testimony is now ${newStatus}.`);
        } catch (err) {
            showResponse('error', 'Action Failed', err.message);
        }
    };

    const handleCopyContent = (content) => {
        navigator.clipboard.writeText(content);
        showResponse('success', 'Copied', 'Testimony content copied to clipboard.');
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
                <div className="admin-table-container">
                    {loading ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                            <div className="admin-loader">Loading testimonies...</div>
                        </div>
                    ) : error ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#ef4444' }}>
                            <p>Error: {error}</p>
                            <button className="admin-action-btn-secondary" onClick={fetchTestimonies} style={{ marginTop: '1rem' }}>Retry</button>
                        </div>
                    ) : testimonies.length === 0 ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                            <p>No testimonies found yet.</p>
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Testimony Content</th>
                                    <th className="hide-mobile">Date Submitted</th>
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
                                                <div style={{ fontWeight: 700 }}>{item.name}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-slate-500 italic" style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                "{item.content}"
                                            </div>
                                        </td>
                                        <td className="hide-mobile">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)' }}>
                                                <Clock size={12} />
                                                <span style={{ fontSize: '0.8rem' }}>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</span>
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
                                                            onClick={() => handleStatusUpdate(item, 'approved')}
                                                        >
                                                            <Check size={16} />
                                                        </button>
                                                        <button
                                                            className="admin-icon-btn hover:text-rose-600 hover:bg-rose-50"
                                                            title="Reject"
                                                            onClick={() => handleStatusUpdate(item, 'rejected')}
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
                                                <button
                                                    ref={activeDropdownId === item.id ? dropdownTriggerRef : null}
                                                    className="admin-icon-btn"
                                                    title="More"
                                                    onClick={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                                <ActionDropdown
                                                    isOpen={activeDropdownId === item.id}
                                                    onClose={() => setActiveDropdownId(null)}
                                                    triggerRef={dropdownTriggerRef}
                                                    actions={[
                                                        { label: 'View Details', icon: <Eye size={16} />, onClick: () => handleViewDetails(item) },
                                                        { label: 'Copy Content', icon: <Share2 size={16} />, onClick: () => handleCopyContent(item.content) },
                                                        { label: 'Delete', icon: <Trash2 size={16} />, onClick: () => handleDeleteClick(item.id), type: 'danger' },
                                                    ]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
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
                                    {viewingTestimony.name}
                                </h3>
                                <span className={`admin-status-badge status-${viewingTestimony.status}`}>
                                    {viewingTestimony.status.toUpperCase()}
                                </span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                                    <Clock size={12} /> {viewingTestimony.created_at ? new Date(viewingTestimony.created_at).toLocaleDateString() : 'N/A'}
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
                                        handleStatusUpdate(viewingTestimony, 'approved');
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

            <ResponseModal
                isOpen={responseModal.isOpen}
                onClose={() => setResponseModal(prev => ({ ...prev, isOpen: false }))}
                type={responseModal.type}
                title={responseModal.title}
                message={responseModal.message}
            />
        </AdminLayout >
    );
};

export default ManageTestimonies;
