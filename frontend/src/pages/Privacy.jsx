import React from 'react';
import './Privacy.css';

const Privacy = () => {
    return (
        <div className="legal-page privacy-page container">
            <header className="legal-header">
                <h1>Privacy <span className="accent">Policy</span></h1>
                <p className="last-updated">Last Updated: December 20, 2025</p>
            </header>

            <div className="legal-content">
                <section>
                    <h2>1. Information We Collect</h2>
                    <p>We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, and any other information you choose to provide.</p>
                </section>

                <section>
                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect the security of our platform. We do not sell your personal information to third parties.</p>
                </section>

                <section>
                    <h2>3. Cookies and Tracking</h2>
                    <p>TrivartaNews uses cookies and similar technologies to enhance your experience and analyze platform traffic. You can manage your cookie preferences through your browser settings.</p>
                </section>

                <section>
                    <h2>4. Data Security</h2>
                    <p>We take reasonable measures to protect your personal information from unauthorized access, loss, or disclosure. However, no method of transmission over the internet is 100% secure.</p>
                </section>

                <section>
                    <h2>5. Your Rights</h2>
                    <p>Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete your information. Please contact us if you wish to exercise these rights.</p>
                </section>

                <section>
                    <h2>6. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please reach out to us at privacy@trivartanews.com.</p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
