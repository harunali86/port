const { Client } = require('pg');

const client = new Client({
    connectionString: "postgresql://postgres:FoodDeliveryApp1@db.qbrkskutrlbdclhpfdwe.supabase.co:5432/postgres",
});

async function clean() {
    await client.connect();

    try {
        // 1. Get all table names
        const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

        const allTables = res.rows.map(r => r.table_name);
        console.log("Current Tables in Database:", allTables);

        // 2. Define tables to DROP (Food Delivery)
        // We will drop everything EXCEPT what looks like Portfolio stuff (contacts, blogs, etc)

        // Known Portfolio tables (based on typical portfolio structure)
        const keepPattern = /contact|blog|project|experience|skill|message/i;

        const tablesToDrop = allTables.filter(t => !keepPattern.test(t) && t !== '_prisma_migrations');

        if (tablesToDrop.length === 0) {
            console.log("No tables found to drop.");
        } else {
            console.log("Dropping these tables:", tablesToDrop);

            // Drop in reverse order of dependencies might be needed, or just CASCADE
            for (const table of tablesToDrop) {
                console.log(`Dropping ${table}...`);
                await client.query(`DROP TABLE IF EXISTS "${table}" CASCADE`);
            }
            console.log("Cleanup Complete!");
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.end();
    }
}

clean();
