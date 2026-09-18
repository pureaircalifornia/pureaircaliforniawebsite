import PageHero from '@/components/PageHero';
import React from 'react';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import { business } from '@/config/business';

const TermsOfService = () => {
    const pageTitle = "Terms of Service | Pure Air California";
    const pageDescription = "Terms of Service for Pure Air California. Please read these terms carefully before using our website or services.";

    return (
        
            <div className="min-h-screen flex flex-col">
                <SEOProvider title={pageTitle} description={pageDescription} />

                <NavBar />

                <PageHero title="Terms of service" compact/><main className="flex-grow py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        
                        <p className="text-gray-500 mb-8">Last updated: <time dateTime="2026-09-12">September 12, 2026</time></p>

                        <div className="pac-journal-content prose prose-lg max-w-none">
                            <h2>1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                            </p>

                            <h2>2. Service Description</h2>
                            <p>
                                Pure Air California provides air duct cleaning, dryer vent cleaning, and related HVAC maintenance services in the Los Angeles area. Quotes provided online are estimates and may be subject to change upon on-site inspection.
                            </p>

                            <h2>3. Scheduling and Cancellations</h2>
                            <p>
                                We appreciate 24-hour notice for any cancellations or rescheduling of appointments. We reserve the right to charge a cancellation fee for appointments missed or cancelled with less than 24 hours notice.
                            </p>

                            <h2>4. Payment</h2>
                            <p>
                                Payment is due upon completion of services unless prior arrangements have been made. We accept major credit cards, cash, and checks.
                            </p>

                            <h2>5. Intellectual Property</h2>
                            <p>
                                The Site and its original content, features, and functionality are owned by Pure Air California and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                            </p>

                            <h2>6. Limitation of Liability</h2>
                            <p>
                                In no event shall Pure Air California, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                            </p>

                            <h2>7. Governing Law</h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.
                            </p>

                            <h2>8. Changes to This Agreement</h2>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms by posting the updated terms on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
                            </p>

                            <h2>9. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <p>
                                <strong>Pure Air California</strong><br />
                                Los Angeles, California<br />
                                Email: <a href={"mailto:" + business.email}>{business.email}</a><br />
                                Phone: <a href={business.phoneHref}>{business.phone}</a>
                            </p>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        
    );
};

export default TermsOfService;
