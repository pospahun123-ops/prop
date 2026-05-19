// app/prop/[groupId]/[sku]/ProductDetailClient.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ProductDetailClient({
  groupProducts,
  currentGroupId,
  initialSku
}: {
  groupProducts: any[]
  currentGroupId: string
  initialSku: string
}) {
  // ⚡ State ควบคุมสินค้าชิ้นที่แสดงผลอยู่ฝั่งซ้าย
  const [activeProduct, setActiveProduct] = useState(() => {
    return groupProducts.find(p => p.sku === initialSku) || groupProducts[0]
  })

  // ⚡ ฟังก์ชันสลับสินค้าทันใจแบบติดนิ้ว พร้อมแอบเปลี่ยน URL บนบราวเซอร์เนียนๆ
  const handleSelectProduct = (product: any) => {
    setActiveProduct(product)
    const newPath = `/prop/${encodeURIComponent(currentGroupId)}/${encodeURIComponent(product.sku)}`
    window.history.pushState(null, "", newPath)
  }

  const specs = activeProduct.specs || {}

  return (
    <div className="min-h-screen bg-white text-[#2C2A26] font-sans selection:bg-[#C8A97E]/20 flex flex-col">
      
      {/* Top Navbar */}
      <nav className="w-full py-4 px-4 lg:px-8 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <Link 
          href="/prop" 
          className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-gray-500 hover:text-black flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
          <span className="hidden sm:inline">Back to Collections</span>
          <span className="sm:hidden">Back</span>
        </Link>
        
        <div className="font-serif text-base sm:text-lg tracking-widest text-center truncate px-4">
          COLLECTION SHOWROOM
        </div>
        
        <div className="text-[9px] sm:text-[10px] text-gray-400 font-mono text-right truncate max-w-[80px] sm:max-w-none">
          GROUP: {currentGroupId}
        </div>
      </nav>

      {/* Main Layout */}
      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 flex-1 items-stretch">
        
        {/* 🖼️ คอลัมน์ 1: รูปภาพสินค้าที่กำลัง Active (กินพื้นที่ 5/12) */}
        <div className="lg:col-span-5 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">
          <div className="flex-1 bg-[#F5F4F0] aspect-square lg:aspect-auto relative overflow-hidden group rounded-sm min-h-[300px] lg:min-h-[500px]">
            {activeProduct.image_url ? (
              <img 
                src={activeProduct.image_url} 
                alt={activeProduct.name} 
                // ใส่ key เพื่อเวลาสลับรูป จะได้มี Effect รีเรนเดอร์สวยๆ ครับ
                key={activeProduct.id}
                className="w-full h-full absolute inset-0 object-contain p-8 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 uppercase tracking-widest text-xs">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* 📝 คอลัมน์ 2: รายละเอียด + สินค้าในเซ็ต (กินพื้นที่ 7/12) */}
        <div className="lg:col-span-7 p-6 lg:p-10 xl:p-16 flex flex-col gap-12">
          
          {/* ส่วนที่ 1: ข้อมูลสินค้าหลักที่ดึงตาม State */}
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl uppercase tracking-wide leading-snug">
              {activeProduct.name}
            </h1>
            <p className="mt-3 text-lg font-medium tracking-widest text-[#C8A97E]">
              {activeProduct.price > 0 ? `THB ${activeProduct.price.toLocaleString()}` : "POA"}
            </p>
            <p className="text-[11px] text-gray-400 mt-2 uppercase tracking-[0.2em] font-mono">
              REF. {activeProduct.sku}
            </p>
            
            <p className="mt-6 text-sm font-light leading-relaxed text-gray-600 max-w-2xl">
              {activeProduct.description || "Curated item selected specifically for the fine heritage and premium prop line. Beautifully crafted for versatile uses."}
            </p>

            {/* สเปกขนาดสินค้า */}
            <div className="mt-8 py-5 border-y border-gray-100 grid grid-cols-3 text-center text-xs divide-x divide-gray-100 max-w-xl">
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1.5">Width</span>
                <span className="font-medium text-gray-800">{specs.width_cm || '-'} cm</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1.5">Depth</span>
                <span className="font-medium text-gray-800">{specs.length_cm || '-'} cm</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1.5">Height</span>
                <span className="font-medium text-gray-800">{specs.thickness_cm || '-'} cm</span>
              </div>
            </div>
          </div>

          {/* ส่วนที่ 2: สินค้าในเซ็ตสไลด์แนวนอน */}
          <div>
            <div className="mb-6">
              <span className="text-[#C8A97E] text-[10px] uppercase tracking-[0.2em] font-bold block mb-1">
                Complete the Set
              </span>
              <h2 className="font-serif text-xl uppercase tracking-wide text-gray-900">
                Collection Items
              </h2>
            </div>

            <div className="flex flex-row gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {groupProducts.map((item) => {
                const isActive = item.sku === activeProduct.sku
                
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleSelectProduct(item)} // ⚡ คลิกปุ๊บ สลับข้อมูลฝั่งซ้ายทันทีใน 0 วินาที!
                    className={`snap-start min-w-[130px] max-w-[130px] flex flex-col group transition-all duration-300 cursor-pointer`}
                  >
                    {/* รูปสินค้าตัวเล็ก */}
                    <div className={`w-full aspect-[4/5] mb-3 bg-[#F5F4F0] relative overflow-hidden flex items-center justify-center rounded-sm transition-colors duration-300 border ${
                      isActive ? 'border-[#C8A97E] shadow-sm' : 'border-transparent group-hover:border-gray-200'
                    }`}>
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          className={`w-full h-full object-contain p-2 mix-blend-multiply transition-opacity ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} 
                          alt={item.name} 
                        />
                      ) : (
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest">No Img</span>
                      )}

                      {/* ป้าย Viewing สีทองหรูหราของนาย */}
                      {isActive && (
                        <span className="absolute top-2 right-2 flex items-center gap-1 text-[8px] font-bold text-[#C8A97E] uppercase tracking-wider bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-sm shadow-sm">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Viewing
                        </span>
                      )}
                    </div>

                    {/* ข้อมูลจัดกลาง */}
                    <div className="flex flex-col items-center text-center px-1">
                      <h3 className={`text-[10px] uppercase font-medium tracking-wider truncate w-full transition-colors ${isActive ? 'text-[#C8A97E]' : 'text-gray-800 group-hover:text-[#C8A97E]'}`}>
                        {item.name}
                      </h3>
                      <p className="text-[9px] text-gray-400 font-mono mt-1">REF: {item.sku}</p>
                      
                      <p className={`text-[10px] font-semibold mt-1.5 ${isActive ? 'text-[#C8A97E]' : 'text-gray-900'}`}>
                        {item.price > 0 ? `THB ${item.price.toLocaleString()}` : "POA"}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ปุ่ม Contact */}
          <div className="pt-4 max-w-xl">
            <button className="w-full bg-[#2C2A26] text-white py-4 text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#C8A97E] transition-all duration-300 shadow-lg shadow-black/5 active:scale-[0.98]">
              Contact to Purchase
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}