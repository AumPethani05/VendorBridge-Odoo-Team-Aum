"use client";

import { useEffect, useState } from "react";
import { Edit2, Save, FileText, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SubmitQuotationPage() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState([
    { id: 1, item: "Ergonomic chair", qty: 25, unitPrice: 3500 },
    { id: 2, item: "Tech Core LTD", qty: 10, unitPrice: 8200 }, // Matching mockup text exactly
  ]);
  const [taxPercent, setTaxPercent] = useState(18);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = items.reduce((acc, curr) => acc + (curr.qty * curr.unitPrice), 0);
  const taxAmount = (subtotal * taxPercent) / 100;
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Submit Quotation</h1>
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <span>RFQ: Office furniture procurement q2</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span>deadline <span className="text-rose-500">15 June 2025</span></span>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
          <FileText className="w-5 h-5 text-slate-400" />
        </div>
        <p className="text-sm font-bold text-slate-700">
          RFQ Summary: <span className="font-medium text-slate-500">Ergonomic chair * 25, standing desk * 10 - category furniture</span>
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Your Quotation</h2>
        
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-5">Item</th>
                <th className="px-6 py-5 text-center">Qty</th>
                <th className="px-6 py-5">Unit price</th>
                <th className="px-6 py-5">Total</th>
                <th className="px-6 py-5 text-right">Delivery (days)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
              {items.map((item) => (
                <tr key={item.id} className="group">
                  <td className="px-6 py-6 font-bold text-slate-900">{item.item}</td>
                  <td className="px-6 py-6 text-center">{item.qty}</td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2 w-32 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all">
                      <input type="number" defaultValue={item.unitPrice} className="w-full bg-transparent border-0 p-0 text-sm font-bold text-slate-700 focus:ring-0" />
                      <Edit2 className="w-3 h-3 text-slate-300" />
                    </div>
                  </td>
                  <td className="px-6 py-6 font-bold text-slate-900">{(item.qty * item.unitPrice).toLocaleString()}</td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2 w-24 ml-auto focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all">
                      <input type="number" defaultValue={item.id === 1 ? 7 : 14} className="w-full bg-transparent border-0 p-0 text-sm font-bold text-slate-700 focus:ring-0 text-right" />
                      <Edit2 className="w-3 h-3 text-slate-300" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
           <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">tax / GST %</label>
              <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 w-32">
                <input type="number" step="0.1" value={taxPercent} onChange={(e) => setTaxPercent(Number(e.target.value))} className="w-full bg-transparent border-0 p-0 text-sm font-bold text-slate-700 focus:ring-0" />
                <Edit2 className="w-4 h-4 text-slate-300" />
              </div>
           </div>

           <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Note / terms</label>
              <textarea 
                rows={5}
                defaultValue="Payment terms: 20 days net..."
                className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-sm text-slate-600 resize-none"
              />
           </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[32px] p-10 shadow-sm space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
          
          <div className="flex justify-between items-center text-slate-500">
             <span className="text-sm font-semibold">Subtotal</span>
             <span className="text-lg font-bold text-slate-900">{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-slate-500">
             <span className="text-sm font-semibold">GST ({taxPercent}%)</span>
             <span className="text-lg font-bold text-slate-900">{taxAmount.toLocaleString()}</span>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
             <span className="text-base font-bold text-slate-900 uppercase tracking-wider">Grand total</span>
             <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
               {grandTotal.toLocaleString()}
             </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-10">
        <button className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3">
          <Save className="w-5 h-5" /> Submit Quotation
        </button>
        <button 
          onClick={() => window.location.href = '/quotations/compare'}
          className="flex-1 bg-white border border-blue-200 text-blue-600 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-sm flex items-center justify-center gap-3"
        >
          <BarChart3 className="w-5 h-5" /> View Comparison
        </button>
        <button className="px-12 py-5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
          Save Draft
        </button>
      </div>
    </div>
  );
}
