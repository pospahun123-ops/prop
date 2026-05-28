// app/prop/page.tsx
import Link from "next/link"
import { createClient } from "../../src/supabase/server"
import PropFilterClient from "./PropFilterClient"
import BranchSelector from "./BranchSelector"

export const revalidate = 0

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PropCollectionsPage({ searchParams }: PageProps) {
  const supabase = await createClient()

  // 1. แก้อาการ Next.js 15 Error ด้วยการ await ค่า searchParams ก่อนใช้งาน
  const resolvedParams = await searchParams
  const branchId = resolvedParams.branch as string | undefined

  // 2. ดึงข้อมูลสาขาที่มีพิกัด Latitude และ Longitude (ไม่เอาค่า null) มาทำ Dropdown
  const { data: branches } = await supabase
    .from("branches")
    .select("id, branch_code, branch_name, latitude, longitude")
    .not("latitude", "is", null)
    .not("longitude", "is", null)
    .order("branch_name", { ascending: true })

  // 3. จัดการ String Query สำหรับดึงข้อมูลสินค้า
  // ถ้าเลือกสาขา (และไม่ใช่ 'all') จะใช้ !inner เพื่อกรองเอาเฉพาะสินค้าที่มีสต็อกในสาขานั้น
  const productSelectStr = branchId && branchId !== "all"
    ? `
        id, sku, name, image_url, price,
        stock!inner ( branch_id, qty )
      `
    : `
        id, sku, name, image_url, price
      `

  let collectionQuery = supabase
    .from("collection_groups")
    .select(`
      *,
      products!inner ( ${productSelectStr} )
    `)
    .order("created_at", { ascending: false })

  // ถ้ามีการเลือกสาขา ให้กรองเฉพาะสาขาที่เลือก และสินค้าต้องมีจำนวนมากกว่า 0 ชิ้น
  if (branchId && branchId !== "all") {
    collectionQuery = collectionQuery
      .eq("products.stock.branch_id", branchId)
      .gt("products.stock.qty", 0)
  }

  const { data: collections, error } = await collectionQuery

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

  // 4. ดึงข้อมูลส่วนลดที่เปิดใช้งานอยู่ พร้อมกฎที่ผูกไว้กับสินค้าแต่ละตัว
  const { data: activeDiscounts } = await supabase
    .from("discounts")
    .select(`
      id, discount_type, value, start_date, end_date,
      discount_rules ( product_id )
    `)
    .eq("active", true)

  const now = new Date()
  
  // กรองเอาเฉพาะกลุ่มคอลเลกชันที่มีสินค้า (products) มากกว่า 0 ชิ้นเท่านั้น
  const activeCollections = collections?.filter(collection => 
    collection.products && collection.products.length > 0
  ) || []

  // 5. Map ข้อมูลส่วนลดเข้าไปใน Products แต่ละตัว
  const mappedCollections = activeCollections.map((collection) => {
    const mappedProducts = collection.products.map((product: any) => {
      let applicableDiscount = null

      if (activeDiscounts && activeDiscounts.length > 0) {
        applicableDiscount = activeDiscounts.find(discount => {
          const isStarted = !discount.start_date || new Date(discount.start_date) <= now
          const isNotEnded = !discount.end_date || new Date(discount.end_date) >= now
          if (!isStarted || !isNotEnded) return false

          return discount.discount_rules.some((rule: any) => 
            rule.product_id === product.id || rule.product_id === null
          )
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

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2C2A26] font-sans selection:bg-[#C8A97E]/20">
      
      {/* Luxury Minimal Navbar แบบ 3 คอลัมน์เพื่อให้ปุ่มบาลานซ์กันสวยงาม */}
      <nav className="w-full py-6 px-6 lg:px-12 grid grid-cols-3 items-center border-b border-[#2C2A26]/5 sticky top-0 bg-[#F9F8F6]/90 backdrop-blur-md z-50">
        {/* ฝั่งซ้าย: ปุ่มย้อนกลับ */}
        <div className="flex justify-start">
          <Link href="/" className="text-[10px] font-medium tracking-[0.2em] text-[#8C8A86] hover:text-[#C8A97E] transition-colors uppercase">
            Return
          </Link>
        </div>

        {/* ตรงกลาง: ชื่อร้าน */}
        <div className="flex justify-center font-serif text-xl lg:text-2xl tracking-widest text-[#2C2A26] text-center whitespace-nowrap">
          Terra Home Studio
        </div>

        {/* ฝั่งขวา: ปุ่มเลือกสาขา (Dropdown) */}
        <div className="flex justify-end">
          {branches && branches.length > 0 && (
            <BranchSelector branches={branches} />
          )}
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

        {/* ส่งข้อมูลคอลเลกชันที่กรองและคำนวณส่วนลดแล้วไปแสดงผลที่ Client Component */}
        {mappedCollections.length === 0 ? (
          <div className="text-center py-32">
            <span className="text-[#C8A97E] text-sm uppercase tracking-[0.2em] font-light">
              No Collections Discovered
            </span>
          </div>
        ) : (
          <PropFilterClient collections={mappedCollections} />
        )}

      </div>
    </div>
  )
}