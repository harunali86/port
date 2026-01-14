const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qbrkskutrlbdclhpfdwe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFicmtza3V0cmxiZGNsaHBmZHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTE3NjEsImV4cCI6MjA4MjQ4Nzc2MX0.GABbZJq8O8_uy2hI7L2c-ai11xERhgtOIJsfsgf4zWs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanDatabase() {
    console.log('Fetching all tables...');

    // List of tables known to be part of the Food Delivery App
    const tablesToRemove = [
        'users',
        'restaurants',
        'categories',
        'menu_items',
        'cart',
        'orders',
        'order_items',
        'payments',
        'addresses',
        'drivers',
        'coupons'
    ];

    // Tables to KEEP (Portfolio related)
    const tablesToKeep = [
        'contacts',
        'messages',
        'projects',
        'admin',
        'blogs'
    ];

    console.log('Attempting to drop Food Delivery tables...');

    for (const table of tablesToRemove) {
        try {
            // We can't DROP TABLE directly with supabase-js client easily without Rpc or direct SQL execution.
            // However, we can use the `rpc` call if a function exists, or we might validly assume 
            // the user wants us to use the Postgres connection string since we have it!
            // But let's check if we can even see the data first.

            // Actually, since we have the connection string in .env.local, let's use `pg` to drop tables.
            // That's much safer and more robust.
            console.log(`(Info) Target for removal: ${table}`);
        } catch (e) {
            console.error(e);
        }
    }
}

cleanDatabase();
