
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

import AdBanner from '../components/AdBanner';

const SemesterSelect = () => {
    const { deptId } = useParams();
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="py-12 min-h-screen"
        >
            <div className="container-custom">
                <AdBanner variant="leaderboard" className="mb-8" />
                <Link to="/departments" className="inline-flex items-center text-text-secondary hover:text-text-main mb-6 font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Departments
                </Link>

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-text-main">Select Semester</h1>
                    <p className="text-text-secondary mt-1 capitalize">{deptId?.replace('-', ' ')}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                    {semesters.map((sem, idx) => (
                        <Link to={`/departments/${deptId}/semesters/${sem}`} key={sem}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white rounded-2xl border border-gray-200 aspect-[5/4] flex flex-col items-center justify-center transition-all cursor-pointer group"
                            >
                                <span className="text-5xl font-bold text-gray-200 group-hover:text-primary transition-colors duration-300">
                                    0{sem}
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-text-tertiary mt-3 group-hover:text-text-main transition-colors">Semester</span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SemesterSelect;
