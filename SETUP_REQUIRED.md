# SETUP_REQUIRED.md - Production Environment Credentials Guide

This guide details the external credentials required to run Sri Lakshmi Bakery at **₹0/month base infrastructure cost**.

---

## 1. Supabase PostgreSQL, Auth & Realtime (Free Tier)
- **Account Setup**: Create a free account at [supabase.com](https://supabase.com).
- **Project**: Create a new project named `sri-lakshmi-bakery`.
- **SQL Migrations**:
  1. Open the **SQL Editor** in Supabase dashboard.
  2. Run `supabase/migrations/001_initial_schema.sql` to create all 13 core tables & indexes.
  3. Run `supabase/migrations/002_rls_security.sql` to apply Row Level Security policies.
  4. Run `supabase/migrations/003_seed_catalog.sql` to populate the 90+ product catalog.
- **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL`: Found in **Project Settings** ➔ **API**.
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Found in **Project Settings** ➔ **API** (Anon public key).
  - `SUPABASE_SERVICE_ROLE_KEY`: Found in **Project Settings** ➔ **API** (Service role secret key - keep private!).
- **Cost**: **₹0/month** (Free Tier includes 500MB database, 50,000 monthly active users, Realtime WebSockets).

---

## 2. Razorpay Payment Gateway (No Monthly Fee)
- **Account Setup**: Register at [razorpay.com](https://razorpay.com).
- **API Keys**: Navigate to **Settings** ➔ **API Keys** and generate **Key ID** and **Key Secret** (Test mode or Live mode).
- **Webhooks**: Navigate to **Settings** ➔ **Webhooks** and add `https://sri-lakshmi-bakery-one.vercel.app/api/payments/webhook`. Set secret key as `RAZORPAY_WEBHOOK_SECRET`.
- **Environment Variables**:
  - `RAZORPAY_KEY_ID`: `rzp_test_...` or `rzp_live_...`
  - `RAZORPAY_KEY_SECRET`: `...`
  - `RAZORPAY_WEBHOOK_SECRET`: `...`
- **Cost**: No monthly subscription fee. Standard transaction gateway fees (~2%) apply per successful transaction.

---

## 3. Resend Email Notifications (Free Tier)
- **Account Setup**: Create a free account at [resend.com](https://resend.com).
- **API Key**: Generate an API key with sending permissions.
- **Environment Variable**: `RESEND_API_KEY=re_...`
- **Cost**: **₹0/month** (Free Tier includes 3,000 emails/month).

---

## 4. Vercel Hosting & Environment Variables
- **Hosting**: Connect repository `SATAPASTI-HARIpRASAD-07/sri-lakshmi-bakery` to Vercel Hobby.
- **Environment Variables**: In Vercel Project Settings ➔ Environment Variables, paste the keys from `.env.example`.
- **Cost**: **₹0/month** (Vercel Hobby Free Tier).
