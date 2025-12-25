import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ articles: 0, categories: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const artRes = await api.get('articles');
                const catRes = await api.get('categories');
                setStats({
                    articles: artRes.data.length,
                    categories: catRes.data.length
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, <strong>{user?.username}</strong></p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-lg)' }}>
                <div style={{ padding: '1.5rem', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
                    <h3>Total Articles</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.articles}</p>
                    <Link to="/admin/articles" className="btn btn-outline" style={{ marginTop: '1rem' }}>Manage Articles</Link>
                </div>
                <div style={{ padding: '1.5rem', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
                    <h3>Categories</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.categories}</p>
                    <Link to="/admin/categories" className="btn btn-outline" style={{ marginTop: '1rem' }}>Manage Categories</Link>
                </div>
            </div>

            <div style={{ marginTop: 'var(--spacing-xl)' }}>
                <Link to="/admin/articles/new" className="btn">Write New Article</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
