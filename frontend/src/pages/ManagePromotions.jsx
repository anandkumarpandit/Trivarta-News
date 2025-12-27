import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../utils/api';
import './ManagePromotions.css';

const ManagePromotions = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [promoData, setPromoData] = useState({
        type: 'inline_promo',
        title: '',
        description: '',
        ctaText: 'Start Free Trial',
        ctaLink: '',
        videoUrl: '',
        active: true
    });
    const [newFile, setNewFile] = useState(null);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const res = await api.get('promotions');
                setPromotions(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchPromotions();
    }, []);

    const resetForm = () => {
        setPromoData({
            type: 'inline_promo',
            title: '',
            description: '',
            ctaText: 'Start Free Trial',
            ctaLink: '',
            videoUrl: '',
            active: true
        });
        setNewFile(null);
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(promoData).forEach(key => formData.append(key, promoData[key]));
        if (newFile) formData.append('image', newFile);

        try {
            if (editingId) {
                const res = await api.put(`promotions/${editingId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setPromotions(promotions.map(p => p._id === editingId ? res.data : p));
                setMessage('Ad updated successfully!');
            } else {
                const res = await api.post('promotions', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setPromotions([res.data, ...promotions]);
                setMessage('Ad created successfully!');
            }
            resetForm();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setMessage(editingId ? 'Error updating ad' : 'Error adding ad');
        }
    };

    const handleEdit = (promo) => {
        setPromoData({
            type: promo.type,
            title: promo.title,
            description: promo.description,
            ctaText: promo.ctaText,
            ctaLink: promo.ctaLink,
            videoUrl: promo.videoUrl || '',
            active: promo.active
        });
        setEditingId(promo._id);
        setShowForm(true);
    };

    const handleUpdateActive = async (id, activeStatus) => {
        const formData = new FormData();
        formData.append('active', !activeStatus);
        try {
            const res = await api.put(`promotions/${id}`, formData);
            setPromotions(promotions.map(p => p._id === id ? res.data : p));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this ad?')) return;
        try {
            await api.delete(`promotions/${id}`);
            setPromotions(promotions.filter(p => p._id !== id));
            setMessage('Ad deleted successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setMessage('Error deleting ad');
        }
    };

    if (loading) return <div className="promo-dashboard">Loading...</div>;

    return (
        <div className="promo-dashboard">
            <div className="promo-header">
                <h1>Manage Advertisements</h1>
                <button onClick={() => setShowForm(true)} className="add-btn">
                    <span>+</span> Create New Advertisement
                </button>
            </div>

            {message && <div className={`admin-message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}

            {showForm && (
                <div className="form-overlay">
                    <div className="form-modal">
                        <h2>{editingId ? 'Edit Advertisement' : 'Create New Advertisement'}</h2>
                        <form onSubmit={handleSubmit} className="modern-form">
                            <div className="form-group">
                                <label>Ad Type</label>
                                <select
                                    value={promoData.type}
                                    onChange={(e) => setPromoData({ ...promoData, type: e.target.value })}
                                    className="modern-input"
                                >
                                    <option value="inline_promo">In-Content Promo</option>
                                    <option value="top_banner">Top Banner Alert</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={promoData.title}
                                    onChange={(e) => setPromoData({ ...promoData, title: e.target.value })}
                                    className="modern-input"
                                    placeholder="Enter ad title"
                                    required
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    value={promoData.description}
                                    onChange={(e) => setPromoData({ ...promoData, description: e.target.value })}
                                    className="modern-input"
                                    rows="2"
                                    placeholder="Brief ad description..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Image File {editingId && '(Optional if not changing)'}</label>
                                <input
                                    type="file"
                                    onChange={(e) => setNewFile(e.target.files[0])}
                                    className="modern-input"
                                    required={!editingId}
                                />
                            </div>
                            <div className="form-group">
                                <label>CTA Text</label>
                                <input
                                    type="text"
                                    value={promoData.ctaText}
                                    onChange={(e) => setPromoData({ ...promoData, ctaText: e.target.value })}
                                    className="modern-input"
                                    placeholder="e.g. Learn More"
                                />
                            </div>
                            <div className="form-group">
                                <label>CTA Link</label>
                                <input
                                    type="text"
                                    value={promoData.ctaLink}
                                    onChange={(e) => setPromoData({ ...promoData, ctaLink: e.target.value })}
                                    className="modern-input"
                                    placeholder="https://..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Video URL (Optional)</label>
                                <input
                                    type="text"
                                    value={promoData.videoUrl}
                                    onChange={(e) => setPromoData({ ...promoData, videoUrl: e.target.value })}
                                    className="modern-input"
                                    placeholder="YouTube/Instagram Link"
                                />
                            </div>
                            <div className="form-actions full-width">
                                <button type="button" onClick={resetForm} className="cancel-link">Cancel</button>
                                <button type="submit" className="add-btn">
                                    {editingId ? 'Update Advertisement' : 'Save Advertisement'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="promo-table-container">
                <table className="promo-table">
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>Type</th>
                            <th>Details</th>
                            <th>Status/Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promotions.map(promo => (
                            <tr key={promo._id}>
                                <td className="promo-img-cell" data-label="Preview">
                                    <img src={getImageUrl(promo.image)} alt="Ad Thumbnail" />
                                </td>
                                <td data-label="Type">
                                    <span className={`badge badge-${promo.type === 'top_banner' ? 'top' : 'inline'}`}>
                                        {promo.type.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="promo-title-cell" data-label="Details">
                                    <h3>{promo.title}</h3>
                                    <p>{promo.description}</p>
                                </td>
                                <td data-label="Actions">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="status-toggle">
                                            <input
                                                type="checkbox"
                                                checked={promo.active}
                                                onChange={() => handleUpdateActive(promo._id, promo.active)}
                                            />
                                            {promo.active ? 'Active' : 'Hidden'}
                                        </div>
                                        <div className="action-group">
                                            <button onClick={() => handleEdit(promo)} className="icon-btn edit">✎</button>
                                            <button onClick={() => handleDelete(promo._id)} className="icon-btn delete">🗑</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagePromotions;
