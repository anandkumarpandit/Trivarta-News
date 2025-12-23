import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import NewsCard from '../components/NewsCard';
import SectionHeader from '../components/SectionHeader';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/articles?search=${query}`);
                setArticles(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error searching:", err);
                setLoading(false);
            }
        };

        if (query) fetchResults();
    }, [query]);

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <SectionHeader title={`Search Results for "${query}"`} />
            {articles.length === 0 ? (
                <p>No articles found matching your search.</p>
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

export default SearchResults;
