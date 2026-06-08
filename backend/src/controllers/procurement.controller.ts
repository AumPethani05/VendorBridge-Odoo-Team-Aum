import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const toNumber = (value: unknown, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const logActivity = async (action: string, details: string, entity: string, userId?: number) => {
  try {
    await prisma.activity_logs.create({
      data: {
        action,
        details,
        entity,
        user_id: userId,
      },
    });
  } catch (error) {
    console.error('Activity log failed:', error);
  }
};

export const getVendors = async (req: Request, res: Response) => {
  const { status, search } = req.query;
  try {
    const vendors = await prisma.vendors.findMany({
      where: {
        AND: [
          status && status !== 'all' ? { status: String(status) } : {},
          search ? {
            OR: [
              { name: { contains: String(search), mode: 'insensitive' } },
              { gst_no: { contains: String(search), mode: 'insensitive' } },
              { category: { contains: String(search), mode: 'insensitive' } },
            ]
          } : {}
        ]
      },
      orderBy: { name: 'asc' }
    });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
};

export const createVendor = async (req: Request, res: Response) => {
  const { name, email, phone, category, gst_no, status, address } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Vendor name and email are required' });
  }

  try {
    const vendor = await prisma.vendors.create({
      data: {
        name,
        email,
        phone: phone || null,
        category: category || null,
        gst_no: gst_no || null,
        status: status || 'active',
        address: address || null,
      }
    });

    await logActivity('Vendor added', `${vendor.name} registered as ${vendor.status}`, 'Vendors', req.user?.id);

    return res.status(201).json(vendor);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ error: 'Vendor email already exists' });
    }

    return res.status(500).json({ error: 'Failed to create vendor' });
  }
};

export const getRFQs = async (req: Request, res: Response) => {
  const { search, status } = req.query;

  try {
    const rfqs = await prisma.rfqs.findMany({
      where: {
        AND: [
          status && status !== 'all' ? { status: String(status) } : {},
          search
            ? {
                OR: [
                  { title: { contains: String(search), mode: 'insensitive' } },
                  { category: { contains: String(search), mode: 'insensitive' } },
                ],
              }
            : {},
        ],
      },
      include: {
        vendor: true,
        line_items: true,
        quotations: true,
      },
      orderBy: { created_at: 'desc' },
    });

    res.json(rfqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RFQs' });
  }
};

export const createRFQ = async (req: Request, res: Response) => {
  const { title, description, category, deadline, status, vendor_id, line_items } = req.body;

  if (!title || !vendor_id || !Array.isArray(line_items) || line_items.length === 0) {
    return res.status(400).json({ error: 'RFQ title, vendor and at least one line item are required' });
  }

  try {
    const rfq = await prisma.rfqs.create({
      data: {
        title,
        description: description || null,
        category: category || null,
        deadline: deadline ? new Date(deadline) : null,
        status: status || 'sent',
        vendor_id: Number(vendor_id),
        line_items: {
          create: line_items.map((item: any) => ({
            item_name: item.item_name || item.item || 'Untitled item',
            quantity: toNumber(item.quantity || item.qty, 1),
            unit: item.unit || 'NOS',
          })),
        },
        approvals: {
          create: [
            { approver: 'Procurement Head', role: 'L1 Approval', status: status === 'draft' ? 'pending' : 'approved', approved_at: status === 'draft' ? null : new Date() },
            { approver: 'Finance Manager', role: 'L2 Approval', status: 'pending' },
          ],
        },
      },
      include: {
        vendor: true,
        line_items: true,
        approvals: true,
      },
    });

    await logActivity(
      status === 'draft' ? 'RFQ saved as draft' : 'RFQ published',
      `${rfq.title} ${status === 'draft' ? 'saved' : 'sent'} to ${rfq.vendor.name}`,
      'RFQ',
      req.user?.id
    );

    return res.status(201).json(rfq);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create RFQ' });
  }
};

export const getRFQDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rfq = await prisma.rfqs.findUnique({
      where: { id: Number(id) },
      include: {
        line_items: true,
        vendor: true,
        quotations: {
          include: {
            vendor: true,
            quote_items: true
          }
        },
        approvals: true
      }
    });
    if (!rfq) {
      return res.status(404).json({ error: 'RFQ not found' });
    }

    return res.json(rfq);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch RFQ details' });
  }
};

