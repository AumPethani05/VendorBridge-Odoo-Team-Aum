"use client";

import { useEffect, useState } from "react";
import { Calendar, Download, TrendingUp, Users, CheckCircle, AlertCircle } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from "@/lib/utils";

const trendData = [
  { month: 'Dec', value: 120000 },
  { month: 'Jan', value: 150000 },
  { month: 'Feb', value: 180000 },
  { month: 'Mar', value: 250000 },
  { month: 'Apr', value: 320000 },
  { month: 'May', value: 450000 },
];

const categorySpend = [
  { name: "IT Hardware", value: "₹4.8L", percentage: 80 },
  { name: "Furniture", value: "₹3.2L", percentage: 60 },
  { name: "Stationery", value: "₹2.1L", percentage: 35 },
  { name: "Logistics", value: "₹2.3L", percentage: 40 },
];

const kpis = [
  { label: "Total Spend", value: "12.4 L", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Vendors", value: "28", icon: Users, color: "text-slate-600", bg: "bg-slate-50" },
  { label: "PO Fulfillment", value: "94%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Overdue Invoices", value: "3", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
];

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reports & analytics</h1>
          <p className="text-slate-500 font-medium">Procurement Insights - May 2025</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold shadow-sm hover:bg-slate-50 transition-all">
             <Calendar className="w-4 h-4" /> May 2025
           </button>
           <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
             <Download className="w-4 h-4" /> Export
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-all cursor-pointer">
             <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-12", kpi.bg, kpi.color)}>
                <kpi.icon className="w-7 h-7" />
             </div>
             <p className="text-4xl font-black text-slate-900 tracking-tight">{kpi.value}</p>
             <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Spend by Category */}
        <div className="lg:col-span-3 bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
           <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">SPEND BY CATEGORY</h3>
           <div className="space-y-8">
              {categorySpend.map((cat) => (
                <div key={cat.name} className="space-y-3 group">
                   <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-slate-900">{cat.name}</span>
                      <div className="flex items-center gap-2">
                         <span className="text-slate-700 font-black">{cat.value}</span>
                         <span className="text-slate-400 font-medium">{cat.percentage}%</span>
                      </div>
                   </div>
                   <div className="h-4 w-full bg-slate-50 border border-slate-100 rounded-full overflow-hidden p-0.5">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-1000 origin-left"
                        style={{ width: `${cat.percentage}%` }}
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right: Charts & Tables */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">TOP VENDORS BY SPEND</h3>
              <table className="w-full">
                 <thead>
                    <tr className="text-left border-b border-slate-50">
                       <th className="pb-4 text-xs font-bold text-slate-400">Vendor</th>
                       <th className="pb-4 text-xs font-bold text-slate-400 text-right">Spend (₹)</th>
                       <th className="pb-4 text-xs font-bold text-slate-400 text-right">POs</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {[
                      { name: "TechCore Ltd", spend: "4,20,000", po: 6 },
                      { name: "Infra Supplies", spend: "3,10,000", po: 4 },
                      { name: "FastLog", spend: "1,90,000", po: 3 },
                    ].map((v) => (
                      <tr key={v.name} className="group hover:bg-slate-50 transition-colors">
                        <td className="py-4 text-sm font-bold text-slate-700">{v.name}</td>
                        <td className="py-4 text-sm font-black text-slate-900 text-right">{v.spend}</td>
                        <td className="py-4 text-sm font-bold text-slate-500 text-right">{v.po}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">MONTHLY TREND</h3>
              <div className="h-48 w-full">
                 {mounted ? (
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={trendData}>
                       <Bar 
                          dataKey="value" 
                          fill="#2563eb" 
                          radius={[4, 4, 0, 0]} 
                          barSize={20}
                        />
                       <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
                        />
                     </BarChart>
                   </ResponsiveContainer>
                 ) : null}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
