import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    res.json(rfq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RFQ details' });
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
