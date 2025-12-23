import React from 'react';
import './Privacy.css'; // Reusing common legal styles

const Terms = () => {
    return (
        <div className="legal-page terms-page container">
            <header className="legal-header">
                <h1>Terms of <span className="accent">Service</span></h1>
                <p className="last-updated">Last Updated: December 20, 2025</p>
            </header>

            <div className="legal-content">
                <section>
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using TrivartaNews, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
                </section>

                <section>
                    <h2>2. Use of Content</h2>
                    <p>All content on TrivartaNews is for informational purposes only. You may not reproduce, distribute, or modify any content without our prior written consent.</p>
                </section>

                <section>
                    <h2>3. User Conduct</h2>
                    <p>You agree to use our platform in a lawful manner. You are prohibited from posting harmful, offensive, or illegal content, or attempting to interfere with the site's functionality.</p>
                </section>

                <section>
                    <h2>4. Account Responsibility</h2>
                    <p>If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p>
                </section>

                <section>
                    <h2>5. Limitation of Liability</h2>
                    <p>TrivartaNews is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform or reliance on its content.</p>
                </section>

                <section>
                    <h2>6. Subject to Change</h2>
                    <p>We reserve the right to modify these terms at any time. Your continued use of the platform after changes are posted constitutes acceptance of the new terms.</p>
                </section>

                <section>
                    <h2>7. Contact</h2>
                    <p>Questions about our Terms of Service? Contact us at legal@trivartanews.com.</p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
