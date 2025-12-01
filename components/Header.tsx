import React, { useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { BUSINESS_INFO } from '../constants';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About & Safety', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 shadow-xl border-b-4 border-amber-900/50">
      {/* Top Bar for Desktop */}
      <div className="hidden md:flex justify-between items-center bg-stone-950 px-6 py-1 text-xs text-stone-400 font-sans tracking-wider">
         <div className="flex gap-4">
             <span className="flex items-center gap-1"><MapPin size={12}/> {BUSINESS_INFO.address}, {BUSINESS_INFO.city}, {BUSINESS_INFO.state}</span>
             <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-1 hover:text-amber-500"><Phone size={12}/> {BUSINESS_INFO.phone}</a>
         </div>
         <span className="uppercase text-amber-700 font-bold">Responsible Ownership Starts Here</span>
      </div>

      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo / Brand */}
          <Link to="/" className="flex flex-col items-start group">
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tighter text-amber-50 group-hover:text-amber-500 transition-colors">
              PEGGS <span className="text-amber-600">GUN SHOP</span>
            </h1>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-400 group-hover:text-stone-200">
              Walkertown, NC
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans font-medium uppercase tracking-wide text-sm transition-colors py-2 border-b-2 ${
                  isActive(link.path) 
                    ? 'text-amber-500 border-amber-500' 
                    : 'text-stone-300 border-transparent hover:text-white hover:border-stone-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-stone-100 hover:text-amber-500 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-stone-800 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-center font-sans font-bold uppercase tracking-widest py-3 rounded ${
                    isActive(link.path)
                      ? 'bg-amber-900/30 text-amber-500'
                      : 'text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
               <div className="pt-4 flex flex-col items-center gap-2 text-sm text-stone-500 border-t border-stone-800">
                 <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-2 py-2 w-full justify-center bg-stone-800 rounded">
                    <Phone size={14} /> Call Now
                 </a>
               </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};