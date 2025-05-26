/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self' http: https: http://localhost:3000 https://primadonanco.com https://flagcdn.com; " +
              "script-src 'self' 'unsafe-inline' https://www.youtube.com https://www.youtube-nocookie.com; " +
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com; " +
              "child-src https://www.youtube.com https://www.youtube-nocookie.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' https://i.ytimg.com https://flagcdn.com data: http: https:; " +
              "media-src 'self'; " +
              "connect-src 'self' http: https: http://localhost:3000 https://primadonanco.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
