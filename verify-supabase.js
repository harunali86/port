
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase Keys!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log("Checking Supabase Connection...");
    const { data, error } = await supabase.from('posts').select('*').limit(5);

    if (error) {
        console.error("Supabase Error:", error.message);
    } else {
        console.log("Success! Posts found:", data.length);
        if (data.length > 0) {
            console.log("Sample Post:", data[0].title);
        } else {
            console.log("Table is empty.");
        }
    }
}

check();
