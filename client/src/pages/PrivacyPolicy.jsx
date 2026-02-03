
import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    return (
        <div className="bg-white min-h-screen pt-20 pb-20">
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-black mb-2">Privacy Policy</h1>
                    <p className="text-text-secondary mb-12">Last Updated: January 2026</p>

                    <div className="prose prose-lg max-w-none text-text-secondary">
                        <p>
                            At Notes-wind ("we", "us", "our"), accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Notes-wind and how we use it.
                        </p>

                        <h3>1. Information We Collect</h3>
                        <p>
                            We collect minimal information to provide our services. This includes:
                        </p>
                        <ul>
                            <li><strong>Log Files:</strong> Standard usage data including IP addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. This is not linked to any information that is personally identifiable.</li>
                            <li><strong>Cookies:</strong> We use cookies to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</li>
                        </ul>

                        <h3>2. Advertising Partners Privacy Policies</h3>
                        <p>
                            Notes-wind uses third-party advertising partners (such as Google AdSense). These third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Notes-wind, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                        </p>
                        <p>
                            Note that Notes-wind has no access to or control over these cookies that are used by third-party advertisers.
                        </p>

                        <h3>3. Children's Information</h3>
                        <p>
                            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Notes-wind does not knowingly collect any Personal Identifiable Information from children under the age of 13.
                        </p>

                        <h3>4. Academic Integrity</h3>
                        <p>
                            The materials provided on this platform are for educational reference only. User activity may be monitored to prevent abuse and ensure fair usage of the platform resources.
                        </p>

                        <h3>5. Contact Us</h3>
                        <p>
                            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
