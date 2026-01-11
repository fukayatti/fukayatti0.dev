import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    mdxRs: true,
  },
  // Webpack configuration for Transformers.js
  webpack: (config) => {
    // Handle ONNX model files
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};

    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false,
    };
    return config;
  },
  // 画像最適化
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 24時間
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      // Notion S3 images
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
      // External news/media sites
      {
        protocol: 'https',
        hostname: 'www.ibaraki-ct.ac.jp',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.keizai.biz',
        pathname: '/**',
      },
      // Discord CDN
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/**',
      },
      // Discord media (for activity images)
      {
        protocol: 'https',
        hostname: 'media.discordapp.net',
        pathname: '/**',
      },
      // Spotify album art
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
    ],
  },
  // JavaScript最適化
  compiler: {
    // Production でも console.log と console.info は残す（easter egg用）
    // console.debug と console.warn のみ削除
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['log', 'info', 'error'] }
        : false,
  },
  // バンドル解析（オプション）
  bundlePagesRouterDependencies: true,
  // モダンブラウザ向けの最適化
  transpilePackages: [],
  // 圧縮とminification
  compress: true,
  poweredByHeader: false,
  // 不要なファイルの除外
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // セキュリティヘッダー追加
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: https://cdn.discordapp.com; font-src 'self' data:; connect-src 'self' https://api.lanyard.rest https://va.vercel-scripts.com https://huggingface.co https://cdn-lfs.huggingface.co https://cdn-lfs-us-1.huggingface.co https://cas-bridge.xethub.hf.co https://cdn.jsdelivr.net blob:; worker-src 'self' blob:",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
