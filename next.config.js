
const withNextra = require('nextra')({
  // theme: 'nextra-theme-blog',
  theme: './src/theme',
  themeConfig: './theme.config.tsx',
});

module.exports = withNextra({
  images: {
    unoptimized: true
  }
});
