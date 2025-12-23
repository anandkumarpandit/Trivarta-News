import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/api';
import './NewsCard.css';

const NewsCard = ({ article, compact = false }) => {
    return (
        <div className={`news-card hover-lift ${compact ? 'news-card-compact' : ''}`}>
            <div className="news-card-image">
                <img src={getImageUrl(article.image)} alt={article.title} />
                <span className="news-card-category">{article.category?.name || 'News'}</span>
                {article.videoUrl && (
                    <div className="play-icon-overlay">
                        ▶
                    </div>
                )}
            </div>
            <div className="news-card-content">
                <h3 className="news-card-title">
                    <Link to={`/article/${article._id}`}>{article.title}</Link>
                </h3>
                {!compact && <p className="news-card-subtitle">{article.subtitle}</p>}
                <div className="news-card-meta">
                    <span className="news-card-author">✍️ {article.author}</span>
                    <span className="news-card-date">🕒 {new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
