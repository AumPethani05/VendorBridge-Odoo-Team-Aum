"use client";

import { Download, Printer, Mail, CheckCircle2 } from "lucide-react";

export default function InvoicesPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in slide-in-from-top-4 duration-700 pb-20">
      <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-white/80 p-6 rounded-[32px] border border-slate-200 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Invoice overview</p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight">Purchase Order & Invoice</h1>
          <p className="mt-2 text-sm text-slate-500">Review invoice details, download or email the document, and track payment status with ease.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">
            <Mail className="w-4 h-4" /> Email Invoice
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6 bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Invoice ID</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">PO-2025-0068</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4" /> Approved
            </div>
          </div>

          <p className="text-sm text-slate-500">Auto-generated after approval. This invoice is ready for download, printing, or emailing to your vendor.</p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Bill to</p>
              <p className="mt-4 text-lg font-bold text-slate-900">Your Organization Name</p>
              <p className="mt-2 text-sm text-slate-600">123 Business Park</p>
              <p className="text-sm text-slate-600">Ahmedabad</p>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500">GSTIN: 25383438AFB</p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Vendor</p>
              <p className="mt-4 text-lg font-bold text-slate-900">Infra Supplies Pvt Ltd</p>
              <p className="mt-2 text-sm text-slate-600">456 Industrial Estate</p>
              <p className="text-sm text-slate-600">Surat</p>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500">GSTIN: 343434DB4523</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Invoice date</p>
                <p className="text-sm font-medium text-slate-700">22 May 2025</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">PO date</p>
                <p className="text-sm font-medium text-slate-700">21 May 2025</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Due date</p>
                <p className="text-sm font-medium text-slate-700">21 June 2025</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Status</p>
                <p className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">Pending Payment</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Notes</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Please process payment within 30 days. Contact finance@yourorg.com if there are any discrepancies.</p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.24em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4 text-center">Qty</th>
                <th className="px-6 py-4 text-right">Unit price</th>
                <th className="px-6 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="bg-white hover:bg-slate-50">
                <td className="px-6 py-5 font-semibold text-slate-900">Ergonomic chair</td>
                <td className="px-6 py-5 text-center font-semibold">25</td>
                <td className="px-6 py-5 text-right font-semibold">₹3,500</td>
                <td className="px-6 py-5 text-right font-semibold">₹87,500</td>
              </tr>
              <tr className="bg-white hover:bg-slate-50">
                <td className="px-6 py-5 font-semibold text-slate-900">Tech Core LTD</td>
                <td className="px-6 py-5 text-center font-semibold">10</td>
                <td className="px-6 py-5 text-right font-semibold">₹8,200</td>
                <td className="px-6 py-5 text-right font-semibold">₹82,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Summary</p>
              <p className="text-sm text-slate-600">All totals include applicable taxes and shipping fees.</p>
            </div>
            <div className="w-full max-w-xs space-y-3 rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">₹1,69,500</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>CGST (9%)</span>
                <span className="font-semibold text-slate-900">₹15,255</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>SGST (9%)</span>
                <span className="font-semibold text-slate-900">₹15,255</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between text-base font-bold text-slate-900">
                <span>Total</span>
                <span>₹2,00,010</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
            Pending Payment
          </div>
          <button className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Mark as Paid
          </button>
        </div>
      </section>
    </div>
  );
}
