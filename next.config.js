/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  async rewrites(){
    return [
      {
        source: '/blog-d0b4d.firebaseapp.com/:path*',
        destination: 'https://blog-d0b4d.firebaseapp.com/:path*',
      }
    ]
  }
};

module.exports = nextConfig;
