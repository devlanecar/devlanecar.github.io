'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { Download, Phone, Globe, Mail, Image as ImageIcon } from 'lucide-react';

const TransitionMain = () => {
  const spread1Ref = useRef<HTMLDivElement>(null);
  const spread2Ref = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const brand = {
    primary: '#000f83',
    secondary: '#f5ab1b',
    dark: '#0d1333',
    light: '#f0f2fa',
    white: '#ffffff',
  };

  const images = {
    hero: 'https://infinitelovinghands.com/wp-content/uploads/2025/07/a-caregiver-who-puts-an-elderly-person-in-a-long-t-2025-03-13-23-31-57-utc-scaled.jpg',
    safety: 'https://brodaseating.com/wp-content/uploads/2025/03/BRO_BecomeNEMTDriver_Blog_bestpractice.jpg',
    family: 'https://cdn.prod.website-files.com/63982b47e742b8ffdf13610b/66d6240535007e91244bf13f_49.jpg',
    scanme: '/images/qrscan.png',
    logo: '/logo.png',
  };

  const A4_W = 794;
  const A4_H = 1123;

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'LaNecar_TransitionMain_Booklet',
    pageStyle: `
      @page { size: A3 landscape; margin: 0; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .spread { page-break-after: always; width: 420mm; height: 297mm; display: flex; }
      }
    `,
  } as any);

  const dlJPG = async (ref: React.RefObject<HTMLDivElement | null>, name: string) => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 4, useCORS: true, allowTaint: true, backgroundColor: '#fff', scrollX: 0, scrollY: 0 });
    const a = document.createElement('a');
    a.download = `${name}.jpg`;
    a.href = canvas.toDataURL('image/jpeg', 0.97);
    a.click();
  };

  const S = {
    // Typography helpers
    label: { fontFamily: 'Arial, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 3.5, textTransform: 'uppercase' as const, color: brand.secondary, margin: 0 },
    h1page: { fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 40, lineHeight: 1.03, textTransform: 'uppercase' as const, letterSpacing: -1, margin: 0 },
    h2sec: { fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 24, textTransform: 'uppercase' as const, letterSpacing: -0.5, margin: 0 },
    h3card: { fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 13, textTransform: 'uppercase' as const, letterSpacing: 0.2, margin: 0 },
    body: { fontFamily: 'Arial, sans-serif', fontSize: 12, lineHeight: 1.68, color: '#374151', margin: 0 },
    bodySmall: { fontFamily: 'Arial, sans-serif', fontSize: 11, lineHeight: 1.65, color: '#4b5563', margin: 0 },
    quote: { fontFamily: 'Georgia, serif', fontSize: 12.5, lineHeight: 1.75, fontStyle: 'italic' as const, margin: 0 },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#475569', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 0 80px', gap: 44, fontFamily: 'Arial, sans-serif' }}>

      {/* Control Bar */}
      <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={() => handlePrint()} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 26px', borderRadius: 999, background: brand.secondary, color: brand.primary, fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          <Download size={16} /> Download PDF (Print-Ready A3)
        </button>
        {[['Spread 1 JPG (Pages 1 & 4)', () => dlJPG(spread1Ref, 'LaNecar_Main_Pg1-4')], ['Spread 2 JPG (Pages 2 & 3)', () => dlJPG(spread2Ref, 'LaNecar_Main_Pg2-3')]].map(([label, fn]: any, i) => (
          <button key={i} onClick={fn} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 999, background: brand.white, color: brand.primary, fontWeight: 700, fontSize: 11, border: `2px solid ${brand.primary}`, cursor: 'pointer' }}>
            <ImageIcon size={13} /> {label}
          </button>
        ))}
      </div>

      <div ref={componentRef}>

        {/* ═══════════ SPREAD 1: PAGE 1 (left) + PAGE 4 (right) ═══════════ */}
        <div ref={spread1Ref} style={{ width: A4_W * 2, height: A4_H, display: 'flex', boxShadow: '0 24px 64px rgba(0,0,0,0.45)' }}>

          {/* ── PAGE 1: COVER ── */}
          <div style={{ width: A4_W, height: A4_H, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

            {/* Hero image — top 52% */}
            <div style={{ height: A4_H * 0.52, position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', backgroundImage: `url(${images.hero})`, backgroundSize: 'cover', backgroundPosition: 'center 20%' }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(155deg, ${brand.primary}d0 0%, ${brand.primary}55 55%, transparent 100%)` }} />
              {/* Logo */}
              <div style={{ position: 'absolute', top: 26, left: 26, width: 58, height: 58, background: brand.white, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 7, boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}>
                <img src={images.logo} alt="La Necar" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              {/* Yellow ribbon tab */}
              <div style={{ position: 'absolute', top: 0, right: 46, width: 16, height: 88, background: brand.secondary }} />
              {/* Badge */}
              <div style={{ position: 'absolute', bottom: 24, left: 26 }}>
                <span style={{ ...S.label, background: brand.secondary, color: brand.primary, padding: '5px 14px', display: 'inline-block' }}>Family Resource 2025</span>
              </div>
            </div>

            {/* Blue content block — fills exactly the rest */}
            <div style={{ flex: 1, background: brand.primary, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px 34px 26px' }}>
              <div>
                <h1 style={{ ...S.h1page, color: brand.white, marginBottom: 14 }}>
                  Supporting Safe,<br />
                  <span style={{ color: brand.secondary }}>Reliable Transit</span><br />
                  for Individuals<br />with IDD
                </h1>
                <div style={{ width: 52, height: 5, background: brand.secondary, marginBottom: 15, borderRadius: 2 }} />
                <p style={{ ...S.body, color: 'rgba(255,255,255,0.80)', fontStyle: 'italic', fontSize: 13 }}>
                  What Families and Caregivers Must Know<br />Before Selecting a Transportation Provider
                </p>
              </div>

              {/* Pull quote */}
              <div style={{ borderLeft: `5px solid ${brand.secondary}`, paddingLeft: 18, paddingTop: 14, paddingBottom: 14, background: 'rgba(255,255,255,0.07)' }}>
                <p style={{ ...S.quote, color: 'rgba(255,255,255,0.92)', fontSize: 13 }}>
                  "Transportation Isn't Just a Ride — it's an opportunity to participate in daily life with safety and dignity. That's why we created this guide; to help families make confident decisions when arranging rides for the individuals they support."
                </p>
              </div>

              {/* Bottom contact line */}
              <div style={{ display: 'flex', gap: 22, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.15)', marginTop: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: 11 }}><Phone size={11} color={brand.secondary} style={{ marginRight: 6, verticalAlign: 'middle' }} />+1 855-202-9967</span>
                <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: 11 }}><Globe size={11} color={brand.secondary} style={{ marginRight: 6, verticalAlign: 'middle' }} />lanecarlogisticsllc.com</span>
              </div>
            </div>
          </div>

          {/* ── PAGE 4: IMPACT + TESTIMONIALS + CONTACT ── */}
          <div style={{ width: A4_W, height: A4_H, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '1px solid #d1d5db' }}>

            {/* Section header */}
            <div style={{ background: brand.dark, padding: '22px 34px 18px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <p style={{ ...S.label, marginBottom: 4 }}>La Necar Logistics</p>
                <h2 style={{ ...S.h2sec, color: brand.white }}>Our Impact</h2>
              </div>
              <span style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 80, fontWeight: 900, color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>04</span>
            </div>

            {/* Stats strip — 4 columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', flexShrink: 0 }}>
              {[
                { val: '280k+', lbl: 'Miles\nCompleted 2025', bg: brand.primary, light: false },
                { val: '18k+', lbl: 'Successful\nTrips', bg: brand.secondary, light: true },
                { val: '95%', lbl: 'On-Time\nPerformance', bg: '#0918a8', light: false },
                { val: 'Minimal', lbl: 'Discharge\nRate', bg: brand.dark, light: false },
              ].map((s, i) => (
                <div key={i} style={{ background: s.bg, padding: '20px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: '"Arial Black", sans-serif', fontSize: s.val.length > 4 ? 19 : 26, fontWeight: 900, color: s.light ? brand.primary : brand.white, lineHeight: 1 }}>{s.val}</span>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 7.5, fontWeight: 700, color: s.light ? 'rgba(0,15,131,0.65)' : 'rgba(255,255,255,0.65)', letterSpacing: 1.5, textTransform: 'uppercase', textAlign: 'center', marginTop: 5, whiteSpace: 'pre-line', lineHeight: 1.4 }}>{s.lbl}</span>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div style={{ flex: 1, padding: '24px 34px 0', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
              <h3 style={{ ...S.h3card, color: brand.primary, letterSpacing: 2, marginBottom: 4 }}>What Families Are Saying</h3>

              {[
                { text: '"The team is very polite and accommodating, and I appreciate the texts as well. We love being La Necar customers!"', name: 'Alex, Dad', accent: brand.primary, bg: '#eef2ff' },
                { text: '"As a parent, I genuinely appreciate the exceptional kindness, patience and care my child receives from her driver. She consistently ensures my daughter feels safe and supported. This gives me peace of mind."', name: 'Emma, Mom', accent: brand.secondary, bg: '#fffbeb' },
                { text: '"I\'m so satisfied with La Necar transportation. The driver is always on time to pick up my child, both at home and at the program which makes everything smooth."', name: 'Olivia, Mom', accent: brand.primary, bg: '#eef2ff' },
              ].map((t, i) => (
                <div key={i} style={{ borderLeft: `4px solid ${t.accent}`, paddingLeft: 16, paddingTop: 11, paddingBottom: 11, paddingRight: 14, background: t.bg }}>
                  <p style={{ ...S.quote, color: '#2d3748', fontSize: 12, marginBottom: 7 }}>{t.text}</p>
                  <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 10, fontWeight: 800, color: t.accent === brand.secondary ? '#92740a' : brand.primary, letterSpacing: 1.2, textTransform: 'uppercase', margin: 0 }}>— {t.name}</p>
                </div>
              ))}
            </div>

            {/* Contact footer */}
            <div style={{ display: 'flex', flexShrink: 0, marginTop: 'auto' }}>
              <div style={{ flex: 1, background: brand.secondary, padding: '22px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', color: brand.primary, lineHeight: 1.15, margin: 0, marginBottom: 5 }}>Your Partner in Safe,<br />Everyday Mobility.</h3>
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, color: 'rgba(0,15,131,0.70)', margin: 0, fontWeight: 600 }}>Contact us today to get started.</p>
              </div>
              <div style={{ background: brand.primary, padding: '22px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 9, minWidth: 226 }}>
                {[
                  { icon: <Phone size={12} color={brand.secondary} />, text: '+1 855-202-9967' },
                  { icon: <Mail size={12} color={brand.secondary} />, text: 'services@lanecarlogisticsllc.com', small: true },
                  { icon: <Globe size={12} color={brand.secondary} />, text: 'lanecarlogisticsllc.com' },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, color: brand.white, fontFamily: 'Arial, sans-serif', fontSize: c.small ? 10 : 11 }}>
                    {c.icon} {c.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ SPREAD 2: PAGE 2 (left) + PAGE 3 (right) ═══════════ */}
        <div ref={spread2Ref} style={{ width: A4_W * 2, height: A4_H, display: 'flex', boxShadow: '0 24px 64px rgba(0,0,0,0.45)', marginTop: 44 }}>

          {/* ── PAGE 2: 5 KEY FACTORS ── */}
          <div style={{ width: A4_W, height: A4_H, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            <div style={{ background: brand.primary, padding: '22px 34px 18px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <p style={{ ...S.label, marginBottom: 4 }}>Essential Criteria</p>
                <h2 style={{ ...S.h2sec, color: brand.white }}>5 Key Factors to Consider</h2>
              </div>
              <span style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 80, fontWeight: 900, color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>02</span>
            </div>

            {/* Subtitle bar */}
            <div style={{ background: brand.secondary, padding: '10px 34px', flexShrink: 0 }}>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 11.5, fontWeight: 700, color: brand.primary, margin: 0 }}>
                Essential criteria for ensuring supportive and dignified IDD Transportation
              </p>
            </div>

            {/* 5 factors — each row fills equal share, no gaps */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {[
                { num: '01', title: 'Trained, Specialized Drivers', body: 'To support the well-being and dignity of your individual during rides, look out for drivers who are trained to: recognize and respond to unique communication needs including non-verbal methods; manage anxiety, behavioral challenges, or sensory sensitivities professionally; and ensure consistent routines during transit to support predictability.', alt: false },
                { num: '02', title: 'Driver Retention', body: 'Consistency supports predictable routines for your individual. Look out for providers with high driver retention rates, as this often leads to smoother trips and greater confidence for families.', alt: true },
                { num: '03', title: 'Visibility Into Every Trip', body: 'Knowing where your individual is in transit, and who to contact when you have a concern, is real peace of mind. Ensure providers can deliver real-time GPS tracking, instant notifications for pickup and drop-off, and direct communication with drivers and live support staff.', alt: false },
                { num: '04', title: 'Accessible, Sensory-Aware Rides', body: 'Transportation should accommodate both the physical and sensory needs of your individual. When evaluating providers, consider whether they offer Wheelchair-Accessible Vehicles (WAVs) and sensory-friendly interiors.', alt: true },
                { num: '05', title: 'Quick Issue Resolution', body: 'Select a provider with a responsive support team capable of addressing concerns immediately. Look for reviews from clients for information on this.', alt: false },
              ].map((f, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'stretch', background: f.alt ? brand.light : brand.white, borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none' }}>
                  {/* Number block */}
                  <div style={{ width: 70, background: i % 2 === 0 ? brand.primary : brand.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 24, fontWeight: 900, color: i % 2 === 0 ? brand.white : brand.primary, letterSpacing: -1 }}>{f.num}</span>
                  </div>
                  {/* Text */}
                  <div style={{ flex: 1, padding: '11px 20px 11px 17px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h4 style={{ ...S.h3card, color: brand.dark, marginBottom: 5, fontSize: 12.5 }}>{f.title}</h4>
                    <p style={{ ...S.bodySmall, fontSize: 11.5, color: '#4b5563' }}>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── PAGE 3: WHO WE ARE + WHY RIDE ── */}
          <div style={{ width: A4_W, height: A4_H, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '1px solid #d1d5db' }}>

            <div style={{ background: brand.dark, padding: '22px 34px 18px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <p style={{ ...S.label, marginBottom: 4 }}>La Necar Logistics</p>
                <h2 style={{ ...S.h2sec, color: brand.white }}>Who We Are</h2>
              </div>
              <span style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 80, fontWeight: 900, color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>03</span>
            </div>

            {/* Intro row: text + image side by side */}
            <div style={{ display: 'flex', flexShrink: 0, height: 176 }}>
              <div style={{ flex: 1, padding: '18px 24px', display: 'flex', alignItems: 'center', background: brand.light }}>
                <p style={{ ...S.body, fontSize: 12.5, color: '#2d3748', lineHeight: 1.72 }}>
                  La Necar Logistics provides inclusive transportation for individuals with disabilities. Serving <strong>all counties in New Jersey</strong> and surrounding areas, we provide wheelchair accessible rides for work, medical appointments, recreational activities, therapy, and community access.
                </p>
              </div>
              <div style={{ width: 210, flexShrink: 0, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', backgroundImage: `url(${images.safety})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </div>
            </div>

            {/* WHY RIDE label bar */}
            <div style={{ background: brand.secondary, padding: '10px 34px', flexShrink: 0 }}>
              <p style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 12, color: brand.primary, margin: 0, textTransform: 'uppercase', letterSpacing: 2 }}>Why Ride With La Necar Logistics</p>
            </div>

            {/* 4 feature rows */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {[
                { title: 'Full Trip Visibility', body: 'La Necar provides real-time monitoring and instant ride updates on pickup & drop-off, keeping families and caregivers confident and reassured every step of the way.', inv: true },
                { title: 'Wheelchair Accessibility & Sensory Aware Rides', body: 'La Necar offers inclusive and comfortable transportation for every mobility need, helping your loved one travel with dignity, confidence, and ease.', inv: false },
                { title: 'Third-Party Ride-Share Coordination', body: 'La Necar partners with Uber Health to provide rides for eligible individuals aged 21 and above, ensuring continuous mobility support at all times.', inv: true },
                { title: 'Safety First, Always', body: 'At La Necar Logistics, we train our drivers to recognize person-centered regulation needs. With specialized expertise in behavioral and communication support, our CPR-certified drivers ensure every rider is treated with respect, dignity, and care.', inv: false },
              ].map((f, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'stretch', background: f.inv ? brand.primary : brand.white, borderBottom: i < 3 ? `1px solid ${f.inv ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}` : 'none' }}>
                  <div style={{ width: 6, background: f.inv ? brand.secondary : brand.primary, flexShrink: 0 }} />
                  <div style={{ flex: 1, padding: '11px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h4 style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 12, color: f.inv ? brand.secondary : brand.primary, margin: 0, marginBottom: 4, textTransform: 'uppercase' }}>{f.title}</h4>
                    <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 11.5, color: f.inv ? 'rgba(255,255,255,0.87)' : '#475569', lineHeight: 1.62, margin: 0 }}>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA footer */}
            <div style={{ display: 'flex', flexShrink: 0, borderTop: `4px solid ${brand.secondary}` }}>
              <div style={{ flex: 1, background: brand.primary, padding: '18px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontFamily: '"Arial Black", sans-serif', fontWeight: 900, fontSize: 17, color: brand.white, textTransform: 'uppercase', margin: 0, lineHeight: 1.18 }}>
                  Your Partner in Safe,<br />Every Day Mobility.
                </p>
              </div>
              <div style={{ width: 88, background: brand.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <div style={{ width: 66, height: 66, background: brand.white, borderRadius: 6, padding: 4 }}>
                  <div style={{ width: '100%', height: '100%', backgroundImage: `url(${images.scanme})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TransitionMain;

'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { Download, Phone, Globe, Mail, Image as ImageIcon } from 'lucide-react';

const TransitionMin = () => {
  const spread1Ref = useRef<HTMLDivElement>(null);
  const spread2Ref = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const brand = {
    primary: '#000f83',
    secondary: '#f5ab1b',
    dark: '#0d1333',
    light: '#f0f2fa',
    white: '#ffffff',
  };

  const images = {
    hero: 'https://infinitelovinghands.com/wp-content/uploads/2025/07/a-caregiver-who-puts-an-elderly-person-in-a-long-t-2025-03-13-23-31-57-utc-scaled.jpg',
    safety: 'https://brodaseating.com/wp-content/uploads/2025/03/BRO_BecomeNEMTDriver_Blog_bestpractice.jpg',
    family: 'https://cdn.prod.website-files.com/63982b47e742b8ffdf13610b/66d6240535007e91244bf13f_49.jpg',
    wheelchair: 'https://elderaffairs.org/wp-content/uploads/elder-transportation-scaled.jpeg',
    scanme: '/images/qrscan.png',
    logo: '/logo.png',
  };

  const A4_W = 794;
  const A4_H = 1123;

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'LaNecar_TransitionMin_Booklet',
    pageStyle: `
      @page { size: A3 landscape; margin: 0; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .spread { page-break-after: always; width: 420mm; height: 297mm; display: flex; }
      }
    `,
  } as any);

  const dlJPG = async (ref: React.RefObject<HTMLDivElement | null>, name: string) => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 4, useCORS: true, allowTaint: true, backgroundColor: '#fff', scrollX: 0, scrollY: 0 });
    const a = document.createElement('a');
    a.download = `${name}.jpg`;
    a.href = canvas.toDataURL('image/jpeg', 0.97);
    a.click();
  };

  const S = {
    label: { fontFamily: 'Arial, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 3.5, textTransform: 'uppercase' as const, color: brand.secondary, margin: 0 },
    h1page: { fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, lineHeight: 1.03, textTransform: 'uppercase' as const, letterSpacing: -1, margin: 0 },
    h2sec: { fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 24, textTransform: 'uppercase' as const, letterSpacing: -0.5, margin: 0 },
    h3card: { fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 13, textTransform: 'uppercase' as const, letterSpacing: 0.2, margin: 0 },
    quote: { fontFamily: 'Georgia, serif', fontSize: 12.5, lineHeight: 1.75, fontStyle: 'italic' as const, margin: 0 },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#475569', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 0 80px', gap: 44, fontFamily: 'Arial, sans-serif' }}>

      {/* Control Bar */}
      <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={() => handlePrint()} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 26px', borderRadius: 999, background: brand.secondary, color: brand.primary, fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          <Download size={16} /> Download PDF (Print-Ready A3)
        </button>
        {[['Spread 1 JPG (Pages 1 & 4)', () => dlJPG(spread1Ref, 'LaNecar_Min_Pg1-4')], ['Spread 2 JPG (Pages 2 & 3)', () => dlJPG(spread2Ref, 'LaNecar_Min_Pg2-3')]].map(([label, fn]: any, i) => (
          <button key={i} onClick={fn} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 999, background: brand.white, color: brand.primary, fontWeight: 700, fontSize: 11, border: `2px solid ${brand.primary}`, cursor: 'pointer' }}>
            <ImageIcon size={13} /> {label}
          </button>
        ))}
      </div>

      <div ref={componentRef}>

        {/* ═══════════ SPREAD 1: PAGE 1 (left) + PAGE 4 (right) ═══════════ */}
        <div ref={spread1Ref} style={{ width: A4_W * 2, height: A4_H, display: 'flex', boxShadow: '0 24px 64px rgba(0,0,0,0.45)' }}>

          {/* ── PAGE 1: COVER ── */}
          <div style={{ width: A4_W, height: A4_H, display: 'flex', overflow: 'hidden', position: 'relative' }}>

            {/* LEFT: Blue column — full height */}
            <div style={{ width: '46%', height: '100%', background: brand.primary, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px 26px 26px', flexShrink: 0, zIndex: 2, position: 'relative' }}>
              {/* Logo */}
              <div style={{ width: 56, height: 56, background: brand.white, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
                <img src={images.logo} alt="La Necar" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              {/* Main headline */}
              <div>
                <span style={{ ...S.label, background: brand.secondary, color: brand.primary, padding: '5px 10px', display: 'inline-block', marginBottom: 16 }}>New Jersey · All Counties</span>
                <h1 style={{ ...S.h1page, fontSize: 36, color: brand.white, marginBottom: 14 }}>
                  Now<br />Serving<br />
                  <span style={{ color: brand.secondary }}>All Counties</span><br />
                  in New<br />Jersey
                </h1>
                <div style={{ width: 44, height: 5, background: brand.secondary, marginBottom: 16, borderRadius: 2 }} />
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.80)', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
                  Wheelchair Accessible Rides — Supporting Independence and Participation in Daily Life
                </p>
              </div>

              {/* Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10.5 }}><Phone size={10} color={brand.secondary} style={{ marginRight: 6, verticalAlign: 'middle' }} />+1 855-202-9967</span>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10.5 }}><Globe size={10} color={brand.secondary} style={{ marginRight: 6, verticalAlign: 'middle' }} />lanecarlogisticsllc.com</span>
              </div>
            </div>

            {/* RIGHT: Yellow + hero image */}
            <div style={{ flex: 1, height: '100%', background: brand.secondary, position: 'relative', overflow: 'hidden' }}>
              {/* Hero image fills top 65% */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '65%', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', backgroundImage: `url(${images.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,15,131,0.15)' }} />
              </div>
              {/* Yellow bottom content */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: '62%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px 20px', background: brand.secondary }}>
                {/* QR code */}
                <div style={{ width: 74, height: 74, background: brand.white, borderRadius: 8, padding: 5, marginBottom: 10 }}>
                  <div style={{ width: '100%', height: '100%', backgroundImage: `url(${images.scanme})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                </div>
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 10, fontWeight: 800, color: brand.primary, textTransform: 'uppercase', letterSpacing: 1.5, textAlign: 'center', margin: 0 }}>Scan to Contact Us</p>
              </div>
            </div>
          </div>

          {/* ── PAGE 4: TESTIMONIALS + CONTACT ── */}
          <div style={{ width: A4_W, height: A4_H, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '1px solid #d1d5db' }}>

            {/* Header */}
            <div style={{ background: brand.dark, padding: '22px 34px 18px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <p style={{ ...S.label, marginBottom: 4 }}>La Necar Logistics</p>
                <h2 style={{ ...S.h2sec, color: brand.white }}>What Families Are Saying</h2>
              </div>
              <span style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 80, fontWeight: 900, color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>04</span>
            </div>

            {/* Driver image with overlay */}
            <div style={{ position: 'relative', height: 196, flexShrink: 0, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', backgroundImage: `url(${images.safety})`, backgroundSize: 'cover', backgroundPosition: 'center 30%' }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${brand.primary}cc 0%, ${brand.primary}44 60%, transparent 100%)` }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: 34, paddingRight: '45%' }}>
                <div>
                  <p style={{ ...S.label, marginBottom: 8 }}>Our Promise</p>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: 13, color: brand.white, lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>
                    "We train our drivers to recognize person-centered regulation needs and adjust support to promote comfort and safety during rides."
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonials — fill remaining */}
            <div style={{ flex: 1, padding: '22px 34px 0', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
              {[
                {
                  text: '"The team is very polite and accommodating, and I appreciate the texts regarding daily transportation schedules as well! We love being LaNecar customers!"',
                  name: 'Alex, Dad',
                  accent: brand.primary,
                  bg: '#eef2ff',
                },
                {
                  text: '"I was very satisfied with the transportation service. The drivers were punctual 99% of the time, the staff were professional and respectful, and they consistently showed care for my ward\'s needs. The vehicles were comfortable, and the service was reliable throughout. I appreciate their efficiency and would gladly recommend them to other families or caregivers."',
                  name: 'Gabriela, Guardian',
                  accent: brand.secondary,
                  bg: '#fffbeb',
                },
              ].map((t, i) => (
                <div key={i} style={{ borderLeft: `4px solid ${t.accent}`, paddingLeft: 16, paddingTop: 13, paddingBottom: 13, paddingRight: 14, background: t.bg }}>
                  <p style={{ ...S.quote, color: '#2d3748', fontSize: 12.5, marginBottom: 9 }}>{t.text}</p>
                  <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 10, fontWeight: 800, color: t.accent === brand.secondary ? '#92740a' : brand.primary, letterSpacing: 1.2, textTransform: 'uppercase', margin: 0 }}>— {t.name}</p>
                </div>
              ))}
            </div>

            {/* Contact footer */}
            <div style={{ display: 'flex', flexShrink: 0, marginTop: 'auto' }}>
              <div style={{ flex: 1, background: brand.secondary, padding: '22px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 20, textTransform: 'uppercase', color: brand.primary, lineHeight: 1.15, margin: 0, marginBottom: 5 }}>Contact Us Today</h3>
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 11.5, color: 'rgba(0,15,131,0.70)', margin: 0, fontWeight: 600 }}>Schedule your ride — we're ready.</p>
              </div>
              <div style={{ background: brand.primary, padding: '22px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 9, minWidth: 226 }}>
                {[
                  { icon: <Phone size={12} color={brand.secondary} />, text: '+1 855-202-9967' },
                  { icon: <Mail size={12} color={brand.secondary} />, text: 'services@lanecarlogisticsllc.com', small: true },
                  { icon: <Globe size={12} color={brand.secondary} />, text: 'lanecarlogisticsllc.com' },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, color: brand.white, fontFamily: 'Arial, sans-serif', fontSize: c.small ? 10 : 11 }}>
                    {c.icon} {c.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ SPREAD 2: PAGE 2 (left) + PAGE 3 (right) ═══════════ */}
        <div ref={spread2Ref} style={{ width: A4_W * 2, height: A4_H, display: 'flex', boxShadow: '0 24px 64px rgba(0,0,0,0.45)', marginTop: 44 }}>

          {/* ── PAGE 2: THIRD-PARTY RIDE-SHARE ── */}
          <div style={{ width: A4_W, height: A4_H, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            <div style={{ background: brand.primary, padding: '22px 34px 18px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <p style={{ ...S.label, marginBottom: 4 }}>Our Services</p>
                <h2 style={{ ...S.h2sec, color: brand.white }}>Third-Party Ride-Share Coordination</h2>
              </div>
              <span style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 80, fontWeight: 900, color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>02</span>
            </div>

            {/* Subtitle bar */}
            <div style={{ background: brand.secondary, padding: '10px 34px', flexShrink: 0 }}>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 11.5, fontWeight: 700, color: brand.primary, margin: 0 }}>
                Flexible rides for eligible individuals aged 21 and above
              </p>
            </div>

            {/* Main content — fills full remaining height */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

              {/* Uber Health description — large block */}
              <div style={{ flex: 2, padding: '24px 34px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: brand.white, borderBottom: '1px solid #e2e8f0' }}>
                <h3 style={{ ...S.h3card, color: brand.primary, fontSize: 14, marginBottom: 14 }}>Uber Health Partnership</h3>
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#2d3748', lineHeight: 1.72, margin: 0 }}>
                  La Necar Logistics now coordinates with <strong>Uber Health</strong> to provide flexible rides for eligible individuals aged <strong>21 and above</strong>. These rides can be used for doctor visits, recreational activities, community access, and more.
                </p>
                <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid #e2e8f0' }}>
                  <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#4b5563', lineHeight: 1.68, margin: 0 }}>
                    Our partnership ensures that transportation gaps are never a barrier to care, community, or independence. Eligible individuals are connected seamlessly to rides that fit their schedule and medical or recreational needs.
                  </p>
                </div>
              </div>

              {/* Eligible trip purposes — 6 cells */}
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: brand.light }}>
                {[
                  { label: 'Doctor Visits', bg: brand.primary },
                  { label: 'Recreational Activities', bg: brand.white },
                  { label: 'Community Access', bg: brand.primary },
                  { label: 'Therapy Appointments', bg: brand.white },
                  { label: 'Vocational Programs', bg: brand.primary },
                  { label: 'And More', bg: brand.secondary },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 10px', background: item.bg, borderRight: i % 3 < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none', borderBottom: i < 3 ? `1px solid rgba(255,255,255,0.15)` : 'none' }}>
                    <span style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center', color: item.bg === brand.white ? brand.primary : item.bg === brand.secondary ? brand.primary : brand.white }}>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Eligibility note */}
              <div style={{ padding: '18px 34px', background: brand.dark, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 5, alignSelf: 'stretch', background: brand.secondary, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 11, color: brand.secondary, textTransform: 'uppercase', letterSpacing: 1, margin: 0, marginBottom: 4 }}>Eligibility</p>
                  <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, margin: 0 }}>
                    Available for individuals aged 21 and above. Contact our team to verify eligibility and coordinate scheduling.
                  </p>
                </div>
              </div>

              {/* Bottom image strip */}
              <div style={{ position: 'relative', height: 100, flexShrink: 0, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', backgroundImage: `url(${images.family})`, backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${brand.primary}cc 0%, ${brand.primary}33 100%)` }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: 34 }}>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: 13, color: brand.white, fontStyle: 'italic', margin: 0 }}>
                    "La Necar — Connecting communities, one ride at a time."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── PAGE 3: WHEELCHAIR ACCESSIBLE VEHICLES ── */}
          <div style={{ width: A4_W, height: A4_H, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '1px solid #d1d5db' }}>

            <div style={{ background: brand.dark, padding: '22px 34px 18px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <p style={{ ...S.label, marginBottom: 4 }}>Our Services</p>
                <h2 style={{ ...S.h2sec, color: brand.white }}>Wheelchair Accessible Vehicles</h2>
              </div>
              <span style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 80, fontWeight: 900, color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>03</span>
            </div>

            {/* Subtitle bar */}
            <div style={{ background: brand.secondary, padding: '10px 34px', flexShrink: 0 }}>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 11.5, fontWeight: 700, color: brand.primary, margin: 0 }}>
                Serving all counties in New Jersey — foldable &amp; non-foldable wheelchairs
              </p>
            </div>

            {/* WAV hero image */}
            <div style={{ position: 'relative', height: 200, flexShrink: 0, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', backgroundImage: `url(${images.wheelchair})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, rgba(13,19,51,0.85) 100%)` }} />
              <div style={{ position: 'absolute', bottom: 20, left: 34, right: 34 }}>
                <p style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 16, color: brand.white, textTransform: 'uppercase', margin: 0, lineHeight: 1.2 }}>
                  Stable Daily Routines.<br />Active Community Engagement.
                </p>
              </div>
            </div>

            {/* Content rows — fills remaining */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

              {/* Description */}
              <div style={{ padding: '20px 34px', background: brand.light, borderBottom: '1px solid #e2e8f0' }}>
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#2d3748', lineHeight: 1.72, margin: 0 }}>
                  Serving <strong>all counties in New Jersey</strong>, La Necar Logistics provides vehicles designed to accommodate both <strong>foldable and non-foldable wheelchairs</strong>, helping riders maintain stable daily routines and active community engagement.
                </p>
              </div>

              {/* Feature rows */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {[
                  { label: 'Accommodates foldable wheelchairs', inv: false },
                  { label: 'Accommodates non-foldable wheelchairs', inv: true },
                  { label: 'Sensory-aware, comfortable interiors', inv: false },
                  { label: 'CPR-certified, trained drivers on every trip', inv: true },
                  { label: 'Real-time trip monitoring & instant notifications', inv: false },
                  { label: 'Consistent, predictable scheduling to support daily routines', inv: true },
                ].map((f, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', background: f.inv ? brand.primary : brand.white, borderBottom: i < 5 ? `1px solid ${f.inv ? 'rgba(255,255,255,0.08)' : '#e2e8f0'}` : 'none', paddingLeft: 0 }}>
                    {/* Colored left bar */}
                    <div style={{ width: 6, alignSelf: 'stretch', background: f.inv ? brand.secondary : brand.primary, flexShrink: 0 }} />
                    <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 12.5, fontWeight: 600, color: f.inv ? 'rgba(255,255,255,0.9)' : '#2d3748', margin: 0, padding: '0 22px' }}>
                      {f.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Person-centered care callout */}
              <div style={{ padding: '16px 34px', background: brand.dark, borderTop: `3px solid ${brand.secondary}` }}>
                <p style={{ ...S.label, marginBottom: 6 }}>Person-Centered Care</p>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: 12.5, color: 'rgba(255,255,255,0.90)', lineHeight: 1.68, fontStyle: 'italic', margin: 0 }}>
                  "At La Necar Logistics, we train our drivers to recognize person-centered regulation needs and adjust support to promote comfort and safety during rides."
                </p>
              </div>

              {/* CTA footer */}
              <div style={{ display: 'flex', flexShrink: 0 }}>
                <div style={{ flex: 1, background: brand.secondary, padding: '18px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 15, textTransform: 'uppercase', color: brand.primary, lineHeight: 1.2, margin: 0, marginBottom: 4 }}>
                    Supporting Independence<br />and Daily Participation
                  </h3>
                  <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 10.5, color: 'rgba(0,15,131,0.70)', margin: 0, fontWeight: 600 }}>Active community engagement starts with a reliable ride.</p>
                </div>
                <div style={{ width: 88, background: brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                  <div style={{ width: 66, height: 66, background: brand.white, borderRadius: 6, padding: 4 }}>
                    <div style={{ width: '100%', height: '100%', backgroundImage: `url(${images.scanme})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TransitionMin; 