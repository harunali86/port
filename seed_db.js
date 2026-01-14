const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
    connectionString: "postgresql://postgres:fooddeliveryapp1@db.qbrkskutrlbdclhpfdwe.supabase.co:5432/postgres",
});

async function seed() {
    await client.connect();

    try {
        const seedPath = '/home/harun/.gemini/antigravity/scratch/food-delivery-app/database/seed.sql';
        const seedSql = fs.readFileSync(seedPath, 'utf8');

        console.log("Running Seed...");

        await client.query(seedSql);

        console.log("Seed data inserted successfully!");

    } catch (err) {
        console.error("Error seeding data:", err);
    } finally {
        await client.end();
    }
}

seed();
