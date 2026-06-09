'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback, Suspense } from 'react';
import Footer from './components/Footer'; 

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="bg-[#F9F6F0] text-[#4A3E3D] min-h-screen font-sans antialiased selection:bg-[#E5D3C3]">   
      {/* ห่อเนื้อหาทั้งหมดด้วย Suspense เพื่อรองรับ useSearchParams 
        ที่อาจจะถูกเรียกใช้ในคอมโพเนนต์ย่อยในช่วงทำการ Build
      */}
      <Suspense fallback={
        <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center font-serif text-[#4A3E3D]">
          Loading...
        </div>
      }>
        <main className="overflow-hidden">
          <HeroSection />
          <BrandIntroduction />
          <DecorativeObjects />
          <VesselsTableware />
          <BathDiffuserVessel />
        </main>
        <Footer />
      </Suspense>
    </div>
  );
}

const heroSlides = [
  {
    src: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780478880815-990.webp",
    title: "Crafted for Calm Living.",
    subtitle: "Thoughtfully designed to bring warmth and harmony into your home.",
    buttons: [ { label: "Decorative Objects" }, { label: "Vessels & Tableware" } ]
  },
  {
    src: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780478898478-829.webp",
    title: "Decorative Objects",
    subtitle: "", 
    buttons: [ { label: "Shop Collection" } ]
  },
  {
    src: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780478913463-688.webp",
    title: "Vessels & Tableware",
    subtitle: "",
    buttons: [ { label: "Discover More" } ]
  },
  {
    src: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780478931773-588.webp",
    title: "Vessels & Tableware",
    subtitle: "",
    buttons: [ { label: "Explore Range" } ]
  }
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-0 md:aspect-video flex items-center justify-center px-4 md:px-6 overflow-hidden bg-[#2F2420]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(25px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        .delay-200 { animation-delay: 0.15s; } .delay-400 { animation-delay: 0.35s; } .delay-600 { animation-delay: 0.55s; }
      `}} />

      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, idx) => (
          <img
            key={idx}
            src={slide.src}
            alt={`Terra Home Hero ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover filter transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      <div key={currentIndex} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none mt-[-3vh]">
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] tracking-wide mb-4 sm:mb-5 animate-fade-in-up delay-200 font-serif font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] px-2">
          {currentIndex === 0 ? "Crafted for Calm Living." : heroSlides[currentIndex].title}
        </h1>
        {currentIndex === 0 ? (
          <p className="text-white text-xs sm:text-base md:text-lg lg:text-[1.35rem] tracking-wide max-w-3xl font-normal leading-relaxed animate-fade-in-up delay-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] font-sans px-4">
            Thoughtfully designed to bring warmth<br className="hidden sm:block" />and harmony into your home.
          </p>
        ) : (
          heroSlides[currentIndex].subtitle && (
            <p className="text-white text-xs sm:text-base md:text-lg lg:text-[1.35rem] tracking-wide max-w-2xl font-normal leading-relaxed animate-fade-in-up delay-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] font-sans px-4">
              {heroSlides[currentIndex].subtitle}
            </p>
          )
        )}
        {currentIndex !== 0 && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 animate-fade-in-up delay-600 pointer-events-auto mt-6">
            {heroSlides[currentIndex].buttons.map((btn, i) => (
              <button key={i} className="px-6 sm:px-8 py-3 sm:py-3.5 border border-white/40 text-white/90 text-[9px] md:text-xs uppercase tracking-[0.25em] transition-all duration-500 backdrop-blur-xs bg-black/10 rounded-none font-sans font-normal hover:bg-white hover:text-black hover:border-white hover:scale-105">
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-between px-2 sm:px-8 pointer-events-none">
        <button onClick={prevSlide} className="pointer-events-auto w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-transparent text-white/30 hover:bg-white/10 hover:text-white transition-all border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        </button>
        <button onClick={nextSlide} className="pointer-events-auto w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-transparent text-white/30 hover:bg-white/10 hover:text-white transition-all border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" /></svg>
        </button>
      </div>

      <div className="absolute bottom-8 sm:bottom-12 z-10 flex gap-2.5">
        {heroSlides.map((_, idx) => (
          <button key={idx} onClick={() => setCurrentIndex(idx)} className={`transition-all duration-500 rounded-full h-1.5 ${idx === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"}`} />
        ))}
      </div>
    </section>
  );
}

export function BrandIntroduction() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col md:grid md:grid-cols-2 md:aspect-video bg-[#DFD6CE] overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes smoothReveal { 0% { opacity: 0; transform: translateY(35px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-smooth-reveal { animation: smoothReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-150 { animation-delay: 0.15s; } .delay-300 { animation-delay: 0.3s; } .delay-450 { animation-delay: 0.45s; } .delay-600 { animation-delay: 0.6s; }
      `}} />

      <div className="relative w-full h-[50vh] md:h-full overflow-hidden">
        <img 
          src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780388580146-928.webp?auto=format&fit=crop&w=1400&q=80" 
          alt="Interior Setup" 
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
        />
        <div className="absolute inset-0 bg-[#4A3E3D]/5"></div>
      </div>

      <div className="relative w-full py-16 md:py-0 md:h-full flex flex-col justify-center items-center px-6 lg:px-12 text-center bg-[#DFD6CE]">
        <div className="w-full max-w-[580px] flex flex-col items-center justify-center gap-8 md:gap-10">
          <div className="space-y-0.5 md:space-y-1.5 w-full flex flex-col items-center">
            <h3 className={`text-base sm:text-lg md:text-xl lg:text-[1.4rem] tracking-[0.05em] font-serif text-[#3D3130] font-bold ${isVisible ? 'animate-smooth-reveal delay-150' : 'opacity-0'}`}>
              At TERRA Home Studio,
            </h3>
            <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] font-serif text-[#3D3130] leading-tight font-bold tracking-wide whitespace-nowrap ${isVisible ? 'animate-smooth-reveal delay-300' : 'opacity-0'}`}>
              We believe beauty is found in simplicity.
            </h2>
          </div>
          
          <div className={`w-full flex justify-center items-center ${isVisible ? 'animate-smooth-reveal delay-450' : 'opacity-0'}`}>
            <img 
              src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780382081197-601.webp?auto=format&fit=crop&w=800&q=80" 
              alt="Ceramic Vases" 
              className="w-[85%] md:w-[80%] lg:w-[75%] aspect-[3/4] object-cover drop-shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:scale-102 transition-transform duration-700 ease-out cursor-pointer"
            />
          </div>
          
          <div className={`w-full flex justify-center ${isVisible ? 'animate-smooth-reveal delay-600' : 'opacity-0'}`}>
            <p className="text-[11px] sm:text-xs md:text-[13px] lg:text-[14.5px] text-[#3D3130] leading-relaxed font-normal text-left font-serif w-[95%] md:w-[90%] mx-auto opacity-95">
              Every ceramic piece is thoughtfully crafted to bring quiet warmth, subtle character, and a sense of calm into your space. A home is not defined by how much it holds, but by how it makes you feel. With TERRA Home Studio, let every detail speak softly, creating harmony in your home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DecorativeObjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const baseItems = useMemo(() => [
    { id: 1, img: "/products/products1.png", subtitle: "New Collection", title: "VASES", link: "#" },
    { id: 2, img: "/products/products2.png", subtitle: "Exclusive", title: "ART OBJECTS", link: "#" },
    { id: 3, img: "/products/products3.png", subtitle: "Handcrafted", title: "SCULPTURES", link: "#" },
    { id: 4, img: "/products/products4.png", subtitle: "Minimalist", title: "CERAMICS", link: "#" },
    { id: 5, img: "/products/products5.png", subtitle: "Artisan", title: "STONEWARE", link: "#" },
    { id: 6, img: "/products/products6.png", subtitle: "Modern", title: "DECOR PIECES", link: "#" },
    { id: 7, img: "/products/products7.png", subtitle: "Vintage", title: "CLAY VESSELS", link: "#" },
    { id: 8, img: "/products/products8.png", subtitle: "Organic", title: "NATURAL STONE", link: "#" },
    { id: 9, img: "/products/products9.png", subtitle: "Limited Edition", title: "STUDIO POTTERY", link: "#" },
  ], []);

  const items = useMemo(() => [...baseItems, ...baseItems, ...baseItems], [baseItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getMetrics = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.children.length === 0) return { itemWidth: 0, setWidth: 0 };
    const firstChild = el.children[0] as HTMLElement;
    const gap = parseFloat(window.getComputedStyle(el).gap) || 0;
    const itemWidth = firstChild.offsetWidth + gap;
    return { itemWidth, setWidth: itemWidth * baseItems.length };
  }, [baseItems.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { setWidth } = getMetrics();
    el.scrollLeft = setWidth; 

    const handleScroll = () => {
      const { itemWidth, setWidth: freshSetWidth } = getMetrics();
      if (freshSetWidth === 0) return;

      const currentScroll = el.scrollLeft;
      const rawIndex = Math.round(currentScroll / itemWidth);
      const finalIndex = ((rawIndex % baseItems.length) + baseItems.length) % baseItems.length;
      setActiveIndex(finalIndex);

      if (currentScroll < freshSetWidth * 0.4) {
        el.scrollLeft += freshSetWidth;
        if (isDraggingRef.current) scrollLeftRef.current += freshSetWidth;
      } else if (currentScroll > freshSetWidth * 2.1) {
        el.scrollLeft -= freshSetWidth;
        if (isDraggingRef.current) scrollLeftRef.current -= freshSetWidth;
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [getMetrics, baseItems.length]);

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('a, button')) return;

    const el = scrollRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    el.style.scrollSnapType = 'none';
    el.style.scrollBehavior = 'auto';

    startXRef.current = e.clientX;
    scrollLeftRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const dx = e.clientX - startXRef.current;
    scrollRef.current.scrollLeft = scrollLeftRef.current - (dx * 1.2);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    
    const el = scrollRef.current;
    if (!el) return;

    el.releasePointerCapture(e.pointerId);
    el.style.scrollSnapType = 'x proximity';
    el.style.scrollBehavior = 'smooth';
    
    const { itemWidth } = getMetrics();
    const target = Math.round(el.scrollLeft / itemWidth) * itemWidth;
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={`relative w-full min-h-[550px] md:min-h-0 md:aspect-video flex flex-col justify-center overflow-hidden bg-[#F9F8F6] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ touchAction: 'pan-y' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780564092756-454.webp" 
          alt="Interior Stone" 
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        />
      </div>

      <div className={`absolute top-[50%] md:top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
        <div className="w-[200px] h-[280px] sm:w-[320px] sm:h-[400px] md:w-[480px] md:h-[520px] border border-white/40 relative backdrop-blur-[1px]">
          <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[85%] bg-[#F9F8F6] p-4 md:p-5 text-center shadow-2xl border border-black/5 pointer-events-none">
            <div className="transition-opacity duration-300">
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#A47E6C] font-semibold block mb-1">
                {baseItems[activeIndex].subtitle}
              </span>
              <h3 className="text-sm sm:text-lg md:text-2xl font-serif tracking-[0.15em] text-[#3D3130] uppercase mb-1.5 font-medium">
                {baseItems[activeIndex].title}
              </h3>
              <a href={baseItems[activeIndex].link} className="pointer-events-auto text-[8px] md:text-[10px] uppercase tracking-widest text-[#3D3130] border-b border-[#3D3130] pb-0.5 hover:text-[#A47E6C] transition-colors">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef} 
        className={`relative z-10 w-full h-[55%] md:h-[65%] flex items-center overflow-x-auto no-scrollbar gap-10 md:gap-20 px-[calc(50vw-70px)] md:px-[calc(50vw-225px)] select-none snap-x snap-proximity scroll-smooth ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.4s' }}
      >
        {items.map((item, index) => (
          <div 
            key={`${item.id}-${index}`} 
            className={`flex-shrink-0 w-[140px] sm:w-[280px] md:w-[450px] h-full flex items-center justify-center transition-opacity duration-500 snap-center
              {(index % baseItems.length) === activeIndex ? 'opacity-100' : 'opacity-40'}
            `}
          >
            <img 
              src={item.img} 
              alt={item.title} 
              draggable="false"
              className="w-full max-h-[85%] object-contain filter drop-shadow-2xl pointer-events-none" 
            />
          </div>
        ))}
      </div>

      <div className={`absolute bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 z-20 text-center w-full max-w-xl px-4 pointer-events-none ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
        <p className="font-serif text-white text-xs md:text-xl tracking-wide drop-shadow-md">
          Decorative Objects that bring art, play, and personality into your space.
        </p>
      </div>
    </section>
  ); 
}

export function VesselsTableware() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const items = [
    { id: 1, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390986408-855.webp?auto=format&fit=crop&w=600&q=80", title: "Terracotta Vase" },
    { id: 2, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390993795-142.webp?auto=format&fit=crop&w=600&q=80", title: "Minimalist Bud Vase" },
    { id: 3, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390998434-670.webp?auto=format&fit=crop&w=600&q=80", title: "Clay Pitcher" },
    { id: 4, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390980899-810.webp?auto=format&fit=crop&w=600&q=80", title: "White Speckled Vase" },
    { id: 5, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780391003083-347.webp?auto=format&fit=crop&w=600&q=80", title: "Organic Loop Sculpture" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-auto bg-[#DCD6CD] flex flex-col items-center overflow-hidden py-12 md:py-16 px-4 sm:px-8">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-float-up { animation: floatUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; } .delay-200 { animation-delay: 0.2s; } .delay-300 { animation-delay: 0.3s; } .delay-450 { animation-delay: 0.4s; } .delay-500 { animation-delay: 0.5s; } .delay-600 { animation-delay: 0.6s; } .delay-700 { animation-delay: 0.7s; }
      `}} />

      <div className="w-full h-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
        <div className={`text-center flex items-center justify-center py-4 ${isVisible ? 'animate-float-up delay-100' : 'opacity-0'}`}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif tracking-[0.25em] text-[#A65E44] uppercase font-medium">
            VESSELS & TABLEWARE
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pb-4">
          <div className={`w-full overflow-hidden bg-[#C6BBAF] ${isVisible ? 'animate-float-up delay-200' : 'opacity-0'}`}>
            <img src={items[0].img} alt={items[0].title} className="w-full h-full object-contain hover:scale-103 transition-transform duration-700 ease-out cursor-pointer select-none" />
          </div>
          
          <div className={`w-full min-h-[300px] md:min-h-0 h-full bg-[#C1B4A6] flex flex-col justify-center items-center text-center p-6 sm:p-4 ${isVisible ? 'animate-float-up delay-300' : 'opacity-0'}`}>
            <p className="font-serif text-[#A65E44] text-base md:text-xl leading-relaxed max-w-[220px] mb-4 sm:mb-6">
              Elegant Vessels<br />&<br />Tableware made to elevate your table.
            </p>
            <button className="px-6 py-2.5 bg-[#2E1E1A] text-[#C1B4A6] text-[10px] uppercase tracking-widest font-light hover:bg-[#A65E44] hover:text-white transition-all duration-300 font-sans hover:shadow-md">
              LEARN MORE
            </button>
          </div>
          
          <div className={`w-full overflow-hidden bg-[#C6BBAF] ${isVisible ? 'animate-float-up delay-450' : 'opacity-0'}`}>
            <img src={items[1].img} alt={items[1].title} className="w-full h-full object-contain hover:scale-103 transition-transform duration-700 ease-out cursor-pointer select-none" />
          </div>
          
          <div className={`w-full overflow-hidden bg-[#C6BBAF] ${isVisible ? 'animate-float-up delay-500' : 'opacity-0'}`}>
            <img src={items[2].img} alt={items[2].title} className="w-full h-full object-contain hover:scale-103 transition-transform duration-700 ease-out cursor-pointer select-none" />
          </div>
          
          <div className={`w-full overflow-hidden bg-[#C6BBAF] ${isVisible ? 'animate-float-up delay-600' : 'opacity-0'}`}>
            <img src={items[3].img} alt={items[3].title} className="w-full h-full object-contain hover:scale-103 transition-transform duration-700 ease-out cursor-pointer select-none" />
          </div>
          
          <div className={`w-full overflow-hidden bg-[#C6BBAF] ${isVisible ? 'animate-float-up delay-700' : 'opacity-0'}`}>
            <img src={items[4].img} alt={items[4].title} className="w-full h-full object-contain hover:scale-103 transition-transform duration-700 ease-out cursor-pointer select-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function BathDiffuserVessel() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const subItems = [
    { id: 1, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780391342822-268.webp?auto=format&fit=crop&w=500&q=80" },
    { id: 2, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780391349933-51.webp?auto=format&fit=crop&w=500&q=80" },
    { id: 3, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780391355351-308.webp?auto=format&fit=crop&w=500&q=80" },
    { id: 4, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780391360536-604.webp?auto=format&fit=crop&w=500&q=80" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col overflow-hidden bg-[#dbcfc1]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes smoothFloatUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-smooth-up { animation: smoothFloatUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-150 { animation-delay: 0.15s; } .delay-300 { animation-delay: 0.3s; } .delay-450 { animation-delay: 0.45s; } .delay-600 { animation-delay: 0.6s; } .delay-750 { animation-delay: 0.75s; } .delay-900 { animation-delay: 0.9s; }
      `}} />

      <div className="relative w-full">
        <img 
          src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780563503635-651.webp?auto=format&fit=crop&w=1800&q=80" 
          alt="Bath & Diffuser Banner" 
          className={`w-full h-auto block transition-all duration-[2000ms] ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <div className={`absolute top-[8%] md:top-[12%] left-0 right-0 w-full text-center px-4 ${isVisible ? 'animate-smooth-up delay-150' : 'opacity-0'}`}>
          <h2 className="text-base sm:text-2xl md:text-3xl lg:text-[2.5rem] font-serif tracking-[0.15em] text-white uppercase font-bold drop-shadow-md">
            BATH & DIFFUSER VESSEL
          </h2>
        </div>
        
        <div className={`absolute top-[45%] md:top-[45%] right-[5%] md:right-[6%] text-right ${isVisible ? 'animate-smooth-up delay-300' : 'opacity-0'}`}>
          <p className="text-[6px] sm:text-[9px] md:text-xs lg:text-[13px] text-white/95 leading-[1.6] md:leading-loose font-light drop-shadow-md font-sans">
            In a world that moves fast,<br className="hidden md:block"/> true luxury is found in slowing down.<br />
            Crafted to Slow the Moment Down is<br className="hidden md:block"/> designed to bring calm into everyday<br />
            spaces — an invitation to pause,<br className="hidden md:block"/> breathe, and simply be.
          </p>
        </div>
      </div>

      <div className="w-full #E4DED7 py-12 md:py-20 flex justify-center">
        <div className="w-full max-w-7xl px-6 md:px-12 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {subItems.map((item, index) => {
            const delays = ['delay-450', 'delay-600', 'delay-750', 'delay-900'];
            return (
              <div 
                key={item.id} 
                className={`w-full aspect-square overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] bg-[#DCD6CD] ${isVisible ? 'animate-smooth-up ' + delays[index] : 'opacity-0'}`}
              >
                <img 
                  src={item.img} 
                  alt={`Vessel Item ${item.id}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out cursor-pointer select-none"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}