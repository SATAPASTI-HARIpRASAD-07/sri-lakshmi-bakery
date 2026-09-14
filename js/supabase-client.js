/**
 * SRI LAKSHMI BAKERY - Supabase Client Initialization & Session Manager
 * Manages Supabase Auth, Realtime WebSockets, and Database queries.
 */

window.SLBSupabase = (function () {
    const SUPABASE_URL = window.ENV_SUPABASE_URL || 'https://placeholder.supabase.co';
    const SUPABASE_ANON_KEY = window.ENV_SUPABASE_ANON_KEY || 'placeholder';

    let client = null;

    function getClient() {
        if (!client && window.supabase) {
            client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        }
        return client;
    }

    /**
     * Customer Sign Up
     */
    async function signUp(email, password, name, mobile) {
        const supabase = getClient();
        if (!supabase) return { error: { message: 'Supabase client not initialized' } };

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name, mobile }
            }
        });

        return { data, error };
    }

    /**
     * Customer Sign In
     */
    async function signIn(email, password) {
        const supabase = getClient();
        if (!supabase) return { error: { message: 'Supabase client not initialized' } };

        return await supabase.auth.signInWithPassword({ email, password });
    }

    /**
     * Sign Out
     */
    async function signOut() {
        const supabase = getClient();
        if (!supabase) return;
        return await supabase.auth.signOut();
    }

    /**
     * Subscribe to Realtime Order Updates
     */
    function subscribeOrderRealtime(orderId, callback) {
        const supabase = getClient();
        if (!supabase) return null;

        return supabase
            .channel(`order_${orderId}`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'orders',
                filter: `order_number=eq.${orderId}`
            }, payload => {
                if (callback) callback(payload.new);
            })
            .subscribe();
    }

    return {
        getClient,
        signUp,
        signIn,
        signOut,
        subscribeOrderRealtime
    };
})();
