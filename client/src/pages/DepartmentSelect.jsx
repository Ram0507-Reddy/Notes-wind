
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Code, Database, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AdBanner from '../components/AdBanner';

const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } }
};

const DepartmentSelect = () => {
    const departments = [
        { id: 'cyber-security', name: 'Cyber Security', icon: Shield, count: '8 Semesters', bg: 'bg-indigo-50', text: 'text-indigo-600' },
        { id: 'ai-ml', name: 'AI & Machine Learning', icon: Cpu, count: '8 Semesters', bg: 'bg-purple-50', text: 'text-purple-600' },
        { id: 'computer-science', name: 'Computer Science', icon: Code, count: '6 Semesters', bg: 'bg-blue-50', text: 'text-blue-600' },
        { id: 'data-science', name: 'Data Science', icon: Database, count: '4 Semesters', bg: 'bg-teal-50', text: 'text-teal-600' },
    ];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="py-16 min-h-screen"
        >
            <div className="container-custom">
                <AdBanner variant="leaderboard" className="mb-12" />

                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-text-main tracking-tight">Select Department</h1>
                    <p className="mt-2 text-text-secondary text-lg">Choose your engineering stream.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.map((dept, idx) => (
                        <React.Fragment key={dept.id}>
                            <Link to={`/departments/${dept.id}`} className="group">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col justify-between"
                                >
                                    <div>
                                        <div className={`w-14 h-14 rounded-2xl ${dept.bg} ${dept.text} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <dept.icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-text-main mb-2 tracking-tight group-hover:text-primary transition-colors">{dept.name}</h3>
                                        <p className="text-sm font-medium text-text-secondary mb-8">{dept.count}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                                        <span className="text-sm font-semibold text-text-main">View Curriculum</span>
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                            {/* Inject Ad after 2nd (index 1) */}
                            {(idx + 1) % 2 === 0 && (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-4">
                                    <AdBanner variant="leaderboard" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default DepartmentSelect;
