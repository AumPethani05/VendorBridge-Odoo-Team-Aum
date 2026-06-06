"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Quote, 
  CheckCircle, 
  ShoppingCart, 
  Receipt, 
  BarChart3, 
  Activity,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Vendors", href: "/vendors" },
  { icon: FileText, label: "RFQs", href: "/rfqs" },
  { icon: Quote, label: "Quotations", href: "/quotations" },
  { icon: CheckCircle, label: "Approvals", href: "/approvals" },
  { icon: ShoppingCart, label: "Purchase Orders", href: "/purchase-orders" },
  { icon: Receipt, label: "Invoices", href: "/invoices" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Activity, label: "Activity", href: "/activity" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-[#0e1b2e] border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/50">
          V
        </div>
        <span className="font-bold text-xl text-white tracking-tight">VendorBridge</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1.5">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-[#2563eb] text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-300",
                isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"
              )} />
              <span className="font-bold text-[15px] tracking-wide">{item.label}</span>
              {item.label === "RFQs" && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800/50">
        <div className="bg-slate-800/40 rounded-2xl p-4 flex items-center gap-3 border border-slate-700/30">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-lg">
            PO
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate leading-tight">Aum Pethani</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Procurement Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
