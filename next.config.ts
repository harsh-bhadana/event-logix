import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: '/discover',
        destination: '/events',
        permanent: true,
      },
      {
        source: '/admin/manage-events',
        destination: '/admin/events',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
