import PageHero from '@/components/PageHero';
import React from 'react';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import { business } from '@/config/business';
import { OPEN_PRIVACY_EVENT } from '@/utils/privacy.mjs';

const PrivacyPolicy = () => {
    const pageTitle = "Privacy Policy | Pure Air California";
    const pageDescription = "Privacy Policy for Pure Air California. Learn how we collect, use, and protect your personal information.";

    return (
        
            <div className="min-h-screen flex flex-col">
                <SEOProvider title={pageTitle} description={pageDescription} dateModified="2026-10-20" />

                <NavBar />

                <PageHero title="Privacy policy" compact/><main className="flex-grow py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        
                        <p className="text-gray-500 mb-8">Last updated: <time dateTime="2026-10-20">October 20, 2026</time></p>

                        <div className="pac-journal-content prose prose-lg max-w-none">
                            <p>
                                At Pure Air California ("we," "our," or "us"), we respect your privacy and are committed to protecting it through our compliance with this policy.
                            </p>

                            <h2>1. Information We Collect</h2>
                            <p>
                                We may collect several types of information from and about users of our website, including information:
                            </p>
                            <ul>
                                <li>By which you may be personally identified, such as name, postal address, e-mail address, telephone number ("personal information");</li>
                                <li>About your internet connection, the equipment you use to access our Website, and usage details.</li>
                            </ul>

                            <h2>2. How We Use Your Information</h2>
                            <p>
                                We use information that we collect about you or that you provide to us, including any personal information:
                            </p>
                            <ul>
                                <li>To present our Website and its contents to you.</li>
                                <li>To provide you with information, products, or services that you request from us (such as quotes for air duct cleaning).</li>
                                <li>To fulfill any other purpose for which you provide it.</li>
                                <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
                            </ul>

                            <h2>3. Optional Measurement and Your Choices</h2>
                            <p>Website analytics and advertising measurement are separate, optional choices. Google Analytics loads only with analytics permission. With advertising measurement permission, configured Google Ads tags can connect an ad visit with an accepted enquiry. Personalized advertising remains disabled. Google’s processing is described in its <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</p>
                            <p>“Allow analytics only” permits Google Analytics cookies and visit measurement without enabling advertising measurement. “Use necessary only” declines both. “Customize choices” lets you choose each purpose separately. We do not use fingerprinting to identify visitors who decline. Our analytics reports therefore describe measured, consenting visits rather than every visitor.</p>
                            <p>With advertising measurement permission, we retain permitted campaign labels and Google ad click identifiers in this browser for up to 30 days and attach them to a service request. We do not send your name, email, telephone number or message in website measurement events. Contact details are still needed by PAC to respond to your request. An enquiry is not a completed sale.</p>
                            <p>You can decline either optional purpose and still use our forms and services. Your choices are stored in this browser. Global Privacy Control keeps both optional purposes off. Admin and tokenized feedback pages are excluded. Analytics page-view events omit query strings and URL fragments; advertising measurement accepts only permitted ad click identifiers, never arbitrary query parameters.</p>
                            <p><button type="button" className="underline text-brand-700" onClick={() => window.dispatchEvent(new Event(OPEN_PRIVACY_EVENT))}>Change your privacy choices</button>. Withdrawing consent reloads the page to unload optional analytics. You can also remove previously stored cookies through your browser settings.</p>
                            <h2>4. Service Requests and External Services</h2>
                            <p>When you send an enquiry, the contact and property details you choose to provide are sent to PAC through our customer-management service so we can respond. That service may send receipt and team notification emails. A private feedback form sends your rating and message to our team. It does not publish a Google review. Public Google reviews and external maps or social links take you to services with their own privacy practices.</p>
                            <h2>5. Disclosure of Your Information</h2>
                            <p>
                                We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                            </p>

                            <h2>6. Data Security</h2>
                            <p>
                                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.
                            </p>

                            <h2>7. Contact Information</h2>
                            <p>
                                To ask questions or comment about this privacy policy and our privacy practices, contact us at:
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

export default PrivacyPolicy;
