import { AlertCircle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", type = "danger" }) => {
    if (!isOpen) return null;

    const primaryColor = type === 'danger' ? '#ef4444' : 'var(--admin-primary)';
    const primaryHover = type === 'danger' ? '#dc2626' : 'var(--admin-primary-dark)';

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
        }}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(8px)'
                }}
            ></div>

            {/* Modal Content */}
            <div style={{
                position: 'relative',
                background: 'white',
                width: '100%',
                maxWidth: '400px',
                borderRadius: '24px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden',
                animation: 'confirmSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        background: type === 'danger' ? '#fef2f2' : '#f0f9ff',
                        color: primaryColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <AlertCircle size={32} />
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.75rem', color: 'var(--admin-text-main)' }}>
                        {title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--admin-text-muted)', lineHeight: 1.6, margin: 0 }}>
                        {message}
                    </p>
                </div>

                <div style={{ padding: '1.5rem', background: '#f8fafc', display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onClose}
                        className="admin-action-btn-secondary"
                        style={{ flex: 1, padding: '0.875rem' }}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            flex: 1,
                            padding: '0.875rem',
                            background: primaryColor,
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.background = primaryHover}
                        onMouseOut={(e) => e.target.style.background = primaryColor}
                    >
                        {confirmText}
                    </button>
                </div>

                <style>
                    {`
            @keyframes confirmSlideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}
                </style>
            </div>
        </div>
    );
};

export default ConfirmModal;
