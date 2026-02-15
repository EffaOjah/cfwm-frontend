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
import { useState, useRef } from 'react';
import AdminModal from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import ActionDropdown from '../../components/admin/ActionDropdown';

const ManageLocations = () => {
    const dropdownTriggerRef = useRef(null);
    // Districts State
    const [districts, setDistricts] = useState([
        { id: '1', name: 'Lagos District 1', headPastor: 'Pst. John Doe' },
        { id: '2', name: 'Abuja Central District', headPastor: 'Pst. Samuel Okoro' },
        { id: '3', name: 'Port Harcourt District', headPastor: 'Pst. Matthew Mark' },
    ]);

    // Branches State
    const [branches, setBranches] = useState([
        {
            id: '1',
            districtId: '1',
            name: 'Headquarters',
            pastor: 'Rev. Dr. Nick Ezeh',
            address: '38 Abasi Obori Street, Off Uwanse Street, Calabar',
            phone: '+234 812 345 6789',
            map_url: 'https://maps.google.com/?q=Calabar',
            image_url: 'https://images.unsplash.com/photo-1548625361-1396a33db9ad?auto=format&fit=crop&q=80&w=400',
            isHQ: true
        },
        {
            id: '2',
            districtId: '1',
            name: 'Ikeja Branch',
            pastor: 'Pst. Michael Smith',
            address: '45 Allen Avenue, Ikeja, Lagos',
            phone: '+234 801 111 1111',
            map_url: 'https://maps.google.com/?q=Ikeja',
            image_url: 'https://images.unsplash.com/photo-1510924948940-0255869dbbf3?auto=format&fit=crop&q=80&w=400',
            isHQ: false
        },
        {
            id: '3',
            districtId: '1',
            name: 'Surulere Branch',
            pastor: 'Pst. David Coleman',
            address: '12 Stadium Road, Surulere, Lagos',
            phone: '+234 801 222 2222',
            map_url: 'https://maps.google.com/?q=Surulere',
            image_url: 'https://images.unsplash.com/photo-1548625361-1396a33db9ad?auto=format&fit=crop&q=80&w=400',
            isHQ: false
        },
        {
            id: '4',
            districtId: '2',
            name: 'Garki Branch',
            pastor: 'Pst. Solomon King',
            address: 'Plot 55, Garki Area 3, Abuja',
            phone: '+234 802 444 4444',
            map_url: 'https://maps.google.com/?q=Garki+Abuja',
            image_url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=400',
            isHQ: false
        }
    ]);

    const [selectedDistrictId, setSelectedDistrictId] = useState('1');
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null); // { type: 'district' | 'branch', id: string }

    // Modal States
    const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
    const [districtModalMode, setDistrictModalMode] = useState('create');
    const [districtForm, setDistrictForm] = useState({ id: '', name: '', headPastor: '' });

    const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
    const [branchModalMode, setBranchModalMode] = useState('create');
    const [branchForm, setBranchForm] = useState({
        id: '',
        districtId: '',
        name: '',
        pastor: '',
        address: '',
        phone: '',
        map_url: '',
        image_url: '',
        isHQ: false
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Handlers for Districts
    const handleOpenDistrictModal = (mode, district = null) => {
        setDistrictModalMode(mode);
        if (mode === 'edit' && district) {
            setDistrictForm(district);
        } else {
            setDistrictForm({ id: '', name: '', headPastor: '' });
        }
        setIsDistrictModalOpen(true);
    };

    const handleSaveDistrict = (e) => {
        e.preventDefault();
        if (districtModalMode === 'create') {
            const newDistrict = { ...districtForm, id: Date.now().toString() };
            setDistricts([...districts, newDistrict]);
        } else {
            setDistricts(districts.map(d => d.id === districtForm.id ? districtForm : d));
        }
        setIsDistrictModalOpen(false);
    };

    // Handlers for Branches
    const handleOpenBranchModal = (mode, branch = null) => {
        setBranchModalMode(mode);
        if (mode === 'edit' && branch) {
            setBranchForm(branch);
        } else {
            setBranchForm({
                id: '',
                districtId: selectedDistrictId,
                name: '',
                pastor: '',
                address: '',
                phone: '',
                map_url: '',
                image_url: '',
                isHQ: false
            });
        }
        setIsBranchModalOpen(true);
        setActiveDropdownId(null);
    };

    const handleSaveBranch = (e) => {
        e.preventDefault();
        if (branchModalMode === 'create') {
            const newBranch = { ...branchForm, id: Date.now().toString() };
            setBranches([...branches, newBranch]);
        } else {
            setBranches(branches.map(b => b.id === branchForm.id ? branchForm : b));
        }
        setIsBranchModalOpen(false);
    };

    const handleDeleteClick = (type, id) => {
        setItemToDelete({ type, id });
        setIsDeleteModalOpen(true);
        setActiveDropdownId(null);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            if (itemToDelete.type === 'district') {
                setDistricts(districts.filter(d => d.id !== itemToDelete.id));
                if (selectedDistrictId === itemToDelete.id) {
                    setSelectedDistrictId(districts.find(d => d.id !== itemToDelete.id)?.id || null);
                }
            } else {
                setBranches(branches.filter(b => b.id !== itemToDelete.id));
            }
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        }
    };

    // Derived Data
    const selectedDistrict = districts.find(d => d.id === selectedDistrictId);
    const filteredBranches = branches.filter(b => b.districtId === selectedDistrictId);

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
                                        {district.headPastor}
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
                                        {branches.filter(b => b.districtId === district.id).length} Branches
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
                                                    background: branch.isHQ ? '#fee2e2' : '#f8fafc',
                                                    color: branch.isHQ ? 'var(--admin-primary)' : '#64748b',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: '1px solid var(--admin-border)'
                                                }}>
                                                    {branch.isHQ ? <Home size={18} /> : <MapPin size={18} />}
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
                            value={districtForm.headPastor}
                            onChange={(e) => setDistrictForm({ ...districtForm, headPastor: e.target.value })}
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
                                checked={branchForm.isHQ}
                                onChange={(e) => setBranchForm({ ...branchForm, isHQ: e.target.checked })}
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
        </AdminLayout>
    );
};

export default ManageLocations;
