import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Camera, Image as ImageIcon, Sparkles, MapPin, Search } from 'lucide-react';
import { sendMessageToGemini, analyzeGunImage, generateCustomImage } from '../services/geminiService';
import { AspectRatio, ImageSize, ChatMessage } from '../types';

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'vision' | 'generate'>('chat');
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Howdy. I can help with safety info, store location, or checking current laws.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Vision State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>('');

  // Generate State
  const [genPrompt, setGenPrompt] = useState('');
  const [genRatio, setGenRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [genSize, setGenSize] = useState<ImageSize>(ImageSize.ONE_K);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState(''); // User must provide for high-quality generation
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendChat = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      
      // Determine if we need grounding based on keywords
      const needsGrounding = /law|legal|rule|where|location|find|news|current/i.test(userMsg.text);
      
      const response = await sendMessageToGemini(history, userMsg.text, needsGrounding);
      const text = response.response.text();
      
      // Extract grounding metadata if available (for maps/search links)
      const groundingChunks = response.response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      let links: {title: string; uri: string}[] = [];

      if (groundingChunks) {
        groundingChunks.forEach((chunk: any) => {
          if (chunk.web?.uri) {
            links.push({ title: chunk.web.title || 'Source', uri: chunk.web.uri });
          }
          if (chunk.maps?.uri) { // Not standard but logical fallback if maps grounding adds it
             links.push({ title: 'View on Maps', uri: chunk.maps.uri });
          }
        });
      }

      setMessages(prev => [...prev, { role: 'model', text, timestamp: new Date(), groundingLinks: links }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to the network right now.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64.split(',')[1]); // remove prefix
        setAnalysisResult('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsLoading(true);
    try {
      const result = await analyzeGunImage(selectedImage, "Identify this firearm item, describe its likely condition, and give a safety assessment.");
      setAnalysisResult(result || "Could not analyze.");
    } catch (e) {
      setAnalysisResult("Error analyzing image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!apiKey && !process.env.API_KEY) {
        alert("Please enter an API Key for high-quality generation.");
        setShowKeyInput(true);
        return;
    }
    setIsLoading(true);
    try {
        const keyToUse = apiKey || process.env.API_KEY || '';
        const result = await generateCustomImage(genPrompt, genRatio, genSize, keyToUse);
        if (result) setGeneratedImage(result);
    } catch (e) {
        alert("Generation failed. Check API Key quota.");
    } finally {
        setIsLoading(false);
    }
  };

  // Select Key UI for Generation
  const SelectKeyUI = () => (
      window.aistudio ? (
        <button 
            onClick={async () => {
               try {
                 await window.aistudio.openSelectKey();
                 // Assuming successful selection logic handled by platform or manually set
               } catch(e) { console.error(e) }
            }}
            className="text-xs underline text-amber-600"
        >
            Select API Key (Google AI Studio)
        </button>
      ) : (
          <div className="mb-2">
            <label className="text-xs block text-stone-500">API Key Required for HQ Images</label>
            <input 
                type="password" 
                value={apiKey} 
                onChange={e => setApiKey(e.target.value)}
                placeholder="Paste Gemini API Key"
                className="w-full border p-1 rounded text-xs"
            />
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-[10px] text-blue-500 underline">Get a paid key</a>
          </div>
      )
  );


  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-amber-700 hover:bg-amber-600 text-white p-4 rounded-full shadow-xl transition-all hover:scale-105 flex items-center gap-2"
      >
        <MessageCircle size={24} />
        <span className="font-bold hidden md:inline">Ask AI Helper</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-full md:w-96 h-[600px] bg-stone-50 rounded-lg shadow-2xl flex flex-col border border-stone-300 overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-stone-900 text-stone-100 p-4 flex justify-between items-center">
        <h3 className="font-serif font-bold flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500"/> Peggs AI Assistant
        </h3>
        <button onClick={() => setIsOpen(false)} className="hover:text-amber-500"><X size={20}/></button>
      </div>

      {/* Tabs */}
      <div className="flex bg-stone-200 border-b border-stone-300">
        <button onClick={() => setMode('chat')} className={`flex-1 py-3 text-sm font-bold ${mode === 'chat' ? 'bg-stone-50 text-amber-800 border-t-2 border-amber-800' : 'text-stone-500 hover:bg-stone-100'}`}>Chat</button>
        <button onClick={() => setMode('vision')} className={`flex-1 py-3 text-sm font-bold ${mode === 'vision' ? 'bg-stone-50 text-amber-800 border-t-2 border-amber-800' : 'text-stone-500 hover:bg-stone-100'}`}>Check Trade-In</button>
        <button onClick={() => setMode('generate')} className={`flex-1 py-3 text-sm font-bold ${mode === 'generate' ? 'bg-stone-50 text-amber-800 border-t-2 border-amber-800' : 'text-stone-500 hover:bg-stone-100'}`}>Design Gear</button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-stone-50">
        
        {/* CHAT MODE */}
        {mode === 'chat' && (
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-4 mb-4" ref={scrollRef}>
                {messages.map((m, i) => (
                    <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-amber-100 text-amber-900 rounded-tr-none' : 'bg-stone-200 text-stone-800 rounded-tl-none'}`}>
                            {m.text}
                        </div>
                        {m.groundingLinks && m.groundingLinks.length > 0 && (
                            <div className="mt-1 text-xs flex flex-wrap gap-2">
                                {m.groundingLinks.map((link, idx) => (
                                    <a key={idx} href={link.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded border border-stone-300 text-blue-600 hover:underline">
                                        <Search size={10} /> {link.title}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && <div className="text-stone-400 text-xs animate-pulse">Thinking...</div>}
            </div>
            <div className="flex gap-2 pt-2 border-t border-stone-200">
                <input 
                    className="flex-1 border border-stone-300 rounded p-2 text-sm focus:border-amber-500 outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="Ask about laws, stock, or safety..."
                />
                <button onClick={handleSendChat} disabled={isLoading} className="bg-amber-700 text-white p-2 rounded hover:bg-amber-800"><Send size={18}/></button>
            </div>
          </div>
        )}

        {/* VISION MODE */}
        {mode === 'vision' && (
            <div className="space-y-4">
                <p className="text-sm text-stone-600">Upload a photo of your firearm for a preliminary ID or condition assessment.</p>
                <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:bg-stone-100 transition-colors relative">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Camera className="mx-auto text-stone-400 mb-2" size={32} />
                    <span className="text-sm text-stone-500 font-bold">Click to Upload Photo</span>
                </div>
                {selectedImage && (
                    <div className="relative h-40 bg-black rounded overflow-hidden">
                        <img src={`data:image/jpeg;base64,${selectedImage}`} alt="Upload" className="h-full w-full object-contain" />
                    </div>
                )}
                {selectedImage && (
                    <button onClick={handleAnalyze} disabled={isLoading} className="w-full bg-amber-700 text-white py-2 rounded font-bold hover:bg-amber-800 disabled:opacity-50">
                        {isLoading ? 'Analyzing...' : 'Analyze Image'}
                    </button>
                )}
                {analysisResult && (
                    <div className="bg-stone-100 p-3 rounded text-sm text-stone-800 border-l-4 border-amber-500 mt-4 h-48 overflow-y-auto">
                        <h4 className="font-bold mb-1">AI Assessment:</h4>
                        {analysisResult}
                    </div>
                )}
            </div>
        )}

        {/* GENERATE MODE */}
        {mode === 'generate' && (
            <div className="space-y-4">
                <p className="text-sm text-stone-600">Visualize custom engravings, holsters, or camo patterns.</p>
                
                <SelectKeyUI />

                <textarea 
                    className="w-full border border-stone-300 rounded p-2 text-sm focus:border-amber-500 outline-none"
                    rows={3}
                    placeholder="Ex: A leather holster with a deer skull engraving..."
                    value={genPrompt}
                    onChange={(e) => setGenPrompt(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                    <select 
                        className="border p-2 rounded text-xs"
                        value={genRatio} 
                        onChange={(e) => setGenRatio(e.target.value as AspectRatio)}
                    >
                        {Object.values(AspectRatio).map(r => <option key={r} value={r}>{r} Ratio</option>)}
                    </select>
                    <select 
                        className="border p-2 rounded text-xs"
                        value={genSize}
                        onChange={(e) => setGenSize(e.target.value as ImageSize)}
                    >
                        {Object.values(ImageSize).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-amber-700 text-white py-2 rounded font-bold hover:bg-amber-800 disabled:opacity-50 flex justify-center items-center gap-2">
                    {isLoading ? <Sparkles className="animate-spin" size={16}/> : <ImageIcon size={16} />}
                    {isLoading ? 'Generating...' : 'Generate Preview'}
                </button>

                {generatedImage && (
                    <div className="mt-4 border-4 border-stone-200 rounded shadow-lg">
                        <img src={generatedImage} alt="Generated" className="w-full h-auto" />
                        <a href={generatedImage} download="peggs-custom-design.png" className="block text-center text-xs text-blue-600 mt-2 underline">Download Design</a>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
};