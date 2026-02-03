
import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
    return (
        <div className="bg-white min-h-screen pt-20 pb-20">
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-black mb-2">Terms of Service</h1>
                    <p className="text-text-secondary mb-12">Last Updated: January 2026</p>

                    <div className="prose prose-lg max-w-none text-text-secondary">
                        <h3>1. Agreement to Terms</h3>
                        <p>
                            By accessing our website at Notes-wind, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>

                        <h3>2. Use License</h3>
                        <p>
                            Permission is granted to temporarily view the materials (information or software) on Notes-wind's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul>
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                            <li>attempt to decompile or reverse engineer any software contained on Notes-wind's website;</li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ul>

                        <h3>3. Disclaimer</h3>
                        <p>
                            The materials on Notes-wind's website are provided on an 'as is' basis. Notes-wind makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>

                        <h3>4. Limitations</h3>
                        <p>
                            In no event shall Notes-wind or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Notes-wind's website.
                        </p>

                        <h3>5. Content</h3>
                        <p>
                            We do not own the academic materials hosted. They are aggregated from public sources or student contributions for educational purposes.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
