import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api, { getImageUrl, getVideoEmbed } from '../utils/api';
import './ArticleDetail.css';
import TopBanner from '../components/promotions/TopBanner';
import PreReadAd from '../components/promotions/PreReadAd';
import '../components/promotions/InlinePromo.css';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [promotions, setPromotions] = useState({ top_banner: null, inline_promo: null });
    const [showPreRead, setShowPreRead] = useState(false);

    const [loading, setLoading] = useState(true);
    const contentRef = useRef(null);

    useEffect(() => {
        setShowPreRead(true);

        const fetchData = async () => {
            try {
                const artRes = await api.get(`articles/${id}`);
                setArticle(artRes.data);

                // Fetch promotions
                try {
                    const promoRes = await api.get('promotions');
                    const activePromos = promoRes.data.filter(p => p.active);
                    const topBanners = activePromos.filter(p => p.type === 'top_banner');
                    const inline = activePromos.filter(p => p.type === 'inline_promo');
                    setPromotions({ top_banners: topBanners, inline_promos: inline });
                } catch (err) {
                    console.error("Failed to load promotions", err);
                }



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
        // Improved Regex for Video Links (either in A tags or raw text)
        const videoLinkRegex = /<a href="(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/|playlist\?list=)|youtu\.be\/|instagram\.com\/(?:reel|p)\/|tiktok\.com\/@[^/]+\/video\/|facebook\.com\/watch\/\?v=|fb\.watch\/)[^"]+)"[^>]*>.*?<\/a>/g;

        let processedHtml = html.replace(videoLinkRegex, (match, url) => {
            const embedUrl = getVideoEmbed(url);
            if (embedUrl) {
                const isReel = embedUrl.includes('instagram.com/reel/') || url.includes('/shorts/');
                return `<div class="content-video-container ${isReel ? 'reels-container' : ''}"><iframe src="${embedUrl}" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;
            }
            return match;
        });

        const rawUrlRegex = /(^|>|\s)(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/|playlist\?list=)|youtu\.be\/|instagram\.com\/(?:reel|p)\/|tiktok\.com\/@[^/]+\/video\/|facebook\.com\/watch\/\?v=|fb\.watch\/)[^\s<"']+)($|<|\s)/g;
        processedHtml = processedHtml.replace(rawUrlRegex, (match, p1, url, p3) => {
            const embedUrl = getVideoEmbed(url);
            if (embedUrl) {
                const isReel = embedUrl.includes('instagram.com/reel/') || url.includes('/shorts/');
                return `${p1}<div class="content-video-container ${isReel ? 'reels-container' : ''}"><iframe src="${embedUrl}" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>${p3}`;
            }
            return match;
        });
        // Inject up to 3 Ads after paragraphs 2, 5, and 8
        const inlinePromos = (promotions.inline_promos || []).filter(p => p.active).slice(0, 3);

        if (inlinePromos.length > 0) {
            let paragraphCount = 0;
            let adIndex = 0;
            const targetParagraphs = [2, 5, 8];

            processedHtml = processedHtml.replace(/<\/p>/g, (match) => {
                paragraphCount++;
                if (adIndex < inlinePromos.length && paragraphCount === targetParagraphs[adIndex]) {
                    const promo = inlinePromos[adIndex];
                    adIndex++;
                    const adHtml = `
                        <div class="inline-promo-card">
                            <span class="promo-label">Sponsored</span>
                            <a href="${promo.ctaLink}" class="promo-container" target="_blank" rel="noopener noreferrer">
                                <img src="${getImageUrl(promo.image)}" class="promo-image" alt="Sponsored" />
                                <div class="promo-content">
                                    <h4 class="promo-title">${promo.title}</h4>
                                    <p class="promo-desc">${promo.description}</p>
                                    <span class="promo-cta">${promo.ctaText}</span>
                                </div>
                            </a>
                        </div>
                    `;
                    return `${match}${adHtml}`;
                }
                return match;
            });
        }

        return processedHtml;
    };

    if (loading) return <div className="container">Loading...</div>;
    if (!article) return <div className="container">Article not found</div>;

    const videoEmbedUrl = getVideoEmbed(article.videoUrl);

    return (
        <div className="container article-layout">
            {showPreRead && promotions.inline_promos && promotions.inline_promos.length > 0 && (
                <PreReadAd
                    ads={promotions.inline_promos}
                    onComplete={() => setShowPreRead(false)}
                />
            )}
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

                    {promotions.top_banners && promotions.top_banners.length > 0 && (
                        <TopBanner
                            ads={promotions.top_banners}
                            displayDuration={3000}
                        />
                    )}

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
                        ref={contentRef}
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: processContent(article.content) }}
                    />
                </article>
            </main>
        </div>
    );
};

export default ArticleDetail;
