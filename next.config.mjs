/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/tech', destination: '/engineering', permanent: true },
      { source: '/tech/digest', destination: '/engineering?category=digest', permanent: true },
      { source: '/tech/:slug', destination: '/engineering/:slug', permanent: true },
      { source: '/life', destination: '/about', permanent: true },
    ];
  },
  async rewrites() {
    return [
      // /learning/anything (including /learning itself) -> public/learning/index.html
      {
        source: '/learning',
        destination: '/learning/index.html',
      },
      {
        source: '/learning/:path*',
        destination: '/learning/index.html',
      },
    ];
  },
};

export default nextConfig;
