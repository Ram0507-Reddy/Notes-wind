
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <span className="font-display font-bold text-xl text-text-main mb-4 block">Notes-wind</span>
                        <p className="text-text-muted max-w-sm">
                            The centralized academic platform for Parul University.
                            Built for speed, reliability, and student success.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Explore</h4>
                        <ul className="space-y-2 text-text-muted">
                            <li><Link to="/departments" className="hover:text-primary transition-colors">Departments</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">Team</Link></li>
                            <li><Link to="#" className="hover:text-primary transition-colors">Roadmap</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <ul className="space-y-2 text-text-muted">
                            <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-light">
                    <p>© 2026 Notes-wind Systems.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
