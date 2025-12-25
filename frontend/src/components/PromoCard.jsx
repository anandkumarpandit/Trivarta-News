import React, { useState, useEffect } from 'react';
import { getImageUrl, getVideoEmbed } from '../utils/api';
import { IoCloseCircle, IoInformationCircleOutline } from 'react-icons/io5';
import { SiAdblock } from 'react-icons/si';

const PromoCard = ({ promo, compact = false }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let timer;
        if (!isVisible) {
            timer = setTimeout(() => {
                setIsVisible(true);
            }, 30000);
        }
        return () => clearTimeout(timer);
    }, [isVisible]);

    if (!promo || !isVisible) return null;

    const videoEmbedUrl = getVideoEmbed(promo.videoUrl);

    const handleDismiss = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVisible(false);
    };

    return (
        <div className={`promo-card-premium ${compact ? 'promo-compact' : ''}`} style={{
            marginBottom: compact ? '16px' : '20px',
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.98)',
            borderRadius: '12px',
            boxShadow: compact ? '0 8px 16px rgba(0,0,0,0.06)' : '0 10px 20px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.05)',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            animation: 'floatIn 0.5s ease-out',
            fontFamily: "'Inter', sans-serif",
            maxWidth: compact ? '280px' : '100%',
            margin: compact ? '0 auto 16px auto' : '0 0 20px 0'
        }}>
            {/* Header / Brand Badge */}
            <div className="promo-header" style={{
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#fff',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
                <div className="promo-badge-icon" style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0
                }}>
                    <SiAdblock className="si-icon" size={12} />
                </div>
                <div style={{ textAlign: 'left', minWidth: 0 }}>
                    <div className="promo-brand-name" style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1a1a1a', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>QuickAds</div>
                    <div className="promo-brand-title" style={{ fontSize: '0.65rem', fontWeight: '600', color: '#4f46e5', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{promo.title}</div>
                </div>

                <button
                    onClick={handleDismiss}
                    style={{
                        marginLeft: 'auto',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#bbb',
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#ff4d4d'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#bbb'}
                >
                    <IoCloseCircle className="close-icon" size={18} />
                </button>
            </div>

            <div style={{ position: 'relative' }}>
                {videoEmbedUrl ? (
                    <div className="promo-media-container" style={{
                        position: 'relative',
                        paddingBottom: compact ? '56.25%' : (videoEmbedUrl.includes('instagram.com/reel/') ? '177.77%' : '150%'),
                        height: 0,
                        overflow: 'hidden',
                        backgroundColor: '#000'
                    }}>
                        <iframe
                            src={videoEmbedUrl}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 'none'
                            }}
                            allowFullScreen
                            title={promo.title}
                        ></iframe>
                    </div>
                ) : promo.imageUrl ? (
                    <a href={promo.linkUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                        <div style={{ overflow: 'hidden' }}>
                            <img
                                src={getImageUrl(promo.imageUrl)}
                                alt={promo.title}
                                style={{
                                    width: '100%',
                                    height: compact ? '140px' : 'auto',
                                    objectFit: 'cover',
                                    display: 'block',
                                    transition: 'transform 0.6s ease'
                                }}
                                className="promo-img-hover promo-image"
                            />
                        </div>
                    </a>
                ) : null}

                <div className="promo-body" style={{
                    padding: '10px 14px',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    <div className="promo-meta-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.65rem', color: '#888' }}>Personalized for you</div>
                        </div>
                        <IoInformationCircleOutline size={16} color="#ddd" />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        {compact ? (
                            <a
                                href={promo.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    textAlign: 'center',
                                    transition: 'all 0.3s',
                                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
                                }}
                                className="btn-glow promo-btn"
                            >
                                Explore Story
                            </a>
                        ) : (
                            <>
                                <button
                                    onClick={handleDismiss}
                                    style={{
                                        flex: 1,
                                        padding: '6px',
                                        borderRadius: '8px',
                                        border: '1px solid #eee',
                                        background: '#fcfcfc',
                                        color: '#777',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = '#f5f5f5'}
                                    onMouseOut={(e) => e.currentTarget.style.background = '#fcfcfc'}
                                >
                                    Dismiss
                                </button>
                                <a
                                    href={promo.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        flex: 2,
                                        padding: '6px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        textAlign: 'center',
                                        boxShadow: '0 2px 8px rgba(79, 70, 229, 0.2)'
                                    }}
                                    className="btn-glow"
                                >
                                    Learn More
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes floatIn {
                    0% { opacity: 0; transform: translateY(15px) scale(0.98); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .promo-card-premium:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
                }
                .promo-card-premium:hover .promo-img-hover {
                    transform: scale(1.04);
                }
                .btn-glow:hover {
                    transform: scale(1.02);
                    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
                    filter: brightness(1.1);
                }

                /* Mobile Optimization for Very Small Ads */
                @media (max-width: 600px) {
                    .promo-compact {
                        max-width: 200px !important;
                    }
                    .promo-compact .promo-image {
                        height: 90px !important;
                    }
                    .promo-compact .promo-header {
                        padding: 4px 8px !important;
                    }
                    .promo-compact .promo-brand-name {
                        font-size: 0.65rem !important;
                    }
                    .promo-compact .promo-brand-title {
                        font-size: 0.55rem !important;
                    }
                    .promo-compact .promo-badge-icon {
                        width: 16px !important;
                        height: 16px !important;
                    }
                    .promo-compact .si-icon {
                        transform: scale(0.8);
                    }
                    .promo-compact .close-icon {
                        width: 14px !important;
                        height: 14px !important;
                    }
                    .promo-compact .promo-body {
                        padding: 6px 10px !important;
                        gap: 4px !important;
                    }
                    .promo-compact .promo-meta-info {
                        display: none !important;
                    }
                    .promo-compact .promo-btn {
                        padding: 4px !important;
                        font-size: 0.65rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default PromoCard;
