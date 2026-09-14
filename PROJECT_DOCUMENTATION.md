# SRI LAKSHMI BAKERY — COMPLETE END-TO-END PROJECT DOCUMENTATION

> **Project**: Sri Lakshmi Bakery Online Ordering & E-Commerce Platform  
> **Tagline**: *"Freshly Baked Happiness Every Day"*  
> **Production Live URL**: [https://sri-lakshmi-bakery-one.vercel.app](https://sri-lakshmi-bakery-one.vercel.app)  
> **GitHub Repository**: [SATAPASTI-HARIpRASAD-07/sri-lakshmi-bakery](https://github.com/SATAPASTI-HARIpRASAD-07/sri-lakshmi-bakery)  
> **Delivery Agent Portal**: [https://sri-lakshmi-bakery-one.vercel.app/delivery.html](https://sri-lakshmi-bakery-one.vercel.app/delivery.html)  
> **Official Business Phone & WhatsApp**: **`9668569974`** ([Chat on WhatsApp](https://wa.me/919668569974) | [Call Bakery](tel:+919668569974))  
> **Target Infrastructure Cost**: **₹0/month Base Cost** (Vercel Hobby + Supabase Free Tier + Resend Free Tier)

---

## TABLE OF CONTENTS
1. [Executive Summary & System Architecture](#1-executive-summary--system-architecture)
2. [Phase 1: Brand Concept & 3D Frontend Development](#2-phase-1-brand-concept--3d-frontend-development)
3. [Phase 2: Mobile-First E-Commerce & Checkout Stepper](#3-phase-2-mobile-first-e-commerce--checkout-stepper)
4. [Phase 3: Real Production Backend Transformation](#4-phase-3-real-production-backend-transformation)
5. [Phase 4: Database Schema & Supabase Migrations](#5-phase-4-database-schema--supabase-migrations)
6. [Phase 5: Vercel Serverless API Specification](#6-phase-5-vercel-serverless-api-specification)
7. [Phase 6: Payment Gateway & Security Architecture](#7-phase-6-payment-gateway--security-architecture)
8. [Phase 7: Delivery Agent Portal & Live GPS Tracking](#8-phase-7-delivery-agent-portal--live-gps-tracking)
9. [Phase 8: Step-by-Step Deployment & Configuration Guide](#9-phase-8-step-by-step-deployment--configuration-guide)
10. [Phase 9: Verification, Testing & Audit Artifacts](#10-phase-9-verification-testing--audit-artifacts)

---

## 1. EXECUTIVE SUMMARY & SYSTEM ARCHITECTURE

Sri Lakshmi Bakery is a high-end, production-ready online ordering platform designed for an authentic Indian bakery brand in Visakhapatnam & Srikakulam. The platform combines luxury visual design, interactive Three.js 3D WebGL hero animations, an expanded 90+ product catalog, a 6-step ordering checkout stepper, direct WhatsApp integration, real-time courier-style order tracking, Razorpay payment gateway integration, and a mobile GPS delivery portal.

### System Architecture Overview

```
                      +-----------------------------------+
                      |   CLIENT BROWSER (Desktop/Mobile)  |
                      +-----------------+-----------------+
                                        |
                   +--------------------+--------------------+
                   |                                         |
                   v                                         v
        +-----------------------+                 +-----------------------+
        | Vercel Edge / Static  |                 | Vercel Serverless API |
        | HTML / CSS / JS / 3D  |                 |      (/api/*)         |
        +-----------------------+                 +-----------+-----------+
                                                              |
    +------------------------+------------------------+-------+--------+
    |                        |                        |                |
    v                        v                        v                v
+---------------+    +---------------+        +---------------+  +-----------+
|  Supabase DB  |    | Supabase Auth |        |  Razorpay API |  | WhatsApp  |
| PostgreSQL DB |    |  (JWT & RLS)  |        |  (Payments)   |  | (+91 9668 |
+---------------+    +---------------+        +---------------+  |   569974) |
    |                        |                        |          +-----------+
    +------------+-----------+                        v
                 |                   +------------------------+
                 v                   | Razorpay Webhook       |
        +-----------------+          | (/api/payments/webhook)|
        | Supabase        |          +------------------------+
        | Realtime Stream |
        +--------+--------+
                 |
                 v
   +---------------------------+
   |  Customer Live Tracking   |
   | & Delivery GPS Portal     |
   +---------------------------+
```

---

## 2. PHASE 1: BRAND CONCEPT & 3D FRONTEND DEVELOPMENT

### Visual Identity & Palette
- **Cream Vanilla Background**: `#FFF9F2`
- **Dark Chocolate Primary**: `#5A2D1A`
- **Burnt Orange Secondary**: `#A94F20`
- **Caramel Accent**: `#D9823B`
- **Typography**: Playfair Display (Serif headers), Plus Jakarta Sans (Body), Outfit (Display numbers).

### Core Frontend Components
1. **Animated Preloader (`#bakery-preloader`)**: Chef hat bounce animation that fades smoothly on load.
2. **Sticky Header (`#main-nav`)**: Backdrop blur navigation with logo, quick sections, admin button, cart badge, and order CTAs.
3. **Three.js 3D WebGL Hero Scene (`hero-3d-canvas`)**: Custom Three.js 3D cake sculpture with lighting, soft shadow plane, and interactive mouse drag rotation (`js/bakery-3d.js`, `js/three-scenes.js`).
4. **Floating Category Strip**: Quick filter buttons for All Delicious Items, Celebration Cakes, Bakery & Snacks, and Cool Drinks.
5. **Quick View & Cake Customizer**: Product detail modal supporting cake size/weight selection (0.5kg, 1.0kg, 2.0kg), eggless option, custom text written on cake, and special baking instructions.
6. **Dining Lounge & Celebration Area**: Cards highlighting the AC birthday celebration space, family dining tables, and express snack counters with WhatsApp reservation triggers.
7. **Bakery Gallery Pavilion**: 6-grid gallery showcase of freshly baked goods.
8. **Contact & Location**: Store address, opening hours, Google Maps directions, and official phone buttons.

---

## 3. PHASE 3: MOBILE-FIRST E-COMMERCE & CHECKOUT STEPPER

### The 6-Step Multi-Step Checkout Stepper
Users click **"ORDER NOW"** or **"PROCEED TO PLACE ORDER"** to enter a modal stepper:

- **Step 1: CART REVIEW**: Displays selected items, unit prices, quantity controls, subtotal, coupon input, and delivery fee calculation.
- **Step 2: CUSTOMER CONTACT**: Collects Full Name, 10-digit Indian Mobile Number (validated starting 6-9), and optional Email.
- **Step 3: FULFILLMENT TOGGLE**:
  - **Home Delivery**: Flat/House No, Street, Locality/Area, City, 6-digit PIN Code validation (e.g. 530026), ₹50 delivery fee. Address preview card.
  - **Store Pickup**: Pickup Date (min today), Pickup Time Slot selection (10:00 AM - 08:00 PM), ₹0 FREE fee. Pickup preview card.
- **Step 4: PAYMENT**:
  - **Payment Welcome Card**: Automatically renders Order ID (`SLB-YYYYMMDD-XXXX`), Amount, and `[ 💬 CONTINUE ON WHATSAPP ]`.
  - **Explicit Click Control**: WhatsApp NEVER opens automatically; it ONLY opens when the customer explicitly clicks `CONTINUE ON WHATSAPP`.
- **Step 5: CONFIRMATION RECEIPT**: Displays order receipt, summary details, and pre-filled WhatsApp confirmation button.
- **Step 6: LIVE ORDER TRACKING**: Renders live e-commerce timeline progress indicator.

---

## 4. PHASE 4: REAL PRODUCTION BACKEND TRANSFORMATION

The frontend was transformed into a full-stack production application powered by Vercel Serverless Functions (`/api/*`) and Supabase PostgreSQL.

### Architecture Highlights
- **Server-Side Price Validation**: Final subtotals and grand totals are calculated on Vercel Serverless API using authoritative prices from Supabase `products` table. Frontend price payloads are never trusted.
- **Unique Human-Readable Order Numbers**: Format `SLB-YYYYMMDD-XXXX` (e.g. `SLB-20260914-8921`).
- **Order Item Price Snapshots**: `order_items` table stores `unit_price` at the moment of order creation so future product price updates never alter historical orders.

---

## 5. PHASE 5: DATABASE SCHEMA & SUPABASE MIGRATIONS

The database is built on Supabase PostgreSQL with 13 relational tables defined in `supabase/migrations/`:

### 1. `001_initial_schema.sql`
- **`customers`**: Customer profiles (`id`, `auth_user_id`, `name`, `mobile`, `email`, `created_at`, `updated_at`).
- **`products`**: Product catalog (`id`, `name`, `slug`, `category`, `description`, `price`, `unit`, `image_url`, `available`, `stock_quantity`, `is_featured`, `is_popular`).
- **`orders`**: Master order headers (`id`, `order_number`, `customer_id`, `fulfillment_type`, `subtotal`, `delivery_fee`, `discount`, `grand_total`, `order_status`, `payment_status`, `payment_method`, `notes`).
- **`order_items`**: Order item price snapshot (`id`, `order_id`, `product_id`, `product_name`, `unit_price`, `quantity`, `subtotal`, `customization`).
- **`addresses`**: Home delivery addresses (`id`, `customer_id`, `order_id`, `house_no`, `street`, `area`, `city`, `district`, `state`, `pincode`, `latitude`, `longitude`).
- **`pickup_slots`**: Store pickup reservations (`id`, `order_id`, `pickup_date`, `time_slot`, `status`).
- **`payments`**: Razorpay payment records (`id`, `order_id`, `provider`, `provider_order_id`, `provider_payment_id`, `amount`, `currency`, `status`, `signature_verified`).
- **`order_status_history`**: Audit trail of status transitions (`id`, `order_id`, `status`, `changed_by`, `note`, `created_at`).
- **`delivery_agents`**: Registered delivery drivers (`id`, `auth_user_id`, `name`, `mobile`, `status`).
- **`delivery_locations`**: Real GPS tracking log (`id`, `order_id`, `agent_id`, `latitude`, `longitude`, `accuracy`, `recorded_at`).
- **`notifications`**: Communication log (`id`, `order_id`, `customer_id`, `type`, `title`, `message`, `channel`, `status`).
- **`admin_users`**: Store owner & admin credentials (`id`, `auth_user_id`, `name`, `role`).
- **`audit_logs`**: System audit trail (`id`, `actor_id`, `action`, `resource`, `metadata`).

### 2. `002_rls_security.sql`
Enables Supabase Row Level Security (RLS) across all 13 tables, ensuring customers can access only their own orders and profile data.

### 3. `003_seed_catalog.sql`
Populates the database with 90+ bakery items across `CAKES`, `BAKERY`, `PASTRIES`, `SNACKS`, and `COOL_DRINKS`.

---

## 6. PHASE 6: VERCEL SERVERLESS API SPECIFICATION

All backend logic runs as serverless functions in the `/api` directory:

| Route Endpoint | HTTP Method | Description |
| :--- | :--- | :--- |
| `/api/products` | `GET` | Fetches catalog from Supabase with category filtering, search, and sorting. |
| `/api/orders/create` | `POST` | Validates cart prices against database, calculates totals, and creates atomic order records. |
| `/api/orders/track` | `GET` | Returns status timeline and item snapshot verified by Order ID + customer mobile. |
| `/api/payments/create-razorpay-order` | `POST` | Creates Razorpay order instance server-side using Razorpay SDK. |
| `/api/payments/verify` | `POST` | Validates Razorpay HMAC-SHA256 signature and updates order status to `PAID`. |
| `/api/payments/webhook` | `POST` | Webhook listener verifying `X-Razorpay-Signature` for automated payment processing. |
| `/api/admin/orders` | `GET`, `PATCH` | Admin order query, search, and status transition handler. |
| `/api/admin/products` | `POST`, `PUT` | Admin catalog management for editing prices, availability, and stock. |
| `/api/admin/analytics` | `GET` | Calculates real-time business statistics (revenue, order counts, status breakdown). |
| `/api/delivery/location` | `GET`, `POST` | Handles delivery agent GPS coordinate streaming and customer live map tracking. |

---

## 7. PHASE 7: PAYMENT GATEWAY & SECURITY ARCHITECTURE

### Razorpay Integration Flow
1. Customer completes Step 3 (Fulfillment) and reaches Step 4 (Payment).
2. Frontend calls `/api/payments/create-razorpay-order` with Order ID and amount.
3. Server creates Razorpay order instance and returns `razorpay_order_id`.
4. Razorpay Checkout modal opens with UPI, Cards, NetBanking, Paytm, PhonePe, and Google Pay options.
5. Upon payment completion, Razorpay returns `razorpay_payment_id` and `razorpay_signature`.
6. Frontend calls `/api/payments/verify`.
7. Server validates HMAC-SHA256 signature:
   $$\text{HMAC-SHA256}(\text{razorpay\_order\_id} \mathbin{\Vert} \text{razorpay\_payment\_id}, \text{RAZORPAY\_KEY\_SECRET})$$
8. Order status is updated to `PAID` and `CONFIRMED` **ONLY** upon verified signature match.

---

## 8. PHASE 8: DELIVERY AGENT PORTAL & LIVE GPS TRACKING

- **Portal Page (`delivery.html`)**: Mobile-first responsive web portal for delivery drivers.
- **Assigned Orders View**: Drivers log in and view orders marked `OUT_FOR_DELIVERY`.
- **Live Geolocation Tracking**: Uses `navigator.geolocation.watchPosition()` with high accuracy settings to stream latitude, longitude, and accuracy to `/api/delivery/location`.
- **Customer Live Map**: Customers viewing their active order tracking timeline receive live location updates streamed via Supabase Realtime WebSockets.

---

## 9. PHASE 9: STEP-BY-STEP DEPLOYMENT & CONFIGURATION GUIDE

### Step 1: Environment Variables (`.env.example`)
Create `.env.local` locally or set in Vercel Project Settings:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_secret_key
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
RESEND_API_KEY=re_your_resend_api_key
WHATSAPP_PHONE_NUMBER=919668569974
```

### Step 2: Supabase PostgreSQL Setup
1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run `supabase/migrations/001_initial_schema.sql`.
3. Run `supabase/migrations/002_rls_security.sql`.
4. Run `supabase/migrations/003_seed_catalog.sql`.

### Step 3: Git & Vercel Deployment
```bash
git add .
git commit -m "Deploy Sri Lakshmi Bakery Production Platform"
git push origin main
```
Vercel automatically builds and deploys serverless functions to `https://sri-lakshmi-bakery-one.vercel.app`.

---

## 10. PHASE 10: VERIFICATION, TESTING & AUDIT ARTIFACTS

| Artifact File | Description & Purpose |
| :--- | :--- |
| **`EXISTING_FEATURES.md`** | Feature inventory auditing 100% feature preservation of Three.js canvas, layout, and sections. |
| **`UPDATE_VALIDATION.md`** | Matrix validating BEFORE vs AFTER status for existing elements and NEW Version 2 backend modules. |
| **`SETUP_REQUIRED.md`** | Step-by-step setup guide for free-tier credentials (Supabase, Razorpay, Resend, Vercel). |
| **`SECURITY.md`** | Security report detailing Supabase Auth, RLS policies, Razorpay HMAC signatures, and audit logs. |
| **`DATA_MIGRATION.md`** | Schema audit, zero-data-loss verification, backup procedures, and rollback strategies. |

---

## FINAL SYSTEM STATUS
- **Frontend Design & 3D WebGL Canvas**: 100% Preserved & Operational
- **Multi-Step Checkout Stepper**: 100% Operational (6 Steps)
- **Official WhatsApp Contact (`9668569974`)**: 100% Operational (Direct click trigger)
- **Supabase Database & RLS Security**: 100% Operational (13 Tables, 90+ Products)
- **Razorpay Payment Gateway**: 100% Operational (Server HMAC verification)
- **Delivery Agent Portal & GPS Tracking**: 100% Operational (`delivery.html`)
- **Vercel Production Deployment**: 100% Live at `https://sri-lakshmi-bakery-one.vercel.app`
