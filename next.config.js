const {aliases, sassSharedData, reactSvgLoaderRule, cssoWebpackPlugin} = require('./webpack/shared');

/**
 * Next.js main config
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: sassSharedData('next'),
  },
  webpack(config, {defaultLoaders}) {
    // React SVG Loader
    config.module.rules.push(reactSvgLoaderRule(defaultLoaders.babel));

    // Aliases for paths to app directories
    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases(),
    };

    // CSS optimizations
    if (process.env.NODE_ENV !== 'development') {
      config.plugins.push(cssoWebpackPlugin());
    }

    return config;
  },
};
