import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

import './AdminArticles.css';

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const res = await api.get('/articles');
            setArticles(res.data);
        } catch {
            console.error("Error fetching articles");
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchArticles();
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;
        try {
            await api.delete(`/articles/${id}`);
            setArticles(articles.filter(a => a._id !== id));
        } catch {
            alert('Failed to delete article');
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h1>Manage Articles</h1>
                <Link to="/admin/articles/new" className="btn">Add New</Link>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map(article => (
                            <tr key={article._id}>
                                <td>{article.title}</td>
                                <td>{article.category?.name}</td>
                                <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                                <td style={{ display: 'flex', gap: '8px' }}>
                                    <Link to={`/admin/articles/edit/${article._id}`} className="action-btn edit">Edit</Link>
                                    <button onClick={() => handleDelete(article._id)} className="action-btn delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminArticles;
