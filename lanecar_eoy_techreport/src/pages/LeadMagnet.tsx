'use client';

import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { 
  Download, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Users, 
  HeartHandshake, 
  Phone, 
  Mail, 
  Globe, 
  Quote, 
  CheckCircle2,
  Accessibility,
  Car
} from 'lucide-react';

const LeadMagnet = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // --- Brand Configuration ---
  const brand = {
    primary: '#000f83',   // Deep Blue
    secondary: '#f5ab1b', // Amber/Gold
    dark: '#1e293b',      // Slate 800 (Charcoal replacement)
    light: '#f8fafc',     // Slate 50 (Paper white)
    white: '#ffffff',
  };

  // --- Images ---
  const images = {
    hero: "https://infinitelovinghands.com/wp-content/uploads/2025/07/a-caregiver-who-puts-an-elderly-person-in-a-long-t-2025-03-13-23-31-57-utc-scaled.jpg",
    safety: "https://brodaseating.com/wp-content/uploads/2025/03/BRO_BecomeNEMTDriver_Blog_bestpractice.jpg",
    gps: "https://www.angelsense.com/wp-content/uploads/2021/01/10-min2.jpg",
    accessible: "https://wheelersvanrentals.com/wp-content/uploads/2021/10/accesible.jpg",
    family: "https://cdn.prod.website-files.com/63982b47e742b8ffdf13610b/66d6240535007e91244bf13f_49.jpg",
    caring: "https://elderaffairs.org/wp-content/uploads/elder-transportation-scaled.jpeg",
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Our_Compassionate_Logistics_Plan',
    pageStyle: `
      @page { size: A4 portrait; margin: 0; }
      @media print { 
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .page-break { page-break-after: always; }
      }
    `,
  } as any);

  // --- Components ---

  // 1. Geometric Header Strip (Recurring Motif)
  const HeaderStrip = ({ title, pageNum }: { title: string, pageNum: string }) => (
    <div className="w-full h-24 bg-white relative flex items-center justify-between px-12 border-b-4" style={{ borderColor: brand.secondary }}>
      <div className="flex items-center gap-4">
        <div className="h-12 w-2" style={{ backgroundColor: brand.primary }}></div>
        <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800">{title}</h2>
      </div>
      <span className="text-4xl font-bold opacity-10" style={{ color: brand.primary }}>{pageNum}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 font-sans">
      
      {/* --- Control Bar --- */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => handlePrint()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center gap-3 px-8 py-4 rounded-full shadow-2xl transition-all transform hover:scale-105"
          style={{ backgroundColor: brand.secondary, color: brand.primary }}
        >
          <Download size={24} strokeWidth={2.5} />
          <span className="font-bold text-lg">Download Guide (PDF)</span>
        </button>
      </div>

      {/* --- PRINTABLE CONTENT AREA --- */}
      <div ref={componentRef} className="w-[210mm] bg-white shadow-2xl overflow-hidden">
        
        {/* ================= PAGE 1: COVER ================= */}
        <div className="w-full h-[297mm] relative flex page-break">
          
          {/* Left Dark Sidebar (35% width) */}
          <div className="w-[35%] h-full relative flex flex-col justify-between p-12" style={{ backgroundColor: brand.primary }}>
            {/* Top Logo Area */}
            <div className="w-40 h-40 m-2 p-2 bg-white rounded-full flex items-center justify-center mb-12">
               <img src="/logo.png" alt="La Necar Logistics Logo" className="w-full h-full object-contain" />
            </div>

            {/* Vertical Title */}
            <div className="flex-grow relative">
               <div className="absolute top-20 -left-4 origin-bottom-left -rotate-90 whitespace-nowrap">
                  <h1 className="text-8xl font-black text-white opacity-10 tracking-widest uppercase">
                    GUIDE 2026
                  </h1>
               </div>
            </div>

            {/* Bottom Contact */}
            <div className="text-white text-l font-medium space-y-3">
                <div className="flex items-center gap-3">
                   <Phone size={18} />
                   <span className="text-lg font-light">+1 855-202-9967</span>
                </div>
                <div className="flex items-center gap-3">
                   <Globe size={18} />
                   <span className="text-lg font-light">lanecarlogisticsllc.com</span>
                </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 h-full bg-white relative flex flex-col justify-center p-16">
            
            {/* Hero Image in top right */}
            <div className="absolute top-0 right-0 left-0 w-175 h-72 overflow-hidden">
              <img src={images.hero} alt="Compassionate care" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10">
              <span className="inline-block py-1 px-3 rounded text-xs font-bold uppercase tracking-widest mb-6 text-white" style={{ backgroundColor: brand.secondary }}>
                Family Resource
              </span>
              
              <h1 className="text-5xl font-extrabold leading-tight mb-6 text-gray-900">
                Providing Safe, <br/>
                <span style={{ color: brand.primary }}>Reliable Transportation</span> <br/>
                for Individuals with IDD
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  IDD - Intellectual and Developmental Disabilities
                </p>

              <div className="w-24 h-2 mb-8" style={{ backgroundColor: brand.secondary }}></div>

              <h2 className="text-l text-gray-600 font-medium leading-relaxed max-w-md">
                What Families and Caregivers Must Know Before Selecting a Provider
              </h2>
            </div>

            {/* Bottom Quote Block */}
            <div className="absolute bottom-16 left-16 right-16 p-4 bg-gray-50 border-l-8" style={{ borderColor: brand.primary }}>
               <h3 className="text-lg font-bold mb-2" style={{ color: brand.primary }}>Transportation Isn't Just a Ride</h3>
               <p className="text-gray-600 text-sm italic">
                 "For the loved one you support, every trip is an opportunity to participate in daily life safely and with dignity. Transportation, when done right, supports connection, routine, and independence.<br /><br />That’s why we created this guide; to help families make confident decisions when arranging transportation for individuals with IDD."
               </p>
            </div>
          </div>
        </div>

        {/* ================= PAGE 2: KEY FACTORS (The "Guide") ================= */}
        <div className="w-full h-[297mm] relative flex flex-col bg-white page-break">
          <HeaderStrip title="Selection Guide" pageNum="02" />

          <div className="p-12 flex-grow flex flex-col gap-8">
            <div className="mb-4">
              <h3 className="text-3xl font-bold mb-2 text-gray-900">5 Key Factors to Consider</h3>
              <p className="text-gray-500">Essential criteria for ensuring safety and dignity.</p>
            </div>

            {/* Factor 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: brand.primary }}>
                <Users size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2" style={{ color: brand.primary }}>1. DDD-Approved, Specialized Drivers</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  To support the safety, well-being, & dignity of your loved one, drivers should be trained to:
                </p>
                <ul className="text-xs text-gray-500 space-y-1 ml-1">
                    <li className="flex items-center gap-2"><CheckCircle2 size={12} color={brand.secondary} /> Recognize and respond to diverse communication needs, including non-verbal methods</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={12} color={brand.secondary} /> Manage anxiety, behavioral challenges, or sensory sensitivities professionally and calmly</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={12} color={brand.secondary} /> Ensure consistent routines during transit to reduce stress and support predictability</li>
                </ul>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">Behavioral Support</span>
                   <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">Sensory Awareness</span>
                </div>
              </div>
            </div>

            {/* Factor 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: brand.secondary }}>
                <HeartHandshake size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2" style={{ color: brand.primary }}>2. Driver Retention & Consistency</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Consistency supports predictable routines for your loved one. Look out for providers with high driver retention rates, as this often leads to smoother trips and greater confidence for families.
                </p>
              </div>
            </div>

            {/* Factor 3 with image */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: brand.primary }}>
                <MapPin size={32} />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2" style={{ color: brand.primary }}>3. Visibility Into Every Trip</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  Knowing where your child is in transit, and who to contact when you have a concern is real peace of mind. Ensure providers can deliver:
                </p>
                <ul className="text-xs text-gray-500 space-y-1 ml-1">
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} color={brand.secondary}/> Real-time GPS tracking</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} color={brand.secondary}/> Instant pickup/drop-off notifications</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} color={brand.secondary}/> Direct communication with drivers and live support staff</li>
                </ul>
              </div>
            </div>

            {/* Factor 4 & 5 Combined Row */}
            <div className="grid grid-cols-2 gap-8 mt-4">
               <div className="bg-gray-50 p-6 rounded-2xl border-t-4" style={{ borderColor: brand.secondary }}>
                  <img src={images.accessible} alt="Accessible vehicle" className="w-full h-28 object-cover rounded-lg mb-4" />
                  <h4 className="font-bold text-lg mb-2">4. Accessible Rides</h4>
                  <p className="text-xs text-gray-600">
                    Transportation should accommodate both the physical and sensory needs of your loved one.
                    When evaluating providers, consider whether they offer:
                    <ul className="text-xs text-gray-500 space-y-1 ml-1">
                      <li className="flex items-center gap-2"><CheckCircle2 size={12} color={brand.secondary}/> Wheelchair‑Accessible Vehicles (WAVs) </li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={12} color={brand.secondary}/> Sensory‑friendly interiors, including climate control and reduced noise</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={12} color={brand.secondary}/> Regular safety inspections to ensure dependable service</li>
                    </ul>
                  </p>
               </div>
               <div className="bg-gray-50 p-6 rounded-2xl border-t-4" style={{ borderColor: brand.secondary }}>
                  <div className="mb-3" style={{ color: brand.primary }}><Clock size={150}/></div>
                  <h4 className="font-bold text-lg mb-2">5. Quick Resolution</h4>
                  <p className="text-xs text-gray-600">
                    Even with careful planning, challenges can occur during transit. Select a provider with a responsive support team, capable of addressing concerns immediately.
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* ================= PAGE 3: ABOUT LA NECAR ================= */}
        <div className="w-full h-[297mm] relative flex flex-col bg-white page-break">
          <HeaderStrip title="Our Profile" pageNum="03" />

          {/* Hero Section with real image */}
          <div className="w-full h-64 relative flex items-center px-12 overflow-hidden">
             <img src={images.caring} alt="La Necar caring service" className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gray-900/70"></div>
             
             <div className="relative z-10 text-white max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">La Necar Logistics LLC</h2>
                <p className="text-lg opacity-90 leading-relaxed">
                  A DDD-approved provider serving NJ and its environs. We provide trusted transportation for school, work, medical appointments, and community access.
                </p>
             </div>
          </div>

          {/* "Why Ride" Grid */}
          <div className="flex-grow p-12 bg-gray-50">
             <h3 className="text-3xl font-bold mb-12 uppercase tracking-widest text-center" style={{ color: brand.primary }}>Why Ride With Us</h3>
             
             <div className="grid grid-cols-2 gap-6">
                {/* Feature 1 with image */}
                <div className="bg-white p-6 shadow-sm border-l-4 mb-5" style={{ borderColor: brand.primary }}>
                   <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="text-green-600" size={24} />
                      <h4 className="font-bold text-lg text-gray-800">Safety First</h4>
                   </div>
                   <p className="text-sm text-gray-600">Every La Necar driver is carefully vetted, trained, and CPR-certified. With specialized expertise in behavioral and communication support, our drivers ensure every rider is treated with respect, dignity, and care.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white p-6 shadow-sm border-l-4 mb-5" style={{ borderColor: brand.secondary }}>
                   <div className="flex items-center gap-3 mb-3">
                      <MapPin style={{ color: brand.secondary }} size={24} />
                      <h4 className="font-bold text-lg text-gray-800">Full Trip Visibility</h4>
                   </div>
                   <p className="text-sm text-gray-600">La Necar provides real-time ride monitoring and instant ride updates on pickup & drop‑off, keeping families confident and reassured every step of the way.</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white p-6 shadow-sm border-l-4 mt-5" style={{ borderColor: brand.primary }}>
                   <div className="flex items-center gap-3 mb-3">
                      <Clock className="text-blue-500" size={24} />
                      <h4 className="font-bold text-lg text-gray-800">24/7 Transportation</h4>
                   </div>
                   <p className="text-sm text-gray-600">We offer round-the-clock transportation coverage ensuring every rider gets where they need to be safely and on time. </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white p-6 shadow-sm border-l-4 mt-5" style={{ borderColor: brand.secondary }}>
                   <div className="flex items-center gap-3 mb-3">
                      <Car style={{ color: brand.secondary }} size={24} />
                      <h4 className="font-bold text-lg text-gray-800">Wheelchair Accessibility and Sensory Aware Rides</h4>
                   </div>
                   <p className="text-sm text-gray-600">La Necar provides inclusive and comfortable transportation for every mobility need, helping your loved one travel with dignity, confidence, and ease.</p>
                </div>
             </div>
          </div>
        </div>

        {/* ================= PAGE 4: PROOF & CONTACT ================= */}
        <div className="w-full h-[297mm] relative flex flex-col bg-white">
           <HeaderStrip title="Our Impact" pageNum="04" />
           
           {/* Statistics Strip */}
           <div className="w-full py-10 px-12 flex justify-between items-center text-white" style={{ backgroundColor: brand.primary }}>
              <div className="text-center">
                 <div className="text-4xl font-bold mb-1 text-white">280k+</div>
                 <div className="text-xs uppercase tracking-widest opacity-80">Miles in 2025</div>
              </div>
              <div className="h-10 w-[1px] bg-white/30"></div>
              <div className="text-center">
                 <div className="text-4xl font-bold mb-1" style={{ color: brand.secondary }}>18k+</div>
                 <div className="text-xs uppercase tracking-widest opacity-80">Successful Trips</div>
              </div>
              <div className="h-10 w-[1px] bg-white/30"></div>
              <div className="text-center">
                 <div className="text-4xl font-bold mb-1 text-white">95%</div>
                 <div className="text-xs uppercase tracking-widest opacity-80">On-Time Perf.</div>
              </div>
           </div>

           {/* Testimonials with family image */}
           <div className="flex-grow p-12 flex gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-8 text-gray-800">What NJ Families Are Saying</h3>
                
                <div className="space-y-6">
                    {/* Testimonial 1 
                   <div className="flex gap-4">
                      <Quote size={25} className="text-gray-300 flex-shrink-0" />
                      <div>
                         <p className="text-sm text-gray-700 italic mb-2">
                           "The team is very polite and accommodating, and I appreciate the texts as well. We love being La Necar customers!"
                         </p>
                         <p className="font-bold text-sm" style={{ color: brand.primary }}>- Prent, NJ</p>
                      </div>
                   </div>*/}
                    
                    <div className="w-full h-[1px] bg-gray-200"></div>

                    {/* Testimonial 2 */}
                   <div className="flex gap-4">
                      <Quote size={40} className="text-gray-300 flex-shrink-0" />
                      <div>
                         <p className="text-xl text-gray-700 italic mb-2">
                           "As a parent, I genuinely appreciate the exceptional kindness, patience and care my child receives from her driver. She consistently ensures my daughter feels safe and supported. This gives me peace of mind."
                         </p>
                         <p className="font-bold text-sm" style={{ color: brand.primary }}>- Dad, NJ</p>
                      </div>
                   </div>

                   <div className="w-full h-[1px] bg-gray-200"></div>

                   {/* Testimonial 3 */}
                   <div className="flex gap-4">
                      <Quote size={40} className="text-gray-300 flex-shrink-0" />
                      <div>
                         <p className="text-xl text-gray-700 italic mb-2">
                           "I'm very grateful to the driver for her punctuality and how she handles my daughter during rides. She manages my daughter's behavior with care."
                         </p>
                         <p className="font-bold text-sm" style={{ color: brand.primary }}>- Mom, NJ</p>
                      </div>
                   </div>
                   
                   <div className="w-full h-[1px] bg-gray-200"></div>

                   {/* Testimonial 4 
                   <div className="flex gap-4">
                      <Quote size={25} className="text-gray-300 flex-shrink-0" />
                      <div>
                         <p className="text-sm text-gray-700 italic mb-2">
                           "I’m so satisfied with La Necar transportation. The driver is always on time to pick up my child, both at home and at the program, which makes things so much smoother."
                         </p>
                         <p className="font-bold text-sm" style={{ color: brand.primary }}>- Mom, NJ</p>
                      </div>
                   </div>*/}
                </div>
              </div>

              {/* Family image on the right */}
              <div className="w-64 flex-shrink-0">
                <img src={images.family} alt="Happy family" className="w-full h-full object-cover rounded-2xl shadow-lg" />
              </div>
           </div>

           {/* Bottom CTA / Contact - Geometric Footer */}
           <div className="h-64 relative flex">
              <div className="w-2/3 h-full p-12 text-white flex flex-col justify-center" style={{ backgroundColor: brand.secondary }}>
                 <h2 className="text-3xl font-black uppercase leading-none mb-6" style={{ color: brand.primary }}>
                    Empowering Independence <br/> Starts Here.
                 </h2>
                 <p className="text-blue-900/80 font-medium max-w-md">
                    Contact us today to schedule safe, dignified transportation for your loved one.
                 </p>
              </div>
              <div className="w-1/3 h-full p-8 flex flex-col justify-center gap-4 text-white" style={{ backgroundColor: brand.primary }}>
                 <div className="flex items-center gap-3">
                    <Phone size={18} />
                    <span className="text-lg font-light">+1 855-202-9967</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Globe size={18} />
                    <span className="text-lg font-light">lanecarlogisticsllc.com</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="text-md font-light">services@lanecarlogisticsllc.com</span>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default LeadMagnet;