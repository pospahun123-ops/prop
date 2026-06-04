'use client';
import React, { useRef, useEffect, useState } from 'react';
import Navbar from './components/Navbar'; 
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
      <Navbar />
      <main className="overflow-hidden">
        <HeroSection />
        <BrandIntroduction />
        <DecorativeObjects />
        <VesselsTableware />
        <BathDiffuserVessel />
      </main>
      <Footer />
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

      <div className="relative w-full py-16 md:py-0 md:h-full flex flex-col justify-center items-center px-6 lg:px-16 text-center">
        <div className="w-full max-w-[480px] flex flex-col items-center justify-center gap-4 lg:gap-5">
          <div className="space-y-2">
            <h3 className={`text-[10px] sm:text-xs md:text-sm tracking-[0.2em] font-serif text-[#4A3E3D] ${isVisible ? 'animate-smooth-reveal delay-150' : 'opacity-0'}`}>
              At TERRA Home Studio,
            </h3>
            <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-[#4A3E3D] leading-tight font-medium uppercase tracking-wide ${isVisible ? 'animate-smooth-reveal delay-300' : 'opacity-0'}`}>
              We believe beauty is found in simplicity.
            </h2>
          </div>
          
          <div className={`w-full flex justify-center my-2 sm:my-1 ${isVisible ? 'animate-smooth-reveal delay-450' : 'opacity-0'}`}>
            <img 
              src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780382081197-601.webp?auto=format&fit=crop&w=600&q=80" 
              alt="Ceramic Vases" 
              className="w-auto h-[20vh] sm:h-[26vh] md:h-[28vh] max-h-[260px] object-contain drop-shadow-md hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
            />
          </div>
          
          <div className={`w-full ${isVisible ? 'animate-smooth-reveal delay-600' : 'opacity-0'}`}>
            <p className="text-[10px] sm:text-[10px] md:text-xs text-[#5C4A42] leading-relaxed font-light text-center font-sans max-w-[420px] mx-auto px-4">
              Every ceramic piece is thoughtfully crafted to bring quiet warmth, subtle character, and a sense of calm into your space. A home is not defined by how much it holds, but by how it makes you feel. With TERRA Home Studio, let every detail speak softly.
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

  const baseItems = [
    { id: 1, img: "/products/products1.png", title: "Item 1" },
    { id: 2, img: "/products/products2.png", title: "Item 2" },
    { id: 3, img: "/products/products3.png", title: "Item 3" },
    { id: 4, img: "/products/products4.png", title: "Item 4" },
    { id: 5, img: "/products/products5.png", title: "Item 5" },
    { id: 6, img: "/products/products6.png", title: "Item 6" },
  ];
  const items = [...baseItems, ...baseItems, ...baseItems, ...baseItems];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidthWithGap = 350; 
    const singleSetWidth = itemWidthWithGap * baseItems.length;
    el.scrollLeft = singleSetWidth * 2;

    const handleScroll = () => {
      const currentScroll = el.scrollLeft;
      if (currentScroll < singleSetWidth) el.scrollLeft = currentScroll + singleSetWidth * 2;
      else if (currentScroll > singleSetWidth * 3) el.scrollLeft = currentScroll - singleSetWidth * 2;
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [baseItems.length]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[500px] md:min-h-0 md:aspect-video flex flex-col justify-center overflow-hidden bg-[#F9F8F6]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; } .delay-400 { animation-delay: 0.4s; } .delay-600 { animation-delay: 0.6s; }
      `}} />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780386783944-4.webp" alt="Interior Stone" className={`w-full h-full object-cover transition-all duration-[2500ms] ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`} />
      </div>

      <div className={`absolute top-[50%] md:top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none ${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
        <div className="w-[180px] h-[220px] sm:w-[250px] sm:h-[300px] md:w-[350px] md:h-[400px] border border-white/60 relative backdrop-blur-[2px]">
          <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[100%] bg-[#F9F8F6] p-2 md:p-4 text-center shadow-md border border-[#3D3130]/5 pointer-events-auto transition-transform hover:translate-y-[-2px] duration-300">
            <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-[#A47E6C] font-semibold block mb-1 font-sans">New Collection</span>
            <h3 className="text-sm sm:text-base md:text-xl font-serif tracking-[0.15em] text-[#3D3130] uppercase mb-1.5 font-medium">VASES</h3>
            <a href="#" className="text-[7px] md:text-[9px] uppercase tracking-widest text-[#3D3130] border-b border-[#3D3130] pb-0.5 hover:text-[#A47E6C] transition-all font-sans inline-block">Shop Now</a>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className={`relative z-10 w-full h-[50%] md:h-[60%] flex overflow-x-auto gap-8 md:gap-16 px-[calc(50vw-80px)] md:px-[calc(50vw-175px)] items-center [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing snap-x snap-mandatory ${isVisible ? 'animate-fade-up delay-400' : 'opacity-0'}`}>
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex-shrink-0 w-[120px] sm:w-[200px] md:w-[300px] h-full flex items-center justify-center transition-transform duration-700 hover:scale-110 snap-center">
            <img src={item.img} alt={item.title} className="w-full h-full object-contain filter drop-shadow-2xl select-none" />
          </div>
        ))}
      </div>

      <div className={`absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center w-full max-w-xl px-4 pointer-events-none ${isVisible ? 'animate-fade-up delay-600' : 'opacity-0'}`}>
        <p className="font-serif text-white text-xs sm:text-sm md:text-lg lg:text-xl tracking-wide leading-relaxed drop-shadow-md">
          Decorative Objects that bring art, play,<br className="hidden sm:block" />and personality into your space.
        </p>
      </div>
    </section>
  ); 
}

export function VesselsTableware() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const items = [
    { id: 1, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390980899-810.webp?auto=format&fit=crop&w=600&q=80", title: "Terracotta Vase" },
    { id: 2, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390986408-855.webp?auto=format&fit=crop&w=600&q=80", title: "Minimalist Bud Vase" },
    { id: 3, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390993795-142.webp?auto=format&fit=crop&w=600&q=80", title: "Clay Pitcher" },
    { id: 4, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390998434-670.webp?auto=format&fit=crop&w=600&q=80", title: "White Speckled Vase" },
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
    <section ref={sectionRef} className="w-full h-auto md:aspect-video md:h-auto bg-[#D2C8BE] flex flex-col items-center overflow-hidden py-12 md:py-6 lg:py-8 px-4 sm:px-8">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-float-up { animation: floatUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; } .delay-200 { animation-delay: 0.2s; } .delay-300 { animation-delay: 0.3s; } .delay-400 { animation-delay: 0.4s; } .delay-500 { animation-delay: 0.5s; } .delay-600 { animation-delay: 0.6s; } .delay-700 { animation-delay: 0.7s; }
      `}} />

      <div className="w-full h-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-4">
        
        <div className={`text-center flex items-center justify-center ${isVisible ? 'animate-float-up delay-100' : 'opacity-0'}`}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif tracking-[0.25em] text-[#A65E44] uppercase font-medium">
            VESSELS & TABLEWARE
          </h2>
        </div>

        <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 pb-2 md:pb-4">
          
          <div className={`w-full aspect-square md:aspect-auto h-full overflow-hidden bg-[#C6BBAF] ${isVisible ? 'animate-float-up delay-200' : 'opacity-0'}`}>
            <img src={items[0].img} alt={items[0].title} className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-out cursor-pointer" />
          </div>
          
          <div className={`w-full aspect-square md:aspect-auto h-full bg-[#C1B4A6] flex flex-col justify-center items-center text-center p-6 sm:p-4 ${isVisible ? 'animate-float-up delay-300' : 'opacity-0'}`}>
            <p className="font-serif text-[#A65E44] text-sm md:text-lg leading-relaxed max-w-[200px] mb-4 sm:mb-6 transition-transform hover:scale-105 duration-500">
              Elegant Vessels<br />&<br />Tableware made to elevate your table.
            </p>
            <button className="px-6 py-2.5 sm:py-2 bg-[#2E1E1A] text-[#C1B4A6] text-[9px] sm:text-[10px] uppercase tracking-widest font-light hover:bg-[#A65E44] hover:text-white transition-all duration-300 font-sans hover:shadow-lg">
              LEARN MORE
            </button>
          </div>
          
          <div className={`w-full aspect-square md:aspect-auto h-full overflow-hidden bg-[#C6BBAF] ${isVisible ? 'animate-float-up delay-400' : 'opacity-0'}`}>
            <img src={items[1].img} alt={items[1].title} className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-out cursor-pointer" />
          </div>
          
          <div className={`w-full aspect-square md:aspect-auto h-full overflow-hidden bg-[#C6BBAF] ${isVisible ? 'animate-float-up delay-500' : 'opacity-0'}`}>
            <img src={items[2].img} alt={items[2].title} className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-out cursor-pointer" />
          </div>
          
          <div className={`w-full aspect-square md:aspect-auto h-full overflow-hidden bg-[#C6BBAF] ${isVisible ? 'animate-float-up delay-600' : 'opacity-0'}`}>
            <img src={items[3].img} alt={items[3].title} className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-out cursor-pointer" />
          </div>
          
          <div className={`w-full aspect-square md:aspect-auto h-full overflow-hidden bg-[#C6BBAF] ${isVisible ? 'animate-float-up delay-700' : 'opacity-0'}`}>
            <img src={items[4].img} alt={items[4].title} className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-out cursor-pointer" />
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
    <section ref={sectionRef} className="w-full flex flex-col md:aspect-video bg-[#DCD6CD] overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes smoothFloatUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-smooth-up { animation: smoothFloatUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-150 { animation-delay: 0.15s; } .delay-300 { animation-delay: 0.3s; } .delay-450 { animation-delay: 0.45s; } .delay-600 { animation-delay: 0.6s; } .delay-750 { animation-delay: 0.75s; } .delay-900 { animation-delay: 0.9s; }
      `}} />

      <div className="relative w-full h-[50vh] md:h-[60%] overflow-hidden">
        <img 
          src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780392572693-527.webp?auto=format&fit=crop&w=1400&q=80" 
          alt="Bath & Diffuser Banner" 
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2500ms] ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
        />
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-12">
          <div className={`text-center w-full mt-2 ${isVisible ? 'animate-smooth-up delay-150' : 'opacity-0'}`}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif tracking-[0.25em] text-white uppercase font-medium drop-shadow-md">
              BATH & DIFFUSER VESSEL
            </h2>
          </div>
          <div className={`self-end max-w-[250px] sm:max-w-[300px] text-right md:text-left md:ml-auto ${isVisible ? 'animate-smooth-up delay-300' : 'opacity-0'}`}>
            <p className="text-[10px] sm:text-[10px] md:text-xs text-white/95 leading-relaxed font-light drop-shadow-md font-sans">
              In a world that moves fast, true luxury is found in slowing down. 
              Crafted to Slow the Moment Down is designed to bring calm into everyday 
              spaces — an invitation to pause, breathe, and simply be.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-4 md:py-0 md:h-[40%] flex items-center justify-center px-4 sm:px-8 md:px-12">
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {subItems.map((item, index) => {
            const delays = ['delay-450', 'delay-600', 'delay-750', 'delay-900'];
            return (
              <div 
                key={item.id} 
                className={`w-full aspect-square md:aspect-auto md:h-full overflow-hidden bg-[#C6BBAF] ${isVisible ? 'animate-smooth-up ' + delays[index] : 'opacity-0'}`}
              >
                <img 
                  src={item.img} 
                  alt={`Sub item ${item.id}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-[800ms] ease-out select-none cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}