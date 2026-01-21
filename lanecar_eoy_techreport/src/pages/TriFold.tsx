'use client';

import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { 
  Download, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Users, 
  HeartHandshake, 
  Phone,
  Globe, 
  Quote, 
  CheckCircle2,
  Car,
  Trophy,
  Mail,
  Image,
  ShieldQuestionIcon,
  ShieldQuestion,
  FileQuestion
} from 'lucide-react';

const TriFold = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // --- Brand Configuration ---
  const brand = {
    primary: '#000f83',   // Deep Blue
    secondary: '#f5ab1b', // Amber/Gold
    dark: '#1e293b',      // Slate 800
    light: '#f8fafc',     // Slate 50
    white: '#ffffff',
  };

  // --- Images ---
  const images = {
    hero: "https://infinitelovinghands.com/wp-content/uploads/2025/07/a-caregiver-who-puts-an-elderly-person-in-a-long-t-2025-03-13-23-31-57-utc-scaled.jpg",
    safety: "https://brodaseating.com/wp-content/uploads/2025/03/BRO_BecomeNEMTDriver_Blog_bestpractice.jpg",
    gps: "https://www.angelsense.com/wp-content/uploads/2021/01/10-min2.jpg",
    accessible: "/images/wheelchair.jpg",
    family: "https://cdn.prod.website-files.com/63982b47e742b8ffdf13610b/66d6240535007e91244bf13f_49.jpg",
    caring: "/images/bg_img.jpg",
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'LaNecar_Trifold_Brochure',
    pageStyle: `
      @page { size: A4 landscape; margin: 0; }
      @media print { 
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .page-break { page-break-after: always; }
      }
    `,
  } as any);

  // Download page as JPG
  const downloadPageAsJPG = async (pageRef: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!pageRef.current) return;
    
    try {
      const canvas = await html2canvas(pageRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `${filename}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    } catch (error) {
      console.error('Error generating JPG:', error);
    }
  };

  // Helper for Panel Headers
  const PanelHeader = ({ title, icon: Icon }: { title: string, icon?: any }) => (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b-2" style={{ borderColor: brand.secondary }}>
      {Icon && <Icon size={20} style={{ color: brand.primary }} />}
      <h3 className="font-bold uppercase tracking-wider text-gray-800 text-sm">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-10 font-sans">
      
      {/* --- Control Bar --- */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
        <button
          onClick={() => handlePrint()}
          className="flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl transition-all transform hover:scale-105"
          style={{ backgroundColor: brand.secondary, color: brand.primary }}
        >
          <Download size={20} strokeWidth={2.5} />
          <span className="font-bold text-base">Download Trifold PDF</span>
        </button>
        <button
          onClick={() => downloadPageAsJPG(page1Ref, 'LaNecar_Trifold_Outside')}
          className="flex items-center gap-3 px-6 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 bg-white border-2"
          style={{ borderColor: brand.primary, color: brand.primary }}
        >
          <Image size={18} />
          <span className="font-bold text-xs">Page 1 JPG</span>
        </button>
        <button
          onClick={() => downloadPageAsJPG(page2Ref, 'LaNecar_Trifold_Inside')}
          className="flex items-center gap-3 px-6 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 bg-white border-2"
          style={{ borderColor: brand.primary, color: brand.primary }}
        >
          <Image size={18} />
          <span className="font-bold text-xs">Page 2 JPG</span>
        </button>
      </div>

      {/* --- PRINTABLE CONTENT AREA --- */}
      {/* Width set to A4 Landscape (297mm) */}
      <div ref={componentRef} className="w-[297mm] bg-white shadow-2xl overflow-hidden text-xs leading-relaxed">
        
        {/* ================= SIDE 1: OUTER SIDE ================= */}
        {/* Layout: [ Inside Flap ] | [ Back Cover ] | [ Front Cover ] */}
        <div ref={page1Ref} className="w-full h-[210mm] flex page-break">
          
          {/* PANEL 5: INSIDE FLAP (Why Ride With Us) */}
          <div className="w-1/3 h-full p-6 bg-gray-50 flex flex-col border-r border-gray-100 relative">
            <PanelHeader title="Why Ride With Us" icon={FileQuestion} />
            
            <div className="flex-1 flex flex-col justify-between">
              {/* Safety First */}
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4" style={{ borderColor: brand.primary }}>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="text-green-600" size={18} />
                  <h4 className="font-bold text-[12px] text-gray-800">Safety First</h4>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Every La Necar driver is carefully vetted, trained, and CPR-certified. With specialized expertise in behavioral and communication support, our drivers ensure every rider is treated with respect, dignity, and care.
                </p>
              </div>

              {/* Full Trip Visibility */}
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4" style={{ borderColor: brand.secondary }}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin style={{ color: brand.secondary }} size={18} />
                  <h4 className="font-bold text-[12px] text-gray-800">Full Trip Visibility</h4>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  La Necar provides real-time ride monitoring and instant ride updates on pickup & drop‑off, keeping families confident and reassured every step of the way.
                </p>
              </div>

              {/* 24/7 Transportation */}
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4" style={{ borderColor: brand.primary }}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="text-blue-500" size={18} />
                  <h4 className="font-bold text-[12px] text-gray-800">24/7 Transportation</h4>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  We offer round-the-clock transportation coverage ensuring every rider gets where they need to be safely and on time.
                </p>
              </div>

              {/* Wheelchair Accessibility */}
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4" style={{ borderColor: brand.secondary }}>
                <div className="flex items-center gap-2 mb-2">
                  <Car style={{ color: brand.secondary }} size={18} />
                  <h4 className="font-bold text-[12px] text-gray-800">Wheelchair Accessibility & Sensory Aware</h4>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  La Necar provides inclusive and comfortable transportation for every mobility need, helping your loved one travel with dignity, confidence, and ease.
                </p>
              </div>

              {/* Driver Retention */}
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4" style={{ borderColor: brand.primary }}>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="text-green-600" size={18} />
                  <h4 className="font-bold text-[12px] text-gray-800">85% Driver Retention</h4>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  La Necar Logistics LLC achieved 85% driver retention over the past two years. Consistency your loved one can count on.
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200 text-[10px] text-gray-500 text-center italic">
              A DDD-approved provider serving NJ and its environs.
            </div>
          </div>

          {/* PANEL 6: BACK COVER (Contact Only - No Stats) */}
          <div className="w-1/3 h-full flex flex-col relative" style={{ backgroundColor: brand.primary }}>
            {/* Top decorative circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 bg-white"></div>
            
            <div className="flex-grow flex flex-col justify-center items-center text-center p-8 z-10">
               <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center mb-10 p-3">
                   <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
               </div>

               <h2 className="text-3xl font-bold text-white mb-4">Ready to Ride?</h2>
               <p className="text-blue-100 text-base mb-10 max-w-[240px] leading-relaxed">
                 Contact us today to schedule safe, dignified transportation for your loved one.
               </p>

               <div className="w-full space-y-5">
                 <div className="bg-white/15 backdrop-blur-md p-5 rounded-xl flex items-center gap-4 text-white border border-white/20">
                    <Phone size={28} className="text-amber-400" />
                    <div className="text-left">
                      <div className="text-[11px] opacity-70 uppercase font-semibold">Call Us 24/7</div>
                      <div className="font-black text-2xl">+1 855-202-9967</div>
                    </div>
                 </div>

                 <div className="bg-white/15 backdrop-blur-md p-5 rounded-xl flex items-center gap-4 text-white border border-white/20">
                    <Globe size={28} className="text-amber-400" />
                    <div className="text-left">
                      <div className="text-[11px] opacity-70 uppercase font-semibold">Visit Online</div>
                      <div className="font-black text-lg">lanecarlogisticsllc.com</div>
                    </div>
                 </div>

                 <div className="bg-white/15 backdrop-blur-md p-5 rounded-xl flex items-center gap-4 text-white border border-white/20">
                    <Mail size={28} className="text-amber-400" />
                    <div className="text-left">
                      <div className="text-[11px] opacity-70 uppercase font-semibold">Email Support</div>
                      <div className="font-bold text-base">services@lanecarlogisticsllc.com</div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Bottom Strip */}
            <div className="h-4 w-full" style={{ backgroundColor: brand.secondary }}></div>
          </div>

          {/* PANEL 1: FRONT COVER */}
          <div className="w-1/3 h-full relative flex flex-col bg-white">
             {/* Hero Image Top Half */}
             <div className="h-[50%] relative overflow-hidden">
                <img src={images.hero} alt="Caregiver" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
                
                {/* Badge */}
                <div className="absolute top-4 right-0 bg-amber-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-l-md shadow-md uppercase tracking-wider">
                  Family Resource Guide 2026
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h1 className="text-3xl font-extrabold leading-tight mb-2">
                    Supporting Safe, <br/>
                    <span className="text-amber-400">Reliable Transportation</span>
                  </h1>
                  <p className="text-[11px] font-light opacity-90">
                    For Individuals with Intellectual and Developmental Disabilities (IDD)
                  </p>
                </div>
             </div>

             {/* Bottom Half Content */}
             <div className="h-[50%] p-6 flex flex-col">
                {/* Top: Title */}
                <div>
                  <div className="w-16 h-1.5 mb-4" style={{ backgroundColor: brand.secondary }}></div>
                  <h2 className="text-lg font-bold text-gray-800 leading-tight">
                    What Families and Caregivers Must Know Before Selecting a Provider
                  </h2>
                </div>
                
                {/* Middle: Quote Block - vertically centered with equal margins */}
                <div className="flex-1 flex items-center py-4">
                  <div className="p-4 bg-gray-50 border-l-4 w-full" style={{ borderColor: brand.primary }}>
                    <h3 className="text-[13px] font-bold mb-2" style={{ color: brand.primary }}>Transportation Isn't Just a Ride</h3>
                    <p className="text-gray-600 text-[11px] italic leading-relaxed">
                      "For the loved one you support, every trip is an opportunity to participate in daily life safely and with dignity. This brochure is designed to help families make confident decisions when arranging transportation for individuals with IDD."
                    </p>
                  </div>
                </div>
                
                {/* Bottom: Logo and Company Name - same level, vertically aligned */}
                <div className="flex justify-between items-center">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1">
                     <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                   </div>
                   <div className="text-right flex flex-col justify-center">
                     <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">La Necar Logistics LLC</p>
                     <p className="text-[10px] text-gray-400">lanecarlogisticsllc.com</p>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* ================= SIDE 2: INNER SIDE ================= */}
        {/* Layout: [ Left Panel ] | [ Center Panel ] | [ Right Panel ] */}
        <div ref={page2Ref} className="w-full h-[210mm] flex page-break bg-white">
          
          {/* PANEL 2: INSIDE LEFT (Factors 1, 2, 3 + Company Image & Description) */}
          <div className="w-1/3 h-full p-6 border-r border-gray-100 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">5 Key Factors to Consider</h2>
            <p className="text-[11px] text-gray-500 mb-4">Essential Criteria for ensuring safety and dignity in IDD transportation.</p>

            {/* Factor 1 */}
            <div className="mb-4">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: brand.primary }}>
                    <Users size={22} />
                  </div>
                  <h4 className="font-bold text-sm" style={{ color: brand.primary }}>1. DDD-Approved, Specialized Drivers</h4>
               </div>
               <p className="text-[11px] text-gray-600 mb-2 leading-relaxed">
                 Safe, dignified transportation begins with ensuring drivers are vetted and trained to:
               </p>
               <ul className="space-y-0.5 ml-1">
                 <li className="flex items-start gap-2">
                   <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: brand.secondary }}/>
                   <span className="text-[10px] text-gray-500">Recognize and respond to diverse communication needs, including non-verbal methods</span>
                 </li>
                 <li className="flex items-start gap-2">
                   <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: brand.secondary }}/>
                   <span className="text-[10px] text-gray-500">Manage anxiety, behavioral challenges, or sensory sensitivities professionally and calmly</span>
                 </li>
                 <li className="flex items-start gap-2">
                   <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: brand.secondary }}/>
                   <span className="text-[10px] text-gray-500">Ensure consistent routines during transit to reduce stress and support predictability</span>
                 </li>
               </ul>
            </div>

            {/* Factor 2 */}
            <div className="mb-4">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: brand.secondary }}>
                    <HeartHandshake size={22} />
                  </div>
                  <h4 className="font-bold text-sm" style={{ color: brand.primary }}>2. Driver Retention & Consistency</h4>
               </div>
               <p className="text-[11px] text-gray-600 leading-relaxed">
                 Consistency supports predictable routines for your loved one. Look out for providers with high driver retention rates, as this often leads to smoother trips and greater confidence for families.
               </p>
            </div>

            {/* Factor 3 */}
            <div className="mb-3">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: brand.primary }}>
                    <MapPin size={22} />
                  </div>
                  <h4 className="font-bold text-sm" style={{ color: brand.primary }}>3. Visibility Into Every Trip</h4>
               </div>
               <p className="text-[11px] text-gray-600 mb-2 leading-relaxed">
                 Knowing where your child is in transit, and who to contact when you have a concern is real peace of mind. Ensure providers can deliver:
               </p>
               <ul className="space-y-0.5 ml-1">
                 <li className="flex items-start gap-2">
                   <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: brand.secondary }}/>
                   <span className="text-[10px] text-gray-500">Real-time GPS tracking</span>
                 </li>
                 <li className="flex items-start gap-2">
                   <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: brand.secondary }}/>
                   <span className="text-[10px] text-gray-500">Instant pickup/drop-off notifications</span>
                 </li>
                 <li className="flex items-start gap-2">
                   <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: brand.secondary }}/>
                   <span className="text-[10px] text-gray-500">Direct communication with drivers and live support staff</span>
                 </li>
               </ul>
            </div>

            {/* Company Image & Description - REDUCED HEIGHT */}
            <div className="mt-auto">
              <div className="h-24 relative overflow-hidden rounded-lg mb-2">
                <img src={images.caring} alt="La Necar caring service" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gray-900/60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold text-center px-4">La Necar Logistics LLC</h3>
                </div>
              </div>
              <p className="text-[9px] text-gray-600 text-center leading-relaxed">
                A DDD-approved provider serving NJ and its environs. We provide trusted transportation for school, work, medical appointments, and community access.
              </p>
            </div>
          </div>

          {/* PANEL 3: INSIDE CENTER (Our Impact + Factors 4 & 5 + CTA) */}
          <div className="w-1/3 h-full p-6 border-r border-gray-100 flex flex-col bg-gray-50/50">
            
            {/* OUR IMPACT */}
            <div className="w-full mb-6">
              <h3 className="text-lg font-bold uppercase tracking-widest mb-4 text-center" style={{ color: brand.primary }}>Our Impact</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center rounded-xl px-4 py-2 shadow-sm" style={{ backgroundColor: brand.primary }}>
                  <div className="text-2xl font-bold text-white">280k+</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/70">Miles in 2025</div>
                </div>
                <div className="text-center rounded-xl px-4 py-2 shadow-sm" style={{ backgroundColor: brand.secondary }}>
                  <div className="text-2xl font-bold text-white">18k+</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/80">Successful Trips</div>
                </div>
                <div className="text-center rounded-xl px-4 py-2 shadow-sm" style={{ backgroundColor: brand.primary }}>
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/70">On-Time Perf.</div>
                </div>
              </div>
            </div>

            {/* Factor 4 */}
            <div className="mb-5">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: brand.secondary }}>
                    <Car size={22} />
                  </div>
                  <h4 className="font-bold text-sm" style={{ color: brand.primary }}>4. Accessible Rides</h4>
               </div>
               <p className="text-[11px] text-gray-600 mb-2 leading-relaxed">
                 Transportation should accommodate both the physical and sensory needs of your loved one. When evaluating providers, consider whether they offer:
               </p>
               <ul className="space-y-2 ml-1">
                 <li className="flex items-start gap-2">
                   <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: brand.secondary }}/>
                   <span className="text-[10px] text-gray-500">Wheelchair‑Accessible Vehicles (WAVs)</span>
                 </li>
                 <li className="flex items-start gap-2">
                   <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: brand.secondary }}/>
                   <span className="text-[10px] text-gray-500">Sensory‑friendly interiors, including climate control and reduced noise</span>
                 </li>
                 <li className="flex items-start gap-2">
                   <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: brand.secondary }}/>
                   <span className="text-[10px] text-gray-500">Regular safety inspections to ensure dependable service</span>
                 </li>
               </ul>
            </div>

            {/* Factor 5 */}
            <div className="mb-5">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: brand.primary }}>
                    <Clock size={22} />
                  </div>
                  <h4 className="font-bold text-sm" style={{ color: brand.primary }}>5. Quick Resolution</h4>
               </div>
               <p className="text-[11px] text-gray-600 leading-relaxed">
                 Even with careful planning, challenges can occur during transit. Select a provider with a responsive support team, capable of addressing concerns immediately.
               </p>
            </div>

            {/* Yellow CTA - fills remaining space */}
            <div className="mt-auto flex-1 flex flex-col justify-center p-6 rounded-xl" style={{ backgroundColor: brand.secondary }}>
              <h4 className="text-xl font-black uppercase leading-tight mb-4" style={{ color: brand.primary }}>
                Empowering Independence Starts Here.
              </h4>
              <p className="text-[12px] text-blue-900/80 mb-5 leading-relaxed">
                Contact us today to schedule safe, dignified transportation for your loved one.
              </p>
              <div className="flex flex-col gap-3" style={{ color: brand.primary }}>
                <div className="flex items-center gap-3">
                  <Phone size={20} />
                  <span className="font-black text-xl">+1 855-202-9967</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={20} />
                  <span className="font-bold text-sm">lanecarlogisticsllc.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 4: INSIDE RIGHT (Testimonials) */}
          <div className="w-1/3 h-full p-6 flex flex-col">
             
             <h3 className="text-xl font-bold mb-4 text-gray-800">What NJ Families Are Saying</h3>

             {/* Testimonial 1 */}
             <div className="mb-4">
                <div className="relative bg-blue-50 p-5 rounded-xl">
                   <Quote size={24} className="text-blue-200 absolute top-3 right-3" />
                   <p className="text-[12px] text-gray-700 italic mb-3 leading-relaxed relative z-10">
                     "As a parent, I genuinely appreciate the exceptional kindness, patience and care my child receives from her driver. She consistently ensures my daughter feels safe and supported. This gives me peace of mind."
                   </p>
                   <p className="font-bold text-[11px]" style={{ color: brand.primary }}>- Dad, NJ</p>
                </div>
             </div>

             {/* Testimonial 2 */}
             <div className="mb-4">
                <div className="relative bg-amber-50 p-5 rounded-xl">
                   <Quote size={24} className="text-amber-200 absolute top-3 right-3" />
                   <p className="text-[12px] text-gray-700 italic mb-3 leading-relaxed relative z-10">
                     "I'm very grateful to the driver for her punctuality and how she handles my daughter during rides. She manages my daughter's behavior with care."
                   </p>
                   <p className="font-bold text-[11px]" style={{ color: brand.secondary }}>- Mom, NJ</p>
                </div>
             </div>
            
            {/* Testimonial 3 */}
             <div className="mb-4">
                <div className="relative bg-blue-50 p-5 rounded-xl">
                   <Quote size={24} className="text-blue-200 absolute top-3 right-3" />
                   <p className="text-[12px] text-gray-700 italic mb-3 leading-relaxed relative z-10">
                     "I'm so satisfied with La Necar transportation. The driver is always on time to pick up my child, both at home and at the program, which makes things so much smoother."
                   </p>
                   <p className="font-bold text-[11px]" style={{ color: brand.primary }}>- Mom, NJ</p>
                </div>
             </div>

             {/* Family Image - REDUCED HEIGHT */}
             <div className="h-64 relative rounded-xl overflow-hidden mt-auto">
               <img src={images.family} alt="Happy family" className="w-full h-full object-cover" />
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TriFold;