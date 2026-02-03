require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Missing variables in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testStorage() {
    console.log("Testing connection to:", supabaseUrl);
    console.log("Bucket: portfolio-assets");

    const { data, error } = await supabase
        .storage
        .from('portfolio-assets')
        .list();

    if (error) {
        console.error("❌ FAILED:", error);
    } else {
        console.log("✅ SUCCESS. Files found:", data.length);
        data.forEach(f => console.log(" -", f.name));
    }
}

testStorage();
