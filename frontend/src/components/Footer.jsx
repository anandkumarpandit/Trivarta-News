import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-section brand-section">
                    <h3 className="footer-logo">TrivartaNews<span className="dot">.</span></h3>
                    <p className="footer-desc">
                        Your trusted portal for world-class journalism, providing the most accurate and up-to-the-minute news across the globe.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-icon"><FaFacebookF /></a>
                        <a href="#" className="social-icon"><FaTwitter /></a>
                        <a href="#" className="social-icon"><FaInstagram /></a>
                        <a href="#" className="social-icon"><FaLinkedinIn /></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Categories</h4>
                    <ul>
                        <li><a href="/category/World">World News</a></li>
                        <li><a href="/category/Technology">Technology</a></li>
                        <li><a href="/category/Business">Business</a></li>
                        <li><a href="/category/Politics">Politics</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                    </ul>
                </div>

                <div className="footer-section newsletter-section">
                    <h4>Newsletter</h4>
                    <p>Subscribe to get the latest updates delivered specifically to your inbox.</p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Email Address" required />
                        <button type="submit" className="newsletter-btn">
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container bottom-content">
                    <p>&copy; {new Date().getFullYear()} TrivartaNews. Built for Excellence.</p>
                    <div className="bottom-links">
                        <span>All Rights Reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
