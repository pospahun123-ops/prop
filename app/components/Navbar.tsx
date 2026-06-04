// C:\the_best\prop\app\Navbar.tsx
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    /* 🔴 ปรับความสูง Padding บน-ล่าง จาก py-8 ให้กระชับขึ้นเหลือ py-5 หรือ py-6 ในจอใหญ่ เพื่อความลีน */
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent px-8 md:px-12 py-5 md:py-6 flex justify-between items-center text-white w-full h-24 md:h-28">
      
      {/* ฝั่งซ้าย: เมนูลิงก์ต่างๆ */}
      {/* 🔴 เพิ่มความคมชัดและปรับไซส์ฟอนต์นิดหน่อยจาก 10px เป็น 11px (text-[11px]) และ font-medium ให้อ่านง่ายบาลานซ์กับโลโก้ */}
      <div className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[11px] tracking-[0.25em] uppercase font-medium">
        <Link href="/about" className="hover:text-white/60 transition duration-300">About</Link>
        <Link href="/prop" className="hover:text-white/60 transition duration-300">HOME DECOR</Link>
        <Link href="/journal" className="hover:text-white/60 transition duration-300">Art & Gallery</Link>
        <Link href="/contact" className="hover:text-white/60 transition duration-300">Contact</Link>
      </div>

      {/* 🟢 ตรงกลาง: บาลานซ์ไซส์รูปภาพโลโก้แบรนด์ใหม่ */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex items-center justify-center select-none">
        <Link href="/" className="block transition-transform duration-300 hover:scale-101">
          <img 
            src="/logo.png" 
            alt="Terra Home Studio Logo" 
            /* 🔴 บีบสัดส่วนความสูงของโลโก้ลงมาให้พอดีลักชูรี: 
               - จอมือถือล็อกไว้ที่ h-10 ถึง h-11 
               - จอคอม (mdขึ้นไป) ล็อกไว้ที่ h-14 (ประมาณ 56px) หรือ lg:h-15 (ประมาณ 60px) 
               จะช่วยให้ Navbar ลีนบางและดูแพงมากครับ
            */
            className="w-auto h-10 sm:h-11 md:h-14 lg:h-15 object-contain"
          />
        </Link>
      </div>

      {/* ฝั่งขวา: ไอคอนค้นหา และ ปุ่มแฮมเบอร์เกอร์ 3 ขีด */}
      {/* 🔴 ขยับขนาดไอคอนและจัดกลุ่มให้อยู่ในระนาบกึ่งกลางเป๊ะๆ */}
      <div className="flex items-center space-x-6 lg:space-x-8 text-white">
        {/* Search Icon */}
        <button className="hover:text-white/60 transition duration-300 p-1 flex items-center justify-center" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px] md:w-5 md:h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M16.5 10.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
          </svg>
        </button>
        
        {/* Hamburger Menu Icon (3 ขีด) */}
        <button className="hover:text-white/60 transition duration-300 flex flex-col justify-center space-y-[5px] group h-5 p-1" aria-label="Menu">
          <span className="w-[22px] md:w-[25px] h-[1px] bg-white block transition-all duration-300 group-hover:bg-white/60"></span>
          <span className="w-[22px] md:w-[25px] h-[1px] bg-white block transition-all duration-300 group-hover:bg-white/60"></span>
          <span className="w-[22px] md:w-[25px] h-[1px] bg-white block transition-all duration-300 group-hover:bg-white/60"></span>
        </button>
      </div>

    </nav>
  );
}