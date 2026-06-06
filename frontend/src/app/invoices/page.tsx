"use client";

import { Download, Printer, Mail, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InvoicesPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in slide-in-from-top-4 duration-700 pb-20">
      <div className="flex justify-between items-center bg-white/50 p-6 rounded-3xl backdrop-blur-sm border border-white">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Purchase Order & Invoice</h1>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all shadow-sm">
             <Download className="w-3.5 h-3.5" /> Download PDF
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
             <Printer className="w-3.5 h-3.5" /> Print
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all shadow-sm">
             <Mail className="w-3.5 h-3.5" /> Email Invoice
           </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">PO-2025-0068 <span className="text-slate-400 font-medium text-sm">(Auto-generated after approval)</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm">
           <div className="p-8 border-r border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-900">Bill to</h3>
              <div className="text-slate-500 font-medium space-y-1 leading-relaxed">
                 <p className="text-slate-900 font-bold text-lg">Your Organization Name</p>
                 <p>123 business park</p>
                 <p>ahmedabad</p>
                 <p className="pt-2 uppercase tracking-wider text-xs font-bold">GSTIN: 25383438AFB</p>
              </div>
           </div>
           <div className="p-8 space-y-4">
              <h3 className="font-bold text-slate-900">Vendor</h3>
              <div className="text-slate-500 font-medium space-y-1 leading-relaxed">
                 <p className="text-slate-900 font-bold text-lg">Infra supplies pvt ltd</p>
                 <p>456, industrial estate</p>
                 <p>surat</p>
                 <p className="pt-2 uppercase tracking-wider text-xs font-bold">GSTIN: 343434DB4523</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 py-4 px-2">
         <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">PO Number:</p>
            <p className="text-slate-500 font-medium">PO-2025-0068</p>
         </div>
         <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">Invoice date:</p>
            <p className="text-slate-500 font-medium">22 May 2025</p>
         </div>
         <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">PO date:</p>
            <p className="text-slate-500 font-medium">21 May 2025</p>
         </div>
         <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">Due date:</p>
            <p className="text-slate-500 font-medium">21 June 2025</p>
         </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden p-2">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
               <th className="px-8 py-5">Item</th>
               <th className="px-8 py-5 text-center">Qty</th>
               <th className="px-8 py-5 text-right">Unit price</th>
               <th className="px-8 py-5 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
             <tr className="group">
               <td className="px-8 py-6 font-bold text-slate-900">Ergonomic chair</td>
               <td className="px-8 py-6 text-center font-bold">25</td>
               <td className="px-8 py-6 text-right font-bold">3500</td>
               <td className="px-8 py-6 text-right font-bold underline decoration-slate-100 decoration-4 underline-offset-4">87,500</td>
             </tr>
             <tr className="group">
               <td className="px-8 py-6 font-bold text-slate-900">Tech Core LTD</td>
               <td className="px-8 py-6 text-center font-bold">10</td>
               <td className="px-8 py-6 text-right font-bold">8,200</td>
               <td className="px-8 py-6 text-right font-bold underline decoration-slate-100 decoration-4 underline-offset-4">82,000</td>
             </tr>
          </tbody>
        </table>

        <div className="p-10 bg-slate-50/30 flex justify-end">
           <div className="w-full max-w-xs space-y-4">
              <div className="flex justify-between items-center text-slate-500">
                 <span className="font-semibold text-sm">Subtotal</span>
                 <span className="font-bold text-slate-900">1,69,500</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                 <span className="font-semibold text-sm">CGST (9%)</span>
                 <span className="font-bold text-slate-900">15,255</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                 <span className="font-semibold text-sm">SGST (9%)</span>
                 <span className="font-bold text-slate-900">15,255</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                 <span className="font-bold text-slate-900 uppercase tracking-widest text-sm">Grand Total</span>
                 <span className="text-2xl font-black text-slate-900 underline decoration-blue-500 decoration-4 underline-offset-8">2,00,010</span>
              </div>
           </div>
        </div>

        <div className="p-6 bg-white border-t border-slate-50 flex justify-between items-center px-10">
           <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-xs font-bold">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Pending Payment
           </div>
           <button className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
              Mark as Paid
           </button>
        </div>
      </div>
    </div>
  );
}
