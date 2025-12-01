import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export const AgeVerificationModal: React.FC = () => {
  const [verified, setVerified] = useState(false);
  const [showFail, setShowFail] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem('peggs_age_verified');
    if (isVerified === 'true') {
      setVerified(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('peggs_age_verified', 'true');
    setVerified(true);
  };

  const handleDeny = () => {
    setShowFail(true);
  };

  if (verified) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-sm p-4">
      <div className="bg-stone-50 max-w-lg w-full rounded-sm shadow-2xl border-4 border-stone-800 p-8 text-center relative overflow-hidden">
        {/* Decorative corner texture */}
        <div className="absolute top-0 left-0 w-full h-2 bg-amber-700/50"></div>
        
        <div className="mb-6 flex justify-center">
            <div className="p-4 bg-stone-200 rounded-full border-2 border-amber-700">
                <ShieldCheck className="w-12 h-12 text-stone-800" />
            </div>
        </div>

        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4 tracking-wide uppercase">
          Peggs Gun Shop
        </h2>

        {!showFail ? (
          <>
            <p className="text-stone-700 mb-6 font-sans text-lg">
              Are you 21 years of age or older?
            </p>
            <p className="text-stone-500 text-sm mb-8 italic">
              Access to this site is restricted to responsible adults. 
              Sales are subject to all federal and North Carolina state laws.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleVerify}
                className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-8 rounded shadow-md transition-colors uppercase tracking-wider"
              >
                Yes, I am 21+
              </button>
              <button 
                onClick={handleDeny}
                className="bg-stone-300 hover:bg-stone-400 text-stone-800 font-bold py-3 px-8 rounded shadow-md transition-colors uppercase tracking-wider"
              >
                No, I am under 21
              </button>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in zoom-in duration-300">
             <div className="flex justify-center mb-4 text-red-700">
                <AlertTriangle size={48} />
             </div>
             <h3 className="text-xl font-bold text-stone-900 mb-2">Access Denied</h3>
             <p className="text-stone-700 mb-6">
               You must be 21 or older to view the inventory of Peggs Gun Shop.
             </p>
             <a href="https://www.google.com" className="text-amber-700 underline hover:text-amber-900">
               Leave Website
             </a>
          </div>
        )}
        
        <div className="mt-8 pt-4 border-t border-stone-300">
            <p className="text-xs text-stone-400 text-center">
                ID & Background Checks Required for all purchases.
            </p>
        </div>
      </div>
    </div>
  );
};