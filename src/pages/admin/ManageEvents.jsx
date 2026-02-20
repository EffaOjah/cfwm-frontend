import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Topbar from '../../components/admin/Topbar';
import {
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Calendar,
    MapPin,
    Clock,
    Plus
} from 'lucide-react';
import AdminModal from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import ResponseModal from '../../components/admin/ResponseModal';
import ActionDropdown from '../../components/admin/ActionDropdown';
import { ExternalLink, Share2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const ManageEvents = () => {
    const dropdownTriggerRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [editingEventId, setEditingEventId] = useState(null);
    const [eventIdToDelete, setEventIdToDelete] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    // Response Modal State
    const [responseModal, setResponseModal] = useState({
        isOpen: false,
        type: 'success',
        title: '',
        message: ''
    });

    const showResponse = (type, title, message) => {
        setResponseModal({
            isOpen: true,
            type,
            title,
            message
        });
    };

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const initialFormState = {
        title: '',
        subtitle: '',
        category: 'Service',
        organizer: 'CFWM',
        status: 'published',
        date: '',
        time: '',
        location: '',
        image_url: '',
        description: '',
        highlights: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/events`);
            if (!response.ok) throw new Error('Failed to fetch events');
            const data = await response.json();
            // Map backend event_date/time to frontend date/time for UI compatibility
            const mappedEvents = data.map(event => ({
                ...event,
                date: event.event_date ? event.event_date.split('T')[0] : '',
                time: event.event_time || ''
            }));
            setEvents(mappedEvents);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (event = null) => {
        if (event) {
            setEditingEventId(event.id);
            setFormData({
                title: event.title || '',
                subtitle: event.subtitle || '',
                category: event.category || 'Service',
                organizer: event.organizer || 'CFWM',
                status: event.status || 'published',
                date: event.date || '',
                time: event.time || '',
                location: event.location || '',
                image_url: event.image_url || '',
                description: event.description || '',
                highlights: event.highlights || ''
            });
            setPreviewUrl(event.image_url || '');
            setSelectedFile(null);
        } else {
            setEditingEventId(null);
            setFormData(initialFormState);
            setPreviewUrl('');
            setSelectedFile(null);
        }
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setSelectedFile(file);
            if (file) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        // Map frontend fields back to backend naming convention
        const formDataPayload = new FormData();

        // Add text fields
        Object.keys(formData).forEach(key => {
            if (key !== 'date' && key !== 'time' && key !== 'image_url') {
                formDataPayload.append(key, formData[key]);
            }
        });

        formDataPayload.append('event_date', formData.date);
        formDataPayload.append('event_time', formData.time);

        // Add file if selected, otherwise add the existing image_url
        if (selectedFile) {
            formDataPayload.append('image_url', selectedFile);
        } else if (formData.image_url) {
            formDataPayload.append('image_url', formData.image_url);
        }

        try {
            const url = editingEventId
                ? `${API_BASE_URL}/events/${editingEventId}`
                : `${API_BASE_URL}/events`;
            const method = editingEventId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                // Do not set Content-Type header for FormData, browser will do it with boundary
                body: formDataPayload
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save event');
            }

            await fetchEvents(); // Refresh list
            setIsModalOpen(false);
            setFormData(initialFormState);
            setSelectedFile(null);
            setPreviewUrl('');
            setEditingEventId(null);
            showResponse(
                'success',
                editingEventId ? 'Event Updated' : 'Event Created',
                `The event "${formData.title}" has been successfully ${editingEventId ? 'updated' : 'saved'}.`
            );
        } catch (err) {
            showResponse('error', 'Action Failed', err.message);
        }
    };

    const handleDeleteClick = (id) => {
        setEventIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!eventIdToDelete) return;

        try {
            const response = await fetch(`${API_BASE_URL}/events/${eventIdToDelete}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete event');

            await fetchEvents(); // Refresh list
            setIsDeleteModalOpen(false);
            setEventIdToDelete(null);
            showResponse('success', 'Event Deleted', 'The event has been permanently removed from the system.');
        } catch (err) {
            showResponse('error', 'Delete Failed', err.message);
        }
    };

    const handleCopyLink = (id) => {
        const url = `${window.location.origin}/events/${id}`;
        navigator.clipboard.writeText(url);
        alert('Event link copied to clipboard!');
    };

    // Pagination Logic
    const totalPages = Math.ceil(events.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEvents = events.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <AdminLayout>
            <Topbar
                title="Manage Events"
                actionLabel="Create Event"
                onAction={() => handleOpenModal()}
            />


            <div className="admin-card-container">
                <div className="admin-card-header">
                    <div className="admin-filter-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
                        {/* <div className="relative" style={{ flex: '1 1 280px', minWidth: '0' }}>
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="admin-input"
                                style={{ paddingLeft: '2.5rem', width: '100%' }}
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div> */}
                        <select className="admin-select" style={{ width: '100%', maxWidth: '160px', flex: '1 1 140px' }}>
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>

                <div className="admin-table-container">
                    {loading ? (
                        <div style={{ padding: '4rem', textDisplay: 'center', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                            <div className="admin-loader" style={{ marginBottom: '1rem' }}>Loading events...</div>
                        </div>
                    ) : error ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#ef4444' }}>
                            <p>Error: {error}</p>
                            <button
                                className="admin-action-btn-secondary"
                                onClick={fetchEvents}
                                style={{ marginTop: '1rem' }}
                            >
                                Retry
                            </button>
                        </div>
                    ) : events.length === 0 ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                            <p>No events found. Create your first event!</p>
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Event Details</th>
                                    <th className="hide-mobile">Date & Time</th>
                                    <th className="hide-tablet">Location</th>
                                    <th className="hide-mobile">Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedEvents.map((event) => (
                                    <tr key={event.id}>
                                        <td>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#f1f5f9', overflow: 'hidden', display: 'flex', alignItems: 'center', justifySelf: 'center' }}>
                                                {event.image_url ? (
                                                    <img src={event.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <Calendar size={20} className="text-slate-300" style={{ margin: 'auto' }} />
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--admin-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                                                {event.category || 'CHURCH EVENT'}
                                            </div>
                                            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{event.title}</div>
                                            {event.subtitle && (
                                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', fontStyle: 'italic' }}>
                                                    {event.subtitle}
                                                </div>
                                            )}
                                        </td>
                                        <td className="hide-mobile">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                <Calendar size={12} className="text-slate-400" />
                                                <span>{event.date}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>
                                                <Clock size={12} />
                                                <span>{event.time}</span>
                                            </div>
                                        </td>
                                        <td className="hide-tablet">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <MapPin size={12} className="text-slate-400" />
                                                <span>{event.location}</span>
                                            </div>
                                        </td>
                                        <td className="hide-mobile">
                                            <span className={`admin-status-badge status-${event.status}`}>
                                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                                                <button
                                                    className="admin-icon-btn"
                                                    title="Edit"
                                                    onClick={() => handleOpenModal(event)}
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className="admin-icon-btn hover:text-red-500 hover:bg-red-50"
                                                    title="Delete"
                                                    onClick={() => handleDeleteClick(event.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <button
                                                    ref={activeDropdownId === event.id ? dropdownTriggerRef : null}
                                                    className="admin-icon-btn"
                                                    title="More"
                                                    onClick={() => setActiveDropdownId(activeDropdownId === event.id ? null : event.id)}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                <ActionDropdown
                                                    isOpen={activeDropdownId === event.id}
                                                    onClose={() => setActiveDropdownId(null)}
                                                    triggerRef={dropdownTriggerRef}
                                                    actions={[
                                                        { label: 'View Live', icon: <ExternalLink size={16} />, onClick: () => window.open(`/events/${event.id}`, '_blank') },
                                                        { label: 'Copy Link', icon: <Share2 size={16} />, onClick: () => handleCopyLink(event.id) },
                                                        { label: 'Delete', icon: <Trash2 size={16} />, onClick: () => handleDeleteClick(event.id), type: 'danger' },
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
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, events.length)} of {events.length} events
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

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingEventId ? "Edit Event" : "Create New Event"}
                size="lg"
            >
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="admin-form-grid">
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Event Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Sunday Service"
                                className="admin-input"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Subtitle / Theme</label>
                            <input
                                type="text"
                                name="subtitle"
                                placeholder="e.g. 21 Days Fasting & Prayer"
                                className="admin-input"
                                value={formData.subtitle}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="admin-form-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Category</label>
                            <select
                                name="category"
                                className="admin-select"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                <option value="Special Program">Special Program</option>
                                <option value="Service">Regular Service</option>
                                <option value="Outreach">Outreach</option>
                                <option value="Conference">Conference</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Organizer</label>
                            <input
                                type="text"
                                name="organizer"
                                placeholder="e.g. CFWM International"
                                className="admin-input"
                                value={formData.organizer}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Status</label>
                            <select
                                name="status"
                                className="admin-select"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>

                    <div className="admin-form-grid">
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Date</label>
                            <input
                                type="date"
                                name="date"
                                className="admin-input"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Time</label>
                            <input
                                type="time"
                                name="time"
                                className="admin-input"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. Headquarters"
                            className="admin-input"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Event Image</label>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '16px',
                                border: '2px dashed var(--admin-border)',
                                background: '#f8fafc',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flexShrink: 0
                            }}>
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                                        <Calendar size={32} style={{ marginBottom: '0.5rem', opacity: 0.3 }} />
                                        <div style={{ fontSize: '0.7rem' }}>No Image</div>
                                    </div>
                                )}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{
                                    position: 'relative',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--admin-border)',
                                    background: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer'
                                }}>
                                    <input
                                        type="file"
                                        name="image_url"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--admin-primary-10)', color: 'var(--admin-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Plus size={20} />
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{selectedFile ? selectedFile.name : 'Choose Event Image'}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>JPG, PNG or WebP (Max 5MB)</span>
                                </div>
                                {formData.image_url && !selectedFile && (
                                    <p style={{ fontSize: '0.7rem', color: 'var(--admin-primary)', marginTop: '0.5rem', fontWeight: 600 }}>Using current image from Cloudinary</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="admin-form-grid">
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                placeholder="Event details..."
                                className="admin-input"
                                value={formData.description}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Highlights (One per line)</label>
                            <textarea
                                name="highlights"
                                rows="4"
                                placeholder="• Prophetic Teachings&#10;• Intense Worship..."
                                className="admin-input"
                                value={formData.highlights}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <button
                            type="button"
                            className="admin-action-btn-secondary"
                            style={{ flex: 1, padding: '1rem' }}
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="admin-action-btn"
                            style={{ flex: 2, padding: '1rem' }}
                        >
                            {editingEventId ? "Update Event" : "Save Event"}
                        </button>
                    </div>
                </form>
            </AdminModal>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Event"
                message="Are you sure you want to delete this event? This action cannot be undone."
                confirmText="Delete Event"
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

export default ManageEvents;
