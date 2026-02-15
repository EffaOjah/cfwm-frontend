import { CheckCircle, AlertCircle, X } from 'lucide-react';

const ResponseModal = ({ isOpen, onClose, type = 'success', title, message, buttonText = 'Close' }) => {
    if (!isOpen) return null;

    const isSuccess = type === 'success';
    const primaryColor = isSuccess ? '#10b981' : '#ef4444';
    const bgColor = isSuccess ? '#f0fdf4' : '#fef2f2';

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
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
                animation: 'modalFadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                <div style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '24px',
                        background: bgColor,
                        color: primaryColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        {isSuccess ? <CheckCircle size={40} /> : <AlertCircle size={40} />}
                    </div>

                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.75rem', color: 'var(--admin-text-main)' }}>
                        {title}
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--admin-text-muted)', lineHeight: 1.6, margin: 0 }}>
                        {message}
                    </p>
                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--admin-border)' }}>
                    <button
                        onClick={onClose}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: primaryColor,
                            color: 'white',
                            border: 'none',
                            borderRadius: '14px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            boxShadow: `0 4px 12px ${isSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                        }}
                    >
                        {buttonText}
                    </button>
                </div>

                <style>
                    {`
                    @keyframes modalFadeUp {
                        from { opacity: 0; transform: translateY(30px) scale(0.9); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    `}
                </style>
            </div>
        </div>
    );
};

export default ResponseModal;
