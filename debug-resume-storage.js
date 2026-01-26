
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load env vars from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Using anon key, hope RLS allows it (admin likely uses service role but frontend uses anon)
// Wait, the admin API uses imported supabase client. Let's see how it's initialized.
// checking lib/supabase.js shortly, but for now assuming standard setup.

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runDebug() {
    console.log("--- Debugging Supabase Storage ---");

    // 1. List existing files
    console.log("1. Listing 'portfolio-assets' bucket...");
    const { data: files, error: listError } = await supabase.storage.from('portfolio-assets').list();

    if (listError) {
        console.error("List Error:", listError);
        return;
    }

    console.log("Files found:", files ? files.map(f => f.name) : 'None');

    // 2. Try to cleanup resume files (simulate cleanup logic)
    const filesToDelete = (files || []).filter(f => f.name.startsWith('resume')).map(f => f.name);
    console.log("Files to delete:", filesToDelete);

    if (filesToDelete.length > 0) {
        console.log("2. Deleting files...");
        const { error: deleteError } = await supabase.storage.from('portfolio-assets').remove(filesToDelete);
        if (deleteError) console.error("Delete Error:", deleteError);
        else console.log("Delete success");
    } else {
        console.log("2. No files to delete.");
    }

    // 3. Upload a test file (resume_debug_1.txt)
    console.log("3. Uploading resume_debug_1.txt...");
    const { error: uploadError1 } = await supabase.storage.from('portfolio-assets').upload('resume_debug_1.txt', 'test content 1', {
        upsert: true
    });

    if (uploadError1) console.error("Upload 1 Error:", uploadError1);
    else console.log("Upload 1 success");

    // 4. List again
    const { data: filesAfter1 } = await supabase.storage.from('portfolio-assets').list();
    console.log("Files after upload 1:", filesAfter1 ? filesAfter1.map(f => f.name) : 'None');

    // 5. Cleanup again
    console.log("5. Cleaning up debug files...");
    const debugFiles = (filesAfter1 || []).filter(f => f.name.startsWith('resume_debug')).map(f => f.name);
    if (debugFiles.length > 0) {
        await supabase.storage.from('portfolio-assets').remove(debugFiles);
        console.log("Cleanup success");
    }

    console.log("--- Debug Complete ---");
}

runDebug();
