import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const ArticleForm = () => {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [isBreaking, setIsBreaking] = useState(false);
    const [isTrending, setIsTrending] = useState(false);
    const [isLatest, setIsLatest] = useState(true);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(isEditMode);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const catRes = await api.get('/categories');
                setCategories(catRes.data);

                if (isEditMode) {
                    const artRes = await api.get(`/articles/${id}`);
                    const art = artRes.data;
                    setTitle(art.title);
                    setSubtitle(art.subtitle || '');
                    setContent(art.content);
                    setCategory(art.category?._id || art.category || '');
                    setVideoUrl(art.videoUrl || '');
                    setIsBreaking(art.isBreaking || false);
                    setIsTrending(art.isTrending || false);
                    setIsLatest(art.isLatest !== undefined ? art.isLatest : true);
                    setLoading(false);
                } else if (catRes.data.length > 0) {
                    setCategory(catRes.data[0]._id);
                }
            } catch (err) {
                console.error("Error fetching data", err);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('isBreaking', isBreaking);
        formData.append('isTrending', isTrending);
        formData.append('isLatest', isLatest);
        formData.append('videoUrl', videoUrl); // Always send videoUrl to allow clearing it
        if (image) formData.append('image', image);

        try {
            if (isEditMode) {
                await api.put(`/articles/${id}`, formData);
            } else {
                await api.post('/articles', formData);
            }
            navigate('/admin/articles');
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || err.message || 'Error saving article';
            alert(`Error saving article: ${errorMessage}`);
        }
    };

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading article data...</div>;

    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '800px' }}>
            <h1>{isEditMode ? 'Edit Article' : 'Write New Article'}</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '1.1rem' }}
                />
                <input
                    type="text"
                    placeholder="Subtitle"
                    value={subtitle}
                    onChange={e => setSubtitle(e.target.value)}
                    style={{ padding: '10px' }}
                />
                <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '10px' }}>
                    {categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
                <div className="editor-container" style={{ margin: '1rem 0' }}>
                    <label style={{ marginBottom: '0.5rem', display: 'block' }}>Content</label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        style={{ height: '300px', marginBottom: '3rem' }}
                        modules={{
                            toolbar: [
                                [{ 'header': [1, 2, false] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                ['link', 'image', 'video'],
                                ['clean']
                            ],
                        }}
                    />
                </div>

                <div>
                    <label>Image: {isEditMode && '(Leave blank to keep current)'}</label>
                    <input type="file" onChange={e => setImage(e.target.files[0])} required={!isEditMode} />
                </div>

                <input
                    type="text"
                    placeholder="Video URL (e.g., YouTube Link or MP4)"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    style={{ padding: '10px' }}
                />

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <label>
                        <input type="checkbox" checked={isBreaking} onChange={e => setIsBreaking(e.target.checked)} /> Breaking News
                    </label>
                    <label>
                        <input type="checkbox" checked={isTrending} onChange={e => setIsTrending(e.target.checked)} /> Trending
                    </label>
                    <label>
                        <input type="checkbox" checked={isLatest} onChange={e => setIsLatest(e.target.checked)} /> Latest News
                    </label>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn">{isEditMode ? 'Update Article' : 'Publish Article'}</button>
                    <button type="button" onClick={() => navigate('/admin/articles')} className="btn btn-outline">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ArticleForm;
