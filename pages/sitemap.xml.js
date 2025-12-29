import { supabase } from '@/lib/supabase';

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://harunshaikh.com';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/blog</loc>
     </url>
      <url>
       <loc>${EXTERNAL_DATA_URL}/contact</loc>
     </url>
     ${posts
      .map(({ slug }) => {
        return `
       <url>
           <loc>${EXTERNAL_DATA_URL}/blog/${slug}</loc>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const { data: posts } = await supabase
    .from('posts')
    .select('slug')
    .eq('is_published', true);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts || []);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
