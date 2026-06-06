"use client";

import { Star, CheckCircle, Search, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisonData = [
  { 
    vendor: "Infra Supplies (Lowest)", 
    total: "185000", 
    gst: "18", 
    delivery: "10", 
    rating: 4.5, 
    terms: "30 days",
    isBest: true
  },
  { 
    vendor: "TechCore LTD", 
    total: "200010", 
    gst: "18", 
    delivery: "14", 
    rating: 4.2, 
    terms: "30 days",
    isBest: false
  },
  { 
    vendor: "Office Need Co.", 
    total: "214800", 
    gst: "18", 
    delivery: "7", 
    rating: 3.8, 
    terms: "15 days",
    isBest: false
  },
];

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Top Header Section */}
      <div className="bg-white border-b border-slate-100 flex items-center justify-between px-8 py-3">
        <div className="relative w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Global Search"
            className="w-full pl-12 pr-4 py-2 bg-slate-50 border-0 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-5">
           <button className="p-2 text-slate-400 hover:text-slate-600 relative">
             <Bell className="w-5 h-5" />
             <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
           </button>
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-400" />
             </div>
           </div>
        </div>
      </div>

      <div className="p-8 space-y-8 animate-in zoom-in-95 duration-500">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Dashboard</span>
            <span className="text-slate-300">/</span>
            <span>Quotations</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600">Comparison Analysis</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-2">Quotation Comparison Analysis</h1>
          <p className="text-slate-500 font-medium">RFQ: office furniture procurement q2 - 3 quotations received</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden p-6">
           <div className="grid grid-cols-4 gap-0 rounded-2xl overflow-hidden border border-slate-100">
              {/* Criteria Column */}
              <div className="col-span-1 bg-slate-50 flex flex-col pt-24 divide-y divide-slate-100 font-bold text-slate-700">
                 <div className="px-6 py-8 h-24 flex items-center">Criteria</div>
                 <div className="px-6 py-8 h-24 flex items-center">Grand Total</div>
                 <div className="px-6 py-8 h-24 flex items-center">GST %</div>
                 <div className="px-6 py-8 h-24 flex items-center">Delivery (days)</div>
                 <div className="px-6 py-8 h-24 flex items-center">Vendor rating</div>
                 <div className="px-6 py-8 h-24 flex items-center">Payment terms</div>
                 <div className="px-6 py-8 h-24 flex items-center"></div>
              </div>

              {/* Vendor Columns */}
              {comparisonData.map((data, i) => (
                <div key={i} className={cn(
                  "col-span-1 flex flex-col pt-8 divide-y divide-slate-100 transition-all duration-500",
                  data.isBest ? "ring-2 ring-emerald-500/20 bg-emerald-50/20 scale-[1.02] z-10 shadow-xl" : "bg-white"
                )}>
                  <div className="px-6 py-4 h-24 flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                       <span className={cn("text-base font-bold", data.isBest ? "text-emerald-700" : "text-slate-900")}>
                         {data.vendor}
                       </span>
                       {data.isBest && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                    </div>
                  </div>
                  
                  <div className="px-6 py-8 h-24 flex items-center text-lg font-bold text-slate-900">
                    {data.total}
                  </div>
                  
                  <div className="px-6 py-8 h-24 flex items-center text-base font-medium text-slate-600">
                    {data.gst}
                  </div>
                  
                  <div className="px-6 py-8 h-24 flex items-center text-base font-medium text-slate-600">
                    {data.delivery}
                  </div>

                  <div className="px-6 py-8 h-24 flex flex-col justify-center gap-1">
                    <span className="text-base font-bold text-slate-900">{data.rating}/5</span>
                    <div className="flex gap-0.5">
                       {[1, 2, 3, 4, 5].map((star) => (
                         <Star 
                           key={star} 
                           className={cn(
                             "w-4 h-4 fill-amber-400 text-amber-400",
                             star > Math.floor(data.rating) && "fill-slate-100 text-slate-200"
                           )} 
                         />
                       ))}
                    </div>
                  </div>

                  <div className="px-6 py-8 h-24 flex items-center text-base font-medium text-slate-600">
                    {data.terms}
                  </div>

                  <div className="px-6 py-8 h-24 flex items-center justify-center">
                    <button className={cn(
                      "w-full py-3 rounded-xl font-bold text-sm transition-all",
                      data.isBest 
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200" 
                        : "bg-white border border-slate-200 text-slate-400 hover:bg-slate-50"
                    )}>
                      {data.isBest ? "✓ Select & Approve" : "Select"}
                    </button>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
