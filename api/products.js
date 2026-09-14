/**
 * SRI LAKSHMI BAKERY - Vercel Serverless API (/api/products)
 * Queries authoritative product catalog from Supabase PostgreSQL.
 * Supports category filtering, search, and sorting.
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { category, search, sort } = req.query;

        let query = supabase.from('products').select('*');

        // Category filter
        if (category && category !== 'all') {
            const catUpper = category.toUpperCase();
            query = query.eq('category', catUpper);
        }

        // Search filter
        if (search && search.trim() !== '') {
            query = query.ilike('name', `%${search.trim()}%`);
        }

        // Sorting
        if (sort === 'price-low') {
            query = query.order('price', { ascending: true });
        } else if (sort === 'price-high') {
            query = query.order('price', { ascending: false });
        } else {
            query = query.order('is_popular', { ascending: false }).order('created_at', { ascending: false });
        }

        const { data, error } = await query;

        if (error) {
            console.error('[API /products Error]', error);
            // Fallback response if Supabase DB is not yet provisioned
            return res.status(200).json({
                success: true,
                source: 'fallback',
                products: getFallbackProducts(category, search, sort)
            });
        }

        return res.status(200).json({
            success: true,
            source: 'database',
            count: data.length,
            products: data
        });
    } catch (err) {
        console.error('[API /products Exception]', err);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

function getFallbackProducts(category, search, sort) {
    const catalog = [
        { id: 'cake-1', name: 'Royal Rasmalai Saffron Cake', category: 'CAKES', price: 750, rating: 4.9, unit: '0.5 kg', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', is_popular: true, available: true },
        { id: 'cake-2', name: 'Belgian Dark Chocolate Fudge', category: 'CAKES', price: 650, rating: 4.8, unit: '0.5 kg', image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80', is_popular: true, available: true },
        { id: 'cake-3', name: 'Classic Black Forest Celebration', category: 'CAKES', price: 550, rating: 4.7, unit: '0.5 kg', image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80', is_popular: true, available: true },
        { id: 'snack-1', name: 'Hot Crispy Paneer Puff', category: 'SNACKS', price: 40, rating: 4.8, unit: '1 Pc', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', is_popular: true, available: true },
        { id: 'snack-2', name: 'Classic Golden Egg Puff', category: 'SNACKS', price: 35, rating: 4.7, unit: '1 Pc', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', is_popular: false, available: true },
        { id: 'drink-1', name: 'Special Almond Badam Milk Bottle', category: 'COOL_DRINKS', price: 60, rating: 4.9, unit: '200 ml', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80', is_popular: true, available: true }
    ];

    let items = catalog;
    if (category && category !== 'all') {
        items = items.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim() !== '') {
        items = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    return items;
}
