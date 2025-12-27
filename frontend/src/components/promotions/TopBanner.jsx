import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../utils/api';
import './TopBanner.css';

const TopBanner = ({
    ads = [],
    displayDuration = 6000
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isHiding, setIsHiding] = useState(false);

    useEffect(() => {
        if (ads.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % ads.length);
        }, displayDuration);

        return () => clearInterval(interval);
    }, [ads.length, displayDuration]);

    const handleClose = () => {
        setIsHiding(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsHiding(false);
        }, 800);
    };

    if ((!ads || ads.length === 0) || (!isVisible && !isHiding)) return null;

    const currentAd = ads[currentIndex] || ads[0];

    return (
        <div className={`top-banner-alert ${isHiding ? 'hiding' : ''}`} aria-hidden={!isVisible}>
            <button
                className="banner-close-btn"
                onClick={handleClose}
                aria-label="Close promotion"
            >
                &times;
            </button>

            <div className="banner-content carousel-item">
                <img src={getImageUrl(currentAd.image)} alt="Promotion" className="banner-image slide-animation" key={currentIndex} />

                <div className="banner-text slide-animation" key={`text-${currentIndex}`}>
                    <span className="banner-label">Sponsored</span>
                    <h3 className="banner-headline">{currentAd.title}</h3>
                    <p className="banner-description">{currentAd.description}</p>
                </div>

                <a href={currentAd.ctaLink} className="banner-cta" target="_blank" rel="noopener noreferrer">
                    {currentAd.ctaText || 'Learn More'}
                </a>
            </div>

            {ads.length > 1 && (
                <div className="banner-dots">
                    {ads.map((_, i) => (
                        <span
                            key={i}
                            className={`banner-dot ${i === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(i)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopBanner;
