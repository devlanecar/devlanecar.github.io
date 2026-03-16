'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  Download, Phone, Globe, Mail, Quote, 
  ShieldCheck, Users, Clock, Navigation, CheckCircle2 
} from 'lucide-react';

export default function TransitionMain() {
  const sheet1Ref = useRef<HTMLDivElement>(null);
  const sheet2Ref = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    
    const script2 = document.createElement('script');
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';

    script1.onload = () => {
      script2.onload = () => setScriptsLoaded(true);
      document.head.appendChild(script2);
    };
    document.head.appendChild(script1);

    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(script2)) document.head.removeChild(script2);
    };
  }, []);

  const brand = {
    primary: '#000f83', // Deep Blue
    secondary: '#f5ab1b', // Amber/Gold
    dark: '#1e293b', 
    light: '#f8fafc',
    white: '#ffffff',
  };

  const handleDownload = async () => {
    if (!scriptsLoaded) return;
    setIsDownloading(true);
    try {
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
          scale: 3, // High DPI boost
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        if (pageNum > 1) pdf.addPage();
        // A3 dimensions: 420mm x 297mm
        pdf.addImage(imgData, 'JPEG', 0, 0, 420, 297);
      };

      await capturePage(sheet1Ref, 1);
      await capturePage(sheet2Ref, 2);
      pdf.save('La_Necar_Main_Brochure_A3_Imposed.pdf');
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
          <h2 className="text-xl font-bold" style={{ color: brand.primary }}>Transition Main Brochure</h2>
          <p className="text-sm text-gray-500">Imposed for A3 Double-Sided Printing (Folds to A4)</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={isDownloading || !scriptsLoaded}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg disabled:opacity-70"
          style={{ backgroundColor: brand.secondary, color: brand.primary }}
        >
          <Download size={20} />
          {!scriptsLoaded ? 'Loading Exporter...' : isDownloading ? 'Processing High-Res PDF...' : 'Download Print-Ready PDF'}
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
        {/* FOLD LINE INDICATOR */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 border-r border-dashed border-gray-300 z-50"></div>

        {/* --- PAGE 4: BACK COVER (Left Side) --- */}
        <div className="w-[595px] h-full relative flex flex-col text-white" style={{ backgroundColor: brand.primary }}>
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current"><polygon points="100,0 100,100 0,0" /></svg>
          </div>

          <div className="p-14 flex-1 flex flex-col z-10">
            <h2 className="text-4xl font-extrabold leading-tight mb-2">
              Your partner in <br/>
              <span style={{ color: brand.secondary }}>safe, every day mobility</span>
            </h2>
            
            <div className="w-20 h-1.5 mb-10" style={{ backgroundColor: brand.secondary }}></div>

            <div className="mb-10">
              <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wider text-sm">Why Families Trust La Necar Logistics</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <span className="block text-3xl font-black mb-1" style={{ color: brand.secondary }}>280k+</span>
                  <p className="text-xs leading-relaxed opacity-90">miles completed in 2025, supporting daily independence and community access</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <span className="block text-3xl font-black mb-1" style={{ color: brand.secondary }}>18k+</span>
                  <p className="text-xs leading-relaxed opacity-90">successful trips, including medical, vocational, and community transportation</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <span className="block text-3xl font-black mb-1" style={{ color: brand.secondary }}>Low</span>
                  <p className="text-xs leading-relaxed opacity-90">discharge rates, reflecting satisfaction and long-term partnerships with families</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <span className="block text-3xl font-black mb-1" style={{ color: brand.secondary }}>95%</span>
                  <p className="text-xs leading-relaxed opacity-90">on-time performance in 2025, delivering reliability families can plan around</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-bold mb-4 text-white uppercase tracking-wider">What Families Are Saying</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Quote size={20} className="shrink-0 mt-1" style={{ color: brand.secondary }} />
                  <div>
                    <p className="text-xs italic leading-relaxed opacity-90">"The team is very polite and accommodating, and I appreciate the texts as well. We love being La Necar customers!"</p>
                    <p className="text-xs font-bold mt-2">— Alex, Dad</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Quote size={20} className="shrink-0 mt-1" style={{ color: brand.secondary }} />
                  <div>
                    <p className="text-xs italic leading-relaxed opacity-90">"As a parent, I genuinely appreciate the exceptional kindness, patience and care my child receives from her driver. She consistently ensures my daughter feels safe and supported. This gives me peace of mind."</p>
                    <p className="text-xs font-bold mt-2">— Emma, Mom</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Quote size={20} className="shrink-0 mt-1" style={{ color: brand.secondary }} />
                  <div>
                    <p className="text-xs italic leading-relaxed opacity-90">"I'm so satisfied with La Necar transportation. The driver is always on time to pick up my child, both at home and at the program which makes everything smooth."</p>
                    <p className="text-xs font-bold mt-2">— Olivia, Mom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/20 p-10 flex justify-between items-center z-10">
            <div className="space-y-2">
              <h4 className="font-bold text-lg mb-2" style={{ color: brand.secondary }}>Contact Us Today</h4>
              <p className="flex items-center gap-2 text-sm"><Phone size={16}/> +1 855-202-9967</p>
              <p className="flex items-center gap-2 text-sm"><Mail size={16}/> services@lanecarlogisticsllc.com</p>
              <p className="flex items-center gap-2 text-sm"><Globe size={16}/> lanecarlogisticsllc.com</p>
            </div>
            <div className="bg-white p-3 rounded flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-black flex items-center justify-center font-mono text-[8px] text-black">
                (Barcode)
              </div>
            </div>
          </div>
        </div>


        {/* --- PAGE 1: FRONT COVER (Right Side) --- */}
        <div className="w-[595px] h-full relative flex flex-col bg-white">
          <div className="h-6 w-full" style={{ backgroundColor: brand.secondary }}></div>
          <div className="absolute top-0 right-0 w-32 h-32" style={{ backgroundColor: brand.primary, clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>

          <div className="p-14 flex-1 flex flex-col justify-center relative z-10">
            <h4 className="font-bold tracking-widest uppercase text-sm mb-4" style={{ color: brand.secondary }}>
              La Necar Logistics
            </h4>
            <h1 className="text-5xl font-black leading-[1.1] mb-6" style={{ color: brand.primary }}>
              Supporting Safe, Reliable Transit for Individuals with Intellectual and Developmental Disabilities (IDD)
            </h1>
            
            <div className="w-16 h-2 mb-8" style={{ backgroundColor: brand.secondary }}></div>

            <h2 className="text-2xl font-bold text-gray-800 leading-snug mb-10">
              What Families and Caregivers Must Know Before Selecting a Transportation Provider
            </h2>

            <div className="bg-gray-50 p-8 border-l-4" style={{ borderColor: brand.primary }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: brand.primary }}>Transportation Isn't Just a Ride,</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                It's an opportunity to participate in daily life with safety and dignity. That's why we created this guide; to help families make confident decisions when arranging rides for the individuals they support.
              </p>
            </div>
          </div>

          <div className="h-[35%] w-full relative bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200" 
              alt="Caregiver assisting individual"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-14 right-14">
              <div className="bg-white/95 backdrop-blur py-3 px-6 inline-block rounded-lg shadow-xl border-b-4" style={{ borderColor: brand.secondary }}>
                <p className="font-bold text-sm uppercase tracking-wide" style={{ color: brand.primary }}>A Guide for Families & Support Coordinators</p>
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
        <div className="w-[595px] h-full relative p-14 flex flex-col bg-[#f8fafc]">
          <div className="mb-12">
            <h2 className="text-4xl font-black uppercase leading-none" style={{ color: brand.primary }}>
              5 Key Factors <br/> <span style={{ color: brand.secondary }}>To Consider</span>
            </h2>
            <p className="mt-4 font-bold text-gray-600 text-lg leading-snug">
              Essential criteria for ensuring supportive and dignified IDD Transportation
            </p>
          </div>

          {/* Factor 1 */}
          <div className="relative mb-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="absolute -top-6 -left-4 text-7xl font-black opacity-10" style={{ color: brand.primary }}>01</div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: brand.primary }}>
              <Users size={28} style={{ color: brand.secondary }} />
              1. Trained, Specialized Drivers
            </h3>
            <p className="text-gray-700 mb-4 text-sm font-medium">
              To support the well-being, and dignity of your individual during rides, look out for drivers who are trained to:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: brand.secondary }} />
                <span className="text-sm text-gray-700 leading-tight">Recognize and respond to unique communication needs, including non-verbal methods</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: brand.secondary }} />
                <span className="text-sm text-gray-700 leading-tight">Manage anxiety, behavioral challenges, or sensory sensitivities professionally</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: brand.secondary }} />
                <span className="text-sm text-gray-700 leading-tight">Ensure consistent routines during transit to support predictability</span>
              </li>
            </ul>
          </div>

          {/* Factor 2 */}
          <div className="relative mb-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="absolute -top-6 -left-4 text-7xl font-black opacity-10" style={{ color: brand.primary }}>02</div>
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-3" style={{ color: brand.primary }}>
              <ShieldCheck size={28} style={{ color: brand.secondary }} />
              2. Driver Retention
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Consistency supports predictable routines for your individual. Look out for providers with high driver retention rates, as this often leads to smoother trips and greater confidence for families.
            </p>
          </div>

          {/* Factor 3 */}
          <div className="relative bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="absolute -top-6 -left-4 text-7xl font-black opacity-10" style={{ color: brand.primary }}>03</div>
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-3" style={{ color: brand.primary }}>
              <Navigation size={28} style={{ color: brand.secondary }} />
              3. Visibility Into Every Trip
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Knowing where your individual is in transit, and who to contact when you have a concern is real peace of mind. Ensure providers can deliver:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brand.secondary }}></div>
                <span className="text-sm text-gray-700 font-medium">Real-time GPS tracking</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brand.secondary }}></div>
                <span className="text-sm text-gray-700 font-medium">Instant notifications for pickup and drop-off</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brand.secondary }}></div>
                <span className="text-sm text-gray-700 font-medium">Direct communication with drivers and live support staff</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- PAGE 3: INSIDE RIGHT (Right Side) --- */}
        <div className="w-[595px] h-full relative p-14 flex flex-col bg-white">
          
          {/* Factor 4 */}
          <div className="relative mb-12">
            <div className="absolute -top-10 -left-6 text-9xl font-black opacity-5" style={{ color: brand.primary }}>04</div>
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4 relative z-10" style={{ color: brand.primary }}>
              <span className="bg-[#f8fafc] p-3 rounded-lg"><Clock size={32} style={{ color: brand.secondary }} /></span>
              4. Accessible, Sensory Vehicles
            </h3>
            
            <div className="pl-4 border-l-4 mb-6" style={{ borderColor: brand.secondary }}>
              <p className="text-gray-700 leading-relaxed font-medium">
                The transit environment significantly impacts how an individual arrives at their destination. A suitable vehicle is:
              </p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="bg-gray-50 p-4 rounded-lg flex items-start gap-4">
                <div className="mt-1" style={{ color: brand.secondary }}><CheckCircle2 size={20} /></div>
                <div>
                  <strong className="block text-gray-900 mb-1">Wheelchair Accessible:</strong>
                  <span className="text-sm text-gray-600">Equipped with reliable lifts or ramps and proper securement systems (e.g., Q-Straint) for foldable and non-foldable wheelchairs.</span>
                </div>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg flex items-start gap-4">
                <div className="mt-1" style={{ color: brand.secondary }}><CheckCircle2 size={20} /></div>
                <div>
                  <strong className="block text-gray-900 mb-1">Sensory-Friendly:</strong>
                  <span className="text-sm text-gray-600">Clean, climate-controlled, and designed to minimize sensory overload.</span>
                </div>
              </li>
            </ul>
            
            <p className="text-sm text-gray-700 leading-relaxed bg-blue-50/50 p-5 rounded-xl font-medium border border-blue-100">
              <strong style={{ color: brand.primary }}>Bonus Tip:</strong> Providers that coordinate with third-party ride-share companies (like Uber Health) can offer flexible alternatives for eligible individuals aged 21 and above, ensuring continuous mobility support at all times.
            </p>
          </div>

          {/* Factor 5 */}
          <div className="relative mt-auto bg-slate-900 text-white p-10 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white"><circle cx="50" cy="50" r="50" /></svg>
            </div>
            
            <div className="absolute -top-10 -left-6 text-9xl font-black opacity-10 text-white">05</div>
            
            <h3 className="text-3xl font-black mb-4 relative z-10 flex items-center gap-4">
              <ShieldCheck size={36} style={{ color: brand.secondary }} />
              5. Safety First, Always
            </h3>
            <p className="text-slate-300 leading-relaxed relative z-10 font-medium">
              At La Necar Logistics, we train our drivers to recognize person-centered regulation needs and adjust support to promote comfort and safety during rides.
            </p>
            <div className="w-12 h-1 mt-6 mb-6 relative z-10" style={{ backgroundColor: brand.secondary }}></div>
            <p className="text-slate-300 leading-relaxed relative z-10">
              With specialized expertise in behavioral and communication support, our CPR-certified drivers ensure every rider is treated with respect, dignity, and care.
            </p>
          </div>
          
        </div>
      </div>

    </div>
  );
}