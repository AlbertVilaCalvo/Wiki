---
title: Docusaurus
---

https://docusaurus.community - Knowledge sharing and plugin directory

## Doc front matter fields

https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter

## Link to another doc

```md
[ESLint](javascript/eslint.md#setup)
[ESLint](/javascript/eslint.md#setup)
[ESLint](/javascript/eslint#setup)
```

All options produce the same link.

Important: when using the first option you need to add `.md`, otherwise you get `/dev/javascript/eslint#setup` instead of `/javascript/eslint#setup`.

## Sidebar

https://docusaurus.io/docs/sidebar

https://docusaurus.io/docs/sidebar/items

```js title="sidebars.js"
const sidebars = {
  http: [
    'http/http',
    'http/https',
    'http/cors',
    'http/csp',
    // There are 2 equivalent ways to make the sidebar label different than the front matter 'title'.
    // 1) At the doc front matter set 'sidebar_label'.
    // 2) Do this:
    {
      type: 'doc',
      id: 'http/headers',
      label: 'Headers',
    },
    // We can have external links:
    {
      type: 'link',
      label: 'RFC 7231',
      href: 'https://httpwg.org/specs/rfc7231.html',
    },
  ],
}
```

### Sidebar category with generated index

The generated index route will be `/category/aws`, and the page is accessible by clicking the dropdown.

```js
const sidebars = {
  cloud: [
    'cloud/cloud',
    'cloud/kubernetes',
    'cloud/terraform',
    {
      type: 'category',
      label: 'AWS',
      link: {
        type: 'generated-index',
        title: 'AWS',
        description: 'Amazon Web Services',
      },
      collapsed: false,
      items: [
        'cloud/aws/aws', // Actual link to this page will be '/cloud/aws'
        'cloud/aws/iam',
        'cloud/aws/ec2',
        'cloud/aws/s3',
      ],
    },
    'cloud/heroku',
  ],
}
```

### Sidebar category shorthand syntax

https://docusaurus.io/docs/sidebar/items#category-shorthand

```js
const sidebars = {
  docs: {
    Docusaurus: ['docs/doc1', 'docs/doc2', 'docs/doc3'],
    Features: ['docs/mdx'],
    'Docusaurus Tutorial': [
      'docs/create-a-page',
      'docs/create-a-document',
      'docs/markdown-features',
    ],
  },
}
```

## Debug

