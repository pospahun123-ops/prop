"use client";

import { useState, useEffect } from "react";

interface PropBannerProps {
  allImages: string[];      // รูปทั้งหมดในระบบสำหรับหน้า ALL
  activeImage: string | null; // รูปเฉพาะหมวดหมู่ถ้ามีการกดเลือก
  categoryName: string;
}

export default function PropBanner({ allImages, activeImage, categoryName }: PropBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🌟 Effect สำหรับรันสไลด์เฟดวนไปเรื่อยๆ (ทำงานเฉพาะตอนกด ALL หรือไม่มี activeImage)
  useEffect(() => {
    if (activeImage || allImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 4500); // ⏱️ เปลี่ยนรูปทุกๆ 4.5 วินาที (นายปรับเวลาตรงนี้ได้เลยนะครับ)

    return () => clearInterval(timer);
  }, [activeImage, allImages.length]);

  // 1. ถ้าลูกค้ากดเลือกหมวดหมู่เฉพาะ (มีรูป activeImage) ให้โชว์รูปเดียวนิ่งๆ สวยๆ
  if (activeImage) {
    return (
      <div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] z-0 overflow-hidden bg-[#2F2420]">
        <img 
          src={activeImage} 
          alt={`${categoryName} Banner`} 
          className="w-full h-full object-cover object-center animate-fade-in" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent pointer-events-none" />
      </div>
    );
  }

 // 🌟 เปลี่ยนโค้ดตรงบรรทัด <img ...> ในไฟล์ PropBanner.tsx ครับ

  // 2. ถ้ากด ALL (ไม่มี activeImage) ให้ทำสไลด์เฟดเลื่อนรูปไปเรื่อยๆ
  if (allImages.length > 0) {
    return (
      <div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] z-0 overflow-hidden bg-[#2F2420]">
        {allImages.map((src, idx) => (
          <img
            // 👇 แก้ตรงนี้ครับ! เพิ่ม -${idx} เข้าไปเพื่อรับประกันว่า Key ไม่ซ้ำแน่นอน
            key={`${src}-${idx}`} 
            src={src}
            alt={`Terra Banner Slide ${idx}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent pointer-events-none" />
      </div>
    );
  }

  return null;
}