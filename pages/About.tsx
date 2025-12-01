import React from 'react';
import { IMAGES } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
       <div className="bg-stone-900 text-white py-16 px-4 text-center border-b-4 border-amber-700">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Heritage & Responsibility</h1>
        <p className="text-stone-400 max-w-2xl mx-auto uppercase tracking-widest text-sm">
            Serving Walkertown since day one
        </p>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Heritage Section */}
        <section className="mb-16 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Our Story</h2>
                <div className="h-1 w-20 bg-amber-700 mb-6"></div>
                <p className="text-stone-700 text-lg leading-relaxed mb-4">
                    Peggs Gun Shop isn't just a store; it's a part of the Walkertown community fabric. 
                    Founded on the principles of honesty, expertise, and respect, we strive to be the 
                    premier destination for sportsmen, collectors, and those looking to protect their homes.
                </p>
                <p className="text-stone-700 text-lg leading-relaxed">
                   We believe in face-to-face service. When you walk through our doors, you aren't just a customer number—you're a neighbor.
                </p>
            </div>
            <div className="md:w-1/2">
                <img src={IMAGES.sign} alt="Peggs Exterior" className="rounded-lg shadow-xl border-4 border-stone-200 rotate-2 hover:rotate-0 transition-transform duration-500" />
            </div>
        </section>

        {/* Safety & Legal Section */}
        <section className="bg-stone-200 p-8 rounded-lg border-l-8 border-stone-800">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Commitment to Safety & Law</h2>
            <p className="text-stone-700 mb-6">
                Firearm ownership is a right that comes with significant responsibility. At Peggs, we are 
                strictly compliant with all Federal and North Carolina state laws.
            </p>
            
            <ul className="space-y-4">
                <li className="flex items-start gap-3">
                    <div className="bg-amber-700 text-white p-1 rounded-full mt-1 min-w-[24px] text-center text-xs font-bold">1</div>
                    <p className="text-stone-800 text-sm"><strong>Age Verification:</strong> You must be 18+ for long guns and 21+ for handguns and ammunition.</p>
                </li>
                <li className="flex items-start gap-3">
                    <div className="bg-amber-700 text-white p-1 rounded-full mt-1 min-w-[24px] text-center text-xs font-bold">2</div>
                    <p className="text-stone-800 text-sm"><strong>Background Checks:</strong> Every firearm sale requires a completed Form 4473 and NICS background check, or a valid NC Concealed Carry Permit.</p>
                </li>
                <li className="flex items-start gap-3">
                    <div className="bg-amber-700 text-white p-1 rounded-full mt-1 min-w-[24px] text-center text-xs font-bold">3</div>
                    <p className="text-stone-800 text-sm"><strong>Safe Storage:</strong> We strongly advocate for the use of gun safes and trigger locks, especially in homes with children.</p>
                </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-stone-300">
                <p className="text-sm font-bold text-stone-600">Helpful Resources (NC):</p>
                <div className="flex flex-wrap gap-4 mt-2">
                    <a href="https://www.ncdoj.gov/law-enforcement-training/criminal-justice/officer-certification-programs/firearms-laws/" target="_blank" rel="noreferrer" className="text-amber-700 underline hover:text-amber-900 text-sm">NC DOJ Firearm Laws</a>
                    <a href="https://wildlife.nc.gov/" target="_blank" rel="noreferrer" className="text-amber-700 underline hover:text-amber-900 text-sm">NC Wildlife Resources</a>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};