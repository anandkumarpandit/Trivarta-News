import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/api';
import './HeroSection.css';

const HeroSection = ({ article }) => {
    if (!article) return null;

    return (
        <div className="hero-section">
            <div className="hero-image">
                <img src={getImageUrl(article.image)} alt={article.title} />
                <div className="hero-overlay"></div>
            </div>
            <div className="hero-content">
                <span className="hero-category">{article.category?.name || 'Top News'}</span>
                <h1 className="hero-title">
                    <Link to={`/article/${article._id}`}>{article.title}</Link>
                </h1>
                <p className="hero-subtitle">{article.subtitle}</p>
                <div className="hero-meta">
                    <span>✍️ {article.author}</span> • <span>🕒 {new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <Link to={`/article/${article._id}`} className="btn hero-btn" style={{ marginTop: '2rem' }}>
                    Read Full Story
                </Link>
            </div>
        </div>
    );
};

export default HeroSection;
