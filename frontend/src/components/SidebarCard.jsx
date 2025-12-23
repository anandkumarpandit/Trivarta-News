import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/api';
import './SidebarCard.css';

const SidebarCard = ({ item, isAd = false }) => {
    if (isAd) {
        return (
            <div className="sidebar-card ad-card">
                <span className="ad-label">ADVERTISEMENT</span>
                <div className="ad-placeholder">
                    {item.content || "Your Ad Here"}
                </div>
            </div>
        );
    }

    return (
        <Link to={`/article/${item._id}`} className="sidebar-card news-card">
            <div className="card-image">
                <img src={getImageUrl(item.image)} alt={item.title} />
            </div>
            <div className="card-content">
                <span className="card-category">{item.category?.name}</span>
                <h4 className="card-title">{item.title}</h4>
            </div>
        </Link>
    );
};

export default SidebarCard;
