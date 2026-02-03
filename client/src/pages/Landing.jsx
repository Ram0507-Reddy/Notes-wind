
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Layers, ShieldCheck, Zap, Terminal, Cpu, Database, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import AdBanner from '../components/AdBanner';

const hoverVariant = {
  hover: { y: -4, transition: { duration: 0.2 } }
};

const Landing = () => {
  return (
    <div className="bg-white min-h-screen pt-16">
      {/* Hero Section */}
      <section className="border-b border-border-default">
        <div className="container-custom py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-3 py-1 mb-6 border border-black/10 rounded-full text-xs font-mono text-text-secondary bg-bg-subtle">
                v2.1.0 • Stable Build
              </div>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-black mb-6 md:mb-8 leading-[1.1]">
                The index of <br />
                <span className="text-text-secondary">engineering</span>.<br />
                <span className="text-xl md:text-5xl block mt-4 font-normal text-text-tertiary">Access 500+ verified resources.</span>
              </h1>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/departments" className="btn-primary h-12 text-base">
                  Browse Library
                </Link>
                <Link to="/about" className="btn-secondary h-12 text-base bg-transparent">
                  View Architecture
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm font-medium text-text-secondary">
                <div>
                  <span className="block text-xl font-bold text-black">8</span>
                  Semesters
                </div>
                <div className="w-px h-8 bg-border-default"></div>
                <div>
                  <span className="block text-xl font-bold text-black">42</span>
                  Subjects
                </div>
                <div className="w-px h-8 bg-border-default"></div>
                <div>
                  <span className="block text-xl font-bold text-black">1.2k</span>
                  Daily Hits
                </div>
              </div>
            </motion.div>

            {/* Terminal / Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="bg-bg-subtle border border-border-default rounded-xl overflow-hidden font-mono text-xs shadow-sm">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border-default bg-white">
                  <Terminal className="w-4 h-4 text-text-secondary" />
                  <span className="text-text-secondary">server-logs — -bash</span>
                </div>
                <div className="p-6 space-y-3 text-text-secondary">
                  <div className="flex gap-4">
                    <span className="text-text-tertiary">09:41:02</span>
                    <span><span className="text-green-600">GET</span> /api/departments/cse/sem-3</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-text-tertiary">09:41:05</span>
                    <span><span className="text-blue-600">UPDATE</span> Resource: "OS_Unit4.pdf" verified</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-text-tertiary">09:41:12</span>
                    <span><span className="text-green-600">GET</span> /api/cache/hit (2ms)</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-text-tertiary">09:42:00</span>
                    <span><span className="text-text-main">System Status: </span><span className="text-green-600">Operational</span></span>
                  </div>
                  <div className="flex gap-4 mt-4 pt-4 border-t border-border-default/50 animate-pulse">
                    <span className="text-black">_</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Department Quick List */}
      <section className="py-24 border-b border-border-default">
        <div className="container-custom">
          <AdBanner variant="leaderboard" className="mb-12" />

          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-2">Core Streams</h2>
              <p className="text-text-secondary">Select your department to access curated content.</p>
            </div>
            <Link to="/departments" className="text-sm font-bold border-b border-black pb-0.5 hover:opacity-50 transition-opacity">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <DeptCard icon={ShieldCheck} name="Cyber Security" count="8 Semesters" />
            <DeptCard icon={Cpu} name="AI & ML" count="8 Semesters" />
            <DeptCard icon={Code} name="Computer Science" count="6 Semesters" />
            <DeptCard icon={Database} name="Data Science" count="4 Semesters" />
          </div>
        </div>
      </section>

      {/* Grid Specs Section */}
      <section className="py-24 bg-bg-subtle">
        <div className="container-custom">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Engineered for Engineering.</h2>
            <p className="text-text-secondary text-lg">
              We replaced clunky university portals with a high-performance stack.
              Finding a PDF used to take 5 minutes. Now it takes 5 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-default border border-border-default rounded-xl overflow-hidden shadow-sm">
            <FeatureBox
              icon={Layers}
              title="Structured Schema"
              desc="Hierarchical data model (Dept > Sem > Sub) mirroring the actual curriculum structure."
            />
            <FeatureBox
              icon={Zap}
              title="Edge Cached"
              desc="Static site generation ensures content is delivered from the nearest CDN node."
            />
            <FeatureBox
              icon={ShieldCheck}
              title="Cryptographic Verify"
              desc="SHA-256 integrity checks on all uploaded PDF resources to prevent tampering."
            />
          </div>
        </div>
      </section>

      {/* Footer Tease */}
      <section className="py-24">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-8 bg-black text-white p-12 rounded-2xl">
          <div>
            <h3 className="text-2xl font-bold mb-2">Open Source Initiative</h3>
            <p className="text-gray-400">Contribute to the roadmap on GitHub.</p>
          </div>
          <Link to="/departments" className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
            Start Browinsg
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureBox = ({ icon: Icon, title, desc }) => (
  <motion.div
    whileHover="hover"
    variants={hoverVariant}
    className="bg-white p-8 md:p-12 flex flex-col justify-between h-64"
  >
    <div className="w-10 h-10 bg-bg-subtle rounded-lg flex items-center justify-center text-black mb-6 border border-border-default">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h3 className="text-lg font-bold text-black mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const DeptCard = ({ icon: Icon, name, count }) => (
  <Link to="/departments" className="group p-6 border border-border-default rounded-xl hover:border-black transition-colors bg-white">
    <div className="mb-4 text-text-secondary group-hover:text-black transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <div className="font-bold text-lg mb-1">{name}</div>
    <div className="text-xs text-text-secondary font-mono">{count}</div>
  </Link>
);

export default Landing;
