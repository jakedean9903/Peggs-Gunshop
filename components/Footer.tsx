import React from 'react';
import { BUSINESS_INFO } from '../constants';
import { ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 border-t-8 border-amber-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand & Address */}
          <div>
            <h3 className="text-xl font-serif text-white mb-4">Peggs Gun Shop</h3>
            <address className="not-italic font-sans text-sm leading-relaxed">
              {BUSINESS_INFO.address}<br />
              {BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zip}<br />
              <br />
              <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-amber-500 transition-colors block">{BUSINESS_INFO.phone}</a>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-amber-500 transition-colors block">{BUSINESS_INFO.email}</a>
            </address>
          </div>

          {/* Legal / Warning */}
          <div className="flex flex-col items-center justify-start">
            <ShieldAlert className="text-amber-700 mb-2" size={32} />
            <h4 className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-2">Legal Compliance</h4>
            <p className="text-xs max-w-xs text-center">
              All firearm sales are subject to federal and state laws. Background checks are mandatory. We reserve the right to refuse service to anyone.
            </p>
            <div className="mt-4 flex gap-4 text-xs underline">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>

          {/* Navigation / Links */}
          <div className="flex flex-col gap-2 md:items-end">
            <h4 className="font-serif text-white mb-2">Navigation</h4>
            <a href="#/" className="hover:text-amber-500 text-sm">Home</a>
            <a href="#/gallery" className="hover:text-amber-500 text-sm">Inventory Gallery</a>
            <a href="#/about" className="hover:text-amber-500 text-sm">About & Safety</a>
            <a href="#/contact" className="hover:text-amber-500 text-sm">Contact Us</a>
            <span className="text-[10px] mt-4 opacity-50">&copy; {new Date().getFullYear()} Peggs Gun Shop. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};