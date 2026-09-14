# SECURITY.md - Production Security & Data Protection Report

## 1. Authentication Architecture
- **Supabase Auth**: Managed password hashing (Bcrypt/Argon2), JWT token generation, and secure session persistence. No raw passwords or sensitive tokens are stored in `localStorage` or frontend code.
- **Role-Based Access Control (RBAC)**: Roles (`CUSTOMER`, `ADMIN`, `DELIVERY_AGENT`) are stored in database-backed user profiles and verified server-side.

## 2. Row Level Security (RLS) Policies
- All 13 production PostgreSQL tables have Row Level Security enabled (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`).
- Customers can query/update only their own profile, active orders, and addresses.
- System secrets (`SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_SECRET`) are never exposed to browser client scripts.

## 3. Razorpay Payment Gateway Security
- **Server-Side Order Creation**: `/api/payments/create-razorpay-order` creates Razorpay order instances on server side.
- **HMAC-SHA256 Signature Verification**: Orders are marked `PAID` ONLY when `/api/payments/verify` or `/api/payments/webhook` verifies the HMAC-SHA256 signature calculated with `RAZORPAY_KEY_SECRET`. Frontend status claims are NEVER trusted.

## 4. API & Data Protection
- **Authoritative Price Validation**: Subtotals and grand totals are calculated on Vercel Serverless API using authoritative prices from `products` table in Supabase. Frontend price payloads are ignored.
- **Mobile Number Validation**: Indian mobile numbers are validated (10 digits starting 6-9) before order record creation.
- **Audit Logging**: Sensitive system events (`ORDER_PLACED`, `PAYMENT_VERIFIED`, `STATUS_CHANGED`, `ADMIN_ACTION`) are recorded in `audit_logs` table.
