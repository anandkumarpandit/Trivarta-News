import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../utils/api';
import NewsCard from '../components/NewsCard';
import SectionHeader from '../components/SectionHeader';

const CategoryPage = () => {
    const { category } = useParams();
    const location = useLocation();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                // Check if this is the /latest route
                const isLatestRoute = location.pathname === '/latest';

                if (isLatestRoute) {
                    const res = await api.get('/articles?latest=true');
                    setArticles(res.data);
                } else if (!category || category.toLowerCase() === 'all') {
                    const res = await api.get('/articles');
                    setArticles(res.data);
                } else {
                    const catsRes = await api.get('/categories');
                    const catObj = catsRes.data.find(c => c.name.toLowerCase() === category.toLowerCase());

                    if (catObj) {
                        const res = await api.get(`/articles?category=${catObj._id}`);
                        setArticles(res.data);
                    } else {
                        setArticles([]);
                    }
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching category articles:", err);
                setLoading(false);
            }
        };

        fetchArticles();
    }, [category, location.pathname]);

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <SectionHeader title={
                location.pathname === '/latest' ? "Latest News" :
                    (!category || category.toLowerCase() === 'all') ? "All News" :
                        `${category} News`
            } />
            {articles.length === 0 ? (
                <p>No articles found in this category.</p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 'var(--spacing-lg)'
                }}>
                    {articles.map(article => (
                        <NewsCard key={article._id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
