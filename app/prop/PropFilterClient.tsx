// app/prop/PropFilterClient.tsx
"use client"

import { useState, useMemo, useEffect, useRef } from "react"
// 💡 1. Import ระบบจัดการ URL ของ Next.js
import { useRouter, usePathname, useSearchParams } from "next/navigation" 
import CollectionCard from "./CollectionCard"

export default function PropFilterClient({ collections }: { collections: any[] }) {
  // 💡 2. เรียกใช้งาน URL Hooks
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 💡 3. ตั้งค่าเริ่มต้นโดยดึงค่ามาจาก URL (ถ้ามี) ถ้าไม่มีให้ใช้ค่า Default
  const initialCategory = searchParams.get('category') || "All"
  const initialPage = Number(searchParams.get('page')) || 1

  const [activeFilter, setActiveFilter] = useState(initialCategory)
  const [currentPage, setCurrentPage] = useState(initialPage)
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) 
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  
  const itemsPerPage = 8 
  const topRef = useRef<HTMLDivElement>(null)

  // 💡 4. ดักจับการกดย้อนกลับ/ไปข้างหน้า (Back/Forward) บนเบราว์เซอร์ เพื่อให้หน้าเปลี่ยนตาม URL
  useEffect(() => {
    const urlCategory = searchParams.get('category') || "All"
    const urlPage = Number(searchParams.get('page')) || 1
    setActiveFilter(urlCategory)
    setCurrentPage(urlPage)
  }, [searchParams])

  // 💡 5. ฟังก์ชันสำหรับอัปเดต URL แบบเนียนๆ (ไม่โหลดหน้าใหม่)
  const updateURL = (newFilter: string, newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newFilter && newFilter !== "All") {
      params.set('category', newFilter)
    } else {
      params.delete('category')
    }

    if (newPage > 1) {
      params.set('page', newPage.toString())
    } else {
      params.delete('page')
    }

    // สั่งเปลี่ยน URL โดยตั้งค่า scroll: false เพื่อไม่ให้จอกระตุกไปข้างบนสุดเอง
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // 💡 6. ฟังก์ชันจัดการเมื่อกดเปลี่ยนหมวดหมู่
  const handleFilterChange = (filterValue: string) => {
    setActiveFilter(filterValue)
    setCurrentPage(1) // เปลี่ยนหมวดหมู่ ต้องกลับไปหน้า 1 เสมอ
    setIsDropdownOpen(false)
    updateURL(filterValue, 1) // อัปเดต URL ทันที
  }

  // 💡 7. ฟังก์ชันจัดการเมื่อกดเปลี่ยนหน้า 1, 2, 3...
  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    updateURL(activeFilter, page) // อัปเดต URL ทันที
    
    // เลื่อนจอกลับไปข้างบนสุดของ List อย่างนุ่มนวล
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  }

  const structuredCategories = useMemo(() => {
    const cats = new Set<string>()
    collections.forEach(group => {
      if (group.product_sup) {
        cats.add(group.product_sup)
      }
    })
    const rawCategories = Array.from(cats).sort()

    const groups: { label: string, isGroup: boolean, items: { fullValue: string, displayLabel: string, isSpecial?: boolean }[] }[] = [
      { label: "All", isGroup: false, items: [{ fullValue: "All", displayLabel: "All" }] }
    ]

    const decorativeItems: any[] = []
    const dollItems: any[] = []
    const wallArtItems: any[] = []
    const others: any[] = []

    rawCategories.forEach(cat => {
      if (cat === "Candle Holder" || cat.startsWith("Decorative") || cat.startsWith("Decotative")) {
        let display = cat
        if (cat.startsWith("Decorative ")) display = cat.replace("Decorative ", "")
        else if (cat.startsWith("Decotative ")) display = cat.replace("Decotative ", "")
        decorativeItems.push({ fullValue: cat, displayLabel: display })
      }
      else if (cat.startsWith("Doll ")) {
        dollItems.push({ fullValue: cat, displayLabel: cat.replace("Doll ", "") })
      }
      else if (cat.startsWith("Wall Art ")) {
        wallArtItems.push({ fullValue: cat, displayLabel: cat.replace("Wall Art ", "") })
      }
      else {
        others.push({ fullValue: cat, displayLabel: cat })
      }
    })

    others.forEach(item => {
      groups.push({ label: item.displayLabel, isGroup: false, items: [item] })
    })

    if (decorativeItems.length > 0) groups.push({ label: "Decorative", isGroup: true, items: decorativeItems })
    if (dollItems.length > 0) groups.push({ label: "Doll", isGroup: true, items: dollItems })
    if (wallArtItems.length > 0) groups.push({ label: "Wall Art", isGroup: true, items: wallArtItems })

    const allGroup = groups.shift()
    groups.sort((a, b) => a.label.localeCompare(b.label))
    if (allGroup) groups.unshift(allGroup)

    groups.push({ 
      label: "Special Discount", 
      isGroup: false, 
      items: [{ fullValue: "SPECIAL_DISCOUNT", displayLabel: "SALE OFFERS %", isSpecial: true }] 
    })

    return groups
  }, [collections])

  const toggleGroup = (groupLabel: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupLabel) ? prev.filter(g => g !== groupLabel) : [...prev, groupLabel]
    )
  }

  const filteredCollections = activeFilter === "All" 
    ? collections 
    : activeFilter === "SPECIAL_DISCOUNT"
      ? collections.filter(group => group.products?.some((p: any) => p.discount_value !== null))
      : collections.filter(group => group.product_sup === activeFilter)


  const totalPages = Math.ceil(filteredCollections.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCollections = filteredCollections.slice(startIndex, startIndex + itemsPerPage)

  const renderPagination = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) pages.push(1, 2, 3, 4, 5, '...', totalPages);
      else if (currentPage >= totalPages - 3) pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return pages.map((page, idx) => {
      if (page === '...') return <span key={`dots-${idx}`} className="px-2 text-[#8C8A86] text-xs">...</span>
      return (
        <div
          key={`page-${page}`}
          role="button"
          tabIndex={0}
          onClick={(e) => { e.preventDefault(); handlePageChange(page as number); }}
          className={`relative z-[9999] pointer-events-auto w-8 h-8 flex items-center justify-center text-xs font-serif transition-all duration-300 cursor-pointer select-none ${currentPage === page ? 'text-[#2C2A26] border-b border-[#C8A97E]' : 'text-[#8C8A86] hover:text-[#C8A97E]'}`}
        >
          {page}
        </div>
      )
    });
  }

  return (
    <div className="w-full scroll-mt-32" ref={topRef}>
      
      {/* 📱 Mobile Filter */}
      <div className="md:hidden w-full px-4 mb-10 relative z-[100]">
        <button 
          type="button"
          onClick={(e) => { e.preventDefault(); setIsDropdownOpen(!isDropdownOpen); }}
          className="w-full flex items-center justify-between border-b border-[#C8A97E]/30 pb-3 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] bg-transparent"
        >
          <span className="text-[#8C8A86] font-light">Filter by:</span>
          <span className={`font-medium flex items-center gap-2 ${activeFilter === "SPECIAL_DISCOUNT" ? "text-[#DC2626]" : "text-[#2C2A26]"}`}>
            <span className="truncate max-w-[150px]">
              {activeFilter === "SPECIAL_DISCOUNT" ? "SALE OFFERS %" : activeFilter.replace(/^(Decorative|Doll|Wall Art|Decotative)\s+/i, '')}
            </span>
          </span>
        </button>
        
        <div className={`absolute top-full left-4 right-4 bg-white border border-[#E5E5E5] shadow-2xl transition-all duration-300 origin-top z-[100] ${isDropdownOpen ? 'opacity-100 scale-y-100 mt-2 pointer-events-auto' : 'opacity-0 scale-y-95 mt-0 pointer-events-none'}`}>
          <div className="max-h-[50vh] overflow-y-auto py-2">
            {structuredCategories.map((group) => {
              if (!group.isGroup) {
                const item = group.items[0]
                const isSpecial = item.isSpecial
                
                if (isSpecial) {
                  return (
                    <div key={item.fullValue} className="p-3 border-t border-[#E5E5E5] mt-2 bg-slate-50">
                      <button 
                        onClick={(e) => { e.preventDefault(); handleFilterChange(item.fullValue); }} 
                        className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold border rounded-md transition-all shadow-sm ${activeFilter === item.fullValue ? 'bg-[#DC2626] border-[#DC2626] text-white' : 'bg-white border-[#DC2626] text-[#DC2626]'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {item.displayLabel}
                      </button>
                    </div>
                  )
                }

                return (
                  <button key={item.fullValue} onClick={(e) => { e.preventDefault(); handleFilterChange(item.fullValue); }} className={`w-full text-left px-5 py-4 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] ${activeFilter === item.fullValue ? 'bg-[#F9F8F6] text-[#C8A97E] font-medium border-l-2 border-[#C8A97E]' : 'text-[#8C8A86] font-light hover:bg-[#F9F8F6] border-l-2 border-transparent'}`}>
                    {item.displayLabel}
                  </button>
                )
              }
              return (
                <div key={group.label} className="w-full">
                  <div className="px-5 py-3 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-[#2C2A26] font-medium bg-[#F9F8F6]/50">{group.label}</div>
                  {group.items.map(item => (
                    <button key={item.fullValue} onClick={(e) => { e.preventDefault(); handleFilterChange(item.fullValue); }} className={`w-full text-left px-5 py-3 pl-8 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] ${activeFilter === item.fullValue ? 'bg-[#F9F8F6] text-[#C8A97E] font-medium border-l-2 border-[#C8A97E]' : 'text-[#8C8A86] font-light hover:bg-[#F9F8F6] border-l-2 border-transparent'}`}>
                      {item.displayLabel}
                    </button>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 💻 Desktop Layout */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start w-full px-4 sm:px-6">
        <aside className="hidden md:flex flex-col w-48 lg:w-56 shrink-0 sticky top-24 z-20">
          <span className="text-[#C8A97E] text-[10px] uppercase font-medium tracking-[0.3em] mb-8 border-b border-[#C8A97E]/20 pb-4">Categories</span>
          <div className="flex flex-col gap-4 items-start w-full pr-4">
            {structuredCategories.map((group) => {
              if (!group.isGroup) {
                const item = group.items[0]
                const isActive = activeFilter === item.fullValue
                const isSpecial = item.isSpecial
                
                if (isSpecial) {
                  return (
                    <div key={item.fullValue} className="w-full mt-4 pt-6 border-t border-[#E5E5E5]">
                      <button 
                        onClick={(e) => { e.preventDefault(); handleFilterChange(item.fullValue); }} 
                        className={`w-full py-3.5 px-4 flex items-center justify-center gap-2 border rounded-md transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${isActive ? 'bg-[#DC2626] border-[#DC2626] text-white shadow-red-200' : 'bg-white border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626]'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-center">
                          {item.displayLabel}
                        </span>
                      </button>
                    </div>
                  )
                }

                return (
                  <button key={item.fullValue} onClick={(e) => { e.preventDefault(); handleFilterChange(item.fullValue); }} className="relative group text-left transition-all duration-300 flex items-center w-full">
                    <span className={`absolute -left-5 w-1.5 h-1.5 rounded-full bg-[#C8A97E] transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                    <span className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${isActive ? 'text-[#2C2A26] font-semibold' : 'text-[#8C8A86] font-light group-hover:text-[#C8A97E]'}`}>
                      {item.displayLabel}
                    </span>
                  </button>
                )
              }
              const isExpanded = expandedGroups.includes(group.label)
              return (
                <div key={group.label} className="w-full flex flex-col">
                  <button onClick={(e) => { e.preventDefault(); toggleGroup(group.label); }} className="flex items-center justify-between w-full text-left group">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#2C2A26] font-medium group-hover:text-[#C8A97E] transition-colors">{group.label}</span>
                    <span className="text-[#8C8A86] text-[12px] font-light">{isExpanded ? '—' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col gap-4 pl-3 border-l border-[#C8A97E]/20 ml-1.5">
                      {group.items.map(item => {
                        const isActive = activeFilter === item.fullValue
                        return (
                          <button key={item.fullValue} onClick={(e) => { e.preventDefault(); handleFilterChange(item.fullValue); }} className="relative group text-left flex items-center">
                            <span className={`absolute -left-[17px] w-1.5 h-1.5 rounded-full bg-[#C8A97E] transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                            <span className={`text-[10.5px] uppercase tracking-[0.15em] transition-colors duration-300 ${isActive ? 'text-[#2C2A26] font-semibold' : 'text-[#8C8A86] font-light group-hover:text-[#C8A97E]'}`}>{item.displayLabel}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </aside>

        <div className="flex-1 w-full flex flex-col relative z-10">
          {paginatedCollections.length === 0 ? (
            <div className="text-center py-20 border border-[#E5E5E5] rounded-sm bg-white/50 relative z-10">
              <span className="text-[#C8A97E] text-[10px] uppercase tracking-[0.3em] font-light">
                {activeFilter === "SPECIAL_DISCOUNT" ? "No Discounts Available" : "No Collections in this category"}
              </span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:gap-x-8 lg:gap-y-16 w-full">
                {paginatedCollections.map((group) => {
                  const slides = group.products
                    ?.filter((p: any) => p.image_url !== null && p.image_url !== "")
                    .map((p: any) => ({
                      image_url: p.image_url,
                      price: p.price,
                      sku: p.sku,
                      name: p.name, 
                      discount_value: p.discount_value,
                      discount_type: p.discount_type
                    })) || []
                  if (slides.length === 0 && group.cover_image_url) {
                    slides.push({ image_url: group.cover_image_url, price: null, sku: "", name: "", discount_value: null, discount_type: null })
                  }
                  return <CollectionCard key={group.id} group={group} slides={slides} />
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 sm:gap-2 mt-16 sm:mt-24 border-t border-[#E5E5E5] pt-10 flex-wrap relative z-[9999]">
                  <div role="button" onClick={(e) => { if(currentPage === 1) return; e.preventDefault(); handlePageChange(currentPage - 1); }} className={`relative z-[9999] pointer-events-auto cursor-pointer text-[10px] uppercase tracking-[0.2em] px-2 py-2 ${currentPage === 1 ? 'text-[#8C8A86]/30 cursor-not-allowed' : 'text-[#8C8A86] hover:text-[#C8A97E]'}`}>Prev</div>
                  <div className="flex gap-1 relative z-[9999]">{renderPagination()}</div>
                  <div role="button" onClick={(e) => { if(currentPage === totalPages) return; e.preventDefault(); handlePageChange(currentPage + 1); }} className={`relative z-[9999] pointer-events-auto cursor-pointer text-[10px] uppercase tracking-[0.2em] px-2 py-2 ${currentPage === totalPages ? 'text-[#8C8A86]/30 cursor-not-allowed' : 'text-[#8C8A86] hover:text-[#C8A97E]'}`}>Next</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  ) 
}