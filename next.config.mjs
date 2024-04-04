/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self' https:; img-src 'self' https: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; child-src 'self' https:;",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Powered-By",
            value: "",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
