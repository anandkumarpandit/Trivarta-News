import React, { useState, useEffect } from 'react';
import { getImageUrl, getVideoEmbed } from '../utils/api';
import { IoCloseCircle, IoInformationCircleOutline } from 'react-icons/io5';
import { SiAdblock } from 'react-icons/si';

const PromoCard = ({ promo }) => {
    // console.log('PromoCard Render:', promo.title, promo.imageUrl); // Debug Log
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
        <div className="promo-card-premium" style={{
            marginBottom: '40px',
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.05)',
            border: '1px solid rgba(0,0,0,0.05)',
            overflow: 'hidden',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            animation: 'floatIn 0.6s ease-out',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Header / Brand Badge */}
            <div style={{
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#fff',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                }}>
                    <SiAdblock size={18} />
                </div>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.2' }}>QuickAds Symphony</div>
                    {/* Title moved here */}
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#4f46e5', marginTop: '2px' }}>{promo.title}</div>
                    <div style={{ fontSize: '0.7rem', color: '#888' }}>Sponsored Assistant</div>
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
                        alignItems: 'center'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#ff4d4d'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#bbb'}
                >
                    <IoCloseCircle size={24} />
                </button>
            </div>

            <div style={{ position: 'relative' }}>
                {videoEmbedUrl ? (
                    videoEmbedUrl.match(/\.(mp4|webm|mov)$/i) || videoEmbedUrl.includes('/video/upload/') ? (
                        <div style={{
                            width: '100%',
                            background: '#000',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <video
                                src={videoEmbedUrl}
                                controls
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    display: 'block'
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{
                            position: 'relative',
                            paddingBottom: videoEmbedUrl.includes('instagram.com/reel/') ? '177.77%' : '150%',
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
                    )
                ) : promo.imageUrl ? (
                    <a href={promo.linkUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                        <div style={{ overflow: 'hidden' }}>
                            <img
                                src={getImageUrl(promo.imageUrl)}
                                alt={promo.title}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    transition: 'transform 0.6s ease'
                                }}
                                className="promo-img-hover"
                            />
                        </div>
                    </a>
                ) : null}

                {/* Footer Controls */}
                <div style={{
                    padding: '16px 20px',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                            {/* Title removed from here */}
                            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>Personalized for you</div>
                        </div>
                        <IoInformationCircleOutline size={20} color="#ccc" />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={handleDismiss}
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '12px',
                                border: '1px solid #eee',
                                background: '#f8f8f8',
                                color: '#666',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
                            onMouseOut={(e) => e.currentTarget.style.background = '#f8f8f8'}
                        >
                            Dismiss
                        </button>
                        <a
                            href={promo.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                flex: 2,
                                padding: '10px',
                                borderRadius: '12px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                textAlign: 'center',
                                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                            }}
                            className="btn-glow"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes floatIn {
                    0% { opacity: 0; transform: translateY(20px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .promo-card-premium:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
                }
                .promo-card-premium:hover .promo-img-hover {
                    transform: scale(1.05);
                }
                .btn-glow:hover {
                    transform: scale(1.02);
                    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
                    filter: brightness(1.1);
                }
            `}</style>
        </div>
    );
};

export default PromoCard;
