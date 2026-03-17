'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  Download, Phone, Globe, Mail, Quote, 
  ShieldCheck, Users, Navigation, 
  Car, FileText, CheckCircle2
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
    primary: '#000f83',   // Deep Blue
    secondary: '#f5ab1b', // Amber/Gold
    dark: '#1e293b', 
    light: '#f8fafc',
    white: '#ffffff',
  };

  const images = {
    hero: "https://infinitelovinghands.com/wp-content/uploads/2025/07/a-caregiver-who-puts-an-elderly-person-in-a-long-t-2025-03-13-23-31-57-utc-scaled.jpg",
    caring: "https://elderaffairs.org/wp-content/uploads/elder-transportation-scaled.jpeg",
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
          scale: 3, 
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        if (pageNum > 1) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, 420, 297);
      };

      await capturePage(sheet1Ref, 1);
      await capturePage(sheet2Ref, 2);
      pdf.save('La_Necar_Main_Brochure_A3.pdf');
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
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 border-r border-dashed border-gray-300 z-50"></div>

        {/* --- BACK COVER (Left Side) --- */}
        <div className="w-[595px] h-full relative flex flex-col text-white" style={{ backgroundColor: brand.primary }}>
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current"><polygon points="100,0 100,100 0,0" /></svg>
          </div>

          <div className="p-12 flex-1 flex flex-col z-10 justify-between">
            
            {/* Top: Headline */}
            <div>
              <h2 className="text-4xl font-extrabold leading-tight mb-2">
                Your partner in <br/>
                <span style={{ color: brand.secondary }}>dependable IDD Transport</span>
              </h2>
              <div className="w-20 h-1.5 mb-8 mt-4" style={{ backgroundColor: brand.secondary }}></div>
            </div>

            {/* Middle 1: Impact */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-wider">Our Impact</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 p-4 rounded-lg border border-white/20 text-center">
                  <span className="block text-xl font-black mb-1" style={{ color: brand.secondary }}>280,000+</span>
                  <p className="text-[10px] uppercase tracking-widest opacity-90 leading-tight">miles in 2025</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/20 text-center">
                  <span className="block text-xl font-black mb-1" style={{ color: brand.secondary }}>18,000+</span>
                  <p className="text-[10px] uppercase tracking-widest opacity-90 leading-tight">successful trips</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/20 text-center">
                  <span className="block text-xl font-black mb-1" style={{ color: brand.secondary }}>95%</span>
                  <p className="text-[10px] uppercase tracking-widest opacity-90 leading-tight">on‑time performance</p>
                </div>
              </div>
            </div>

            {/* Middle 2: Testimonials */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-wider">Hear From Families</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Quote size={20} className="shrink-0 mt-1" style={{ color: brand.secondary }} />
                  <div>
                    <p className="text-sm italic leading-relaxed opacity-90">“The team is very polite and accommodating, and I appreciate the texts as well. We love being La Necar customers.”</p>
                    <p className="text-xs font-bold mt-2 uppercase tracking-wide">- Alex, Dad</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Quote size={20} className="shrink-0 mt-1" style={{ color: brand.secondary }} />
                  <div>
                    <p className="text-sm italic leading-relaxed opacity-90">"As a parent, I genuinely appreciate the exceptional kindness, patience, and care my child receives from her driver. She consistently ensures my daughter feels safe and supported. This gives me peace of mind."</p>
                    <p className="text-xs font-bold mt-2 uppercase tracking-wide">- Emma, Mom</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Quote size={20} className="shrink-0 mt-1" style={{ color: brand.secondary }} />
                  <div>
                    <p className="text-sm italic leading-relaxed opacity-90">"I’m so satisfied with La Necar transportation. The driver is always on time to pick up my child, both at home and at the program, which makes everything smooth."</p>
                    <p className="text-xs font-bold mt-2 uppercase tracking-wide">- Olivia, Mom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Contact Block */}
          <div className="bg-black/20 px-12 py-8 flex justify-between items-center z-10 border-t border-white/10">
            <div className="space-y-2">
              <h4 className="font-bold text-xl mb-2" style={{ color: brand.secondary }}>Contact Us Today</h4>
              <p className="flex items-center gap-3 text-sm font-medium"><Phone size={16}/> +1 855-202-9967</p>
              <p className="flex items-center gap-3 text-sm font-medium"><Mail size={16}/> services@lanecarlogisticsllc.com</p>
              <p className="flex items-center gap-3 text-sm font-medium"><Globe size={16}/> lanecarlogisticsllc.com</p>
            </div>
            <div className="bg-white p-2 rounded flex flex-col items-center justify-center h-[72px] w-[72px]">
              <div className="w-full h-full border-2 border-black flex items-center justify-center font-mono text-[9px] text-black">
                (Barcode)
              </div>
            </div>
          </div>
        </div>

        {/* --- FRONT COVER (Right Side) --- */}
        <div className="w-[595px] h-full relative flex flex-col bg-white">
          <div className="h-4 w-full" style={{ backgroundColor: brand.secondary }}></div>
          <div className="absolute top-0 right-0 w-24 h-24" style={{ backgroundColor: brand.primary, clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>

          <div className="px-12 pt-16 pb-12 flex-1 flex flex-col relative z-10">
            {/* CORPORATE LOGO SPACE */}
            <div className="mb-12 w-48 h-16 relative">
              <img src="/logo.png" alt="La Necar Logistics Logo" className="w-full h-full object-contain object-left" />
            </div>

            <h1 className="text-5xl font-black leading-[1.1] mb-6" style={{ color: brand.primary }}>
              IDD TRANSPORTATION <br/> SERVICE
            </h1>
            
            <div className="w-24 h-2 mb-8" style={{ backgroundColor: brand.secondary }}></div>

            <h2 className="text-2xl font-bold text-gray-800 leading-snug">
              What Families & Caregivers Must Know Before Selecting a Transport Provider
            </h2>
          </div>

          {/* Hero Image Bottom Area */}
          <div className="h-[45%] w-full relative bg-gray-200">
            <img 
              src={images.hero} 
              alt="Caregiver assisting individual"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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

        {/* --- INSIDE LEFT (Left Side): 5 Key Factors --- */}
        <div className="w-[595px] h-full relative p-12 flex flex-col bg-[#f8fafc]">
          
          <div className="mb-8 border-b-2 border-gray-200 pb-4">
            <h2 className="text-3xl font-black uppercase leading-tight" style={{ color: brand.primary }}>
              5 KEY FACTORS TO CONSIDER:
            </h2>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            
            {/* Factor 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center shadow-sm bg-white border border-gray-100">
                <Users size={20} style={{ color: brand.primary }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1" style={{ color: brand.primary }}>1. Trained, Specialized Drivers</h3>
                <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                  Drivers should be able to understand diverse communication needs, manage sensory sensitivities, and maintain consistent routines that support comfort, dignity, and predictability.
                </p>
              </div>
            </div>

            {/* Factor 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center shadow-sm bg-white border border-gray-100">
                <ShieldCheck size={20} style={{ color: brand.primary }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1" style={{ color: brand.primary }}>2. DDD Standards</h3>
                <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                  The provider must follow all DDD-approved standards that protect the individual you support. This includes proper licensing, compliance with HIPAA, state regulations, and established safety protocols.
                </p>
              </div>
            </div>

            {/* Factor 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center shadow-sm bg-white border border-gray-100">
                <Navigation size={20} style={{ color: brand.primary }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1" style={{ color: brand.primary }}>3. Visibility Into Every Trip</h3>
                <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                  Look out for providers who offer real-time GPS tracking, pickup and drop-off notifications, and direct access to drivers or support staff. Knowing where your individual is or who to contact is real peace of mind.
                </p>
              </div>
            </div>

            {/* Factor 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center shadow-sm bg-white border border-gray-100">
                <FileText size={20} style={{ color: brand.primary }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1" style={{ color: brand.primary }}>4. Mileage Tracking</h3>
                <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                  Ensure the provider maintains and delivers accurate mileage records to support transparency, trip verification, and correct billing.
                </p>
              </div>
            </div>

            {/* Factor 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center shadow-sm bg-white border border-gray-100">
                <Car size={20} style={{ color: brand.primary }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1" style={{ color: brand.primary }}>5. Accessible, Sensory-Aware Rides</h3>
                <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                  Transportation should support both the physical and sensory needs of your individual. Ensure the provider offers wheelchair-accessible vehicles (WAVs) with spacious seating and a safe lift, as well as sensory-friendly interiors designed for comfort.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* --- INSIDE RIGHT (Right Side): Who We Are & Why Ride --- */}
        <div className="w-[595px] h-full relative p-12 flex flex-col bg-white">
          
          {/* Who We Are */}
          <div className="mb-8 p-6 rounded-lg bg-gray-50 border-l-4" style={{ borderColor: brand.secondary }}>
            <h3 className="text-xl font-black mb-2 uppercase tracking-wide" style={{ color: brand.primary }}>
              La Necar Logistics: Who We Are
            </h3>
            <p className="text-gray-700 leading-relaxed font-medium text-[13px]">
              La Necar Logistics provides reliable transportation for individuals with intellectual and developmental disabilities. We serve individuals in all counties in New Jersey and surrounding areas with door-to-door rides that can be used for work, medical appointments, recreational activities, therapy, and community access.
            </p>
          </div>

          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-black mb-5 uppercase tracking-wide border-b-2 border-gray-100 pb-2" style={{ color: brand.primary }}>
              WHY RIDE WITH LA NECAR
            </h3>

            <div className="flex flex-col gap-5 flex-1 justify-center">
              
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: brand.secondary }} />
                <div>
                  <h4 className="font-bold text-[15px] text-gray-900 mb-0.5">Full Trip Visibility</h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    We monitor all our vehicles in real-time and provide instant ride updates on pickup & drop‑off, keeping families and caregivers reassured every step of the way.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: brand.secondary }} />
                <div>
                  <h4 className="font-bold text-[15px] text-gray-900 mb-0.5">Third-party Ride-Share Coordination</h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    La Necar Logistics partners with third-party ride-share services such as Uber Health to provide transportation for eligible individuals aged 21 and above, supporting flexible mobility.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: brand.secondary }} />
                <div>
                  <h4 className="font-bold text-[15px] text-gray-900 mb-0.5">Wheelchair Accessibility/Sensory-Awareness</h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    Our spacious wheelchair-accessible and sensory-friendly vehicles are designed to meet the unique needs of every individual, ensuring comfortable travel and steady community engagement.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: brand.secondary }} />
                <div>
                  <h4 className="font-bold text-[15px] text-gray-900 mb-0.5">Trained, Specialized Drivers</h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    All La Necar drivers are CPR certified and trained to recognize person-centered regulation needs and adjust support to promote comfort and safety during rides.
                  </p>
                </div>
              </div>

            </div>
          </div>
          
          {/* Bottom supporting image */}
          <div className="h-32 mt-6 rounded-lg overflow-hidden relative shadow-sm">
            <img 
              src={images.caring} 
              alt="Professional transportation services" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

        </div>
      </div>

    </div>
  );
}