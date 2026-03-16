'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  Download, Phone, Mail, Quote, 
  MapPin, HeartHandshake, Car 
} from 'lucide-react';

export default function TransitionMin() {
  const sheet1Ref = useRef<HTMLDivElement>(null);
  const sheet2Ref = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [libsReady, setLibsReady] = useState(false);

  // Dynamically load scripts to avoid "Module not found" errors in the build environment
  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
    ]).then(() => {
      setLibsReady(true);
    }).catch(err => {
      console.error('Failed to load PDF libraries:', err);
    });
  }, []);

  const brand = {
    primary: '#000f83', // Deep Blue
    secondary: '#f5ab1b', // Amber/Gold
    dark: '#1e293b', 
    light: '#f8fafc',
    white: '#ffffff',
  };

  const handleDownload = async () => {
    if (!libsReady) return;
    setIsDownloading(true);
    try {
      // Accessing libraries from the window object after CDN load
      const { jsPDF } = (window as any).jspdf;
      const html2canvas = (window as any).html2canvas;

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a3',
      });

      const capturePage = async (ref: React.RefObject<HTMLDivElement | null>, pageNum: number) => {
        if (!ref.current) return;
        const canvas = await html2canvas(ref.current, {
          scale: 2, // Balanced for quality vs file size
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        if (pageNum > 1) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, 420, 297);
      };

      await capturePage(sheet1Ref, 1);
      await capturePage(sheet2Ref, 2);
      pdf.save('La_Necar_Supporting_Brochure_A3_Imposed.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 flex flex-col items-center gap-12 font-sans">
      
      {/* Control Panel */}
      <div className="w-[1190px] flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h2 className="text-xl font-bold" style={{ color: brand.primary }}>Transition Min (Supporting) Brochure</h2>
          <p className="text-sm text-gray-500">Imposed for A3 Double-Sided Printing (Folds to A4)</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={isDownloading || !libsReady}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg disabled:opacity-70"
          style={{ backgroundColor: brand.secondary, color: brand.primary }}
        >
          <Download size={20} />
          {!libsReady ? 'Initializing...' : isDownloading ? 'Processing High-Res PDF...' : 'Download Print-Ready PDF'}
        </button>
      </div>

      {/* ==========================================
          SHEET 1: BACK COVER (Left) & FRONT COVER (Right)
          ========================================== */}
      <div 
        ref={sheet1Ref} 
        className="flex bg-white shadow-2xl relative overflow-hidden"
        style={{ width: '1190px', height: '842px' }}
      >
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 border-r border-dashed border-gray-300 z-50"></div>

        {/* --- PAGE 4: BACK COVER (Left Side) --- */}
        <div className="w-[595px] h-full relative flex flex-col bg-gray-50">
          <div className="p-14 flex-1">
            <h2 className="text-3xl font-black mb-6 leading-tight" style={{ color: brand.primary }}>
              At La Necar Logistics,
            </h2>
            <p className="text-lg text-gray-700 font-medium leading-relaxed mb-12 border-l-4 pl-6 py-2 bg-white shadow-sm rounded-r-lg" style={{ borderColor: brand.secondary }}>
              We train our drivers to recognize person-centered regulation needs and adjust support to promote comfort and safety during rides.
            </p>

            <h3 className="text-sm font-bold tracking-widest uppercase mb-8 text-gray-400">
              What families are saying about us
            </h3>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm relative">
                <Quote size={40} className="absolute -top-4 -left-2 opacity-20" style={{ color: brand.primary }} />
                <p className="text-gray-700 italic leading-relaxed mb-4 relative z-10 text-[15px]">
                  "The team is very polite and accommodating, and I appreciate the texts regarding daily transportation schedules as well! We love being LaNecar customers!"
                </p>
                <p className="font-bold text-sm uppercase tracking-wide" style={{ color: brand.secondary }}>— Alex, Dad</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm relative">
                <Quote size={40} className="absolute -top-4 -left-2 opacity-20" style={{ color: brand.primary }} />
                <p className="text-gray-700 italic leading-relaxed mb-4 relative z-10 text-[15px]">
                  "I was very satisfied with the transportation service. The drivers were punctual 99% of the time, the staff were professional and respectful, and they consistently showed care for my ward's needs. The vehicles were comfortable, and the service was reliable throughout. I appreciate their efficiency and would gladly recommend them to other families or caregivers."
                </p>
                <p className="font-bold text-sm uppercase tracking-wide" style={{ color: brand.secondary }}>— Gabriela, Guardian</p>
              </div>
            </div>
          </div>

          {/* Footer Contact Block */}
          <div className="p-14 text-white flex justify-between items-center relative overflow-hidden" style={{ backgroundColor: brand.primary }}>
            {/* Geometric Accent */}
            <div className="absolute top-0 right-0 w-32 h-full opacity-20" style={{ backgroundColor: brand.secondary, clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
            
            <div className="relative z-10">
              <h4 className="text-2xl font-black mb-4">Contact us today</h4>
              <p className="flex items-center gap-3 text-lg mb-2"><Phone size={20} style={{ color: brand.secondary }} /> +1 855-202-9967</p>
              <p className="flex items-center gap-3 text-sm"><Mail size={18} style={{ color: brand.secondary }} /> services@lanecarlogisticsllc.com</p>
            </div>
            <div className="bg-white p-3 rounded relative z-10 shadow-xl">
               <div className="w-16 h-16 border-4 border-black flex items-center justify-center font-mono text-[8px] text-black text-center px-1">
                Scan for <br/>More Info
              </div>
            </div>
          </div>
        </div>

        {/* --- PAGE 1: FRONT COVER (Right Side) --- */}
        <div className="w-[595px] h-full relative flex flex-col text-white" style={{ backgroundColor: brand.primary }}>
          <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200" 
                alt="Corporate Transportation"
                className="w-full h-full object-cover opacity-20 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#000f83]/90 via-[#000f83]/80 to-[#000f83]"></div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col p-14">
            <div className="w-24 h-2 mb-12" style={{ backgroundColor: brand.secondary }}></div>
            
            <h1 className="text-[3.5rem] font-black leading-[1.05] tracking-tight mb-8">
              La Necar <br/> 
              <span className="text-3xl font-light text-white/90 tracking-normal block mt-2">Logistics & Transportation Solutions</span>
            </h1>

            <div className="bg-white/10 backdrop-blur-sm border-l-4 p-6 mb-auto" style={{ borderColor: brand.secondary }}>
              <p className="text-xl font-medium leading-snug">
                Now serving all counties in New Jersey with Wheelchair Accessible Rides
              </p>
            </div>

            <div className="mt-auto">
              <h2 className="text-2xl font-bold leading-snug mb-10 text-white/90 max-w-sm">
                Supporting Independence and participation in daily life
              </h2>
              <div className="bg-white p-4 rounded inline-block">
                <div className="w-20 h-20 border-4 border-black flex items-center justify-center font-mono text-[10px] text-black text-center px-1">
                  Connect With Us
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SHEET 2: INSIDE LEFT & INSIDE RIGHT
          ========================================== */}
      <div 
        ref={sheet2Ref} 
        className="flex bg-white shadow-2xl relative overflow-hidden"
        style={{ width: '1190px', height: '842px' }}
      >
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 border-r border-dashed border-gray-300 z-50"></div>

        {/* --- PAGE 2: INSIDE LEFT (Left Side) --- */}
        <div className="w-[595px] h-full relative flex flex-col bg-white">
          <div className="h-[45%] relative w-full overflow-hidden">
             <img 
                src="https://images.unsplash.com/photo-1520697830682-89829e28f3cb?auto=format&fit=crop&q=80&w=1200" 
                alt="Ride Share App Interaction"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"></div>
          </div>
          
          <div className="p-14 flex-1 -mt-10 relative z-10">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: brand.secondary }}>
              Our Services
            </h2>
            <h3 className="text-4xl font-black leading-tight mb-6" style={{ color: brand.primary }}>
              Third-Party Ride-Share <br/>Coordination
            </h3>
            
            <div className="w-12 h-1.5 mb-8" style={{ backgroundColor: brand.secondary }}></div>

            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              La Necar Logistics now coordinates with <strong style={{ color: brand.primary }}>Uber Health</strong>, to provide flexible rides for eligible individuals aged 21 and above. 
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              These rides can be used for doctor visits, recreational activities, community access, and more.
            </p>

            {/* Icon Block */}
            <div className="mt-12 flex items-center gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="p-4 rounded-full bg-white shadow-sm text-[#000f83]">
                 <MapPin size={32} />
              </div>
              <p className="text-sm text-gray-600 font-bold uppercase tracking-wide">
                Flexible & Reliable Community Access
              </p>
            </div>
          </div>
        </div>

        {/* --- PAGE 3: INSIDE RIGHT (Right Side) --- */}
        <div className="w-[595px] h-full relative flex flex-col bg-white">
          <div className="p-14 flex-1 flex flex-col justify-center">
            
            <div className="mb-12">
              <div className="inline-block p-4 rounded-2xl mb-8" style={{ backgroundColor: brand.primary, color: brand.white }}>
                <Car size={48} />
              </div>
              <h3 className="text-4xl font-black leading-tight mb-6" style={{ color: brand.primary }}>
                Wheelchair Accessible <br/>Vehicles
              </h3>
              <div className="w-12 h-1.5 mb-8" style={{ backgroundColor: brand.secondary }}></div>
              
              <p className="text-xl text-gray-800 leading-relaxed font-medium">
                Serving all counties in New Jersey, La Necar Logistics provides vehicles designed to accommodate both foldable and non-foldable wheelchairs.
              </p>
              
              <div className="mt-8 bg-blue-50/50 border border-blue-100 p-8 rounded-2xl shadow-sm">
                 <HeartHandshake size={32} className="mb-4" style={{ color: brand.secondary }} />
                 <p className="text-lg text-gray-700 leading-relaxed italic">
                  "Helping riders maintain stable daily routines and active community engagement."
                 </p>
              </div>
            </div>
          </div>

          <div className="h-[35%] relative w-full overflow-hidden">
             <img 
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1200" 
                alt="Accessible Transit"
                className="w-full h-full object-cover"
              />
               <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </div>
      </div>

    </div>
  );
}