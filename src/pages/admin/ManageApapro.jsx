import { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save, Eye, EyeOff, Flame } from 'lucide-react';
import { ActionDropdown, AdminModal, AdminLayout, Topbar, ConfirmModal, ResponseModal } from '../../components/admin';
import { adminFetch } from '../../utils/adminFetch';
import './ManageApapro.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const EMPTY_FORM = {
    date: '',
    title: '',
    subtitle: '',
    quote: '',
    scripture: '',
    scripture_ref: '',
    content: ['', '', '', ''],       // 4 paragraph fields
    prophetic: '',
    confession: '',
    further_study: '',               // comma-separated in UI, stored as array
    bible_plan: '',
    declaration: '',
    declaration_ref: '',
    status: 'draft',
};

const ManageApapro = () => {
    const [devotionals, setDevotionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Auth helper removed, using adminFetch

    // Delete Confirmation State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

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

    const fetchDevotionals = async () => {
        setLoading(true);
        try {
            const res = await adminFetch('/apapro/all');
            const data = await res.json();
            if (data.status === 'success') setDevotionals(data.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDevotionals(); }, []);

    const openCreate = () => {
        setEditId(null);
        setFormData(EMPTY_FORM);
        setError('');
        setShowModal(true);
    };

    const openEdit = (dev) => {
        setEditId(dev.id);
        setFormData({
            date: dev.date ? String(dev.date).split('T')[0].split(' ')[0] : '',
            title: dev.title || '',
            subtitle: dev.subtitle || '',
            quote: dev.quote || '',
            scripture: dev.scripture || '',
            scripture_ref: dev.scripture_ref || '',
            content: Array.isArray(dev.content) ? [...dev.content, '', '', '', ''].slice(0, Math.max(4, dev.content.length)) : ['', '', '', ''],
            prophetic: dev.prophetic || '',
            confession: dev.confession || '',
            further_study: Array.isArray(dev.further_study) ? dev.further_study.join(', ') : '',
            bible_plan: dev.bible_plan || '',
            declaration: dev.declaration || '',
            declaration_ref: dev.declaration_ref || '',
            status: dev.status || 'draft',
        });
        setError('');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditId(null);
        setError('');
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleContentChange = (index, value) => {
        const newContent = [...formData.content];
        newContent[index] = value;
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const addParagraph = () => {
        setFormData(prev => ({ ...prev, content: [...prev.content, ''] }));
    };

    const removeParagraph = (index) => {
        if (formData.content.length <= 1) return;
        setFormData(prev => ({ ...prev, content: prev.content.filter((_, i) => i !== index) }));
    };

    const preparePayload = () => ({
        ...formData,
        content: formData.content.filter(p => p.trim() !== ''),
        further_study: formData.further_study
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
    });

    const handleSave = async () => {
        setError('');
        const payload = preparePayload();
        const required = ['date', 'title', 'quote', 'scripture', 'scripture_ref', 'prophetic', 'confession'];
        for (const f of required) {
            if (!payload[f]) { setError(`"${f}" is required.`); return; }
            if (!validationPayload[f]) { setError(`"${f}" is required.`); return; }
        }
        if (validationPayload.content.length === 0) { setError('At least one paragraph is required.'); return; }

        setSaving(true);
        try {
            const url = editId ? `/apapro/${editId}` : `/apapro`;
            const method = editId ? 'PUT' : 'POST';
            const payload = {
                ...formData,
                further_study: formData.further_study ? formData.further_study.split(',').map(s => s.trim()).filter(Boolean) : [],
                content: Array.isArray(formData.content) ? formData.content : [formData.content]
            };

            const res = await adminFetch(url, {
                method,
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            closeModal();
            fetchDevotionals();
        } catch (e) {
            setError(e.message || 'Save failed.');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteClick = (id) => {
        setIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        setIsDeleteModalOpen(false);
        try {
            const res = await adminFetch(`/apapro/${idToDelete}`, { method: 'DELETE' });
            if (res.ok) {
                showResponse('success', 'Deleted!', 'The devotional has been removed.');
                fetchDevotionals();
            } else {
                throw new Error('Failed to delete');
            }
        } catch (e) {
            console.error(e);
            showResponse('error', 'Error', 'Failed to delete devotional.');
        } finally {
            setIdToDelete(null);
        }
    };

    const toggleStatus = async (dev) => {
        const newStatus = dev.status === 'published' ? 'draft' : 'published';
        try {
            await adminFetch(`/apapro/${dev.id}`, {
                method: 'PUT',
                body: JSON.stringify({ ...dev, status: newStatus }),
            });
            fetchDevotionals();
        } catch (e) {
            console.error(e);
        }
    };

    const filtered = devotionals.filter(d =>
        d.title?.toLowerCase().includes(search.toLowerCase()) ||
        d.date?.includes(search)
    );

    return (
        <AdminLayout>
            <Topbar title="Manage Apapro 🔥" />

            <div style={{ padding: '2rem' }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by title or date..."
                            style={{
                                paddingLeft: '2.25rem', paddingRight: '1rem',
                                height: '40px', borderRadius: '10px',
                                border: '1px solid #e2e8f0', fontSize: '0.9rem',
                                width: '280px', background: 'white'
                            }}
                        />
                    </div>
                    <button className="apapro-admin-btn apapro-admin-btn-primary" onClick={openCreate}>
                        <Plus size={18} /> New Devotional
                    </button>
                </div>

                {/* Table */}
                <div className="admin-card-container">
                    <div className="admin-table-container">
                        {loading ? (
                            <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading devotionals...</div>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Title</th>
                                        <th>Scripture</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr><td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No devotionals found.</td></tr>
                                    ) : (
                                        filtered.map(dev => (
                                            <tr key={dev.id}>
                                                <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                                                    {(() => {
                                                        if (!dev.date) return 'N/A';
                                                        const dateStr = String(dev.date).split('T')[0].split(' ')[0];
                                                        const d = new Date(dateStr.replace(/-/g, '/'));
                                                        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                                                    })()}
                                                </td>
                                                <td>
                                                    <div style={{ fontWeight: 600 }}>{dev.title}</div>
                                                    {dev.subtitle && <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{dev.subtitle}</div>}
                                                </td>
                                                <td style={{ fontSize: '0.85rem', color: '#64748b' }}>{dev.scripture_ref}</td>
                                                <td>
                                                    <span className={`admin-status-badge status-${dev.status}`}>
                                                        {dev.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                                        <button
                                                            className={`apapro-action-icon-btn status-toggle ${dev.status}`}
                                                            onClick={() => toggleStatus(dev)}
                                                            title={dev.status === 'published' ? 'Unpublish' : 'Publish'}
                                                        >
                                                            {dev.status === 'published' ? <Eye size={18} /> : <EyeOff size={18} />}
                                                        </button>
                                                        <button
                                                            className="apapro-action-icon-btn edit"
                                                            onClick={() => openEdit(dev)}
                                                            title="Edit"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button
                                                            className="apapro-action-icon-btn delete"
                                                            onClick={() => handleDeleteClick(dev.id)}
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)',
                    backdropFilter: 'blur(4px)', zIndex: 1000,
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                    padding: '2rem', overflowY: 'auto'
                }}>
                    <div style={{
                        background: 'white', borderRadius: '20px', padding: '2rem',
                        width: '100%', maxWidth: '800px', position: 'relative',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.2)'
                    }}>
                        {/* Modal Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Flame size={22} color="#cc121a" />
                                {editId ? 'Edit Devotional' : 'New Devotional'}
                            </h2>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                                <X size={24} />
                            </button>
                        </div>

                        {error && (
                            <div style={{ background: '#fff1f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem 1rem', color: '#9b1c1c', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                {error}
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>

                            {/* Date */}
                            <div className="admin-form-group">
                                <label className="admin-label">Date *</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} className="admin-input" />
                            </div>

                            {/* Status */}
                            <div className="admin-form-group">
                                <label className="admin-label">Status *</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="admin-input">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            {/* Title */}
                            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="admin-label">Title *</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} className="admin-input" placeholder="e.g. WORTHY IS THE LAMB" />
                            </div>

                            {/* Subtitle */}
                            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="admin-label">Subtitle</label>
                                <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="admin-input" placeholder="Optional subheading" />
                            </div>

                            {/* Quote */}
                            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="admin-label">Today's Quote *</label>
                                <textarea name="quote" value={formData.quote} onChange={handleChange} className="admin-input" rows={2} placeholder="A short powerful quote for the day" />
                            </div>

                            {/* Scripture Text */}
                            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="admin-label">Scripture Text *</label>
                                <textarea name="scripture" value={formData.scripture} onChange={handleChange} className="admin-input" rows={3} placeholder="The full scripture verse" />
                            </div>

                            {/* Scripture Ref */}
                            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="admin-label">Scripture Reference *</label>
                                <input type="text" name="scripture_ref" value={formData.scripture_ref} onChange={handleChange} className="admin-input" placeholder="e.g. Revelation 5:12 (KJV)" />
                            </div>

                            {/* Content Paragraphs */}
                            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <label className="admin-label" style={{ margin: 0 }}>Devotional Body Paragraphs *</label>
                                    <button type="button" onClick={addParagraph} className="apapro-para-btn">
                                        <Plus size={14} /> Add Paragraph
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {formData.content.map((para, i) => (
                                        <div key={i} style={{ position: 'relative' }}>
                                            <textarea
                                                value={para}
                                                onChange={e => handleContentChange(i, e.target.value)}
                                                className="admin-input"
                                                rows={4}
                                                placeholder={`Paragraph ${i + 1}`}
                                                style={{ paddingRight: '2.5rem' }}
                                            />
                                            {formData.content.length > 1 && (
                                                <button onClick={() => removeParagraph(i)} className="apapro-para-btn remove" style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Prophetic Instruction */}
                            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="admin-label">Prophetic Instruction *</label>
                                <textarea name="prophetic" value={formData.prophetic} onChange={handleChange} className="admin-input" rows={3} placeholder="The prophetic declaration for the day" />
                            </div>

                            {/* Confession */}
                            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="admin-label">Confession *</label>
                                <textarea name="confession" value={formData.confession} onChange={handleChange} className="admin-input" rows={3} placeholder="The daily confession" />
                            </div>

                            {/* Further Study */}
                            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="admin-label">Further Study (comma-separated)</label>
                                <input type="text" name="further_study" value={formData.further_study} onChange={handleChange} className="admin-input" placeholder="e.g. Revelation 5:12, Genesis 1:28, Romans 5:17" />
                            </div>

                            {/* Bible Plan */}
                            <div className="admin-form-group">
                                <label className="admin-label">Bible Reading Plan</label>
                                <input type="text" name="bible_plan" value={formData.bible_plan} onChange={handleChange} className="admin-input" placeholder="e.g. Isaiah 44–48" />
                            </div>

                            {/* Declaration Ref */}
                            <div className="admin-form-group">
                                <label className="admin-label">Monthly Declaration Reference</label>
                                <input type="text" name="declaration_ref" value={formData.declaration_ref} onChange={handleChange} className="admin-input" placeholder="e.g. 1 Corinthians 16:14" />
                            </div>

                            {/* Declaration */}
                            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="admin-label">Monthly Declaration Text</label>
                                <input type="text" name="declaration" value={formData.declaration} onChange={handleChange} className="admin-input" placeholder="e.g. LOVE SHOULD NOT LEAD YOU INTO A LOSS" />
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                            <button onClick={closeModal} className="apapro-admin-btn apapro-admin-btn-secondary">Cancel</button>
                            <button onClick={handleSave} disabled={saving} className="apapro-admin-btn apapro-admin-btn-primary">
                                <Save size={18} /> {saving ? 'Saving...' : 'Save Devotional'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this devotional? This action cannot be undone."
            />

            {/* Response Modal */}
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

export default ManageApapro;
