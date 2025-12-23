import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await api.get('/articles');
            setArticles(res.data);
        } catch (err) {
            console.error("Error fetching articles:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;
        try {
            await api.delete(`/articles/${id}`);
            setArticles(articles.filter(a => a._id !== id));
        } catch (err) {
            alert('Failed to delete article');
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h1>Manage Articles</h1>
                <Link to="/admin/articles/new" className="btn">Add New</Link>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}>Title</th>
                        <th style={{ padding: '12px' }}>Category</th>
                        <th style={{ padding: '12px' }}>Date</th>
                        <th style={{ padding: '12px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article._id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '12px' }}>{article.title}</td>
                            <td style={{ padding: '12px' }}>{article.category?.name}</td>
                            <td style={{ padding: '12px' }}>{new Date(article.createdAt).toLocaleDateString()}</td>
                            <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                                <Link to={`/admin/articles/edit/${article._id}`} style={{ color: 'blue', textDecoration: 'none' }}>Edit</Link>
                                <button onClick={() => handleDelete(article._id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminArticles;
