'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe, Code, Palette, Download, BarChart3, TrendingUp, Users, MapPin, Eye, Server, Droplets, LayoutTemplate, FileText, Presentation } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, LineChart, Line } from 'recharts';
import { useReactToPrint } from 'react-to-print';
import pptxgen from "pptxgenjs";
import ReactPlayer from 'react-player'; 
import html2canvas from 'html2canvas';

// --- Types ---
interface MediaGroup {
  id: string;
  title: string;
  desc: string;
  type: 'grid' | 'video';
  sources: string[]; // Array of paths
  color: string;
}

// --- Carousel Component ---
const PortfolioCarousel = ({ groups }: { groups: MediaGroup[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % groups.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + groups.length) % groups.length);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      next();
    }, 10000); 
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const currentGroup = groups[currentIndex];

  return (
    <div 
      className="relative w-full h-[500px] bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200 group flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header Bar */}
      <div className="py-3 px-6 flex justify-between items-center z-20 shadow-sm" style={{ backgroundColor: currentGroup.color }}>
        <div>
           <h3 className="text-xl font-bold text-gray-900">{currentGroup.title}</h3>
           <p className="text-sm text-gray-700 font-medium opacity-80">{currentGroup.desc}</p>
        </div>
        <div className="flex gap-2">
           {groups.map((_, idx) => (
             <div 
               key={idx}
               className={`h-2 w-2 rounded-full transition-all ${idx === currentIndex ? 'bg-gray-900 w-6' : 'bg-gray-400/50'}`} 
             />
           ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow relative bg-white overflow-hidden flex items-center justify-center">
        
        {currentGroup.type === 'video' ? (
           <div className="w-full h-full flex items-center justify-center bg-white overflow-hidden relative">
              {hasMounted && (
                <div className="w-full h-full">
                  <ReactPlayer
                    url={currentGroup.sources[0]}
                    playing={!isPaused}
                    loop
                    muted
                    width="100%"
                    height="100%"
                    controls={false}
                    playsinline
                    style={{ mixBlendMode: 'screen' }}
                  />
                </div>
              )}
           </div>
        ) : (
           <div className="w-full h-full grid grid-cols-3 gap-2 p-4">
              {currentGroup.sources.map((src, idx) => (
                <div key={idx} className="relative w-full h-full bg-white rounded-lg border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                    <img 
                      src={src} 
                      alt={`${currentGroup.title} ${idx + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-white text-[10px] md:text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        Asset 0{idx + 1}
                    </div>
                </div>
              ))}
           </div>
        )}
      </div>
      
      {/* Navigation Buttons */}
      <button 
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full hover:bg-white shadow-md transition-colors z-30"
      >
        <ChevronLeft size={24} className="text-gray-800" />
      </button>
      
      <button 
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full hover:bg-white shadow-md transition-colors z-30"
      >
        <ChevronRight size={24} className="text-gray-800" />
      </button>
    </div>
  );
};

const TechReport = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [chartImages, setChartImages] = useState<{[key: string]: string}>({});
  const componentRef = useRef<HTMLDivElement>(null);

  // Convert charts to images before printing
  const convertChartsToImages = async () => {
    const chartElements = document.querySelectorAll('.recharts-wrapper');
    const images: {[key: string]: string} = {};
    
    for (let i = 0; i < chartElements.length; i++) {
      const element = chartElements[i] as HTMLElement;
      try {
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false,
        });
        images[`chart-${i}`] = canvas.toDataURL('image/png');
      } catch (error) {
        console.error('Error converting chart to image:', error);
      }
    }
    
    return images;
  };

  // --- PDF PRINT CONFIG ---
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'La Necar Logistics LLC - Tech Report 2025',
    onBeforeGetContent: async () => {
        setIsPrinting(true);
        const images = await convertChartsToImages();
        setChartImages(images);
        return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onAfterPrint: () => {
        setIsPrinting(false);
        setChartImages({});
    },
    pageStyle: `
      @page { size: A4 landscape; margin: 0; }
      @media print { 
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .no-print { display: none !important; }
        .slide-container { 
            display: block !important; 
            height: 100vh !important; 
            width: 100vw !important; 
            page-break-after: always !important; 
            break-after: page !important;
        }
        .chart-container { position: relative; }
        .chart-image { display: block !important; width: 100% !important; height: 100% !important; }
        .recharts-wrapper { display: none !important; }
      }
    `,
  } as any);

  const brandColors = {
    primary: '#000f83',
    secondary: '#f5ab1b',
    accent: '#e5e7eb',
    success: '#10b981',
  };

  // --- DATA ---
  const totalViews = 3867;
  const totalVisitors = 1800; 
  const totalCountries = 36;

  const impressionsData = [
    { name: 'Jan', value: 200 }, { name: 'Feb', value: 210 }, { name: 'Mar', value: 218 },
    { name: 'Apr', value: 300 }, { name: 'May', value: 350 }, { name: 'Jun', value: 350 },
    { name: 'Jul', value: 450 }, { name: 'Aug', value: 550 }, { name: 'Sep', value: 650 }, 
    { name: 'Oct', value: 950 }, { name: 'Nov', value: 1050 }, { name: 'Dec', value: 472 },
  ];

  const fullCountryData = [
    { name: "United States", value: 2108 }, { name: "Nigeria", value: 691 }, { name: "Ghana", value: 607 },
    { name: "Belgium", value: 100 }, { name: "UK", value: 65 }, { name: "Germany", value: 63 },
    { name: "India", value: 57 }, { name: "Canada", value: 44 }, { name: "Netherlands", value: 34 },
    { name: "China", value: 21 }
  ];

  const regionData = [
    { name: 'North America', value: 56.4 }, { name: 'West Africa', value: 34.0 }, 
    { name: 'Europe', value: 7.5 }, { name: 'Asia/Others', value: 2.1 },
  ];

  const trafficSourceData = [
    { name: 'Search Engines', value: 678 }, { name: 'Direct/Referral', value: 39 }, 
    { name: 'Facebook', value: 15 }, { name: 'WordPress', value: 7 },
    { name: 'Gmail', value: 6 }, { name: 'Direct (Est.)', value: 3100 }
  ];

  const searchEngineData = [
    { name: 'Google', value: 637 }, { name: 'Bing', value: 32 },
    { name: 'Yahoo', value: 5 }, { name: 'DuckDuckGo', value: 3 }, { name: 'Yandex', value: 1 },
  ];

  const topPagesData = [
    { page: 'Home', views: 1874 }, { page: 'Contact', views: 376 },
    { page: 'IDD Travel', views: 354 }, { page: 'About Us', views: 293 },
    { page: 'Careers', views: 206 }, { page: 'Transport', views: 129 },
    { page: 'Water', views: 112 }, { page: 'Reviews', views: 99 },
  ];

  // --- PORTFOLIO DATA ---
  const portfolioGroups: MediaGroup[] = [
    { 
        id: 'idd',
        title: "IDD Transportation", 
        desc: "Fleet Visuals & Route Maps", 
        type: 'grid', 
        sources: ["/images/IDD_01.jpg", "/images/IDD_02.jpg", "/images/IDD_03.jpg"],
        color: "#fef9c3" 
    },
    { 
        id: 'water',
        title: "Water Delivery", 
        desc: "Branding & Product Mockups", 
        type: 'grid', 
        sources: ["/images/water_01.jpg", "/images/water_02.jpg", "/images/water_03.jpg"],
        color: "#dbeafe" 
    }/*,
    { 
        id: 'video',
        title: "Animated Logo Intro", 
        desc: "Motion Graphics / Video Production", 
        type: 'video', 
        sources: ["/videos/Logo_animation.mov"],
        color: "#ddd6fe" 
    } */
  ];

  const COLORS = [brandColors.primary, brandColors.secondary, '#10b981', '#f59e0b', '#8b5cf6'];

  // --- POWERPOINT GENERATION ---
  const generatePPTX = () => {
    const pres = new pptxgen();
    pres.layout = "LAYOUT_16x9";
    pres.author = "La Necar Logistics";
    pres.title = "Tech Report 2025";

    // 1. Title Slide
    let slide = pres.addSlide();
    slide.background = { color: "000f83" };
    slide.addText("La Necar Logistics LLC", { x: 1, y: 2, w: "80%", fontSize: 36, color: "FFFFFF", align: "center" });
    slide.addText("IT Team Year-End Report", { x: 1, y: 3, w: "80%", fontSize: 24, color: "EEEEEE", align: "center" });
    slide.addText("January - December, 2025", { x: 1, y: 4, w: "80%", fontSize: 18, color: "DDDDDD", align: "center" });

    // 2. Executive Summary
    slide = pres.addSlide();
    slide.addText("Executive Summary", { x: 0.5, y: 0.5, fontSize: 24, color: "000f83", bold: true });
    slide.addText(`Total Views: ${totalViews.toLocaleString()}`, { x: 0.5, y: 1.5, w: 3, h: 1, fill: { color: "F9FAFB" }, color: "000f83", fontSize: 20, align: "center" });
    slide.addText(`Visitors: ${totalVisitors.toLocaleString()}`, { x: 4, y: 1.5, w: 3, h: 1, fill: { color: "F9FAFB" }, color: "000f83", fontSize: 20, align: "center" });
    slide.addText(`Countries: ${totalCountries}`, { x: 7.5, y: 1.5, w: 3, h: 1, fill: { color: "F9FAFB" }, color: "000f83", fontSize: 20, align: "center" });

    // 3. Impressions
    slide = pres.addSlide();
    slide.addText("Yearly Impressions Trend", { x: 0.5, y: 0.5, fontSize: 24, color: "000f83", bold: true });
    const impData = [{
        name: "Impressions",
        labels: impressionsData.map(d => d.name),
        values: impressionsData.map(d => d.value)
    }];
    slide.addChart(pres.ChartType.line, impData, { x: 0.5, y: 1.2, w: 9, h: 4, lineSmooth: true, chartColors: ["000f83"] });

    // 4. Geographic Reach
    slide = pres.addSlide();
    slide.addText("Geographic Reach", { x: 0.5, y: 0.5, fontSize: 24, color: "000f83", bold: true });
    
    // Pie: Regions
    slide.addText("Traffic by Region", { x: 0.5, y: 1.0, fontSize: 14, bold: true });
    const regChartData = [{
        name: "Region",
        labels: regionData.map(d => d.name),
        values: regionData.map(d => d.value)
    }];
    slide.addChart(pres.ChartType.pie, regChartData, { x: 0.5, y: 1.3, w: 4, h: 3, showLegend: true });

    // Bar: Countries
    slide.addText("Top Countries", { x: 5, y: 1.0, fontSize: 14, bold: true });
    const countryChartData = [{
        name: "Visits",
        labels: fullCountryData.slice(0, 5).map(d => d.name),
        values: fullCountryData.slice(0, 5).map(d => d.value)
    }];
    slide.addChart(pres.ChartType.bar, countryChartData, { x: 5, y: 1.3, w: 4.5, h: 3, chartColors: ["000f83"] });

    // 5. Traffic Sources
    slide = pres.addSlide();
    slide.addText("Traffic Acquisition", { x: 0.5, y: 0.5, fontSize: 24, color: "000f83", bold: true });
    const searchData = [{
        name: "Visits",
        labels: searchEngineData.map(d => d.name),
        values: searchEngineData.map(d => d.value)
    }];
    slide.addChart(pres.ChartType.bar, searchData, { x: 0.5, y: 1.5, w: 4.5, h: 3, chartColors: ["f5ab1b"] });
    slide.addText("Google Search Dominance (94%)", { x: 0.5, y: 4.8, fontSize: 12, color: "555555" });

    // 6. Top Pages
    slide = pres.addSlide();
    slide.addText("Most Viewed Pages", { x: 0.5, y: 0.5, fontSize: 24, color: "000f83", bold: true });
    const pageData = [{
        name: "Views",
        labels: topPagesData.map(d => d.page),
        values: topPagesData.map(d => d.views)
    }];
    slide.addChart(pres.ChartType.bar, pageData, { x: 0.5, y: 1.2, w: 9, h: 4, chartColors: ["000f83"] });

    // 7. EMS
    slide = pres.addSlide();
    slide.addText("EMS Web Application", { x: 0.5, y: 0.5, fontSize: 24, color: "000f83", bold: true });
    slide.addText("Development Status: Active", { x: 0.5, y: 1.2, fontSize: 18, color: "009900" });
    
    // Status Bars (Simulated with Shapes)
    slide.addText("Frontend (85%)", { x: 0.5, y: 2.0, fontSize: 14 });
    slide.addShape(pres.ShapeType.rect, { x: 3, y: 2.05, w: 4, h: 0.2, fill: { color: "EEEEEE" } });
    slide.addShape(pres.ShapeType.rect, { x: 3, y: 2.05, w: 4 * 0.85, h: 0.2, fill: { color: "009900" } });

    slide.addText("Database (90%)", { x: 0.5, y: 2.6, fontSize: 14 });
    slide.addShape(pres.ShapeType.rect, { x: 3, y: 2.65, w: 4, h: 0.2, fill: { color: "EEEEEE" } });
    slide.addShape(pres.ShapeType.rect, { x: 3, y: 2.65, w: 4 * 0.90, h: 0.2, fill: { color: "009900" } });

    slide.addText("Features (80%)", { x: 0.5, y: 3.2, fontSize: 14 });
    slide.addShape(pres.ShapeType.rect, { x: 3, y: 3.25, w: 4, h: 0.2, fill: { color: "EEEEEE" } });
    slide.addShape(pres.ShapeType.rect, { x: 3, y: 3.25, w: 4 * 0.80, h: 0.2, fill: { color: "8b5cf6" } });

    // 8. Portfolio (Iterate through groups)
    portfolioGroups.forEach((group) => {
        let pSlide = pres.addSlide();
        pSlide.addText(`Portfolio: ${group.title}`, { x: 0.5, y: 0.5, fontSize: 24, color: "000f83", bold: true });
        pSlide.addText(group.desc, { x: 0.5, y: 1.0, fontSize: 16, color: "666666" });

        if (group.type === 'video') {
             // For video, we add a placeholder box since we can't embed the MOV easily
             pSlide.addShape(pres.ShapeType.rect, { x: 1.5, y: 1.5, w: 7, h: 3.5, fill: { color: "000000" } });
             pSlide.addText("VIDEO ASSET", { x: 1.5, y: 3.0, w: 7, h: 0.5, color: "FFFFFF", align: "center", fontSize: 18 });
             pSlide.addText(group.sources[0], { x: 1.5, y: 3.5, w: 7, h: 0.5, color: "AAAAAA", align: "center", fontSize: 10 });
        } else {
             // For images, we try to place them side by side
             group.sources.forEach((src, idx) => {
                // Determine position based on index (simple 3 col layout)
                let xPos = 0.5 + (idx * 3.1);
                // Note: src must be accessible by the browser/server generating this. 
                // If local development, relative paths might work if served public.
                try {
                    pSlide.addImage({ path: src, x: xPos, y: 1.5, w: 2.8, h: 2.8 });
                } catch(e) {
                    pSlide.addText("Image not found", { x: xPos, y: 2.5 });
                }
             });
        }
    });

    // 9. Ongoing Projects
    slide = pres.addSlide();
    slide.addText("Ongoing Projects", { x: 0.5, y: 0.5, fontSize: 24, color: "000f83", bold: true });
    
    slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.2, w: 4, h: 1.5, fill: { color: "F0F9FF" }, line: { color: "0000FF", width: 1 } });
    slide.addText("NAS System Setup", { x: 0.6, y: 1.4, fontSize: 14, bold: true });
    slide.addText("Network storage for Fleet data centralization.", { x: 0.6, y: 1.8, w: 3.8, fontSize: 11 });

    slide.addShape(pres.ShapeType.rect, { x: 5.0, y: 1.2, w: 4, h: 1.5, fill: { color: "FAF5FF" }, line: { color: "800080", width: 1 } });
    slide.addText("Design Exercise", { x: 5.1, y: 1.4, fontSize: 14, bold: true });
    slide.addText("Q1 2026 Visual Concept exploration.", { x: 5.1, y: 1.8, w: 3.8, fontSize: 11 });

    slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 3.0, w: 4, h: 1.5, fill: { color: "ECFEFF" }, line: { color: "008080", width: 1 } });
    slide.addText("Digitizing Water Logs", { x: 0.6, y: 3.2, fontSize: 14, bold: true });
    slide.addText("Migrating manual logs to digital dashboards.", { x: 0.6, y: 3.6, w: 3.8, fontSize: 11 });

    // 10. Closing
    slide = pres.addSlide();
    slide.background = { color: "000f83" };
    slide.addText("Thank You", { x: 1, y: 2, w: "80%", fontSize: 40, color: "FFFFFF", align: "center" });
    slide.addText("La Necar Logistics LLC", { x: 1, y: 3, w: "80%", fontSize: 24, color: "DDDDDD", align: "center" });

    pres.writeFile({ fileName: "LaNeCarLogistics_Report.pptx" });
    setShowDownloadMenu(false);
  };

  // Chart wrapper component - SIMPLIFIED to always show charts during viewing
  const ChartWrapper = ({ children, chartId }: { children: React.ReactNode, chartId: string }) => {
    if (isPrinting && chartImages[chartId]) {
      return (
        <div className="chart-container w-full h-full">
          <img src={chartImages[chartId]} alt={`Chart ${chartId}`} className="chart-image w-full h-full object-contain" />
        </div>
      );
    }
    return <div className="chart-container w-full h-full">{children}</div>;
  };

  // --- SLIDE WRAPPERS ---
  const ContentSlideWrapper = ({ children, bg }: { children: React.ReactNode, bg?: string }) => (
    <div 
      className="h-full w-full flex flex-col p-6 md:p-12 print-slide overflow-y-auto"
      style={{ backgroundColor: bg || 'white' }}
    >
      {children}
    </div>
  );

  const TitleSlideWrapper = ({ children, bg }: { children: React.ReactNode, bg?: string }) => (
    <div 
      className="h-full w-full flex flex-col justify-center items-center p-6 md:p-12 print-slide text-center"
      style={{ backgroundColor: bg || 'white' }}
    >
      {children}
    </div>
  );

  const slides = [
    // 0. Title - LOGO FIXED
    {
      content: (
        <TitleSlideWrapper bg={brandColors.primary}>
          {/* Logo Container: Outer Dashes -> Padding -> Inner White Box */}
          <div className="mb-8 md:mb-12 h-36 w-36 md:h-52 md:w-52 border-4 border-dashed border-white/30 rounded-full flex items-center justify-center p-3 backdrop-blur-sm">
             <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-4 overflow-hidden shadow-xl">
                 <img src="/logo.png" alt="La Necar Logistics Logo" className="w-full h-full object-contain" />
             </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 text-white">La Necar Logistics LLC</h1>
          <h2 className="text-2xl md:text-4xl mb-6 md:mb-8 text-gray-200">IT Team Year-End Report</h2>
          <p className="text-xl md:text-2xl mb-8 md:mb-12 text-white/80">January - December, 2025</p>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-white">
            <div className="flex items-center gap-3 md:gap-4 justify-center">
              <Globe className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-lg md:text-xl">Web Analytics</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4 justify-center">
              <Code className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-lg md:text-xl">Development</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4 justify-center">
              <Palette className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-lg md:text-xl">Creative Design</span>
            </div>
          </div>
        </TitleSlideWrapper>
      )
    },

    // 1. Executive Summary
    {
      content: (
        <ContentSlideWrapper bg="#f9fafb">
           <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center md:text-left" style={{ color: brandColors.primary }}>Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center border-t-4" style={{ borderColor: brandColors.secondary }}>
              <Eye className="mx-auto mb-4 w-10 h-10 md:w-12 md:h-12" style={{ color: brandColors.primary }} />
              <div className="text-3xl md:text-5xl font-bold mb-2" style={{ color: brandColors.primary }}>{totalViews.toLocaleString()}</div>
              <p className="text-lg md:text-xl text-gray-700">Total Views</p>
              <p className="text-sm md:text-lg text-green-600 font-bold">↑ 68% YoY Growth</p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center border-t-4" style={{ borderColor: brandColors.secondary }}>
              <Users className="mx-auto mb-4 w-10 h-10 md:w-12 md:h-12" style={{ color: brandColors.primary }} />
              <div className="text-3xl md:text-5xl font-bold mb-2" style={{ color: brandColors.primary }}>{totalVisitors.toLocaleString()}+</div>
              <p className="text-lg md:text-xl text-gray-700">Unique Visitors</p>
              <p className="text-sm md:text-lg text-green-600 font-bold">↑ 43% YoY Growth</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center border-t-4" style={{ borderColor: brandColors.secondary }}>
              <MapPin className="mx-auto mb-4 w-10 h-10 md:w-12 md:h-12" style={{ color: brandColors.primary }} />
              <div className="text-3xl md:text-5xl font-bold mb-2" style={{ color: brandColors.primary }}>{totalCountries}</div>
              <p className="text-lg md:text-xl text-gray-700">Countries Reached</p>
              <p className="text-sm md:text-lg text-gray-500 mt-2">Top: USA, Nigeria</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <Globe className="mb-4 w-8 h-8 md:w-10 md:h-10" style={{ color: brandColors.secondary }} />
              <h4 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Global Reach</h4>
              <p className="text-sm md:text-base text-gray-600">Dominant presence in North America & West Africa.</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <Code className="mb-4 w-8 h-8 md:w-10 md:h-10" style={{ color: brandColors.secondary }} />
              <h4 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Tech Stack</h4>
              <p className="text-sm md:text-base text-gray-600">Next.js 14 architecture implemented. EMS core committed to GitHub.</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <Palette className="mb-4 w-8 h-8 md:w-10 md:h-10" style={{ color: brandColors.secondary }} />
              <h4 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Brand Identity</h4>
              <p className="text-sm md:text-base text-gray-600">Unified design language across IDD transportation and Water delivery service.</p>
            </div>
          </div>
        </ContentSlideWrapper>
      )
    },

    // 2. Part 1 Divider
    {
      content: (
        <TitleSlideWrapper bg={brandColors.primary}>
          <Globe className="w-24 h-24 md:w-32 md:h-32 mb-8 md:mb-12 text-white" />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 text-white">PART 1</h1>
          <h2 className="text-3xl md:text-5xl font-medium text-white">Website Analytics & Performance</h2>
          <p className="text-lg md:text-2xl mt-8 opacity-80 text-white">WordPress Site Metrics</p>
        </TitleSlideWrapper>
      )
    },

    // 3. Impressions
    {
        content: (
            <ContentSlideWrapper>
                <div className="flex items-center gap-4 mb-8">
                    <BarChart3 size={48} className="text-blue-600" />
                    <h2 className="text-3xl md:text-5xl font-bold" style={{ color: brandColors.primary }}>Total Impressions</h2>
                </div>
                
                <div className="w-full h-[300px] md:h-[450px] mb-8 bg-white rounded-xl shadow-sm border p-4">
                    <ChartWrapper chartId="chart-0">
                      <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={impressionsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                              <YAxis axisLine={false} tickLine={false} />
                              <Tooltip 
                                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                              />
                              <Line 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke={brandColors.primary} 
                                  strokeWidth={4} 
                                  dot={{ fill: brandColors.primary, r: 4 }}
                                  activeDot={{ r: 8 }}
                                  isAnimationActive={!isPrinting}
                              />
                          </LineChart>
                      </ResponsiveContainer>
                    </ChartWrapper>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                     <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center items-center">
                        <span className="text-4xl font-bold mb-1">5.8k</span>
                        <span className="text-sm opacity-80">Total Impressions</span>
                     </div>
                     <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-lg mb-1 text-blue-900">Q1 (Jan-Mar)</h4>
                        <p className="text-2xl font-bold text-blue-700">~628</p>
                        <p className="text-xs text-blue-600 mt-1">Initial growth</p>
                     </div>
                     <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-lg mb-1 text-blue-900">Q2 (Apr-Jun)</h4>
                        <p className="text-2xl font-bold text-blue-700">~1,000</p>
                        <p className="text-xs text-blue-600 mt-1">Steady increase</p>
                     </div>
                     <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-lg mb-1 text-blue-900">Q4 (Oct-Nov)</h4>
                        <p className="text-2xl font-bold text-blue-700">~2,000</p>
                        <p className="text-xs text-blue-600 mt-1">Peak Season</p>
                     </div>
                </div>
            </ContentSlideWrapper>
        )
    },

    // 4. Geographic Reach
    {
      content: (
        <ContentSlideWrapper>
          <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ color: brandColors.primary }}>Global Geographic Reach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 flex-1">
            <div className="flex flex-col">
              <h3 className="text-xl md:text-3xl font-bold mb-6">Traffic by Region</h3>
              <div className="h-[300px] md:h-[400px] w-full">
                <ChartWrapper chartId="chart-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                          data={regionData} 
                          cx="50%" 
                          cy="50%" 
                          labelLine={false} 
                          outerRadius={120} 
                          fill="#8884d8" 
                          dataKey="value" 
                          label={({ name, value }) => `${name} ${value}%`}
                          isAnimationActive={!isPrinting}
                      >
                        {regionData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl md:text-3xl font-bold mb-6">Top Countries</h3>
              <div className="h-[300px] md:h-[400px] w-full">
                <ChartWrapper chartId="chart-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fullCountryData.slice(0, 10)} layout="vertical" margin={{ left: 40, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={90} tick={{fontSize: 11}} interval={0} />
                      <Tooltip 
                         cursor={{fill: 'transparent'}}
                         contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="value" fill={brandColors.primary} radius={[0, 4, 4, 0]} isAnimationActive={!isPrinting} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>
            </div>
          </div>
        </ContentSlideWrapper>
      )
    },

    // 5. Traffic Sources
    {
      content: (
        <ContentSlideWrapper bg="#f9fafb">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12" style={{ color: brandColors.primary }}>Traffic Acquisition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 flex-1">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Search Engine Breakdown</h3>
              <div className="h-[250px] md:h-[350px]">
                <ChartWrapper chartId="chart-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={searchEngineData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{fontSize: 12}} />
                      <YAxis />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="value" fill={brandColors.secondary} radius={[4, 4, 0, 0]} label={{ position: 'top' }} isAnimationActive={!isPrinting} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-white rounded-xl shadow-sm border-l-4" style={{ borderColor: brandColors.primary }}>
                <p className="text-lg md:text-xl font-bold">Google Dominance</p>
                <p className="mt-2 text-sm md:text-base text-gray-700">Google accounts for <strong>94%</strong> of search traffic, validating our current SEO strategy.</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Source Distribution</h3>
              <div className="h-[300px] md:h-[400px]">
                <ChartWrapper chartId="chart-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                          data={trafficSourceData} 
                          cx="50%" 
                          cy="50%" 
                          innerRadius={60} 
                          outerRadius={120} 
                          dataKey="value" 
                          label={({ name }) => name}
                          isAnimationActive={!isPrinting}
                      >
                        {trafficSourceData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>
            </div>
          </div>
        </ContentSlideWrapper>
      )
    },

    // 6. Most Viewed Pages
    {
      content: (
        <ContentSlideWrapper>
          <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ color: brandColors.primary }}>Most Viewed Pages</h2>
          <div className="h-[300px] md:h-[500px] mb-8 w-full">
            <ChartWrapper chartId="chart-5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPagesData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="page" type="category" width={100} tick={{ fontWeight: 500, fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="views" fill={brandColors.primary} radius={[0, 4, 4, 0]} barSize={24} isAnimationActive={!isPrinting} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="p-4 md:p-6 bg-green-50 rounded-xl">
              <h4 className="text-xl md:text-2xl font-bold mb-2" style={{ color: brandColors.primary }}>Strengths</h4>
              <ul className="list-disc pl-6 text-gray-700 text-sm md:text-base">
                <li>High conversion intent: "Contact" is #2 page.</li>
                <li>"IDD Travel" performing well organically.</li>
              </ul>
            </div>
            <div className="p-4 md:p-6 bg-amber-50 rounded-xl">
              <h4 className="text-xl md:text-2xl font-bold mb-2" style={{ color: brandColors.primary }}>Opportunities</h4>
              <ul className="list-disc pl-6 text-gray-700 text-sm md:text-base">
                <li>Improve "Reviews" page visibility.</li>
                <li>Boost "Water Delivery" content marketing.</li>
              </ul>
            </div>
          </div>
        </ContentSlideWrapper>
      )
    },

    // 7. Part 2 Divider
    {
      content: (
        <TitleSlideWrapper bg={brandColors.primary}>
          <Code className="w-24 h-24 md:w-32 md:h-32 mb-8 md:mb-12 text-white" />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 text-white">PART 2</h1>
          <h2 className="text-3xl md:text-5xl font-medium text-white">Enterprise Management System (EMS)</h2>
        </TitleSlideWrapper>
      )
    },

    // 8. EMS Web Application
    {
      content: (
        <ContentSlideWrapper bg="#f9fafb">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12" style={{ color: brandColors.primary }}>EMS Web Application</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-8">Technology Stack</h3>
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
              <h3 className="text-2xl md:text-3xl font-bold mb-8">Development Status</h3>
              <div className="bg-white p-10 rounded-xl shadow-lg text-center h-full flex flex-col justify-center">
                <div className="text-5xl md:text-6xl font-bold mb-4 text-grey-600">Active</div>
                <p className="text-xl text-gray-700 mb-8">Core architecture committed to GitHub</p>
                <div className="space-y-6 text-left w-full max-w-md mx-auto">
                  <div className="space-y-2">
                     <div className="flex justify-between font-bold">
                        <span>Frontend Setup</span>
                        <span>85%</span>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: '85%' }}></div>
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                     <div className="flex justify-between font-bold">
                        <span>Database Schema</span>
                        <span>90%</span>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: '90%' }}></div>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <div className="flex justify-between font-bold">
                        <span>Feature Implementation</span>
                        <span>80%</span>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-purple-600 h-4 rounded-full" style={{ width: '80%' }}></div>
                     </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500"><span className="font-bold text-gray-700">Note:</span> Fleet system/features consideration on-going.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentSlideWrapper>
      )
    },

    // 9. Part 3 Divider
    {
      content: (
        <TitleSlideWrapper bg={brandColors.primary}>
          <Palette className="w-24 h-24 md:w-32 md:h-32 mb-8 md:mb-12 text-white" />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 text-white">PART 3</h1>
          <h2 className="text-3xl md:text-5xl font-medium text-white">Graphic Design & Media</h2>
        </TitleSlideWrapper>
      )
    },

    // 10. Creative Work - UPDATED PORTFOLIO
    {
      content: (
        <ContentSlideWrapper>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12" style={{ color: brandColors.primary }}>Creative Design Portfolio</h2>
          
          <div className="mb-8 md:mb-12">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold">Asset Gallery</h3>
                    <p className="text-gray-500 mt-1">Key Visuals</p>
                </div>
            </div>
            {/* New Grid Carousel */}
            <PortfolioCarousel groups={portfolioGroups} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            <div className="bg-gray-50 p-6 md:p-8 rounded-xl">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Tools & Technologies</h3>
              <ul className="space-y-3 md:space-y-4 text-base md:text-lg">
                <li className="flex items-center gap-3"><Palette size={24} className="text-blue-600"/> Adobe Photoshop & Illustrator</li>
                <li className="flex items-center gap-3"><TrendingUp size={24} className="text-purple-600"/> Adobe After Effects</li>
                <li className="flex items-center gap-3"><Code size={24} className="text-green-600"/> Photopea (Web-based Editor)</li>
                <li className="flex items-center gap-3"><BarChart3 size={24} className="text-yellow-600"/> Google Veo (AI Video Generation)</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 md:p-8 rounded-xl">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Key Achievements</h3>
              <ul className="list-disc pl-6 space-y-3 md:space-y-4 text-base md:text-lg text-gray-700">
                <li>Created unified visual assets for all major service lines.</li>
                <li>Designed animated intro sequence for corporate videos.</li>
                <li>Maintained brand consistency across 30+ countries.</li>
              </ul>
            </div>
          </div>
        </ContentSlideWrapper>
      )
    },

    // 11. Ongoing Projects
    {
        content: (
            <ContentSlideWrapper>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12" style={{ color: brandColors.primary }}>On-Going Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 flex-1">
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-blue-600 flex flex-col">
                        <Server size={40} className="text-blue-600 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">NAS System Setup</h3>
                        <p className="text-gray-600 mb-4">Network-Attached Storage implementation for the Fleet Department to centralize data.</p>
                        <span className="mt-auto inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full w-fit">Infrastructure</span>
                    </div>
                    
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-purple-600 flex flex-col">
                        <LayoutTemplate size={40} className="text-purple-600 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Design Exercise</h3>
                        <p className="text-gray-600 mb-4">End-of-month creative sprint to explore new visual concepts for Q1 2026.</p>
                        <span className="mt-auto inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm font-bold rounded-full w-fit">Creative</span>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-cyan-500 flex flex-col">
                        <Droplets size={40} className="text-cyan-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Digitizing Water Delivery</h3>
                        <p className="text-gray-600 mb-4">Migrating manual water delivery logs to a digital tracking dashboard.</p>
                        <span className="mt-auto inline-block px-3 py-1 bg-cyan-100 text-cyan-800 text-sm font-bold rounded-full w-fit">Automation</span>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-green-600 flex flex-col">
                        <Code size={40} className="text-green-600 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">EMS Finalization</h3>
                        <p className="text-gray-600 mb-4">Completing the Enterprise Management System deployment and testing.</p>
                        <span className="mt-auto inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full w-fit">Development</span>
                    </div>
                </div>
            </ContentSlideWrapper>
        )
    },

    // 12. Closing
    {
      content: (
        <TitleSlideWrapper bg={brandColors.primary}>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">Thank You</h1>
          <p className="text-2xl md:text-4xl mb-12 text-white">La Necar Logistics LLC</p>
          <div className="px-6 py-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 text-white">
             <span className="font-mono text-lg md:text-xl">dev@lanecarlogistics.com</span>
          </div>
          <p className="text-lg text-gray-400 mt-24">Report Generated: {new Date().toLocaleDateString()}</p>
        </TitleSlideWrapper>
      )
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Printable Content Area */}
      <div className="flex-grow w-full relative overflow-hidden">
        <div ref={componentRef} className="h-full w-full bg-white">
            {slides.map((slide, index) => (
                <div 
                    key={index} 
                    className={`h-full w-full ${index === currentSlide ? 'block' : 'hidden'} slide-container`}
                >
                    {slide.content}
                </div>
            ))}
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-gray-900 text-white p-4 flex-shrink-0 flex items-center justify-between shadow-2xl no-print z-50">
        
        <div className="flex items-center gap-4">
             <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-gray-800 border border-gray-700 md:border-none"
            >
              <ChevronLeft size={20} />
              <span className="text-sm md:text-lg hidden md:inline">Previous</span>
            </button>

             <span className="text-sm md:text-lg font-mono text-gray-400">
                {currentSlide + 1} / {slides.length}
             </span>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-gray-800 border border-gray-700 md:border-none"
            >
              <span className="text-sm md:text-lg hidden md:inline">Next</span>
              <ChevronRight size={20} />
            </button>
        </div>

        {/* Download Menu */}
        <div className="relative">
          <button
            onClick={() => setShowDownloadMenu(!showDownloadMenu)}
            className="flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg bg-green-600 hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/20"
          >
            <Download size={20} />
            <span className="text-sm md:text-lg whitespace-nowrap">Download</span>
          </button>

          {showDownloadMenu && (
             <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
                <button 
                  onClick={() => { setShowDownloadMenu(false); handlePrint(); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-800"
                >
                    <FileText size={18} />
                    <span>Save as PDF</span>
                </button>
                <button 
                  onClick={() => { generatePPTX(); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-800 border-t border-gray-100"
                >
                    <Presentation size={18} />
                    <span>Save as PowerPoint</span>
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechReport;