/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pindahkan pemrosesan pdf-parse ke tingkat Node.js Native Runtime
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;