// app/prop/[groupId]/[sku]/ProductDetailClient.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowLeft, CheckCircle2, MapPin, Navigation } from "lucide-react"

const BranchMap = dynamic(() => import('./BranchMap'), { 
  ssr: false, 
  loading: () => (
    <div className="w-full h-[350px] mt-4 bg-[#F5F4F0] flex flex-col items-center justify-center text-[#C8A97E] text-[10px] uppercase tracking-widest animate-pulse border border-[#E5E5E5] rounded-sm">
      <MapPin className="w-6 h-6 mb-2 opacity-50" />
      Loading Map...
    </div>
  )
})

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function ProductDetailClient({
  groupProducts,
  currentGroupId,
  initialSku
}: {
  groupProducts: any[]
  currentGroupId: string
  initialSku: string
}) {
  const [activeProduct, setActiveProduct] = useState(() => {
    return groupProducts.find(p => p.sku === initialSku) || groupProducts[0]
  })

  const [showStock, setShowStock] = useState(false)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [loadingLocation, setLoadingLocation] = useState(false)
  
  const [selectedBranch, setSelectedBranch] = useState<{ lat: number; lng: number; timestamp: number } | null>(null)

  const handleSelectProduct = (product: any) => {
    setActiveProduct(product)
    setShowStock(false)
    const newPath = `/prop/${encodeURIComponent(currentGroupId)}/${encodeURIComponent(product.sku)}`
    window.history.pushState(null, "", newPath)
  }

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่งครับ")
      return
    }
    setLoadingLocation(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude])
        setLoadingLocation(false)
      },
      (error) => {
        console.error(error)
        alert("ไม่สามารถดึงตำแหน่งได้ โปรดเปิดสิทธิ์เข้าถึงพิกัดในเบราว์เซอร์ก่อนนะครับนาย")
        setLoadingLocation(false)
      },
      { enableHighAccuracy: true }
    )
  }

  const specs = activeProduct.specs || {}
  
  let activeStock = activeProduct.stock?.filter((s: any) => s.qty > 0).map((s: any) => {
    if (userLocation && s.branches?.latitude && s.branches?.longitude) {
      const dist = calculateDistance(
        userLocation[0],
        userLocation[1],
        Number(s.branches.latitude),
        Number(s.branches.longitude)
      )
      return { ...s, distance: dist }
    }
    return { ...s, distance: null }
  }) || []

  if (userLocation) {
    activeStock.sort((a: any, b: any) => (a.distance ?? Infinity) - (b.distance ?? Infinity))
  }

  return (
    <div className="min-h-screen bg-white text-[#2C2A26] font-sans selection:bg-[#C8A97E]/20 flex flex-col">
      
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

      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 flex-1 items-stretch">
        
        <div className="lg:col-span-5 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">
          <div className="flex-1 bg-[#F5F4F0] aspect-square lg:aspect-auto relative overflow-hidden group rounded-sm min-h-[300px] lg:min-h-[500px]">
            {activeProduct.image_url ? (
              <img 
                src={activeProduct.image_url} 
                alt={activeProduct.name} 
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

        <div className="lg:col-span-7 p-6 lg:p-10 xl:p-16 flex flex-col gap-12">
          
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl uppercase tracking-wide leading-snug">
              {activeProduct.name}
            </h1>
            <p className="mt-3 text-lg font-medium tracking-widest text-[#C8A97E]">
              {activeProduct.price > 0 ? `THB ${activeProduct.price.toLocaleString()}` : "POA"}
            </p>

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

            <div className="mt-8 max-w-xl">
              <button 
                onClick={() => setShowStock(!showStock)}
                className="w-full flex items-center justify-between py-3 group"
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#2C2A26] group-hover:text-[#C8A97E] transition-colors">
                  <MapPin className="w-4 h-4" />
                  In-Store Availability & Map
                </div>
                <span className="text-gray-400 text-lg font-light group-hover:text-[#C8A97E] transition-colors">
                  {showStock ? '−' : '+'}
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${showStock ? 'max-h-[1200px] mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                
                {activeStock.length > 0 && !userLocation && (
                  <button
                    onClick={handleGetLocation}
                    disabled={loadingLocation}
                    className="mb-2 w-full text-left text-[10px] font-semibold text-[#3b82f6] hover:text-blue-700 transition-colors uppercase tracking-wider flex items-center gap-1.5 py-1 px-1"
                  >
                    <Navigation className={`w-3 h-3 ${loadingLocation ? 'animate-spin' : ''}`} />
                    {loadingLocation ? 'Calculating Distance...' : 'Calculate distance from your location'}
                  </button>
                )}

                <div className="bg-[#F9F8F6] p-2 rounded-sm border border-[#E5E5E5]/50 flex flex-col gap-1">
                  {activeStock.length > 0 ? (
                    activeStock.map((s: any, idx: number) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          if (s.branches?.latitude && s.branches?.longitude) {
                            setSelectedBranch({
                              lat: Number(s.branches.latitude),
                              lng: Number(s.branches.longitude),
                              timestamp: Date.now()
                            })
                          }
                        }}
                        className="flex justify-between items-center text-[11px] uppercase tracking-wider p-2 rounded-sm cursor-pointer hover:bg-white hover:shadow-sm transition-all duration-200 border border-transparent hover:border-[#E5E5E5] group/item"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-gray-700 font-medium">
                            {s.branches?.branch_name || 'Unknown Branch'}
                          </span>
                          {s.distance !== null && (
                            <span className="text-[10px] text-[#3b82f6] font-medium font-mono lowercase tracking-normal flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" /> {s.distance.toFixed(1)} km away
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]"></span>
                            <span className="font-mono text-gray-900 font-semibold">{s.qty} in stock</span>
                          </div>
                          
                          {/* ⚡ ปุ่มนำทางไป Google Maps (ใช้ e.stopPropagation() เพื่อไม่ให้เผลอไปทริกเกอร์คลิกเลือกสาขาหลัก) */}
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${s.branches.latitude},${s.branches.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} 
                            className="bg-blue-50 text-blue-600 p-1.5 rounded-md hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
                            title="Get directions on Google Maps"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-[10px] text-gray-400 uppercase tracking-widest py-4">
                      Currently out of stock in all branches
                    </div>
                  )}
                </div>

                {activeStock.length > 0 && (
                  <BranchMap 
                    activeStock={activeStock} 
                    productImage={activeProduct.image_url} 
                    productName={activeProduct.name}
                    userLocation={userLocation}
                    setUserLocation={setUserLocation}
                    selectedBranch={selectedBranch}
                  />
                )}

              </div>
            </div>
          </div>

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
                    onClick={() => handleSelectProduct(item)}
                    className={`snap-start min-w-[130px] max-w-[130px] flex flex-col group transition-all duration-300 cursor-pointer`}
                  >
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

                      {isActive && (
                        <span className="absolute top-2 right-2 flex items-center gap-1 text-[8px] font-bold text-[#C8A97E] uppercase tracking-wider bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-sm shadow-sm">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Viewing
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col items-center text-center px-1">
                      <h3 className={`text-[10px] uppercase font-medium tracking-wider truncate w-full transition-colors ${isActive ? 'text-[#C8A97E]' : 'text-gray-800 group-hover:text-[#C8A97E]'}`}>
                        {item.name}
                      </h3>
                      <p className={`text-[10px] font-semibold mt-1.5 ${isActive ? 'text-[#C8A97E]' : 'text-gray-900'}`}>
                        {item.price > 0 ? `THB ${item.price.toLocaleString()}` : "POA"}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

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