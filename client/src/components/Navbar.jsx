
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Library } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border-default">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center">
                            <Library className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-black">Notes-wind</span>
                    </Link>

                    {/* Desktop Nav - Centered & Clean */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/" isActive={location.pathname === '/'}>Overview</NavLink>
                        <NavLink to="/departments" isActive={location.pathname.startsWith('/departments')}>Library</NavLink>
                        <NavLink to="/about" isActive={location.pathname === '/about'}>Team</NavLink>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-text-main hover:bg-bg-subtle rounded transition-colors"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-border-default bg-white p-4">
                    <div className="flex flex-col space-y-2">
                        <MobileLink to="/" onClick={() => setIsOpen(false)}>Overview</MobileLink>
                        <MobileLink to="/departments" onClick={() => setIsOpen(false)}>Library</MobileLink>
                        <MobileLink to="/about" onClick={() => setIsOpen(false)}>Team</MobileLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

const NavLink = ({ to, children, isActive }) => (
    <Link
        to={to}
        className={`text-sm font-medium transition-colors ${isActive
            ? 'text-black'
            : 'text-text-secondary hover:text-black'
            }`}
    >
        {children}
    </Link>
);

const MobileLink = ({ to, onClick, children }) => (
    <Link
        to={to}
        onClick={onClick}
        className="block px-4 py-3 rounded-lg text-text-main hover:bg-bg-subtle font-medium border border-transparent hover:border-border-default transition-all"
    >
        {children}
    </Link>
);

export default Navbar;
