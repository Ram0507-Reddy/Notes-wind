
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import AdBanner from '../components/AdBanner';

const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

const SubjectSelect = () => {
    const { deptId, semId } = useParams();

    // Default Dummy Data
    let subjects = [
        { id: 'maths-2', name: 'Applied Mathematics II', code: '203105201', credits: 4, type: 'Core' },
        { id: 'dsa', name: 'Data Structures & Algorithms', code: '203105202', credits: 4, type: 'Core' },
        { id: 'os', name: 'Operating Systems', code: '203105203', credits: 3, type: 'Core' },
        { id: 'coa', name: 'Computer Organization', code: '203105204', credits: 3, type: 'Elective' },
    ];

    // Real Data for Cyber Security Sem 1
    if (deptId === 'cyber-security' && semId === '1') {
        subjects = [
            { id: 'calculus', name: 'Calculus', code: 'MAT101', credits: 4, type: 'Core' },
            { id: 'eee', name: 'Basic Electrical (EEE)', code: 'EEE101', credits: 3, type: 'Core' },
            { id: 'fcs', name: 'Fundamentals of CS (FCS)', code: 'CSE101', credits: 4, type: 'Core' },
            { id: 'pps', name: 'Programming (PPS)', code: 'CSE102', credits: 4, type: 'Lab' },
            { id: 'web-designing', name: 'Web Designing', code: 'CSE103', credits: 2, type: 'Elective' }
        ];
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="py-12 min-h-screen"
        >
            <div className="container-custom max-w-5xl">
                <AdBanner variant="leaderboard" className="mb-8" />
                <Link to={`/departments/${deptId}`} className="inline-flex items-center text-text-secondary hover:text-text-main mb-8 font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Semesters
                </Link>

                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-text-main mb-2">Curriculum</h1>
                        <p className="text-text-secondary text-lg">Semester {semId} • <span className="capitalize">{deptId?.replace('-', ' ')}</span></p>
                    </div>
                    <div className="hidden sm:block text-right">
                        <span className="bg-bg-subtle text-text-secondary px-3 py-1 rounded-full text-sm font-semibold border border-border-default">{subjects.length} Courses</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {subjects.map((sub, idx) => (
                        <React.Fragment key={sub.id}>
                            <Link to={`/departments/${deptId}/semesters/${semId}/subjects/${sub.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-black hover:shadow-lg hover:shadow-black/5 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-text-tertiary group-hover:bg-black group-hover:text-white transition-all duration-300">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-text-main group-hover:text-black transition-colors">{sub.name}</h3>
                                            <div className="flex items-center gap-3 text-sm text-text-secondary mt-1 font-mono">
                                                <span>{sub.code}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm text-text-secondary sm:mr-4 pl-16 sm:pl-0">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{sub.credits} Credits</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                                    </div>
                                </motion.div>
                            </Link>
                            {/* Inject Ad after EVERY item for high density */}
                            <AdBanner variant="leaderboard" className="my-4" />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SubjectSelect;
