module.exports = {
  siteMetadata: {
    title: "Assim's Blog",
    author: 'Assim ELHAMMOUTI',
    description: "Assim's blog",
    siteUrl: 'https://assim.me',
  },
  pathPrefix: '/gatsby-starter-blog',
  plugins: [
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-drip-widget`,
      options: {
        account: '8103033', // Get it by going to "Account => Site setup" and look for `_dcs.account`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-social-cards`,
            options: {
              title: {
                color: 'white',
                size: 32, // 16|24|32|48|64
              },
              meta: {
                color: 'white',
                parts: [
                  { field: 'date', format: 'mmmm dS' },
                ],
              },
              background: '#0069ff',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-111423134-1`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
