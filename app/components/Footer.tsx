// C:\the_best\prop\app\components\Footer.tsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col font-sans antialiased">
      
      {/* 1. ครึ่งบน: แบนเนอร์สโลแกนปิดท้าย */}
      <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden">
        <img 
          src="https://pub-258bd10e7e8c4a7690a74c54cfbdef93.r2.dev/original/1780392557796-349.webp" 
          alt="TERRA Home Banner" 
          className="w-full h-full object-cover"
        />
        {/* ปรับฟิลเตอร์ให้สว่างขึ้นนิดนึงเพื่อให้เห็นความสวยของพื้นหลังชัดเจน */}
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center p-6 text-center">
          <p className="font-serif text-white text-sm md:text-base lg:text-lg tracking-wide leading-relaxed max-w-xl drop-shadow-md">
            More than décor,<br />
            TERRA Home Studio is about shaping spaces<br />
            filled with warmth, balance, and quiet living.
          </p>
        </div>
      </div>

      {/* 2. ครึ่งล่าง: ข้อมูล Footer หลัก */}
      {/* ปรับสีพื้นหลังเป็น #8C8878 ให้ได้โทน Olive/Khaki Brown แบบในภาพเรฟเป๊ะๆ */}
      <div className="bg-[#A5815F] text-[#080600] px-6 py-12 md:px-12 md:py-16 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* ฝั่งซ้าย: กล่องขาวใส่ชื่อและที่อยู่บริษัท */}
          <div className="md:col-span-6 lg:col-span-5 w-full bg-white p-6 md:p-8 shadow-sm rounded-sm min-h-[180px] flex flex-col justify-center">
            <h4 className="font-sans font-bold text-sm tracking-wide mb-3 uppercase text-[#333333]">
              TPS GARDEN FURNITURE CO., LTD
            </h4>
            <p className="text-[11px] md:text-xs leading-relaxed text-[#777777] font-light">
              351/7-8 Soi Bangkok-Nonthaburi 13, Bangkok-Nonthaburi Road, 
              Bang Sue Subdistrict, Bang Sue District, Bangkok 10800
            </p>
          </div>

          {/* ฝั่งขวา: Links กับตารางเวลา */}
          <div className="md:col-span-6 lg:col-span-7 w-full grid grid-cols-1 sm:grid-cols-3 gap-8 text-[11px] md:text-xs tracking-wider pt-2">
            
            {/* GET IN TOUCH */}
            <div className="space-y-4">
              <h5 className="font-bold uppercase text-white/90 text-[10px] tracking-[0.15em]">GET IN TOUCH</h5>
              <ul className="space-y-2.5 font-light text-white/90">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Book An Appointment</a></li>
                <li className="text-white/70 leading-relaxed pt-1">116 Princes Hwy,<br />Milton NSW 2538</li>
              </ul>
            </div>

            {/* THE BORING STUFF */}
            <div className="space-y-4">
              <h5 className="font-bold uppercase text-white/90 text-[10px] tracking-[0.15em]">THE BORING STUFF</h5>
              <ul className="space-y-2.5 font-light text-white/90">
                <li><a href="#" className="hover:text-white transition">Policies</a></li>
                <li><a href="#" className="hover:text-white transition">COVID-19</a></li>
                <li><a href="#" className="hover:text-white transition">Cancellations</a></li>
                <li><a href="#" className="hover:text-white transition">Memberships</a></li>
                <li><a href="#" className="hover:text-white transition">VIP Program</a></li>
              </ul>
            </div>

            {/* OPENING HOURS */}
            <div className="space-y-4">
              <h5 className="font-bold uppercase text-white/90 text-[10px] tracking-[0.15em]">OPENING HOURS</h5>
              <table className="w-full text-left font-light text-white/90 border-separate border-spacing-y-1.5">
                <tbody>
                  <tr><td className="pr-2 align-top">Monday</td><td className="text-white/70 text-right sm:text-left">From 9:15 am</td></tr>
                  <tr><td className="pr-2 align-top">Tuesday</td><td className="text-white/70 text-right sm:text-left">Closed</td></tr>
                  <tr><td className="pr-2 align-top">Wednesday</td><td className="text-white/70 text-right sm:text-left">From 9:00 am</td></tr>
                  <tr><td className="pr-2 align-top">Thursday</td><td className="text-white/70 text-right sm:text-left">From 9:00 am</td></tr>
                  <tr><td className="pr-2 align-top">Friday</td><td className="text-white/70 text-right sm:text-left">From 9:00 am</td></tr>
                  <tr><td className="pr-2 align-top">Saturday</td><td className="text-white/70 text-right sm:text-left">From 9:00 am</td></tr>
                  <tr><td className="pr-2 align-top">Sunday</td><td className="text-white/70 text-right sm:text-left">Closed</td></tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

        
      </div>

    </footer>
  );
}