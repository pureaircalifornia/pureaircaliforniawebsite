import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';

const PrivacyPolicy = () => {
    const pageTitle = "Privacy Policy | Pure Air California";
    const pageDescription = "Privacy Policy for Pure Air California. Learn how we collect, use, and protect your personal information.";
    const pageUrl = `${seoConfig.siteUrl}/privacy-policy`;

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
                        "name": "Privacy Policy",
                        "description": pageDescription,
                        "url": pageUrl
                    }} />
                </SEOProvider>

                <NavBar />

                <main className="flex-grow pt-32 pb-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                        <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <div className="prose prose-lg max-w-none">
                            <p>
                                At Pure Air California ("we," "our," or "us"), we respect your privacy and are committed to protecting it through our compliance with this policy.
                            </p>

                            <h3>1. Information We Collect</h3>
                            <p>
                                We may collect several types of information from and about users of our website, including information:
                            </p>
                            <ul>
                                <li>By which you may be personally identified, such as name, postal address, e-mail address, telephone number ("personal information");</li>
                                <li>About your internet connection, the equipment you use to access our Website, and usage details.</li>
                            </ul>

                            <h3>2. How We Use Your Information</h3>
                            <p>
                                We use information that we collect about you or that you provide to us, including any personal information:
                            </p>
                            <ul>
                                <li>To present our Website and its contents to you.</li>
                                <li>To provide you with information, products, or services that you request from us (such as quotes for air duct cleaning).</li>
                                <li>To fulfill any other purpose for which you provide it.</li>
                                <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
                            </ul>

                            <h3>3. Disclosure of Your Information</h3>
                            <p>
                                We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                            </p>

                            <h3>4. Data Security</h3>
                            <p>
                                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.
                            </p>

                            <h3>5. Contact Information</h3>
                            <p>
                                To ask questions or comment about this privacy policy and our privacy practices, contact us at:
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

export default PrivacyPolicy;
