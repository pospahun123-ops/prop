// app/components/Navbar.tsx
"use client"

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Navbar({ collections = [] }: { collections?: any[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // ดึงค่า category จาก URL มาเช็ค Active state ของ Dropdown Item
  const currentCategory = searchParams.get('category');
  
  const isActive = (path: string) => pathname.startsWith(path);

  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  
  const toggleGroup = (e: React.MouseEvent, groupLabel: string) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedGroups(prev => 
      prev.includes(groupLabel) ? prev.filter(g => g !== groupLabel) : [...prev, groupLabel]
    );
  };

  // จัดกลุ่มข้อมูล Categories
  const structuredCategories = useMemo(() => {
    const finalCollections = collections && collections.length > 0 ? collections : [];

    const cats = new Set<string>();
    finalCollections.forEach(group => {
      if (group && group.product_sup) cats.add(group.product_sup);
    });
    const rawCategories = Array.from(cats).sort();

    const groups: { label: string, isGroup: boolean, items: { fullValue: string, displayLabel: string }[] }[] = [
      { label: "All", isGroup: false, items: [{ fullValue: "All", displayLabel: "All" }] }
    ];

    const decorativeItems: any[] = [];
    const dollItems: any[] = [];
    const wallArtItems: any[] = [];
    const others: any[] = [];

    rawCategories.forEach(cat => {
      if (cat === "Candle Holder" || cat.startsWith("Decorative") || cat.startsWith("Decotative")) {
        let display = cat;
        if (cat.startsWith("Decorative ")) display = cat.replace("Decorative ", "");
        else if (cat.startsWith("Decotative ")) display = cat.replace("Decotative ", "");
        decorativeItems.push({ fullValue: cat, displayLabel: display });
      }
      else if (cat.startsWith("Doll ")) {
        dollItems.push({ fullValue: cat, displayLabel: cat.replace("Doll ", "") });
      }
      else if (cat.startsWith("Wall Art ")) {
        wallArtItems.push({ fullValue: cat, displayLabel: cat.replace("Wall Art ", "") });
      }
      else {
        others.push({ fullValue: cat, displayLabel: cat });
      }
    });

    others.forEach(item => {
      groups.push({ label: item.displayLabel, isGroup: false, items: [item] });
    });

    if (decorativeItems.length > 0) groups.push({ label: "Decorative", isGroup: true, items: decorativeItems });
    if (dollItems.length > 0) groups.push({ label: "Doll", isGroup: true, items: dollItems });
    if (wallArtItems.length > 0) groups.push({ label: "Wall Art", isGroup: true, items: wallArtItems });

    const allGroup = groups.shift();
    groups.sort((a, b) => a.label.localeCompare(b.label));
    if (allGroup) groups.unshift(allGroup);

    return groups;
  }, [collections]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent px-8 md:px-12 py-5 md:py-6 flex justify-between items-center text-white w-full h-24 md:h-28">
      
      {/* ฝั่งซ้าย: เมนูนำทางหลัก */}
      <div className="hidden md:flex items-center space-x-8 lg:space-x-12 text-[11px] tracking-[0.25em] uppercase font-normal h-full">
        <Link 
          href="/about" 
          className={`transition duration-300 ${isActive('/about') ? 'text-white border-b border-white pb-1' : 'text-white/80 hover:text-white'}`}
        >
          About
        </Link>

        {/* ปุ่ม HOME DECOR พร้อม Dropdown Menu */}
        <div className="relative group h-full flex items-center">
          <Link 
            href="/prop" 
            className={`transition duration-300 ${isActive('/prop') ? 'text-white border-b border-white pb-1 font-medium' : 'text-white/80 hover:text-white'}`}
          >
            HOME DECOR
          </Link>

          {/* Container ของ Dropdown (เปลี่ยนเป็นแบบ Glassmorphism) */}
          <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div className="bg-white/10 backdrop-blur-md w-[280px] p-8 shadow-2xl border border-white/20 text-left rounded-sm">
              
              <div className="text-[#C8A97E] text-[10px] uppercase font-medium tracking-[0.3em] mb-5 border-b border-white/20 pb-4">
                Categories
              </div>

              <div className="flex flex-col gap-4">
                {structuredCategories.map((group) => {
                  if (!group.isGroup) {
                    const item = group.items[0];
                    // เช็คว่าเมนูนี้กำลัง Active อยู่หรือไม่
                    const isItemActive = (item.fullValue === 'All' && !currentCategory) || (currentCategory === item.fullValue);

                    return (
                      <Link 
                        key={item.fullValue} 
                        href={`/prop${item.fullValue !== 'All' ? `?category=${encodeURIComponent(item.fullValue)}` : ''}`}
                        className="relative flex items-center w-full pl-4 group/item"
                      >
                        {/* จุดกลมหน้าเมนูสีน้ำตาลทอง */}
                        <span className={`absolute left-0 w-1.5 h-1.5 rounded-full bg-[#C8A97E] transition-all duration-300 ${isItemActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover/item:opacity-40 group-hover/item:scale-100'}`} />
                        
                        <span className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${isItemActive ? 'text-[#C8A97E] font-medium' : 'text-white/90 hover:text-[#C8A97E]'}`}>
                          {item.displayLabel}
                        </span>
                      </Link>
                    );
                  }

                  const isExpanded = expandedGroups.includes(group.label);
                  // เช็คว่าลูกๆ ในกลุ่มนี้มีตัวไหนถูกเลือกอยู่ไหม
                  const isGroupActive = group.items.some(item => currentCategory === item.fullValue);

                  return (
                    <div key={group.label} className="w-full flex flex-col pl-4 relative">
                      <button 
                        onClick={(e) => toggleGroup(e, group.label)} 
                        className="flex items-center justify-between w-full text-left group/btn"
                      >
                        <span className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${isGroupActive ? 'text-[#C8A97E]' : 'text-white/90 hover:text-[#C8A97E]'}`}>
                          {group.label}
                        </span>
                        <span className="text-white/60 text-[13px] font-light transition-transform duration-300">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>
                      
                      {/* ส่วนของ Sub-items เวลาสั่งคลี่ออกมา */}
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[300px] mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="flex flex-col gap-3 pl-3 ml-0.5 border-l border-white/20">
                          {group.items.map(item => {
                            const isSubActive = currentCategory === item.fullValue;
                            return (
                              <Link 
                                key={item.fullValue} 
                                href={`/prop?category=${encodeURIComponent(item.fullValue)}`}
                                className={`text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${isSubActive ? 'text-[#C8A97E] font-medium' : 'text-white/60 hover:text-[#C8A97E]'}`}
                              >
                                {item.displayLabel}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        <Link 
          href="/journal" 
          className={`transition duration-300 ${isActive('/journal') ? 'text-white border-b border-white pb-1' : 'text-white/80 hover:text-white'}`}
        >
          Art & Gallery
        </Link>
        <Link 
          href="/contact" 
          className={`transition duration-300 ${isActive('/contact') ? 'text-white border-b border-white pb-1' : 'text-white/80 hover:text-white'}`}
        >
          Contact
        </Link>
      </div>

      {/* ตรงกลาง: โลโก้ */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex items-center justify-center select-none">
        <Link href="/" className="block transition-transform duration-300 hover:scale-105">
          <img 
            src="/logo.png" 
            alt="Terra Home Studio Logo" 
            className="w-auto h-10 sm:h-11 md:h-14 lg:h-15 object-contain"
          />
        </Link>
      </div>

      {/* ฝั่งขวา: Search & Menu Hamburger */}
      <div className="flex items-center space-x-6 lg:space-x-8 text-white">
        <button className="hover:text-white/60 transition duration-300 p-1 flex items-center justify-center" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px] md:w-5 md:h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M16.5 10.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
          </svg>
        </button>
        
        <button className="hover:text-white/60 transition duration-300 flex flex-col justify-center space-y-[5px] group h-5 p-1" aria-label="Menu">
          <span className="w-[22px] md:w-[25px] h-[1px] bg-white block transition-all duration-300 group-hover:bg-white/60"></span>
          <span className="w-[22px] md:w-[25px] h-[1px] bg-white block transition-all duration-300 group-hover:bg-white/60"></span>
          <span className="w-[22px] md:w-[25px] h-[1px] bg-white block transition-all duration-300 group-hover:bg-white/60"></span>
        </button>
      </div>

    </nav>
  );
}