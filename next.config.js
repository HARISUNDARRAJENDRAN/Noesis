/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/auth/register",
        destination: "/register",
        permanent: false,
      },
      {
        source: "/auth/confirm",
        destination: "/confirm",
        permanent: false,
      },
      {
        source: "/auth/forgot",
        destination: "/forgot",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
