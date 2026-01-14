const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
    connectionString: "postgresql://postgres:fooddeliveryapp1@db.qbrkskutrlbdclhpfdwe.supabase.co:5432/postgres",
});

async function setup() {
    await client.connect();

    try {
        const sqlPath = '/home/harun/.gemini/antigravity/scratch/food-delivery-app/database/schema.sql';
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log("Running Schema Setup...");

        // Split by semicolons to verify basic syntax or runs, but pg driver can handle multi-statement strings usually.
        // However, some extensions/functions might need special handling if not split, but let's try direct execution first.

        await client.query(sql);

        console.log("Schema applied successfully!");

    } catch (err) {
        console.error("Error applying schema:", err);
    } finally {
        await client.end();
    }
}

setup();
