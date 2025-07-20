/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.aceternity.com'],
  },
  output: 'export', // This tells Next.js to produce a static HTML export to the 'out' directory
  // Optionally, you might need to configure basePath if serving from a subdirectory
  // basePath: '/my-app',
};

// IMPORTANT: Use module.exports for next.config.js
module.exports = nextConfig;