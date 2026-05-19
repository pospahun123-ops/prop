// app/page.tsx
import Link from "next/link"
import { ArrowRight, Image as ImageIcon } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800 font-sans">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
        
        {/* Logo Icon */}
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-200 animate-bounce">
          <ImageIcon className="w-8 h-8" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            PROP MANAGEMENT
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            ยินดีต้อนรับสู่ระบบจัดการและโชว์รูมสินค้าประกอบฉาก
          </p>
        </div>

        <hr className="border-slate-100" />

        {/* Button ลิงก์ไปหน้า /prop */}
        <Link 
          href="/prop"
          className="w-full py-3.5 px-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 group shadow-lg shadow-slate-900/10"
        >
          เปิดดูคลังสินค้าพรอพ
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>
    </div>
  )
}