"use client";

import { CheckCircle2, Clock, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineSteps = [
  { label: "Submitted", status: "complete" },
  { label: "L1 Review", status: "complete" },
  { label: "L2 Approval", status: "current" },
  { label: "Generate PO", status: "upcoming" },
];

const approvalChain = [
  { name: "Rahul Mehta", role: "Procurement Head", status: "approved", date: "May 20, 10:32 Am" },
  { name: "Priya Shah", role: "Finance Manager", status: "pending", date: "Awaiting Assigned May 21" },
];

export default function ApprovalPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 pb-20 animate-in slide-in-from-top-4 duration-700">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Approval Workflow</h1>
        <p className="text-slate-500 font-medium">RFQ: office furniture q2 - Vendor: Infra Supplies - 185,400</p>
      </div>

      {/* Visual Timeline */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 mx-20 rounded-full">
            <div className="h-full bg-blue-600 transition-all duration-1000 w-[66%]" />
        </div>
        
        {timelineSteps.map((step, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center gap-3">
             <div className={cn(
               "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-all duration-500",
               step.status === 'complete' ? "bg-blue-100 text-blue-600 border-2 border-blue-600" :
               step.status === 'current' ? "bg-blue-600 text-white ring-8 ring-blue-50" : "bg-white text-slate-400 border-2 border-slate-200"
             )}>
               {step.status === 'complete' ? "✓" : i + 1}
             </div>
             <span className={cn(
               "text-sm font-bold",
               step.status === 'upcoming' ? "text-slate-400" : "text-slate-900"
             )}>{step.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Approval Chain */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm space-y-8">
              <h2 className="text-xl font-bold text-slate-900">Approval Chain</h2>
              
              <div className="space-y-10 relative">
                <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-100" />
                
                {approvalChain.map((step, i) => (
                  <div key={i} className="flex justify-between items-start relative z-10">
                    <div className="flex gap-4">
                       <div className={cn(
                         "w-10 h-10 rounded-full flex items-center justify-center shadow-sm border-4 border-white",
                         step.status === 'approved' ? "bg-slate-100 text-slate-900" : "bg-slate-100 text-slate-400"
                       )}>
                         {step.status === 'approved' ? <Check className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                       </div>
                       <div>
                         <p className="font-bold text-slate-900 text-lg">{step.name}</p>
                         <p className="text-slate-500 font-medium">{step.role}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className={cn(
                         "text-sm font-bold",
                         step.status === 'approved' ? "text-emerald-600" : "text-slate-400"
                       )}>
                         {step.status === 'approved' ? "Approved on" : "Awaiting Assigned"}
                       </p>
                       <p className="text-xs font-medium text-slate-400 mt-1">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-slate-900">Approval Remarks</h3>
                <textarea 
                   rows={6}
                   placeholder="Add your comments or conditions..."
                   className="w-full bg-slate-50/50 border border-slate-100 rounded-3xl p-6 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                />
              </div>
           </div>
        </div>

        {/* Right: Quotation Summary Card */}
        <div className="space-y-8">
           <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm space-y-6 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-1000" />
              
              <h3 className="font-bold text-xl text-slate-900 leading-tight">Quotations Summary</h3>
              
              <div className="space-y-4 pt-2">
                 <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-semibold text-slate-500">Vendor</span>
                    <span className="text-sm font-bold text-slate-900">Infra Supplies PVT LTD</span>
                 </div>
                 <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform delay-75">
                    <span className="text-sm font-semibold text-slate-500">Total</span>
                    <span className="text-sm font-bold text-slate-900">1,85,400</span>
                 </div>
                 <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform delay-100">
                    <span className="text-sm font-semibold text-slate-500">Delivery</span>
                    <span className="text-sm font-bold text-slate-900">10 days</span>
                 </div>
                 <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform delay-150">
                    <span className="text-sm font-semibold text-slate-500">Rating</span>
                    <span className="text-sm font-bold text-slate-900">4.5/5</span>
                 </div>
              </div>
           </div>

           <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center">
                 Approve
              </button>
              <button className="px-10 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all">
                 Reject
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
