import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';

const TermsOfService = () => {
    const pageTitle = "Terms of Service | Pure Air California";
    const pageDescription = "Terms of Service for Pure Air California. Please read these terms carefully before using our website or services.";
    const pageUrl = `${seoConfig.siteUrl}/terms-of-service`;

    return (
        <HelmetProvider>
            <div className="min-h-screen flex flex-col">
                <Helmet>
                    <title>{pageTitle}</title>
                    <meta name="description" content={pageDescription} />
                    <meta name="robots" content="noindex, follow" />
                    <link rel="canonical" href={pageUrl} />
                    <meta property="og:title" content={pageTitle} />
                    <meta property="og:description" content={pageDescription} />
                    <meta property="og:url" content={pageUrl} />
                </Helmet>
                <SEOProvider>
                    <SchemaMarkup schema={{
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Terms of Service",
                        "description": pageDescription,
                        "url": pageUrl
                    }} />
                </SEOProvider>

                <NavBar />

                <main className="flex-grow pt-32 pb-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                        <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <div className="prose prose-lg max-w-none">
                            <h3>1. Acceptance of Terms</h3>
                            <p>
                                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                            </p>

                            <h3>2. Service Description</h3>
                            <p>
                                Pure Air California provides air duct cleaning, dryer vent cleaning, and related HVAC maintenance services in the Los Angeles area. Quotes provided online are estimates and may be subject to change upon on-site inspection.
                            </p>

                            <h3>3. Scheduling and Cancellations</h3>
                            <p>
                                We appreciate 24-hour notice for any cancellations or rescheduling of appointments. We reserve the right to charge a cancellation fee for appointments missed or cancelled with less than 24 hours notice.
                            </p>

                            <h3>4. Payment</h3>
                            <p>
                                Payment is due upon completion of services unless prior arrangements have been made. We accept major credit cards, cash, and checks.
                            </p>

                            <h3>5. Intellectual Property</h3>
                            <p>
                                The Site and its original content, features, and functionality are owned by Pure Air California and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                            </p>

                            <h3>6. Limitation of Liability</h3>
                            <p>
                                In no event shall Pure Air California, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                            </p>

                            <h3>7. Governing Law</h3>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.
                            </p>

                            <h3>8. Changes to This Agreement</h3>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms by posting the updated terms on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
                            </p>

                            <h3>9. Contact Us</h3>
                            <p>
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <p>
                                <strong>Pure Air California</strong><br />
                                1550 N Poinsettia Pl<br />
                                Los Angeles, CA 90046<br />
                                Email: lou@pureaircalifornia.com<br />
                                Phone: (213) 792-4145
                            </p>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </HelmetProvider>
    );
};

export default TermsOfService;
