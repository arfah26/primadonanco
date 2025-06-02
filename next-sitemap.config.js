module.exports = {
  siteUrl: 'https://primadonanco.com', // Pastikan URL deploy, bukan localhost
  generateRobotsTxt: true,
  exclude: ['/admin/**'],
  transform: async (config, url) => {
    return {
      loc: url, // `url` sudah berupa string (dokumentasi module mendukung ini)
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    };
  },
};
