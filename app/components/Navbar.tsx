// C:\the_best\prop\app\Navbar.tsx
import React from 'react';
import Link from 'next/link';
export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent px-8 md:px-12 py-8 flex justify-between items-center text-white w-full">
      
      {/* แก้จาก <a href="..."> เป็น <Link href="..."> */}
<div className="hidden md:flex items-center space-x-8 lg:space-x-12 text-[10px] tracking-[0.2em] uppercase font-light">
  <Link href="/about" className="hover:text-white/70 transition duration-300">About</Link>
  <Link href="/prop" className="hover:text-white/70 transition duration-300">Shop</Link>
  <Link href="/journal" className="hover:text-white/70 transition duration-300">Journal</Link>
  <Link href="/contact" className="hover:text-white/70 transition duration-300">Contact</Link>
</div>

      {/* ตรงกลาง: โลโก้แบรนด์ ใช้ font-serif ให้ดูหรูหรา */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center select-none">
  {/* ปรับความหนาเป็น font-light หรือ font-normal ให้ฟอนต์ Serif ดูคมและบางลง */}
  <span className="text-xl md:text-2xl lg:text-3xl font-serif tracking-[0.2em] uppercase font-light leading-none text-white">
    Terra 
  </span>
  
  
  
  {/* ปรับ mt-2 เพื่อขยับคำว่า DESIGN ขึ้นมาให้ระยะพอดี ไม่ห่างเกินไป */}
  <span className="text-[8px] md:text-[9px] tracking-[0.45em] uppercase font-extralight text-white/90 mt-2 block">
    Home Studio
  </span>
</div>

      {/* ฝั่งขวา: ไอคอนค้นหา และ ปุ่มแฮมเบอร์เกอร์ 3 ขีด */}
      <div className="flex items-center space-x-6 lg:space-x-8 text-white">
        {/* Search Icon */}
        <button className="hover:text-white/70 transition duration-300" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M16.5 10.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
          </svg>
        </button>
        
        {/* Hamburger Menu Icon (เปลี่ยนเป็น 3 ขีด) */}
        <button className="hover:text-white/70 transition duration-300 flex flex-col space-y-[6px] group" aria-label="Menu">
          <span className="w-[26px] h-[1px] bg-white block transition-colors duration-300 group-hover:bg-white/70"></span>
          <span className="w-[26px] h-[1px] bg-white block transition-colors duration-300 group-hover:bg-white/70"></span>
          <span className="w-[26px] h-[1px] bg-white block transition-colors duration-300 group-hover:bg-white/70"></span>
        </button>
      </div>
    </nav>
  );
}