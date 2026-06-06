import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // @ts-ignore
  await prisma.activity_logs.deleteMany({});
  await prisma.approval_chain.deleteMany({});
  await prisma.quote_items.deleteMany({});
  await prisma.quotations.deleteMany({});
  await prisma.rfq_line_items.deleteMany({});
  await prisma.rfqs.deleteMany({});
  await prisma.invoices.deleteMany({});
  await prisma.purchase_orders.deleteMany({});
  await prisma.vendors.deleteMany({});

  console.log('Seeding Vendors...');
  const vendorsData = [
    { name: 'Infra Supplies Pvt Ltd', category: 'Constructions', gst_no: '27AABCS1429Bz0', phone: '+91 98765 43210', status: 'active', rating: 4.5, email: 'infra@example.com' },
    { name: 'Tech Core LTD', category: 'IT', gst_no: '27AABCS1429Bz0', phone: '+91 91234 56789', status: 'active', rating: 4.2, email: 'techcore@example.com' },
    { name: 'FastLog Transport', category: 'Logistics', gst_no: '27AABCS1429Bz0', phone: '+91 87654 32109', status: 'blocked', rating: 3.5, email: 'fastlog@example.com' },
    { name: 'Global Solutions Inc.', category: 'Manufacturing', gst_no: '27AABCS1429Bz0', phone: '+91 76543 21098', status: 'active', rating: 4.0, email: 'global@example.com' },
    { name: 'Apex Consultancy', category: 'Consulting', gst_no: '27AABCS1429Bz0', phone: '+91 65432 10987', status: 'pending', rating: 4.1, email: 'apex@example.com' },
    { name: 'Office Need Co.', category: 'Furniture', gst_no: '27AABCS1429Bz0', phone: '+91 10987 65432', status: 'active', rating: 3.8, email: 'officeneed@example.com' },
  ];

  const createdVendors = [];
  for (const v of vendorsData) {
    const vendor = await prisma.vendors.create({ data: v });
    createdVendors.push(vendor);
  }

  console.log('Seeding RFQ...');
  const rfq = await prisma.rfqs.create({
    data: {
      title: 'Office Furniture procurement Q2',
      description: 'Ergonomic chairs and standing desks for 3rd floor',
      category: 'Furniture',
      deadline: new Date('2025-06-15'),
      status: 'sent',
      vendor_id: createdVendors[0]!.id, // Default vendor
    }
  });

  console.log('Seeding RFQ Line Items...');
  const item1 = await prisma.rfq_line_items.create({
    data: { rfq_id: rfq.id, item_name: 'Ergonomic chair', quantity: 25, unit: 'NOS' }
  });
  const item2 = await prisma.rfq_line_items.create({
    data: { rfq_id: rfq.id, item_name: 'Standing desks', quantity: 10, unit: 'NOS' }
  });

  console.log('Seeding Quotations...');
  // Quotation 1: Infra Supplies (Lowest)
  const quote1 = await prisma.quotations.create({
    data: {
      rfq_id: rfq.id,
      vendor_id: createdVendors[0]!.id,
      subtotal: 156779.66,
      tax_percent: 18,
      grand_total: 185000,
      status: 'accepted',
      notes: 'Best price guaranteed.',
    }
  });
  await prisma.quote_items.createMany({
    data: [
      { quote_id: quote1.id, rfq_item_id: item1.id, unit_price: 3500, delivery_days: 10 },
      { quote_id: quote1.id, rfq_item_id: item2.id, unit_price: 8000, delivery_days: 10 },
    ]
  });

  // Quotation 2: Tech Core
  const quote2 = await prisma.quotations.create({
    data: {
      rfq_id: rfq.id,
      vendor_id: createdVendors[1]!.id,
      subtotal: 169500,
      tax_percent: 18,
      grand_total: 200010,
      status: 'pending',
    }
  });
  await prisma.quote_items.createMany({
    data: [
      { quote_id: quote2.id, rfq_item_id: item1.id, unit_price: 3800, delivery_days: 14 },
      { quote_id: quote2.id, rfq_item_id: item2.id, unit_price: 8200, delivery_days: 14 },
    ]
  });

  console.log('Seeding Approval Chain...');
  await prisma.approval_chain.createMany({
    data: [
      { rfq_id: rfq.id, approver: 'Rahul Mehta', role: 'Procurement Head', status: 'approved', approved_at: new Date('2026-05-20T10:32:00Z'), remarks: 'Price is within budget.' },
      { rfq_id: rfq.id, approver: 'Priya Shah', role: 'Finance Manager', status: 'pending', remarks: '' },
    ]
  });

  console.log('Seeding Purchase Orders...');
  const po1 = await prisma.purchase_orders.create({
    data: {
      po_number: 'PO-2025-0068',
      vendor_id: createdVendors[0]!.id,
      amount: 185000,
      status: 'confirmed',
      created_at: new Date('2025-05-21T00:00:00Z')
    }
  });

  console.log('Seeding Invoices...');
  await prisma.invoices.create({
    data: {
      invoice_no: 'INV-2025-0068',
      po_id: po1.id,
      amount: 185000,
      status: 'pending',
      due_date: new Date('2025-06-21'),
    }
  });

  console.log('Seeding Activity Logs...');
  // @ts-ignore
  await prisma.activity_logs.createMany({
    data: [
      { action: 'Quotation selected', details: 'Infra supplies pvt ltd selected for office furniture Q2', entity: 'RFQ', created_at: new Date('2025-05-23T21:15:00Z') },
      { action: 'Approval pending', details: 'PO-2024 awaiting L2 approval by priya shah', entity: 'Approvals', created_at: new Date('2025-05-22T09:15:00Z') },
      { action: 'RFQ published', details: 'office furniture Q2 sent to 3 vendors', entity: 'RFQ', created_at: new Date('2025-05-19T00:00:00Z') },
      { action: 'Vendor added', details: 'FastLog transport registered and pending verifications', entity: 'Vendors', created_at: new Date('2025-05-18T15:20:00Z') },
    ]
  });

  console.log('Full Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
