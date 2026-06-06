"use client";

import { useEffect, useState } from "react";
import { Search, ShoppingCart, Plus, ListFilter, Eye, MoreVertical, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const poData = [
  { id: 1, po_number: "PO-2025-0068", vendor: "Infra Supplies Pvt Ltd", amount: "2,00,010", status: "confirmed", date: "21 May 2025" },
  { id: 2, po_number: "PO-2025-0064", vendor: "Tech Core LTD", amount: "1,45,000", status: "draft", date: "15 May 2025" },
  { id: 3, po_number: "PO-2025-0062", vendor: "Office Need Co.", amount: "3,20,000", status: "shipped", date: "10 May 2025" },
  { id: 4, po_number: "PO-2025-0059", vendor: "Global Solutions Inc.", amount: "89,000", status: "confirmed", date: "05 May 2025" },
];

export default function POPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center text-slate-900">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-slate-500 text-sm font-medium">Manage and track inventory procurement orders</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#2563eb] text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
          <Plus className="w-4 h-4" /> Create PO
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by PO number or vendor..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium placeholder:text-slate-400 shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm">
          <ListFilter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr className="border-b border-slate-100">
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">PO Number</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Vendor</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Total Amount</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {poData.map((po) => (
              <tr key={po.id} className="hover:bg-slate-50/30 transition-all group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-bold text-slate-900">{po.po_number}</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-bold text-slate-700">{po.vendor}</td>
                <td className="px-8 py-6 text-sm font-medium text-slate-400">{po.date}</td>
                <td className="px-8 py-6 font-black text-slate-900">₹ {po.amount}</td>
                <td className="px-8 py-6">
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                    po.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                    po.status === 'draft' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  )}>
                    {po.status === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {po.status}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => window.location.href = '/invoices'}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all shadow-lg shadow-slate-200"
                      >
                         View Details
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                         <MoreVertical className="w-4 h-4" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
