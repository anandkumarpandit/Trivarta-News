import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api, { getImageUrl, getVideoEmbed } from '../utils/api';
import PromoCard from '../components/PromoCard';
import './ArticleDetail.css';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [promos, setPromos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artRes = await api.get(`/articles/${id}`);
                setArticle(artRes.data);

                const promoRes = await api.get('/promotions');
                setPromos(promoRes.data);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    const processContent = (html) => {
        if (!html) return '';
        const videoLinkRegex = /<a href="(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/)|youtu\.be\/|instagram\.com\/reel\/|instagram\.com\/reels\/)[^"]+)"[^>]*>.*?<\/a>/g;
        let processedHtml = html.replace(videoLinkRegex, (match, url) => {
            const embedUrl = getVideoEmbed(url);
            if (embedUrl && (embedUrl.includes('embed') || embedUrl.includes('instagram.com/reel/'))) {
                const isReel = embedUrl.includes('instagram.com/reel/');
                return `<div class="content-video-container ${isReel ? 'reels-container' : ''}"><iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe></div>`;
            }
            return match;
        });

        const rawUrlRegex = /(^|>|\s)(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/)|youtu\.be\/|instagram\.com\/reel\/|instagram\.com\/reels\/)[^\s<]+)($|<|\s)/g;
        processedHtml = processedHtml.replace(rawUrlRegex, (match, p1, url, p3) => {
            const embedUrl = getVideoEmbed(url);
            if (embedUrl && (embedUrl.includes('embed') || embedUrl.includes('instagram.com/reel/'))) {
                const isReel = embedUrl.includes('instagram.com/reel/');
                return `${p1}<div class="content-video-container ${isReel ? 'reels-container' : ''}"><iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe></div>${p3}`;
            }
            return match;
        });
        return processedHtml;
    };

    if (loading) return <div className="container">Loading...</div>;
    if (!article) return <div className="container">Article not found</div>;

    const videoEmbedUrl = getVideoEmbed(article.videoUrl);

    return (
        <div className="container article-layout">
            <aside className="promo-sidebar left-sidebar">
                {promos.filter(p => p.position === 'left' && p.active).map(promo => (
                    <PromoCard key={promo._id} promo={promo} />
                ))}
            </aside>

            <main className="article-main">
                <article className="article-detail">
                    <header className="article-header">
                        <span className="category-badge">{article.category?.name}</span>
                        <h1>{article.title}</h1>
                        <p className="subtitle">{article.subtitle}</p>
                        <div className="article-meta">
                            <span>By {article.author || 'Editorial Team'}</span>
                            <span className="separator">•</span>
                            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                    </header>

                    <div className="article-media">
                        {videoEmbedUrl ? (
                            <div className="featured-video">
                                <div className="video-container">
                                    <iframe
                                        src={videoEmbedUrl}
                                        title="Article Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        ) : article.image && (
                            <img src={getImageUrl(article.image)} alt={article.title} className="featured-image" />
                        )}
                    </div>

                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: processContent(article.content) }}
                    />
                </article>
            </main>

            <aside className="promo-sidebar right-sidebar">
                {promos.filter(p => p.position === 'right' && p.active).map(promo => (
                    <PromoCard key={promo._id} promo={promo} />
                ))}
            </aside>
        </div>
    );
};

export default ArticleDetail;
