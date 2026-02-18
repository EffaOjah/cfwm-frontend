import AdminLayout from '../../components/admin/AdminLayout';
import Topbar from '../../components/admin/Topbar';
import {
    Search,
    UserPlus,
    Heart,
    Trash2,
    Calendar,
    MessageSquare,
    Clock,
    Phone,
    Mail,
    Eye,
    MoreVertical,
    CheckCircle,
    MapPin,
    AlertCircle,
    FileType
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import AdminModal from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import ActionDropdown from '../../components/admin/ActionDropdown';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const ManageForms = () => {
    const dropdownTriggerRef = useRef(null);
    const [activeTab, setActiveTab] = useState('firstTimers');
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null); // { type, id }
    const [selectedItem, setSelectedItem] = useState(null); // For "View Details"
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [firstTimers, setFirstTimers] = useState([]);
    const [prayerRequests, setPrayerRequests] = useState([]);

    // Fetch data
    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const [ftRes, prRes] = await Promise.all([
                fetch(`${API_BASE_URL}/forms/first-timers`),
                fetch(`${API_BASE_URL}/forms/prayer-requests`)
            ]);

            if (!ftRes.ok || !prRes.ok) throw new Error('Failed to fetch submissions');

            const ftData = await ftRes.json();
            const prData = await prRes.json();

            // Map and normalize data
            setFirstTimers(ftData.map(item => ({
                id: item.id,
                name: item.full_name,
                phone: item.phone,
                email: item.email,
                address: item.address,
                howHeard: item.how_heard,
                date: new Date(item.created_at).toLocaleString(),
                status: item.status || 'Pending',
                pastoralVisit: item.wants_visit
            })));

            setPrayerRequests(prData.map(item => ({
                id: item.id,
                name: item.name,
                phone: item.phone,
                topic: item.topic,
                details: item.request_details,
                date: new Date(item.created_at).toLocaleString(),
                confidential: item.is_confidential,
                status: item.status || 'Pending'
            })));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Pagination State
    const [currentPageFT, setCurrentPageFT] = useState(1);
    const [currentPagePR, setCurrentPagePR] = useState(1);
    const [itemsPerPage] = useState(10);

    // Calculations
    const currentList = activeTab === 'firstTimers' ? firstTimers : prayerRequests;
    const totalPages = Math.ceil(currentList.length / itemsPerPage);
    const currentPage = activeTab === 'firstTimers' ? currentPageFT : currentPagePR;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedList = currentList.slice(startIndex, startIndex + itemsPerPage);

    const handleViewDetails = (item) => {
        setSelectedItem(item);
        setIsDetailsModalOpen(true);
        setActiveDropdownId(null);
    };

    const handleDeleteClick = (id) => {
        setItemToDelete({ type: activeTab, id });
        setIsDeleteModalOpen(true);
        setActiveDropdownId(null);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            const endpoint = itemToDelete.type === 'firstTimers' ? 'first-timers' : 'prayer-requests';
            const response = await fetch(`${API_BASE_URL}/forms/${endpoint}/${itemToDelete.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete record');

            if (activeTab === 'firstTimers') {
                setFirstTimers(firstTimers.filter(i => i.id !== itemToDelete.id));
            } else {
                setPrayerRequests(prayerRequests.filter(i => i.id !== itemToDelete.id));
            }
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        } catch (err) {
            console.error(err);
            alert('Error deleting record: ' + err.message);
        }
    };

    const toggleStatus = async (id) => {
        const item = currentList.find(i => i.id === id);
        if (!item) return;

        const nextStatus = item.status === 'Pending'
            ? (activeTab === 'firstTimers' ? 'Followed Up' : 'Prayed Over')
            : 'Pending';

        try {
            const endpoint = activeTab === 'firstTimers' ? 'first-timers' : 'prayer-requests';
            const response = await fetch(`${API_BASE_URL}/forms/${endpoint}/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus })
            });

            if (!response.ok) throw new Error('Failed to update status');

            if (activeTab === 'firstTimers') {
                setFirstTimers(firstTimers.map(i => i.id === id ? { ...i, status: nextStatus } : i));
            } else {
                setPrayerRequests(prayerRequests.map(i => i.id === id ? { ...i, status: nextStatus } : i));
            }
        } catch (err) {
            console.error(err);
            alert('Error updating status: ' + err.message);
        }
        setActiveDropdownId(null);
    };

    return (
        <AdminLayout>
            <Topbar title="Manage Forms Submissions" />

            <div className="admin-tabs-container">
                <button
                    onClick={() => setActiveTab('firstTimers')}
                    className={`admin-tab-btn ${activeTab === 'firstTimers' ? 'active' : ''}`}
                >
                    <UserPlus size={20} />
                    <span>First Timers</span>
                </button>
                <button
                    onClick={() => setActiveTab('prayerRequests')}
                    className={`admin-tab-btn ${activeTab === 'prayerRequests' ? 'active' : ''}`}
                >
                    <Heart size={20} />
                    <span>Prayer Requests</span>
                </button>
            </div>

            <div className="admin-card-container">
                <div className="admin-card-header">
                    <div>
                        <h2 style={{ fontSize: '1rem', fontWeight: 800 }}>
                            {activeTab === 'firstTimers' ? 'First Time Visitors' : 'Prayer Requests'}
                        </h2>
                        <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', margin: 0 }}>
                            Manage and track web form submissions
                        </p>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search submissions..."
                            className="admin-input px-10"
                            style={{ maxWidth: '300px' }}
                        />
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            {activeTab === 'firstTimers' ? (
                                <tr>
                                    <th>Visitor Name</th>
                                    <th>Contact Details</th>
                                    <th>Status</th>
                                    <th className="hide-mobile">Date</th>
                                    <th>Actions</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th>Name</th>
                                    <th>Request Info</th>
                                    <th>Status</th>
                                    <th className="hide-mobile">Date</th>
                                    <th>Actions</th>
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}>
                                        <div className="admin-loading-spinner" style={{ margin: '0 auto' }}></div>
                                        <p style={{ marginTop: '1rem', color: 'var(--admin-text-muted)' }}>Loading submissions...</p>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#dc2626' }}>
                                        <AlertCircle size={32} style={{ margin: '0 auto 1rem' }} />
                                        <p>{error}</p>
                                        <button onClick={fetchSubmissions} className="admin-action-btn-secondary" style={{ marginTop: '1rem' }}>Retry</button>
                                    </td>
                                </tr>
                            ) : paginatedList.length > 0 ? paginatedList.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '10px',
                                                background: '#f8fafc',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid var(--admin-border)'
                                            }}>
                                                {activeTab === 'firstTimers' ? <UserPlus size={18} className="text-rose-500" /> : <Heart size={18} className="text-rose-500" />}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800 }}>{item.name || "Anonymous"}</span>
                                                {activeTab === 'prayerRequests' && item.confidential && (
                                                    <span style={{ fontSize: '0.6rem', color: '#dc2626', fontWeight: 700 }}>CONFIDENTIAL</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {activeTab === 'firstTimers' ? (
                                            <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <Phone size={12} /> {item.phone}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <Mail size={12} /> {item.email}
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                                                <div style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>{item.topic}</div>
                                                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                                                    {item.details}
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <div
                                            className={`admin-status-badge ${item.status === 'Pending' ? 'pending' : 'success'}`}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => toggleStatus(item.id)}
                                        >
                                            {item.status === 'Pending' ? <Clock size={12} /> : <CheckCircle size={12} />}
                                            {item.status}
                                        </div>
                                    </td>
                                    <td className="hide-mobile">
                                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                                            {item.date}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                                            <button className="admin-icon-btn" onClick={() => handleViewDetails(item)}>
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                ref={activeDropdownId === item.id ? dropdownTriggerRef : null}
                                                className="admin-icon-btn"
                                                onClick={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)}
                                            >
                                                <MoreVertical size={16} />
                                            </button>
                                            <ActionDropdown
                                                isOpen={activeDropdownId === item.id}
                                                onClose={() => setActiveDropdownId(null)}
                                                triggerRef={dropdownTriggerRef}
                                                actions={[
                                                    {
                                                        label: activeTab === 'firstTimers' ? 'Mark Followed Up' : 'Mark Prayed Over',
                                                        icon: <CheckCircle size={16} />,
                                                        onClick: () => toggleStatus(item.id)
                                                    },
                                                    { label: 'Delete Record', icon: <Trash2 size={16} />, onClick: () => handleDeleteClick(item.id), type: 'danger' }
                                                ]}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--admin-text-muted)' }}>
                                        No submissions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div style={{ padding: '1rem', borderTop: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <button
                            className="admin-action-btn-secondary"
                            disabled={currentPage === 1}
                            onClick={() => activeTab === 'firstTimers' ? setCurrentPageFT(currentPage - 1) : setCurrentPagePR(currentPage - 1)}
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={currentPage === i + 1 ? "admin-action-btn" : "admin-action-btn-secondary"}
                                onClick={() => activeTab === 'firstTimers' ? setCurrentPageFT(i + 1) : setCurrentPagePR(i + 1)}
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="admin-action-btn-secondary"
                            disabled={currentPage === totalPages}
                            onClick={() => activeTab === 'firstTimers' ? setCurrentPageFT(currentPage + 1) : setCurrentPagePR(currentPage + 1)}
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            <AdminModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                title={activeTab === 'firstTimers' ? 'Visitor Details' : 'Prayer Request Details'}
                size="md"
            >
                {selectedItem && (
                    <div style={{ padding: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid var(--admin-border)' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--admin-border)' }}>
                                {activeTab === 'firstTimers' ? <UserPlus size={24} className="text-rose-500" /> : <Heart size={24} className="text-rose-500" />}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>{selectedItem.name || "Anonymous Submission"}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                                    <Calendar size={12} /> Received on {selectedItem.date}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div className="admin-detail-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                                    <Phone size={12} /> Phone Number
                                </label>
                                <p style={{ fontWeight: 600, margin: 0 }}>{selectedItem.phone || "Not provided"}</p>
                            </div>
                            {activeTab === 'firstTimers' && (
                                <div className="admin-detail-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                                        <Mail size={12} /> Email Address
                                    </label>
                                    <p style={{ fontWeight: 600, margin: 0 }}>{selectedItem.email || "Not provided"}</p>
                                </div>
                            )}
                            {activeTab === 'prayerRequests' && (
                                <div className="admin-detail-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                                        <FileType size={12} /> Topic
                                    </label>
                                    <p style={{ fontWeight: 600, margin: 0, color: 'var(--admin-primary)' }}>{selectedItem.topic}</p>
                                </div>
                            )}
                        </div>

                        {activeTab === 'firstTimers' ? (
                            <>
                                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                                        <MapPin size={12} /> Residential Address
                                    </label>
                                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{selectedItem.address}</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                                            <Search size={12} /> How Heard
                                        </label>
                                        <p style={{ fontWeight: 600, margin: 0, fontSize: '0.85rem' }}>{selectedItem.howHeard || "Not specified"}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '12px', border: '1px solid var(--admin-border)', background: selectedItem.pastoralVisit ? '#fffbeb' : '#f8fafc' }}>
                                        {selectedItem.pastoralVisit ? <AlertCircle size={20} className="text-amber-500" /> : <CheckCircle size={20} className="text-slate-400" />}
                                        <div>
                                            <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>Visit Requested?</span>
                                            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--admin-text-muted)' }}>
                                                {selectedItem.pastoralVisit ? "Yes" : "No"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '16px', border: '1px solid #fee2e2' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                                    <MessageSquare size={12} /> Prayer Request Details
                                </label>
                                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: '#450a0a' }}>
                                    "{selectedItem.details}"
                                </p>
                            </div>
                        )}

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button onClick={() => setIsDetailsModalOpen(false)} className="admin-action-btn-secondary px-8">Close</button>
                            <button
                                onClick={() => {
                                    toggleStatus(selectedItem.id);
                                    setIsDetailsModalOpen(false);
                                }}
                                className="admin-action-btn px-8"
                            >
                                {selectedItem.status === 'Pending' ? (activeTab === 'firstTimers' ? 'Mark Followed Up' : 'Mark Prayed Over') : 'Mark as Pending'}
                            </button>
                        </div>
                    </div>
                )}
            </AdminModal>

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title={`Delete Submission`}
                message={`Are you sure you want to delete this record? This action cannot be undone.`}
                type="danger"
            />
        </AdminLayout>
    );
};

export default ManageForms;
