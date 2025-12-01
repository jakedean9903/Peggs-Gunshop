import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { IMAGES, BUSINESS_INFO } from '../constants';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: `url(${IMAGES.hero})` }}
        >
            <div className="absolute inset-0 bg-stone-950/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 max-w-4xl mx-auto flex flex-col items-center animate-in fade-in zoom-in duration-700">
            {/* Badge */}
            <div className="absolute -top-16 -left-12 md:-top-24 md:-left-24 bg-amber-700 text-white w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full shadow-lg rotate-12 border-4 border-white/20 hidden sm:flex">
                <span className="text-center font-bold uppercase text-xs md:text-sm leading-tight">Locally<br/>Owned<br/>& Operated</span>
            </div>

            <img src={IMAGES.logo} alt="Peggs Gun Shop" className="w-32 md:w-48 mb-6 rounded-full border-4 border-amber-700/50 shadow-2xl" />
            
            <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-4 drop-shadow-lg tracking-wide">
                PEGGS <span className="text-amber-600">GUN SHOP</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 font-sans font-light tracking-widest uppercase mb-12">
                Walkertown, NC
            </p>

            <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                <Link 
                    to="/gallery" 
                    className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-4 text-lg font-bold uppercase tracking-wider rounded shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                    View Gallery <ArrowRight size={20} />
                </Link>
                <Link 
                    to="/contact" 
                    className="bg-transparent border-2 border-stone-400 hover:border-white text-stone-300 hover:text-white px-8 py-4 text-lg font-bold uppercase tracking-wider rounded shadow-lg transition-all hover:bg-white/10"
                >
                    Contact Us
                </Link>
            </div>
        </div>
        
        {/* Scroll hint */}
        <div className="absolute bottom-8 animate-bounce text-stone-400">
            <span className="text-xs uppercase tracking-widest">Scroll Down</span>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-stone-100 bg-wood bg-blend-soft-light">
          <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-8 flex items-center justify-center gap-4">
                  <span className="h-px w-12 bg-amber-700"></span>
                  Trusted. Local. Prepared.
                  <span className="h-px w-12 bg-amber-700"></span>
              </h2>
              <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-sans mb-12">
                  Peggs Gun Shop is Walkertown’s trusted small-town gunsmith and outfitter. 
                  We serve responsible owners with expert advice, friendly service, and a curated selection of 
                  top-quality firearms and accessories. Whether you're a seasoned marksman or a first-time buyer, 
                  our knowledgeable staff is here to guide you safely.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div className="bg-white p-6 rounded shadow border-t-4 border-amber-700">
                      <ShieldCheck className="text-amber-800 mb-4" size={40} />
                      <h3 className="text-xl font-bold mb-2">Safety First</h3>
                      <p className="text-stone-600">We prioritize education and safe handling practices for every customer.</p>
                  </div>
                  <div className="bg-white p-6 rounded shadow border-t-4 border-amber-700">
                      <MapPin className="text-amber-800 mb-4" size={40} />
                      <h3 className="text-xl font-bold mb-2">Community Rooted</h3>
                      <p className="text-stone-600">Proudly serving Walkertown and the surrounding NC area for years.</p>
                  </div>
                  <div className="bg-white p-6 rounded shadow border-t-4 border-amber-700">
                      <ArrowRight className="text-amber-800 mb-4" size={40} />
                      <h3 className="text-xl font-bold mb-2">Fair Trade-Ins</h3>
                      <p className="text-stone-600">Bring in your used firearms for a fair appraisal and trade-in value.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Quick Contact Block */}
      <section className="bg-stone-900 text-stone-300 py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                  <h3 className="text-2xl font-serif text-white mb-2">Visit Us Today</h3>
                  <p>{BUSINESS_INFO.address}, {BUSINESS_INFO.city}, {BUSINESS_INFO.state}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                 <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-stone-800 hover:bg-stone-700 px-6 py-3 rounded text-white font-bold transition-colors text-center">
                    Call: {BUSINESS_INFO.phone}
                 </a>
                 <a href={`mailto:${BUSINESS_INFO.email}`} className="bg-amber-800 hover:bg-amber-700 px-6 py-3 rounded text-white font-bold transition-colors text-center">
                    Email Us
                 </a>
              </div>
          </div>
      </section>
      
      {/* Testimonials Carousel (Placeholder) */}
      <section className="py-16 bg-stone-50">
          <div className="container mx-auto px-4 text-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-8">What Our Customers Say</h3>
              <div className="max-w-2xl mx-auto">
                  <blockquote className="text-2xl font-serif italic text-stone-800 mb-6">
                      "Best shop in the county. Honest folks who know their stuff and don't try to upsell you on things you don't need."
                  </blockquote>
                  <cite className="not-italic font-bold text-amber-700">— J. Miller, Walkertown</cite>
              </div>
          </div>
      </section>
    </div>
  );
};