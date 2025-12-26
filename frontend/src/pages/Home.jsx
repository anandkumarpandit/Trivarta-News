import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import HeroSection from '../components/HeroSection';
import NewsCard from '../components/NewsCard';
import SectionHeader from '../components/SectionHeader';
import PromotionCard from '../components/promotions/PromotionCard';
import './Home.css';

const Home = () => {
    const [trendingNews, setTrendingNews] = useState([]);
    const [latestNews, setLatestNews] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(24); // Show 24 articles initially
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ... (fetches)
                const trendingRes = await api.get('articles/trending');
                setTrendingNews(trendingRes.data);

                const latestRes = await api.get('articles');
                setLatestNews(latestRes.data);
                if (latestRes.data.length === 0) {
                    setError('No articles found in database.');
                }

                // Fetch promotions
                try {
                    const promoRes = await api.get('promotions');
                    const activeInline = promoRes.data.filter(p => p.type === 'inline_promo' && p.active);
                    setPromotions(activeInline);
                } catch (err) {
                    console.error("Failed to load promotions", err);
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError(err.message || 'Failed to load news');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 12);
    };

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;
    if (error) return <div className="container" style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;

    const featuredArticle = latestNews.length > 0 ? latestNews[0] : null;
    const allRemainingArticles = latestNews.slice(1);
    const visibleArticles = allRemainingArticles.slice(0, visibleCount - 1);
    const hasMore = allRemainingArticles.length > visibleArticles.length;

    return (
        <div className="container home-container">
            {/* Breaking News Ticker */}
            <div className="breaking-ticker-container">
                <span className="ticker-label">Breaking</span>
                <div className="ticker-content">
                    <div className="ticker-text">
                        {featuredArticle ? featuredArticle.title : 'Welcome to TrivartaNews - Your trusted source for daily news.'}
                        {trendingNews.length > 0 && ` • Trending: ${trendingNews[0].title}`}
                        {trendingNews.length > 1 && ` • ${trendingNews[1].title}`}
                    </div>
                </div>
            </div>

            {featuredArticle && <HeroSection article={featuredArticle} />}

            <div className="main-content-grid">
                <div>
                    <SectionHeader title="Latest News" link="/category/all" linkText="View All News" />
                    <div className="articles-grid">
                        {visibleArticles.map((article, index) => {
                            // Show ad every 8 items. Rotate through home promotions.
                            const promoIndex = Math.floor(index / 8);
                            const currentPromo = promotions[promoIndex % promotions.length];
                            const showAd = promotions.length > 0 && (index + 1) % 8 === 0;

                            return (
                                <React.Fragment key={article._id}>
                                    <NewsCard article={article} />
                                    {showAd && currentPromo && (
                                        <div className="home-promo-wrapper" style={{ gridColumn: '1 / -1', margin: '1.5rem 0' }}>
                                            <PromotionCard ads={promotions.slice(promoIndex % promotions.length, (promoIndex % promotions.length) + 2)} />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {hasMore && (
                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <button onClick={loadMore} className="btn" style={{
                                padding: '12px 32px',
                                fontSize: '1rem',
                                fontWeight: '600'
                            }}>
                                Load More News
                            </button>
                        </div>
                    )}
                </div>

                <div className="sidebar-column">
                    <SectionHeader title="Trending Now" />
                    <div className="trending-list">
                        {trendingNews.map(article => (
                            <NewsCard key={article._id} article={article} compact={true} />
                        ))}
                    </div>

                    {promotions.length > 0 && (
                        <div className="mini-promos-section" style={{ marginTop: '2rem' }}>
                            <SectionHeader title="Sponsorship" />
                            <div className="mini-promos-stack" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {promotions.map((promo, idx) => (
                                    <PromotionCard key={promo._id || idx} promotion={promo} className="mini" />
                                ))}
                            </div>
                        </div>
                    )}

                    {promotions.length > 0 && (
                        <div style={{ marginTop: '2rem' }}>
                            <PromotionCard ads={promotions} className="vertical" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
