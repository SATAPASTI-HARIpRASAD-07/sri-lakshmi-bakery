/**
 * SRI LAKSHMI BAKERY - Vercel Serverless API (/api/admin/products)
 * Admin catalog management: Add/edit products, stock, prices.
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'POST') {
            const { name, category, price, description, image_url, available } = req.body || {};
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            const { data, error } = await supabase
                .from('products')
                .insert({ name, slug, category, price, description, image_url, available: available ?? true })
                .select()
                .single();

            if (error) throw error;
            return res.status(201).json({ success: true, product: data });
        }

        if (req.method === 'PUT') {
            const { id, price, available, stock_quantity } = req.body || {};
            const { data, error } = await supabase
                .from('products')
                .update({ price, available, stock_quantity, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return res.status(200).json({ success: true, product: data });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });
    } catch (err) {
        console.error('[API /admin/products Exception]', err);
        return res.status(500).json({ success: false, error: 'Admin products API error' });
    }
};
