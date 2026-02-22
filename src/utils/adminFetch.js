const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Standardized fetch for admin endpoints that injects Auth token
 */
export const adminFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('cfwm_admin_token');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };

    // Remove Content-Type if body is FormData
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });

    if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('cfwm_admin_token');
        localStorage.removeItem('cfwm_admin_user');
        window.location.href = '/admin/login';
        throw new Error('Session expired. Please login again.');
    }

    return response;
};
