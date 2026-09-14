# DATA_MIGRATION.md - Schema & Migration Audit Report

## 1. Discovered Schema & Migration History
- **Versioned Migrations**:
  - `001_initial_schema.sql`: 13 core relational tables (`customers`, `products`, `orders`, `order_items`, `addresses`, `pickup_slots`, `payments`, `order_status_history`, `delivery_agents`, `delivery_locations`, `notifications`, `admin_users`, `audit_logs`).
  - `002_rls_security.sql`: Row Level Security policies for data isolation and access control.
  - `003_seed_catalog.sql`: Seed data inserting 90+ bakery products across 5 categories.

## 2. Zero-Data-Loss Verification Procedures
- **Data Integrity Checks**: All migrations utilize `CREATE TABLE IF NOT EXISTS` and `ALTER TABLE` to ensure existing records are never truncated or overwritten.
- **Foreign Key Safety**: Order items use `ON DELETE CASCADE` linked to order parents, while customer references use `ON DELETE SET NULL` to preserve historical order records for accounting audits.
- **Backup & Rollback Strategy**:
  - Daily database snapshots via Supabase automated backups.
  - Point-in-time recovery enabled.
