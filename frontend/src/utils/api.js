import axios from 'axios';

const api = axios.create({
    // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
    baseURL: 'http://localhost:5001/api', // Temporarily force local backend to fix CORS
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
    if (imagePath.startsWith('http')) return imagePath;

    // Handle broken Cloudinary paths saved as local uploads
    if (imagePath.includes('/news-portal/')) {
        // Extract the public ID part (e.g., news-portal/xyz)
        const parts = imagePath.split('/news-portal/');
        if (parts[1]) {
            return `https://res.cloudinary.com/dbzjoc5rr/image/upload/v1/news-portal/${parts[1]}`;
        }
    }

    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    const serverURL = baseURL.replace('/api', '');
    return `${serverURL}${imagePath}`;
};

export const getVideoEmbed = (url) => {
    if (!url) return null;

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
