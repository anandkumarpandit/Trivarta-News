import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

import './AdminDashboard.css';

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

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Total Articles</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.articles}</p>
                    <Link to="/admin/articles" className="btn btn-outline">Manage Articles</Link>
                </div>
                <div className="dashboard-card">
                    <h3>Categories</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.categories}</p>
                    <Link to="/admin/categories" className="btn btn-outline">Manage Categories</Link>
                </div>
            </div>

            <div style={{ marginTop: 'var(--spacing-xl)' }}>
                <Link to="/admin/articles/new" className="btn">Write New Article</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
