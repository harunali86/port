// Health check endpoint to keep Supabase database alive
// This endpoint is called by cron job every 24 hours to prevent auto-pause

const pool = require('../../lib/db')

export default async function handler(req, res) {
    try {
        // Simple query to keep database connection alive
        const result = await pool.query('SELECT 1 as health')

        return res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            database: 'connected',
            message: 'Portfolio database is alive!'
        })
    } catch (error) {
        console.error('[HEALTH] Database connection error:', error)
        return res.status(500).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            database: 'disconnected',
            error: error.message || 'Unknown error'
        })
    }
}
