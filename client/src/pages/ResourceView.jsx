
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, FileText, Download, ExternalLink, ChevronDown, Layers, FileQuestion, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { resources, getResourceUrl } from '../data/resources';
import AdBanner from '../components/AdBanner';
import InterstitialAd from '../components/InterstitialAd';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const ResourceView = () => {
    const { deptId, semId, subId } = useParams();
    const [activeTab, setActiveTab] = useState('notes');
    const [selectedFile, setSelectedFile] = useState(null);
    const [showAd, setShowAd] = useState(false);
    const [pendingFile, setPendingFile] = useState(null);

    const handleFileClick = (file) => {
        setPendingFile(file);
        setShowAd(true);
    };

    const handleAdSame = () => {
        setShowAd(false);
        if (pendingFile) {
            setSelectedFile(pendingFile);
            setPendingFile(null);
        }
    };

    // Retrieve Real Data
    let chapters = [];
    const subjectData = resources[deptId]?.[semId]?.[subId];

    if (subjectData) {
        chapters = subjectData.chapters.map(ch => ({
            id: ch.id,
            title: ch.title,
            resources: {
                // Map all items to 'notes' tab for now as they are mixed files
                notes: ch.items.map(item => ({
                    title: item.title,
                    size: item.type.toUpperCase(),
                    url: getResourceUrl(subId, item.url),
                    isExternal: false
                })),
                flashcards: [],
                papers: []
            }
        }));
    } else {
        // Fallback Dummy Data
        chapters = [
            {
                id: 'unit-1',
                title: 'Unit 1: Introduction (Demo)',
                resources: {
                    notes: [{ title: 'Unit 1 Complete Notes', size: '2.4 MB', url: '#' }],
                    flashcards: [{ title: 'Key Definitions', size: '12 Cards' }],
                    papers: []
                }
            }
        ];
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="py-12 min-h-screen relative"
        >
            {/* PDF Viewer Modal */}
            <AnimatePresence>
                {selectedFile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col"
                    >
                        {/* Toolbar */}
                        <div className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-800 text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-800 rounded-lg">
                                    <FileText className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">{selectedFile.title}</h3>
                                    <p className="text-xs text-gray-400">Read Only Mode</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Viewer */}
                        <div className="flex-grow relative bg-gray-900 flex items-center justify-center p-4">
                            <div className="w-full h-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden relative">
                                {/* Overlay to prevent right-click/save */}
                                <div
                                    className="absolute inset-0 z-10"
                                    onContextMenu={(e) => e.preventDefault()}
                                    style={{ pointerEvents: 'none' }} // Allow scrolling but block context menu interactions if supported
                                ></div>
                                <iframe
                                    src={`${selectedFile.url}#toolbar=0&navpanes=0&scrollbar=0`}
                                    className="w-full h-full border-0 block"
                                    title="PDF Viewer"
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container-custom max-w-5xl">
                <div className="mb-8">
                    <Link to={`/departments/${deptId}/semesters/${semId}`} className="inline-flex items-center text-text-secondary hover:text-text-main mb-6 font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Subjects
                    </Link>
                    <h1 className="text-3xl font-bold text-text-main capitalize mb-2">{subjectData ? subjectData.name : subId?.replace('-', ' ')}</h1>
                    <p className="text-text-secondary">Study materials • {chapters.length} Sections</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Tabs */}
                    {/* Sidebar / Tabs - Hidden on mobile if needed, or stacked */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm sticky top-24 z-10">
                            <TabButton id="notes" label="Files" icon={FileText} active={activeTab} set={setActiveTab} />
                            <TabButton id="flashcards" label="Flashcards" icon={Layers} active={activeTab} set={setActiveTab} />
                            <TabButton id="papers" label="Papers" icon={FileQuestion} active={activeTab} set={setActiveTab} />
                        </div>
                        <div className="hidden md:block">
                            <AdBanner variant="rectangle" className="mt-6 sticky top-96" />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {chapters.map((chapter) => (
                                    <div key={chapter.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                            <h3 className="font-semibold text-text-main">{chapter.title}</h3>
                                            <span className="text-xs font-mono text-text-tertiary uppercase">Available</span>
                                        </div>
                                        <div className="p-2">
                                            {chapter.resources[activeTab]?.length > 0 ? (
                                                chapter.resources[activeTab].map((res, i) => (
                                                    <div
                                                        key={i}
                                                        onClick={() => handleFileClick(res)}
                                                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                                                                <FileText className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-text-main group-hover:text-black transition-colors">{res.title}</div>
                                                                <div className="text-xs text-text-tertiary">{res.size}</div>
                                                            </div>
                                                        </div>
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-black">
                                                            <ExternalLink className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-8 text-center">
                                                    <div className="inline-block p-3 rounded-full bg-gray-50 text-gray-400 mb-2">
                                                        <Layers className="w-6 h-6" />
                                                    </div>
                                                    <p className="text-text-tertiary text-sm">No materials available for this section.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {chapters.length === 0 && (
                                    <div className="p-12 text-center border border-dashed border-gray-300 rounded-xl">
                                        <p className="text-text-secondary">No files uploaded yet.</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            {/* Interstitial Ad Layer */}
            {showAd && <InterstitialAd onComplete={handleAdSame} />}
        </motion.div>
    );
};

const TabButton = ({ id, label, icon: Icon, active, set }) => (
    <button
        onClick={() => set(id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${active === id
            ? 'bg-black text-white shadow-md shadow-black/20'
            : 'text-text-secondary hover:bg-gray-50 hover:text-text-main'
            }`}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
);

export default ResourceView;
