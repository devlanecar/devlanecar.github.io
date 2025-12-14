'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Globe, Code, Palette, Download, BarChart3, TrendingUp, Users, MapPin, Eye } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { useReactToPrint } from 'react-to-print';

// --- Carousel Component ---
const ImageCarousel = ({ items }: { items: { title: string; desc: string; color: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <div 
        className="absolute inset-0 flex items-center justify-center transition-all duration-500"
        style={{ backgroundColor: items[currentIndex].color }}
      >
        <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm mx-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{items[currentIndex].title}</h3>
          <p className="text-gray-600">{items[currentIndex].desc}</p>
        </div>
      </div>
      
      <button 
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-md transition-colors z-10"
      >
        <ChevronLeft size={24} className="text-gray-800" />
      </button>
      
      <button 
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-md transition-colors z-10"
      >
        <ChevronRight size={24} className="text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {items.map((_, idx) => (
          <div 
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-gray-900 w-4' : 'bg-gray-400'}`} 
          />
        ))}
      </div>
    </div>
  );
};

const TechReport = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const componentRef = useRef<HTMLDivElement>(null);

  // Fixed: Updated to use contentRef for newer react-to-print versions
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Lane Car Logistics LLC - Technology Team Year-End Report 2025',
    // Ensure all styles are captured and page size is correct
    pageStyle: `
      @page { size: A4 landscape; margin: 0; }
      @media print { 
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
        .print-slide { height: 100vh; page-break-after: always; }
      }
    `,
  });

  const brandColors = {
    primary: '#000f83',
    secondary: '#f5ab1b',
    accent: '#e5e7eb',
    success: '#10b981',
  };

  // Updated Data Variables
  const totalViews = 3867;
  const totalVisitors = 1800; 
  const totalCountries = 36; // Based on the full list provided

  // Full dataset provided
  const fullCountryData = [
    { name: "United States", value: 2108 },
    { name: "Nigeria", value: 691 },
    { name: "Ghana", value: 607 },
    { name: "Belgium", value: 100 },
    { name: "United Kingdom", value: 65 },
    { name: "Germany", value: 63 },
    { name: "India", value: 57 },
    { name: "Canada", value: 44 },
    { name: "Netherlands", value: 34 },
    { name: "China", value: 21 },
    { name: "Pakistan", value: 10 },
    { name: "Colombia", value: 9 },
    { name: "Sweden", value: 8 },
    { name: "Singapore", value: 7 },
    { name: "Ireland", value: 6 },
    { name: "Dominican Republic", value: 6 },
    { name: "Hong Kong", value: 5 },
    { name: "Finland", value: 5 },
    { name: "Vietnam", value: 4 },
    { name: "Others", value: 19 } // Sum of remaining low value countries
  ];

  const regionData = [
    { name: 'North America', value: 56.4 }, // US + Canada + Others
    { name: 'West Africa', value: 34.0 }, // Nigeria + Ghana
    { name: 'Europe', value: 7.5 }, // Belgium, UK, DE, NL, etc
    { name: 'Asia/Others', value: 2.1 },
  ];

  const trafficSourceData = [
    { name: 'Search Engines', value: 678 },
    { name: 'Direct/Referral', value: 39 }, // Aggregated small referrals
    { name: 'Facebook', value: 15 },
    { name: 'WordPress', value: 7 },
    { name: 'Gmail', value: 6 },
    { name: 'Direct (Est.)', value: 3100 } // Estimated based on total views - tracked sources
  ];

  const searchEngineData = [
    { name: 'Google', value: 637 },
    { name: 'Bing', value: 32 },
    { name: 'Yahoo', value: 5 },
    { name: 'DuckDuckGo', value: 3 },
    { name: 'Yandex', value: 1 },
  ];

  // Top Pages Data (Preserved from previous context as it wasn't in the new text blob, but consistent with views)
  const topPagesData = [
    { page: 'Home', views: 1874 },
    { page: 'Contact', views: 376 },
    { page: 'IDD Travel', views: 354 },
    { page: 'About Us', views: 293 },
    { page: 'Careers', views: 206 },
    { page: 'Transport Mgmt', views: 129 },
    { page: 'Water Delivery', views: 112 },
    { page: 'Reviews', views: 99 },
    { page: 'Medical', views: 80 },
  ];

  const designCarouselItems = [
    { title: "Water Delivery Branding", desc: "Full visual identity suite & truck wraps", color: "#e0f2fe" },
    { title: "IDD Transportation", desc: "Service-specific graphics & icons", color: "#fef3c7" },
    { title: "Animated Logo", desc: "Professional motion intro for video content", color: "#f3e8ff" },
    { title: "Social Media Kit", desc: "Templates for Instagram & LinkedIn", color: "#dcfce7" }
  ];

  const COLORS = [brandColors.primary, brandColors.secondary, '#10b981', '#f59e0b', '#8b5cf6'];

  const slides = [
    // Slide 0: Title
    {
      content: (
        <div className="h-full flex flex-col items-center justify-center text-white p-16 print-slide" style={{ backgroundColor: brandColors.primary }}>
          <div className="mb-12 h-48 w-48 bg-white/10 border-4 border-dashed rounded-xl flex items-center justify-center backdrop-blur-sm">
            <p className="text-center text-gray-200">Company Logo</p>
          </div>
          <h1 className="text-6xl font-bold mb-6 text-center">Lane Car Logistics LLC</h1>
          <h2 className="text-4xl mb-8 text-center">Technology Team Year-End Report</h2>
          <p className="text-2xl mb-12">January 1 – December 14, 2025</p>
          <div className="flex gap-12">
            <div className="flex items-center gap-4">
              <Globe size={32} />
              <span className="text-xl">Web Analytics</span>
            </div>
            <div className="flex items-center gap-4">
              <Code size={32} />
              <span className="text-xl">Development</span>
            </div>
            <div className="flex items-center gap-4">
              <Palette size={32} />
              <span className="text-xl">Creative Design</span>
            </div>
          </div>
        </div>
      )
    },

    // Slide 1: Executive Summary
    {
      content: (
        <div className="p-16 bg-gray-50 h-full print-slide">
          <h2 className="text-5xl font-bold mb-12" style={{ color: brandColors.primary }}>Executive Summary</h2>
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4" style={{ borderColor: brandColors.secondary }}>
              <Eye className="mx-auto mb-4" size={48} style={{ color: brandColors.primary }} />
              <div className="text-5xl font-bold mb-2" style={{ color: brandColors.primary }}>{totalViews.toLocaleString()}</div>
              <p className="text-xl text-gray-700">Total Views</p>
              <p className="text-lg text-green-600 font-bold">↑ 68% YoY Growth</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4" style={{ borderColor: brandColors.secondary }}>
              <Users className="mx-auto mb-4" size={48} style={{ color: brandColors.primary }} />
              <div className="text-5xl font-bold mb-2" style={{ color: brandColors.primary }}>{totalVisitors.toLocaleString()}+</div>
              <p className="text-xl text-gray-700">Unique Visitors</p>
              <p className="text-lg text-green-600 font-bold">↑ 43% YoY Growth</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4" style={{ borderColor: brandColors.secondary }}>
              <MapPin className="mx-auto mb-4" size={48} style={{ color: brandColors.primary }} />
              <div className="text-5xl font-bold mb-2" style={{ color: brandColors.primary }}>{totalCountries}</div>
              <p className="text-xl text-gray-700">Countries Reached</p>
              <p className="text-sm text-gray-500 mt-2">Top: USA, Nigeria, Ghana</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Globe className="mb-4" size={40} style={{ color: brandColors.secondary }} />
              <h4 className="text-2xl font-bold mb-4">Global Reach</h4>
              <p className="text-gray-600">Dominant presence in North America (2,100+ views) and West Africa (1,300+ views).</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Code className="mb-4" size={40} style={{ color: brandColors.secondary }} />
              <h4 className="text-2xl font-bold mb-4">Tech Stack</h4>
              <p className="text-gray-600">Next.js 14, TypeScript, & Tailwind CSS architecture fully implemented.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Palette className="mb-4" size={40} style={{ color: brandColors.secondary }} />
              <h4 className="text-2xl font-bold mb-4">Brand Identity</h4>
              <p className="text-gray-600">Unified design language established across web, video, and social channels.</p>
            </div>
          </div>
        </div>
      )
    },

    // Slide 2: Part 1 Divider
    {
      content: (
        <div className="h-full flex flex-col items-center justify-center text-white p-16 print-slide" style={{ backgroundColor: brandColors.primary }}>
          <Globe size={120} className="mb-12" />
          <h1 className="text-7xl font-bold mb-6">PART 1</h1>
          <h2 className="text-5xl">Website Analytics & Performance</h2>
          <p className="text-2xl mt-8">WordPress Site Metrics (Jan 1 – Dec 14, 2025)</p>
        </div>
      )
    },

    // Slide 3: Geographic Reach
    {
      content: (
        <div className="p-16 h-full print-slide">
          <h2 className="text-5xl font-bold mb-8" style={{ color: brandColors.primary }}>Global Geographic Reach</h2>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">Traffic by Region</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={regionData} cx="50%" cy="50%" labelLine={false} outerRadius={140} fill="#8884d8" dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                      {regionData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Top 12 Countries</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fullCountryData.slice(0, 12)} layout="vertical" margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                    <Tooltip 
                       contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" fill={brandColors.primary} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Traffic Sources
    {
      content: (
        <div className="p-16 bg-gray-50 h-full print-slide">
          <h2 className="text-5xl font-bold mb-12" style={{ color: brandColors.primary }}>Traffic Acquisition</h2>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-8">Search Engine Breakdown</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={searchEngineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="value" fill={brandColors.secondary} radius={[4, 4, 0, 0]} label={{ position: 'top' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border-l-4" style={{ borderColor: brandColors.primary }}>
                <p className="text-xl font-bold">Google Dominance</p>
                <p className="mt-2 text-gray-700">Google accounts for <strong>94%</strong> of all search traffic (637 views), indicating strong SEO performance on the world's primary search engine.</p>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-8">Traffic Source Distribution</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={trafficSourceData} cx="50%" cy="50%" innerRadius={80} outerRadius={150} dataKey="value" label={({ name }) => name}>
                      {trafficSourceData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Most Viewed Pages
    {
      content: (
        <div className="p-16 h-full print-slide">
          <h2 className="text-5xl font-bold mb-8" style={{ color: brandColors.primary }}>Most Viewed Pages</h2>
          <div className="h-[500px] mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPagesData} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="page" type="category" width={140} tick={{ fontWeight: 500 }} />
                <Tooltip />
                <Bar dataKey="views" fill={brandColors.primary} radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 bg-green-50 rounded-xl">
              <h4 className="text-2xl font-bold mb-2" style={{ color: brandColors.primary }}>Strengths</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Strong conversion interest: "Contact" is the #2 most viewed page.</li>
                <li>High engagement on "IDD Travel Assistance" (354 views).</li>
              </ul>
            </div>
            <div className="p-6 bg-amber-50 rounded-xl">
              <h4 className="text-2xl font-bold mb-2" style={{ color: brandColors.primary }}>Opportunities</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Boost "Reviews" page visibility to build trust.</li>
                <li>Create content to drive more traffic to "Medical Delivery".</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // Slide 6: Part 2 Divider
    {
      content: (
        <div className="h-full flex flex-col items-center justify-center text-white p-16 print-slide" style={{ backgroundColor: brandColors.primary }}>
          <Code size={120} className="mb-12" />
          <h1 className="text-7xl font-bold mb-6">PART 2</h1>
          <h2 className="text-5xl">Enterprise Management System (EMS)</h2>
        </div>
      )
    },

    // Slide 7: EMS Development
    {
      content: (
        <div className="p-16 bg-gray-50 h-full print-slide">
          <h2 className="text-5xl font-bold mb-12" style={{ color: brandColors.primary }}>EMS Web Application</h2>
          <div className="grid grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-bold mb-8">Technology Stack</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow border-l-8 border-blue-600">
                  <h4 className="text-xl font-bold mb-2">Frontend Framework</h4>
                  <p className="text-gray-700 font-medium">Next.js 14 (App Router) + React 18</p>
                  <p className="text-sm text-gray-500 mt-1">Server-Side Rendering (SSR) for speed & SEO</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border-l-8 border-yellow-500">
                  <h4 className="text-xl font-bold mb-2">Styling & UI</h4>
                  <p className="text-gray-700 font-medium">Tailwind CSS + Lucide Icons</p>
                  <p className="text-sm text-gray-500 mt-1">Responsive, mobile-first design system</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border-l-8 border-green-500">
                  <h4 className="text-xl font-bold mb-2">Database & Backend</h4>
                  <p className="text-gray-700 font-medium">MySQL + Drizzle ORM</p>
                  <p className="text-sm text-gray-500 mt-1">Type-safe database queries and scalable schema</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-8">Development Status</h3>
              <div className="bg-white p-10 rounded-xl shadow-lg text-center">
                <div className="text-6xl font-bold mb-4 text-green-600">Active</div>
                <p className="text-xl text-gray-700 mb-8">Core architecture committed to GitHub</p>
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-blue-600 h-4 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span className="font-bold">Frontend Setup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-blue-600 h-4 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="font-bold">Database Schema</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-gray-400 h-4 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="font-bold">Feature Implementation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 8: Part 3 Divider
    {
      content: (
        <div className="h-full flex flex-col items-center justify-center text-white p-16 print-slide" style={{ backgroundColor: brandColors.primary }}>
          <Palette size={120} className="mb-12" />
          <h1 className="text-7xl font-bold mb-6">PART 3</h1>
          <h2 className="text-5xl">Graphic Design & Media</h2>
        </div>
      )
    },

    // Slide 9: Creative Work (With Carousel)
    {
      content: (
        <div className="p-16 h-full print-slide">
          <h2 className="text-5xl font-bold mb-12" style={{ color: brandColors.primary }}>Creative Design Portfolio</h2>
          
          {/* Carousel Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6">Design Showcase</h3>
            <ImageCarousel items={designCarouselItems} />
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-3xl font-bold mb-6">Tools & Technologies</h3>
              <ul className="space-y-4 text-xl">
                <li className="flex items-center gap-4"><Palette size={28} className="text-blue-600"/> Adobe Photoshop & Illustrator</li>
                <li className="flex items-center gap-4"><Code size={28} className="text-green-600"/> Photopea (Web-based Editor)</li>
                <li className="flex items-center gap-4"><BarChart3 size={28} className="text-yellow-600"/> Google Veo (AI Video Generation)</li>
                <li className="flex items-center gap-4"><TrendingUp size={28} className="text-purple-600"/> Adobe After Effects</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-3xl font-bold mb-6">Key Achievements</h3>
              <ul className="list-disc pl-8 space-y-4 text-lg text-gray-700">
                <li>Created unified visual assets for all 5 major service lines.</li>
                <li>Designed animated intro sequence for corporate videos.</li>
                <li>Rapid prototyping of video concepts using AI tools.</li>
                <li>Maintained brand consistency across 30+ countries.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // Slide 10: Closing
    {
      content: (
        <div className="h-full flex flex-col items-center justify-center text-white p-16 print-slide" style={{ backgroundColor: brandColors.primary }}>
          <h1 className="text-6xl font-bold mb-8 text-center">Thank You</h1>
          <p className="text-3xl mb-12 text-center">Lane Car Logistics LLC</p>
          <div className="flex gap-4">
             <div className="px-6 py-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <span className="font-mono">tech-team@lanecarlogistics.com</span>
             </div>
          </div>
          <p className="text-xl text-gray-400 mt-24">Report Generated: {new Date().toLocaleDateString()}</p>
        </div>
      )
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      {/* Printable Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* We use a wrapper to handle the print ref logic separately from the viewport logic if needed, 
            but strictly mapping the current slide for view and the ref for print works best. */}
        <div ref={componentRef} className="h-full w-full bg-white">
            {/* For screen, we show one slide. For print, we might want to map all. 
                However, typical slide decks print the current view or need a specific "print all" mode.
                Standard react-to-print prints what is in the ref. 
                To print ALL slides, we render them all but hide non-current ones from screen.
            */}
            <style>{`
                @media print {
                    .slide-container { display: block !important; height: 100vh; page-break-after: always; overflow: hidden; }
                }
            `}</style>
            
            {slides.map((slide, index) => (
                <div 
                    key={index} 
                    className={`slide-container h-full w-full ${index === currentSlide ? 'block' : 'hidden'}`}
                >
                    {slide.content}
                </div>
            ))}
        </div>
      </div>

      {/* Control Bar (Hidden when printing) */}
      <div className="bg-gray-900 text-white p-6 flex items-center justify-between shadow-2xl no-print z-50">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-3 px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-gray-800"
          style={{ backgroundColor: currentSlide === 0 ? 'transparent' : brandColors.primary }}
        >
          <ChevronLeft size={24} />
          <span className="text-lg">Previous</span>
        </button>

        <div className="flex items-center gap-8">
          <span className="text-lg font-mono text-gray-400">
            {currentSlide + 1} / {slides.length}
          </span>
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className="w-3 h-3 rounded-full transition-all hover:scale-125"
                style={{
                  backgroundColor: idx === currentSlide ? brandColors.secondary : '#4b5563'
                }}
              />
            ))}
          </div>
          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-3 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/20"
          >
            <Download size={24} />
            <span className="text-lg">Download PDF</span>
          </button>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-3 px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-gray-800"
          style={{ backgroundColor: currentSlide === slides.length - 1 ? 'transparent' : brandColors.primary }}
        >
          <span className="text-lg">Next</span>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default TechReport;