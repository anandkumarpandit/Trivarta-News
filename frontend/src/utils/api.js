import axios from 'axios';

const api = axios.create({
    baseURL: window.location.hostname === 'localhost'
        ? 'http://localhost:5001/api/'
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
    if (path.startsWith('http')) return path;

    // 1. Production (relative to current origin)
    if (import.meta.env.PROD) {
        return path.startsWith('/') ? path : `/${path}`;
    }

    // 2. Explicit Environment Variable
    if (import.meta.env.VITE_IMAGE_BASE_URL) {
        const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL.replace(/\/$/, '');
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${baseUrl}${cleanPath}`;
    }

    // 3. Fallback for Local Dev (Port 5001 to match .env)
    return `http://localhost:5001/api${path.startsWith('/') ? path : `/${path}`}`;
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
    } catch (e) {
        return null;
    }
    return null;
};

export default api;
