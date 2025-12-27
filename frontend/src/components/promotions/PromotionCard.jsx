import React from 'react';
import './InlinePromo.css';

import { getVideoEmbed, getImageUrl } from '../../utils/api';

const PromotionCard = ({ ads = [], promotion, className = '' }) => {
    const adList = Array.isArray(ads) && ads.length > 0 ? ads : (promotion ? [promotion] : []);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (adList.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % adList.length);
        }, 5000); // Default slide duration for cards

        return () => clearInterval(interval);
    }, [adList.length]);

    if (adList.length === 0) return null;

    const currentAd = adList[currentIndex];
    if (!currentAd || !currentAd.active) return null;

    const isVertical = className.includes('vertical');
    const isMini = className.includes('mini');
    const videoEmbed = currentAd.videoUrl ? getVideoEmbed(currentAd.videoUrl) : null;

    const renderMedia = () => {
        if (videoEmbed) {
            return (
                <div className="promo-video-wrapper">
                    <iframe
                        src={videoEmbed}
                        title="Sponsored Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            );
        }
        return <img src={getImageUrl(currentAd.image)} className="promo-image" alt="Sponsored" />;
    };

    if (isMini) {
        return (
            <div className={`inline-promo-card mini ${className}`} style={{ margin: '0' }}>
                <a href={currentAd.ctaLink} className="promo-container slide-animation" key={currentIndex} target="_blank" rel="noopener noreferrer">
                    <img src={getImageUrl(currentAd.image)} className="promo-image" alt="Sponsored" />
                    <div className="promo-content">
                        <h4 className="promo-title">{currentAd.title}</h4>
                        <span className="promo-cta">{currentAd.ctaText}</span>
                    </div>
                </a>
            </div>
        );
    }

    return (
        <div className={`inline-promo-card ${className}`} style={{ margin: '0' }}>
            <span className="promo-label">Sponsored</span>
            <a href={currentAd.ctaLink} className="promo-container slide-animation" key={currentIndex} target="_blank" rel="noopener noreferrer">
                {isVertical && (
                    <div className="promo-content">
                        <h4 className="promo-title">{currentAd.title}</h4>
                        <p className="promo-desc">{currentAd.description}</p>
                        <span className="promo-cta">{currentAd.ctaText}</span>
                    </div>
                )}

                {renderMedia()}

                {!isVertical && (
                    <div className="promo-content">
                        <h4 className="promo-title">{currentAd.title}</h4>
                        <p className="promo-desc">{currentAd.description}</p>
                        <span className="promo-cta">{currentAd.ctaText}</span>
                    </div>
                )}
            </a>

            {adList.length > 1 && (
                <div className="promo-dots">
                    {adList.map((_, i) => (
                        <span
                            key={i}
                            className={`promo-dot ${i === currentIndex ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentIndex(i);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PromotionCard;
