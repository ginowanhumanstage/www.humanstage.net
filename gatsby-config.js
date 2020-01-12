// https://www.gatsbyjs.org/docs/environment-variables/
const activeEnv =
  process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `.env.${activeEnv}`,
});

module.exports = {
  siteMetadata: {
    title: `宜野湾 HUMAN STAGE`,
    description: `沖縄県宜野湾市のライブハウス、HUMAN STAGE (ヒューマンステージ) のオフィシャルサイト。`,
    author: `@ginowanhumanstage`,
    siteUrl: `https://www.humanstage.net`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon_512.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: process.env.WP_BASE_URL,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
  ],
};
