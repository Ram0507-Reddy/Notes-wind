
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';


const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

const SubjectSelect = () => {
    const { deptId, semId } = useParams();

    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || '';
                const res = await fetch(`${API_URL}/api/departments/${deptId}`);
                if (!res.ok) throw new Error('Failed to fetch structure');

                const data = await res.json();
                const semesterData = data.semesters.find(s => s.number.toString() === semId);

                if (semesterData) {
                    setSubjects(semesterData.subjects.map(sub => ({
                        id: sub.code, // Use code as ID for routing if cleaner, or create a slug
                        name: sub.name,
                        code: sub.code,
                        credits: 3, // Default credit if not in DB
                        type: 'Core'
                    })));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [deptId, semId]);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="py-12 min-h-screen"
        >
            <div className="container-custom max-w-5xl">

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
                            <Link to={`/departments/${deptId}/semesters/${semId}/subjects/${encodeURIComponent(sub.name)}`}>
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

                        </React.Fragment>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SubjectSelect;
