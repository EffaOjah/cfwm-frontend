import AdminLayout from '../../components/admin/AdminLayout';
import Topbar from '../../components/admin/Topbar';
import {
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Music,
    Video,
    Clock,
    Play,
    Eye,
    BookOpen,
    Link as LinkIcon
} from 'lucide-react';
import { useState } from 'react';
import ConfirmModal from '../../components/admin/ConfirmModal';
import ActionDropdown from '../../components/admin/ActionDropdown';
import AdminModal from '../../components/admin/AdminModal';

const ManageSermons = () => {
    const [sermons, setSermons] = useState([
        {
            id: '1',
            title: 'The Power of Faith',
            speaker: 'Rev. Dr. Nick Ezeh',
            series: 'Faith Foundations',
            description: 'A deep dive into the biblical principles of faith and how they apply to modern life.',
            type: 'video',
            sermon_date: '2023-10-24',
            duration: '45:30',
            video_url: 'https://youtube.com/watch?v=example1',
            audio_url: '',
            thumbnail_url: ''
        },
        {
            id: '2',
            title: 'Understanding Grace',
            speaker: 'Rev. Dr. Nick Ezeh',
            series: 'Grace Unmeasured',
            description: 'Exploring the boundless grace of God and our position in His love.',
            type: 'audio',
            sermon_date: '2023-10-25',
            duration: '32:15',
            video_url: '',
            audio_url: 'https://storage.example.com/audio/grace.mp3',
            thumbnail_url: ''
        },
        {
            id: '3',
            title: 'Walking in Love',
            speaker: 'Pst. Mary Jane',
            series: 'Life in the Spirit',
            description: 'Practical steps to walking in the love of God towards everyone we meet.',
            type: 'video',
            sermon_date: '2023-10-23',
            duration: '58:00',
            video_url: 'https://youtube.com/watch?v=example3',
            audio_url: '',
            thumbnail_url: ''
        },
        {
            id: '4',
            title: 'Divine Provision',
            speaker: 'Rev. Dr. Nick Ezeh',
            series: 'Covenant Secrets',
            description: 'Unlocking the keys to supernatural provision and abundance.',
            type: 'audio',
            sermon_date: '2023-10-22',
            duration: '40:20',
            video_url: '',
            audio_url: 'https://storage.example.com/audio/provision.mp3',
            thumbnail_url: ''
        },
        {
            id: '5',
            title: 'The Joy of Salvation',
            speaker: 'Pst. Mary Jane',
            series: 'New Beginnings',
            description: 'Celebrating the incredible gift of salvation and the joy it brings.',
            type: 'video',
            sermon_date: '2023-10-21',
            duration: '50:15',
            video_url: 'https://youtube.com/watch?v=example5',
            audio_url: '',
            thumbnail_url: ''
        },
        {
            id: '6',
            title: 'Overcoming Storms',
            speaker: 'Rev. Dr. Nick Ezeh',
            series: 'Faith Foundations',
            description: 'How to stand strong in the middle of life\'s most challenging moments.',
            type: 'audio',
            sermon_date: '2023-10-20',
            duration: '35:45',
            video_url: '',
            audio_url: 'https://storage.example.com/audio/storms.mp3',
            thumbnail_url: ''
        }
    ]);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [viewingSermon, setViewingSermon] = useState(null);

    // Modal State for Upload/Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [formData, setFormData] = useState({
        title: '',
        speaker: '',
        series: '',
        description: '',
        sermon_date: '',
        duration: '',
        type: 'video',
        video_url: '',
        audio_url: '',
        thumbnail_url: ''
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const handleDeleteClick = (id) => {
        setIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (idToDelete) {
            setSermons(prev => prev.filter(item => item.id !== idToDelete));
            setIsDeleteModalOpen(false);
            setIdToDelete(null);
        }
    };

    const handleViewDetails = (sermon) => {
        setViewingSermon(sermon);
        setIsDetailsModalOpen(true);
        setActiveDropdownId(null);
    };

    const handleOpenModal = (mode, initialData = null) => {
        setModalMode(mode);
        if (mode === 'edit' && initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: '',
                speaker: '',
                series: '',
                description: '',
                sermon_date: new Date().toISOString().split('T')[0],
                duration: '',
                type: 'video',
                video_url: '',
                audio_url: '',
                thumbnail_url: ''
            });
        }
        setIsModalOpen(true);
        setActiveDropdownId(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveSermon = (e) => {
        e.preventDefault();
        if (modalMode === 'create') {
            const newSermon = {
                ...formData,
                id: (sermons.length + 1).toString(),
            };
            setSermons(prev => [newSermon, ...prev]);
        } else {
            setSermons(prev => prev.map(item => item.id === formData.id ? formData : item));
        }
        handleCloseModal();
    };

    // Pagination Logic
    const totalPages = Math.ceil(sermons.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSermons = sermons.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <AdminLayout>
            <Topbar
                title="Manage Sermons"
                actionLabel="Upload Sermon"
                onAction={() => handleOpenModal('create')}
            />

            <div className="admin-card-container">
                <div className="admin-card-header">
                    <div className="admin-filter-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
                        {/* <div className="relative" style={{ flex: '1 1 280px', minWidth: '0' }}>
                            <input
                                type="text"
                                placeholder="Search sermons..."
                                className="admin-input"
                                style={{ paddingLeft: '2.5rem', width: '100%' }}
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" style={{ pointerEvents: 'none' }} />
                        </div> */}
                        <select className="admin-select" style={{ width: '100%', maxWidth: '200px', flex: '1 1 140px' }}>
                            <option value="all">All Types</option>
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                        </select>
                    </div>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Sermon Details</th>
                                <th className="hide-mobile">Series</th>
                                <th>Type</th>
                                <th className="hide-tablet">Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedSermons.map((sermon) => (
                                <tr key={sermon.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                background: sermon.type === 'video' ? '#fee2e2' : '#dcfce7',
                                                color: sermon.type === 'video' ? '#ef4444' : '#22c55e',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {sermon.type === 'video' ? <Video size={20} /> : <Music size={20} />}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700 }}>{sermon.title}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{sermon.speaker}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hide-mobile">
                                        <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>
                                            {sermon.series.toUpperCase()}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`admin-status-badge ${sermon.type === 'video' ? 'status-published' : 'status-pending'}`} style={{ fontSize: '0.7rem', fontWeight: 800 }}>
                                            {sermon.type.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="hide-tablet">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
                                            <Clock size={14} />
                                            {sermon.duration}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                                            <button className="admin-icon-btn hover:text-blue-500 hover:bg-blue-50" title="Play">
                                                <Play size={16} />
                                            </button>
                                            <button className="admin-icon-btn" title="Edit" onClick={() => handleOpenModal('edit', sermon)}>
                                                <Edit2 size={16} />
                                            </button>

                                            <div style={{ position: 'relative' }}>
                                                <button
                                                    className="admin-icon-btn"
                                                    title="More"
                                                    onClick={() => setActiveDropdownId(activeDropdownId === sermon.id ? null : sermon.id)}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                <ActionDropdown
                                                    isOpen={activeDropdownId === sermon.id}
                                                    onClose={() => setActiveDropdownId(null)}
                                                    actions={[
                                                        { label: 'View Details', icon: <Eye size={16} />, onClick: () => handleViewDetails(sermon) },
                                                        {
                                                            label: 'Copy Link', icon: <LinkIcon size={16} />, onClick: () => {
                                                                navigator.clipboard.writeText(sermon.type === 'video' ? sermon.video_url : sermon.audio_url);
                                                                alert('Link copied!');
                                                            }
                                                        },
                                                        { label: 'Delete', icon: <Trash2 size={16} />, onClick: () => handleDeleteClick(sermon.id), type: 'danger' },
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
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sermons.length)} of {sermons.length} sermons
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
                title="Delete Sermon"
                message="Are you sure you want to remove this sermon? This will delete all associated media links."
                confirmText="Delete Sermon"
                type="danger"
            />

            <AdminModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                title="Sermon Details"
                size="medium"
            >
                {viewingSermon && (
                    <div style={{ padding: '0.5rem' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--admin-text)', marginBottom: '0.25rem' }}>
                                    {viewingSermon.title}
                                </h3>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span className={`admin-status-badge ${viewingSermon.type === 'video' ? 'status-published' : 'status-pending'}`}>
                                        {viewingSermon.type.toUpperCase()}
                                    </span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>
                                        BY {viewingSermon.speaker.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                                    <BookOpen size={16} />
                                    {viewingSermon.series.toUpperCase()}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
                                    <Clock size={12} /> {viewingSermon.sermon_date} • {viewingSermon.duration}
                                </div>
                            </div>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #f1f5f9', marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--admin-text)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Description
                            </h4>
                            <p style={{ lineHeight: 1.6, color: '#475569', fontSize: '0.95rem' }}>
                                {viewingSermon.description}
                            </p>
                        </div>

                        <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '10px', border: '1px solid #e0f2fe' }}>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0369a1', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                Media Links
                            </h4>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {viewingSermon.video_url && (
                                    <a href={viewingSermon.video_url} target="_blank" rel="noopener noreferrer" className="admin-action-btn" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Video size={14} /> Watch Video
                                    </a>
                                )}
                                {viewingSermon.audio_url && (
                                    <a href={viewingSermon.audio_url} target="_blank" rel="noopener noreferrer" className="admin-action-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Music size={14} /> Listen Audio
                                    </a>
                                )}
                            </div>
                        </div>

                        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                className="admin-action-btn-secondary"
                                onClick={() => setIsDetailsModalOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                className="admin-action-btn"
                                onClick={() => {
                                    handleOpenModal('edit', viewingSermon);
                                    setIsDetailsModalOpen(false);
                                }}
                            >
                                Edit Sermon
                            </button>
                        </div>
                    </div>
                )}
            </AdminModal>

            <AdminModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={modalMode === 'create' ? "Upload New Sermon" : "Edit Sermon"}
                size="lg"
            >
                <form onSubmit={handleSaveSermon} className="admin-form-grid">
                    <div className="admin-form-group span-2">
                        <label className="admin-label">Sermon Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., The Power of Faith"
                            className="admin-input"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Speaker</label>
                        <input
                            type="text"
                            name="speaker"
                            value={formData.speaker}
                            onChange={handleInputChange}
                            placeholder="e.g., Rev. Dr. Nick Ezeh"
                            className="admin-input"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Sermon Series</label>
                        <input
                            type="text"
                            name="series"
                            value={formData.series}
                            onChange={handleInputChange}
                            placeholder="e.g., Faith Foundations"
                            className="admin-input"
                        />
                    </div>

                    <div className="admin-form-group span-2">
                        <label className="admin-label">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Briefly describe the sermon content..."
                            className="admin-input"
                            rows={3}
                            style={{ resize: 'none' }}
                        ></textarea>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Sermon Date</label>
                        <input
                            type="date"
                            name="sermon_date"
                            value={formData.sermon_date}
                            onChange={handleInputChange}
                            className="admin-input"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Duration (e.g., 45:30)</label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            placeholder="MM:SS"
                            className="admin-input"
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Sermon Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="admin-select"
                        >
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                        </select>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">
                            {formData.type === 'video' ? 'Video URL (YouTube/Vimeo)' : 'Audio URL (MP3/SoundCloud)'}
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                name={formData.type === 'video' ? 'video_url' : 'audio_url'}
                                value={formData.type === 'video' ? formData.video_url : formData.audio_url}
                                onChange={handleInputChange}
                                placeholder="https://..."
                                className="admin-input"
                                style={{ paddingLeft: '2.5rem' }}
                            />
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" style={{ pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                                <LinkIcon size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="admin-form-actions span-2" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={handleCloseModal} className="admin-action-btn-secondary" style={{ padding: '0.75rem 2rem' }}>
                            Cancel
                        </button>
                        <button type="submit" className="admin-action-btn" style={{ padding: '0.75rem 2.5rem' }}>
                            {modalMode === 'create' ? "Upload Sermon" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </AdminModal>
        </AdminLayout>
    );
};

export default ManageSermons;
