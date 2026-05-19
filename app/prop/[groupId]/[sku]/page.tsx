// app/prop/[groupId]/[sku]/page.tsx
import { createClient } from "../../../../src/supabase/server"
import ProductDetailClient from "./ProductDetailClient"

type Props = {
  params: Promise<{ groupId: string; sku: string }>
}

export const revalidate = 0

export default async function ProductDetailWithGroupSidebarPage({ params }: Props) {
  const resolvedParams = await params
  const currentGroupId = decodeURIComponent(resolvedParams.groupId)
  const currentSku = decodeURIComponent(resolvedParams.sku)

  const supabase = await createClient()

  // ⚡ ดึงสินค้าทั้งหมดที่อยู่ใน Group นี้มาเตรียมไว้ในรอบเดียวเลยครับนาย
  const { data: groupProducts, error } = await supabase
    .from("products")
    .select("*")
    .eq("collection_group_id", currentGroupId)
    .order("sku", { ascending: true })

  if (error || !groupProducts || groupProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-500">
        <p className="text-lg mb-4">ไม่พบข้อมูลสินค้ากลุ่มนี้ในระบบ</p>
      </div>
    )
  }

  return (
    // 📦 ส่งโครงสร้างข้อมูลทั้งหมดไปชุบชีวิตในร่างความเร็วแสงฝั่งหน้าบ้าน
    <ProductDetailClient 
      groupProducts={groupProducts}
      currentGroupId={currentGroupId}
      initialSku={currentSku}
    />
  )
}