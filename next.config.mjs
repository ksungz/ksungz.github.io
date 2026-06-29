/** @type {import('next').NextConfig} */
const nextConfig = {
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
