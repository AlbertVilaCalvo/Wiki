// See available themes at https://github.com/FormidableLabs/prism-react-renderer/tree/master/src/themes
import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

// API reference: https://docusaurus.io/docs/api/docusaurus-config

const config: Config = {
  title: 'Albertpedia',
  tagline: 'Albert Vila Calvo',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://albert.wiki',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AlbertVilaCalvo', // Usually your GitHub org/user name.
  projectName: 'Wiki', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
      {
        docs: {
          // Change routes from '/docs/cli/git' to '/cli/git'.
          // See Docs-only mode https://docusaurus.io/docs/docs-introduction#docs-only-mode
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/AlbertVilaCalvo/Wiki/edit/main/',
          // Having breadcrumbs is pointless since I rarely have nested docs
          breadcrumbs: false,
          // https://docusaurus.io/docs/sidebar/items#expanded-categories-by-default
          sidebarCollapsed: false,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/AlbertVilaCalvo/Wiki/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Home',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'git',
          activeBasePath: 'git',
          label: 'Git',
          position: 'left',
        },
        {
          to: 'cli/commands',
          activeBasePath: 'cli',
          label: 'CLI',
          position: 'left',
        },
        {
          to: 'dev/tools-and-resources',
          activeBaseRegex: 'dev/.+',
          label: 'Dev',
          position: 'left',
        },
        {
          to: 'javascript',
          activeBasePath: 'js',
          label: 'JS',
          position: 'left',
        },
        {
          to: 'app',
          activeBasePath: 'app',
          label: 'App',
          position: 'left',
        },
        {
          to: 'cloud',
          activeBasePath: 'cloud',
          label: 'Cloud',
          position: 'left',
        },
        {
          to: 'aws',
          activeBasePath: 'aws',
          label: 'AWS',
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
          to: 'web',
          activeBasePath: 'web',
          label: 'Web',
          position: 'left',
        },
        {
          to: 'html',
          activeBasePath: 'html',
          label: 'HTML',
          position: 'left',
        },
        {
          to: 'css',
          activeBasePath: 'css',
          label: 'CSS',
          position: 'left',
        },
        {
          to: 'databases',
          activeBasePath: 'databases',
          label: 'DB',
          position: 'left',
        },
        {
          to: 'python',
          activeBasePath: 'python',
          label: 'Py',
          position: 'left',
        },
        {
          to: 'auth/authentication',
          activeBasePath: 'auth',
          label: 'Auth',
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
          to: 'ux',
          activeBasePath: 'uxs',
          label: 'UX',
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
      // Aquí puc tenir 1 llista de links enlloc de columnes. Veure
      // https://docusaurus.io/docs/api/themes/configuration#footer-links
      // https://github.com/facebook/docusaurus/pull/6132
      // https://github.com/facebook/docusaurus/issues/6101
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/doc1',
            },
            {
              label: 'Markdown Features',
              to: 'docs/markdown-features',
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
              href: 'https://albert.vc',
            },
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/AlbertVilaCalvo',
            },
            {
              label: 'Source Code',
              href: 'https://github.com/AlbertVilaCalvo/Wiki',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Albert Vila Calvo`,
    },
    // https://docusaurus.io/docs/api/themes/configuration#codeblock
    // If you use the line highlighting Markdown syntax, you might need to
    // specify a different highlight background color for the dark mode syntax
    // highlighting theme. See https://docusaurus.io/docs/markdown-features/code-blocks#line-highlighting
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      // Base set of languages: https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/generate-prism-languages/index.ts#L9-L25
      // All supported languages: https://prismjs.com/#supported-languages
      additionalLanguages: ['bash', 'json'],
    },
    docs: {
      // https://docusaurus.io/docs/sidebar#theme-configuration
      sidebar: {
        // Show 'Collapse sidebar' button
        hideable: true,
      },
    },
  } satisfies Preset.ThemeConfig,

  // ADDED BY ME
  // ***********

  // https://docusaurus.io/docs/api/docusaurus-config#customfields
  customFields: {
    description: 'The personal Wiki of Albert Vila Calvo',
  },

  // Remove 'Previous' and 'Next' links
  // https://docusaurus.io/docs/markdown-features#front-matter
  // https://docusaurus.io/docs/api/docusaurus-config#markdown
  markdown: {
    parseFrontMatter: async (params) => {
      // Reuse the default parser
      const result = await params.defaultParseFrontMatter(params)
      result.frontMatter.pagination_prev = null
      result.frontMatter.pagination_next = null
      return result
    },
  },
}

export default config
