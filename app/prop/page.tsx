// app/prop/page.tsx
import Link from "next/link"
import { createClient } from "../../src/supabase/server"
import PropFilterClient from "./PropFilterClient"

export const revalidate = 0

export default async function PropCollectionsPage() {
  const supabase = await createClient()

  const { data: collections, error } = await supabase
    .from("collection_groups")
    .select(`
      *,
      products ( sku, image_url, price )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6]">
        <div className="text-center">
          <p className="text-[#C8A97E] font-serif text-xl mb-2">Unavailable</p>
          <p className="text-[#8C8A86] text-sm font-light tracking-wide">Unable to load the collections at this time.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2C2A26] font-sans selection:bg-[#C8A97E]/20">
      
      {/* Luxury Minimal Navbar */}
      <nav className="w-full py-6 px-6 lg:px-12 flex justify-between items-center border-b border-[#2C2A26]/5 sticky top-0 bg-[#F9F8F6]/90 backdrop-blur-md z-50">
        <Link href="/" className="text-[10px] font-medium tracking-[0.2em] text-[#8C8A86] hover:text-[#C8A97E] transition-colors uppercase">
          Return
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 font-serif text-xl lg:text-2xl tracking-widest text-[#2C2A26]">
          HERITAGE
        </div>
        
      </nav>

      {/* Main Container */}
      <div className="max-w-[1500px] mx-auto py-12 sm:py-16 lg:py-24">
        
        {/* Editorial Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20 flex flex-col items-center text-center px-4">
          <span className="text-[#C8A97E] text-[10px] uppercase font-medium tracking-[0.3em] mb-4">
            Curated Selection
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#2C2A26] mb-6 tracking-wide leading-tight max-w-2xl">
            The Prop Collection
          </h1>
         
        </div>

        {/* ✅ เรียกใช้ Client Component */}
        {(!collections || collections.length === 0) ? (
          <div className="text-center py-32">
            <span className="text-[#C8A97E] text-sm uppercase tracking-[0.2em] font-light">No Collections Discovered</span>
          </div>
        ) : (
          <PropFilterClient collections={collections} />
        )}

      </div>
    </div>
  )
}