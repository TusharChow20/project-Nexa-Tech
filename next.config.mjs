/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all hostnames
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
