'use client';
import React, { useRef, useEffect } from 'react';
import Navbar from './components/Navbar'; // ดึง Navbar ตัวที่เราแยกไฟล์เมื่อกี้เข้ามาใช้งานเว้ยนาย
import Footer from './components/Footer'; // ดึง Footer เข้ามาตรงนี้ครับนาย

export default function HomePage() {
  return (
    <div className="bg-[#F9F6F0] text-[#4A3E3D] min-h-screen font-sans antialiased selection:bg-[#E5D3C3]">   
      
      {/* เรียกใช้ Component Navbar ที่แยกออกไปแล้ว หน้าอื่นก็แค่ก๊อปบรรทัดนี้ไปแปะได้เลย */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="overflow-hidden">
        <HeroSection />
        <BrandIntroduction />
        <DecorativeObjects />
        <VesselsTableware />
        <BathDiffuserVessel />
      </main>

      {/* เรียก Footer ตัวใหม่ที่แยกไฟล์ไว้ มาใส่ตรงนี้แทนของเดิมครับนาย */}
      <Footer />
    </div>
  );
}

// ==========================================
// ส่วนของ Components ต่างๆ ที่ใช้ในหน้า HomePage (แบบเดิมเป๊ะๆ ไม่ได้แก้เลยครับ)
// ==========================================

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780389403246-956.webp?auto=format&fit=crop&w=1600&q=80" 
          alt="Terra Home Hero" 
          className="w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-[#3D3130]/15"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-3xl text-white mt-12">
        <div className="absolute bottom-[-15vh] left-1/2 transform -translate-x-1/2 flex justify-center">
          <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandIntroduction() {
  return (
    // ปรับสีพื้นหลังให้เป็นสีเบจตามเรฟ
    <section className="w-full grid grid-cols-1 md:grid-cols-2 bg-[#DFD6CE]">
      
      {/* ฝั่งซ้าย: รูปใหญ่ปลดล็อกความสูงให้เต็ม Grid (h-full) */}
      <div className="w-full h-[500px] md:h-full">
        <img 
          // 💡 นายอย่าลืมเปลี่ยน URL รูปนี้เป็นรูปฝั่งซ้ายของเรฟนะ
          src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780388580146-928.webp?auto=format&fit=crop&w=1400&q=80" 
          alt="Interior Setup" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* ฝั่งขวา: ใช้ justify-between เพื่อกระจาย คอนเทนต์ บน-กลาง-ล่าง */}
      <div className="flex flex-col justify-between items-center py-16 px-10 md:py-20 md:px-16 h-full">
        
        {/* ข้อความด้านบน */}
        <div className="text-center space-y-2 mt-4">
          <h3 className="text-lg md:text-xl font-serif text-[#4A3E3D]">
            At TERRA Home Studio,
          </h3>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#4A3E3D] leading-tight">
            We believe beauty is found in simplicity.
          </h2>
        </div>
        
       {/* รูปตรงกลาง (ขยายใหญ่ขึ้นอีกสเต็ปตามคำขอครับนาย) */}
        <div className="w-full max-w-[460px] lg:max-w-[540px] my-4 transition-all duration-300">
          <img 
            // 💡 นายอย่าลืมเปลี่ยน URL รูปนี้เป็นรูปแจกันคู่ฝั่งขวานะ
            src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780382081197-601.webp?auto=format&fit=crop&w=600&q=80" 
            alt="Ceramic Vases" 
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* ข้อความ Paragraph ด้านล่างสุด */}
        <div className="w-full max-w-[450px] mb-4">
          <p className="text-[10px] md:text-xs text-[#5C4A42] leading-relaxed font-light text-left">
            Every ceramic piece is thoughtfully crafted to bring quiet warmth, subtle character, and a sense of calm into your space. A home is not defined by how much it holds, but by how it makes you feel. With TERRA Home Studio, let every detail speak softly, creating harmony in your home.
          </p>
        </div>

      </div>
    </section>
  );
}

