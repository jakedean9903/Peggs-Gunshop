import React, { useState } from 'react';
import { BUSINESS_INFO } from '../constants';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would hit an API. 
    // For now, we construct a mailto link as requested.
    const subject = encodeURIComponent(`[Website Inquiry] ${formData.subject} - ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-stone-100 pb-20">
      <div className="bg-stone-900 text-white py-12 px-4 text-center border-b-4 border-amber-700">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
        <p className="text-stone-400 max-w-2xl mx-auto">
            Questions about inventory, trade-ins, or directions? Reach out today.
        </p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-stone-800">
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-stone-700 font-bold mb-2 text-sm uppercase">Your Name</label>
                        <input 
                            required
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-stone-50 border border-stone-300 p-3 rounded focus:border-amber-700 focus:outline-none"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-stone-700 font-bold mb-2 text-sm uppercase">Email Address</label>
                        <input 
                            required
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-stone-50 border border-stone-300 p-3 rounded focus:border-amber-700 focus:outline-none"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-stone-700 font-bold mb-2 text-sm uppercase">Subject</label>
                        <select 
                            name="subject" 
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full bg-stone-50 border border-stone-300 p-3 rounded focus:border-amber-700 focus:outline-none"
                        >
                            <option>General Inquiry</option>
                            <option>Purchase Availability</option>
                            <option>Trade-In Question</option>
                            <option>Gunsmithing Services</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-stone-700 font-bold mb-2 text-sm uppercase">Message</label>
                        <textarea 
                            required
                            name="message" 
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full bg-stone-50 border border-stone-300 p-3 rounded focus:border-amber-700 focus:outline-none"
                            placeholder="How can we help you?"
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 rounded transition-colors flex items-center justify-center gap-2 uppercase tracking-widest"
                    >
                        <Send size={20} /> Send Message
                    </button>
                    <p className="text-xs text-center text-stone-400 mt-4">
                        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                    </p>
                </form>
            </div>

            {/* Info & Map */}
            <div className="flex flex-col gap-8">
                <div className="bg-stone-900 text-stone-300 p-8 rounded-lg shadow-lg bg-leather bg-blend-overlay">
                    <h2 className="text-2xl font-serif font-bold text-white mb-6">Contact Info</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-amber-500 shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-white uppercase text-sm">Address</h3>
                                <p>{BUSINESS_INFO.address}<br/>{BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zip}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="text-amber-500 shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-white uppercase text-sm">Phone</h3>
                                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-amber-500 transition-colors">{BUSINESS_INFO.phone}</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="text-amber-500 shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-white uppercase text-sm">Email</h3>
                                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-amber-500 transition-colors break-all">{BUSINESS_INFO.email}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-2 rounded-lg shadow-lg h-80 lg:h-auto lg:flex-1 border border-stone-200">
                    <iframe 
                        src={BUSINESS_INFO.mapEmbedSrc} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Peggs Gun Shop Location"
                        className="rounded"
                    ></iframe>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};