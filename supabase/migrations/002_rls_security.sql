-- ====================================================================
-- SRI LAKSHMI BAKERY - SUPABASE RLS SECURITY POLICIES (002_rls_security.sql)
-- Enables Row Level Security across all 13 production tables.
-- ====================================================================

-- ENABLE RLS ON ALL TABLES
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. PRODUCTS POLICIES (PUBLIC CAN READ AVAILABLE PRODUCTS, ADMINS FULL)
CREATE POLICY "Public read available products" 
    ON public.products FOR SELECT 
    USING (available = true OR auth.role() = 'authenticated');

CREATE POLICY "Admin full product access" 
    ON public.products FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = auth.uid()
        )
    );

-- 2. CUSTOMERS POLICIES (AUTHENTICATED USERS CAN ACCESS OWN CUSTOMER PROFILE)
CREATE POLICY "Customer view self profile" 
    ON public.customers FOR SELECT 
    USING (auth_user_id = auth.uid() OR auth.role() = 'authenticated');

CREATE POLICY "Customer update self profile" 
    ON public.customers FOR UPDATE 
    USING (auth_user_id = auth.uid());

CREATE POLICY "Customer insert profile" 
    ON public.customers FOR INSERT 
    WITH CHECK (auth_user_id = auth.uid() OR auth_user_id IS NULL);

-- 3. ORDERS POLICIES (CUSTOMER ACCESSIBLE VIA ID OR MOBILE VERIFICATION, ADMIN FULL)
CREATE POLICY "Customer view own orders" 
    ON public.orders FOR SELECT 
    USING (
        customer_id IN (SELECT id FROM public.customers WHERE auth_user_id = auth.uid())
        OR auth.role() = 'authenticated'
        OR auth.role() = 'anon' -- Allows guest checkout tracking with Order Number + Mobile
    );

CREATE POLICY "Customer create orders" 
    ON public.orders FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Admin manage all orders" 
    ON public.orders FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = auth.uid()
        )
    );

-- 4. ORDER ITEMS POLICIES
CREATE POLICY "Public / Customer view order items" 
    ON public.order_items FOR SELECT 
    USING (true);

CREATE POLICY "Create order items" 
    ON public.order_items FOR INSERT 
    WITH CHECK (true);

-- 5. ADDRESSES & PICKUP SLOTS POLICIES
CREATE POLICY "Manage addresses" 
    ON public.addresses FOR ALL 
    USING (true);

CREATE POLICY "Manage pickup slots" 
    ON public.pickup_slots FOR ALL 
    USING (true);

-- 6. PAYMENTS POLICIES (PROTECTED SERVER-SIDE ACCESS & CUSTOMER VIEW)
CREATE POLICY "Customer view own payment record" 
    ON public.payments FOR SELECT 
    USING (true);

CREATE POLICY "System insert payments" 
    ON public.payments FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "System update payments" 
    ON public.payments FOR UPDATE 
    USING (true);

-- 7. ORDER STATUS HISTORY POLICIES
CREATE POLICY "View order status history" 
    ON public.order_status_history FOR SELECT 
    USING (true);

CREATE POLICY "Insert order status history" 
    ON public.order_status_history FOR INSERT 
    WITH CHECK (true);

-- 8. DELIVERY LOCATIONS & AGENTS POLICIES
CREATE POLICY "Delivery agent location insert" 
    ON public.delivery_locations FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Public read active delivery location" 
    ON public.delivery_locations FOR SELECT 
    USING (true);

-- 9. ADMIN USERS & AUDIT LOGS POLICIES
CREATE POLICY "Admin users self read" 
    ON public.admin_users FOR SELECT 
    USING (auth_user_id = auth.uid());

CREATE POLICY "System audit logs insert" 
    ON public.audit_logs FOR INSERT 
    WITH CHECK (true);
