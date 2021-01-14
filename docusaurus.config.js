// API reference: https://v2.docusaurus.io/docs/docusaurus.config.js/
module.exports = {
  title: 'Wiki',
  tagline: 'Albert Vila Calvo',
  url: 'https://albert.wiki',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'AlbertVilaCalvo', // Usually your GitHub org/user name.
  projectName: 'Wiki', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Home',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'cli/git',
          activeBasePath: 'cli',
          label: 'CLI',
          position: 'left',
        },
        {
          to: 'misc/battery',
          activeBasePath: 'misc',
          label: 'Misc',
          position: 'left',
        },
        {
          to: 'docs/doc1',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {to: 'blog', label: 'Blog', position: 'right'},
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/doc1/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/users/4034572/albert-vila-calvo',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/AlbertVilaCalvo',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/albertvilacalvo',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Personal Website',
              to: 'https://albert.vc',
            },
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'Talks',
              to: 'talks',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/AlbertVilaCalvo',
            },
            {
              label: 'Source',
              href: 'https://github.com/AlbertVilaCalvo/Wiki',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Albert Vila Calvo`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // Change routes from '/docs/cli/git' to '/cli/git'.
          // See Docs-only mode https://v2.docusaurus.io/docs/docs-introduction#docs-only-mode
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
