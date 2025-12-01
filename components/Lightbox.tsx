import React from 'react';
import { X, MessageSquare } from 'lucide-react';
import { GunImage } from '../types';

interface LightboxProps {
  item: GunImage | null;
  onClose: () => void;
  onContact: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onContact }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-200">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-stone-400 hover:text-white z-10"
      >
        <X size={40} />
      </button>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-stone-900 rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-black flex items-center justify-center h-[50vh] md:h-[70vh]">
            <img 
                src={item.src} 
                alt={item.title} 
                className="max-h-full max-w-full object-contain"
            />
        </div>
        
        <div className="p-8 flex flex-col justify-center text-stone-100">
            <span className="text-amber-600 uppercase tracking-widest text-xs font-bold mb-2">{item.category}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{item.title}</h2>
            <div className="w-16 h-1 bg-amber-800 mb-6"></div>
            <p className="text-stone-300 font-sans leading-relaxed mb-8 text-lg">
                {item.description}
            </p>
            
            <div className="mt-auto">
                <button 
                    onClick={() => {
                        onClose();
                        onContact();
                    }}
                    className="flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-8 py-4 rounded font-bold uppercase tracking-wider transition-all w-full justify-center"
                >
                    <MessageSquare size={20} />
                    Inquire About This Item
                </button>
                <p className="text-xs text-stone-500 mt-4 text-center">
                    Availability subject to change. Call for instant hold.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};