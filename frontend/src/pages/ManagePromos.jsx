import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const ManagePromos = () => {
    const [promos, setPromos] = useState([]);

    const fetchPromos = async () => {
        try {
            const res = await api.get('/promotions');
            setPromos(res.data);
        } catch {
            console.error("Error fetching promotions");
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPromos();
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this promotion?')) return;
        try {
            await api.delete(`/promotions/${id}`);
            setPromos(promos.filter(item => item._id !== id));
        } catch {
            alert('Failed to delete promotion');
        }
    };

    const toggleStatus = async (promo) => {
        try {
            const res = await api.put(`/promotions/${promo._id}`, { active: !promo.active });
            setPromos(promos.map(item => item._id === promo._id ? res.data : item));
        } catch {
            alert('Failed to update promotion status');
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h1>Manage Promotions</h1>
                <Link to="/admin/promotions/new" className="btn">Add New Promotion</Link>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}>Title</th>
                        <th style={{ padding: '12px' }}>Position</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {promos.map(promo => (
                        <tr key={promo._id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '12px' }}>{promo.title}</td>
                            <td style={{ padding: '12px', textTransform: 'capitalize' }}>{promo.position}</td>
                            <td style={{ padding: '12px' }}>
                                <span
                                    onClick={() => toggleStatus(promo)}
                                    style={{
                                        cursor: 'pointer',
                                        color: promo.active ? 'green' : 'gray',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {promo.active ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                                <Link to={`/admin/promotions/edit/${promo._id}`} style={{ color: 'blue', textDecoration: 'none' }}>Edit</Link>
                                <button onClick={() => handleDelete(promo._id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagePromos;
