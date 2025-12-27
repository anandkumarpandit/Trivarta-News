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

    // If the path is already a full External URL (Cloudinary, etc.), return it
    // Requirement 5: Ensure all images load over HTTPS in production
    if (path.startsWith('http')) {
        // Repair legacy local absolute URLs that might exist in the database
        // Requirement 1: Remove all hardcoded 127.0.0.1 or localhost image URLs
        if (path.includes('127.0.0.1') || path.includes('localhost')) {
            const relativePath = path.replace(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, '');
            return getImageUrl(relativePath); // Recursively resolve with the correct base URL
        }
        return path;
    }

    // Requirement 2: Implement an environment-based base URL system
    // Development → http://localhost:5001
    // Production → https://trivarta.onrender.com
    const isProd = import.meta.env.PROD;
    const prodBase = 'https://trivarta.onrender.com';
    const devBase = 'http://localhost:5001';

    // Choose base based on environment
    const baseUrl = isProd ? prodBase : devBase;

    // Ensure path starts with a single slash
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    return `${baseUrl}${cleanPath}`;
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
