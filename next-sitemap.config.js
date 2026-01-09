/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://fukayatti0.dev',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: 'public',
};
