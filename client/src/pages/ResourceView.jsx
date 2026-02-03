
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, FileText, Download, ExternalLink, ChevronDown, Layers, FileQuestion, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const ResourceView = () => {
    const { deptId, semId, subId } = useParams();
    const [activeTab, setActiveTab] = useState('notes');
    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

    // PDF Blob Fetching (Obfuscation)
    useEffect(() => {
        let activeUrl = null;

        if (selectedFile?.url) {
            const fetchPdf = async () => {
                try {
                    setLoading(true);
                    const res = await fetch(selectedFile.url);
                    const blob = await res.blob();
                    activeUrl = URL.createObjectURL(blob);
                    setPdfBlobUrl(activeUrl);
                } catch (err) {
                    console.error("Failed to load PDF securely:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchPdf();
        } else {
            setPdfBlobUrl(null);
        }

        return () => {
            if (activeUrl) URL.revokeObjectURL(activeUrl);
        };
    }, [selectedFile]);

    const handleFileClick = (file) => {
        setSelectedFile(file);
    };

    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    // Anti-Piracy: Block Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Block Ctrl+S, Ctrl+P, Ctrl+C, Ctrl+Shift+I (DevTools)
            if (
                (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'c' || e.key === 'u')) ||
                (e.ctrlKey && e.shiftKey && e.key === 'i') ||
                e.key === 'F12'
            ) {
                e.preventDefault();
                console.warn('Action blocked for security.');
                return false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        // Also disable context menu globally
        const handleContextMenu = (e) => e.preventDefault();
        window.addEventListener('contextmenu', handleContextMenu);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || '';
                // subId is the subject name (URL encoded), so we decode it
                const subjectName = decodeURIComponent(subId);

                const res = await fetch(`${API_URL}/api/resources?departmentId=${deptId}&semesterId=${semId}&subjectId=${encodeURIComponent(subjectName)}`);
                if (!res.ok) throw new Error('Failed to fetch resources');

                const data = await res.json();

                // Group by chapterId
                const grouped = {};
                data.forEach(item => {
                    const chId = item.chapterId || 'General';
                    if (!grouped[chId]) {
                        grouped[chId] = {
                            id: chId,
                            title: chId === 'General' ? 'General Resources' : chId,
                            resources: { notes: [], flashcards: [], papers: [] }
                        };
                    }

                    // Add item to appropriate category (defaulting to notes for PDFs)
                    // You can refine this logic based on item.type
                    const type = item.type === 'pdf' ? 'notes' : 'notes';
                    grouped[chId].resources[type].push({
                        title: item.title,
                        size: 'PDF', // Placeholder size or from DB
                        url: item.url.startsWith('http') ? item.url : `${API_URL}${item.url}`,
                        isExternal: false
                    });
                });

                setChapters(Object.values(grouped));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [deptId, semId, subId]);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="min-h-screen pt-24 pb-12 relative"
        >
            {/* PDF Viewer Modal */}
            <AnimatePresence>
                {selectedFile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col"
                        // Disable context menu on the entire modal wrapper
                        onContextMenu={(e) => {
                            e.preventDefault();
                            return false;
                        }}
                    >
                        {/* Toolbar */}
                        <div className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-800 text-white select-none">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-800 rounded-lg">
                                    <FileText className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">{selectedFile.title}</h3>
                                    <p className="text-xs text-gray-400">Protected View • Read Only</p>
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
                        <div className="flex-grow relative bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
                            <div className="w-full h-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden relative">

                                {/* 1. Protection Note */}
                                {/* We removed the full overlay because it blocks scrolling on cross-origin iframes */}
                                {/* Keyboard shortcuts and #toolbar=0 provide the primary security now */}

                                {/* 2. Iframe with pointer-events-none (Extra security if overlay fails) */}
                                {/* Note: pointer-events-none disables scrolling via mouse drag. Mouse wheel usually still works in some browsers, but scrollbar is needed. */}
                                {/* Compromise: We keep pointer-events-auto but rely on the z-50 overlay above. */}

                                {pdfBlobUrl ? (
                                    <iframe
                                        src={`${pdfBlobUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                        className="w-full h-full border-0 block"
                                        title="PDF Viewer"
                                        style={{ pointerEvents: 'auto' }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-white">
                                        Loading secure document...
                                    </div>
                                )}

                                {/* 
                                   Explanation: 
                                   A full 'z-50' overlay blocks ALL mouse events (clicking, scrolling, selecting). 
                                   This effectively solves the "Right Click" issue but makes the PDF unscrollable via mouse drag.
                                   Users must use the scrollbar (if we leave a gap) or keyboard/mouse-wheel.
                                   
                                   Refinement: We create a "Hole" for the scrollbar? 
                                   Native PDF viewer scrollbars are inside the iframe. We can't overlay "everything but the scrollbar" easily.
                                   
                                   Better specific approach for "Read Only":
                                   We accept that "Right Click" is blocked by the overlay.
                                   We hope Mouse Wheel events propagate (they often don't through a blockage).
                                 */}
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
                    <h1 className="text-3xl font-bold text-text-main capitalize mb-2">{decodeURIComponent(subId)}</h1>
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
