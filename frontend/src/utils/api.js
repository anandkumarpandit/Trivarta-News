import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
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
    (error) => Promise.reject(error)
);

export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';

    // If it's already a full URL (like Cloudinary's https://res.cloudinary.com/...), use it as is
    if (imagePath.startsWith('http')) return imagePath;

    // ONLY attempt to "patch" if it's a relative path that looks like a Cloudinary ID
    // but isn't a full URL. E.g. "news-portal/vuxy..."
    if (imagePath.includes('news-portal/') && !imagePath.startsWith('/')) {
        // We still need a cloud name. If VITE_CLOUDINARY_CLOUD_NAME is not set, 
        // we fallback to the known one, but we check if it's already there first.
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dbzjoc5rr';
        return `https://res.cloudinary.com/${cloudName}/image/upload/v1/${imagePath}`;
    }

    // Default fallback for local uploads (if any exist)
    const envBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    const serverURL = envBaseURL.replace('/api', '');
    return `${serverURL}${imagePath}`;
};

export const getVideoEmbed = (url) => {
    if (!url) return null;

    // Check for direct video files first
    if (url.match(/\.(mp4|webm|mov)$/i) || url.includes('/video/upload/')) {
        return url;
    }

    // If it's already an embed URL, just return it (maybe strip showinfo etc if needed)
    if (url.includes('youtube.com/embed/')) {
        return url;
    }

    // Standard YouTube regex for watch?v=, youtu.be, etc.
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }

    // Handle YouTube Shorts
    if (url.includes('/shorts/')) {
        const parts = url.split('/shorts/');
        if (parts[1]) {
            const id = parts[1].split('?')[0].split('&')[0];
            return `https://www.youtube.com/embed/${id}`;
        }
    }

    // Handle YouTube Live
    if (url.includes('/live/')) {
        const parts = url.split('/live/');
        if (parts[1]) {
            const id = parts[1].split('?')[0].split('&')[0];
            return `https://www.youtube.com/embed/${id}`;
        }
    }

    // Handle Instagram Reels
    if (url.includes('instagram.com/reel/') || url.includes('instagram.com/reels/')) {
        const reelIdMatch = url.match(/\/reel\/([A-Za-z0-9_-]+)/) || url.match(/\/reels\/([A-Za-z0-9_-]+)/);
        if (reelIdMatch && reelIdMatch[1]) {
            return `https://www.instagram.com/reel/${reelIdMatch[1]}/embed`;
        }
    }

    return url; // Return as is for direct MP4 etc.
};

export default api;
