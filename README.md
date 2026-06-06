# VendorBridge

Procurement & Vendor Management ERP that digitizes vendor onboarding, RFQ cycles, quotation comparison, approvals, purchase orders, and invoice workflows in one centralized platform.

---

## Table of Contents

- [Overview](#overview)
- [Vision](#vision)
- [Final Tech Stack](#final-tech-stack)
- [Core Modules](#core-modules)
- [User Roles](#user-roles)
- [Basic Workflow](#basic-workflow)
- [Wireframe](#wireframe)
- [Project Structure](#project-structure)
- [API Routes (Current)](#api-routes-current)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup (Prisma + PostgreSQL)](#database-setup-prisma--postgresql)
- [Run the Project](#run-the-project)
- [Tools Used](#tools-used)

---

## Overview

VendorBridge is a full-stack ERP-focused procurement platform built to reduce manual procurement overhead through structured workflows and role-based collaboration.

The system covers:

- Vendor registration and lifecycle management
- RFQ creation and vendor assignment
- Vendor quotation submission
- Quotation comparison and decision support
- Approval workflow management
- Purchase order and invoice generation
- Procurement activity tracking and analytics

---

## Vision

The vision for VendorBridge is to simplify and digitize procurement operations for organizations through a centralized ERP platform that manages vendors, RFQs, quotations, approvals, purchase orders, and invoice generation.

It aims to:

- Minimize procurement inefficiencies
- Enable centralized vendor communication
- Provide real-time procurement visibility
- Maintain clean architecture and scalable modules
- Deliver secure, role-based workflows with intuitive UI/UX

---

## Final Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Reactbits

### Backend
- Node.js
- Express.js

### Authentication
- JWT Token
- bcrypt
- cookie / cookie-parser

### Database
- PostgreSQL
- Prisma ORM

### Other
- pgAdmin
- GitHub
- Postman

---

## Core Modules

1. **Login / Signup**
   - Email/password login
   - Signup
   - Forgot password
   - Session handling
   - Validation
   - Role-based auth

2. **Dashboard / Home**
   - Pending approvals
   - Active RFQs
   - Recent purchase orders
   - Recent invoices
   - Analytics cards
   - Quick actions

3. **Vendor Management**
   - Vendor registration
   - Vendor status tracking
   - Categories
   - GST and contact details
   - Search and filtering

4. **RFQ Creation**
   - RFQ title
   - Product/service details
   - Quantity management
   - Attachments
   - Deadline
   - Vendor assignment

5. **Vendor Quotation Submission**
   - Pricing details
   - Delivery timelines
   - Notes/comments
   - Editable quotations
   - Final quotation submission

6. **Quotation Comparison**
   - Side-by-side comparison
   - Lowest price highlighting
   - Delivery timeline comparison
   - Vendor rating indicators
   - Sorting/filtering

7. **Approval Workflow**
   - Approve/reject actions
   - Approval remarks
   - Approval timeline
   - Status tracking
   - Workflow transitions

8. **Purchase Order & Invoice**
   - Auto-generated PO numbers
   - Invoice generation
   - Tax/total calculations
   - PDF download
   - Print invoice
   - Email invoice
   - Status updates

9. **Activity Logs & Notifications**
   - RFQ notifications
   - Approval alerts
   - Invoice updates
   - Activity timeline
   - Audit logs

10. **Reports & Analytics**
   - Vendor performance analytics
   - Procurement statistics
   - Spending summaries
   - Monthly trends
   - Export-ready reports

---

## User Roles

- **Procurement Officer**
  - Create RFQs
  - Compare quotations
  - Generate purchase orders
  - Generate invoices

- **Vendor**
  - Submit quotations
  - Track RFQ status
  - View purchase orders

- **Manager / Approver**
  - Approve or reject requests
  - Monitor procurement workflows

- **Admin**
  - Manage users
  - Manage vendors
  - View analytics

---

## Basic Workflow

1. Procurement Officer creates an RFQ.
2. Vendors receive invitations and submit quotations.
3. Procurement team compares quotations.
4. Approval workflow is triggered.
5. Approved quotations generate Purchase Orders.
6. Invoices are generated from Purchase Orders.
7. Invoices can be printed or emailed.
8. Activities are tracked in logs and analytics.

---

## Wireframe

![VendorBridge Wireframe](https://github.com/user-attachments/assets/f814808e-a62c-48a2-8c14-c44b0fd089ba)

---

## Project Structure

```text
VendorBridge-Odoo-Team-Aum/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── types/
│   ├── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── ...
│   └── package.json
└── README.md
```

---

## API Routes (Current)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile` (protected)

### Dashboard
- `GET /api/dashboard/summary`

### Procurement
- `GET /api/procurement/vendors`
- `GET /api/procurement/rfqs/:id`
- `GET /api/procurement/rfqs/:id/comparison`

---

## Getting Started

### 1) Clone repository

```bash
git clone https://github.com/AumPethani05/VendorBridge-Odoo-Team-Aum.git
cd VendorBridge-Odoo-Team-Aum
```

### 2) Install dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

---

## Environment Variables

Create `backend/.env` with:

```env
PORT=3001
FRONTEND_URL=http://localhost:3000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

---

## Database Setup (Prisma + PostgreSQL)

From `backend/`:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Optional seed (if/when seed file is available):

```bash
npx prisma db seed
```

---

## Run the Project

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

Then open:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

---

## Tools Used

- **pgAdmin** for PostgreSQL administration
- **Postman** for API testing
- **GitHub** for source control and collaboration

---

Built for structured, scalable, and secure procurement operations with ERP-first design principles.