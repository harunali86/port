// Health check endpoint to keep Supabase database alive
// This endpoint is called by cron job every 24 hours to prevent auto-pause

// Health check endpoint to keep Supabase database alive
// Updated to use HTTP API (supabase-js) which counts as "Project Activity"
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
    try {
        // Perform a lightweight REST API call
        // This registers as "API Usage" on Supabase Dashboard
        const { data, error } = await supabase
            .from('blogs')
            .select('count', { count: 'exact', head: true });

        if (error) throw error;

        return res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            method: 'REST API',
            message: 'Supabase activity registered successfully'
        })
    } catch (error) {
        console.error('[HEALTH] Activity check failed:', error)
        return res.status(500).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            error: error.message
        })
    }
}
