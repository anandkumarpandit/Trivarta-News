import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

const PromoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        linkUrl: '',
        position: 'left',
        videoUrl: '',
        active: true
    });
    const [imageFile, setImageFile] = useState(null);
    const [useUrl, setUseUrl] = useState(true);

    useEffect(() => {
        if (id) {
            fetchPromo();
        }
    }, [id]);

    const fetchPromo = async () => {
        try {
            const res = await api.get('/promotions');
            const promo = res.data.find(a => a._id === id);
            if (promo) {
                setFormData(promo);
                if (promo.imageUrl && promo.imageUrl.startsWith('/uploads')) {
                    setUseUrl(false);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('linkUrl', formData.linkUrl);
            data.append('position', formData.position);
            data.append('videoUrl', formData.videoUrl);
            data.append('active', formData.active);

            if (useUrl) {
                data.append('imageUrl', formData.imageUrl);
            } else if (imageFile) {
                data.append('image', imageFile);
            } else if (id) {
                data.append('imageUrl', formData.imageUrl); // Fallback for edit mode if no new file
            }

            if (id) {
                await api.put(`/promotions/${id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/promotions', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/admin/promotions');
        } catch (err) {
            alert('Failed to save promotion');
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '600px' }}>
            <h1>{id ? 'Edit Promotion' : 'Post New Promotion'}</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Promotion Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: '15px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
                    <label style={{ fontWeight: 'bold' }}>Promotion Image</label>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                        <button type="button" onClick={() => setUseUrl(true)} className={`btn-sm ${useUrl ? 'btn' : 'btn-outline'}`}>Use URL</button>
                        <button type="button" onClick={() => setUseUrl(false)} className={`btn-sm ${!useUrl ? 'btn' : 'btn-outline'}`}>Upload Photo</button>
                    </div>

                    {useUrl ? (
                        <input
                            type="text"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            placeholder="https://example.com/promo-image.jpg"
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    ) : (
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            accept="image/*"
                            style={{ padding: '10px' }}
                        />
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Video / Reels URL (Optional)</label>
                    <input
                        type="text"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="https://youtube.com/shorts/... or instagram.com/reel/..."
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <small style={{ color: '#666' }}>If provided, video will display instead of image.</small>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Link URL</label>
                    <input
                        type="text"
                        value={formData.linkUrl}
                        onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                        required
                        placeholder="https://example.com"
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Position</label>
                    <select
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="left">Left Side</option>
                        <option value="right">Right Side</option>
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        id="active"
                    />
                    <label htmlFor="active" style={{ fontWeight: 'bold' }}>Active / Published</label>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn">{id ? 'Update Promotion' : 'Post Promotion'}</button>
                    <button type="button" onClick={() => navigate('/admin/promotions')} className="btn btn-outline" style={{ background: '#eee', color: '#333' }}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default PromoForm;
