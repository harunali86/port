/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  compress: true, // Enable Gzip/Brotli compression
  swcMinify: true, // Use SWC for minification
  poweredByHeader: false, // Remove X-Powered-By header
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.logs in production
  },
};

export default nextConfig;
