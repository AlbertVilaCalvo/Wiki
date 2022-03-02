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
          to: 'dev/javascript',
          activeBaseRegex: 'dev/.+',
          label: 'Dev',
          position: 'left',
        },
        {
          to: 'devops/docker',
          activeBasePath: 'devops',
          label: 'DevOps',
          position: 'left',
        },
        {
          // Using "to: 'http/http'" results in 404 when clicking the link 'HTTP' on the sidebar,
          // because it links to the page /http/http, which doesn't exist.
          to: 'http',
          activeBasePath: 'http',
          label: 'HTTP',
          position: 'left',
        },
        {
          to: 'html/misc',
          activeBasePath: 'html',
          label: 'HTML',
          position: 'left',
        },
        {
          to: 'css/reset',
          activeBasePath: 'css',
          label: 'CSS',
          position: 'left',
        },
        {
          to: 'misc/battery',
          activeBasePath: 'misc',
          label: 'Misc',
          position: 'left',
        },
        {
          to: 'disseny/color',
          activeBasePath: 'disseny',
          label: 'Disseny',
          position: 'left',
        },
        {
          to: 'corrector',
          label: 'Corrector',
          position: 'right',
        },
        // {
        //   to: 'docs/doc1',
        //   activeBasePath: 'docs',
        //   label: 'Docs',
        //   position: 'right',
        // },
        // {to: 'blog', label: 'Blog', position: 'right'},
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
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
          // See Docs-only mode https://docusaurus.io/docs/docs-introduction#docs-only-mode
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/AlbertVilaCalvo/Wiki/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/AlbertVilaCalvo/Wiki/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
