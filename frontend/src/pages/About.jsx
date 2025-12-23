import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <h1>Our Mission for <span className="accent">Truth</span></h1>
                    <p className="hero-subtitle">Dedicated to delivering unbiased news and impactful stories since 2025.</p>
                </div>
            </section>

            <section className="about-content container">
                <div className="about-grid">
                    <div className="about-text">
                        <h2>Who We Are</h2>
                        <p>
                            TrivartaNews is a modern news platform designed for the fast-paced digital era. We believe that information should be accessible, accurate, and prompt. Our team of dedicated journalists and technologists works around the clock to bring you the stories that matter most.
                        </p>
                        <p>
                            From local community updates to global political shifts, we cover the full spectrum of human experience with a commitment to integrity and journalistic excellence.
                        </p>
                    </div>
                    <div className="about-stats">
                        <div className="stat-card">
                            <h3>10M+</h3>
                            <p>Monthly Readers</p>
                        </div>
                        <div className="stat-card">
                            <h3>50+</h3>
                            <p>Global Reporters</p>
                        </div>
                        <div className="stat-card">
                            <h3>24/7</h3>
                            <p>Live Coverage</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-values">
                <div className="container">
                    <h2 className="section-title">Our Core Values</h2>
                    <div className="values-grid">
                        <div className="value-item">
                            <div className="value-icon">⚖️</div>
                            <h3>Objectivity</h3>
                            <p>We present facts without bias, allowing you to form your own informed opinions.</p>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">⚡</div>
                            <h3>Accuracy</h3>
                            <p>Speed is important, but accuracy is paramount. We verify every lead before publishing.</p>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">🤝</div>
                            <h3>Transparency</h3>
                            <p>We are open about our sources and correction processes, building trust with our audience.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
