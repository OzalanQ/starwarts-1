
import React, { useState, useRef, useEffect } from 'react';
import { Character, WandWood, WandCore, WandColor } from '../types';
import { WAND_WOODS, WAND_CORES, WAND_COLORS, HOUSE_THEMES } from '../constants';
import { Sparkles, Hammer, ArrowRight, Upload, X, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WandWorkshopProps {
  character: Character;
  onCraftWand: (wood: WandWood, core: WandCore, color: WandColor, customImage?: string) => void;
}

export const WandWorkshop: React.FC<WandWorkshopProps> = ({ character, onCraftWand }) => {
  const theme = HOUSE_THEMES[character.house] || HOUSE_THEMES.Gryffindor;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedWood, setSelectedWood] = useState<WandWood | null>(null);
  const [selectedCore, setSelectedCore] = useState<WandCore | null>(null);
  const [selectedColor, setSelectedColor] = useState<WandColor | null>(null);
  const [customPattern, setCustomPattern] = useState<string | null>(null);

  const totalCost = (selectedWood?.cost || 0) + (selectedCore?.cost || 0) + (selectedColor?.cost || 0);
  const canAfford = character.gold >= totalCost;

  // Generate Wand Image on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedWood) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load overlay image if present
    const render = (overlayImg?: HTMLImageElement) => {
        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;

        // Core Glow (Background)
        if (selectedCore) {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(-Math.PI / 4);
            ctx.shadowBlur = 40;
            ctx.shadowColor = selectedCore.id === 'phoenix' ? 'orange' : selectedCore.id === 'unicorn' ? 'cyan' : 'red';
            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            ctx.beginPath();
            ctx.ellipse(0, 0, 30, 160, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-Math.PI / 4); // 45 degree angle

        // Wand Path Definition
        const path = new Path2D();
        // Handle (Bottom)
        path.moveTo(-8, 140); 
        path.lineTo(8, 140);
        path.lineTo(7, 100);
        path.lineTo(-7, 100);
        path.lineTo(-8, 140);
        
        // Shaft (Top)
        path.moveTo(-7, 100);
        path.lineTo(7, 100);
        path.lineTo(3, -140); // Tip
        path.lineTo(-3, -140);
        path.lineTo(-7, 100);
        path.closePath();

        // 1. Fill Wood Base
        ctx.fillStyle = selectedWood.color;
        ctx.fill(path);

        // 2. Apply Custom Pattern/Overlay (Clipped to Wand)
        if (overlayImg) {
            ctx.save();
            ctx.clip(path);
            ctx.globalCompositeOperation = 'multiply';
            ctx.globalAlpha = 0.7;
            // Draw image covering the wand area
            ctx.drawImage(overlayImg, -50, -150, 100, 300);
            ctx.restore();
        }

        // 3. Apply Finish Color (Clipped)
        if (selectedColor && selectedColor.hex !== 'transparent') {
            ctx.save();
            ctx.clip(path);
            ctx.globalCompositeOperation = 'overlay';
            ctx.fillStyle = selectedColor.hex;
            ctx.fill(path);
            ctx.restore();
        }

        // 4. Shading / 3D Effect
        ctx.save();
        ctx.clip(path);
        const grad = ctx.createLinearGradient(-10, 0, 10, 0);
        grad.addColorStop(0, 'rgba(0,0,0,0.6)');
        grad.addColorStop(0.3, 'rgba(255,255,255,0.1)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.4)');
        grad.addColorStop(0.7, 'rgba(255,255,255,0.1)');
        grad.addColorStop(1, 'rgba(0,0,0,0.6)');
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = 'hard-light';
        ctx.fill(path);
        ctx.restore();

        // 5. Core Spark (at tip)
        if (selectedCore) {
            ctx.globalCompositeOperation = 'screen';
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'white';
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(0, -142, 2, 0, Math.PI*2);
            ctx.fill();
        }

        ctx.restore();
    };

    if (customPattern) {
        const img = new Image();
        img.onload = () => render(img);
        img.src = customPattern;
    } else {
        render();
    }

  }, [selectedWood, selectedCore, selectedColor, customPattern]);

  const handleCraft = () => {
    if (selectedWood && selectedCore && selectedColor && canAfford) {
      // Generate base64 image from canvas
      const canvas = canvasRef.current;
      const customImage = canvas ? canvas.toDataURL('image/png') : undefined;
      
      onCraftWand(selectedWood, selectedCore, selectedColor, customImage);
      
      // Reset
      setStep(1);
      setSelectedWood(null);
      setSelectedCore(null);
      setSelectedColor(null);
      setCustomPattern(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                  setCustomPattern(reader.result);
              }
          };
          reader.readAsDataURL(file);
      }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative min-h-[600px]">
        <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileUpload} 
        />

        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        {/* Left Panel: Selection */}
        <div className="lg:col-span-2 space-y-6 relative z-10">
            <div className="bg-[#1a1a2e]/80 border border-slate-700 p-6 rounded-xl">
                 <h2 className="text-3xl font-magic text-amber-100 mb-2">Ollivander's Workshop</h2>
                 <p className="text-slate-400 font-serif italic">"The wand chooses the wizard, Mr. Potter."</p>
                 
                 {/* Steps Navigation */}
                 <div className="flex flex-wrap items-center gap-2 mt-6 mb-8 text-sm uppercase tracking-wider font-bold">
                    <button onClick={() => setStep(1)} className={`px-3 py-1 rounded transition-colors ${step === 1 ? 'bg-amber-900/50 text-amber-200' : 'text-slate-600 hover:text-slate-400'}`}>1. Wood</button>
                    <ArrowRight className="w-4 h-4 text-slate-700" />
                    <button onClick={() => selectedWood && setStep(2)} disabled={!selectedWood} className={`px-3 py-1 rounded transition-colors ${step === 2 ? 'bg-amber-900/50 text-amber-200' : selectedWood ? 'text-slate-600 hover:text-slate-400' : 'text-slate-800'}`}>2. Core</button>
                    <ArrowRight className="w-4 h-4 text-slate-700" />
                    <button onClick={() => selectedCore && setStep(3)} disabled={!selectedCore} className={`px-3 py-1 rounded transition-colors ${step === 3 ? 'bg-amber-900/50 text-amber-200' : selectedCore ? 'text-slate-600 hover:text-slate-400' : 'text-slate-800'}`}>3. Finish</button>
                    <ArrowRight className="w-4 h-4 text-slate-700" />
                    <button onClick={() => selectedColor && setStep(4)} disabled={!selectedColor} className={`px-3 py-1 rounded transition-colors ${step === 4 ? 'bg-amber-900/50 text-amber-200' : selectedColor ? 'text-slate-600 hover:text-slate-400' : 'text-slate-800'}`}>4. Details</button>
                 </div>

                 <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {WAND_WOODS.map(wood => (
                                <button 
                                    key={wood.id} 
                                    onClick={() => { setSelectedWood(wood); setStep(2); }}
                                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                                        selectedWood?.id === wood.id 
                                        ? 'bg-amber-900/20 border-amber-500/50 shadow-lg' 
                                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-200 font-serif text-lg">{wood.name}</h3>
                                        <span className="text-yellow-500 font-mono text-xs">{wood.cost} G</span>
                                    </div>
                                    <p className="text-xs text-slate-400 italic mb-3 h-8">{wood.description}</p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                                        <Sparkles className="w-3 h-3" /> Attack +{wood.attackBonus}
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {WAND_CORES.map(core => (
                                <button 
                                    key={core.id} 
                                    onClick={() => { setSelectedCore(core); setStep(3); }}
                                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                                        selectedCore?.id === core.id 
                                        ? 'bg-amber-900/20 border-amber-500/50 shadow-lg' 
                                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{core.image}</span>
                                            <h3 className="font-bold text-slate-200 font-serif text-lg">{core.name}</h3>
                                        </div>
                                        <span className="text-yellow-500 font-mono text-xs">{core.cost} G</span>
                                    </div>
                                    <p className="text-xs text-slate-400 italic mb-3 h-8">{core.description}</p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                                        <Sparkles className="w-3 h-3" /> Defense +{core.defenseBonus}
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    )}

                     {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {WAND_COLORS.map(color => (
                                <button 
                                    key={color.id} 
                                    onClick={() => { setSelectedColor(color); setStep(4); }}
                                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                                        selectedColor?.id === color.id 
                                        ? 'bg-amber-900/20 border-amber-500/50 shadow-lg' 
                                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                                    }`}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold text-slate-200 font-serif text-lg">{color.name}</h3>
                                        <span className="text-yellow-500 font-mono text-xs">{color.cost} G</span>
                                    </div>
                                    <div 
                                        className="h-8 w-full rounded border border-slate-600"
                                        style={{ backgroundColor: color.hex === 'transparent' ? '#e2e8f0' : color.hex, opacity: color.hex === 'transparent' ? 0.2 : 1 }}
                                    ></div>
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div 
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col items-center justify-center p-8 bg-slate-800/30 rounded-xl border border-slate-700 border-dashed"
                        >
                             <Wand2 className="w-12 h-12 text-slate-500 mb-4" />
                             <h3 className="text-xl font-magic text-white mb-2">Wand Customization</h3>
                             <p className="text-slate-400 text-center mb-6 max-w-md">
                                Upload a rune, texture, or pattern image to engrave onto your wand's surface. 
                                The magical lathe will apply it directly to the wood.
                             </p>

                             <div className="flex gap-4">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors border border-slate-600"
                                >
                                    <Upload className="w-4 h-4" />
                                    {customPattern ? 'Change Overlay' : 'Upload Pattern'}
                                </button>
                                {customPattern && (
                                    <button
                                        onClick={() => setCustomPattern(null)}
                                        className="bg-red-900/50 hover:bg-red-900 text-red-200 px-4 py-3 rounded-lg border border-red-800/50"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                             </div>
                             {customPattern && <p className="text-green-400 text-sm mt-4 flex items-center gap-2"><Sparkles className="w-3 h-3" /> Custom overlay applied to preview</p>}
                        </motion.div>
                    )}
                 </AnimatePresence>
            </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="lg:col-span-1 relative z-10">
            <div className="bg-[#1e293b] border border-slate-700 p-6 rounded-xl sticky top-6">
                <h3 className="text-xl font-magic text-white mb-6 border-b border-slate-700 pb-4">Wand Preview</h3>
                
                {/* Visual Representation (Canvas) */}
                <div className="h-80 bg-slate-900 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden border border-slate-800 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                     {/* The Canvas is the source of truth for the image generation */}
                     <canvas 
                        ref={canvasRef} 
                        width={300} 
                        height={300} 
                        className={`w-full h-full object-contain ${!selectedWood ? 'opacity-20' : 'opacity-100'} transition-opacity duration-500`} 
                     />
                     {!selectedWood && <div className="absolute text-slate-500 italic text-sm">Select wood to conjure...</div>}
                </div>

                {/* Summary Stats */}
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Wood Type</span>
                        <span className="text-white font-bold">{selectedWood?.name || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Core</span>
                        <span className="text-white font-bold">{selectedCore?.name || '-'}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Finish</span>
                        <span className="text-white font-bold">{selectedColor?.name || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-red-400 font-bold text-xs uppercase">Attack</span>
                        <span className="text-red-400 font-bold">+{selectedWood?.attackBonus || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-blue-400 font-bold text-xs uppercase">Defense</span>
                        <span className="text-blue-400 font-bold">+{selectedCore?.defenseBonus || 0}</span>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700">
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-slate-400 text-sm uppercase font-bold">Total Cost</span>
                        <span className={`text-2xl font-magic ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>{totalCost} G</span>
                    </div>
                    <button
                        onClick={handleCraft}
                        disabled={!selectedWood || !selectedCore || !selectedColor || !canAfford}
                        className={`w-full py-4 rounded-lg font-magic text-xl flex items-center justify-center gap-2 transition-all ${
                            (selectedWood && selectedCore && selectedColor && canAfford)
                            ? 'bg-amber-700 hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-500/20'
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        }`}
                    >
                        <Hammer className="w-5 h-5" />
                        Craft Wand
                    </button>
                     {!canAfford && totalCost > 0 && <p className="text-center text-red-500 text-xs mt-2">Insufficient Galleons</p>}
                </div>
            </div>
        </div>
    </div>
  );
};