export function DecorativeObjects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const baseItems = [
    { id: 1, img: "/products/products1.png", title: "Item 1" },
    { id: 2, img: "/products/products2.png", title: "Item 2" },
    { id: 3, img: "/products/products3.png", title: "Item 3" },
    { id: 4, img: "/products/products4.png", title: "Item 4" },
    { id: 5, img: "/products/products5.png", title: "Item 5" },
    { id: 6, img: "/products/products6.png", title: "Item 6" },
    { id: 7, img: "/products/products7.png", title: "Item 7" },
    { id: 8, img: "/products/products8.png", title: "Item 8" },
    { id: 9, img: "/products/products9.png", title: "Item 9" },
  ];

  // เพิ่มการคูณอาเรย์เพิ่มเป็น 5 ชุด เพื่อสร้างพื้นที่ Buffer ให้กว้างพอสำหรับการ Loop ที่เนียนตา
  const items = [...baseItems, ...baseItems, ...baseItems, ...baseItems, ...baseItems];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // ปรับตัวเลข itemWidthWithGap ให้สอดคล้องกับขนาดใหม่บนหน้าจอ
    const itemWidthWithGap = 350; 
    const singleSetWidth = itemWidthWithGap * baseItems.length;

    // เซ็ตตำแหน่งเริ่มต้นให้อยู่ตรงกลาง (ชุดที่ 3 จาก 5 ชุด)
    el.scrollLeft = singleSetWidth * 2;

    const handleScroll = () => {
      const currentScroll = el.scrollLeft;

      // จุดเด่นความสมูท: เมื่อใกล้สุดขอบ จะทำการ Warp ตำแหน่งกลับมาตรงกลางทันทีแบบไร้รอยต่อ
      if (currentScroll < singleSetWidth) {
        // ปัดไปทางซ้ายจนใกล้หมด -> ดึงกลับมาตรงกลางขวา
        el.scrollLeft = currentScroll + singleSetWidth * 2;
      } else if (currentScroll > singleSetWidth * 3) {
        // ปัดไปทางขวาจนเกินชุดกลาง -> ดึงกลับมาตรงกลางซ้าย
        el.scrollLeft = currentScroll - singleSetWidth * 2;
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [baseItems.length]);

  return (
    // ปรับสัดส่วนเป็น 16:9 ด้วย class `w-full aspect-video` 
    // และตั้งครอบ Min/Max Height เพื่อป้องกันการเบี้ยวในจอที่เตี้ยหรือสูงเกินไป
    <section className="relative w-full aspect-video min-h-[500px] max-h-[900px] flex flex-col justify-center overflow-hidden bg-[#F9F8F6]">
      
      {/* ภาพพื้นหลังแท่นหินคมชัด */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780386783944-4.webp" 
          alt="Interior Stone Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* 1. กรอบสี่เหลี่ยมและป้าย Shop Now ล็อกตายตัวตรงกลางจอ */}
      {/* โค้ดใหม่ที่ปรับแล้ว */}
<div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-[300px] md:w-[350px] h-[350px] md:h-[400px] border border-white/60 relative">
          
          {/* ป้ายกล่องข้อความ NEW COLLECTION VASES */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[100%] bg-[#F9F8F6] p-4 text-center shadow-md border border-[#3D3130]/5 pointer-events-auto">
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#A47E6C] font-semibold block mb-1">
              New Collection
            </span>
            <h3 className="text-lg md:text-xl font-serif tracking-[0.15em] text-[#3D3130] uppercase mb-1.5">
              VASES
            </h3>
            <a href="#" className="text-[9px] uppercase tracking-widest text-[#3D3130] border-b border-[#3D3130] pb-0.5 hover:text-[#A47E6C] hover:border-[#A47E6C] transition">
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* 2. รางสไลด์สินค้า */}
      <div 
        ref={scrollRef}
        // เพิ่ม snap-x และ snap-mandatory เข้าไปที่นี่
        className="relative z-10 w-full flex overflow-x-auto gap-16 px-[calc(50vw-150px)] md:px-[calc(50vw-175px)] py-12 items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing snap-x snap-mandatory"
      >
        {items.map((item, index) => (
          <div 
            key={`${item.id}-${index}`} 
            // เพิ่ม snap-center เพื่อให้ตัวมันเองโดนดูดไปอยู่ตรงกลางเวลาหยุดเลื่อน
            className="flex-shrink-0 w-[250px] md:w-[300px] flex items-center justify-center transition-transform duration-500 hover:scale-105 snap-center"
          >
            <img 
              src={item.img} 
              alt={item.title} 
              className="w-full h-[250px] md:h-[300px] object-contain filter drop-shadow-2xl select-none"
            />
          </div>
        ))}
      </div>

      {/* 3. คำอธิบายโปรเจกต์ด้านล่างสุด */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-center w-full max-w-xl px-6 pointer-events-none">
        <p className="font-serif text-white text-base md:text-lg lg:text-xl tracking-wide leading-relaxed drop-shadow-md">
          Decorative Objects that bring art, play,<br />and personality into your space.
        </p>
      </div>

    </section>
  ); 
}

function VesselsTableware() {
  // สังเกตว่าในอาเรย์จะมีสินค้าแค่ 5 ชิ้น (เพราะช่องที่ 2 เราจะแทรกกล่องข้อความเข้าไปแทน)
  const items = [
    { id: 1, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390980899-810.webp?auto=format&fit=crop&w=600&q=80", title: "Terracotta Vase" },
    { id: 2, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390986408-855.webp?auto=format&fit=crop&w=600&q=80", title: "Minimalist Bud Vase" },
    { id: 3, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390993795-142.webp?auto=format&fit=crop&w=600&q=80", title: "Clay Pitcher" },
    { id: 4, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780390998434-670.webp?auto=format&fit=crop&w=600&q=80", title: "White Speckled Vase" },
    { id: 5, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780391003083-347.webp?auto=format&fit=crop&w=600&q=80", title: "Organic Loop Sculpture" },
  ];

  return (
    // เปลี่ยนสีพื้นหลังเซกชันให้ตรงกับภาพเรฟเฟอเรนซ์
    <section className="bg-[#D2C8BE] py-20 px-6 md:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* หัวข้อด้านบน: ตัวพิมพ์ใหญ่ทั้งหมด สีน้ำตาลส้มหนาและห่าง */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-[0.25em] text-[#A65E44] uppercase font-medium">
            VESSELS & TABLEWARE
          </h2>
        </div>

        {/* ตาราง Grid 3 คอลัมน์ (ระยะห่าง gap สังเกตจากรูปจะค่อนข้างกว้างและชัดเจน) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* ช่องที่ 1: รูปสินค้าชิ้นที่ 1 */}
          <div className="w-full aspect-[4/3.5] overflow-hidden bg-[#C6BBAF]">
            <img 
              src={items[0].img} 
              alt={items[0].title} 
              className="w-full h-full object-cover hover:scale-103 transition duration-500 ease-out"
            />
          </div>

          {/* ช่องที่ 2: กล่องข้อความสีเบจอ่อน (LEARN MORE) คั่นกลางแถวแรกแบบในเรฟ */}
          <div className="w-full aspect-[4/3.5] bg-[#C1B4A6] flex flex-col justify-center items-center text-center p-8">
            <p className="font-serif text-[#A65E44] text-base md:text-lg lg:text-xl leading-relaxed max-w-[200px] mb-6">
              Elegant Vessels<br />&<br />Tableware made to elevate your table.
            </p>
            <button className="px-6 py-2 bg-[#2E1E1A] text-[#C1B4A6] text-[10px] uppercase tracking-widest font-light hover:bg-[#A65E44] hover:text-white transition duration-300">
              LEARN MORE
            </button>
          </div>

          {/* ช่องที่ 3: รูปสินค้าชิ้นที่ 2 */}
          <div className="w-full aspect-[4/3.5] overflow-hidden bg-[#C6BBAF]">
            <img 
              src={items[1].img} 
              alt={items[1].title} 
              className="w-full h-full object-cover hover:scale-103 transition duration-500 ease-out"
            />
          </div>

          {/* ช่องที่ 4: รูปสินค้าชิ้นที่ 3 */}
          <div className="w-full aspect-[4/3.5] overflow-hidden bg-[#C6BBAF]">
            <img 
              src={items[2].img} 
              alt={items[2].title} 
              className="w-full h-full object-cover hover:scale-103 transition duration-500 ease-out"
            />
          </div>

          {/* ช่องที่ 5: รูปสินค้าชิ้นที่ 4 */}
          <div className="w-full aspect-[4/3.5] overflow-hidden bg-[#C6BBAF]">
            <img 
              src={items[3].img} 
              alt={items[3].title} 
              className="w-full h-full object-cover hover:scale-103 transition duration-500 ease-out"
            />
          </div>

          {/* ช่องที่ 6: รูปสินค้าชิ้นที่ 5 */}
          <div className="w-full aspect-[4/3.5] overflow-hidden bg-[#C6BBAF]">
            <img 
              src={items[4].img} 
              alt={items[4].title} 
              className="w-full h-full object-cover hover:scale-103 transition duration-500 ease-out"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function BathDiffuserVessel() {
  // อาเรย์สำหรับรูปสินค้า 4 ชิ้นด้านล่างครับนาย
  const subItems = [
    { id: 1, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780391342822-268.webp?auto=format&fit=crop&w=500&q=80" },
    { id: 2, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780391349933-51.webp?auto=format&fit=crop&w=500&q=80" },
    { id: 3, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780391355351-308.webp?auto=format&fit=crop&w=500&q=80" },
    { id: 4, img: "https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780391360536-604.webp?auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    // เปลี่ยนสีพื้นหลังรวมให้เป็นสีเบจเทาตามเรฟ
    <section className="bg-[#DCD6CD] w-full">
      
      {/* 1. ครึ่งบน: รูปแบนเนอร์หลักขนาดใหญ่ */}
      <div className="relative w-full h-[450px] md:h-[550px] lg:h-[600px]">
        {/* รูปพื้นหลังแบนเนอร์ */}
        <img 
          // 💡 นายอย่าลืมเปลี่ยนเป็นรูปแบนเนอร์ที่มีกำแพงสีส้มอิฐนะ
          src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780392572693-527.webp?auto=format&fit=crop&w=1400&q=80" 
          alt="Bath & Diffuser Banner" 
          className="w-full h-full object-cover"
        />
        
        {/* Layer คอนเทนต์ที่ครอบอยู่บนรูปแบนเนอร์ */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 lg:p-16">
          
          {/* หัวข้อตรงกลางด้านบน (สีขาว, พิมพ์ใหญ่, ตัวอักษรห่างสไตล์หรู) */}
          <div className="text-center w-full mt-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-[0.25em] text-white uppercase font-medium drop-shadow-sm">
              BATH & DIFFUSER VESSEL
            </h2>
          </div>

          {/* กล่องข้อความอธิบายฝั่งขวา (ขยับมาอยู่มุมขวาล่างตามเรฟ) */}
          <div className="self-end max-w-[300px] md:max-w-[340px] text-right md:text-left md:ml-auto mb-4">
            <p className="text-[10px] md:text-xs text-white/90 leading-relaxed font-light drop-shadow-sm">
              In a world that moves fast, true luxury is found in slowing down. 
              Crafted to Slow the Moment Down is designed to bring calm into everyday 
              spaces — an invitation to pause, breathe, and simply be.
            </p>
          </div>

        </div>
      </div>

      {/* 2. ครึ่งล่าง: รูปสินค้า 4 รูปเรียงแถวหน้ากระดาน */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {subItems.map((item) => (
            <div 
              key={item.id} 
              className="w-full aspect-square overflow-hidden bg-[#C6BBAF] transition-all duration-300"
            >
              <img 
                src={item.img} 
                alt={`Sub item ${item.id}`} 
                className="w-full h-full object-cover hover:scale-103 transition duration-500 ease-out select-none"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}