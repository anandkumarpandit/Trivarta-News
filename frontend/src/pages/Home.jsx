import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import HeroSection from '../components/HeroSection';
import NewsCard from '../components/NewsCard';
import SectionHeader from '../components/SectionHeader';
import PromoCard from '../components/PromoCard';
import './Home.css';

const Home = () => {
    const [breakingNews, setBreakingNews] = useState(null);
    const [trendingNews, setTrendingNews] = useState([]);
    const [latestNews, setLatestNews] = useState([]);
    const [promos, setPromos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(24); // Show 24 articles initially

    useEffect(() => {
        const fetchData = async () => {
            try {
                const breakingRes = await api.get('articles/breaking');
                setBreakingNews(breakingRes.data[0]);

                const trendingRes = await api.get('articles/trending');
                setTrendingNews(trendingRes.data);

                const latestRes = await api.get('articles');
                setLatestNews(latestRes.data);

                const promoRes = await api.get('promotions');
                setPromos(promoRes.data);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching news:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 12);
    };

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

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
                        {visibleArticles.map(article => (
                            <NewsCard key={article._id} article={article} />
                        ))}
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

                    {promos.length > 0 && (
                        <div className="home-promos" style={{ marginTop: '3rem' }}>
                            <SectionHeader title="Sponsored" />
                            {promos.filter(p => p.active).map(promo => (
                                <PromoCard key={promo._id} promo={promo} compact={true} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
