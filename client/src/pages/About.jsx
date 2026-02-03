
import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white">
            <div className="relative py-20 bg-gray-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold text-text-main mb-4">Notes-wind: Built for Students</h1>
                    <p className="max-w-2xl mx-auto text-lg text-text-secondary">
                        Currently serving 1000+ students at Parul University. Our mission is to democratize access to high-quality academic resources.
                    </p>
                </div>
            </div>

            <div className="py-20 container-custom">
                <div className="flex justify-center">
                    <TeamMember name="Shriram Venkatram Reddy" role="Creator, Tech Lead & Designer" />
                </div>
            </div>
        </div>
    );
};

const TeamMember = ({ name, role }) => (
    <div className="text-center p-8 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
        <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6"></div>
        <h3 className="text-lg font-bold text-text-main">{name}</h3>
        <p className="text-primary font-medium mb-4">{role}</p>
        <div className="flex justify-center gap-4 text-gray-400">
            <Github className="w-5 h-5 hover:text-gray-900 cursor-pointer" />
            <Linkedin className="w-5 h-5 hover:text-blue-700 cursor-pointer" />
        </div>
    </div>
);

export default About;
