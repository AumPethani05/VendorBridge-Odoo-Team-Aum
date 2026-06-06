"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Vendor = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  category?: string | null;
  gst_no?: string | null;
  status: string;
  address?: string | null;
};

type VendorFormData = {
  name: string;
  email: string;
  phone: string;
  category: string;
  gst_no: string;
  status: string;
  address: string;
};

const initialVendorForm: VendorFormData = {
  name: "",
  email: "",
  phone: "",
  category: "",
  gst_no: "",
  status: "active",
  address: "",
};

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<VendorFormData>(initialVendorForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const safeVendors = Array.isArray(vendors) ? vendors : [];

  const filters = [
    { label: "All", count: safeVendors.length, id: "all" },
    { label: "Active", count: safeVendors.filter(v => v.status === 'active').length, id: "active" },
    { label: "Pending", count: safeVendors.filter(v => v.status === 'pending').length, id: "pending" },
    { label: "Blocked", count: safeVendors.filter(v => v.status === 'blocked').length, id: "blocked" },
  ];

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (formError) setFormError(null);
  };

  const handleCreateVendor = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError("Vendor name and email are required.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await axios.post<Vendor>("http://localhost:3001/api/procurement/vendors", formData);
      setVendors((current) => [response.data, ...current]);
      setFormData(initialVendorForm);
      setIsFormOpen(false);
      setActiveFilter("all");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data?.error || "Failed to create vendor.");
      } else {
        setFormError("Failed to create vendor.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center text-slate-900">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage supplier profiles and registrations</p>
        </div>
        <button
          type="button"
          onClick={() => setIsFormOpen((current) => !current)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0e3a6e] text-white rounded-xl text-sm font-bold hover:bg-[#0b2d55] transition-colors shadow-lg shadow-blue-900/10"
        >
          {isFormOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isFormOpen ? "Close" : "Add Vendor"}
        </button>
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleCreateVendor}
          className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">New Vendor</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Add supplier details to the vendor list</p>
            </div>
            <select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          {formError && (
            <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm font-bold text-red-600">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Vendor name"
              className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Email address"
              className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              placeholder="Contact number"
              className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <input
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              placeholder="Category"
              className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <input
              name="gst_no"
              value={formData.gst_no}
              onChange={handleFormChange}
              placeholder="GST number"
              className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              placeholder="Address"
              className="min-h-11 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y md:col-span-2"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsFormOpen(false);
                setFormError(null);
              }}
              className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 bg-[#0e3a6e] text-white rounded-xl text-sm font-bold hover:bg-[#0b2d55] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "Saving..." : "Save Vendor"}
            </button>
          </div>
        </form>
      )}

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
