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
