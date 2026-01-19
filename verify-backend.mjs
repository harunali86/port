// Verification script for resume upload and backend
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manually read .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.+)$/);
    if (match) {
        envVars[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
    }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Verifying Portfolio Backend...\n');

async function verifyBackend() {
    const results = {
        supabaseConnection: false,
        storageAccess: false,
        resumeExists: false,
        databaseConnection: false,
    };

    try {
        // 1. Test Supabase Connection
        console.log('1️⃣  Testing Supabase Connection...');
        const supabase = createClient(supabaseUrl, supabaseKey);

        if (!supabase) {
            throw new Error('Failed to create Supabase client');
        }

        console.log('   ✅ Supabase URL:', supabaseUrl);
        results.supabaseConnection = true;

        // 2. Test Storage Bucket Access
        console.log('\n2️⃣  Testing Storage Bucket Access...');
        try {
            const { data: buckets, error: bucketsError } = await supabase
                .storage
                .listBuckets();

            if (bucketsError) {
                console.log('   ⚠️  Could not list buckets:', bucketsError.message);
            } else {
                console.log('   📦 Available buckets:', buckets.map(b => b.name).join(', '));

                const portfolioBucket = buckets.find(b => b.name === 'portfolio-assets');
                if (portfolioBucket) {
                    console.log('   ✅ portfolio-assets bucket exists!');
                    console.log('      - Public:', portfolioBucket.public);
                    results.storageAccess = true;
                } else {
                    console.log('   ❌ portfolio-assets bucket NOT found');
                }
            }
        } catch (err) {
            console.log('   ❌ Storage access error:', err.message);
        }

        // 3. Check if Resume Exists
        console.log('\n3️⃣  Checking Resume File...');
        try {
            const { data: files, error: filesError } = await supabase
                .storage
                .from('portfolio-assets')
                .list('', {
                    limit: 100,
                    offset: 0,
                });

            if (filesError) {
                console.log('   ⚠️  Could not list files:', filesError.message);
            } else {
                console.log('   📄 Files in bucket:', files.length);

                const resumeFile = files.find(f => f.name === 'resume.pdf');
                if (resumeFile) {
                    console.log('   ✅ resume.pdf exists!');
                    console.log('      - Size:', (resumeFile.metadata?.size || 0 / 1024).toFixed(2), 'KB');
                    console.log('      - Updated:', resumeFile.updated_at);

                    // Get public URL
                    const { data: urlData } = supabase
                        .storage
                        .from('portfolio-assets')
                        .getPublicUrl('resume.pdf');

                    console.log('      - Public URL:', urlData.publicUrl);
                    results.resumeExists = true;
                } else {
                    console.log('   ⚠️  resume.pdf NOT found in bucket');
                    console.log('      Available files:', files.map(f => f.name).join(', '));
                }
            }
        } catch (err) {
            console.log('   ❌ File check error:', err.message);
        }

        // 4. Test Database Connection
        console.log('\n4️⃣  Testing Database Connection...');
        try {
            const { data, error } = await supabase
                .from('analytics')
                .select('count')
                .limit(1);

            if (error) {
                console.log('   ⚠️  Database query error:', error.message);
                console.log('      (This is OK if analytics table doesn\'t exist yet)');
            } else {
                console.log('   ✅ Database connection working!');
                results.databaseConnection = true;
            }
        } catch (err) {
            console.log('   ⚠️  Database test:', err.message);
        }

        // 5. Summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 VERIFICATION SUMMARY\n');
        console.log('Supabase Connection:', results.supabaseConnection ? '✅' : '❌');
        console.log('Storage Access:     ', results.storageAccess ? '✅' : '❌');
        console.log('Resume File Exists: ', results.resumeExists ? '✅' : '❌');
        console.log('Database Connection:', results.databaseConnection ? '✅ (or table missing)' : '⚠️');
        console.log('='.repeat(50));

        // Overall status
        const critical = results.supabaseConnection && results.storageAccess;
        if (critical) {
            console.log('\n✅ Backend is READY for resume uploads!');
            if (!results.resumeExists) {
                console.log('   ℹ️  No resume uploaded yet. Upload one through admin panel.');
            }
        } else {
            console.log('\n❌ Backend has ISSUES - please fix Supabase configuration');
        }

        return results;

    } catch (error) {
        console.error('\n❌ Verification failed:', error.message);
        return results;
    }
}

// Run verification
verifyBackend()
    .then(results => {
        const hasIssues = !results.supabaseConnection || !results.storageAccess;
        process.exit(hasIssues ? 1 : 0);
    })
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
