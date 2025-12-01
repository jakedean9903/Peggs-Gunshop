import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { Lightbox } from '../components/Lightbox';
import { GunImage } from '../types';
import { useNavigate } from 'react-router-dom';

type Category = 'all' | 'pistol' | 'shotgun' | 'rifle' | 'ammo';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedItem, setSelectedItem] = useState<GunImage | null>(null);
  const navigate = useNavigate();

  const filteredItems = activeCategory === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory || (activeCategory === 'ammo' && item.category === 'accessory'));

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Inventory' },
    { id: 'pistol', label: 'Pistols' },
    { id: 'shotgun', label: 'Shotguns' },
    { id: 'rifle', label: 'Rifles' },
    { id: 'ammo', label: 'Ammo & Gear' },
  ];

  return (
    <div className="min-h-screen bg-stone-100 pb-20">
      {/* Header */}
      <div className="bg-stone-900 text-white py-12 px-4 text-center border-b-4 border-amber-700">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Inventory Gallery</h1>
        <p className="text-stone-400 max-w-2xl mx-auto">
            Browse our current selection. Inventory changes daily. 
            Please call to confirm availability.
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-[70px] md:top-[80px] z-30 bg-stone-100/95 backdrop-blur shadow-sm py-4 border-b border-stone-200">
        <div className="container mx-auto px-4 overflow-x-auto">
            <div className="flex justify-center min-w-max space-x-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider transition-all ${
                            activeCategory === cat.id 
                            ? 'bg-amber-800 text-white shadow-md transform scale-105' 
                            : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
                <div 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-stone-200 hover:border-amber-500"
                >
                    <div className="aspect-[4/3] overflow-hidden bg-stone-200 relative">
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                        <img 
                            src={item.src} 
                            alt={item.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 bg-amber-700 text-white text-[10px] uppercase font-bold px-3 py-1">
                            {item.category}
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-stone-500 text-sm line-clamp-2">
                            {item.description}
                        </p>
                        <div className="mt-4 text-amber-800 font-bold text-sm uppercase flex items-center gap-1">
                            View Details &rarr;
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {filteredItems.length === 0 && (
            <div className="text-center py-20 text-stone-500">
                <p>No items found in this category right now.</p>
            </div>
        )}
      </div>

      <Lightbox 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onContact={() => {
            // Navigate to contact form
            setSelectedItem(null);
            navigate('/contact');
        }}
      />
    </div>
  );
};