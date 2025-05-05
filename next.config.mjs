/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Required for Capacitor static deployment
  distDir: "out",
  // Images need to be handled properly for mobile
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: true,
};

export default nextConfig;
