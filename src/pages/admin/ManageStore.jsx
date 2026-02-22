import { ActionDropdown, AdminModal, AdminLayout, Topbar, ConfirmModal, ResponseModal } from '../../components/admin';
import { adminFetch } from '../../utils/adminFetch';
import {
    Search,
    Link as LinkIcon,
    Plus,
    Package,
    DollarSign,
    Layers,
    Info,
    ChevronRight,
    ArrowLeft,
    Eye,
    BookOpen,
    Download,
    FileText,
    ShoppingBag,
    Tag,
    Edit2,
    MoreVertical,
    Trash2,
    AlertCircle
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const ManageStore = () => {
    const dropdownTriggerRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [viewingProduct, setViewingProduct] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    // Response Modal State
    const [responseModal, setResponseModal] = useState({
        isOpen: false,
        type: 'success',
        title: '',
        message: ''
    });

    // Modal State for Add/Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        category: 'Books',
        status: 'published',
        image_url: '',
        file_url: '',
        stock_quantity: 0,
        is_digital: false,
        rating: 5.0
    });

    // Filtering State
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterCategory, debouncedSearchTerm]);

    useEffect(() => {
        fetchProducts();
    }, [filterCategory, debouncedSearchTerm]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams();
            if (filterCategory !== 'all') queryParams.append('category', filterCategory);
            if (debouncedSearchTerm) queryParams.append('search', debouncedSearchTerm);

            const response = await adminFetch(`/products?${queryParams.toString()}`);
            const data = await response.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching products:', err);
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
        setActiveDropdownId(null);
    };

    const confirmDelete = async () => {
        if (!idToDelete) return;
        try {
            const response = await adminFetch(`/products/${idToDelete}`, {
                method: 'DELETE'
            });

            await fetchProducts();
            setIsDeleteModalOpen(false);
            setIdToDelete(null);
            showResponse('success', 'Product Deleted', 'The product has been removed from the store.');
        } catch (err) {
            showResponse('error', 'Delete Failed', err.message);
        }
    };

    const handleViewDetails = (product) => {
        setViewingProduct(product);
        setIsDetailsModalOpen(true);
        setActiveDropdownId(null);
    };

    const handleOpenModal = (mode, initialData = null) => {
        setModalMode(mode);
        if (mode === 'edit' && initialData) {
            setFormData(initialData);
            setPreviewUrl(initialData.image_url || '');
            setSelectedFile(null);
        } else {
            setFormData({
                title: '',
                author: 'Rev. Dr. Nick Ezeh',
                description: '',
                price: '',
                category: 'Books',
                status: 'published',
                image_url: '',
                file_url: '',
                stock_quantity: 0,
                is_digital: false,
                rating: 5.0
            });
            setPreviewUrl('');
            setSelectedFile(null);
        }
        setIsModalOpen(true);
        setActiveDropdownId(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setSelectedFile(file);
            if (file) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        try {
            const url = modalMode === 'create'
                ? `/products`
                : `/products/${formData.id}`;

            const method = modalMode === 'create' ? 'POST' : 'PUT';

            const formDataPayload = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== 'image_url') {
                    formDataPayload.append(key, formData[key]);
                }
            });

            if (selectedFile) {
                formDataPayload.append('image_url', selectedFile);
            } else if (formData.image_url) {
                formDataPayload.append('image_url', formData.image_url);
            }

            const response = await adminFetch(url, {
                method,
                body: formDataPayload
            });

            await fetchProducts();
            handleCloseModal();
            setSelectedFile(null);
            setPreviewUrl('');
            showResponse(
                'success',
                modalMode === 'create' ? 'Product Added' : 'Product Updated',
                `The product "${formData.title}" has been saved successfully.`
            );
        } catch (err) {
            showResponse('error', 'Action Failed', err.message);
        }
    };

    // Pagination Logic
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <AdminLayout>
            <Topbar
                title="Manage Store"
                actionLabel="Add Product"
                onAction={() => handleOpenModal('create')}
            />

            <div className="admin-card-container">
                <div className="admin-card-header">
                    <div className="admin-filter-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
                        <div className="relative" style={{ flex: '1 1 280px', minWidth: '0' }}>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="admin-input"
                                style={{ paddingLeft: '2.5rem', width: '100%' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" style={{ pointerEvents: 'none' }} />
                        </div>
                        <select
                            className="admin-select"
                            style={{ width: '100%', maxWidth: '200px', flex: '1 1 140px' }}
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="Books">Books</option>
                            <option value="Audiobooks">Audiobooks</option>
                            <option value="Digital">Digital</option>
                            <option value="Merchandise">Merchandise</option>
                        </select>
                    </div>
                </div>

                <div className="admin-table-container">
                    {loading ? (
                        <div style={{ padding: '4rem', textAlign: 'center' }}>
                            <div className="admin-spinner" style={{ margin: '0 auto 1rem' }}></div>
                            <p style={{ color: 'var(--admin-text-muted)' }}>Loading products...</p>
                        </div>
                    ) : error ? (
                        <div style={{ padding: '4rem', textAlign: 'center' }}>
                            <AlertCircle size={40} style={{ margin: '0 auto 1rem', color: '#ef4444' }} />
                            <p style={{ color: '#ef4444', fontWeight: 600 }}>{error}</p>
                            <button onClick={fetchProducts} className="admin-action-btn-secondary mt-4">Try Again</button>
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Product Details</th>
                                    <th className="hide-mobile">Category</th>
                                    <th>Price</th>
                                    <th className="hide-tablet">Stock</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.length > 0 ? paginatedProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    width: '44px',
                                                    height: '44px',
                                                    borderRadius: '12px',
                                                    background: '#f8fafc',
                                                    border: '1px solid var(--admin-border)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    overflow: 'hidden'
                                                }}>
                                                    {product.image_url ? (
                                                        <img src={product.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <ShoppingBag size={20} className="text-slate-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700 }}>{product.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{product.author}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hide-mobile">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)' }}>
                                                <Tag size={14} className="text-rose-500" />
                                                <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{product.category}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 700, color: 'var(--admin-text-main)' }}>
                                                {formatPrice(product.price)}
                                            </div>
                                        </td>
                                        <td className="hide-tablet">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{
                                                    padding: '0.25rem 0.6rem',
                                                    borderRadius: '6px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700,
                                                    background: product.stock_quantity > 10 ? '#f0f9ff' : (product.stock_quantity > 0 ? '#fffbeb' : '#fef2f2'),
                                                    color: product.stock_quantity > 10 ? '#0369a1' : (product.stock_quantity > 0 ? '#92400e' : '#b91c1c'),
                                                    border: '1px solid currentColor',
                                                    opacity: 0.8
                                                }}>
                                                    {product.stock_quantity}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`admin-status-badge status-${product.status}`} style={{ fontSize: '0.7rem', fontWeight: 800 }}>
                                                {product.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                                                <button className="admin-icon-btn" title="Edit" onClick={() => handleOpenModal('edit', product)}>
                                                    <Edit2 size={16} />
                                                </button>

                                                <button
                                                    ref={activeDropdownId === product.id ? dropdownTriggerRef : null}
                                                    className="admin-icon-btn"
                                                    title="More"
                                                    onClick={() => setActiveDropdownId(activeDropdownId === product.id ? null : product.id)}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                <ActionDropdown
                                                    isOpen={activeDropdownId === product.id}
                                                    onClose={() => setActiveDropdownId(null)}
                                                    triggerRef={dropdownTriggerRef}
                                                    actions={[
                                                        { label: 'View Details', icon: <Eye size={16} />, onClick: () => handleViewDetails(product) },
                                                        {
                                                            label: 'Copy Link', icon: <LinkIcon size={16} />, onClick: () => {
                                                                navigator.clipboard.writeText(window.location.origin + '/store/' + product.id);
                                                                showResponse('success', 'Link Copied', 'The product link has been copied to your clipboard.');
                                                            }
                                                        },
                                                        { label: 'Delete', icon: <Trash2 size={16} />, onClick: () => handleDeleteClick(product.id), type: 'danger' },
                                                    ]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--admin-text-muted)' }}>
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, products.length)} of {products.length} products
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
                title="Delete Product"
                message="Are you sure you want to remove this product from the store? This action cannot be undone."
                confirmText="Delete Product"
                type="danger"
            />

            <AdminModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                title="Product Details"
                size="md"
            >
                {viewingProduct && (
                    <div style={{ padding: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '1px solid var(--admin-border)',
                                flexShrink: 0
                            }}>
                                <img src={viewingProduct.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{viewingProduct.title}</h3>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--admin-primary)' }}>{formatPrice(viewingProduct.price)}</div>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <span className="admin-status-badge status-published" style={{ fontSize: '0.65rem' }}>{viewingProduct.category.toUpperCase()}</span>
                                    {viewingProduct.is_digital && <span className="admin-status-badge status-pending" style={{ fontSize: '0.65rem' }}>DIGITAL</span>}
                                    <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>BY {viewingProduct.author.toUpperCase()}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.85rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: viewingProduct.stock_quantity > 0 ? '#059669' : '#ef4444', fontWeight: 700 }}>
                                        <Package size={14} />
                                        {viewingProduct.stock_quantity} In Stock
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#eab308', fontWeight: 700 }}>
                                        <Tag size={14} />
                                        {viewingProduct.rating} Rating
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9', marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--admin-text)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Description
                            </h4>
                            <p style={{ lineHeight: 1.6, color: '#475569', fontSize: '0.95rem' }}>
                                {viewingProduct.description}
                            </p>
                        </div>

                        {viewingProduct.file_url && (
                            <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '12px', border: '1px solid #e0f2fe', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0369a1', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0369a1' }}>Digital Asset</div>
                                        <div style={{ fontSize: '0.75rem', color: '#0c4a6e' }}>Downloadable File Attached</div>
                                    </div>
                                </div>
                                <a href={viewingProduct.file_url} target="_blank" rel="noopener noreferrer" className="admin-action-btn" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Download size={14} /> Download
                                </a>
                            </div>
                        )}

                        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                className="admin-action-btn-secondary"
                                onClick={() => setIsDetailsModalOpen(false)}
                                style={{ padding: '0.75rem 2rem' }}
                            >
                                Close
                            </button>
                            <button
                                className="admin-action-btn"
                                onClick={() => {
                                    handleOpenModal('edit', viewingProduct);
                                    setIsDetailsModalOpen(false);
                                }}
                                style={{ padding: '0.75rem 2rem' }}
                            >
                                Edit Product
                            </button>
                        </div>
                    </div>
                )}
            </AdminModal>

            <AdminModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={modalMode === 'create' ? "Add New Product" : "Edit Product"}
                size="lg"
            >
                <form onSubmit={handleSaveProduct} className="admin-form-grid">
                    <div className="admin-form-group span-2">
                        <label className="admin-label">Product Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., The Art of Worship Book"
                            className="admin-input"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Author / Creator</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            placeholder="Rev. Dr. Nick Ezeh"
                            className="admin-input"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="admin-select"
                        >
                            <option value="Books">Books</option>
                            <option value="Audiobooks">Audiobooks</option>
                            <option value="Digital">Digital</option>
                            <option value="Merchandise">Merchandise</option>
                        </select>
                    </div>

                    <div className="admin-form-group span-2">
                        <label className="admin-label">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Detailed product information..."
                            className="admin-input"
                            rows={3}
                            style={{ resize: 'none' }}
                        ></textarea>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Price (₦)</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="0"
                                className="admin-input"
                                style={{ paddingLeft: '2.5rem' }}
                                required
                            />
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" style={{ pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>₦</span>
                            </div>
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock_quantity"
                            value={formData.stock_quantity}
                            onChange={handleInputChange}
                            placeholder="0"
                            className="admin-input"
                            required
                        />
                    </div>

                    <div className="admin-form-group span-2">
                        <label className="admin-label">Product Image</label>
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
                                        <ShoppingBag size={32} style={{ marginBottom: '0.5rem', opacity: 0.3 }} />
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
                                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{selectedFile ? selectedFile.name : 'Choose Product Image'}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>JPG, PNG or WebP (Max 5MB)</span>
                                </div>
                                {formData.image_url && !selectedFile && (
                                    <p style={{ fontSize: '0.7rem', color: 'var(--admin-primary)', marginTop: '0.5rem', fontWeight: 600 }}>Using current image from Cloudinary</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">File URL (for Digital products)</label>
                        <input
                            type="url"
                            name="file_url"
                            value={formData.file_url}
                            onChange={handleInputChange}
                            placeholder="https://..."
                            className="admin-input"
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="admin-select"
                        >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', height: '100%', paddingTop: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                            <input
                                type="checkbox"
                                name="is_digital"
                                checked={formData.is_digital}
                                onChange={handleInputChange}
                                style={{ width: '18px', height: '18px', accentColor: 'var(--admin-primary)' }}
                            />
                            Is this a Digital Product?
                        </label>
                    </div>

                    <div className="admin-form-actions span-2" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={handleCloseModal} className="admin-action-btn-secondary" style={{ padding: '0.75rem 2rem' }}>
                            Cancel
                        </button>
                        <button type="submit" className="admin-action-btn" style={{ padding: '0.75rem 2.5rem' }}>
                            {modalMode === 'create' ? "Add Product" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </AdminModal>

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

export default ManageStore;
