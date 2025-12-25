import React, { useState, useEffect } from 'react';
import { getImageUrl, getVideoEmbed } from '../utils/api';
import { IoCloseCircle, IoClose } from 'react-icons/io5';

const AdModal = ({ promo, onClose }) => {
    const [elapsed, setElapsed] = useState(0);
    const [canClose, setCanClose] = useState(false);

    // Force user to wait 3 seconds before closing (optional, adds "premium" feel like real ads)
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsed(prev => {
                if (prev >= 3) {
                    setCanClose(true);
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!promo) return null;

    const videoEmbedUrl = getVideoEmbed(promo.videoUrl);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9999, // Extremely high Z-Index to block everything
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(8px)'
        }}>
            <div
                className="ad-modal-card"
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '500px',
                    background: '#fff',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={canClose ? onClose : null}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        zIndex: 10,
                        background: 'rgba(0,0,0,0.6)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: canClose ? 'pointer' : 'not-allowed',
                        color: '#fff',
                        transition: 'all 0.2s',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    {canClose ? <IoClose size={22} /> : <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{3 - elapsed}</span>}
                </button>

                {/* Content */}
                <div style={{ position: 'relative' }}>
                    {videoEmbedUrl ? (
                        videoEmbedUrl.match(/\.(mp4|webm|mov)$/i) || videoEmbedUrl.includes('/video/upload/') ? (
                            <video
                                src={videoEmbedUrl}
                                autoPlay
                                loop
                                controls
                                style={{ width: '100%', display: 'block', maxHeight: '60vh', objectFit: 'contain', background: '#000' }}
                            />
                        ) : (
                            <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                                <iframe
                                    src={videoEmbedUrl}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                    allowFullScreen
                                    title={promo.title}
                                ></iframe>
                            </div>
                        )
                    ) : (
                        <img
                            src={getImageUrl(promo.imageUrl)}
                            alt={promo.title}
                            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '50vh', objectFit: 'cover' }}
                        />
                    )}
                </div>

                {/* Footer Info */}
                <div style={{ padding: '24px', textAlign: 'center' }} className="ad-modal-footer">
                    <div style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#999', marginBottom: '10px' }}>Sponsored Offer</div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', color: '#111', fontWeight: '800' }}>{promo.title}</h3>
                    <p style={{ margin: '0 0 24px 0', fontSize: '0.95rem', color: '#555', lineHeight: '1.5' }}>Exclusive content tailored for you. Don't miss out on this opportunity!</p>

                    <a
                        href={promo.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ad-cta-button"
                        style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #111, #333)',
                            color: '#fff',
                            textDecoration: 'none',
                            padding: '14px 40px',
                            borderRadius: '50px',
                            fontWeight: '700',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                        }}
                        onClick={onClose}
                    >
                        Visit Now
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes popIn {
                    0% { transform: scale(0.9) translateY(20px); opacity: 0; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                
                @media (max-width: 600px) {
                    .ad-modal-card {
                        max-width: 90% !important;
                        border-radius: 20px !important;
                    }
                    .ad-modal-footer {
                        padding: 20px !important;
                    }
                    .ad-modal-footer h3 {
                        font-size: 1.1rem !important;
                    }
                    .ad-modal-footer p {
                        font-size: 0.85rem !important;
                        margin-bottom: 20px !important;
                    }
                    .ad-cta-button {
                        padding: 12px 30px !important;
                        font-size: 0.9rem !important;
                    }
                }

                .ad-modal-card:hover {
                    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.3) !important;
                }

                .ad-cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important;
                    filter: brightness(1.2);
                }
            `}</style>
        </div>
    );
};

export default AdModal;
