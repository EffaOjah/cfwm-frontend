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
import { useState } from 'react';
import AdminModal from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import ActionDropdown from '../../components/admin/ActionDropdown';

const ManageForms = () => {
    const [activeTab, setActiveTab] = useState('firstTimers');
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null); // { type, id }
    const [selectedItem, setSelectedItem] = useState(null); // For "View Details"
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    // Sample Data for First Timers
    const [firstTimers, setFirstTimers] = useState([
        { id: '1', name: 'John Doe', phone: '+234 801 000 0001', email: 'john@example.com', address: '123 Lekki Phase 1, Lagos', date: '2023-10-24 09:30', status: 'Pending', pastoralVisit: true },
        { id: '2', name: 'Mary Smith', phone: '+234 801 000 0002', email: 'mary@example.com', address: '45 Allen Avenue, Ikeja', date: '2023-10-25 11:15', status: 'Followed Up', pastoralVisit: false },
        { id: '3', name: 'James Wilson', phone: '+234 802 333 4444', email: 'james.w@example.com', address: 'Plot 7, Gwarinpa, Abuja', date: '2023-10-26 14:20', status: 'Pending', pastoralVisit: true },
        { id: '4', name: 'Sarah Bakare', phone: '+234 803 555 6666', email: 'sbakare@example.com', address: '12 Opebi, Lagos', date: '2023-10-27 10:00', status: 'Pending', pastoralVisit: false },
        { id: '5', name: 'Peter Obi', phone: '+234 805 777 8888', email: 'p.obi@example.com', address: '88 Trans-Amadi, PH', date: '2023-10-28 16:45', status: 'Followed Up', pastoralVisit: true },
        { id: '6', name: 'Grace Adebayo', phone: '+234 809 111 2222', email: 'grace.a@example.com', address: '15 Challenge, Ibadan', date: '2023-10-29 08:30', status: 'Pending', pastoralVisit: false }
    ]);

    // Sample Data for Prayer Requests
    const [prayerRequests, setPrayerRequests] = useState([
        { id: '1', name: 'Jane Smith', phone: '+234 801 222 3333', topic: 'Healing', details: 'Please pray for my mother healing from persistent back pain. She has been in discomfort for 3 weeks.', date: '2023-10-24 10:00', confidential: true, status: 'Prayed Over' },
        { id: '2', name: 'James Brown', phone: '+234 801 444 5555', topic: 'Travel', details: 'Traveling mercies for my upcoming trip to Calabar for the district conference.', date: '2023-10-25 15:30', confidential: false, status: 'Pending' },
        { id: '3', name: 'Bose Williams', phone: '+234 802 666 7777', topic: 'Financial', details: 'I need a breakthrough in my business. Sales have been low lately.', date: '2023-10-26 09:15', confidential: false, status: 'Pending' },
        { id: '4', name: 'Samuel Okoro', phone: '+234 803 888 9999', topic: 'Spiritual', details: 'Praying for spiritual growth and deeper intimacy with God.', date: '2023-10-27 12:45', confidential: true, status: 'Pending' },
        { id: '5', name: 'Esther Ani', phone: '+234 805 111 0000', topic: 'Family', details: 'Restoration of peace within my family unit.', date: '2023-10-28 17:30', confidential: false, status: 'Prayed Over' },
        { id: '6', name: 'David Mark', phone: '+234 809 222 1111', topic: 'Work', details: 'I am seeking a new job opportunity in the tech sector.', date: '2023-10-29 11:00', confidential: false, status: 'Pending' }
    ]);

    // Pagination State
    const [currentPageFT, setCurrentPageFT] = useState(1);
    const [currentPagePR, setCurrentPagePR] = useState(1);
    const [itemsPerPage] = useState(5);

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

    const confirmDelete = () => {
        if (itemToDelete) {
            if (activeTab === 'firstTimers') {
                setFirstTimers(firstTimers.filter(i => i.id !== itemToDelete.id));
            } else {
                setPrayerRequests(prayerRequests.filter(i => i.id !== itemToDelete.id));
            }
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        }
    };

    const toggleStatus = (id) => {
        if (activeTab === 'firstTimers') {
            setFirstTimers(firstTimers.map(i => {
                if (i.id === id) {
                    return { ...i, status: i.status === 'Pending' ? 'Followed Up' : 'Pending' };
                }
                return i;
            }));
        } else {
            setPrayerRequests(prayerRequests.map(i => {
                if (i.id === id) {
                    return { ...i, status: i.status === 'Pending' ? 'Prayed Over' : 'Pending' };
                }
                return i;
            }));
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
                            {paginatedList.length > 0 ? paginatedList.map((item) => (
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
                                            <div style={{ position: 'relative' }}>
                                                <button
                                                    className="admin-icon-btn"
                                                    onClick={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                                <ActionDropdown
                                                    isOpen={activeDropdownId === item.id}
                                                    onClose={() => setActiveDropdownId(null)}
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
                                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                                        <MapPin size={12} /> Residential Address
                                    </label>
                                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{selectedItem.address}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '12px', border: '1px solid var(--admin-border)', background: selectedItem.pastoralVisit ? '#fffbeb' : '#f8fafc' }}>
                                    {selectedItem.pastoralVisit ? <AlertCircle size={20} className="text-amber-500" /> : <CheckCircle size={20} className="text-slate-400" />}
                                    <div>
                                        <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Pastoral Visit Requested?</span>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                                            {selectedItem.pastoralVisit ? "The visitor explicitly requested a visit from a pastor." : "No specific visit request was made."}
                                        </p>
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
