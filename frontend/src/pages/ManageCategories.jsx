import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/categories', { name: newCategory });
            setCategories([...categories, res.data]);
            setNewCategory('');
        } catch (err) {
            alert('Failed to add category');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this category?')) return;
        try {
            await api.delete(`/categories/${id}`);
            setCategories(categories.filter(c => c._id !== id));
        } catch (err) {
            alert('Failed to delete category');
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '600px' }}>
            <h1>Manage Categories</h1>

            <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    type="text"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    placeholder="New Category Name"
                    required
                    style={{ flexGrow: 1, padding: '10px' }}
                />
                <button type="submit" className="btn">Add</button>
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {categories.map(cat => (
                    <li key={cat._id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        borderBottom: '1px solid #eee',
                        alignItems: 'center'
                    }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>{cat.name}</span>
                        <button onClick={() => handleDelete(cat._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCategories;
