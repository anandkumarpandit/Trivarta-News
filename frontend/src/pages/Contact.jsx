import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="container">
                    <h1>Get in <span className="accent">Touch</span></h1>
                    <p className="hero-subtitle">Have a scoop, a question, or some feedback? We'd love to hear from you.</p>
                </div>
            </section>

            <section className="contact-content container">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h2>Contact Information</h2>
                        <p className="info-intro">Fill out the form or reach out to us using the details below.</p>

                        <div className="info-cards">
                            <div className="info-card">
                                <div className="icon-wrapper"><FaPhone /></div>
                                <div className="card-text">
                                    <h4>Call Us</h4>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="icon-wrapper"><FaEnvelope /></div>
                                <div className="card-text">
                                    <h4>Email Us</h4>
                                    <p>contact@trivartanews.com</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="icon-wrapper"><FaMapMarkerAlt /></div>
                                <div className="card-text">
                                    <h4>Visit Us</h4>
                                    <p>123 News Plaza, Manhattan, NY 10001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your message here..."
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn">
                                Send Message <FaPaperPlane />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
