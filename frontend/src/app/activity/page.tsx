"use client";

import { CheckCircle2, Clock, FileText, UserPlus, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
  { id: 1, action: "Quotation selected", details: "Infra supplies pvt ltd selected for office furniture Q2", date: "23 May 2025, 9:15 PM", status: "success", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: 2, action: "Approval pending", details: "PO-2024 awaiting L2 approval by priya shah", date: "22 May 2025, 09:15 AM", status: "pending", icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 3, action: "RFQ published", details: "office furniture Q2 sent to 3 vendors", date: "19 May 2025", status: "info", icon: FileText, color: "text-slate-500", bg: "bg-slate-50" },
  { id: 4, action: "Vendor added", details: "FastLog transport registered and pending verifications", date: "18 May 2025, 3:20 PM", status: "info", icon: UserPlus, color: "text-indigo-500", bg: "bg-indigo-50" },
];

const filters = ["All", "RFQ", "Approvals", "Invoices", "Vendors"];

export default function ActivityPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Activity & Logs</h1>
          <p className="text-slate-500 font-medium">Procurement audit trail</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-500 rounded-xl border border-slate-100 text-xs font-bold">
           <Lock className="w-3.5 h-3.5" /> Immutable Log
        </div>
      </div>

      <div className="flex gap-3">
        {filters.map((f, i) => (
          <button 
            key={f}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-bold border transition-all",
              i === 0 ? "bg-blue-100 text-blue-600 border-blue-200" : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="relative space-y-0">
         <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-100" />
         
         {logs.map((log) => (
           <div key={log.id} className="relative flex gap-6 p-6 hover:bg-slate-50/50 rounded-3xl transition-colors group">
              <div className={cn(
                "relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-sm border-4 border-white transition-transform group-hover:scale-110",
                log.bg,
                log.color
              )}>
                 <log.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                 <h3 className="font-bold text-slate-900 text-lg">{log.action}</h3>
                 <p className="text-slate-500 font-medium">{log.details}</p>
                 <p className="text-xs font-bold text-slate-300 mt-2 uppercase tracking-wide">{log.date}</p>
              </div>
              <div className="w-full border-b border-slate-50 absolute bottom-0 left-24 right-6 group-last:hidden" />
           </div>
         ))}
      </div>
    </div>
  );
}
