/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['assets.aceternity.com'],
  },
  // Removed the problematic 'New Code' line here
  output: 'export', // This tells Next.js to produce a static HTML export to the 'out' directory

  // Optionally, you might need to configure basePath if serving from a subdirectory

  // basePath: '/my-app',

};

// Change this line to use ES Module export syntax
export default nextConfig;