// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Oracle Retail Blog',
  tagline: 'Personal blog to log my experience with Oracle Retail products',
  url: 'https://github.com/pablodaniel03',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo-o.png', //'img/favicon.ico'

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'palmaguer', // Usually your GitHub org/user name.
  projectName: 'oracle-retail-blog', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Oracle Retail Blog',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo-o.png',
        },
        items: [
          {
            type: 'doc',
            docId: '/category/merchandising-16',
            position: 'left',
            label: 'Pages',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/pablodaniel03',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://linkedin.com/in/pablodaniel03',
            label: 'LinkedIn',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Oracle Help Center',
            items: [
              {
                label: 'Oracle Retail',
                to: 'https://docs.oracle.com/en/industries/retail/index.html',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/users/9900159/pablo-almaguer',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/pablodaniel03',
              },
              {
                label: 'AskTom',
                href: 'https://devgym.oracle.com/pls/apex/f?p=10001:26:111943954118191:::26:P26_USER_ID:414079',
              },

            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/pablodaniel03',
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/pablodaniel03',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} - Pablo Almaguer. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/vsDark'),
        darkTheme: require('prism-react-renderer/themes/ultramin'),
      },
    }),
};

module.exports = config;
