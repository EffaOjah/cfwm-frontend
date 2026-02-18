import AdminLayout from '../../components/admin/AdminLayout';
import Topbar from '../../components/admin/Topbar';
import {
    Search,
    MapPin,
    Home,
    Plus,
    Edit2,
    Trash2,
    ChevronRight,
    MoreVertical,
    Phone,
    Globe,
    Layers,
    User,
    Tag
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import AdminModal from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import ActionDropdown from '../../components/admin/ActionDropdown';
import ResponseModal from '../../components/admin/ResponseModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const ManageLocations = () => {
    const dropdownTriggerRef = useRef(null);
    const [districts, setDistricts] = useState([]);
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null); // { type: 'district' | 'branch', id: string }

    // Response Modal State
    const [responseModal, setResponseModal] = useState({
        isOpen: false,
        type: 'success',
        title: '',
        message: ''
    });

    // Modal States
    const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
    const [districtModalMode, setDistrictModalMode] = useState('create');
    const [districtForm, setDistrictForm] = useState({ id: '', name: '', head_pastor: '' });

    const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
    const [branchModalMode, setBranchModalMode] = useState('create');
    const [branchForm, setBranchForm] = useState({
        id: '',
        district_id: '',
        name: '',
        pastor: '',
        address: '',
        phone: '',
        map_url: '',
        image_url: '',
        is_headquarters: false
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/locations/districts`);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();

            setDistricts(data);

            // Flatten all branches into one state for easier management if needed, 
            // though they are currently nested in districts from getDistrictsWithBranches
            const allBranches = data.flatMap(d => d.branches || []);
            setBranches(allBranches);

            if (data.length > 0 && !selectedDistrictId) {
                setSelectedDistrictId(data[0].id);
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching locations:', err);
        } finally {
            setIsLoading(false);
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

    // Handlers for Districts
    const handleOpenDistrictModal = (mode, district = null) => {
        setDistrictModalMode(mode);
        if (mode === 'edit' && district) {
            setDistrictForm({
                id: district.id,
                name: district.name,
                head_pastor: district.head_pastor
            });
        } else {
            setDistrictForm({ id: '', name: '', head_pastor: '' });
        }
        setIsDistrictModalOpen(true);
    };

    const handleSaveDistrict = async (e) => {
        e.preventDefault();
        try {
            const url = districtModalMode === 'create'
                ? `${API_BASE_URL}/locations/districts`
                : `${API_BASE_URL}/locations/districts/${districtForm.id}`;
            const method = districtModalMode === 'create' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: districtForm.name,
                    head_pastor: districtForm.head_pastor
                })
            });

            if (!response.ok) throw new Error('Failed to save district');

            await fetchData();
            setIsDistrictModalOpen(false);
            showResponse('success', `District ${districtModalMode === 'create' ? 'Created' : 'Updated'}`, `The district has been ${districtModalMode === 'create' ? 'added to' : 'updated in'} the system.`);
        } catch (err) {
            showResponse('error', 'Action Failed', err.message);
        }
    };

    // Handlers for Branches
    const handleOpenBranchModal = (mode, branch = null) => {
        setBranchModalMode(mode);
        if (mode === 'edit' && branch) {
            setBranchForm({
                id: branch.id,
                district_id: branch.district_id,
                name: branch.name,
                pastor: branch.pastor,
                address: branch.address,
                phone: branch.phone,
                map_url: branch.map_url || '',
                image_url: branch.image_url || '',
                is_headquarters: !!branch.is_headquarters
            });
        } else {
            setBranchForm({
                id: '',
                district_id: selectedDistrictId,
                name: '',
                pastor: '',
                address: '',
                phone: '',
                map_url: '',
                image_url: '',
                is_headquarters: false
            });
        }
        setIsBranchModalOpen(true);
        setActiveDropdownId(null);
    };

    const handleSaveBranch = async (e) => {
        e.preventDefault();
        try {
            const url = branchModalMode === 'create'
                ? `${API_BASE_URL}/locations/branches`
                : `${API_BASE_URL}/locations/branches/${branchForm.id}`;
            const method = branchModalMode === 'create' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(branchForm)
            });

            if (!response.ok) throw new Error('Failed to save branch');

            await fetchData();
            setIsBranchModalOpen(false);
            showResponse('success', `Branch ${branchModalMode === 'create' ? 'Created' : 'Updated'}`, `The branch has been ${branchModalMode === 'create' ? 'added to' : 'updated in'} the system.`);
        } catch (err) {
            showResponse('error', 'Action Failed', err.message);
        }
    };

    const handleDeleteClick = (type, id) => {
        setItemToDelete({ type, id });
        setIsDeleteModalOpen(true);
        setActiveDropdownId(null);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            const endpoint = itemToDelete.type === 'district' ? 'districts' : 'branches';
            const response = await fetch(`${API_BASE_URL}/locations/${endpoint}/${itemToDelete.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error(`Failed to delete ${itemToDelete.type}`);

            await fetchData();
            setIsDeleteModalOpen(false);
            const deletedType = itemToDelete.type;
            setItemToDelete(null);
            showResponse('success', `${deletedType.charAt(0).toUpperCase() + deletedType.slice(1)} Deleted`, `The ${deletedType} has been permanently removed.`);
        } catch (err) {
            showResponse('error', 'Action Failed', err.message);
        }
    };

    // Derived Data
    const selectedDistrict = districts.find(d => d.id === selectedDistrictId);
    const filteredBranches = branches.filter(b => b.district_id === selectedDistrictId);

    // Pagination Logic
    const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBranches = filteredBranches.slice(startIndex, startIndex + itemsPerPage);

    return (
        <AdminLayout>
            <Topbar
                title="Manage Locations"
                actionLabel="Add District"
                onAction={() => handleOpenDistrictModal('create')}
            />

            {error && (
                <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', margin: '0 1.5rem 1rem' }}>
                    {error}
                </div>
            )}

            <div className="admin-grid-split">
                {/* Districts Section */}
                <div className="admin-card-container">
                    <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: 800 }}>Districts</h2>
                        <button
                            className="admin-icon-btn"
                            style={{ width: '28px', height: '28px' }}
                            onClick={() => handleOpenDistrictModal('create')}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <div style={{ padding: '1rem', maxHeight: '70vh', overflowY: 'auto' }}>
                        {districts.map((district) => (
                            <div
                                key={district.id}
                                onClick={() => setSelectedDistrictId(district.id)}
                                style={{
                                    padding: '1rem',
                                    borderRadius: '16px',
                                    border: '1px solid var(--admin-border)',
                                    marginBottom: '0.75rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: district.id === selectedDistrictId ? 'var(--admin-primary-light)' : 'white',
                                    borderColor: district.id === selectedDistrictId ? 'var(--admin-primary)' : 'var(--admin-border)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    position: 'relative'
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 800, margin: 0, color: district.id === selectedDistrictId ? 'var(--admin-primary)' : 'inherit' }}>
                                        {district.name}
                                    </p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', margin: 0 }}>
                                        {district.head_pastor}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{
                                        fontSize: '0.65rem',
                                        fontWeight: 800,
                                        color: district.id === selectedDistrictId ? 'white' : 'var(--admin-primary)',
                                        background: district.id === selectedDistrictId ? 'var(--admin-primary)' : '#fee2e2',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '100px'
                                    }}>
                                        {branches.filter(b => b.district_id === district.id).length} Branches
                                    </span>
                                    <button
                                        className="admin-icon-btn"
                                        style={{ background: 'transparent', border: 'none', padding: '4px' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenDistrictModal('edit', district);
                                        }}
                                    >
                                        <Edit2 size={14} className="text-slate-400" />
                                    </button>
                                    <button
                                        className="admin-icon-btn"
                                        style={{ background: 'transparent', border: 'none', padding: '4px' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClick('district', district.id);
                                        }}
                                    >
                                        <Trash2 size={14} className="text-rose-400" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Branches Section */}
                <div className="admin-card-container">
                    <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '1rem', fontWeight: 800 }}>Branches</h2>
                            <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', margin: 0 }}>
                                Showing locations in {selectedDistrict?.name || '...'}
                            </p>
                        </div>
                        <button
                            className="admin-action-btn"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            onClick={() => handleOpenBranchModal('create')}
                        >
                            <Plus size={14} /> Add Branch
                        </button>
                    </div>

                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Branch Details</th>
                                    <th>Pastor</th>
                                    <th className="hide-mobile">Contact</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedBranches.length > 0 ? paginatedBranches.map((branch) => (
                                    <tr key={branch.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '10px',
                                                    background: branch.is_headquarters ? '#fee2e2' : '#f8fafc',
                                                    color: branch.is_headquarters ? 'var(--admin-primary)' : '#64748b',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: '1px solid var(--admin-border)'
                                                }}>
                                                    {branch.is_headquarters ? <Home size={18} /> : <MapPin size={18} />}
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: 800, margin: 0 }}>{branch.name}</p>
                                                    <p style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', margin: 0 }}>{branch.address}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{branch.pastor}</div>
                                        </td>
                                        <td className="hide-mobile">
                                            <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{branch.phone}</div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                                                <button className="admin-icon-btn" title="Edit" onClick={() => handleOpenBranchModal('edit', branch)}>
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    ref={activeDropdownId === branch.id ? dropdownTriggerRef : null}
                                                    className="admin-icon-btn"
                                                    onClick={() => setActiveDropdownId(activeDropdownId === branch.id ? null : branch.id)}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                                <ActionDropdown
                                                    isOpen={activeDropdownId === branch.id}
                                                    onClose={() => setActiveDropdownId(null)}
                                                    triggerRef={dropdownTriggerRef}
                                                    actions={[
                                                        { label: 'View on Map', icon: <Globe size={16} />, onClick: () => window.open(branch.map_url, '_blank') },
                                                        { label: 'Delete Branch', icon: <Trash2 size={16} />, onClick: () => handleDeleteClick('branch', branch.id), type: 'danger' }
                                                    ]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--admin-text-muted)' }}>
                                            No branches found in this district.
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
                                onClick={() => setCurrentPage(currentPage - 1)}
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                            >
                                Previous
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={currentPage === i + 1 ? "admin-action-btn" : "admin-action-btn-secondary"}
                                    onClick={() => setCurrentPage(i + 1)}
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="admin-action-btn-secondary"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* District Modal */}
            <AdminModal
                isOpen={isDistrictModalOpen}
                onClose={() => setIsDistrictModalOpen(false)}
                title={districtModalMode === 'create' ? "Add New District" : "Edit District"}
            >
                <form onSubmit={handleSaveDistrict} className="admin-form-grid">
                    <div className="admin-form-group span-2">
                        <label className="admin-label">District Name</label>
                        <input
                            type="text"
                            className="admin-input"
                            required
                            value={districtForm.name}
                            onChange={(e) => setDistrictForm({ ...districtForm, name: e.target.value })}
                            placeholder="e.g., Lagos District 1"
                        />
                    </div>
                    <div className="admin-form-group span-2">
                        <label className="admin-label">District Head Pastor</label>
                        <input
                            type="text"
                            className="admin-input"
                            required
                            value={districtForm.head_pastor}
                            onChange={(e) => setDistrictForm({ ...districtForm, head_pastor: e.target.value })}
                            placeholder="e.g., Pst. John Doe"
                        />
                    </div>
                    <div className="admin-form-actions span-2" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => setIsDistrictModalOpen(false)} className="admin-action-btn-secondary">Cancel</button>
                        <button type="submit" className="admin-action-btn">
                            {districtModalMode === 'create' ? "Add District" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </AdminModal>

            {/* Branch Modal */}
            <AdminModal
                isOpen={isBranchModalOpen}
                onClose={() => setIsBranchModalOpen(false)}
                title={branchModalMode === 'create' ? "Add New Branch" : "Edit Branch"}
                size="lg"
            >
                <form onSubmit={handleSaveBranch} className="admin-form-grid">
                    <div className="admin-form-group span-2">
                        <label className="admin-label">Branch Name</label>
                        <input
                            type="text"
                            className="admin-input"
                            required
                            value={branchForm.name}
                            onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                            placeholder="e.g., Ikeja Branch"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Presiding Pastor</label>
                        <input
                            type="text"
                            className="admin-input"
                            required
                            value={branchForm.pastor}
                            onChange={(e) => setBranchForm({ ...branchForm, pastor: e.target.value })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Phone Number</label>
                        <input
                            type="text"
                            className="admin-input"
                            value={branchForm.phone}
                            onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                        />
                    </div>
                    <div className="admin-form-group span-2">
                        <label className="admin-label">Full Address</label>
                        <input
                            type="text"
                            className="admin-input"
                            required
                            value={branchForm.address}
                            onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Map Link (Google Maps URL)</label>
                        <input
                            type="url"
                            className="admin-input"
                            value={branchForm.map_url}
                            onChange={(e) => setBranchForm({ ...branchForm, map_url: e.target.value })}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-label">Image URL</label>
                        <input
                            type="url"
                            className="admin-input"
                            value={branchForm.image_url}
                            onChange={(e) => setBranchForm({ ...branchForm, image_url: e.target.value })}
                        />
                    </div>
                    <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', height: '100%', paddingTop: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                            <input
                                type="checkbox"
                                checked={branchForm.is_headquarters}
                                onChange={(e) => setBranchForm({ ...branchForm, is_headquarters: e.target.checked })}
                                style={{ width: '18px', height: '18px', accentColor: 'var(--admin-primary)' }}
                            />
                            Is this the Headquarters?
                        </label>
                    </div>
                    <div className="admin-form-actions span-2" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => setIsBranchModalOpen(false)} className="admin-action-btn-secondary">Cancel</button>
                        <button type="submit" className="admin-action-btn">
                            {branchModalMode === 'create' ? "Add Branch" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </AdminModal>

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title={`Delete ${itemToDelete?.type === 'district' ? 'District' : 'Branch'}`}
                message={`Are you sure you want to delete this ${itemToDelete?.type}? This action cannot be undone.`}
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

export default ManageLocations;
