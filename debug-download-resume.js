
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load env vars from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runDebugDownload() {
    console.log("--- Debugging Download Logic (Verify Sort) ---");

    // 1. Verify Logic (from download-resume.js)
    console.log("1. Listing files from bucket...");
    const { data, error } = await supabase.storage.from('portfolio-assets').list();

    if (error) {
        console.error("List Error:", error);
        return;
    }

    console.log("Files found:", data.map(f => f.name));

    // Logic Under Test
    const resumeFiles = (data || [])
        .filter(f => f.name.toLowerCase().startsWith('resume'))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const file = resumeFiles[0];

    if (file) {
        console.log("SUCCESS: Selected File:", file.name);
        console.log("Created At:", file.created_at);
        // Verify this is indeed the latest one
        const manualSort = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        if (manualSort[0].name === file.name) {
            console.log("VERIFIED: This is the absolute latest file in the bucket.");
        } else {
            console.log("WARNING: There is a newer file not selected? Latest is:", manualSort[0].name);
        }
    } else {
        console.error("FAILURE: No resume file found");
    }

    console.log("--- Debug Complete ---");
}

runDebugDownload();
