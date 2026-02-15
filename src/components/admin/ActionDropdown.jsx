import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const ActionDropdown = ({ isOpen, onClose, actions, triggerRef }) => {
    const dropdownRef = useRef(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const updatePosition = () => {
        if (triggerRef?.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            // Position the dropdown below the trigger, aligned to the right
            setCoords({
                top: rect.bottom + window.scrollY + 5,
                left: rect.right + window.scrollX - 180 // Assuming minWidth 180px
            });
        }
    };

    useLayoutEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition, true);
        }
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [isOpen, triggerRef]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                triggerRef?.current && !triggerRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, triggerRef]);

    if (!isOpen) return null;

    const dropdownContent = (
        <div
            ref={dropdownRef}
            style={{
                position: 'absolute',
                left: `${coords.left}px`,
                top: `${coords.top}px`,
                zIndex: 9999,
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                border: '1px solid var(--admin-border)',
                minWidth: '180px',
                overflow: 'hidden',
                animation: 'dropdownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            <div style={{ padding: '0.5rem' }}>
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            action.onClick();
                            onClose();
                        }}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            border: 'none',
                            background: 'none',
                            color: action.type === 'danger' ? '#ef4444' : 'var(--admin-text-main)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.1s ease',
                            textAlign: 'left'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = action.type === 'danger' ? '#fef2f2' : '#f1f5f9';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'none';
                        }}
                    >
                        {action.icon && <span style={{ opacity: 0.7 }}>{action.icon}</span>}
                        {action.label}
                    </button>
                ))}
            </div>

            <style>
                {`
                @keyframes dropdownFadeIn {
                    from { opacity: 0; transform: scale(0.95); transform-origin: top right; }
                    to { opacity: 1; transform: scale(1); transform-origin: top right; }
                }
                `}
            </style>
        </div>
    );

    return createPortal(dropdownContent, document.body);
};

export default ActionDropdown;
