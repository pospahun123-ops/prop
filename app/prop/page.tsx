import Link from "next/link"
import { createClient } from "../../src/supabase/server"
import PropFilterClient from "./PropFilterClient"
import Navbar from "../components/Navbar"
import PropBanner from "./PropBanner" // 🌟 นำเข้าแบนเนอร์สไลด์ตัวใหม่

export const revalidate = 0

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PropCollectionsPage({ searchParams }: PageProps) {
  const supabase = await createClient()

  const resolvedParams = await searchParams
  const branchId = resolvedParams.branch as string | undefined
  const categoryParam = resolvedParams.category as string | undefined

  const { data: branches } = await supabase
    .from("branches")
    .select("id, branch_code, branch_name, latitude, longitude")
    .not("latitude", "is", null)
    .not("longitude", "is", null)
    .order("branch_name", { ascending: true })

  const productSelectStr = branchId && branchId !== "all"
    ? `id, sku, name, image_url, price, stock!inner ( branch_id, qty )`
    : `id, sku, name, image_url, price`

  let collectionQuery = supabase
    .from("collection_groups")
    .select(`*, products!inner ( ${productSelectStr} )`)
    .order("created_at", { ascending: false })

  if (branchId && branchId !== "all") {
    collectionQuery = collectionQuery
      .eq("products.stock.branch_id", branchId)
      .gt("products.stock.qty", 0)
  }

  const { data: collections, error } = await collectionQuery

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EBE8E1]">
        <div className="text-center">
          <p className="text-[#3A3835] font-serif text-xl mb-2">Unavailable</p>
          <p className="text-[#8C8A86] text-sm font-light tracking-wide">Unable to load the collections at this time.</p>
        </div>
      </div>
    )
  }

  const { data: activeDiscounts } = await supabase
    .from("discounts")
    .select(`id, discount_type, value, start_date, end_date, discount_rules ( product_id )`)
    .eq("active", true)

  const now = new Date()
  
  const activeCollections = collections?.filter(collection => 
    collection.products && collection.products.length > 0
  ) || []

  // 🌟 1. กวาดรูปภาพปกทั้งหมดที่มีในฐานข้อมูล มารวมเป็นก้อนเดียวเพื่อทำสไลด์เฟดหน้า ALL
const allBannerImages = Array.from(new Set(
  activeCollections
    .map(c => c.image_url)
    .filter((url): url is string => !!url && url !== "")
));

  // 🌟 2. ลอจิกหาว่ามีรูปเฉพาะหมวดหมู่ที่กดเลือกไหม
  let activeBannerImage = null;
  if (categoryParam && categoryParam !== "All" && categoryParam !== "SPECIAL_DISCOUNT") {
    const matchedGroup = activeCollections.find(c => c.product_sup === categoryParam && c.image_url);
    if (matchedGroup) {
      activeBannerImage = matchedGroup.image_url;
    }
  }

  const mappedCollections = activeCollections.map((collection) => {
    const mappedProducts = collection.products.map((product: any) => {
      let applicableDiscount = null
      if (activeDiscounts && activeDiscounts.length > 0) {
        applicableDiscount = activeDiscounts.find(discount => {
          const isStarted = !discount.start_date || new Date(discount.start_date) <= now
          const isNotEnded = !discount.end_date || new Date(discount.end_date) >= now
          if (!isStarted || !isNotEnded) return false
          return discount.discount_rules.some((rule: any) => rule.product_id === product.id || rule.product_id === null)
        })
      }
      return {
        ...product,
        discount_value: applicableDiscount ? applicableDiscount.value : null,
        discount_type: applicableDiscount ? applicableDiscount.discount_type : null,
      }
    })
    return { ...collection, products: mappedProducts }
  })

  // เช็กว่าในระบบเรามีรูปแบนเนอร์พร้อมแสดงผลไหม (ไม่ว่าจะรูปเดี่ยวหรือรูปกองรวมทำสไลด์)
  const hasBanner = activeBannerImage || allBannerImages.length > 0;

  return (
    <div className="min-h-screen bg-[#EBE8E1] text-[#3A3835] font-sans selection:bg-[#C8A97E]/20 relative">
      
      {/* 🌟 3. เรียกใช้งานคอมโพเนนต์สไลด์แบนเนอร์ตัวใหม่ พาสข้อมูลข้ามฝั่งไปจัดการ */}
      <PropBanner 
        allImages={allBannerImages} 
        activeImage={activeBannerImage}
        categoryName={categoryParam || "All"}
      />

      {/* 🌟 4. ล็อกป้ายให้แนบบาเป็นสีโปร่งใสเสมอตราบใดที่มีแบนเนอร์รองรับอยู่ด้านหลัง */}
      <div className="relative z-50">
        <Navbar collections={collections} isLightMode={!hasBanner} />
      </div>

      {/* 🌟 5. ดันระยะเว้นด้านบนลงมารับความสูงแบนเนอร์ตัวใหม่ (30vh สำหรับโมบาย, 40vh สำหรับจอคอม) */}
      <div className={`relative z-10 max-w-[1600px] mx-auto lg:py-16 ${hasBanner ? 'pt-[30vh] lg:pt-[40vh]' : 'py-8 pt-32'}`}>
        {mappedCollections.length === 0 ? (
          <div className="text-center py-32">
            <span className="text-[#8C8A86] text-[10px] uppercase tracking-[0.2em] font-medium">
              No Collections Discovered
            </span>
          </div>
        ) : (
          <PropFilterClient collections={mappedCollections} branches={branches || []} />
        )}
      </div>
    </div>
  )
}