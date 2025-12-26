import React, { useState, useEffect } from 'react';
import { getVideoEmbed } from '../../utils/api';
import './PreReadAd.css';

const PreReadAd = ({ ads = [], onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(3);
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const currentAd = ads.find(ad => ad.active) || ads[0];

    useEffect(() => {
        if (!currentAd) {
            onComplete?.();
            return;
        }

        const countdownInterval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [currentAd]);

    const handleManualClose = () => {
        if (timeLeft > 0) return;
        setIsFadingOut(true);
        setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
        }, 600);
    };

    if (!isVisible || !currentAd) return null;

    const videoEmbed = currentAd.videoUrl ? getVideoEmbed(currentAd.videoUrl) : null;

    return (
        <div className={`pre-read-overlay ${isFadingOut ? 'fade-out' : ''}`}>
            <div className="pre-read-container">
                {timeLeft === 0 ? (
                    <button className="pre-read-close-btn" onClick={handleManualClose}>&times;</button>
                ) : (
                    <div className="pre-read-timer-display">
                        Wait {timeLeft}s
                    </div>
                )}

                <span className="pre-read-label">Sponsored Content</span>

                <div className="pre-read-media">
                    {videoEmbed ? (
                        <div className="pre-read-video-wrapper">
                            <iframe
                                src={videoEmbed}
                                title="Sponsored Content"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <img src={currentAd.image} alt="Sponsored" className="pre-read-image" />
                    )}
                </div>

                <div className="pre-read-content">
                    <h2 className="pre-read-title">{currentAd.title}</h2>
                    <p className="pre-read-description">{currentAd.description}</p>
                    <a href={currentAd.ctaLink} target="_blank" rel="noopener noreferrer" className="pre-read-cta">
                        {currentAd.ctaText || 'Learn More'}
                    </a>
                </div>

                <div className="pre-read-timer-bar">
                    <div className="timer-progress"></div>
                </div>
            </div>
        </div>
    );
};

export default PreReadAd;
