/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'], // Use modern AVIF format (20% smaller than WebP)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Strict caching for static assets
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|glb|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  compress: true, // Enable Gzip/Brotli compression
  swcMinify: true, // Use SWC for minification
  poweredByHeader: false, // Remove X-Powered-By header
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.logs in production
  },

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['@react-three/drei', '@react-three/fiber', 'three'],
  },

  // Webpack optimizations for Three.js
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Split Three.js into separate chunk for better caching
      config.optimization = config.optimization || {};
      config.optimization.splitChunks = config.optimization.splitChunks || {};
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        three: {
          name: 'three',
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          priority: 10,
          reuseExistingChunk: true,
        },
      };
    }
    return config;
  },
};

export default nextConfig;
