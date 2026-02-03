
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Landing from './pages/Landing';
import DepartmentSelect from './pages/DepartmentSelect';
import SemesterSelect from './pages/SemesterSelect';
import SubjectSelect from './pages/SubjectSelect';
import ResourceView from './pages/ResourceView';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

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
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