export const getQuotations = async (req: Request, res: Response) => {
  try {
    const quotations = await prisma.quotations.findMany({
      include: {
        vendor: true,
        rfq: true,
        quote_items: {
          include: { rfq_item: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    res.json(quotations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotations' });
  }
};

export const createQuotation = async (req: Request, res: Response) => {
  const { rfq_id, vendor_id, tax_percent, notes, items } = req.body;

  if (!rfq_id || !vendor_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'RFQ, vendor and quote items are required' });
  }

  const subtotal = items.reduce(
    (sum: number, item: any) => sum + toNumber(item.unit_price) * toNumber(item.quantity, 1),
    0
  );
  const taxPercent = toNumber(tax_percent, 18);
  const grandTotal = subtotal + (subtotal * taxPercent) / 100;

  try {
    const quotation = await prisma.quotations.create({
      data: {
        rfq_id: Number(rfq_id),
        vendor_id: Number(vendor_id),
        subtotal,
        tax_percent: taxPercent,
        grand_total: grandTotal,
        status: 'pending',
        notes: notes || null,
        quote_items: {
          create: items.map((item: any) => ({
            rfq_item_id: Number(item.rfq_item_id),
            unit_price: toNumber(item.unit_price),
            delivery_days: item.delivery_days ? Number(item.delivery_days) : null,
          })),
        },
      },
      include: {
        vendor: true,
        rfq: true,
        quote_items: true,
      },
    });

    await logActivity(
      'Quotation submitted',
      `${quotation.vendor.name} submitted quotation for ${quotation.rfq.title}`,
      'Quotations',
      req.user?.id
    );

    return res.status(201).json(quotation);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to submit quotation' });
  }
};

export const getComparison = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const quotes = await prisma.quotations.findMany({
      where: { rfq_id: Number(id) },
      include: {
        vendor: true,
        quote_items: {
          include: { rfq_item: true }
        }
      }
    });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comparison data' });
  }
};

export const getApprovals = async (req: Request, res: Response) => {
  try {
    const approvals = await prisma.approval_chain.findMany({
      include: {
        rfq: {
          include: {
            vendor: true,
            quotations: {
              include: { vendor: true, quote_items: true },
              orderBy: { grand_total: 'asc' },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    res.json(approvals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch approvals' });
  }
};

export const updateApproval = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, remarks } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid approval status' });
  }

  try {
    const approval = await prisma.approval_chain.update({
      where: { id: Number(id) },
      data: {
        status,
        remarks: remarks || null,
        approved_at: status === 'approved' ? new Date() : null,
      },
      include: { rfq: true },
    });

    if (status === 'approved') {
      const pendingCount = await prisma.approval_chain.count({
        where: { rfq_id: approval.rfq_id, status: 'pending' },
      });

      if (pendingCount === 0) {
        const bestQuote = await prisma.quotations.findFirst({
          where: { rfq_id: approval.rfq_id },
          orderBy: { grand_total: 'asc' },
        });

        if (bestQuote) {
          await prisma.purchase_orders.upsert({
            where: { po_number: `PO-${approval.rfq_id.toString().padStart(4, '0')}` },
            create: {
              po_number: `PO-${approval.rfq_id.toString().padStart(4, '0')}`,
              vendor_id: bestQuote.vendor_id,
              amount: bestQuote.grand_total,
              status: 'confirmed',
            },
            update: {
              vendor_id: bestQuote.vendor_id,
              amount: bestQuote.grand_total,
              status: 'confirmed',
            },
          });
        }
      }
    }

    await logActivity(
      status === 'approved' ? 'Approval completed' : status === 'rejected' ? 'Approval rejected' : 'Approval updated',
      `${approval.role} for ${approval.rfq.title} marked ${status}`,
      'Approvals',
      req.user?.id
    );

    return res.json(approval);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update approval' });
  }
};

export const getPurchaseOrders = async (req: Request, res: Response) => {
  const { search, status } = req.query;

  try {
    const orders = await prisma.purchase_orders.findMany({
      where: {
        AND: [
          status && status !== 'all' ? { status: String(status) } : {},
          search
            ? {
                OR: [
                  { po_number: { contains: String(search), mode: 'insensitive' } },
                  { vendor: { name: { contains: String(search), mode: 'insensitive' } } },
                ],
              }
            : {},
        ],
      },
      include: {
        vendor: true,
        invoices: true,
      },
      orderBy: { created_at: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch purchase orders' });
  }
};

export const createPurchaseOrder = async (req: Request, res: Response) => {
  const { vendor_id, amount, status } = req.body;

  if (!vendor_id || !amount) {
    return res.status(400).json({ error: 'Vendor and amount are required' });
  }

  try {
    const count = await prisma.purchase_orders.count();
    const po = await prisma.purchase_orders.create({
      data: {
        po_number: `PO-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`,
        vendor_id: Number(vendor_id),
        amount: toNumber(amount),
        status: status || 'draft',
      },
      include: { vendor: true },
    });

    await logActivity('Purchase order created', `${po.po_number} created for ${po.vendor.name}`, 'PO', req.user?.id);

    return res.status(201).json(po);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create purchase order' });
  }
};

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoices.findMany({
      include: {
        po: {
          include: { vendor: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'paid', 'unpaid', 'overdue'].includes(status)) {
    return res.status(400).json({ error: 'Invalid invoice status' });
  }

  try {
    const invoice = await prisma.invoices.update({
      where: { id: Number(id) },
      data: { status },
      include: { po: { include: { vendor: true } } },
    });

    await logActivity('Invoice updated', `${invoice.invoice_no} marked ${status}`, 'Invoices', req.user?.id);

    return res.json(invoice);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update invoice' });
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const [totalSpend, activeVendors, purchaseOrders, overdueInvoices, topVendors, categoryRfqs] = await Promise.all([
      prisma.purchase_orders.aggregate({ _sum: { amount: true } }),
      prisma.vendors.count({ where: { status: 'active' } }),
      prisma.purchase_orders.findMany({ include: { vendor: true }, orderBy: { created_at: 'asc' } }),
      prisma.invoices.count({ where: { status: 'overdue' } }),
      prisma.purchase_orders.groupBy({
        by: ['vendor_id'],
        _sum: { amount: true },
        _count: { id: true },
        orderBy: { _sum: { amount: 'desc' } },
        take: 5,
      }),
      prisma.rfqs.groupBy({
        by: ['category'],
        _count: { id: true },
      }),
    ]);

    const vendorNames = await prisma.vendors.findMany({
      where: { id: { in: topVendors.map((vendor) => vendor.vendor_id) } },
    });

    const fulfilled = purchaseOrders.filter((po) => ['confirmed', 'shipped', 'paid'].includes(po.status)).length;
    const fulfillment = purchaseOrders.length ? Math.round((fulfilled / purchaseOrders.length) * 100) : 0;

    res.json({
      kpis: {
        totalSpend: totalSpend._sum.amount || 0,
        activeVendors,
        fulfillment,
        overdueInvoices,
      },
      topVendors: topVendors.map((vendor) => ({
        vendorId: vendor.vendor_id,
        name: vendorNames.find((item) => item.id === vendor.vendor_id)?.name || 'Unknown vendor',
        spend: vendor._sum.amount || 0,
        poCount: vendor._count.id,
      })),
      categorySpend: categoryRfqs.map((category) => ({
        name: category.category || 'Uncategorized',
        value: category._count.id,
      })),
      trend: purchaseOrders.map((po) => ({
        month: po.created_at.toLocaleString('en-US', { month: 'short' }),
        value: Number(po.amount),
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

export const getActivityLogs = async (req: Request, res: Response) => {
  const { entity } = req.query;

  try {
    const logs = await prisma.activity_logs.findMany({
      where: entity && entity !== 'All' ? { entity: String(entity) } : {},
      orderBy: { created_at: 'desc' },
      take: 50,
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity logs' });
  }
};
