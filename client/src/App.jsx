
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy Load Pages
const Landing = React.lazy(() => import('./pages/Landing'));
const DepartmentSelect = React.lazy(() => import('./pages/DepartmentSelect'));
const SemesterSelect = React.lazy(() => import('./pages/SemesterSelect'));
const SubjectSelect = React.lazy(() => import('./pages/SubjectSelect'));
const ResourceView = React.lazy(() => import('./pages/ResourceView'));
const About = React.lazy(() => import('./pages/About'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/departments" element={<DepartmentSelect />} />
        <Route path="/departments/:deptId" element={<SemesterSelect />} />
        <Route path="/departments/:deptId/semesters/:semId" element={<SubjectSelect />} />
        <Route path="/departments/:deptId/semesters/:semId/subjects/:subId" element={<ResourceView />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  React.useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (['I', 'J', 'C'].includes(e.key))) ||
        (e.ctrlKey && ['u', 's', 'p'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen select-none oncopy='return false' oncut='return false' onpaste='return false'">
        <Navbar />
        <main className="flex-grow">
          <React.Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-indigo-600 font-medium">Loading content...</p>
              </div>
            </div>
          }>
            <AnimatedRoutes />
          </React.Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