[http://localhost:3000/\_\_docusaurus/debug](http://localhost:3000/__docusaurus/debug)

https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-debug

## Routes

Routes panel: [http://localhost:3000/\_\_docusaurus/debug/routes](http://localhost:3000/__docusaurus/debug/routes)

https://docusaurus.io/docs/advanced/routing

## Upgrade

This is the message shown at the terminal when you do `npm start`:

```shell
-------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                              Update available 3.3.2 → 3.4.0
                                     To upgrade Docusaurus packages with the latest version, run the following command:
`npm i @docusaurus/core@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest @docusaurus/tsconfig@latest @docusaurus/types@latest`
-------------------------------------------------------------------------------------------------------------------------------------------------------------
```

Also take a look at the other packages versions:

- https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-preset-classic/package.json
- https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/package.json

<details>
  <summary>OLD (for version 2)</summary>

This is the message shown at the terminal when you do `npm start`:

```shell
   ╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
   │                                                                                                                │
   │                                         Update available 2.2.0 → 2.4.1                                         │
   │                                                                                                                │
   │                To upgrade Docusaurus packages with the latest version, run the following command:              │
   │     `npm i @docusaurus/core@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest`   │
   │                                                                                                                │
   ╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

</details>

<details>
  <summary>OLD (with Yarn)</summary>

_I'm not using Yarn [since this commit](https://github.com/AlbertVilaCalvo/Wiki/commit/7b5e0088d2551417d0a5e7ecf8cdf116ebe916a4)._

This is the message shown at the terminal when you do `yarn start`:

```shell
yarn run v1.22.19
$ BROWSER=none docusaurus start
   ╭───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
   │                                                                                                                       │
   │                                            Update available 2.0.1 → 2.1.0                                             │
   │                                                                                                                       │
   │                   To upgrade Docusaurus packages with the latest version, run the following command:                  │
   │     `yarn upgrade @docusaurus/core@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest`   │
   │                                                                                                                       │
   ╰───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

You can also do:

```shell
yarn upgrade --latest @docusaurus/core @docusaurus/preset-classic @docusaurus/module-type-aliases
```

</details>

## Styling

Uses Infima: https://infima.dev

https://docusaurus.io/docs/styling-layout

## MDX

A component can be registered globally so that you don't have to import it on every .mdx file. See [docs](https://docusaurus.io/docs/markdown-features/react#mdx-component-scope) and [this tweet](https://twitter.com/docusaurus/status/1529810485280968706).

## Code blocks supported languages

https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js

https://docusaurus.io/docs/markdown-features/code-blocks#supported-languages

## Server components

https://twitter.com/sebastienlorber/status/1598615824927002624

## Releases

- beta 4 - [Twitter](https://twitter.com/docusaurus/status/1420518567313690627)
- [beta 5](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.5) - [Twitter](https://twitter.com/docusaurus/status/1430916848325910536)
  - You can now use `<head>` in .md files
- beta 6 - [Twitter](https://twitter.com/docusaurus/status/1433463372666789892)
  - blog/archive route
- [beta 7](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.7) - [Twitter](https://twitter.com/docusaurus/status/1449025696160956417)
- [beta 10](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.10) - [Twitter](https://twitter.com/docusaurus/status/1468938703854841856)
  - Link a sidebar category to an auto-generated index page, eg https://deploy-preview-6076--docusaurus-2.netlify.app/docs/category/guides/
  - Link a sidebar category to an existing markdown document
- beta 11, 12, 13 fix issues in 10 deps and bad npm publish
  - [Twitter](https://twitter.com/docusaurus/status/1469253182387798020)
  - [Twitter](https://twitter.com/docusaurus/status/1469371710969462785)
- [beta 14](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.14) - [Twitter](https://twitter.com/docusaurus/status/1473324727527690245)
  - Simplified footer (if you don't have many links) - https://github.com/facebook/docusaurus/issues/6101
- [beta 15](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.15) - [Twitter](https://twitter.com/docusaurus/status/1486404763902222341)
  - Option to auto-collapse sidebar categories as you click
- [beta 16](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.16) - [Twitter](https://twitter.com/docusaurus/status/1497227180295823366)
  - Swizzling - https://docusaurus.io/docs/swizzling
  - Breadcrumbs in docs (disabled in config.js with presets docs.breadcrumbs)
  - Add arbitrary html elements to the docs sidebar like images, separators etc.
- [beta 17](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.17) - [Twitter](https://twitter.com/docusaurus/status/1499439030336950275)
- [beta 18](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.18) - [Twitter](https://twitter.com/docusaurus/status/1507375535114141696)
- [beta 19](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.19) - [Twitter](https://twitter.com/docusaurus/status/1521886747575074819)
  - Mark a doc or blog post as draft with `draft:true` and it won't show in production builds
  - Line numbers in code blocks [docs](https://docusaurus.io/docs/markdown-features/code-blocks#line-numbering)
  - Add a class name to a code block line with a comment [docs](https://docusaurus.io/docs/markdown-features/code-blocks#custom-magic-comments)
- [beta 20](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.20) - [Twitter](https://twitter.com/docusaurus/status/1522273335400357888)
  - Small release with fixes for beta 19
- [beta 21](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.21) - [Twitter](https://twitter.com/docusaurus/status/1530224861116780545)
- [beta 22](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.22) - [Twitter](https://twitter.com/docusaurus/status/1545438949610512384)
- [2.0.0-rc.1](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-rc.1) - [Twitter](https://twitter.com/docusaurus/status/1547616687117070338)
- [2.0](https://github.com/facebook/docusaurus/releases/tag/v2.0.0) - [Announcement](https://docusaurus.io/blog/2022/08/01/announcing-docusaurus-2.0) - [Twitter](https://twitter.com/docusaurus/status/1554000364432769025) - [HN](https://news.ycombinator.com/item?id=32303052)
- [2.1](https://github.com/facebook/docusaurus/releases/tag/v2.1.0) - [Announcement](https://docusaurus.io/blog/2022/09/01/docusaurus-2.1) - [Twitter](https://twitter.com/docusaurus/status/1565691803688370176)
  - Allows to override hardcoded `<meta>`
  - Simple use `<DocCardList/>`, which can now be used in any document. `DocCardList` "will display all the sidebar items of the parent category of the current document" [source](https://docusaurus.io/docs/sidebar/items#embedding-generated-index-in-doc-page)
- [2.2](https://github.com/facebook/docusaurus/releases/tag/v2.2.0) - [Announcement](https://docusaurus.io/blog/releases/2.2) - [Twitter](https://twitter.com/docusaurus/status/1586347397667495936)
  - Mermaid diagrams [docs](https://docusaurus.io/docs/markdown-features/diagrams)
  - `headTags` allow to add arbitrary HTML `<head>` tags to all pages of your site [docs](https://docusaurus.io/docs/api/docusaurus-config#headTags)
- [2.3](https://github.com/facebook/docusaurus/releases/tag/v2.3.0) - [Announcement](https://docusaurus.io/blog/releases/2.3) - [Twitter](https://twitter.com/docusaurus/status/1619019393756794900)
  - Nested alerts (admonitions)
- [2.4](https://github.com/facebook/docusaurus/releases/tag/v2.4.0) - [Announcement](https://docusaurus.io/blog/releases/2.4) - [Twitter](https://twitter.com/docusaurus/status/1639279650974187521)
  - Sidebar item of type category or link can have description
  - Use query string `?docusaurus-theme=dark` or `?docusaurus-theme=light` to force light or dark mode
- [3.0](https://github.com/facebook/docusaurus/releases/tag/v3.0.0) - [Announcement](https://docusaurus.io/blog/releases/3.0) - [Twitter](https://twitter.com/docusaurus/status/1719398424834134336)
  - [Upgrade guide](https://docusaurus.io/docs/migration/v3). Also see [Preparing your site for Docusaurus v3](https://docusaurus.io/blog/preparing-your-site-for-docusaurus-v3)
  - MDX 3
  - Support for ES Modules and TypeScript config files (`docusaurus.config.ts` and `sidebars.ts`)
  - [Admonitions](https://docusaurus.io/docs/migration/v3#admonition-warning):
    - Fix and re-introduce the `:::warning` admonition (is now yellow instead of red)
    - Deprecate `:::caution`. Refactor `:::caution` (yellow) to either `:::warning` (yellow) or `:::danger` (red)
  - New `unlisted: true` front matter option, in addition to the already existing `draft: true`
  - Build your static site in dev mode with `docusaurus build --dev`. Particularly helpful for troubleshooting React problems
  - Code blocks syntax highlighting with Prism 2 only includes [a few languages](https://github.com/FormidableLabs/prism-react-renderer/blob/e35950e4f9520f33672e94b798eadfd426ef692d/packages/generate-prism-languages/index.ts#L9-L25). You need to add the other ones manually in `docusaurus.config.js`
- [3.1](https://github.com/facebook/docusaurus/releases/tag/v3.1.0) - [Announcement](https://docusaurus.io/blog/releases/3.1) - [Twitter](https://twitter.com/sebastienlorber/status/1743348229175935351)
  - `parseFrontMatter` hook, which allows to disable the 'Previous' and 'Next' links
  - Built-in broken anchors detector, with new option `onBrokenAnchors`
- [3.2](https://github.com/facebook/docusaurus/releases/tag/v3.2.0) - [Announcement](https://docusaurus.io/blog/releases/3.2) - [Twitter](https://twitter.com/sebastienlorber/status/1773770169514426726)
- [3.3](https://github.com/facebook/docusaurus/releases/tag/v3.3.0) - [Announcement](https://docusaurus.io/blog/releases/3.3) - [Twitter](https://twitter.com/sebastienlorber/status/1786424408938025199)
- [3.4](https://github.com/facebook/docusaurus/releases/tag/v3.4.0) - [Announcement](https://docusaurus.io/blog/releases/3.4) - [Twitter](https://twitter.com/sebastienlorber/status/1796606082741330410)
  - Tags files (`blog/tags.yml` and `docs/tags.yml`): list of pre-defined tags, to reuse them and validate them
  - Hash router: generates a single page app `index.html` file that allows easy distribution and offline browsing locally without a web server (using the `file://` protocol)
- [3.5](https://github.com/facebook/docusaurus/releases/tag/v3.5.0) - [Announcement](https://docusaurus.io/blog/releases/3.5) - [Twitter](https://twitter.com/sebastienlorber/status/1821948807426256996)
  - Improvements to the blog, eg authors pages with social icons
