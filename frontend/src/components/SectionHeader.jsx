import React from 'react';
import { Link } from 'react-router-dom';
import './SectionHeader.css';

const SectionHeader = ({ title, link, linkText }) => {
    return (
        <div className="section-header">
            <h2>{title}</h2>
            {link && (
                <Link to={link} className="section-header-link">
                    {linkText || 'View All'} <span>&rarr;</span>
                </Link>
            )}
        </div>
    );
};

export default SectionHeader;
