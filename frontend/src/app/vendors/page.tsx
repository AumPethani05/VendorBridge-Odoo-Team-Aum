"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Plus, ListFilter, Eye, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VendorsPage() {
  const [vendors, setVendors] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/procurement/vendors`, {
          params: { search, status: activeFilter }
        });
        setVendors(response.data);
      } catch (error) {
        console.error("Failed to fetch vendors", error);
        setVendors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, [search, activeFilter]);

  // Robustly handle cases where vendors might not be an array
  const safeVendors = Array.isArray(vendors) ? vendors : [];

  const filters = [
    { label: "All", count: safeVendors.length, id: "all" },
    { label: "Active", count: safeVendors.filter(v => (v as any).status === 'active').length, id: "active" },
    { label: "Pending", count: safeVendors.filter(v => (v as any).status === 'pending').length, id: "pending" },
    { label: "Blocked", count: safeVendors.filter(v => (v as any).status === 'blocked').length, id: "blocked" },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center text-slate-900">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage supplier profiles and registrations</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0e3a6e] text-white rounded-xl text-sm font-bold hover:bg-[#0b2d55] transition-colors shadow-lg shadow-blue-900/10">
          <Plus className="w-4 h-4" /> Add Vendor
        </button>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Search by name, GST number, category..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium placeholder:text-slate-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-bold transition-all border",
              activeFilter === filter.id 
                ? "bg-[#0e3a6e] text-white border-[#0e3a6e]" 
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Vendor Name</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">GST no.</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact no.</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
               <tr>
                 <td colSpan={6} className="px-6 py-10 text-center text-slate-400 font-medium">
                    Loading vendors list...
                 </td>
               </tr>
            ) : safeVendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                      {vendor.name?.[0] || 'V'}
                    </div>
                    <span className="font-bold text-slate-900">{vendor.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-slate-600">{vendor.category}</td>
                <td className="px-6 py-5 text-sm font-medium text-slate-500 font-mono">{vendor.gst_no}</td>
                <td className="px-6 py-5 text-sm font-medium text-slate-600">{vendor.phone}</td>
                <td className="px-6 py-5">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide",
                    vendor.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                    vendor.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                  )}>
                    {vendor.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="px-4 py-2 bg-[#0e3a6e] text-white rounded-lg text-xs font-bold hover:bg-[#0b2d55] transition-all transform group-hover:scale-105 shadow-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {!loading && safeVendors.length === 0 && (
              <tr>
                 <td colSpan={6} className="px-6 py-10 text-center text-slate-400 font-medium">
                    No vendors found matching your criteria.
                 </td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
