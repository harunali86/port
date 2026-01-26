
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

async function runDebugV2() {
    console.log("--- Debugging Supabase Storage V2 (Verify Fix) ---");

    // 1. Initial Cleanup
    console.log("1. Cleaning up existing resume files...");
    const { data: initialFiles } = await supabase.storage.from('portfolio-assets').list();
    const initialToDelete = (initialFiles || []).filter(f => f.name.startsWith('resume')).map(f => f.name);
    if (initialToDelete.length > 0) {
        await supabase.storage.from('portfolio-assets').remove(initialToDelete);
        console.log("Cleanup complete");
    }

    // 2. Simulate Upload 1 (Older)
    console.log("2. Simulating Upload 1 (Older)...");
    const timestamp1 = Date.now() - 10000;
    const filename1 = `resume_${timestamp1}.pdf`;
    await supabase.storage.from('portfolio-assets').upload(filename1, 'fake pdf content 1', {
        contentType: 'application/pdf',
        upsert: true
    });
    console.log(`Uploaded ${filename1}`);

    // Allow some time difference
    await new Promise(r => setTimeout(r, 1000));

    // 3. Simulate Upload 2 (Newer - what the actual code does)
    console.log("3. Simulating Upload 2 (Newer - Real logic)...");

    // Logic from upload-resume.js: Cleanup then Upload
    // Step 3a: Cleanup logic
    const { data: currentFiles } = await supabase.storage.from('portfolio-assets').list();
    const filesToDelete = (currentFiles || [])
        .filter(f => f.name.startsWith('resume'))
        .map(f => f.name);

    console.log("Files found to delete during new upload:", filesToDelete);
    if (filesToDelete.length > 0) {
        await supabase.storage.from('portfolio-assets').remove(filesToDelete);
        console.log("Deleted old files");
    }

    // Step 3b: Upload new
    const timestamp2 = Date.now();
    const filename2 = `resume_${timestamp2}.pdf`;
    await supabase.storage.from('portfolio-assets').upload(filename2, 'fake pdf content 2', {
        contentType: 'application/pdf',
        upsert: true
    });
    console.log(`Uploaded ${filename2}`);

    // 4. Verify Fetch Logic (from get-resume.js)
    console.log("4. Verifying Fetch Logic...");
    const { data: finalFiles } = await supabase.storage.from('portfolio-assets').list();
    console.log("Files in bucket:", finalFiles.map(f => f.name));

    const resumeFiles = (finalFiles || [])
        .filter(f => f.name.toLowerCase().startsWith('resume'))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const latestFile = resumeFiles[0];

    if (latestFile && latestFile.name === filename2) {
        console.log("SUCCESS: Fetched the correct latest file:", latestFile.name);
    } else {
        console.error("FAILURE: Fetched wrong file or none:", latestFile?.name);
    }

    // 5. Cleanup
    console.log("5. Final Cleanup...");
    await supabase.storage.from('portfolio-assets').remove([filename2]);
    console.log("Done");
}

runDebugV2();
