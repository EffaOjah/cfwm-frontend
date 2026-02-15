import AdminLayout from '../../components/admin/AdminLayout';
import Topbar from '../../components/admin/Topbar';
import {
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Calendar,
    MapPin,
    Clock
} from 'lucide-react';
import { useState } from 'react';
import AdminModal from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import ActionDropdown from '../../components/admin/ActionDropdown';
import { ExternalLink, Share2 } from 'lucide-react';

const ManageEvents = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [editingEventId, setEditingEventId] = useState(null);
    const [eventIdToDelete, setEventIdToDelete] = useState(null);
    const [events, setEvents] = useState([
        {
            id: '1',
            title: 'Sunday Celebration Service',
            subtitle: 'Divine Encounter',
            date: '2023-10-29',
            time: '09:00',
            location: 'Headquarters',
            status: 'published',
            category: 'Service',
            organizer: 'CFWM',
            description: 'Join us for a powerful time of worship and word.',
            highlights: '• Worship\n• Word\n• Miracles',
            image_url: ''
        },
        {
            id: '2',
            title: 'Mid-week Prayer Meeting',
            subtitle: 'Power for the Journey',
            date: '2023-11-01',
            time: '18:00',
            location: 'Virtual / Ikeja',
            status: 'published',
            category: 'Service',
            organizer: 'CFWM',
            description: 'Mid-week spiritual refreshment.',
            highlights: '',
            image_url: ''
        },
        {
            id: '3',
            title: 'Youth Mega Jam',
            subtitle: 'The Unleashing',
            date: '2023-11-15',
            time: '14:00',
            location: 'Lekki Annex',
            status: 'published',
            category: 'Special Program',
            organizer: 'CFWM Youth',
            description: 'A massive gathering for youth.',
            highlights: '• Music\n• Dance\n• Word',
            image_url: ''
        },
        {
            id: '4',
            title: 'Womens Conference',
            subtitle: 'Virtuous Woman',
            date: '2023-12-05',
            time: '10:00',
            location: 'Headquarters',
            status: 'published',
            category: 'Conference',
            organizer: 'CFWM Women',
            description: 'Empowering women of faith.',
            highlights: '',
            image_url: ''
        },
        {
            id: '5',
            title: 'Leaders Retreat',
            subtitle: 'Higher Grounds',
            date: '2023-12-10',
            time: '08:00',
            location: 'Resort Center',
            status: 'draft',
            category: 'Special Program',
            organizer: 'CFWM Admin',
            description: 'Strategic planning for the new year.',
            highlights: '',
            image_url: ''
        },
        {
            id: '6',
            title: 'Christmas Carol Service',
            subtitle: 'Celebrate the King',
            date: '2023-12-24',
            time: '17:00',
            location: 'Headquarters',
            status: 'published',
            category: 'Service',
            organizer: 'CFWM Choir',
            description: 'Join us for a night of carols.',
            highlights: '',
            image_url: ''
        },
        {
            id: '7',
            title: 'New Year Crossover',
            subtitle: 'Behold the New',
            date: '2023-12-31',
            time: '21:00',
            location: 'Headquarters',
            status: 'published',
            category: 'Service',
            organizer: 'CFWM',
            description: 'Crossing over into the new year with power.',
            highlights: '',
            image_url: ''
        },
    ]);

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
        } else {
            setEditingEventId(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (editingEventId) {
            // Update existing event
            setEvents(prev => prev.map(evt =>
                evt.id === editingEventId ? { ...formData, id: editingEventId } : evt
            ));
        } else {
            // Create new event
            const newEvent = {
                ...formData,
                id: (events.length + 1).toString()
            };
            setEvents(prev => [...prev, newEvent]);
        }

        setIsModalOpen(false);
        setFormData(initialFormState);
        setEditingEventId(null);
    };

    const handleDeleteClick = (id) => {
        setEventIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (eventIdToDelete) {
            setEvents(prev => prev.filter(evt => evt.id !== eventIdToDelete));
            setIsDeleteModalOpen(false);
            setEventIdToDelete(null);
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
                                            <div style={{ position: 'relative' }}>
                                                <button
                                                    className="admin-icon-btn"
                                                    title="More"
                                                    onClick={() => setActiveDropdownId(activeDropdownId === event.id ? null : event.id)}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                <ActionDropdown
                                                    isOpen={activeDropdownId === event.id}
                                                    onClose={() => setActiveDropdownId(null)}
                                                    actions={[
                                                        { label: 'View Live', icon: <ExternalLink size={16} />, onClick: () => window.open(`/events/${event.id}`, '_blank') },
                                                        { label: 'Copy Link', icon: <Share2 size={16} />, onClick: () => handleCopyLink(event.id) },
                                                        { label: 'Delete', icon: <Trash2 size={16} />, onClick: () => handleDeleteClick(event.id), type: 'danger' },
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
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Event Image URL</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text"
                                name="image_url"
                                placeholder="https://example.com/image.jpg"
                                className="admin-input"
                                style={{ flex: 1 }}
                                value={formData.image_url}
                                onChange={handleInputChange}
                            />
                            <div style={{ width: '46px', height: '46px', borderRadius: '12px', border: '1px solid var(--admin-border)', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                {formData.image_url ? (
                                    <img src={formData.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <Calendar size={20} className="text-slate-400" />
                                )}
                            </div>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '0.4rem' }}>Enter a direct link to the event banner or poster image.</p>
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
        </AdminLayout>

    );
};

export default ManageEvents;
