import axios from 'axios';

const api = axios.create({
    baseURL: window.location.hostname === 'localhost'
        ? 'http://127.0.0.1:5001/api/'
        : (import.meta.env.VITE_API_URL ?
            (import.meta.env.VITE_API_URL.endsWith('/') ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/`)
            : '/api/'),
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getImageUrl = (path) => {
    if (!path) return '';

    // If the path is already a full Cloudinary URL or another external HTTPS URL, return it
    if (path.startsWith('https://')) return path;

    // Handle legacy absolute local URLs (Mixed Content)
    // Strip http://localhost:5001 or http://127.0.0.1:xxx from paths
    let cleanPath = path.replace(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, '');

    // If it's still an absolute URL (like an old HTTP site), return as is
    if (cleanPath.startsWith('http://')) return cleanPath;

    // 1. Production (relative to backend origin if VITE_API_URL is set)
    if (import.meta.env.PROD && import.meta.env.VITE_API_URL) {
        const baseUrl = import.meta.env.VITE_API_URL.split('/api')[0];
        const finalPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
        return `${baseUrl}${finalPath}`;
    }

    // 2. Explicit Environment Variable for images
    if (import.meta.env.VITE_IMAGE_BASE_URL) {
        const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL.replace(/\/$/, '');
        const finalPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
        return `${baseUrl}${finalPath}`;
    }

    // 3. Fallback for Local Dev (Port 5001 to match server)
    return `http://127.0.0.1:5001${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
};

export const getVideoEmbed = (url) => {
    if (!url) return null;
    try {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('watch?v=') ? url.split('v=')[1].split('&')[0] :
                url.includes('shorts/') ? url.split('shorts/')[1].split('?')[0] :
                    url.split('/').pop().split('?')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes('instagram.com')) {
            const reelId = url.split('/reel/')[1]?.split('/')[0] || url.split('/p/')[1]?.split('/')[0];
            return reelId ? `https://www.instagram.com/reel/${reelId}/embed` : null;
        }
    } catch {
        return null;
    }
    return null;
};

export default api;
