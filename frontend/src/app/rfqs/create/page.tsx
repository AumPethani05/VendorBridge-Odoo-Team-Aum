"use client";

import { useState } from "react";
import { Plus, X, Calendar, Edit2, ChevronRight, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreateRFQPage() {
  const [step, setStep] = useState(1);
  const [lineItems, setLineItems] = useState([
    { id: 1, item: "Ergonomic chair", qty: 25, unit: "NOS" },
    { id: 2, item: "Standing desks", qty: 10, unit: "NOS" },
  ]);
  const [assignedVendors, setAssignedVendors] = useState([
    "Infra Supplies Pvt Ltd",
    "Techcore LTD"
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), item: "", qty: 1, unit: "NOS" }]);
  };

  const removeLineItem = (id: number) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex justify-between items-center bg-white/50 p-6 rounded-3xl backdrop-blur-sm border border-white">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create RFQ's</h1>
          <p className="text-slate-500 font-medium">new request for quotation</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">VendorBridge</span>
            <div className="w-8 h-8 rounded-full bg-slate-200" />
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-center max-w-3xl mx-auto py-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
              step === s ? "bg-blue-600 text-white shadow-lg shadow-blue-200 ring-4 ring-blue-50" : 
              step > s ? "bg-emerald-500 text-white" : "bg-white border-2 border-slate-200 text-slate-400"
            )}>
              {step > s ? "✓" : s}
            </div>
            <span className={cn(
              "ml-3 font-bold text-sm whitespace-nowrap",
              step === s ? "text-slate-900" : "text-slate-400"
            )}>
              {s === 1 ? "RFQ Details" : s === 2 ? "Vendors" : "Review & Send"}
            </span>
            {s < 3 && <div className="mx-8 flex-1 h-0.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={cn("h-full bg-blue-600 transition-all duration-500", step > s ? "w-full" : "w-0")} />
            </div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Details */}
        <div className="space-y-8 animate-in slide-in-from-left duration-500">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">RFQ's title<span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                defaultValue="Office Furniture procurement Q2"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Category</label>
              <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium appearance-none">
                <option>Furniture</option>
                <option>IT</option>
                <option>Stationary</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Deadline<span className="text-rose-500">*</span></label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  defaultValue="15 June 2025"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Description</label>
              <textarea 
                rows={4}
                defaultValue="Ergonomic chairs and standing desks for 3rd floor"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Line Items & Vendors */}
        <div className="space-y-10 animate-in slide-in-from-right duration-500">
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700">Line items</label>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
               <div className="grid grid-cols-12 gap-2 bg-slate-50/50 p-4 border-b border-slate-100">
                 <div className="col-span-7 text-xs font-bold text-slate-400">item</div>
                 <div className="col-span-2 text-xs font-bold text-slate-400">qty</div>
                 <div className="col-span-2 text-xs font-bold text-slate-400">Unit</div>
                 <div className="col-span-1"></div>
               </div>
               <div className="divide-y divide-slate-50">
                 {lineItems.map((li) => (
                   <div key={li.id} className="grid grid-cols-12 gap-3 p-4 items-center group">
                      <div className="col-span-7 flex items-center gap-2">
                         <div className="w-1 h-3 rounded-full bg-slate-200 group-hover:bg-blue-400 transition-colors" />
                         <input type="text" defaultValue={li.item} className="w-full bg-transparent border-0 focus:ring-0 p-0 text-sm font-bold text-slate-700" />
                      </div>
                      <div className="col-span-2">
                        <input type="number" defaultValue={li.qty} className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold text-slate-700" />
                      </div>
                      <div className="col-span-2">
                        <input type="text" defaultValue={li.unit} className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold text-slate-400 uppercase" />
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button onClick={() => removeLineItem(li.id)} className="p-1 hover:bg-rose-50 hover:text-rose-500 text-slate-300 rounded transition-colors">
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                   </div>
                 ))}
               </div>
               <button onClick={addLineItem} className="w-full p-4 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                 <Plus className="w-4 h-4" /> Add line item
               </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">ASSIGN VENDORS</label>
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm min-h-[100px]">
              <div className="flex flex-wrap gap-2">
                {assignedVendors.map((v) => (
                  <div key={v} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg group animate-in zoom-in duration-200">
                    <span className="text-xs font-bold text-slate-700">{v}</span>
                    <button className="text-slate-400 hover:text-rose-500">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                  <Plus className="w-3 h-3" /> add vendor
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700">Attachments</label>
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 bg-slate-50/30 hover:bg-slate-50 hover:border-blue-300 transition-all group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-900 leading-tight">Attachments</p>
                <p className="text-xs text-slate-400 font-medium">Drag & drop files or click to upload</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-8">
        <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
          Save & Send to Vendors
        </button>
        <button className="px-10 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
          Save as Draft
        </button>
      </div>
    </div>
  );
}
